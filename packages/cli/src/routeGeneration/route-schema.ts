import { type Tsoa, type TsoaRoute, assertNever } from '@tsoa-next/runtime'
import type { ExtendedRoutesConfig } from '../api'
import { isRefType } from '../utils/internalTypeGuards'

export interface RouteSchemaOwner {
  readonly metadata: Tsoa.Metadata
  readonly options: ExtendedRoutesConfig
  buildProperty(type: Tsoa.Type): TsoaRoute.PropertySchema
  buildPropertySchema(source: Tsoa.Property): TsoaRoute.PropertySchema
}

export function buildModels(owner: RouteSchemaOwner): TsoaRoute.Models {
  const models = {} as TsoaRoute.Models

  Object.keys(owner.metadata.referenceTypeMap).forEach(name => {
    const referenceType = owner.metadata.referenceTypeMap[name]

    let model: TsoaRoute.ModelSchema
    if (referenceType.dataType === 'refEnum') {
      const refEnumModel: TsoaRoute.RefEnumModelSchema = {
        dataType: 'refEnum',
        enums: referenceType.enums,
      }
      model = refEnumModel
    } else if (referenceType.dataType === 'refObject') {
      const propertySchemaDictionary: TsoaRoute.RefObjectModelSchema['properties'] = {}
      ;(referenceType.properties ?? []).forEach(property => {
        propertySchemaDictionary[property.name] = owner.buildPropertySchema(property)
      })

      const refObjModel: TsoaRoute.RefObjectModelSchema = {
        dataType: 'refObject',
        properties: propertySchemaDictionary,
      }
      if (referenceType.additionalProperties) {
        refObjModel.additionalProperties = owner.buildProperty(referenceType.additionalProperties)
      } else {
        refObjModel.additionalProperties = owner.options.noImplicitAdditionalProperties === 'ignore'
      }
      model = refObjModel
    } else if (referenceType.dataType === 'refAlias') {
      const refType: TsoaRoute.RefTypeAliasModelSchema = {
        dataType: 'refAlias',
        type: {
          ...owner.buildProperty(referenceType.type),
          validators: referenceType.validators,
          default: referenceType.default,
        },
      }
      model = refType
    } else {
      model = assertNever(referenceType)
    }

    models[name] = model
  })
  return models
}

export function buildPropertySchema(owner: RouteSchemaOwner, source: Tsoa.Property): TsoaRoute.PropertySchema {
  const propertySchema = owner.buildProperty(source.type)
  propertySchema.default = source.default
  propertySchema.required = source.required ? true : undefined

  if (Object.keys(source.validators).length > 0) {
    propertySchema.validators = source.validators
  }
  return propertySchema
}

export function buildProperty(owner: RouteSchemaOwner, type: Tsoa.Type): TsoaRoute.PropertySchema {
  const schema: TsoaRoute.PropertySchema = {
    dataType: type.dataType,
  }

  if (isRefType(type)) {
    schema.dataType = undefined
    schema.ref = type.refName
  }

  if (type.dataType === 'array') {
    const arrayType = type

    if (isRefType(arrayType.elementType)) {
      schema.array = {
        dataType: arrayType.elementType.dataType,
        ref: arrayType.elementType.refName,
      }
    } else {
      schema.array = owner.buildProperty(arrayType.elementType)
    }
  }

  if (type.dataType === 'enum') {
    schema.enums = type.enums
  }

  if (type.dataType === 'union' || type.dataType === 'intersection') {
    schema.subSchemas = type.types.map(type => owner.buildProperty(type))
  }

  if (type.dataType === 'nestedObjectLiteral') {
    const objLiteral = type

    schema.nestedProperties = objLiteral.properties.reduce((acc, prop) => {
      return { ...acc, [prop.name]: owner.buildPropertySchema(prop) }
    }, {})

    schema.additionalProperties = objLiteral.additionalProperties && owner.buildProperty(objLiteral.additionalProperties)
  }

  return schema
}
