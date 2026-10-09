import equals from 'validator/lib/equals'
import { validateUnion, validateIntersection } from './combinedValidation'
import { validateModel, validateNestedObjectLiteral, type ValidateNestedObjectLiteralOptions } from './objectValidation'
import { validateArray, type ValidateArrayOptions } from './arrayValidation'
import { validateInt, validateFloat, validateDate, validateDateTime, validateString, validateBool } from './primitiveValidation'
import { getParameterExternalValidatorMetadata } from '../decorators/validate'
import { Tsoa } from '../metadataGeneration/tsoa'
import { AdditionalProps } from './additionalProps'
import { validateExternalSchema } from './externalValidation'
import { TsoaRoute } from './tsoa-route'
import ValidatorKey = Tsoa.ValidatorKey

/** Metadata about the parameter currently being validated. */
export interface ParameterValidationMetadata {
  controllerClass?: object
  methodName?: string
  parameterIndex?: number
}

type ValidateNestedObjectLiteralTupleArgs = [
  string,
  unknown,
  FieldErrors,
  boolean,
  { [name: string]: TsoaRoute.PropertySchema } | undefined,
  TsoaRoute.PropertySchema | boolean | undefined,
  string?,
  ParameterValidationMetadata?,
]

type ValidateArrayTupleArgs = [string, unknown, FieldErrors, boolean, TsoaRoute.PropertySchema?, ArrayValidator?, string?, ParameterValidationMetadata?]

type ValidateParamOptions<TValue> = {
  property: TsoaRoute.PropertySchema
  value: TValue
  generatedModels: TsoaRoute.Models
  name?: string
  fieldErrors: FieldErrors
  isBodyParam: boolean
  parent?: string
  config: AdditionalProps
  metadata?: ParameterValidationMetadata
}

type ValidateParamTupleArgs<TValue> = [TsoaRoute.PropertySchema, TValue, TsoaRoute.Models, string | undefined, FieldErrors, boolean, string | undefined, AdditionalProps, ParameterValidationMetadata?]

const normalizeValidateParamArgs = <TValue>(args: [ValidateParamOptions<TValue>] | ValidateParamTupleArgs<TValue>): ValidateParamOptions<TValue> => {
  if (args.length === 1) {
    return args[0]
  }

  const [property, value, generatedModels, name, fieldErrors, isBodyParam, parent, config, metadata] = args
  return { property, value, generatedModels, name, fieldErrors, isBodyParam, parent, config, metadata }
}

/** Validates a runtime value against the generated tsoa route schema metadata. */
export function ValidateParam<TValue>(options: ValidateParamOptions<TValue>): TValue
/**
 * @deprecated Use the object overload instead.
 */
export function ValidateParam<TValue>(...args: ValidateParamTupleArgs<TValue>): TValue // NOSONAR: deprecated overload preserves the historical custom-template signature.
export function ValidateParam<TValue>(...args: [ValidateParamOptions<TValue>] | ValidateParamTupleArgs<TValue>): TValue {
  const { property, value, generatedModels, name, fieldErrors, isBodyParam, parent, config, metadata } = normalizeValidateParamArgs(args)
  return new ValidationService(generatedModels, config).ValidateParam(property, value, name ?? '', fieldErrors, isBodyParam, parent ?? '', metadata)
}

/** Validation engine used by generated route handlers. */
export class ValidationService {
  private readonly validationStack: Set<string> = new Set()

  constructor(
    private readonly models: TsoaRoute.Models,
    private readonly config: AdditionalProps,
  ) {}

  public ValidateParam<TValue>(
    property: TsoaRoute.PropertySchema,
    rawValue: TValue,
    name: string | undefined,
    fieldErrors: FieldErrors,
    isBodyParam: boolean,
    parent?: string,
    metadata?: ParameterValidationMetadata,
  ): TValue
  public ValidateParam(
    property: TsoaRoute.PropertySchema,
    rawValue: unknown,
    name: string | undefined,
    fieldErrors: FieldErrors,
    isBodyParam: boolean,
    parent?: string,
    metadata?: ParameterValidationMetadata,
  ): unknown {
    const resolvedName = name ?? ''
    const resolvedParent = parent ?? ''
    const handledUndefined = this.handleUndefinedValue({
      property,
      rawValue,
      name: resolvedName,
      fieldErrors,
      parent: resolvedParent,
    })
    if (handledUndefined.handled) {
      return handledUndefined.value
    }

    const value = handledUndefined.value
    if (property.validationStrategy === 'external' && property.externalValidator) {
      return this.validateExternal(resolvedName, value, fieldErrors, property, resolvedParent, metadata)
    }

    return this.validateResolvedProperty({
      property,
      value,
      name: resolvedName,
      fieldErrors,
      isBodyParam,
      parent: resolvedParent,
      metadata,
    })
  }

  private handleUndefinedValue({ property, rawValue, name, fieldErrors, parent }: { property: TsoaRoute.PropertySchema; rawValue: unknown; name: string; fieldErrors: FieldErrors; parent: string }): {
    handled: boolean
    value: unknown
  } {
    if (rawValue !== undefined || property.dataType === 'undefined') {
      return { handled: false, value: rawValue }
    }

    if (property.default !== undefined || (property.dataType === 'union' && property.subSchemas?.some(p => p.dataType === 'undefined'))) {
      return { handled: false, value: property.default }
    }

    if (property.required) {
      fieldErrors[parent + name] = {
        message: this.getRequiredFieldMessage(property.validators, name),
        value: rawValue,
      }
      return { handled: true, value: rawValue }
    }

    return { handled: true, value: rawValue }
  }

  private getRequiredFieldMessage(validators: TsoaRoute.PropertySchema['validators'], name: string): string {
    let message = `'${name}' is required`
    if (!validators) {
      return message
    }

    Object.keys(validators).forEach((key: string) => {
      const errorMsg = validators[key as ValidatorKey]?.errorMsg
      if (key.startsWith('is') && errorMsg) {
        message = errorMsg
      }
    })

    return message
  }

  private validateResolvedProperty({
    property,
    value,
    name,
    fieldErrors,
    isBodyParam,
    parent,
    metadata,
  }: {
    property: TsoaRoute.PropertySchema
    value: unknown
    name: string
    fieldErrors: FieldErrors
    isBodyParam: boolean
    parent: string
    metadata?: ParameterValidationMetadata
  }): unknown {
    switch (property.dataType) {
      case 'string':
        return this.validateString(name, value, fieldErrors, property.validators as StringValidator, parent)
      case 'boolean':
        return this.validateBool(name, value, fieldErrors, isBodyParam, property.validators, parent)
      case 'integer':
      case 'long':
        return this.validateInt(name, value, fieldErrors, isBodyParam, property.validators as IntegerValidator, parent)
      case 'float':
      case 'double':
        return this.validateFloat(name, value, fieldErrors, isBodyParam, property.validators as FloatValidator, parent)
      case 'enum':
        return this.validateEnum(name, value, fieldErrors, property.enums, parent)
      case 'array':
        return this.validateArray({
          name,
          value,
          fieldErrors,
          isBodyParam,
          schema: property.array,
          validators: property.validators as ArrayValidator,
          parent,
          metadata,
        })
      case 'date':
        return this.validateDate(name, value, fieldErrors, isBodyParam, property.validators as DateValidator, parent)
      case 'datetime':
        return this.validateDateTime(name, value, fieldErrors, isBodyParam, property.validators as DateTimeValidator, parent)
      case 'buffer':
        return this.validateBuffer(name, value, fieldErrors, parent)
      case 'union':
        return this.validateUnion(name, value, fieldErrors, isBodyParam, property, parent, metadata)
      case 'intersection':
        return this.validateIntersection(name, value, fieldErrors, isBodyParam, property.subSchemas, parent, metadata)
      case 'undefined':
        return this.validateUndefined(name, value, fieldErrors, parent)
      case 'any':
        return value
      case 'nestedObjectLiteral':
        return this.validateNestedObjectLiteral({
          name,
          value,
          fieldErrors,
          isBodyParam,
          nestedProperties: property.nestedProperties,
          additionalProperties: property.additionalProperties,
          parent,
          metadata,
        })
      default:
        if (property.ref) {
          // Detect circular references to prevent stack overflow
          const refPath = `${parent}${name}:${property.ref}`
          if (this.validationStack.has(refPath)) {
            return value
          }

          this.validationStack.add(refPath)
          try {
            return this.validateModel({ name, value, modelDefinition: this.models[property.ref], fieldErrors, isBodyParam, parent, metadata })
          } finally {
            this.validationStack.delete(refPath)
          }
        }
        return value
    }
  }

  private validateExternal(name: string, rawValue: unknown, fieldErrors: FieldErrors, property: TsoaRoute.PropertySchema, parent: string, metadata?: ParameterValidationMetadata): unknown {
    const value = rawValue === undefined && property.default !== undefined ? property.default : rawValue
    const runtimeMetadata = this.getRuntimeExternalValidatorMetadata(metadata, property)
    const fieldPath = parent + name

    if (!runtimeMetadata) {
      fieldErrors[fieldPath] = {
        message: `Missing runtime schema metadata for external validator '${property.externalValidator?.kind || 'unknown'}' on '${fieldPath || '(anonymous parameter)'}'. Ensure the controller module is imported so decorators run, and ensure custom templates pass controllerClass, methodName, and parameterIndex into validation.`,
        value,
      }
      return undefined
    }

    const declaredKind = property.externalValidator?.kind
    const runtimeKind = runtimeMetadata.kind

    if (declaredKind && declaredKind !== runtimeKind) {
      fieldErrors[fieldPath] = {
        message: `External validator kind mismatch for '${fieldPath}'. Route schema expects '${declaredKind}' but runtime metadata provided '${runtimeKind}'.`,
        value,
      }
      return undefined
    }

    const kindToUse = declaredKind || runtimeKind
    const result = validateExternalSchema(kindToUse, runtimeMetadata.schema, value, this.config.validation ?? {})
    if (result.ok) {
      return result.value
    }

    this.projectExternalFailureToFieldErrors(result.failure, fieldErrors, name, parent, value)
    return undefined
  }

  private getRuntimeExternalValidatorMetadata(metadata: ParameterValidationMetadata | undefined, property: TsoaRoute.PropertySchema) {
    if (!metadata?.controllerClass || metadata.parameterIndex === undefined || !metadata.methodName || !property.externalValidator) {
      return undefined
    }

    const controllerTarget = metadata.controllerClass as object & { prototype?: object }
    const candidateTargets = controllerTarget.prototype ? [controllerTarget.prototype, controllerTarget] : [controllerTarget]

    for (const target of candidateTargets) {
      const runtimeMetadata = getParameterExternalValidatorMetadata(target, metadata.methodName, metadata.parameterIndex)
      if (runtimeMetadata) {
        return runtimeMetadata
      }
    }

    return undefined
  }

  private projectExternalFailureToFieldErrors(failure: Tsoa.ValidationFailure, fieldErrors: FieldErrors, name: string, parent: string, value: unknown) {
    if (failure.issues.length === 0) {
      fieldErrors[parent + name] = {
        message: failure.summaryMessage,
        value,
      }
      return
    }

    for (const issue of failure.issues) {
      const baseFieldPath = parent + name
      const fieldPath = issue.path ? this.buildIssueFieldPath(baseFieldPath, issue.path) : baseFieldPath
      if (!fieldErrors[fieldPath]) {
        fieldErrors[fieldPath] = {
          message: issue.message || failure.summaryMessage,
          value,
        }
      }
    }
  }

  public hasCorrectJsType(value: unknown, type: 'object' | 'boolean' | 'number' | 'string', isBodyParam: boolean): boolean {
    return !isBodyParam || this.config.bodyCoercion || typeof value === type
  }

  public validateNestedObjectLiteral(...args: [ValidateNestedObjectLiteralOptions]): unknown
  /**
   * @deprecated Use the object overload instead.
   */
  public validateNestedObjectLiteral(...args: ValidateNestedObjectLiteralTupleArgs): unknown
  public validateNestedObjectLiteral(...args: [ValidateNestedObjectLiteralOptions] | ValidateNestedObjectLiteralTupleArgs) {
    return validateNestedObjectLiteral(this.normalizeValidateNestedObjectLiteralArgs(args), this, this.config)
  }

  private normalizeValidateNestedObjectLiteralArgs(args: [ValidateNestedObjectLiteralOptions] | ValidateNestedObjectLiteralTupleArgs): ValidateNestedObjectLiteralOptions {
    if (typeof args[0] === 'string') {
      const tupleArgs = args as ValidateNestedObjectLiteralTupleArgs
      const [name, value, fieldErrors, isBodyParam, nestedProperties, additionalProperties, parent = '', metadata] = tupleArgs
      return { name, value, fieldErrors, isBodyParam, nestedProperties, additionalProperties, parent, metadata }
    }

    return args[0]
  }

  public validateInt(name: string, value: unknown, fieldErrors: FieldErrors, isBodyParam: boolean, validators?: IntegerValidator, parent = ''): number | undefined {
    return validateInt(name, value, fieldErrors, this.hasCorrectJsType(value, 'number', isBodyParam), validators, parent)
  }

  public validateFloat(name: string, value: unknown, fieldErrors: FieldErrors, isBodyParam: boolean, validators?: FloatValidator, parent = ''): number | undefined {
    return validateFloat(name, value, fieldErrors, this.hasCorrectJsType(value, 'number', isBodyParam), validators, parent)
  }

  public validateEnum(name: string, value: unknown, fieldErrors: FieldErrors, members?: Array<string | number | boolean | null>, parent = ''): unknown {
    if (!members || members.length === 0) {
      fieldErrors[parent + name] = {
        message: 'no member',
        value,
      }
      return
    }

    const enumMatchIndex = members.findIndex(member => equals(String(member), String(value)))

    if (enumMatchIndex === -1) {
      const membersInQuotes = members.map(member => (typeof member === 'string' ? `'${member}'` : String(member)))
      fieldErrors[parent + name] = {
        message: `should be one of the following; [${membersInQuotes.join(',')}]`,
        value,
      }
      return
    }

    return members[enumMatchIndex]
  }

  public validateDate(name: string, value: unknown, fieldErrors: FieldErrors, isBodyParam: boolean, validators?: DateValidator, parent = ''): Date | undefined {
    return validateDate(name, value, fieldErrors, this.hasCorrectJsType(value, 'string', isBodyParam), validators, parent)
  }

  public validateDateTime(name: string, value: unknown, fieldErrors: FieldErrors, isBodyParam: boolean, validators?: DateTimeValidator, parent = ''): Date | undefined {
    return validateDateTime(name, value, fieldErrors, this.hasCorrectJsType(value, 'string', isBodyParam), validators, parent)
  }

  public validateString(name: string, value: unknown, fieldErrors: FieldErrors, validators?: StringValidator, parent = ''): string | undefined {
    return validateString(name, value, fieldErrors, validators, parent)
  }

  public validateBool(name: string, value: unknown, fieldErrors: FieldErrors, isBodyParam: boolean, validators?: BooleanValidator, parent = ''): boolean | undefined {
    return validateBool(name, value, fieldErrors, isBodyParam, this.config, validators, parent)
  }

  public validateUndefined(name: string, value: unknown, fieldErrors: FieldErrors, parent = ''): undefined {
    if (value === undefined) {
      return undefined
    }

    const message = 'invalid undefined value'
    fieldErrors[parent + name] = {
      message,
      value,
    }
  }

  public validateArray(options: ValidateArrayOptions): unknown[] | undefined
  /**
   * @deprecated Use the object overload instead.
   */
  public validateArray(...args: ValidateArrayTupleArgs): unknown[] | undefined
  public validateArray(...args: [ValidateArrayOptions] | ValidateArrayTupleArgs): unknown[] | undefined {
    return validateArray(this.normalizeValidateArrayArgs(args), this, this.config)
  }

  private normalizeValidateArrayArgs(args: [ValidateArrayOptions] | ValidateArrayTupleArgs): ValidateArrayOptions {
    if (typeof args[0] === 'string') {
      const [name, value, fieldErrors, isBodyParam, schema, validators, parent = '', metadata] = args as ValidateArrayTupleArgs
      return { name, value, fieldErrors, isBodyParam, schema, validators, parent, metadata }
    }

    return args[0]
  }

  private buildIssueFieldPath(baseFieldPath: string, issuePath: string): string {
    return baseFieldPath ? `${baseFieldPath}.${issuePath}` : issuePath
  }

  public validateBuffer(name: string, value: unknown, fieldErrors: FieldErrors, parent = ''): Buffer | undefined {
    if (Buffer.isBuffer(value)) {
      return value
    }

    if (typeof value === 'string') {
      return Buffer.from(value)
    }

    if (value instanceof Uint8Array) {
      return Buffer.from(value)
    }

    fieldErrors[parent + name] = {
      message: 'invalid buffer value',
      value,
    }
    return undefined
  }

  public validateUnion<TValue>(
    name: string,
    value: TValue,
    fieldErrors: FieldErrors,
    isBodyParam: boolean,
    property: TsoaRoute.PropertySchema,
    parent?: string,
    metadata?: ParameterValidationMetadata,
  ): TValue
  public validateUnion(name: string, value: unknown, fieldErrors: FieldErrors, isBodyParam: boolean, property: TsoaRoute.PropertySchema, parent = '', metadata?: ParameterValidationMetadata): unknown {
    return validateUnion({ name, value, fieldErrors, isBodyParam, property, parent, metadata }, this, this.config)
  }

  public validateIntersection<TValue>(
    name: string,
    value: TValue,
    fieldErrors: FieldErrors,
    isBodyParam: boolean,
    subSchemas: TsoaRoute.PropertySchema[] | undefined,
    parent?: string,
    metadata?: ParameterValidationMetadata,
  ): TValue
  public validateIntersection(
    name: string,
    value: unknown,
    fieldErrors: FieldErrors,
    isBodyParam: boolean,
    subSchemas: TsoaRoute.PropertySchema[] | undefined,
    parent = '',
    metadata?: ParameterValidationMetadata,
  ): unknown {
    return validateIntersection({ name, value, fieldErrors, isBodyParam, subSchemas, parent, metadata }, this.models, this.config, ValidationService)
  }

  public validateModel<TValue>(input: {
    name: string
    value: TValue
    modelDefinition: TsoaRoute.ModelSchema
    fieldErrors: FieldErrors
    isBodyParam: boolean
    parent?: string
    metadata?: ParameterValidationMetadata
  }): TValue
  public validateModel(input: {
    name: string
    value: unknown
    modelDefinition: TsoaRoute.ModelSchema
    fieldErrors: FieldErrors
    isBodyParam: boolean
    parent?: string
    metadata?: ParameterValidationMetadata
  }): unknown {
    return validateModel(input, this, this.config)
  }
}

/** Integer validation rules supported by runtime route metadata. */
export interface IntegerValidator {
  isInt?: { errorMsg?: string }
  isLong?: { errorMsg?: string }
  minimum?: { value: number; errorMsg?: string }
  maximum?: { value: number; errorMsg?: string }
  exclusiveMinimum?: { value: number; errorMsg?: string }
  exclusiveMaximum?: { value: number; errorMsg?: string }
}

/** Floating-point validation rules supported by runtime route metadata. */
export interface FloatValidator {
  isFloat?: { errorMsg?: string }
  isDouble?: { errorMsg?: string }
  minimum?: { value: number; errorMsg?: string }
  maximum?: { value: number; errorMsg?: string }
  exclusiveMinimum?: { value: number; errorMsg?: string }
  exclusiveMaximum?: { value: number; errorMsg?: string }
}

/** Date-only validation rules supported by runtime route metadata. */
export interface DateValidator {
  isDate?: { errorMsg?: string }
  minDate?: { value: string; errorMsg?: string }
  maxDate?: { value: string; errorMsg?: string }
}

/** Date-time validation rules supported by runtime route metadata. */
export interface DateTimeValidator {
  isDateTime?: { errorMsg?: string }
  minDate?: { value: string; errorMsg?: string }
  maxDate?: { value: string; errorMsg?: string }
}

/** String validation rules supported by runtime route metadata. */
export interface StringValidator {
  isString?: { errorMsg?: string }
  minLength?: { value: number; errorMsg?: string }
  maxLength?: { value: number; errorMsg?: string }
  pattern?: { value: string; errorMsg?: string }
  title?: { value: string; errorMsg?: string }
}

/** Boolean validation rules supported by runtime route metadata. */
export interface BooleanValidator {
  isBoolean?: { errorMsg?: string }
}

/** Array validation rules supported by runtime route metadata. */
export interface ArrayValidator {
  isArray?: { errorMsg?: string }
  minItems?: { value: number; errorMsg?: string }
  maxItems?: { value: number; errorMsg?: string }
  uniqueItems?: { errorMsg?: string }
}

/** Union of validation rule groups used by generated route metadata. */
export type Validator = IntegerValidator | FloatValidator | DateValidator | DateTimeValidator | StringValidator | BooleanValidator | ArrayValidator

/** Collected field-level validation errors keyed by field path. */
export interface FieldErrors {
  [name: string]: { message: string; value?: unknown }
}

/** Error shape exposed by runtime validation failures. */
export interface Exception extends Error {
  status: number
}

/** Error thrown when request validation fails in generated routes. */
export class ValidateError extends Error implements Exception {
  public status = 400
  public name = 'ValidateError'

  constructor(
    public fields: FieldErrors,
    public message: string,
  ) {
    super(message)
    Object.setPrototypeOf(this, ValidateError.prototype)
  }
}
