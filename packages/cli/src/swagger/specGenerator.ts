import type { ExtendedSpecConfig } from '../api'
import { Tsoa, assertNever, Swagger } from '@tsoa-next/runtime'
import * as handlebars from 'handlebars'
import { shouldIncludeValidatorInSchema } from '../utils/validatorUtils'

const isExampleValue = (value: unknown, allowUndefined = false): value is Tsoa.Example => {
  if (value === null || value instanceof Date) {
    return true
  }

  if (value === undefined) {
    return allowUndefined
  }

  if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
    return true
  }

  if (Array.isArray(value)) {
    return value.every(item => isExampleValue(item, true))
  }

  if (typeof value === 'object') {
    return Object.values(value).every(item => isExampleValue(item, true))
  }

  return false
}

export abstract class SpecGenerator {
  constructor(
    protected readonly metadata: Tsoa.Metadata,
    protected readonly config: ExtendedSpecConfig,
  ) {}

  protected buildAdditionalProperties(type: Tsoa.Type) {
    return this.getSwaggerType(type)
  }

  protected buildOperationIdTemplate(inlineTemplate: string) {
    handlebars.registerHelper('titleCase', (value: string) => (value ? value.charAt(0).toUpperCase() + value.slice(1) : value))
    handlebars.registerHelper('replace', (...args: unknown[]) => {
      const [subject, searchValue, withValue] = args
      const normalizedSubject = typeof subject === 'string' ? subject : ''
      const isValidSearchValue = typeof searchValue === 'string' || searchValue instanceof RegExp
      const normalizedWithValue = typeof withValue === 'string' ? withValue : ''
      if (!normalizedSubject || !isValidSearchValue) {
        return normalizedSubject
      }

      return normalizedSubject.replace(searchValue, normalizedWithValue)
    })
    return handlebars.compile(inlineTemplate, { noEscape: true })
  }

  protected getOperationId(controllerName: string, method: Tsoa.Method) {
    return this.buildOperationIdTemplate(this.config.operationIdTemplate ?? '{{titleCase method.name}}')({
      method,
      controllerName,
    })
  }

  public throwIfNotDataFormat(strToTest: string): Swagger.DataFormat {
    const guiltyUntilInnocent = strToTest as Swagger.DataFormat
    if (
      guiltyUntilInnocent === 'int32' ||
      guiltyUntilInnocent === 'int64' ||
      guiltyUntilInnocent === 'float' ||
      guiltyUntilInnocent === 'double' ||
      guiltyUntilInnocent === 'byte' ||
      guiltyUntilInnocent === 'binary' ||
      guiltyUntilInnocent === 'date' ||
      guiltyUntilInnocent === 'date-time' ||
      guiltyUntilInnocent === 'password'
    ) {
      return guiltyUntilInnocent
    } else {
      return assertNever(guiltyUntilInnocent)
    }
  }

  public throwIfNotDataType(strToTest: string): Swagger.DataType {
    const guiltyUntilInnocent = strToTest as Swagger.DataType
    if (
      guiltyUntilInnocent === 'array' ||
      guiltyUntilInnocent === 'boolean' ||
      guiltyUntilInnocent === 'integer' ||
      guiltyUntilInnocent === 'file' ||
      guiltyUntilInnocent === 'number' ||
      guiltyUntilInnocent === 'object' ||
      guiltyUntilInnocent === 'string' ||
      guiltyUntilInnocent === 'undefined'
    ) {
      return guiltyUntilInnocent
    } else {
      return assertNever(guiltyUntilInnocent)
    }
  }

  protected getSwaggerType(type: Tsoa.Type, title?: string): Swagger.BaseSchema {
    if (type.dataType === 'void' || type.dataType === 'undefined') {
      return this.getSwaggerTypeForVoid(type.dataType)
    } else if (type.dataType === 'refEnum' || type.dataType === 'refObject' || type.dataType === 'refAlias') {
      return this.getSwaggerTypeForReferenceType(type)
    } else if (
      type.dataType === 'any' ||
      type.dataType === 'binary' ||
      type.dataType === 'boolean' ||
      type.dataType === 'buffer' ||
      type.dataType === 'byte' ||
      type.dataType === 'date' ||
      type.dataType === 'datetime' ||
      type.dataType === 'double' ||
      type.dataType === 'float' ||
      type.dataType === 'file' ||
      type.dataType === 'integer' ||
      type.dataType === 'long' ||
      type.dataType === 'object' ||
      type.dataType === 'string'
    ) {
      return this.getSwaggerTypeForPrimitiveType(type.dataType)
    } else if (type.dataType === 'array') {
      return this.getSwaggerTypeForArrayType(type, title)
    } else if (type.dataType === 'enum') {
      return this.getSwaggerTypeForEnumType(type, title)
    } else if (type.dataType === 'union') {
      return this.getSwaggerTypeForUnionType(type, title)
    } else if (type.dataType === 'intersection') {
      return this.getSwaggerTypeForIntersectionType(type, title)
    } else if (type.dataType === 'nestedObjectLiteral') {
      return this.getSwaggerTypeForObjectLiteral(type, title)
    } else if (type.dataType === 'tuple') {
      throw new Error('Tuple types are only supported in OpenAPI 3.1+')
    } else {
      return assertNever(type)
    }
  }

  protected abstract getSwaggerTypeForUnionType(type: Tsoa.UnionType, title?: string): Swagger.BaseSchema

  protected abstract getSwaggerTypeForIntersectionType(type: Tsoa.IntersectionType, title?: string): Swagger.BaseSchema

  protected abstract buildProperties(
    properties: Tsoa.Property[],
  ): { [propertyName: string]: Swagger.Schema2 } | { [propertyName: string]: Swagger.Schema3 } | { [propertyName: string]: Swagger.Schema31 }

  protected getPropertySchemaType(type: Tsoa.Type): Tsoa.Type {
    const unwrapBrandedAlias = (current: Tsoa.Type): Tsoa.Type => {
      if (current.dataType === 'refAlias') {
        const next = current.type
        if (next.dataType === 'intersection' && next.types.length === 1) {
          return unwrapBrandedAlias(next.types[0])
        }
        return current
      }

      if (current.dataType === 'intersection' && current.types.length === 1) {
        return unwrapBrandedAlias(current.types[0])
      }

      return current
    }

    return unwrapBrandedAlias(type)
  }

  public getSwaggerTypeForObjectLiteral(objectLiteral: Tsoa.NestedObjectLiteralType, title?: string): Swagger.BaseSchema {
    const properties = this.buildProperties(objectLiteral.properties)

    const additionalProperties = objectLiteral.additionalProperties && this.getSwaggerType(objectLiteral.additionalProperties)

    const required = objectLiteral.properties.filter(prop => this.isRequiredWithoutDefault(prop) && !this.hasUndefined(prop)).map(prop => prop.name)

    // An empty list required: [] is not valid.
    // If all properties are optional, do not specify the required keyword.
    return {
      ...(title && { title }),
      properties,
      ...(additionalProperties && { additionalProperties }),
      ...(required && required.length && { required }),
      type: 'object',
    }
  }

  protected getSwaggerTypeForReferenceType(_referenceType: Tsoa.ReferenceType): Swagger.BaseSchema {
    return {
      // Don't set additionalProperties value here since it will be set within the $ref's model when that $ref gets created
    }
  }

  protected getSwaggerTypeForVoid(_dataType: 'void' | 'undefined'): Swagger.BaseSchema {
    // Described here: https://swagger.io/docs/specification/describing-responses/#empty
    const voidSchema = {
      // isn't allowed to have additionalProperties at all (meaning not a boolean or object)
    }
    return voidSchema
  }

  protected determineImplicitAdditionalPropertiesValue = (): boolean => {
    if (this.config.noImplicitAdditionalProperties === 'silently-remove-extras') {
      return false
    } else if (this.config.noImplicitAdditionalProperties === 'throw-on-extras') {
      return false
    } else if (this.config.noImplicitAdditionalProperties === 'ignore') {
      return true
    } else {
      return assertNever(this.config.noImplicitAdditionalProperties)
    }
  }

  protected getSwaggerTypeForPrimitiveType(dataType: Tsoa.PrimitiveTypeLiteral): Swagger.BaseSchema {
    if (dataType === 'object') {
      if (process.env.NODE_ENV !== 'tsoa_test') {
        console.warn(`The type Object is discouraged. Please consider using an interface such as:
          export interface IStringToStringDictionary {
            [key: string]: string;
          }
          // or
          export interface IRecordOfAny {
            [key: string]: any;
          }
        `)
      }
    }

    const map: Record<Tsoa.PrimitiveTypeLiteral, Swagger.BaseSchema> = {
      any: {
        // While the any type is discouraged, it does explicitly allows anything, so it should always allow additionalProperties
        additionalProperties: true,
      },
      binary: { type: 'string', format: 'binary' },
      boolean: { type: 'boolean' },
      buffer: { type: 'string', format: 'byte' },
      byte: { type: 'string', format: 'byte' },
      date: { type: 'string', format: 'date' },
      datetime: { type: 'string', format: 'date-time' },
      double: { type: 'number', format: 'double' },
      file: { type: 'file' },
      float: { type: 'number', format: 'float' },
      integer: { type: 'integer', format: 'int32' },
      long: { type: 'integer', format: 'int64' },
      object: {
        additionalProperties: this.determineImplicitAdditionalPropertiesValue(),
        type: 'object',
      },
      string: { type: 'string' },
    }

    return map[dataType]
  }

  protected getSwaggerTypeForArrayType(arrayType: Tsoa.ArrayType, title?: string): Swagger.BaseSchema {
    return {
      items: this.getSwaggerType(arrayType.elementType, title),
      type: 'array',
    }
  }

  protected determineTypesUsedInEnum(anEnum: Array<string | number | boolean | null>) {
    const typesUsedInEnum = anEnum.reduce((theSet, curr) => {
      const typeUsed = curr === null ? 'number' : (typeof curr as 'string' | 'number' | 'boolean')
      theSet.add(typeUsed)
      return theSet
    }, new Set<'string' | 'number' | 'boolean'>())

    return typesUsedInEnum
  }

  protected abstract getSwaggerTypeForEnumType(enumType: Tsoa.EnumType, title?: string): Swagger.Schema2 | Swagger.Schema3

  protected hasUndefined(property: Tsoa.Property): boolean {
    return property.type.dataType === 'undefined' || (property.type.dataType === 'union' && property.type.types.some(type => type.dataType === 'undefined'))
  }

  protected queriesPropertyToQueryParameter(property: Tsoa.Property): Tsoa.Parameter {
    const example = property.example
    return {
      parameterName: property.name,
      example: isExampleValue(example) ? [example] : undefined,
      description: property.description,
      in: 'query',
      name: property.name,
      required: this.isRequiredWithoutDefault(property),
      type: property.type,
      default: property.default,
      validators: property.validators,
      parameterIndex: undefined,
      deprecated: property.deprecated,
    }
  }

  protected getExternalValidatorExtension(source: Pick<Tsoa.Parameter, 'externalValidator'>): { 'x-schema-validator'?: Tsoa.ExternalValidatorKind } {
    return source.externalValidator ? { 'x-schema-validator': source.externalValidator.kind } : {}
  }

  protected isRequiredWithoutDefault(prop: Tsoa.Property | Tsoa.Parameter): boolean | undefined {
    return prop.required && prop.default == null
  }

  protected getSchemaValidators(validators: Tsoa.Validators): Partial<Record<Tsoa.SchemaValidatorKey, unknown>> {
    const schemaValidators = Object.keys(validators)
      .filter(shouldIncludeValidatorInSchema)
      .reduce(
        (acc, key) => {
          acc[key] = validators[key]!.value
          return acc
        },
        {} as Partial<Record<Tsoa.SchemaValidatorKey, unknown>>,
      )

    return this.transformSchemaValidators(schemaValidators)
  }

  protected transformSchemaValidators(validators: Partial<Record<Tsoa.SchemaValidatorKey, unknown>>): Partial<Record<Tsoa.SchemaValidatorKey, unknown>> {
    return validators
  }

  protected transformExclusiveNumericValidatorsForLegacySpec(validators: Partial<Record<Tsoa.SchemaValidatorKey, unknown>>): Partial<Record<Tsoa.SchemaValidatorKey, unknown>> {
    const transformed = { ...validators }

    if (transformed.exclusiveMinimum !== undefined) {
      if (transformed.minimum !== undefined) {
        throw new Error('Cannot combine minimum and exclusiveMinimum in OpenAPI 2.0/3.0 schemas. Use only one lower-bound annotation or switch to OpenAPI 3.1.')
      }

      transformed.minimum = transformed.exclusiveMinimum
      transformed.exclusiveMinimum = true
    }

    if (transformed.exclusiveMaximum !== undefined) {
      if (transformed.maximum !== undefined) {
        throw new Error('Cannot combine maximum and exclusiveMaximum in OpenAPI 2.0/3.0 schemas. Use only one upper-bound annotation or switch to OpenAPI 3.1.')
      }

      transformed.maximum = transformed.exclusiveMaximum
      transformed.exclusiveMaximum = true
    }

    return transformed
  }
}
