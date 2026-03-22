import { Body, Controller, Post, Route, Validate } from '@tsoa-next/runtime'

@Route('InvalidValidateObjectConfig')
export class InvalidValidateObjectConfigController extends Controller {
  @Post()
  public create(@Body() @Validate({ schema: { type: 'object' } }) payload: { value: string }): { value: string } {
    return payload
  }
}
