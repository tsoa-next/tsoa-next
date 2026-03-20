import { Controller } from '../../interfaces/controller'
import { TsoaRoute } from '../tsoa-route'
import { ValidationService } from '../templateHelpers'
import { AdditionalProps } from '../additionalProps'

export abstract class TemplateService<ApiHandlerParameters, ValidationArgsParameters, ReturnHandlerParameters> {
  protected validationService: ValidationService

  constructor(
    protected readonly models: TsoaRoute.Models,
    protected readonly config: AdditionalProps,
  ) {
    this.validationService = new ValidationService(models, config)
  }

  abstract apiHandler(params: ApiHandlerParameters): Promise<any>

  abstract getValidatedArgs(params: ValidationArgsParameters): any[]

  protected abstract returnHandler(params: ReturnHandlerParameters): any

  protected isController(object: Controller | object): object is Controller {
    return 'getHeaders' in object && 'getStatus' in object && 'setStatus' in object
  }

  protected buildPromise(methodName: string, controller: Controller | object, validatedArgs: any) {
    const ownPrototype = Object.getPrototypeOf(controller)
    let prototype: object | null = ownPrototype
    let descriptor: PropertyDescriptor | undefined

    // Search up the prototype chain so inherited controller actions can be dispatched.
    // We stop at Object.prototype because methods above that level are not user actions.
    while (prototype && prototype !== Object.prototype) {
      descriptor = Object.getOwnPropertyDescriptor(prototype, methodName)
      if (descriptor?.value && typeof descriptor.value === 'function') {
        break
      }

      prototype = Object.getPrototypeOf(prototype)
    }

    // Keep previous behavior when nothing is found by allowing the same
    // descriptor access failure path to occur on the original prototype.
    const resolvedDescriptor = descriptor || Object.getOwnPropertyDescriptor(ownPrototype, methodName)
    return (resolvedDescriptor!.value as (...args: any[]) => Promise<any>).apply(controller, validatedArgs)
  }
}
