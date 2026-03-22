import { Swagger } from '@tsoa-next/runtime/swagger/swagger'

export const swagger2BodyParameter: Swagger.BodyParameter = {
  in: 'body',
  name: 'body',
  schema: {
    properties: {
      count: { type: 'integer' },
    },
    type: 'object',
  },
}

export const swagger2QueryParameter: Swagger.Swagger2QueryParameter = {
  exclusiveMinimum: true,
  in: 'query',
  minimum: 1,
  name: 'limit',
  type: 'integer',
}

export const openApi3Parameter: Swagger.Parameter3 = {
  in: 'query',
  name: 'limit',
  schema: {
    exclusiveMinimum: true,
    minimum: 1,
    type: 'integer',
  },
}

export const openApi31Parameter: Swagger.Parameter31 = {
  in: 'query',
  name: 'limit',
  schema: {
    exclusiveMinimum: 1,
    type: 'integer',
  },
}

export const compatBaseParameter: Swagger.BaseParameter = swagger2QueryParameter

export const swagger2NestedSchema: Swagger.Schema2 = {
  additionalProperties: {
    exclusiveMinimum: true,
    minimum: 1,
    type: 'integer',
  },
  items: {
    exclusiveMaximum: true,
    maximum: 10,
    type: 'integer',
  },
  type: 'array',
}

export const openApi3NestedSchema: Swagger.Schema3 = {
  additionalProperties: {
    nullable: true,
    type: 'string',
  },
  allOf: [
    {
      exclusiveMinimum: true,
      minimum: 1,
      type: 'integer',
    },
  ],
  anyOf: [
    {
      deprecated: true,
      type: 'string',
    },
  ],
  items: {
    exclusiveMaximum: true,
    maximum: 10,
    type: 'integer',
  },
  type: 'array',
}
