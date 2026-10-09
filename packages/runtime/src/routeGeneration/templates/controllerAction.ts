import type { Controller } from '../../interfaces/controller'

export function buildControllerActionPromise(methodName: string, controller: Controller | object, validatedArgs: unknown[]): Promise<unknown> {
  const ownPrototype = Object.getPrototypeOf(controller) as object | null
  let prototype: object | null = ownPrototype
  let descriptor: PropertyDescriptor | undefined

  // Search up the prototype chain so inherited controller actions can be dispatched.
  // We stop at Object.prototype because methods above that level are not user actions.
  while (prototype && prototype !== Object.prototype) {
    descriptor = Object.getOwnPropertyDescriptor(prototype, methodName)
    if (descriptor?.value && typeof descriptor.value === 'function') {
      break
    }

    prototype = Object.getPrototypeOf(prototype) as object | null
  }

  // Keep previous behavior when nothing is found by allowing the same
  // descriptor access failure path to occur on the original prototype.
  const resolvedDescriptor = descriptor || Object.getOwnPropertyDescriptor(ownPrototype, methodName)
  const method = resolvedDescriptor?.value as unknown
  if (typeof method !== 'function') {
    throw new TypeError(`Controller method '${methodName}' is not callable`)
  }

  const callable = method as (...args: unknown[]) => unknown
  return Promise.resolve(callable.apply(controller, validatedArgs))
}
