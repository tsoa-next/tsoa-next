import { Body, Controller, Post, Route, Validate } from '@tsoa-next/runtime'

@Route('InvalidValidateMissingSchema')
export class InvalidValidateMissingSchemaController extends Controller {
  @Post()
  public create(@Body() @Validate('zod') payload: { value: string }): { value: string } {
    return payload
  }
}
