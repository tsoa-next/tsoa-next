import isFloat from 'validator/lib/isFloat'
import isInt from 'validator/lib/isInt'
import isISO8601 from 'validator/lib/isISO8601'
import matches from 'validator/lib/matches'
import toFloat from 'validator/lib/toFloat'
import toInt from 'validator/lib/toInt'
import type { AdditionalProps } from './additionalProps'
import type { BooleanValidator, DateTimeValidator, DateValidator, FieldErrors, FloatValidator, IntegerValidator, StringValidator } from './templateHelpers'

type NumericBoundValidators = {
  minimum?: { value: number; errorMsg?: string }
  maximum?: { value: number; errorMsg?: string }
  exclusiveMinimum?: { value: number; errorMsg?: string }
  exclusiveMaximum?: { value: number; errorMsg?: string }
}

type DateRangeValidators = {
  minDate?: { value: string; errorMsg?: string }
  maxDate?: { value: string; errorMsg?: string }
}

function createFieldError(message: string, value: unknown): FieldErrors[string] {
  return { message, value }
}

function getNumericTypeErrorMessage(
  validators: Pick<IntegerValidator, 'isInt' | 'isLong'> | Pick<FloatValidator, 'isFloat' | 'isDouble'> | undefined,
  defaultMessage: string,
  primaryValidator: 'isInt' | 'isFloat',
): string {
  if (primaryValidator === 'isInt') {
    const integerValidators = validators as Pick<IntegerValidator, 'isInt' | 'isLong'> | undefined
    return integerValidators?.isInt?.errorMsg ?? integerValidators?.isLong?.errorMsg ?? defaultMessage
  }

  const floatValidators = validators as Pick<FloatValidator, 'isFloat' | 'isDouble'> | undefined
  return floatValidators?.isFloat?.errorMsg ?? floatValidators?.isDouble?.errorMsg ?? defaultMessage
}

function getNumberBoundaryError(validators: NumericBoundValidators | undefined, numberValue: number, rawValue: unknown): FieldErrors[string] | undefined {
  const minimum = validators?.minimum
  if (minimum?.value !== undefined && minimum.value > numberValue) {
    return createFieldError(minimum.errorMsg || `min ${minimum.value}`, rawValue)
  }

  const exclusiveMinimum = validators?.exclusiveMinimum
  if (exclusiveMinimum?.value !== undefined && exclusiveMinimum.value >= numberValue) {
    return createFieldError(exclusiveMinimum.errorMsg || `exclusiveMin ${exclusiveMinimum.value}`, rawValue)
  }

  const maximum = validators?.maximum
  if (maximum?.value !== undefined && maximum.value < numberValue) {
    return createFieldError(maximum.errorMsg || `max ${maximum.value}`, rawValue)
  }

  const exclusiveMaximum = validators?.exclusiveMaximum
  if (exclusiveMaximum?.value !== undefined && exclusiveMaximum.value <= numberValue) {
    return createFieldError(exclusiveMaximum.errorMsg || `exclusiveMax ${exclusiveMaximum.value}`, rawValue)
  }

  return undefined
}

function getDateTypeErrorMessage(validators: Pick<DateValidator, 'isDate'> | Pick<DateTimeValidator, 'isDateTime'> | undefined, key: 'isDate' | 'isDateTime', defaultMessage: string): string {
  if (key === 'isDate') {
    const dateValidators = validators as Pick<DateValidator, 'isDate'> | undefined
    return dateValidators?.isDate?.errorMsg ?? defaultMessage
  }

  const dateTimeValidators = validators as Pick<DateTimeValidator, 'isDateTime'> | undefined
  return dateTimeValidators?.isDateTime?.errorMsg ?? defaultMessage
}

function getDateBoundaryError(validators: DateRangeValidators | undefined, dateValue: Date, rawValue: unknown): FieldErrors[string] | undefined {
  const minDateValue = validators?.minDate?.value
  if (minDateValue) {
    const minDate = new Date(minDateValue)
    if (minDate > dateValue) {
      return createFieldError(validators?.minDate?.errorMsg || `minDate '${minDateValue}'`, rawValue)
    }
  }

  const maxDateValue = validators?.maxDate?.value
  if (maxDateValue) {
    const maxDate = new Date(maxDateValue)
    if (maxDate < dateValue) {
      return createFieldError(validators?.maxDate?.errorMsg || `maxDate '${maxDateValue}'`, rawValue)
    }
  }

  return undefined
}

function getStringValidationError(validators: StringValidator | undefined, stringValue: string, rawValue: unknown): FieldErrors[string] | undefined {
  const minLength = validators?.minLength
  if (minLength?.value !== undefined && minLength.value > stringValue.length) {
    return createFieldError(minLength.errorMsg || `minLength ${minLength.value}`, rawValue)
  }

  const maxLength = validators?.maxLength
  if (maxLength?.value !== undefined && maxLength.value < stringValue.length) {
    return createFieldError(maxLength.errorMsg || `maxLength ${maxLength.value}`, rawValue)
  }

  const pattern = validators?.pattern?.value
  if (pattern && !matches(stringValue, pattern)) {
    return createFieldError(validators?.pattern?.errorMsg || `Not match in '${pattern}'`, rawValue)
  }

  return undefined
}

function coerceBooleanValue(value: unknown, isBodyParam: boolean, config: Pick<AdditionalProps, 'bodyCoercion'>): boolean | undefined {
  if (value === true || value === false) {
    return value
  }

  if (isBodyParam && config.bodyCoercion !== true) {
    return undefined
  }

  if (value === undefined || value === null) {
    return false
  }

  if (typeof value !== 'string') {
    return undefined
  }

  const normalizedValue = value.toLowerCase()
  if (normalizedValue === 'true') {
    return true
  }

  if (normalizedValue === 'false') {
    return false
  }

  return undefined
}

export function validateInt(name: string, value: unknown, fieldErrors: FieldErrors, hasCorrectType: boolean, validators?: IntegerValidator, parent = ''): number | undefined {
  if (!hasCorrectType || !isInt(String(value))) {
    fieldErrors[parent + name] = createFieldError(getNumericTypeErrorMessage(validators, `invalid integer number`, 'isInt'), value)
    return
  }

  const numberValue = toInt(String(value), 10)
  if (!validators) {
    return numberValue
  }
  const validationError = getNumberBoundaryError(validators, numberValue, value)
  if (validationError) {
    fieldErrors[parent + name] = validationError
    return
  }

  return numberValue
}

export function validateFloat(name: string, value: unknown, fieldErrors: FieldErrors, hasCorrectType: boolean, validators?: FloatValidator, parent = ''): number | undefined {
  if (!hasCorrectType || !isFloat(String(value))) {
    fieldErrors[parent + name] = createFieldError(getNumericTypeErrorMessage(validators, 'invalid float number', 'isFloat'), value)
    return
  }

  const numberValue = toFloat(String(value))
  if (!validators) {
    return numberValue
  }
  const validationError = getNumberBoundaryError(validators, numberValue, value)
  if (validationError) {
    fieldErrors[parent + name] = validationError
    return
  }

  return numberValue
}

export function validateDate(name: string, value: unknown, fieldErrors: FieldErrors, hasCorrectType: boolean, validators?: DateValidator, parent = ''): Date | undefined {
  if (!hasCorrectType || !isISO8601(String(value), { strict: true })) {
    fieldErrors[parent + name] = createFieldError(getDateTypeErrorMessage(validators, 'isDate', `invalid ISO 8601 date format, i.e. YYYY-MM-DD`), value)
    return
  }

  const dateValue = new Date(String(value))
  if (!validators) {
    return dateValue
  }
  const validationError = getDateBoundaryError(validators, dateValue, value)
  if (validationError) {
    fieldErrors[parent + name] = validationError
    return
  }

  return dateValue
}

export function validateDateTime(name: string, value: unknown, fieldErrors: FieldErrors, hasCorrectType: boolean, validators?: DateTimeValidator, parent = ''): Date | undefined {
  if (!hasCorrectType || !isISO8601(String(value), { strict: true })) {
    fieldErrors[parent + name] = createFieldError(getDateTypeErrorMessage(validators, 'isDateTime', `invalid ISO 8601 datetime format, i.e. YYYY-MM-DDTHH:mm:ss`), value)
    return
  }

  const datetimeValue = new Date(String(value))
  if (!validators) {
    return datetimeValue
  }
  const validationError = getDateBoundaryError(validators, datetimeValue, value)
  if (validationError) {
    fieldErrors[parent + name] = validationError
    return
  }

  return datetimeValue
}

export function validateString(name: string, value: unknown, fieldErrors: FieldErrors, validators?: StringValidator, parent = ''): string | undefined {
  if (typeof value !== 'string') {
    fieldErrors[parent + name] = createFieldError(validators?.isString?.errorMsg ?? `invalid string value`, value)
    return
  }

  const stringValue = String(value)
  if (!validators) {
    return stringValue
  }
  const validationError = getStringValidationError(validators, stringValue, value)
  if (validationError) {
    fieldErrors[parent + name] = validationError
    return
  }

  return stringValue
}

export function validateBool(
  name: string,
  value: unknown,
  fieldErrors: FieldErrors,
  isBodyParam: boolean,
  config: Pick<AdditionalProps, 'bodyCoercion'>,
  validators?: BooleanValidator,
  parent = '',
): boolean | undefined {
  const coercedValue = coerceBooleanValue(value, isBodyParam, config)
  if (coercedValue !== undefined) {
    return coercedValue
  }

  fieldErrors[parent + name] = createFieldError(validators?.isBoolean?.errorMsg ?? `invalid boolean value`, value)
  return undefined
}
