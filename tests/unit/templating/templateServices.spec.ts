import { expect } from 'chai'
import 'mocha'
import { PassThrough, Readable } from 'node:stream'
import { Controller, TsoaRoute } from '@tsoa-next/runtime'
import { AdditionalProps } from '../../../packages/runtime/src/routeGeneration/additionalProps'
import { ExpressTemplateService } from '../../../packages/runtime/src/routeGeneration/templates/express/expressTemplateService'
import { HapiTemplateService } from '../../../packages/runtime/src/routeGeneration/templates/hapi/hapiTemplateService'
import { KoaTemplateService } from '../../../packages/runtime/src/routeGeneration/templates/koa/koaTemplateService'

const config: AdditionalProps = {
  noImplicitAdditionalProperties: 'ignore',
  bodyCoercion: true,
}

const asParam = (param: TsoaRoute.ParameterSchema) => param
const createThrownError = (message: string, properties: Record<string, unknown>) => Object.assign(new Error(message), properties)

describe('Template services', () => {
  describe('ExpressTemplateService', () => {
    it('dispatches controller actions and forwards headers, statuses, and thrown errors', async () => {
      const service = new ExpressTemplateService({}, config)
      const mutableService = service as unknown as { returnHandler: (params: unknown) => void }
      const returnCalls: unknown[] = []

      mutableService.returnHandler = params => {
        returnCalls.push(params)
      }

      class SuccessController extends Controller {
        public submit(input: string) {
          this.setHeader('x-template', 'express')
          this.setStatus(201)
          return { input }
        }
      }

      const nextErrors: unknown[] = []
      await service.apiHandler({
        methodName: 'submit',
        controller: new SuccessController(),
        response: {} as never,
        next: error => {
          nextErrors.push(error)
        },
        validatedArgs: ['payload'],
        successStatus: 200,
      })

      expect(returnCalls).to.have.lengthOf(1)
      expect(returnCalls[0]).to.deep.include({
        statusCode: 201,
        data: { input: 'payload' },
      })
      expect(returnCalls[0]).to.have.property('headers').that.deep.equals({ 'x-template': 'express' })
      expect(nextErrors).to.deep.equal([])

      class FailingController {
        public submit() {
          throw new Error('express failure')
        }
      }

      await service.apiHandler({
        methodName: 'submit',
        controller: new FailingController(),
        response: {} as never,
        next: error => {
          nextErrors.push(error)
        },
        validatedArgs: [],
      })

      expect(nextErrors).to.have.lengthOf(1)
      expect((nextErrors[0] as Error).message).to.equal('express failure')
    })

    it('maps request arguments, files, and responder callbacks through validation', () => {
      const service = new ExpressTemplateService({}, config)
      const mutableService = service as unknown as {
        validationService: { ValidateParam: (...args: any[]) => unknown }
        returnHandler: (params: unknown) => void
      }
      const validationCalls: Array<{ name: string; value: unknown; parent?: string; parameterIndex?: number }> = []
      const responderCalls: unknown[] = []
      const uploadedFile = { originalname: 'avatar.png' }
      const request = {
        currentUser: { id: 7 },
        query: { search: 'books', page: '2' },
        params: { id: '42' },
        headers: {
          'transfer-encoding': 'chunked',
          'x-token': 'secret',
        },
        header(name: string) {
          return this.headers[name.toLowerCase() as keyof typeof this.headers]
        },
        body: {
          title: 'tsoa',
          notes: 'body-field',
        },
        files: {
          upload: [uploadedFile],
        },
      }

      mutableService.validationService = {
        ValidateParam: (...args: any[]) => {
          const [, value, name, , , parent, metadata] = args
          validationCalls.push({ name, value, parent, parameterIndex: metadata?.parameterIndex })
          return value
        },
      }
      mutableService.returnHandler = params => {
        responderCalls.push(params)
      }

      const values = service.getValidatedArgs({
        args: {
          request: asParam({ in: 'request', name: 'request', parameterIndex: 0 }),
          currentUser: asParam({ in: 'request-prop', name: 'currentUser', parameterIndex: 1 }),
          search: asParam({ in: 'query', name: 'search', parameterIndex: 2 }),
          queries: asParam({ in: 'queries', name: 'queries', parameterIndex: 3 }),
          id: asParam({ in: 'path', name: 'id', parameterIndex: 4 }),
          token: asParam({ in: 'header', name: 'x-token', parameterIndex: 5 }),
          payload: asParam({ in: 'body', name: 'payload', parameterIndex: 6 }),
          title: asParam({ in: 'body-prop', name: 'title', parameterIndex: 7 }),
          upload: asParam({ in: 'formData', name: 'upload', dataType: 'file', parameterIndex: 8 }),
          notes: asParam({ in: 'formData', name: 'notes', dataType: 'string', parameterIndex: 9 }),
          responder: asParam({ in: 'res', name: 'responder', parameterIndex: 10 }),
        },
        controllerClass: { name: 'ExpressController' },
        methodName: 'submit',
        request: request as never,
        response: {} as never,
      })

      expect(values[0]).to.equal(request)
      expect(values[1]).to.deep.equal({ id: 7 })
      expect(values[2]).to.equal('books')
      expect(values[3]).to.deep.equal(request.query)
      expect(values[4]).to.equal('42')
      expect(values[5]).to.equal('secret')
      expect(values[6]).to.deep.equal(request.body)
      expect(values[7]).to.equal('tsoa')
      expect(values[8]).to.equal(uploadedFile)
      expect(values[9]).to.equal('body-field')

      const responder = values[10] as (status: number, data: unknown, headers: Record<string, string>) => void
      responder(202, { ok: true }, { 'x-response': 'express' })
      expect(responderCalls).to.have.lengthOf(1)
      expect(responderCalls[0]).to.deep.include({
        statusCode: 202,
        data: { ok: true },
      })

      expect(validationCalls.map(call => [call.name, call.value])).to.deep.include.members([
        ['currentUser', { id: 7 }],
        ['search', 'books'],
        ['queries', request.query],
        ['id', '42'],
        ['x-token', 'secret'],
        ['payload', request.body],
        ['title', 'tsoa'],
        ['upload', uploadedFile],
        ['notes', 'body-field'],
      ])
      expect(validationCalls.find(call => call.name === 'title')?.parent).to.equal('body.')
    })

    it('throws validation errors and handles json, stream, send, end, and headers-sent responses', () => {
      const service = new ExpressTemplateService({}, config)
      const mutableService = service as unknown as {
        validationService: { ValidateParam: (...args: any[]) => unknown }
        returnHandler: (params: unknown) => void
      }

      mutableService.validationService = {
        ValidateParam: (...args: any[]) => {
          const [, , , fieldErrors] = args as [unknown, unknown, unknown, Record<string, { message: string }>]
          fieldErrors.payload = { message: 'invalid payload' }
          return undefined
        },
      }

      try {
        service.getValidatedArgs({
          args: {
            payload: asParam({ in: 'body', name: 'payload', parameterIndex: 0 }),
          },
          request: {
            body: { nope: true },
            headers: { 'transfer-encoding': 'chunked' },
          } as never,
          response: {} as never,
        })
        throw new Error('Expected Express validation to throw.')
      } catch (error) {
        expect(error).to.have.property('name', 'ValidateError')
        expect(error).to.have.property('fields')
      }

      const streamResponse = Object.assign(new PassThrough(), {
        headersSent: false,
        statusCode: undefined as number | undefined,
        get: () => undefined,
        set: () => undefined,
        status(code: number) {
          this.statusCode = code
          return this
        },
      })
      mutableService.returnHandler({
        response: streamResponse,
        headers: {},
        data: Readable.from(['chunk']),
      })
      expect(streamResponse.statusCode).to.equal(200)

      const jsonEvents: Array<{ status?: number; json?: unknown; ended?: boolean; sent?: unknown }> = []
      const jsonResponse = {
        headersSent: false,
        get: () => 'application/json',
        set: () => undefined,
        status(code: number) {
          jsonEvents.push({ status: code })
          return this
        },
        json(data: unknown) {
          jsonEvents.push({ json: data })
          return this
        },
        send(data: unknown) {
          jsonEvents.push({ sent: data })
          return this
        },
        end() {
          jsonEvents.push({ ended: true })
          return this
        },
      }
      mutableService.returnHandler({
        response: jsonResponse,
        headers: { 'x-mode': 'json' },
        statusCode: 202,
        data: null,
      })
      expect(jsonEvents).to.deep.include.members([{ status: 202 }, { json: null }])

      const sendEvents: Array<{ status?: number; sent?: unknown; ended?: boolean }> = []
      const sendResponse = {
        headersSent: false,
        get: () => undefined,
        set: () => undefined,
        status(code: number) {
          sendEvents.push({ status: code })
          return this
        },
        json(_data: unknown) {
          throw new Error('json should not be used for plain text')
        },
        send(data: unknown) {
          sendEvents.push({ sent: data })
          return this
        },
        end() {
          sendEvents.push({ ended: true })
          return this
        },
      }
      mutableService.returnHandler({
        response: sendResponse,
        headers: {},
        statusCode: 201,
        data: 'plain text',
      })
      mutableService.returnHandler({
        response: sendResponse,
        headers: {},
        data: undefined,
      })
      expect(sendEvents).to.deep.include.members([{ status: 201 }, { sent: 'plain text' }, { status: 204 }, { ended: true }])

      let touched = false
      mutableService.returnHandler({
        response: {
          headersSent: true,
          set() {
            touched = true
          },
          get() {
            return undefined
          },
          status() {
            touched = true
            return this
          },
          json() {
            touched = true
            return this
          },
          send() {
            touched = true
            return this
          },
          end() {
            touched = true
            return this
          },
        },
        headers: { ignored: '1' },
        statusCode: 204,
        data: 'ignored',
      })
      expect(touched).to.equal(false)
    })
  })

  describe('HapiTemplateService', () => {
    const createService = (overrides?: Partial<{ boomify(error: Error): unknown; isBoom(error: unknown): boolean }>) =>
      new HapiTemplateService({}, config, {
        boomify: error => ({
          output: {
            statusCode: 0,
            payload: {} as never,
          },
          wrapped: error,
        }),
        isBoom: () => false,
        ...overrides,
      } as never)

    it('dispatches controller actions and converts non-boom failures into boom payloads', async () => {
      const service = createService()
      const mutableService = service as unknown as { returnHandler: (params: unknown) => unknown }
      const returnCalls: unknown[] = []

      mutableService.returnHandler = params => {
        returnCalls.push(params)
        return params
      }

      class SuccessController extends Controller {
        public submit() {
          this.setHeader('x-template', 'hapi')
          this.setStatus(202)
          return 'ok'
        }
      }

      const result = await service.apiHandler({
        methodName: 'submit',
        controller: new SuccessController(),
        h: {} as never,
        validatedArgs: [],
        successStatus: 200,
      })

      expect(returnCalls).to.have.lengthOf(1)
      expect(returnCalls[0]).to.deep.include({ statusCode: 202, data: 'ok' })
      expect(result).to.equal(returnCalls[0])

      const boomError = new Error('already boom')
      class BoomController {
        public submit() {
          throw boomError
        }
      }
      const boomService = new HapiTemplateService({}, config, {
        boomify() {
          throw new Error('boomify should not run for Boom errors')
        },
        isBoom: () => true,
      } as never)
      try {
        await boomService.apiHandler({
          methodName: 'submit',
          controller: new BoomController(),
          h: {} as never,
          validatedArgs: [],
        })
        throw new Error('Expected the Hapi boom error to be rethrown.')
      } catch (error) {
        expect(error).to.equal(boomError)
      }

      class TeaController {
        public submit() {
          throw createThrownError('tea time', { status: 418, name: 'TeaError' })
        }
      }
      try {
        await service.apiHandler({
          methodName: 'submit',
          controller: new TeaController(),
          h: {} as never,
          validatedArgs: [],
        })
        throw new Error('Expected Hapi apiHandler to throw a boomified error.')
      } catch (error) {
        const boomLike = error as {
          output: {
            statusCode: number
            payload: { name: string; message: string }
          }
        }
        expect(boomLike.output.statusCode).to.equal(418)
        expect(boomLike.output.payload).to.deep.include({
          name: 'TeaError',
          message: 'tea time',
        })
      }
    })

    it('maps arguments, aggregates validation errors, and caches Hapi responses', () => {
      const service = createService()
      const mutableService = service as unknown as {
        validationService: { ValidateParam: (...args: any[]) => unknown }
        returnHandler: (params: unknown) => unknown
      }
      const validationCalls: Array<{ name: string; value: unknown; parent?: string }> = []
      const request: any = {
        auth: { credentials: { id: 3 } },
        query: { search: 'books' },
        params: { id: '9' },
        headers: {
          'transfer-encoding': 'chunked',
          token: 'secret',
        },
        payload: {
          title: 'guide',
          note: 'form field',
        },
      }
      const responses: Array<{ data: unknown; statusCode?: number; headers: unknown[] }> = []
      const h: any = {
        response(data?: unknown) {
          const response = {
            data,
            statusCode: undefined as number | undefined,
            headers: [] as unknown[],
            code(code: number) {
              this.statusCode = code
              return this
            },
            header(name: string, value: unknown, options?: unknown) {
              this.headers.push({ name, value, options })
              return this
            },
          }
          responses.push(response)
          return response
        },
      }

      mutableService.validationService = {
        ValidateParam: (...args: any[]) => {
          const [, value, name, , , parent] = args
          validationCalls.push({ name, value, parent })
          return value
        },
      }

      const values = service.getValidatedArgs({
        args: {
          request: asParam({ in: 'request', name: 'request', parameterIndex: 0 }),
          auth: asParam({ in: 'request-prop', name: 'auth', parameterIndex: 1 }),
          search: asParam({ in: 'query', name: 'search', parameterIndex: 2 }),
          queries: asParam({ in: 'queries', name: 'queries', parameterIndex: 3 }),
          id: asParam({ in: 'path', name: 'id', parameterIndex: 4 }),
          token: asParam({ in: 'header', name: 'token', parameterIndex: 5 }),
          payload: asParam({ in: 'body', name: 'payload', parameterIndex: 6 }),
          title: asParam({ in: 'body-prop', name: 'title', parameterIndex: 7 }),
          note: asParam({ in: 'formData', name: 'note', parameterIndex: 8 }),
          responder: asParam({ in: 'res', name: 'responder', parameterIndex: 9 }),
        },
        request: request as never,
        h: h as never,
      })

      expect(values[0]).to.equal(request)
      expect(values[1]).to.deep.equal(request.auth)
      expect(values[6]).to.deep.equal(request.payload)
      expect(values[7]).to.equal('guide')
      expect(values[8]).to.equal('form field')
      expect(validationCalls.find(call => call.name === 'title')?.parent).to.equal('body.')

      const responder = values[9] as (status: number, data: unknown, headers: Record<string, string[] | string>) => void
      responder(207, { ok: true }, { 'set-cookie': ['a=1', 'b=2'], 'x-mode': 'hapi' })
      expect(responses).to.have.lengthOf(1)
      expect(responses[0]).to.deep.include({ data: { ok: true }, statusCode: 207 })
      expect(responses[0].headers).to.deep.include.members([
        { name: 'set-cookie', value: ['a=1', 'b=2'], options: { append: true } },
        { name: 'x-mode', value: 'hapi', options: undefined },
      ])

      const cached = mutableService.returnHandler({
        h,
        headers: { ignored: '1' },
        data: 'ignored',
      })
      expect(cached).to.equal(responses[0])
      expect(responses).to.have.lengthOf(1)

      mutableService.validationService = {
        ValidateParam: (...args: any[]) => {
          const [, , , fieldErrors] = args as [unknown, unknown, unknown, Record<string, { message: string }>]
          fieldErrors.payload = { message: 'invalid payload' }
          return undefined
        },
      }
      try {
        service.getValidatedArgs({
          args: {
            payload: asParam({ in: 'body', name: 'payload', parameterIndex: 0 }),
          },
          request,
          h: {} as never,
        })
        throw new Error('Expected Hapi validation to throw.')
      } catch (error) {
        expect(error).to.have.property('name', 'ValidateError')
        expect(error).to.have.property('fields')
      }
    })
  })

  describe('KoaTemplateService', () => {
    it('dispatches actions, maps Koa request arguments, and handles Koa responses and thrown errors', async () => {
      const service = new KoaTemplateService({}, config)
      const mutableService = service as unknown as {
        validationService: { ValidateParam: (...args: any[]) => unknown }
        returnHandler: (params: unknown) => unknown
      }
      const responseCalls: unknown[] = []

      mutableService.returnHandler = params => {
        responseCalls.push(params)
        return params
      }

      class SuccessController extends Controller {
        public submit() {
          this.setHeader('x-template', 'koa')
          this.setStatus(203)
          return 'koa-ok'
        }
      }

      const apiResult = await service.apiHandler({
        methodName: 'submit',
        controller: new SuccessController(),
        context: {} as never,
        validatedArgs: [],
        successStatus: 200,
      })
      expect(apiResult).to.equal(responseCalls[0])
      expect(responseCalls[0]).to.deep.include({ statusCode: 203, data: 'koa-ok' })

      const validationCalls: Array<{ name: string; value: unknown; parent?: string }> = []
      const nextCalls: string[] = []
      const context: any = {
        params: { id: '55' },
        headerSent: false,
        status: 0,
        body: undefined as unknown,
        request: {
          user: { id: 11 },
          query: { search: 'docs' },
          headers: {
            'transfer-encoding': 'chunked',
            token: 'koa-secret',
          },
          body: {
            title: 'koa-body',
            note: 'body-field',
          },
          files: {
            upload: [{ originalname: 'avatar.png' }],
          },
        },
        response: {
          headerSent: false,
        },
        set(name: string, value: unknown) {
          ;(this as { headers?: Array<{ name: string; value: unknown }> }).headers ||= []
          ;(this as { headers: Array<{ name: string; value: unknown }> }).headers.push({ name, value })
        },
        throw(status: number, message: string, properties?: unknown) {
          throw createThrownError(message, { status, properties })
        },
      }

      mutableService.validationService = {
        ValidateParam: (...args: any[]) => {
          const [, value, name, , , parent] = args
          validationCalls.push({ name, value, parent })
          return value
        },
      }

      const values = service.getValidatedArgs({
        args: {
          request: asParam({ in: 'request', name: 'request', parameterIndex: 0 }),
          user: asParam({ in: 'request-prop', name: 'user', parameterIndex: 1 }),
          search: asParam({ in: 'query', name: 'search', parameterIndex: 2 }),
          queries: asParam({ in: 'queries', name: 'queries', parameterIndex: 3 }),
          id: asParam({ in: 'path', name: 'id', parameterIndex: 4 }),
          token: asParam({ in: 'header', name: 'token', parameterIndex: 5 }),
          payload: asParam({ in: 'body', name: 'payload', parameterIndex: 6 }),
          title: asParam({ in: 'body-prop', name: 'title', parameterIndex: 7 }),
          upload: asParam({ in: 'formData', name: 'upload', dataType: 'file', parameterIndex: 8 }),
          note: asParam({ in: 'formData', name: 'note', dataType: 'string', parameterIndex: 9 }),
          responder: asParam({ in: 'res', name: 'responder', parameterIndex: 10 }),
        },
        context: context as never,
        next: async () => {
          nextCalls.push('next')
        },
      })

      expect(values[0]).to.equal(context.request)
      expect(values[1]).to.deep.equal({ id: 11 })
      expect(values[6]).to.deep.equal(context.request.body)
      expect(values[7]).to.equal('koa-body')
      expect(values[8]).to.deep.equal({ originalname: 'avatar.png' })
      expect(values[9]).to.equal('body-field')
      expect(validationCalls.find(call => call.name === 'upload')?.value).to.deep.equal({ originalname: 'avatar.png' })
      expect(validationCalls.find(call => call.name === 'title')?.parent).to.equal('body.')

      const responder = values[10] as (status: number, data: unknown, headers: Record<string, string>) => Promise<void>
      let responderParams: unknown
      mutableService.returnHandler = params => {
        responderParams = params
        return Promise.resolve()
      }
      await responder(206, { ok: true }, { 'x-mode': 'koa' })
      expect(responderParams).to.deep.include({ statusCode: 206, data: { ok: true } })

      mutableService.returnHandler = params =>
        (KoaTemplateService.prototype as unknown as { returnHandler: (this: KoaTemplateService, params: unknown) => unknown }).returnHandler.call(service, params)

      const returnResult = mutableService.returnHandler({
        context,
        next: async () => {
          nextCalls.push('return-next')
        },
        headers: { 'x-template': 'koa' },
        statusCode: 205,
        data: 'payload',
      })
      expect(returnResult).to.be.an.instanceOf(Promise)
      await returnResult
      expect(context.body).to.equal('payload')
      expect(context.status).to.equal(205)
      expect((context as unknown as { headers?: Array<{ name: string; value: unknown }> }).headers).to.deep.include({
        name: 'x-template',
        value: 'koa',
      })
      expect(nextCalls).to.include('return-next')

      const cachedResult = mutableService.returnHandler({
        context,
        headers: { ignored: '1' },
        data: 'ignored',
      })
      expect(cachedResult).to.equal(undefined)

      class ConflictController {
        public submit() {
          throw createThrownError('conflict', { status: 409, reason: 'duplicate' })
        }
      }
      try {
        await service.apiHandler({
          methodName: 'submit',
          controller: new ConflictController(),
          context: {
            status: 0,
            throw(status: number, message: string, properties?: unknown) {
              throw createThrownError(message, { status, properties })
            },
          } as never,
          validatedArgs: [],
        })
        throw new Error('Expected Koa apiHandler to throw through context.throw.')
      } catch (error) {
        expect(error).to.be.instanceOf(Error)
        expect(error).to.have.property('message', 'conflict')
        expect(error).to.have.property('status', 409)
        expect(error).to.have.property('properties').that.is.instanceOf(Error)
        expect(error).to.have.nested.property('properties.status', 409)
        expect(error).to.have.nested.property('properties.message', 'conflict')
        expect(error).to.have.nested.property('properties.reason', 'duplicate')
      }

      mutableService.validationService = {
        ValidateParam: (...args: any[]) => {
          const [, , , fieldErrors] = args as [unknown, unknown, unknown, Record<string, { message: string }>]
          fieldErrors.payload = { message: 'invalid payload' }
          return undefined
        },
      }
      try {
        service.getValidatedArgs({
          args: {
            payload: asParam({ in: 'body', name: 'payload', parameterIndex: 0 }),
          },
          context,
          next: async () => undefined,
        })
        throw new Error('Expected Koa validation to throw.')
      } catch (error) {
        expect(error).to.have.property('name', 'ValidateError')
        expect(error).to.have.property('fields')
      }
    })
  })
})
