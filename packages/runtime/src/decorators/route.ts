import { createNoopClassDecorator, createNoopHiddenDecorator } from './noop'

/**
 * Declares the base route path for a controller.
 *
 * @param _name The controller path segment relative to the configured API base path.
 */
export function Route(_name?: string): ClassDecorator {
  return createNoopClassDecorator('route')
}

/**
 * Hides a controller, action, or parameter from generated OpenAPI metadata.
 */
export function Hidden(): ClassDecorator & MethodDecorator & ParameterDecorator {
  return createNoopHiddenDecorator('hidden')
}
