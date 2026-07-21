import { Body, Controller, Post, Route, Validate } from '@tsoa-next/runtime'

// eslint-disable-next-line no-useless-assignment -- The fixture intentionally exercises schema inference through decorator metadata.
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
