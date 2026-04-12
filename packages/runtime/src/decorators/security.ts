import { createNoopClassMethodDecorator } from './noop'

/**
 * Clears inherited security requirements for a controller or action.
 */
export function NoSecurity(): ClassDecorator & MethodDecorator {
  return createNoopClassMethodDecorator('no-security')
}

/**
 * Declares the security requirement for a controller or action.
 *
 * @param _name The security scheme name, or a full security requirement object.
 * @param _scopes OAuth scopes required by the scheme when `_name` is a string.
 */
export function Security(_name: string | { [name: string]: string[] }, _scopes?: string[]): ClassDecorator & MethodDecorator {
  return createNoopClassMethodDecorator('security')
}
