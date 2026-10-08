import type { AdditionalProps } from './additionalProps'
import type { ArrayValidator, FieldErrors, ParameterValidationMetadata, ValidationService } from './templateHelpers'
import type { TsoaRoute } from './tsoa-route'

export type ValidateArrayOptions = {
  name: string
  value: unknown
  fieldErrors: FieldErrors
  isBodyParam: boolean
  schema?: TsoaRoute.PropertySchema
  validators?: ArrayValidator
  parent: string
  metadata?: ParameterValidationMetadata
}

export function validateArray(options: ValidateArrayOptions, service: Pick<ValidationService, 'ValidateParam'>, config: AdditionalProps): unknown[] | undefined {
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
  if ((resolvedIsBodyParam && config.bodyCoercion === false && !Array.isArray(resolvedValue)) || !resolvedSchema || resolvedValue === undefined) {
    const message = resolvedValidators?.isArray?.errorMsg || `invalid array`
    resolvedFieldErrors[resolvedParent + name] = {
      message,
      value: resolvedValue,
    }
    return
  }

  let arrayValue: unknown[]
  const previousErrors = Object.keys(resolvedFieldErrors).length
  const fieldPath = resolvedParent + name
  const childParent = fieldPath ? `${fieldPath}.` : ''
  if (Array.isArray(resolvedValue)) {
    arrayValue = resolvedValue.map((elementValue, index) => {
      const validatedElement: unknown = service.ValidateParam(resolvedSchema, elementValue, `$${index}`, resolvedFieldErrors, resolvedIsBodyParam, childParent, resolvedMetadata)
      return validatedElement
    })
  } else {
    const validatedElement: unknown = service.ValidateParam(resolvedSchema, resolvedValue, '$0', resolvedFieldErrors, resolvedIsBodyParam, childParent, resolvedMetadata)
    arrayValue = [validatedElement]
  }

  if (Object.keys(resolvedFieldErrors).length > previousErrors) {
    return
  }

  const validatorError = getArrayValidatorError(resolvedValidators, arrayValue, resolvedValue)
  if (validatorError) {
    resolvedFieldErrors[resolvedParent + name] = validatorError
    return
  }

  return arrayValue
}

function getArrayValidatorError(validators: ArrayValidator | undefined, arrayValue: unknown[], originalValue: unknown) {
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

  if (validators.uniqueItems && hasDuplicateArrayItems(arrayValue)) {
    return {
      message: validators.uniqueItems.errorMsg || `required unique array`,
      value: originalValue,
    }
  }

  return undefined
}

function hasDuplicateArrayItems(arrayValue: unknown[]): boolean {
  return arrayValue.some((elem, index, arr) => {
    const indexOf = arr.indexOf(elem)
    return indexOf > -1 && indexOf !== index
  })
}
