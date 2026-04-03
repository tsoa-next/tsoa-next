import { Tsoa } from '@tsoa-next/runtime'
import * as ts from 'typescript'
import validator from 'validator'
import { GenerateMetadataError } from './../metadataGeneration/exceptions'
import { commentToString, getJSDocTags } from './jsDocUtils'

const parameterTagSupport: readonly string[] = [
  'isString',
  'isBoolean',
  'isInt',
  'isLong',
  'isFloat',
  'isDouble',
  'isDate',
  'isDateTime',
  'minItems',
  'maxItems',
  'uniqueItems',
  'minLength',
  'maxLength',
  'pattern',
  'minimum',
  'maximum',
  'exclusiveMinimum',
  'exclusiveMaximum',
  'minDate',
  'maxDate',
  'title',
]

function getCommentValue(comment?: string) {
  return comment?.split(' ')[0]
}

function getFullCommentValue(comment?: string) {
  return comment?.split('\n')[0] ?? comment
}

function getErrorMsg(comment?: string, isValue = true) {
  if (!comment) {
    return undefined
  }

  if (!isValue) {
    return comment
  }

  const indexOf = comment.indexOf(' ')
  return indexOf > 0 ? comment.substring(indexOf + 1) : undefined
}

function parseNumericValidatorValue(value: string | undefined, name: string): number {
  const numericValue = Number(value)
  if (Number.isNaN(numericValue)) {
    throw new GenerateMetadataError(`${name} parameter use number.`)
  }

  return numericValue
}

export function getParameterValidators(parameter: ts.ParameterDeclaration, parameterName: string): Tsoa.Validators {
  if (!parameter.parent) {
    return {}
  }

  const tags = getJSDocTags(parameter.parent, tag => {
    const comment = commentToString(tag.comment)
    return Boolean(comment) && parameterTagSupport.includes(tag.tagName.text) && getCommentValue(comment) === parameterName
  })

  return tags.reduce(
    (validateObj, tag) => {
      const comment = commentToString(tag.comment)
      if (!comment) {
        return validateObj
      }

      const name = tag.tagName.text
      const commentValue = comment.substring((comment.indexOf(' ') || -1) + 1).trim()
      const value = getCommentValue(commentValue)

      switch (name) {
        case 'uniqueItems':
          validateObj[name] = {
            errorMsg: getErrorMsg(commentValue, false),
            value: undefined,
          }
          break
        case 'minimum':
        case 'maximum':
        case 'exclusiveMinimum':
        case 'exclusiveMaximum':
        case 'minItems':
        case 'maxItems':
        case 'minLength':
        case 'maxLength':
          validateObj[name] = {
            errorMsg: getErrorMsg(commentValue),
            value: parseNumericValidatorValue(value, name),
          }
          break
        case 'minDate':
        case 'maxDate':
          if (!validator.isISO8601(String(value), { strict: true })) {
            throw new GenerateMetadataError(`${name} parameter use date format ISO 8601 ex. 2017-05-14, 2017-05-14T05:18Z`)
          }
          validateObj[name] = {
            errorMsg: getErrorMsg(commentValue),
            value,
          }
          break
        case 'pattern':
          if (typeof value !== 'string') {
            throw new GenerateMetadataError(`${name} parameter use string.`)
          }
          validateObj[name] = {
            errorMsg: getErrorMsg(commentValue),
            value: removeSurroundingQuotes(value),
          }
          break
        default:
          if (name.startsWith('is')) {
            const errorMsg = getErrorMsg(commentValue, false)
            if (errorMsg) {
              validateObj[name] = {
                errorMsg,
                value: undefined,
              }
            }
          }
          break
      }
      return validateObj
    },
    {} as Tsoa.Validators & { [unknown: string]: { errorMsg: string; value: undefined } },
  )
}

export function getPropertyValidators(property: ts.Node): Tsoa.Validators | undefined {
  const tags = getJSDocTags(property, tag => {
    return parameterTagSupport.includes(tag.tagName.text)
  })

  return tags.reduce(
    (validateObj, tag) => {
      const name = tag.tagName.text
      const comment = commentToString(tag.comment)
      const value = getCommentValue(comment)

      switch (name) {
        case 'uniqueItems':
          validateObj[name] = {
            errorMsg: getErrorMsg(comment, false),
            value: undefined,
          }
          break
        case 'minimum':
        case 'maximum':
        case 'exclusiveMinimum':
        case 'exclusiveMaximum':
        case 'minItems':
        case 'maxItems':
        case 'minLength':
        case 'maxLength':
          validateObj[name] = {
            errorMsg: getErrorMsg(comment),
            value: parseNumericValidatorValue(value, name),
          }
          break
        case 'minDate':
        case 'maxDate':
          if (!validator.isISO8601(String(value), { strict: true })) {
            throw new GenerateMetadataError(`${name} parameter use date format ISO 8601 ex. 2017-05-14, 2017-05-14T05:18Z`)
          }
          validateObj[name] = {
            errorMsg: getErrorMsg(comment),
            value,
          }
          break
        case 'pattern':
          if (typeof value !== 'string') {
            throw new GenerateMetadataError(`${name} parameter use string.`)
          }
          validateObj[name] = {
            errorMsg: getErrorMsg(comment),
            value: removeSurroundingQuotes(value),
          }
          break
        case 'title':
          if (typeof value !== 'string') {
            throw new GenerateMetadataError(`${name} parameter use string.`)
          }
          validateObj[name] = {
            errorMsg: getErrorMsg(comment),
            value: getFullCommentValue(comment),
          }
          break
        default:
          if (name.startsWith('is')) {
            const errorMsg = getErrorMsg(comment, false)
            if (errorMsg) {
              validateObj[name] = {
                errorMsg,
                value: undefined,
              }
            }
          }
          break
      }
      return validateObj
    },
    {} as Tsoa.Validators & { [unknown: string]: { errorMsg: string; value: undefined } },
  )
}

function removeSurroundingQuotes(str: string) {
  if (str.startsWith('`') && str.endsWith('`')) {
    return str.substring(1, str.length - 1)
  }
  if (str.startsWith('```') && str.endsWith('```')) {
    return str.substring(3, str.length - 3)
  }
  return str
}

export function shouldIncludeValidatorInSchema(key: string): key is Tsoa.SchemaValidatorKey {
  return !key.startsWith('is') && key !== 'minDate' && key !== 'maxDate'
}
