import { Body, Controller, Post, Route, Validate } from '@tsoa-next/runtime'

const UnknownSchema = {
  parse(value: unknown) {
    return value
  },
}

@Route('InvalidValidateInference')
export class InvalidValidateInferenceController extends Controller {
  @Post()
  public create(@Body() @Validate(UnknownSchema) payload: { value: string }): { value: string } {
    return payload
  }
}
