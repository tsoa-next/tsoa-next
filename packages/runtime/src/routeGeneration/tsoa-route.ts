import { Tsoa } from './../metadataGeneration/tsoa'

/**
 * Returns `true` when a model schema is relying on OpenAPI's default `additionalProperties` behavior.
 */
export function isDefaultForAdditionalPropertiesAllowed(test: TsoaRoute.RefObjectModelSchema['additionalProperties']): test is undefined {
  return test === undefined
}

/** Runtime schema shapes consumed by generated route handlers. */
// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace TsoaRoute {
  /** Validation strategy used by generated route metadata. */
  export type ValidationStrategy = Tsoa.ValidationStrategy
  /** External validator descriptor resolved during metadata generation. */
  export type ExternalValidatorDescriptor = Tsoa.ExternalValidatorDescriptor

  /** Reference model lookup table keyed by model name. */
  export interface Models {
    [name: string]: ModelSchema
  }

  /**
   * This is a convenience type so you can check .properties on the items in the Record without having TypeScript throw a compiler error. That's because this Record can't have enums in it. If you want that, then just use the base interface
   */
  export interface RefObjectModels extends TsoaRoute.Models {
    [refNames: string]: TsoaRoute.RefObjectModelSchema
  }

  export interface RefEnumModelSchema {
    dataType: 'refEnum'
    enums: Array<string | number>
  }

  /** Runtime schema for object models referenced by generated routes. */
  export interface RefObjectModelSchema {
    dataType: 'refObject'
    properties: { [name: string]: PropertySchema }
    additionalProperties?: boolean | PropertySchema
  }

  /** Runtime schema for named type aliases. */
  export interface RefTypeAliasModelSchema {
    dataType: 'refAlias'
    type: PropertySchema
  }

  /** Runtime schema union for named models. */
  export type ModelSchema = RefEnumModelSchema | RefObjectModelSchema | RefTypeAliasModelSchema

  /** Validator metadata copied from generated type metadata. */
  export type ValidatorSchema = Tsoa.Validators

  /** Schema fragment used to validate a single property or nested value at runtime. */
  export interface PropertySchema {
    dataType?: Tsoa.TypeStringLiteral
    ref?: string
    required?: boolean
    validationStrategy?: ValidationStrategy
    externalValidator?: ExternalValidatorDescriptor
    array?: PropertySchema
    enums?: Array<string | number | boolean | null>
    type?: PropertySchema
    subSchemas?: PropertySchema[]
    validators?: ValidatorSchema
    default?: unknown
    additionalProperties?: boolean | PropertySchema
    nestedProperties?: { [name: string]: PropertySchema }
  }

  /** Runtime schema for a route parameter. */
  export interface ParameterSchema extends PropertySchema {
    parameterIndex?: number
    name: string
    in: string
  }

  /** Security requirement map emitted into generated route metadata. */
  export interface Security {
    [key: string]: string[]
  }
}
