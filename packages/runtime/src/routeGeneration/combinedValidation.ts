import { assertNever } from '../utils/assertNever'
import { getExcessPropertiesFor } from './objectValidation'
import type { AdditionalProps } from './additionalProps'
import type { FieldErrors, ParameterValidationMetadata, ValidationService } from './templateHelpers'
import type { TsoaRoute } from './tsoa-route'

const objectHasOwn = (value: object, key: PropertyKey): boolean => Object.getOwnPropertyDescriptor(value, key) !== undefined

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

interface CombinedValidationInput {
  name: string
  value: unknown
  fieldErrors: FieldErrors
  isBodyParam: boolean
  parent: string
  metadata: ParameterValidationMetadata | undefined
}

interface UnionValidationInput extends CombinedValidationInput {
  property: TsoaRoute.PropertySchema
}

interface IntersectionValidationInput extends CombinedValidationInput {
  subSchemas: TsoaRoute.PropertySchema[] | undefined
}

export function validateUnion(
  { name, value, fieldErrors, isBodyParam, property, parent, metadata }: UnionValidationInput,
  service: Pick<ValidationService, 'ValidateParam'>,
  config: AdditionalProps,
): unknown {
  if (!property.subSchemas) {
    throw new Error(
      'internal tsoa error: ' +
        'the metadata that was generated should have had sub schemas since it’s for a union, however it did not. ' +
        'Please file an issue with tsoa at https://github.com/tsoa-next/tsoa-next/issues',
    )
  }

  const subFieldErrors: FieldErrors[] = []

  for (const subSchema of property.subSchemas) {
    const subFieldError: FieldErrors = {}

    // Clean value if it's not undefined or use undefined directly if it's undefined.
    // Value can be undefined if undefined is allowed datatype of the union
    const validateableValue = value === undefined ? value : deepClone(value)
    const cleanValue = service.ValidateParam({ ...subSchema, validators: { ...property.validators, ...subSchema.validators } }, validateableValue, name, subFieldError, isBodyParam, parent, metadata)
    subFieldErrors.push(subFieldError)

    if (Object.keys(subFieldError).length === 0) {
      return cleanValue
    }
  }

  addSummarizedError(fieldErrors, parent + name, 'Could not match the union against any of the items. Issues: ', subFieldErrors, value, config)
  return undefined
}

export function validateIntersection(
  { name, value, fieldErrors, isBodyParam, subSchemas, parent, metadata }: IntersectionValidationInput,
  models: TsoaRoute.Models,
  config: AdditionalProps,
  Service: typeof ValidationService,
): unknown {
  if (!subSchemas) {
    throw new Error(
      'internal tsoa error: ' +
        'the metadata that was generated should have had sub schemas since it’s for a intersection, however it did not. ' +
        'Please file an issue with tsoa at https://github.com/tsoa-next/tsoa-next/issues',
    )
  }

  const subFieldErrors: FieldErrors[] = []
  let cleanValues: Record<string, unknown> = {}

  subSchemas.forEach(subSchema => {
    const subFieldError: FieldErrors = {}
    const cleanValue = createChildValidationService(models, config, Service, {
      noImplicitAdditionalProperties: 'silently-remove-extras',
    }).ValidateParam(subSchema, deepClone(value), name, subFieldError, isBodyParam, parent, metadata)
    if (isRecord(cleanValue)) {
      cleanValues = {
        ...cleanValues,
        ...cleanValue,
      }
    }
    subFieldErrors.push(subFieldError)
  })

  const filtered = subFieldErrors.filter(subFieldError => Object.keys(subFieldError).length !== 0)

  if (filtered.length > 0) {
    addSummarizedError(fieldErrors, parent + name, 'Could not match the intersection against every type. Issues: ', filtered, value, config)
    return
  }

  const schemas = selfIntersectionCombinations(subSchemas.map(subSchema => toModelLike(subSchema, models)))

  const getRequiredPropError = (schema: TsoaRoute.ModelSchema) => {
    const requiredPropError = {}
    createChildValidationService(models, config, Service, {
      noImplicitAdditionalProperties: 'ignore',
    }).validateModel({
      name,
      value: deepClone(value),
      modelDefinition: schema,
      fieldErrors: requiredPropError,
      isBodyParam,
      metadata,
    })
    return requiredPropError
  }

  const schemasWithRequiredProps = schemas.filter(schema => Object.keys(getRequiredPropError(schema)).length === 0)

  if (config.noImplicitAdditionalProperties === 'ignore') {
    return isRecord(value) ? { ...value, ...cleanValues } : cleanValues
  }

  if (config.noImplicitAdditionalProperties === 'silently-remove-extras') {
    if (schemasWithRequiredProps.length > 0) {
      return cleanValues
    }

    fieldErrors[parent + name] = {
      message: `Could not match intersection against any of the possible combinations: ${JSON.stringify(schemas.map(s => Object.keys(s.properties)))}`,
      value,
    }
    return
  }

  if (isRecord(value) && schemasWithRequiredProps.some(schema => getExcessPropertiesFor(schema, Object.keys(value), config).length === 0)) {
    return cleanValues
  }

  fieldErrors[parent + name] = {
    message: `Could not match intersection against any of the possible combinations: ${JSON.stringify(schemas.map(s => Object.keys(s.properties)))}`,
    value,
  }
  return undefined
}

function toModelLike(schema: TsoaRoute.PropertySchema, models: TsoaRoute.Models): TsoaRoute.RefObjectModelSchema[] {
  if (schema.ref) {
    const model = models[schema.ref]
    if (model.dataType === 'refObject') {
      return [model]
    } else if (model.dataType === 'refAlias') {
      return [...toModelLike(model.type, models)]
    } else if (model.dataType === 'refEnum') {
      throw new Error(`Can't transform an enum into a model like structure because it does not have properties.`)
    } else {
      return assertNever(model)
    }
  } else if (schema.nestedProperties) {
    return [{ dataType: 'refObject', properties: schema.nestedProperties, additionalProperties: schema.additionalProperties }]
  } else if (schema.subSchemas && schema.dataType === 'intersection') {
    const modelss: TsoaRoute.RefObjectModelSchema[][] = schema.subSchemas.map(subSchema => toModelLike(subSchema, models))

    return selfIntersectionCombinations(modelss)
  }

  if (schema.subSchemas && schema.dataType === 'union') {
    return schema.subSchemas.flatMap(subSchema => toModelLike(subSchema, models))
  }

  // There are no properties to check for excess here.
  return [{ dataType: 'refObject', properties: {}, additionalProperties: false }]
}

/**
 * combine all schemas once, ignoring order ie
 * input: [[value1], [value2]] should be [[value1, value2]]
 * not [[value1, value2],[value2, value1]]
 * and
 * input: [[value1, value2], [value3, value4], [value5, value6]] should be [
 *   [value1, value3, value5],
 *   [value1, value3, value6],
 *   [value1, value4, value5],
 *   [value1, value4, value6],
 *   [value2, value3, value5],
 *   [value2, value3, value6],
 *   [value2, value4, value5],
 *   [value2, value4, value6],
 * ]
 * @param modelSchemass
 */
function selfIntersectionCombinations(modelSchemass: TsoaRoute.RefObjectModelSchema[][]): TsoaRoute.RefObjectModelSchema[] {
  const res: TsoaRoute.RefObjectModelSchema[] = []
  // Picks one schema from each sub-array
  const combinations = getAllCombinations(modelSchemass)

  for (const combination of combinations) {
    // Combine all schemas of this combination
    let currentCollector = { ...combination[0] }
    for (let subSchemaIdx = 1; subSchemaIdx < combination.length; subSchemaIdx++) {
      currentCollector = { ...combineProperties(currentCollector, combination[subSchemaIdx]) }
    }
    res.push(currentCollector)
  }
  return res
}

function getAllCombinations<T>(arrays: T[][]): T[][] {
  function combine(current: T[], index: number) {
    if (index === arrays.length) {
      result.push(current.slice())
      return
    }

    for (const item of arrays[index]) {
      current.push(item)
      combine(current, index + 1)
      current.pop()
    }
  }

  const result: T[][] = []
  combine([], 0)
  return result
}

function combineProperties(a: TsoaRoute.RefObjectModelSchema, b: TsoaRoute.RefObjectModelSchema): TsoaRoute.RefObjectModelSchema {
  return { dataType: 'refObject', properties: { ...a.properties, ...b.properties }, additionalProperties: a.additionalProperties || b.additionalProperties || false }
}

/**
 * Creates a new ValidationService instance with specific configuration
 * @param overrides Configuration overrides
 * @returns New ValidationService instance
 */
function createChildValidationService(models: TsoaRoute.Models, config: AdditionalProps, Service: typeof ValidationService, overrides: Partial<AdditionalProps> = {}): ValidationService {
  return new Service(models, {
    ...config,
    ...overrides,
  })
}

/**
 * Deep clones an object without using JSON.stringify/parse to avoid:
 * 1. Loss of undefined values
 * 2. Loss of functions
 * 3. Conversion of dates to strings
 * 4. Exponential escaping issues with nested objects
 */
function deepClone<T>(obj: T): T {
  // Fast path for primitives
  if (obj === null || obj === undefined) {
    return obj
  }

  const type = typeof obj
  if (type !== 'object') {
    return obj
  }

  // Handle built-in object types
  if (obj instanceof Date) {
    return new Date(obj) as T
  }

  if (obj instanceof RegExp) {
    // Preserve the existing instance instead of reconstructing a pattern from untrusted data.
    return obj
  }

  if (Array.isArray(obj)) {
    const arrayValues = obj as unknown[]
    const clonedArray: unknown = arrayValues.map(value => deepClone(value))
    return clonedArray as T
  }

  if (obj instanceof Buffer) {
    return Buffer.from(obj) as T
  }

  // Handle plain objects
  const cloneObj: Record<string, unknown> = {}
  for (const key in obj) {
    if (objectHasOwn(obj, key)) {
      cloneObj[key] = deepClone((obj as Record<string, unknown>)[key])
    }
  }
  return cloneObj as T
}

/**
 * Adds a summarized error to the fieldErrors object
 * @param fieldErrors The errors object to add to
 * @param errorKey The key for the error
 * @param prefix The error message prefix
 * @param subErrors Array of sub-errors to summarize
 * @param value The value that failed validation
 */
function addSummarizedError(fieldErrors: FieldErrors, errorKey: string, prefix: string, subErrors: FieldErrors[], value: unknown, config: AdditionalProps): void {
  const maxErrorLength = config.maxValidationErrorSize ? config.maxValidationErrorSize - prefix.length : undefined

  fieldErrors[errorKey] = {
    message: `${prefix}${summarizeValidationErrors(subErrors, config, maxErrorLength)}`,
    value,
  }
}

/**
 * Summarizes validation errors to prevent extremely large error messages
 * @param errors Array of field errors from union/intersection validation
 * @param maxLength Maximum length of the summarized message
 * @returns Summarized error message
 */
function summarizeValidationErrors(errors: FieldErrors[], config: AdditionalProps, maxLength?: number): string {
  const effectiveMaxLength = maxLength || config.maxValidationErrorSize || 1000

  // If there are no errors, return empty
  if (errors.length === 0) {
    return '[]'
  }

  // Start with a count of total errors
  const errorCount = errors.length
  const summary: string[] = []

  // Try to include first few errors
  let currentLength = 0
  let includedErrors = 0

  // Calculate the size of the suffix if we need to truncate
  const truncatedSuffix = `,...and ${errorCount} more errors]`
  const reservedSpace = truncatedSuffix.length + 10 // +10 for safety margin

  for (const error of errors) {
    const errorStr = JSON.stringify(error)
    const projectedLength = currentLength + errorStr.length + (summary.length > 0 ? 1 : 0) + 2 // +1 for comma if not first, +2 for brackets

    if (projectedLength + reservedSpace < effectiveMaxLength && includedErrors < 3) {
      summary.push(errorStr)
      currentLength = projectedLength
      includedErrors++
    } else {
      break
    }
  }

  // Build final message
  if (includedErrors < errorCount) {
    const result = `[${summary.join(',')},...and ${errorCount - includedErrors} more errors]`
    // Make sure we don't exceed the limit
    if (result.length > effectiveMaxLength) {
      // If still too long, remove the last error and try again
      if (summary.length > 0) {
        summary.pop()
        includedErrors--
        return `[${summary.join(',')},...and ${errorCount - includedErrors} more errors]`
      }
    }
    return result
  }

  return `[${summary.join(',')}]`
}
