import { Controller, Get, Route, Validate } from '@tsoa-next/runtime'
import { z } from 'zod'

const InvalidSchema = z.object({
  value: z.string(),
})

// @ts-expect-error Validate is intentionally applied to an unsupported target for metadata validation coverage.
@Validate(InvalidSchema)
@Route('InvalidValidateTarget')
export class InvalidValidateTargetController extends Controller {
  @Get()
  public get(): { value: string } {
    return { value: 'ok' }
  }
}
