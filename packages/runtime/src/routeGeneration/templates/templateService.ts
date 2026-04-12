import { Controller } from '../../interfaces/controller'
import { TsoaRoute } from '../tsoa-route'
import { ValidationService } from '../templateHelpers'
import { AdditionalProps } from '../additionalProps'

/**
 * Shared base class for runtime-specific template services used by generated routes.
 */
export abstract class TemplateService<ApiHandlerParameters, ValidationArgsParameters, ReturnHandlerParameters> {
  protected validationService: ValidationService

  constructor(
    protected readonly models: TsoaRoute.Models,
    protected readonly config: AdditionalProps,
  ) {
    this.validationService = new ValidationService(models, config)
  }

  /** Invokes the controller action for the active runtime. */
  abstract apiHandler(params: ApiHandlerParameters): Promise<unknown>

  /** Validates and normalizes the route arguments extracted from the request. */
  abstract getValidatedArgs(params: ValidationArgsParameters): unknown[]

  /** Writes the controller result back to the active runtime. */
  protected abstract returnHandler(params: ReturnHandlerParameters): unknown

  protected isController(object: Controller | object): object is Controller {
    return 'getHeaders' in object && 'getStatus' in object && 'setStatus' in object
  }

  protected requestHasBody(headers: Record<string, unknown>): boolean {
    const contentLength = headers['content-length']

    if (Array.isArray(contentLength)) {
      return contentLength.some(value => Number(value) > 0)
    }

    if (typeof contentLength === 'string') {
      return Number(contentLength) > 0
    }

    if (typeof contentLength === 'number') {
      return contentLength > 0
    }

    return false
  }

  protected requestUsesTransferEncoding(headers: Record<string, unknown>): boolean {
    return headers['transfer-encoding'] !== undefined
  }

  protected normalizeRequestBody(body: unknown, headers: Record<string, unknown>): unknown {
    if (this.requestHasBody(headers) || this.requestUsesTransferEncoding(headers)) {
      return body
    }

    return undefined
  }

  protected getBodyProperty(body: unknown, headers: Record<string, unknown>, propertyName: string): unknown {
    const normalizedBody = this.normalizeRequestBody(body, headers)

    if (!this.isRecord(normalizedBody)) {
      return undefined
    }

    const descriptor = Object.getOwnPropertyDescriptor(normalizedBody, propertyName)
    return descriptor ? descriptor.value : undefined
  }

  protected isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null && !Array.isArray(value)
  }

  protected buildPromise(methodName: string, controller: Controller | object, validatedArgs: unknown[]): Promise<unknown> {
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
}
