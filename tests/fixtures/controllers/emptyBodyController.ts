import { Body, Post, Route } from '@tsoa-next/runtime'

interface EmptyBodyPayload {
  value?: string
}

@Route('EmptyBody')
export class EmptyBodyController {
  @Post('optional')
  public optional(@Body() body?: EmptyBodyPayload) {
    return {
      state: body === undefined ? 'undefined' : 'defined',
      body: body ?? null,
    }
  }

  @Post('required')
  public required(@Body() body: EmptyBodyPayload) {
    return body
  }
}
