import { buildControllerActionPromise } from './controllerAction'
import { requestHasBody, requestUsesTransferEncoding, normalizeRequestBody, getBodyProperty, isRecord, type BodyInterpretationOwner } from './requestBody'
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
    return requestHasBody(headers)
  }

  protected requestUsesTransferEncoding(headers: Record<string, unknown>): boolean {
    return requestUsesTransferEncoding(headers)
  }

  protected normalizeRequestBody(body: unknown, headers: Record<string, unknown>): unknown {
    return normalizeRequestBody(this as unknown as BodyInterpretationOwner, body, headers)
  }

  protected getBodyProperty(body: unknown, headers: Record<string, unknown>, propertyName: string): unknown {
    return getBodyProperty(this as unknown as BodyInterpretationOwner, body, headers, propertyName)
  }

  protected isRecord(value: unknown): value is Record<string, unknown> {
    return isRecord(value)
  }

  protected buildPromise(methodName: string, controller: Controller | object, validatedArgs: unknown[]): Promise<unknown> {
    return buildControllerActionPromise(methodName, controller, validatedArgs)
  }
}
