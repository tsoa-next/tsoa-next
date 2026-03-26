import type { Tsoa } from '../metadataGeneration/tsoa'

export type RuntimeSchemaAdapterResult<T = unknown> =
  | {
      ok: true
      value: T
    }
  | {
      ok: false
      failure: Tsoa.ValidationFailure
    }

export interface RuntimeSchemaAdapter {
  kind: Tsoa.ExternalValidatorKind
  validate(value: unknown, schema: unknown, context: Tsoa.ValidationContext): RuntimeSchemaAdapterResult
}

type ValidationErrorLike = Error & { issues?: unknown[]; details?: unknown[]; inner?: unknown[]; path?: unknown; type?: unknown; failures?: () => Iterable<unknown> }
type SuperstructModule = { validate: (value: unknown, struct: unknown, options?: unknown) => [unknown, unknown] }
type IoTsReporterModule = { PathReporter?: { report: (input: unknown) => string[] } }

let superstructModule: SuperstructModule | undefined

function loadOptionalModule<T>(moduleName: string): T {
  try {
    return require(moduleName) as T
  } catch (_error) {
    throw new Error(`External validator '${moduleName}' is not installed. Install it in your application to use @Validate with that schema kind.`)
  }
}

function normalizePath(input: unknown): string {
  if (!Array.isArray(input)) {
    return typeof input === 'string' ? input : ''
  }

  return input
    .filter(segment => segment !== undefined && segment !== null && segment !== '')
    .map(segment => (typeof segment === 'number' ? `$${segment}` : String(segment)))
    .join('.')
}

function normalizeJoiPath(input: unknown): string {
  if (!Array.isArray(input)) {
    return typeof input === 'string' ? input : ''
  }

  return input
    .map(segment => (typeof segment === 'number' ? `$${segment}` : String(segment)))
    .join('.')
}

function maybeMessageKey(message: unknown): string | undefined {
  if (typeof message !== 'string' || message.length === 0) {
    return undefined
  }

  return /^[A-Za-z0-9_.-]+$/.test(message) && message.includes('.') ? message : undefined
}

function finalizeFailure(failure: Tsoa.ValidationFailure, context: Tsoa.ValidationContext): Tsoa.ValidationFailure {
  const translatedIssues = failure.issues.map(issue => {
    const messageKey = issue.messageKey || maybeMessageKey(issue.message)
    const translatedMessage = messageKey && context.translate ? context.translate(messageKey, issue.messageParams) : issue.message
    return {
      ...issue,
      ...(messageKey ? { messageKey } : {}),
      ...(translatedMessage ? { message: translatedMessage } : {}),
    }
  })

  const translatedFailure: Tsoa.ValidationFailure = {
    ...failure,
    issues: translatedIssues,
    summaryMessage: translatedIssues.find(issue => issue.message)?.message || failure.summaryMessage,
  }

  return context.errorFormatter ? context.errorFormatter(translatedFailure) : translatedFailure
}

function buildFailure(source: Tsoa.ValidationIssue['source'], issues: Tsoa.ValidationIssue[], fallbackSummary: string, context: Tsoa.ValidationContext): Tsoa.ValidationFailure {
  return finalizeFailure(
    {
      source,
      issues,
      summaryMessage: issues.find(issue => issue.message)?.message || fallbackSummary,
    },
    context,
  )
}

const zodAdapter: RuntimeSchemaAdapter = {
  kind: 'zod',
  validate(value, schema, context) {
    const zodSchema = schema as { safeParse?: (input: unknown) => { success: boolean; data?: unknown; error?: { issues?: unknown[] } } }
    if (typeof zodSchema.safeParse !== 'function') {
      throw new Error('Expected a Zod schema with safeParse().')
    }

    const result = zodSchema.safeParse(value)
    if (result.success) {
      return { ok: true, value: result.data }
    }

    const issues = (result.error?.issues || []).map(issue => {
      const entry = issue as { path?: unknown; code?: unknown; message?: unknown }
      return {
        path: normalizePath(entry.path),
        code: typeof entry.code === 'string' ? entry.code : 'invalid',
        message: typeof entry.message === 'string' ? entry.message : undefined,
        source: 'zod' as const,
        raw: issue,
      }
    })

    return { ok: false, failure: buildFailure('zod', issues, 'Zod validation failed.', context) }
  },
}

const joiAdapter: RuntimeSchemaAdapter = {
  kind: 'joi',
  validate(value, schema, context) {
    const joiSchema = schema as { validate?: (input: unknown, options?: unknown) => { value: unknown; error?: { details?: unknown[] } } }
    if (typeof joiSchema.validate !== 'function') {
      throw new Error('Expected a Joi schema with validate().')
    }

    const result = joiSchema.validate(value, { abortEarly: false })
    if (!result.error) {
      return { ok: true, value: result.value }
    }

    const issues = (result.error.details || []).map(detail => {
      const entry = detail as { path?: unknown; type?: unknown; message?: unknown; context?: Record<string, unknown> }
      return {
        path: normalizeJoiPath(entry.path),
        code: typeof entry.type === 'string' ? entry.type : 'invalid',
        message: typeof entry.message === 'string' ? entry.message : undefined,
        messageParams: entry.context,
        source: 'joi' as const,
        raw: detail,
      }
    })

    return { ok: false, failure: buildFailure('joi', issues, 'Joi validation failed.', context) }
  },
}

const yupAdapter: RuntimeSchemaAdapter = {
  kind: 'yup',
  validate(value, schema, context) {
    const yupSchema = schema as { validateSync?: (input: unknown, options?: unknown) => unknown }
    if (typeof yupSchema.validateSync !== 'function') {
      throw new Error('Expected a Yup schema with validateSync().')
    }

    try {
      return { ok: true, value: yupSchema.validateSync(value, { abortEarly: false }) }
    } catch (error) {
      const validationError = error as ValidationErrorLike
      const errors = validationError.inner && validationError.inner.length > 0 ? validationError.inner : [validationError]
      const issues = errors.map(entry => {
        const yupEntry = entry as { path?: unknown; type?: unknown; message?: unknown; params?: Record<string, unknown> }
        return {
          path: typeof yupEntry.path === 'string' ? yupEntry.path : '',
          code: typeof yupEntry.type === 'string' ? yupEntry.type : 'invalid',
          message: typeof yupEntry.message === 'string' ? yupEntry.message : undefined,
          messageParams: yupEntry.params,
          source: 'yup' as const,
          raw: entry,
        }
      })

      return { ok: false, failure: buildFailure('yup', issues, 'Yup validation failed.', context) }
    }
  },
}

const superstructAdapter: RuntimeSchemaAdapter = {
  kind: 'superstruct',
  validate(value, schema, context) {
    const { validate } = superstructModule ?? (superstructModule = loadOptionalModule<SuperstructModule>('superstruct'))
    const [error, result] = validate(value, schema)

    if (!error) {
      return { ok: true, value: result }
    }

    const structError = error as ValidationErrorLike
    const failures = typeof structError.failures === 'function' ? Array.from(structError.failures()) : [structError]
    const issues = failures.map(entry => {
      const failure = entry as { path?: unknown; refinement?: unknown; type?: unknown; message?: unknown; value?: unknown }
      const code = typeof failure.refinement === 'string' ? failure.refinement : typeof failure.type === 'string' ? failure.type : 'invalid'
      return {
        path: normalizePath(failure.path),
        code,
        message: typeof failure.message === 'string' ? failure.message : undefined,
        source: 'superstruct' as const,
        raw: entry,
      }
    })

    return { ok: false, failure: buildFailure('superstruct', issues, 'Superstruct validation failed.', context) }
  },
}

function getIoTsDecodeResult(schema: unknown, value: unknown) {
  const codec = schema as { decode?: (input: unknown) => unknown }
  if (typeof codec.decode !== 'function') {
    throw new Error('Expected an io-ts codec with decode().')
  }

  return codec.decode(value) as { _tag?: string; left?: unknown; right?: unknown }
}

function getIoTsSummary(decoded: unknown): string {
  try {
    const reporterModule = loadOptionalModule<IoTsReporterModule>('io-ts/PathReporter')
    const reporter = reporterModule.PathReporter
    if (reporter && typeof reporter.report === 'function') {
      return reporter.report(decoded).join('; ')
    }
  } catch {
    // Ignore reporter loading issues and fall back to a generic summary.
  }

  return 'io-ts validation failed.'
}

const ioTsAdapter: RuntimeSchemaAdapter = {
  kind: 'io-ts',
  validate(value, schema, context) {
    const decoded = getIoTsDecodeResult(schema, value)
    if (decoded && decoded._tag === 'Right') {
      return { ok: true, value: decoded.right }
    }

    const validationErrors = (decoded && decoded._tag === 'Left' ? decoded.left : []) as unknown[]
    const issues = validationErrors.map(entry => {
      const validationError = entry as { context?: Array<{ key?: string; type?: { name?: string } }>; message?: unknown; value?: unknown }
      const contextPath = (validationError.context || []).slice(1).map(item => item.key).filter((segment): segment is string => !!segment)
      const finalType = validationError.context?.[validationError.context.length - 1]?.type?.name
      const message = typeof validationError.message === 'string' ? validationError.message : undefined
      const messageKey = maybeMessageKey(message)

      return {
        path: contextPath.join('.'),
        code: typeof finalType === 'string' ? finalType : 'invalid',
        ...(message ? { message } : {}),
        ...(messageKey ? { messageKey } : {}),
        source: 'io-ts' as const,
        raw: entry,
      }
    })

    return { ok: false, failure: buildFailure('io-ts', issues, getIoTsSummary(decoded), context) }
  },
}

const adapterRegistry: Record<Tsoa.ExternalValidatorKind, RuntimeSchemaAdapter> = {
  'io-ts': ioTsAdapter,
  joi: joiAdapter,
  superstruct: superstructAdapter,
  yup: yupAdapter,
  zod: zodAdapter,
}

export function validateExternalSchema(
  kind: Tsoa.ExternalValidatorKind,
  schema: unknown,
  value: unknown,
  context: Tsoa.ValidationContext = {},
): RuntimeSchemaAdapterResult {
  return adapterRegistry[kind].validate(value, schema, context)
}
