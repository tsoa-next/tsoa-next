type Middleware<T extends CallableFunction | object> = T
type MiddlewareTarget = CallableFunction | object
type MiddlewareDecoratorArgs = [MiddlewareTarget] | [object, string | symbol, PropertyDescriptor]

const TSOA_MIDDLEWARES = Symbol('@tsoa:middlewares')

function isMiddlewareTarget(value: unknown): value is MiddlewareTarget {
  return typeof value === 'function' || (typeof value === 'object' && value !== null)
}

/**
 * Helper function to create a decorator
 * that can act as a class and method decorator.
 * @param fn a callback function that accepts
 *           the subject of the decorator
 *           either the constructor or the
 *           method
 * @returns
 */
function decorator(fn: (value: MiddlewareTarget) => void) {
  return (...args: MiddlewareDecoratorArgs) => {
    // class decorator
    if (args.length === 1) {
      const [target] = args
      fn(target)
    } else if (args.length === 3) {
      // method decorator
      const [, , descriptor] = args
      if (isMiddlewareTarget(descriptor.value)) {
        fn(descriptor.value)
      }
    }
  }
}

/**
 * Attaches one or more runtime middleware handlers to a controller or action.
 *
 * @param mws The middleware functions or middleware objects to install.
 */
export function Middlewares<T extends CallableFunction | object>(...mws: Array<Middleware<T>>): ClassDecorator & MethodDecorator {
  return decorator(target => {
    if (mws) {
      const current = fetchMiddlewares<T>(target)
      Reflect.defineMetadata(TSOA_MIDDLEWARES, [...current, ...mws], target)
    }
  })
}

/**
 * Returns middleware metadata previously attached with {@link Middlewares}.
 *
 * @param target The controller class or method function to inspect.
 */
export function fetchMiddlewares<T extends CallableFunction | object>(target: MiddlewareTarget): Array<Middleware<T>> {
  return (Reflect.getMetadata(TSOA_MIDDLEWARES, target) as Array<Middleware<T>> | undefined) ?? []
}
