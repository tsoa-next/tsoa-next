import { Tsoa } from '../metadataGeneration/tsoa'

const VALIDATE_METADATA_KEY = Symbol.for('@tsoa-next/runtime:validate')
const CONSTRUCTOR_PROPERTY = '__constructor__'

type ValidateDecoratorConfig = {
  kind: Tsoa.ExternalValidatorKind
  schema: unknown
}

type ValidateMetadataStore = Record<string, Record<number, ValidateDecoratorConfig>>
type DecoratorPropertyKey = string | symbol | undefined
type ValidateDecoratorShape = { kind?: unknown; schema?: unknown }

function inferValidatorKind(schema: unknown): Tsoa.ExternalValidatorKind | undefined {
  if (!schema || typeof schema !== 'object') {
    return undefined
  }

  const candidate = schema as Record<string, unknown>

  if (typeof candidate.safeParse === 'function') {
    return 'zod'
  }

  if (typeof candidate.decode === 'function' && typeof candidate.encode === 'function' && typeof candidate.is === 'function') {
    return 'io-ts'
  }

  if (typeof candidate.validateSync === 'function' && typeof candidate.describe === 'function') {
    return 'yup'
  }

  if (candidate.isJoi === true || (typeof candidate.validate === 'function' && candidate.$_terms && typeof candidate.type === 'string')) {
    return 'joi'
  }

  if (typeof candidate.validator === 'function' && typeof candidate.refiner === 'function' && typeof candidate.type === 'string') {
    return 'superstruct'
  }

  return undefined
}

function isValidateDecoratorShape(value: unknown): value is ValidateDecoratorShape {
  return !!value && typeof value === 'object' && 'kind' in value && 'schema' in value
}

function requireSchemaValue(schema: unknown): unknown {
  if (schema === undefined) {
    throw new TypeError('@Validate requires a schema value.')
  }

  return schema
}

function normalizeSingleValidateDecoratorArg(value: unknown): ValidateDecoratorConfig {
  if (isValidateDecoratorShape(value)) {
    const { kind, schema } = value
    if (!isExternalValidatorKind(kind)) {
      throw new TypeError(`@Validate received unsupported validator kind '${String(kind)}'.`)
    }

    return { kind, schema: requireSchemaValue(schema) }
  }

  if (isExternalValidatorKind(value)) {
    throw new TypeError(`@Validate('${value}', schema) requires a schema value.`)
  }

  const inferredKind = inferValidatorKind(value)
  if (!inferredKind) {
    throw new TypeError('@Validate(schema) could not infer the validator kind. Use @Validate(kind, schema) instead.')
  }

  return { kind: inferredKind, schema: value }
}

function normalizeKindAndSchemaArgs(kind: unknown, schema: unknown): ValidateDecoratorConfig {
  if (!isExternalValidatorKind(kind)) {
    throw new TypeError(`@Validate received unsupported validator kind '${String(kind)}'.`)
  }

  return { kind, schema: requireSchemaValue(schema) }
}

function normalizeValidateDecoratorArgs(args: unknown[]): ValidateDecoratorConfig {
  switch (args.length) {
    case 0:
      throw new TypeError('@Validate requires a schema argument.')
    case 1:
      return normalizeSingleValidateDecoratorArg(args[0])
    case 2:
      return normalizeKindAndSchemaArgs(args[0], args[1])
    default:
      throw new TypeError('@Validate accepts only (schema), (kind, schema), or ({ kind, schema }).')
  }
}

function isExternalValidatorKind(value: unknown): value is Tsoa.ExternalValidatorKind {
  return value === 'zod' || value === 'joi' || value === 'yup' || value === 'superstruct' || value === 'io-ts'
}

function getPropertyKey(propertyKey: DecoratorPropertyKey): string {
  return propertyKey === undefined ? CONSTRUCTOR_PROPERTY : String(propertyKey)
}

function getValidateMetadataStore(target: object): ValidateMetadataStore {
  const existing = Reflect.getOwnMetadata(VALIDATE_METADATA_KEY, target) as ValidateMetadataStore | undefined
  if (existing) {
    return existing
  }

  const created: ValidateMetadataStore = {}
  Reflect.defineMetadata(VALIDATE_METADATA_KEY, created, target)
  return created
}

export function getParameterExternalValidatorMetadata(target: object, propertyKey: DecoratorPropertyKey, parameterIndex: number): ValidateDecoratorConfig | undefined {
  const lookupKey = getPropertyKey(propertyKey)
  let currentTarget: object | null = target

  while (currentTarget) {
    const store = Reflect.getOwnMetadata(VALIDATE_METADATA_KEY, currentTarget) as ValidateMetadataStore | undefined
    const parameterMetadata = store?.[lookupKey]?.[parameterIndex]
    if (parameterMetadata) {
      return parameterMetadata
    }

    currentTarget = Object.getPrototypeOf(currentTarget) as object | null
  }

  return undefined
}

export function Validate(...args: unknown[]): ParameterDecorator {
  const normalized = normalizeValidateDecoratorArgs(args)

  return (target, propertyKey, parameterIndex) => {
    const store = getValidateMetadataStore(target)
    const lookupKey = getPropertyKey(propertyKey)
    const propertyStore = store[lookupKey] || {}
    propertyStore[parameterIndex] = normalized
    store[lookupKey] = propertyStore
    Reflect.defineMetadata(VALIDATE_METADATA_KEY, store, target)
  }
}
