import { Body, Controller, Post, Route, Validate } from '@tsoa-next/runtime'

@Route('InvalidValidateKind')
export class InvalidValidateKindController extends Controller {
  @Post()
  public create(@Body() @Validate('ajv', { type: 'object' }) payload: { value: string }): { value: string } {
    return payload
  }
}
