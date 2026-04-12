import { IsValidHeader } from '../utils/isHeaderType'

/** Enumerates the concrete HTTP status codes accepted by tsoa response helpers. */
export type HttpStatusCodeLiteral =
  | 100
  | 101
  | 102
  | 200
  | 201
  | 202
  | 203
  | 204
  | 205
  | 206
  | 207
  | 208
  | 226
  | 300
  | 301
  | 302
  | 303
  | 304
  | 305
  | 307
  | 308
  | 400
  | 401
  | 402
  | 403
  | 404
  | 405
  | 406
  | 407
  | 408
  | 409
  | 410
  | 411
  | 412
  | 413
  | 414
  | 415
  | 416
  | 417
  | 418
  | 422
  | 423
  | 424
  | 425
  | 426
  | 428
  | 429
  | 431
  | 451
  | 500
  | 501
  | 502
  | 503
  | 504
  | 505
  | 506
  | 507
  | 508
  | 510
  | 511

/** String form of the supported concrete HTTP status codes. */
export type HttpStatusCodeStringLiteral = `${HttpStatusCodeLiteral}`

/** Additional OpenAPI response keys supported by {@link Response}. */
export type OtherValidOpenApiHttpStatusCode = '1XX' | '2XX' | '3XX' | '4XX' | '5XX' | 'default'

/**
 * Responder function shape injected by {@link Res}.
 *
 * Call the function with a status code, payload, and optional headers to short-circuit the action and send a typed response.
 */
export type TsoaResponse<T extends HttpStatusCodeLiteral, BodyType, HeaderType extends IsValidHeader<HeaderType> = object, ReturnType = never> = (
  status: T,
  data: BodyType,
  headers?: HeaderType,
) => ReturnType
