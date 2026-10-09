import { assertNever } from '../utils/assertNever'
import type { AdditionalProps } from './additionalProps'
import type { FieldErrors, ParameterValidationMetadata, ValidationService } from './templateHelpers'
import { isDefaultForAdditionalPropertiesAllowed, type TsoaRoute } from './tsoa-route'

export type ValidateNestedObjectLiteralOptions = {
  name: string
  value: unknown
  fieldErrors: FieldErrors
  isBodyParam: boolean
  nestedProperties: { [name: string]: TsoaRoute.PropertySchema } | undefined
  additionalProperties: TsoaRoute.PropertySchema | boolean | undefined
  parent: string
  metadata?: ParameterValidationMetadata
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function buildChildPath(parent: string, name: string): string {
  const fieldPath = parent + name
  return fieldPath ? `${fieldPath}.` : ''
}

export function validateNestedObjectLiteral(options: ValidateNestedObjectLiteralOptions, service: Pick<ValidationService, 'ValidateParam'>, config: AdditionalProps): unknown {
  const { name, value, fieldErrors, isBodyParam, nestedProperties, additionalProperties, parent, metadata } = options
  if (!isRecord(value)) {
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

  const propHandling = config.noImplicitAdditionalProperties
  if (propHandling !== 'ignore') {
    const excessProps = getExcessPropertiesFor({ dataType: 'refObject', properties: nestedProperties, additionalProperties }, Object.keys(value), config)
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

  const childPath = buildChildPath(parent, name)

  Object.keys(nestedProperties).forEach(key => {
    const validatedProp = service.ValidateParam(nestedProperties[key], value[key], key, fieldErrors, isBodyParam, childPath, metadata)

    // Add value from validator if it's not undefined or if value is required and unfedined is valid type
    if (validatedProp !== undefined || (nestedProperties[key].dataType === 'undefined' && nestedProperties[key].required)) {
      value[key] = validatedProp
    }
  })

  if (typeof additionalProperties === 'object') {
    const keys = Object.keys(value).filter(key => nestedProperties[key] === undefined)
    keys.forEach(key => {
      const validatedProp = service.ValidateParam(additionalProperties, value[key], key, fieldErrors, isBodyParam, childPath, metadata)
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

export function validateModel(
  input: {
    name: string
    value: unknown
    modelDefinition: TsoaRoute.ModelSchema
    fieldErrors: FieldErrors
    isBodyParam: boolean
    parent?: string
    metadata?: ParameterValidationMetadata
  },
  service: Pick<ValidationService, 'ValidateParam' | 'validateEnum'>,
  config: AdditionalProps,
): unknown {
  const { name, value, modelDefinition, fieldErrors, isBodyParam, parent = '', metadata } = input
  const previousErrors = Object.keys(fieldErrors).length

  if (modelDefinition) {
    if (modelDefinition.dataType === 'refEnum') {
      return service.validateEnum(name, value, fieldErrors, modelDefinition.enums, parent)
    }

    if (modelDefinition.dataType === 'refAlias') {
      return service.ValidateParam(modelDefinition.type, value, name, fieldErrors, isBodyParam, parent, metadata)
    }

    const fieldPath = parent + name
    const childPath = buildChildPath(parent, name)

    if (!isRecord(value)) {
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
      const validatedParam = service.ValidateParam(property, value[key], key, fieldErrors, isBodyParam, childPath, metadata)

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
          if (config.noImplicitAdditionalProperties === 'throw-on-extras') {
            fieldErrors[`${childPath}${key}`] = {
              message: `"${key}" is an excess property and therefore is not allowed`,
              value: key,
            }
          } else if (config.noImplicitAdditionalProperties === 'silently-remove-extras') {
            delete value[key]
          } else if (config.noImplicitAdditionalProperties === 'ignore') {
            // then it's okay to have additionalProperties
          } else {
            assertNever(config.noImplicitAdditionalProperties)
          }
        }
      })
    } else {
      Object.keys(value).forEach((key: string) => {
        if (isAnExcessProperty(key)) {
          const validatedValue = service.ValidateParam(additionalProperties, value[key], key, fieldErrors, isBodyParam, childPath, metadata)
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
export function getExcessPropertiesFor(modelDefinition: TsoaRoute.RefObjectModelSchema, properties: string[], config: AdditionalProps): string[] {
  const modelProperties = new Set(Object.keys(modelDefinition.properties))

  if (modelDefinition.additionalProperties) {
    return []
  } else if (config.noImplicitAdditionalProperties === 'ignore') {
    return []
  } else {
    return [...properties].filter(property => !modelProperties.has(property))
  }
}
