import { TsoaResponse } from '@tsoa-next/runtime'

const responderWithExplicitVoid: TsoaResponse<400, { message: string }, { 'x-trace-id': string }, void> = (_status, _data, _headers) => {
  return
}

const responderWithDefaultReturn: TsoaResponse<404, { message: string }> = (_status, _data) => {
  throw new Error('stop execution')
}

export const tsoaResponseTypeChecks = {
  responderWithDefaultReturn,
  responderWithExplicitVoid,
}
