import { Swagger } from '@tsoa-next/runtime/swagger/swagger'

export const invalidSwagger2QueryParameter: Swagger.Swagger2QueryParameter = {
  in: 'query',
  name: 'limit',
  schema: {
    type: 'integer',
  },
  type: 'integer',
}
