import { IsValidHeader } from '../utils/isHeaderType'
import { HttpStatusCodeLiteral, HttpStatusCodeStringLiteral, OtherValidOpenApiHttpStatusCode } from '../interfaces/response'

export function SuccessResponse<HeaderType extends IsValidHeader<HeaderType> = object>(_name: string | number, _description?: string, _produces?: string | string[]): MethodDecorator {
  return () => {
    return
  }
}

export function Response<ExampleType, HeaderType extends IsValidHeader<HeaderType> = object>(
  _name: HttpStatusCodeLiteral | HttpStatusCodeStringLiteral | OtherValidOpenApiHttpStatusCode,
  _description?: string,
  _example?: ExampleType,
  _produces?: string | string[],
): MethodDecorator & ClassDecorator {
  return () => {
    return
  }
}

/**
 * Inject a library-agnostic responder function that can be used to construct type-checked (usually error-) responses.
 *
 * The type of the responder function should be annotated `TsoaResponse<Status, Data, Headers>` in order to support OpenAPI documentation.
 */
export function Res(): ParameterDecorator {
  return () => {
    return
  }
}

/**
 * Overrides the default media type of response.
 * Can be used on controller level or only for specific method
 *
 * @link https://swagger.io/docs/specification/media-types/
 */
export function Produces(_value: string): MethodDecorator & ClassDecorator {
  return () => {
    return
  }
}
