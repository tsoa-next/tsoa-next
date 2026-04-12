import { IsValidHeader } from '../utils/isHeaderType'
import { HttpStatusCodeLiteral, HttpStatusCodeStringLiteral, OtherValidOpenApiHttpStatusCode } from '../interfaces/response'
import { createNoopClassMethodDecorator, createNoopMethodDecorator, createNoopParameterDecorator } from './noop'

/**
 * Declares the successful response status, description, and media types for an operation.
 *
 * @param _name The HTTP status code returned when the operation succeeds.
 * @param _description The response description shown in the generated OpenAPI document.
 * @param _produces The response media type or media types.
 */
export function SuccessResponse<HeaderType extends IsValidHeader<HeaderType> = object>(_name: string | number, _description?: string, _produces?: string | string[]): MethodDecorator {
  return createNoopMethodDecorator('success-response')
}

/**
 * Adds a documented response that can be attached to a method or a controller.
 *
 * @param _name The HTTP status code, OpenAPI response range, or `default`.
 * @param _description The response description shown in the generated OpenAPI document.
 * @param _example An example payload for the response schema.
 * @param _produces The response media type or media types.
 */
export function Response<ExampleType, HeaderType extends IsValidHeader<HeaderType> = object>(
  _name: HttpStatusCodeLiteral | HttpStatusCodeStringLiteral | OtherValidOpenApiHttpStatusCode,
  _description?: string,
  _example?: ExampleType,
  _produces?: string | string[],
): MethodDecorator & ClassDecorator {
  return createNoopClassMethodDecorator('response')
}

/**
 * Inject a library-agnostic responder function that can be used to construct type-checked (usually error-) responses.
 *
 * Annotate the parameter as `TsoaResponse<Status, Data, Headers>` so tsoa can infer the documented response.
 */
export function Res(): ParameterDecorator {
  return createNoopParameterDecorator('res')
}

/**
 * Overrides the response media type on a controller or a single action.
 *
 * @param _value The response media type, for example `application/json`.
 * @link https://swagger.io/docs/specification/media-types/
 */
export function Produces(_value: string): MethodDecorator & ClassDecorator {
  return createNoopClassMethodDecorator('produces')
}
