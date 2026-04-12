import { createNoopMethodDecorator } from './noop'

/** Marks a controller method as handling HTTP `OPTIONS` requests for the given relative path. */
export function Options(_value?: string): MethodDecorator {
  return createNoopMethodDecorator('options')
}

/** Marks a controller method as handling HTTP `GET` requests for the given relative path. */
export function Get(_value?: string): MethodDecorator {
  return createNoopMethodDecorator('get')
}

/** Marks a controller method as handling HTTP `POST` requests for the given relative path. */
export function Post(_value?: string): MethodDecorator {
  return createNoopMethodDecorator('post')
}

/** Marks a controller method as handling HTTP `PUT` requests for the given relative path. */
export function Put(_value?: string): MethodDecorator {
  return createNoopMethodDecorator('put')
}

/** Marks a controller method as handling HTTP `PATCH` requests for the given relative path. */
export function Patch(_value?: string): MethodDecorator {
  return createNoopMethodDecorator('patch')
}

/** Marks a controller method as handling HTTP `DELETE` requests for the given relative path. */
export function Delete(_value?: string): MethodDecorator {
  return createNoopMethodDecorator('delete')
}

/** Marks a controller method as handling HTTP `HEAD` requests for the given relative path. */
export function Head(_value?: string): MethodDecorator {
  return createNoopMethodDecorator('head')
}
