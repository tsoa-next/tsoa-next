import { Swagger } from '@tsoa-next/runtime/swagger/swagger'

export const invalidSwagger2BodyParameter: Swagger.BodyParameter = {
  in: 'body',
  minimum: 1,
  name: 'body',
  schema: {
    type: 'integer',
  },
}
