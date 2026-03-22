import type { Context, Next } from 'koa'

import { Controller } from '../../../interfaces/controller'
import { FieldErrors } from '../../templateHelpers'
import { TsoaRoute } from '../../tsoa-route'
import { ValidateError } from '../../templateHelpers'
import { TemplateService } from '../templateService'

const koaTsoaResponsed = Symbol('@tsoa:template_service:koa:is_responsed')

type HeaderRecord = Record<string, string | string[] | undefined>
type KoaResponder = (status: number | undefined, data: unknown, headers: HeaderRecord) => Promise<void>
type KoaRequestWithBody = Context['request'] & { body?: unknown; files?: Record<string, unknown> }

type KoaApiHandlerParameters = {
  methodName: string
  controller: Controller | object
  context: Context
  validatedArgs: unknown[]
  successStatus?: number
}

type KoaValidationArgsParameters = {
  args: Record<string, TsoaRoute.ParameterSchema>
  controllerClass?: object
  methodName?: string
  context: Context
  next: Next
}

type KoaReturnHandlerParameters = {
  context: Context
  next?: Next
  headers: HeaderRecord | undefined
  statusCode?: number
  data?: unknown
}

export class KoaTemplateService extends TemplateService<KoaApiHandlerParameters, KoaValidationArgsParameters, KoaReturnHandlerParameters> {
  async apiHandler(params: KoaApiHandlerParameters) {
    const { methodName, controller, context, validatedArgs, successStatus } = params

    try {
      const data = await this.buildPromise(methodName, controller, validatedArgs)
      let statusCode = successStatus
      let headers: HeaderRecord | undefined

      if (this.isController(controller)) {
        headers = controller.getHeaders()
        statusCode = controller.getStatus() || statusCode
      }
      return this.returnHandler({ context, headers, statusCode, data })
    } catch (error: unknown) {
      const status = this.getErrorStatus(error) ?? 500
      context.status = status
      const properties = this.getErrorProperties(error)
      if (properties) {
        context.throw(status, this.getErrorMessage(error), properties)
      }
      context.throw(status, this.getErrorMessage(error))
    }
  }

  getValidatedArgs(params: KoaValidationArgsParameters): unknown[] {
    const { args, controllerClass, methodName, context, next } = params

    const errorFields: FieldErrors = {}
    const values = Object.values(args).map(param => {
      const metadata = { controllerClass, methodName, parameterIndex: param.parameterIndex }
      const name = param.name
      switch (param.in) {
        case 'request':
          return context.request
        case 'request-prop': {
          const descriptor = Object.getOwnPropertyDescriptor(context.request, name)
          const value: unknown = descriptor ? descriptor.value : undefined
          return this.validationService.ValidateParam(param, value, name, errorFields, false, undefined, metadata)
        }
        case 'query':
          return this.validationService.ValidateParam(param, context.request.query[name], name, errorFields, false, undefined, metadata)
        case 'queries':
          return this.validationService.ValidateParam(param, context.request.query, name, errorFields, false, undefined, metadata)
        case 'path':
          return this.validationService.ValidateParam(param, this.getPathValue(context.params, name), name, errorFields, false, undefined, metadata)
        case 'header':
          return this.validationService.ValidateParam(param, this.getHeaderValue(context.request.headers, name), name, errorFields, false, undefined, metadata)
        case 'body': {
          const value = this.normalizeRequestBody(this.getRequestBody(context.request), context.request.headers)
          const bodyFieldErrors: FieldErrors = {}
          const result = this.validationService.ValidateParam(param, value, name, bodyFieldErrors, true, undefined, metadata)
          Object.keys(bodyFieldErrors).forEach(key => {
            errorFields[key] = { message: bodyFieldErrors[key].message }
          })
          return result
        }
        case 'body-prop': {
          const value = this.getBodyProperty(this.getRequestBody(context.request), context.request.headers, name)
          const bodyFieldErrors: FieldErrors = {}
          const result = this.validationService.ValidateParam(param, value, name, bodyFieldErrors, true, 'body.', metadata)
          Object.keys(bodyFieldErrors).forEach(key => {
            errorFields[key] = { message: bodyFieldErrors[key].message }
          })
          return result
        }
        case 'formData': {
          const files = Object.values(args).filter(p => p.dataType === 'file' || (p.dataType === 'array' && p.array && p.array.dataType === 'file'))
          const contextRequest = context.request as KoaRequestWithBody
          if ((param.dataType === 'file' || (param.dataType === 'array' && param.array && param.array.dataType === 'file')) && files.length > 0) {
            const fileArgs = this.validationService.ValidateParam(param, contextRequest.files?.[name], name, errorFields, false, undefined, metadata)
            if (param.dataType === 'array') {
              return fileArgs
            }
            if (Array.isArray(fileArgs) && fileArgs.length === 1) {
              const firstFile: unknown = fileArgs[0]
              return firstFile
            }
            return fileArgs
          }
          const bodyValue = this.isRecord(contextRequest.body) ? contextRequest.body[name] : undefined
          return this.validationService.ValidateParam(param, bodyValue, name, errorFields, false, undefined, metadata)
        }
        case 'res':
          return (async (status: number | undefined, data: unknown, headers: HeaderRecord): Promise<void> => {
            await this.returnHandler({ context, headers, statusCode: status, data, next })
          }) satisfies KoaResponder
        default:
          return undefined
      }
    })
    if (Object.keys(errorFields).length > 0) {
      throw new ValidateError(errorFields, '')
    }
    return values
  }

  protected returnHandler(params: KoaReturnHandlerParameters): Promise<void> | Context | undefined {
    const { context, next, statusCode, data } = params
    let { headers } = params
    headers = headers || {}

    const isResponsed = Object.getOwnPropertyDescriptor(context.response, koaTsoaResponsed)
    if (!context.headerSent && !isResponsed) {
      if (data !== null && data !== undefined) {
        context.body = data
        context.status = 200
      } else {
        context.status = 204
      }

      if (statusCode) {
        context.status = statusCode
      }

      Object.entries(headers).forEach(([name, value]) => {
        if (value !== undefined) {
          context.set(name, value)
        }
      })
      Object.defineProperty(context.response, koaTsoaResponsed, {
        value: true,
        writable: false,
      })
      return next ? next() : context
    }
    return undefined
  }

  private getRequestBody(request: Context['request']): unknown {
    const requestWithBody = request as KoaRequestWithBody
    return requestWithBody.body
  }

  private getHeaderValue(headers: Context['request']['headers'], name: string): unknown {
    return headers[name]
  }

  private getPathValue(params: Context['params'], name: string): unknown {
    return (params as Record<string, unknown>)[name]
  }

  private getErrorStatus(error: unknown): number | undefined {
    if (this.isRecord(error) && typeof error.status === 'number') {
      return error.status
    }

    return undefined
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

  private getErrorProperties(error: unknown): object | undefined {
    return this.isRecord(error) ? error : undefined
  }
}
