import { Swagger } from '@tsoa-next/runtime/swagger/swagger'

export const invalidOpenApi3Parameter: Swagger.Parameter3 = {
  exclusiveMinimum: true,
  in: 'query',
  name: 'limit',
  schema: {
    type: 'integer',
  },
  type: 'integer',
}
