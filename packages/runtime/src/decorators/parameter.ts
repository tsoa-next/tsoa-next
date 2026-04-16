import { createNoopMethodDecorator, createNoopParameterDecorator } from './noop'

/**
 * Binds the full HTTP request body to a controller parameter.
 */
export function Body(): ParameterDecorator {
  return createNoopParameterDecorator('body')
}

/**
 * Binds a single property from the request body to a controller parameter.
 *
 * @param _name The property name to read from the request body. Defaults to the parameter name.
 */
export function BodyProp(_name?: string): ParameterDecorator {
  return createNoopParameterDecorator('body-prop')
}

/**
 * Injects the underlying runtime request object.
 */
export function Request(): ParameterDecorator {
  return createNoopParameterDecorator('request')
}

/**
 * Binds a property from the underlying runtime request object.
 *
 * @param _name The request property name to read. Defaults to the parameter name.
 */
export function RequestProp(_name?: string): ParameterDecorator {
  return createNoopParameterDecorator('request-prop')
}

/**
 * Binds a path parameter from the request URL.
 *
 * @param _name The path parameter name. Defaults to the parameter name.
 */
export function Path(_name?: string): ParameterDecorator {
  return createNoopParameterDecorator('path')
}

/**
 * Binds a query-string value to a controller parameter.
 *
 * @param _name The query parameter name. Defaults to the parameter name.
 */
export function Query(_name?: string): ParameterDecorator {
  return createNoopParameterDecorator('query')
}

/**
 * Binds the entire query object to a single controller parameter.
 */
export function Queries(): ParameterDecorator {
  return createNoopParameterDecorator('queries')
}

/**
 * Binds an HTTP header value to a controller parameter.
 *
 * @param _name The header name. Defaults to the parameter name.
 */
export function Header(_name?: string): ParameterDecorator {
  return createNoopParameterDecorator('header')
}

/**
 * Marks a parameter as injected by user code so tsoa skips route-generation metadata for it.
 */
export function Inject(): ParameterDecorator {
  return createNoopParameterDecorator('inject')
}

/**
 * Binds a single uploaded file from a multipart/form-data request.
 *
 * @param _name The multipart field name. Defaults to the parameter name.
 */
export function UploadedFile(_name?: string): ParameterDecorator {
  return createNoopParameterDecorator('uploaded-file')
}

/**
 * Binds multiple uploaded files from a multipart/form-data request.
 *
 * @param _name The multipart field name. Defaults to the parameter name.
 */
export function UploadedFiles(_name?: string): ParameterDecorator {
  return createNoopParameterDecorator('uploaded-files')
}

/**
 * Binds a regular multipart form field from a multipart/form-data request.
 *
 * @param _name The multipart field name. Defaults to the parameter name.
 */
export function FormField(_name?: string): ParameterDecorator {
  return createNoopParameterDecorator('form-field')
}

/**
 * Overrides the media type used to document a request body for a single action.
 *
 * @param _value The request body media type, for example `application/json`.
 * See https://swagger.io/docs/specification/describing-request-body/.
 */
export function Consumes(_value: string): MethodDecorator {
  return createNoopMethodDecorator('consumes')
}
