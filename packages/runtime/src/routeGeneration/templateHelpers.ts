import validator from 'validator'
import { getParameterExternalValidatorMetadata } from '../decorators/validate'
import { Tsoa } from '../metadataGeneration/tsoa'
import { assertNever } from '../utils/assertNever'
import { AdditionalProps } from './additionalProps'
import { validateExternalSchema } from './externalValidation'
import { TsoaRoute, isDefaultForAdditionalPropertiesAllowed } from './tsoa-route'
import ValidatorKey = Tsoa.ValidatorKey

export interface ParameterValidationMetadata {
  controllerClass?: object
  methodName?: string
  parameterIndex?: number
}

type ValidateNestedObjectLiteralOptions = {
  name: string
  value: unknown
  fieldErrors: FieldErrors
  isBodyParam: boolean
  nestedProperties: { [name: string]: TsoaRoute.PropertySchema } | undefined
  additionalProperties: TsoaRoute.PropertySchema | boolean | undefined
  parent: string
  metadata?: ParameterValidationMetadata
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

type ValidateArrayOptions = {
  name: string
  value: unknown
  fieldErrors: FieldErrors
  isBodyParam: boolean
  schema?: TsoaRoute.PropertySchema
  validators?: ArrayValidator
  parent: string
  metadata?: ParameterValidationMetadata
}

type ValidateArrayTupleArgs = [string, unknown, FieldErrors, boolean, TsoaRoute.PropertySchema?, ArrayValidator?, string?, ParameterValidationMetadata?]

// for backwards compatibility with custom templates
export function ValidateParam<TValue>(
  property: TsoaRoute.PropertySchema,
  value: TValue,
  generatedModels: TsoaRoute.Models,
  name: string | undefined,
  fieldErrors: FieldErrors,
  isBodyParam: boolean,
  parent: string | undefined,
  config: AdditionalProps,
  metadata?: ParameterValidationMetadata,
): TValue
export function ValidateParam(
  property: TsoaRoute.PropertySchema,
  value: unknown,
  generatedModels: TsoaRoute.Models,
  name = '',
  fieldErrors: FieldErrors,
  isBodyParam: boolean,
  parent = '',
  config: AdditionalProps,
  metadata?: ParameterValidationMetadata,
): unknown {
  return new ValidationService(generatedModels, config).ValidateParam(property, value, name, fieldErrors, isBodyParam, parent, metadata)
}

export class ValidationService {
  private validationStack: Set<string> = new Set()

  constructor(
    private readonly models: TsoaRoute.Models,
    private readonly config: AdditionalProps,
  ) {}

  private isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null && !Array.isArray(value)
  }

  private buildChildPath(parent: string, name: string): string {
    const fieldPath = parent + name
    return fieldPath ? `${fieldPath}.` : ''
  }

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
        return this.validateBool(name, value, fieldErrors, isBodyParam, property.validators as BooleanValidator, parent)
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
    const { name, value, fieldErrors, isBodyParam, nestedProperties, additionalProperties, parent, metadata } = this.normalizeValidateNestedObjectLiteralArgs(args)
    if (!this.isRecord(value)) {
      fieldErrors[parent + name] = {
        message: `invalid object`,
        value,
      }
      return
    }

    const previousErrors = Object.keys(fieldErrors).length

    if (!nestedProperties) {
      throw new Error(
        'internal tsoa error: ' +
          'the metadata that was generated should have had nested property schemas since it’s for a nested object,' +
          'however it did not. ' +
          'Please file an issue with tsoa at https://github.com/tsoa-next/tsoa-next/issues',
      )
    }

    const propHandling = this.config.noImplicitAdditionalProperties
    if (propHandling !== 'ignore') {
      const excessProps = this.getExcessPropertiesFor({ dataType: 'refObject', properties: nestedProperties, additionalProperties }, Object.keys(value))
      if (excessProps.length > 0) {
        if (propHandling === 'silently-remove-extras') {
          excessProps.forEach(excessProp => {
            delete value[excessProp]
          })
        }
        if (propHandling === 'throw-on-extras') {
          fieldErrors[parent + name] = {
            message: `"${excessProps.join(',')}" is an excess property and therefore is not allowed`,
            value: excessProps.reduce<Record<string, unknown>>((acc, propName) => ({ [propName]: value[propName], ...acc }), {}),
          }
        }
      }
    }

    const childPath = this.buildChildPath(parent, name)

    Object.keys(nestedProperties).forEach(key => {
      const validatedProp = this.ValidateParam(nestedProperties[key], value[key], key, fieldErrors, isBodyParam, childPath, metadata)

      // Add value from validator if it's not undefined or if value is required and unfedined is valid type
      if (validatedProp !== undefined || (nestedProperties[key].dataType === 'undefined' && nestedProperties[key].required)) {
        value[key] = validatedProp
      }
    })

    if (typeof additionalProperties === 'object') {
      const keys = Object.keys(value).filter(key => typeof nestedProperties[key] === 'undefined')
      keys.forEach(key => {
        const validatedProp = this.ValidateParam(additionalProperties, value[key], key, fieldErrors, isBodyParam, childPath, metadata)
        // Add value from validator if it's not undefined or if value is required and unfedined is valid type
        if (validatedProp !== undefined || (additionalProperties.dataType === 'undefined' && additionalProperties.required)) {
          value[key] = validatedProp
        }
      })
    }

    if (Object.keys(fieldErrors).length > previousErrors) {
      return
    }

    return value
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
    if (!this.hasCorrectJsType(value, 'number', isBodyParam) || !validator.isInt(String(value))) {
      let message = `invalid integer number`
      if (validators) {
        if (validators.isInt && validators.isInt.errorMsg) {
          message = validators.isInt.errorMsg
        }
        if (validators.isLong && validators.isLong.errorMsg) {
          message = validators.isLong.errorMsg
        }
      }
      fieldErrors[parent + name] = {
        message,
        value,
      }
      return
    }

    const numberValue = validator.toInt(String(value), 10)
    if (!validators) {
      return numberValue
    }
    if (validators.minimum && validators.minimum.value !== undefined) {
      if (validators.minimum.value > numberValue) {
        fieldErrors[parent + name] = {
          message: validators.minimum.errorMsg || `min ${validators.minimum.value}`,
          value,
        }
        return
      }
    }
    if (validators.exclusiveMinimum && validators.exclusiveMinimum.value !== undefined) {
      if (validators.exclusiveMinimum.value >= numberValue) {
        fieldErrors[parent + name] = {
          message: validators.exclusiveMinimum.errorMsg || `exclusiveMin ${validators.exclusiveMinimum.value}`,
          value,
        }
        return
      }
    }
    if (validators.maximum && validators.maximum.value !== undefined) {
      if (validators.maximum.value < numberValue) {
        fieldErrors[parent + name] = {
          message: validators.maximum.errorMsg || `max ${validators.maximum.value}`,
          value,
        }
        return
      }
    }
    if (validators.exclusiveMaximum && validators.exclusiveMaximum.value !== undefined) {
      if (validators.exclusiveMaximum.value <= numberValue) {
        fieldErrors[parent + name] = {
          message: validators.exclusiveMaximum.errorMsg || `exclusiveMax ${validators.exclusiveMaximum.value}`,
          value,
        }
        return
      }
    }
    return numberValue
  }

  public validateFloat(name: string, value: unknown, fieldErrors: FieldErrors, isBodyParam: boolean, validators?: FloatValidator, parent = ''): number | undefined {
    if (!this.hasCorrectJsType(value, 'number', isBodyParam) || !validator.isFloat(String(value))) {
      let message = 'invalid float number'
      if (validators) {
        if (validators.isFloat && validators.isFloat.errorMsg) {
          message = validators.isFloat.errorMsg
        }
        if (validators.isDouble && validators.isDouble.errorMsg) {
          message = validators.isDouble.errorMsg
        }
      }
      fieldErrors[parent + name] = {
        message,
        value,
      }
      return
    }

    const numberValue = validator.toFloat(String(value))
    if (!validators) {
      return numberValue
    }
    if (validators.minimum && validators.minimum.value !== undefined) {
      if (validators.minimum.value > numberValue) {
        fieldErrors[parent + name] = {
          message: validators.minimum.errorMsg || `min ${validators.minimum.value}`,
          value,
        }
        return
      }
    }
    if (validators.exclusiveMinimum && validators.exclusiveMinimum.value !== undefined) {
      if (validators.exclusiveMinimum.value >= numberValue) {
        fieldErrors[parent + name] = {
          message: validators.exclusiveMinimum.errorMsg || `exclusiveMin ${validators.exclusiveMinimum.value}`,
          value,
        }
        return
      }
    }
    if (validators.maximum && validators.maximum.value !== undefined) {
      if (validators.maximum.value < numberValue) {
        fieldErrors[parent + name] = {
          message: validators.maximum.errorMsg || `max ${validators.maximum.value}`,
          value,
        }
        return
      }
    }
    if (validators.exclusiveMaximum && validators.exclusiveMaximum.value !== undefined) {
      if (validators.exclusiveMaximum.value <= numberValue) {
        fieldErrors[parent + name] = {
          message: validators.exclusiveMaximum.errorMsg || `exclusiveMax ${validators.exclusiveMaximum.value}`,
          value,
        }
        return
      }
    }
    return numberValue
  }

  public validateEnum(name: string, value: unknown, fieldErrors: FieldErrors, members?: Array<string | number | boolean | null>, parent = ''): unknown {
    if (!members || members.length === 0) {
      fieldErrors[parent + name] = {
        message: 'no member',
        value,
      }
      return
    }

    const enumMatchIndex = members.map(member => String(member)).findIndex(member => validator.equals(member, String(value)))

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
    if (!this.hasCorrectJsType(value, 'string', isBodyParam) || !validator.isISO8601(String(value), { strict: true })) {
      const message = validators && validators.isDate && validators.isDate.errorMsg ? validators.isDate.errorMsg : `invalid ISO 8601 date format, i.e. YYYY-MM-DD`
      fieldErrors[parent + name] = {
        message,
        value,
      }
      return
    }

    const dateValue = new Date(String(value))
    if (!validators) {
      return dateValue
    }
    if (validators.minDate && validators.minDate.value) {
      const minDate = new Date(validators.minDate.value)
      if (minDate.getTime() > dateValue.getTime()) {
        fieldErrors[parent + name] = {
          message: validators.minDate.errorMsg || `minDate '${validators.minDate.value}'`,
          value,
        }
        return
      }
    }
    if (validators.maxDate && validators.maxDate.value) {
      const maxDate = new Date(validators.maxDate.value)
      if (maxDate.getTime() < dateValue.getTime()) {
        fieldErrors[parent + name] = {
          message: validators.maxDate.errorMsg || `maxDate '${validators.maxDate.value}'`,
          value,
        }
        return
      }
    }
    return dateValue
  }

  public validateDateTime(name: string, value: unknown, fieldErrors: FieldErrors, isBodyParam: boolean, validators?: DateTimeValidator, parent = ''): Date | undefined {
    if (!this.hasCorrectJsType(value, 'string', isBodyParam) || !validator.isISO8601(String(value), { strict: true })) {
      const message = validators && validators.isDateTime && validators.isDateTime.errorMsg ? validators.isDateTime.errorMsg : `invalid ISO 8601 datetime format, i.e. YYYY-MM-DDTHH:mm:ss`
      fieldErrors[parent + name] = {
        message,
        value,
      }
      return
    }

    const datetimeValue = new Date(String(value))
    if (!validators) {
      return datetimeValue
    }
    if (validators.minDate && validators.minDate.value) {
      const minDate = new Date(validators.minDate.value)
      if (minDate.getTime() > datetimeValue.getTime()) {
        fieldErrors[parent + name] = {
          message: validators.minDate.errorMsg || `minDate '${validators.minDate.value}'`,
          value,
        }
        return
      }
    }
    if (validators.maxDate && validators.maxDate.value) {
      const maxDate = new Date(validators.maxDate.value)
      if (maxDate.getTime() < datetimeValue.getTime()) {
        fieldErrors[parent + name] = {
          message: validators.maxDate.errorMsg || `maxDate '${validators.maxDate.value}'`,
          value,
        }
        return
      }
    }
    return datetimeValue
  }

  public validateString(name: string, value: unknown, fieldErrors: FieldErrors, validators?: StringValidator, parent = ''): string | undefined {
    if (typeof value !== 'string') {
      const message = validators && validators.isString && validators.isString.errorMsg ? validators.isString.errorMsg : `invalid string value`
      fieldErrors[parent + name] = {
        message,
        value,
      }
      return
    }

    const stringValue = String(value)
    if (!validators) {
      return stringValue
    }
    if (validators.minLength && validators.minLength.value !== undefined) {
      if (validators.minLength.value > stringValue.length) {
        fieldErrors[parent + name] = {
          message: validators.minLength.errorMsg || `minLength ${validators.minLength.value}`,
          value,
        }
        return
      }
    }
    if (validators.maxLength && validators.maxLength.value !== undefined) {
      if (validators.maxLength.value < stringValue.length) {
        fieldErrors[parent + name] = {
          message: validators.maxLength.errorMsg || `maxLength ${validators.maxLength.value}`,
          value,
        }
        return
      }
    }
    if (validators.pattern && validators.pattern.value) {
      if (!validator.matches(String(stringValue), validators.pattern.value)) {
        fieldErrors[parent + name] = {
          message: validators.pattern.errorMsg || `Not match in '${validators.pattern.value}'`,
          value,
        }
        return
      }
    }
    return stringValue
  }

  public validateBool(name: string, value: unknown, fieldErrors: FieldErrors, isBodyParam: boolean, validators?: BooleanValidator, parent = ''): boolean | undefined {
    if (value === true || value === false) {
      return value
    }

    if (!isBodyParam || this.config.bodyCoercion === true) {
      if (value === undefined || value === null) {
        return false
      }
      if (String(value).toLowerCase() === 'true') {
        return true
      }
      if (String(value).toLowerCase() === 'false') {
        return false
      }
    }

    const message = validators && validators.isBoolean && validators.isBoolean.errorMsg ? validators.isBoolean.errorMsg : `invalid boolean value`
    fieldErrors[parent + name] = {
      message,
      value,
    }
    return
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
    return
  }

  public validateArray(options: ValidateArrayOptions): unknown[] | undefined
  /**
   * @deprecated Use the object overload instead.
   */
  public validateArray(...args: ValidateArrayTupleArgs): unknown[] | undefined
  public validateArray(...args: [ValidateArrayOptions] | ValidateArrayTupleArgs): unknown[] | undefined {
    const options = this.normalizeValidateArrayArgs(args)
    const {
      name,
      value: resolvedValue,
      fieldErrors: resolvedFieldErrors,
      isBodyParam: resolvedIsBodyParam,
      schema: resolvedSchema,
      validators: resolvedValidators,
      parent: resolvedParent = '',
      metadata: resolvedMetadata,
    } = options
    if ((resolvedIsBodyParam && this.config.bodyCoercion === false && !Array.isArray(resolvedValue)) || !resolvedSchema || resolvedValue === undefined) {
      const message = resolvedValidators?.isArray?.errorMsg || `invalid array`
      resolvedFieldErrors[resolvedParent + name] = {
        message,
        value: resolvedValue,
      }
      return
    }

    let arrayValue: unknown[] = []
    const previousErrors = Object.keys(resolvedFieldErrors).length
    const childParent = this.buildChildPath(resolvedParent, name)
    if (Array.isArray(resolvedValue)) {
      arrayValue = resolvedValue.map((elementValue, index) => {
        const validatedElement: unknown = this.ValidateParam(resolvedSchema, elementValue, `$${index}`, resolvedFieldErrors, resolvedIsBodyParam, childParent, resolvedMetadata)
        return validatedElement
      })
    } else {
      const validatedElement: unknown = this.ValidateParam(resolvedSchema, resolvedValue, '$0', resolvedFieldErrors, resolvedIsBodyParam, childParent, resolvedMetadata)
      arrayValue = [validatedElement]
    }

    if (Object.keys(resolvedFieldErrors).length > previousErrors) {
      return
    }

    const validatorError = this.getArrayValidatorError(resolvedValidators, arrayValue, resolvedValue)
    if (validatorError) {
      resolvedFieldErrors[resolvedParent + name] = validatorError
      return
    }

    return arrayValue
  }

  private normalizeValidateArrayArgs(args: [ValidateArrayOptions] | ValidateArrayTupleArgs): ValidateArrayOptions {
    if (typeof args[0] === 'string') {
      const [name, value, fieldErrors, isBodyParam, schema, validators, parent = '', metadata] = args as ValidateArrayTupleArgs
      return { name, value, fieldErrors, isBodyParam, schema, validators, parent, metadata }
    }

    return args[0]
  }

  private getArrayValidatorError(validators: ArrayValidator | undefined, arrayValue: unknown[], originalValue: unknown) {
    if (!validators) {
      return undefined
    }

    if (validators.minItems?.value && validators.minItems.value > arrayValue.length) {
      return {
        message: validators.minItems.errorMsg || `minItems ${validators.minItems.value}`,
        value: originalValue,
      }
    }

    if (validators.maxItems?.value && validators.maxItems.value < arrayValue.length) {
      return {
        message: validators.maxItems.errorMsg || `maxItems ${validators.maxItems.value}`,
        value: originalValue,
      }
    }

    if (validators.uniqueItems && this.hasDuplicateArrayItems(arrayValue)) {
      return {
        message: validators.uniqueItems.errorMsg || `required unique array`,
        value: originalValue,
      }
    }

    return undefined
  }

  private hasDuplicateArrayItems(arrayValue: unknown[]): boolean {
    return arrayValue.some((elem, index, arr) => {
      const indexOf = arr.indexOf(elem)
      return indexOf > -1 && indexOf !== index
    })
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
    return
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
      const validateableValue = value !== undefined ? this.deepClone(value) : value
      const cleanValue = this.ValidateParam({ ...subSchema, validators: { ...property.validators, ...subSchema.validators } }, validateableValue, name, subFieldError, isBodyParam, parent, metadata)
      subFieldErrors.push(subFieldError)

      if (Object.keys(subFieldError).length === 0) {
        return cleanValue
      }
    }

    this.addSummarizedError(fieldErrors, parent + name, 'Could not match the union against any of the items. Issues: ', subFieldErrors, value)
    return
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
      const cleanValue = this.createChildValidationService({
        noImplicitAdditionalProperties: 'silently-remove-extras',
      }).ValidateParam(subSchema, this.deepClone(value), name, subFieldError, isBodyParam, parent, metadata)
      if (this.isRecord(cleanValue)) {
        cleanValues = {
          ...cleanValues,
          ...cleanValue,
        }
      }
      subFieldErrors.push(subFieldError)
    })

    const filtered = subFieldErrors.filter(subFieldError => Object.keys(subFieldError).length !== 0)

    if (filtered.length > 0) {
      this.addSummarizedError(fieldErrors, parent + name, 'Could not match the intersection against every type. Issues: ', filtered, value)
      return
    }

    const schemas = this.selfIntersectionCombinations(subSchemas.map(subSchema => this.toModelLike(subSchema)))

    const getRequiredPropError = (schema: TsoaRoute.ModelSchema) => {
      const requiredPropError = {}
      this.createChildValidationService({
        noImplicitAdditionalProperties: 'ignore',
      }).validateModel({
        name,
        value: this.deepClone(value),
        modelDefinition: schema,
        fieldErrors: requiredPropError,
        isBodyParam,
        metadata,
      })
      return requiredPropError
    }

    const schemasWithRequiredProps = schemas.filter(schema => Object.keys(getRequiredPropError(schema)).length === 0)

    if (this.config.noImplicitAdditionalProperties === 'ignore') {
      return this.isRecord(value) ? { ...value, ...cleanValues } : cleanValues
    }

    if (this.config.noImplicitAdditionalProperties === 'silently-remove-extras') {
      if (schemasWithRequiredProps.length > 0) {
        return cleanValues
      } else {
        fieldErrors[parent + name] = {
          message: `Could not match intersection against any of the possible combinations: ${JSON.stringify(schemas.map(s => Object.keys(s.properties)))}`,
          value,
        }
        return
      }
    }

    if (this.isRecord(value) && schemasWithRequiredProps.length > 0 && schemasWithRequiredProps.some(schema => this.getExcessPropertiesFor(schema, Object.keys(value)).length === 0)) {
      return cleanValues
    } else {
      fieldErrors[parent + name] = {
        message: `Could not match intersection against any of the possible combinations: ${JSON.stringify(schemas.map(s => Object.keys(s.properties)))}`,
        value,
      }
      return
    }
  }

  private toModelLike(schema: TsoaRoute.PropertySchema): TsoaRoute.RefObjectModelSchema[] {
    if (schema.ref) {
      const model = this.models[schema.ref]
      if (model.dataType === 'refObject') {
        return [model]
      } else if (model.dataType === 'refAlias') {
        return [...this.toModelLike(model.type)]
      } else if (model.dataType === 'refEnum') {
        throw new Error(`Can't transform an enum into a model like structure because it does not have properties.`)
      } else {
        return assertNever(model)
      }
    } else if (schema.nestedProperties) {
      return [{ dataType: 'refObject', properties: schema.nestedProperties, additionalProperties: schema.additionalProperties }]
    } else if (schema.subSchemas && schema.dataType === 'intersection') {
      const modelss: TsoaRoute.RefObjectModelSchema[][] = schema.subSchemas.map(subSchema => this.toModelLike(subSchema))

      return this.selfIntersectionCombinations(modelss)
    } else if (schema.subSchemas && schema.dataType === 'union') {
      const modelss: TsoaRoute.RefObjectModelSchema[][] = schema.subSchemas.map(subSchema => this.toModelLike(subSchema))
      return modelss.reduce((acc, models) => [...acc, ...models], [])
    } else {
      // There are no properties to check for excess here.
      return [{ dataType: 'refObject', properties: {}, additionalProperties: false }]
    }
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
  private selfIntersectionCombinations(modelSchemass: TsoaRoute.RefObjectModelSchema[][]): TsoaRoute.RefObjectModelSchema[] {
    const res: TsoaRoute.RefObjectModelSchema[] = []
    // Picks one schema from each sub-array
    const combinations = this.getAllCombinations(modelSchemass)

    for (const combination of combinations) {
      // Combine all schemas of this combination
      let currentCollector = { ...combination[0] }
      for (let subSchemaIdx = 1; subSchemaIdx < combination.length; subSchemaIdx++) {
        currentCollector = { ...this.combineProperties(currentCollector, combination[subSchemaIdx]) }
      }
      res.push(currentCollector)
    }
    return res
  }

  private getAllCombinations<T>(arrays: T[][]): T[][] {
    function combine(current: T[], index: number) {
      if (index === arrays.length) {
        result.push(current.slice())
        return
      }

      for (let i = 0; i < arrays[index].length; i++) {
        current.push(arrays[index][i])
        combine(current, index + 1)
        current.pop()
      }
    }

    const result: T[][] = []
    combine([], 0)
    return result
  }

  private combineProperties(a: TsoaRoute.RefObjectModelSchema, b: TsoaRoute.RefObjectModelSchema): TsoaRoute.RefObjectModelSchema {
    return { dataType: 'refObject', properties: { ...a.properties, ...b.properties }, additionalProperties: a.additionalProperties || b.additionalProperties || false }
  }

  private getExcessPropertiesFor(modelDefinition: TsoaRoute.RefObjectModelSchema, properties: string[]): string[] {
    const modelProperties = new Set(Object.keys(modelDefinition.properties))

    if (modelDefinition.additionalProperties) {
      return []
    } else if (this.config.noImplicitAdditionalProperties === 'ignore') {
      return []
    } else {
      return [...properties].filter(property => !modelProperties.has(property))
    }
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
    const { name, value, modelDefinition, fieldErrors, isBodyParam, parent = '', metadata } = input
    const previousErrors = Object.keys(fieldErrors).length

    if (modelDefinition) {
      if (modelDefinition.dataType === 'refEnum') {
        return this.validateEnum(name, value, fieldErrors, modelDefinition.enums, parent)
      }

      if (modelDefinition.dataType === 'refAlias') {
        return this.ValidateParam(modelDefinition.type, value, name, fieldErrors, isBodyParam, parent, metadata)
      }

      const fieldPath = parent + name
      const childPath = this.buildChildPath(parent, name)

      if (!this.isRecord(value)) {
        fieldErrors[fieldPath] = {
          message: `invalid object`,
          value,
        }
        return
      }

      const properties = modelDefinition.properties || {}
      const keysOnPropertiesModelDefinition = new Set(Object.keys(properties))
      const allPropertiesOnData = new Set(Object.keys(value))

      Object.entries(properties).forEach(([key, property]) => {
        const validatedParam = this.ValidateParam(property, value[key], key, fieldErrors, isBodyParam, childPath, metadata)

        // Add value from validator if it's not undefined or if value is required and unfedined is valid type
        if (validatedParam !== undefined || (property.dataType === 'undefined' && property.required)) {
          value[key] = validatedParam
        }
      })

      const isAnExcessProperty = (objectKeyThatMightBeExcess: string) => {
        return allPropertiesOnData.has(objectKeyThatMightBeExcess) && !keysOnPropertiesModelDefinition.has(objectKeyThatMightBeExcess)
      }

      const additionalProperties = modelDefinition.additionalProperties

      if (additionalProperties === true || isDefaultForAdditionalPropertiesAllowed(additionalProperties)) {
        // then don't validate any of the additional properties
      } else if (additionalProperties === false) {
        Object.keys(value).forEach((key: string) => {
          if (isAnExcessProperty(key)) {
            if (this.config.noImplicitAdditionalProperties === 'throw-on-extras') {
              fieldErrors[`${childPath}${key}`] = {
                message: `"${key}" is an excess property and therefore is not allowed`,
                value: key,
              }
            } else if (this.config.noImplicitAdditionalProperties === 'silently-remove-extras') {
              delete value[key]
            } else if (this.config.noImplicitAdditionalProperties === 'ignore') {
              // then it's okay to have additionalProperties
            } else {
              assertNever(this.config.noImplicitAdditionalProperties)
            }
          }
        })
      } else {
        Object.keys(value).forEach((key: string) => {
          if (isAnExcessProperty(key)) {
            const validatedValue = this.ValidateParam(additionalProperties, value[key], key, fieldErrors, isBodyParam, childPath, metadata)
            // Add value from validator if it's not undefined or if value is required and unfedined is valid type
            if (validatedValue !== undefined || (additionalProperties.dataType === 'undefined' && additionalProperties.required)) {
              value[key] = validatedValue
            } else {
              fieldErrors[`${childPath}${key}`] = {
                message: `No matching model found in additionalProperties to validate ${key}`,
                value: key,
              }
            }
          }
        })
      }
    }

    if (Object.keys(fieldErrors).length > previousErrors) {
      return
    }

    return value
  }

  /**
   * Creates a new ValidationService instance with specific configuration
   * @param overrides Configuration overrides
   * @returns New ValidationService instance
   */
  private createChildValidationService(overrides: Partial<AdditionalProps> = {}): ValidationService {
    return new ValidationService(this.models, {
      ...this.config,
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
  private deepClone<T>(obj: T): T {
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
      return new Date(obj.getTime()) as T
    }

    if (obj instanceof RegExp) {
      // Preserve the existing instance instead of reconstructing a pattern from untrusted data.
      return obj
    }

    if (Array.isArray(obj)) {
      const arrayValues = obj as unknown[]
      const clonedArray: unknown = arrayValues.map(value => this.deepClone(value))
      return clonedArray as T
    }

    if (Buffer && obj instanceof Buffer) {
      return Buffer.from(obj) as T
    }

    // Handle plain objects
    const cloneObj: Record<string, unknown> = {}
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        cloneObj[key] = this.deepClone((obj as Record<string, unknown>)[key])
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
  private addSummarizedError(fieldErrors: FieldErrors, errorKey: string, prefix: string, subErrors: FieldErrors[], value: unknown): void {
    const maxErrorLength = this.config.maxValidationErrorSize ? this.config.maxValidationErrorSize - prefix.length : undefined

    fieldErrors[errorKey] = {
      message: `${prefix}${this.summarizeValidationErrors(subErrors, maxErrorLength)}`,
      value,
    }
  }

  /**
   * Summarizes validation errors to prevent extremely large error messages
   * @param errors Array of field errors from union/intersection validation
   * @param maxLength Maximum length of the summarized message
   * @returns Summarized error message
   */
  private summarizeValidationErrors(errors: FieldErrors[], maxLength?: number): string {
    const effectiveMaxLength = maxLength || this.config.maxValidationErrorSize || 1000

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
    } else {
      return `[${summary.join(',')}]`
    }
  }
}

export interface IntegerValidator {
  isInt?: { errorMsg?: string }
  isLong?: { errorMsg?: string }
  minimum?: { value: number; errorMsg?: string }
  maximum?: { value: number; errorMsg?: string }
  exclusiveMinimum?: { value: number; errorMsg?: string }
  exclusiveMaximum?: { value: number; errorMsg?: string }
}

export interface FloatValidator {
  isFloat?: { errorMsg?: string }
  isDouble?: { errorMsg?: string }
  minimum?: { value: number; errorMsg?: string }
  maximum?: { value: number; errorMsg?: string }
  exclusiveMinimum?: { value: number; errorMsg?: string }
  exclusiveMaximum?: { value: number; errorMsg?: string }
}

export interface DateValidator {
  isDate?: { errorMsg?: string }
  minDate?: { value: string; errorMsg?: string }
  maxDate?: { value: string; errorMsg?: string }
}

export interface DateTimeValidator {
  isDateTime?: { errorMsg?: string }
  minDate?: { value: string; errorMsg?: string }
  maxDate?: { value: string; errorMsg?: string }
}

export interface StringValidator {
  isString?: { errorMsg?: string }
  minLength?: { value: number; errorMsg?: string }
  maxLength?: { value: number; errorMsg?: string }
  pattern?: { value: string; errorMsg?: string }
  title?: { value: string; errorMsg?: string }
}

export interface BooleanValidator {
  isBoolean?: { errorMsg?: string }
}

export interface ArrayValidator {
  isArray?: { errorMsg?: string }
  minItems?: { value: number; errorMsg?: string }
  maxItems?: { value: number; errorMsg?: string }
  uniqueItems?: { errorMsg?: string }
}

export type Validator = IntegerValidator | FloatValidator | DateValidator | DateTimeValidator | StringValidator | BooleanValidator | ArrayValidator

export interface FieldErrors {
  [name: string]: { message: string; value?: unknown }
}

export interface Exception extends Error {
  status: number
}

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
