import { Request as HRequest, ResponseToolkit as HResponse } from '@hapi/hapi'
import type { Payload } from '@hapi/boom'

import { Controller } from '../../../interfaces/controller'
import { FieldErrors } from '../../templateHelpers'
import { TsoaRoute } from '../../tsoa-route'
import { ValidateError } from '../../templateHelpers'
import { TemplateService } from '../templateService'
import { AdditionalProps } from '../../additionalProps'

const hapiTsoaResponsed = Symbol('@tsoa:template_service:hapi:responsed')

type HeaderRecord = Record<string, string | string[] | undefined>
type HapiResponder = (status: number | undefined, data: unknown, headers: HeaderRecord) => void
type BoomLike = Error & {
  output: {
    statusCode: number
    payload: Payload
  }
}

type HapiApiHandlerParameters = {
  methodName: string
  controller: Controller | object
  h: HResponse
  validatedArgs: unknown[]
  successStatus?: number
}

type HapiValidationArgsParameters = {
  args: Record<string, TsoaRoute.ParameterSchema>
  controllerClass?: object
  methodName?: string
  request: HRequest
  h: HResponse
}

type HapiReturnHandlerParameters = {
  h: HResponse
  headers: HeaderRecord | undefined
  statusCode?: number
  data?: unknown
}

export class HapiTemplateService extends TemplateService<HapiApiHandlerParameters, HapiValidationArgsParameters, HapiReturnHandlerParameters> {
  constructor(
    protected readonly models: TsoaRoute.Models,
    protected readonly config: AdditionalProps,
    private readonly hapi: {
      boomify(error: Error): BoomLike
      isBoom(error: unknown): boolean
    },
  ) {
    super(models, config)
  }

  async apiHandler(params: HapiApiHandlerParameters) {
    const { methodName, controller, h, validatedArgs, successStatus } = params

    try {
      const data = await this.buildPromise(methodName, controller, validatedArgs)
      let statusCode = successStatus
      let headers: HeaderRecord | undefined

      if (this.isController(controller)) {
        headers = controller.getHeaders()
        statusCode = controller.getStatus() || statusCode
      }
      return this.returnHandler({ h, headers, statusCode, data })
    } catch (error: unknown) {
      if (this.hapi.isBoom(error)) {
        throw error
      }

      const boomErr = this.hapi.boomify(this.toError(error))
      const statusCode = this.getErrorStatus(error) ?? 500
      boomErr.output.statusCode = statusCode
      boomErr.output.payload = {
        statusCode,
        error: this.getErrorName(error),
        name: this.getErrorName(error),
        message: this.getErrorMessage(error),
      }
      throw boomErr
    }
  }

  getValidatedArgs(params: HapiValidationArgsParameters): unknown[] {
    const { args, controllerClass, methodName, request, h } = params

    const errorFields: FieldErrors = {}
    const values = Object.values(args).map(param => {
      const metadata = { controllerClass, methodName, parameterIndex: param.parameterIndex }
      const name = param.name
      switch (param.in) {
        case 'request':
          return request
        case 'request-prop': {
          const descriptor = Object.getOwnPropertyDescriptor(request, name)
          const value: unknown = descriptor ? descriptor.value : undefined
          return this.validationService.ValidateParam(param, value, name, errorFields, false, undefined, metadata)
        }
        case 'query':
          return this.validationService.ValidateParam(param, request.query[name], name, errorFields, false, undefined, metadata)
        case 'queries':
          return this.validationService.ValidateParam(param, request.query, name, errorFields, false, undefined, metadata)
        case 'path':
          return this.validationService.ValidateParam(param, request.params[name], name, errorFields, false, undefined, metadata)
        case 'header':
          return this.validationService.ValidateParam(param, request.headers[name], name, errorFields, false, undefined, metadata)
        case 'body': {
          const bodyFieldErrors: FieldErrors = {}
          const normalizedBody = this.normalizeRequestBody(request.payload, request.headers)
          const result = this.validationService.ValidateParam(param, normalizedBody, name, bodyFieldErrors, true, undefined, metadata)
          Object.keys(bodyFieldErrors).forEach(key => {
            errorFields[key] = { message: bodyFieldErrors[key].message }
          })
          return result
        }
        case 'body-prop': {
          const value = this.getBodyProperty(request.payload, request.headers, name)
          const bodyFieldErrors: FieldErrors = {}
          const result = this.validationService.ValidateParam(param, value, name, bodyFieldErrors, true, 'body.', metadata)
          Object.keys(bodyFieldErrors).forEach(key => {
            errorFields[key] = { message: bodyFieldErrors[key].message }
          })
          return result
        }
        case 'formData': {
          const descriptor = this.isRecord(request.payload) ? Object.getOwnPropertyDescriptor(request.payload, name) : undefined
          const value: unknown = descriptor ? descriptor.value : undefined
          return this.validationService.ValidateParam(param, value, name, errorFields, false, undefined, metadata)
        }
        case 'res':
          return ((status: number | undefined, data: unknown, headers: HeaderRecord) => {
            this.returnHandler({ h, headers, statusCode: status, data })
          }) satisfies HapiResponder
        default:
          return undefined
      }
    })
    if (Object.keys(errorFields).length > 0) {
      throw new ValidateError(errorFields, '')
    }
    return values
  }

  protected returnHandler(params: HapiReturnHandlerParameters) {
    const { h, statusCode, data } = params
    let { headers } = params
    headers = headers || {}

    const tsoaResponsed = Object.getOwnPropertyDescriptor(h, hapiTsoaResponsed)
    if (tsoaResponsed) {
      return tsoaResponsed.value as unknown
    }

    const response = data !== null && data !== undefined ? h.response(data).code(200) : h.response().code(204)
    const setHeader = response.header.bind(response)

    Object.keys(headers).forEach((name: string) => {
      const headerValue = headers[name]
      if (headerValue !== undefined) {
        if (Array.isArray(headerValue)) {
          Reflect.apply(setHeader, response, [name, headerValue, { append: name.toLowerCase() === 'set-cookie' }])
        } else {
          setHeader(name, headerValue)
        }
      }
    })

    if (statusCode) {
      response.code(statusCode)
    }

    Object.defineProperty(h, hapiTsoaResponsed, {
      value: response,
      writable: false,
    })

    return response
  }

  private toError(error: unknown): Error {
    if (error instanceof Error) {
      return error
    }

    if (this.isRecord(error) && typeof error.message === 'string') {
      return new Error(error.message)
    }

    return new Error('Internal Server Error')
  }

  private getErrorStatus(error: unknown): number | undefined {
    if (this.isRecord(error) && typeof error.status === 'number') {
      return error.status
    }

    return undefined
  }

  private getErrorName(error: unknown): string {
    if (error instanceof Error) {
      return error.name
    }

    if (this.isRecord(error) && typeof error.name === 'string') {
      return error.name
    }

    return 'Error'
  }

  private getErrorMessage(error: unknown): string {
    if (error instanceof Error) {
      return error.message
    }

    if (this.isRecord(error) && typeof error.message === 'string') {
      return error.message
    }

    return 'Internal Server Error'
  }
}
