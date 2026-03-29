import { Controller, Get, Request, Route, Validate } from '@tsoa-next/runtime'
import { z } from 'zod'

const RequestSchema = z.object({
  method: z.string(),
})

@Route('InvalidValidateRequestParam')
export class InvalidValidateRequestParamController extends Controller {
  @Get()
  public get(@Request() @Validate(RequestSchema) request: unknown): unknown {
    return request
  }
}
