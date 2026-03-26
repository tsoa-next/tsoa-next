import * as request from 'supertest'
import TestAgent = require('supertest/lib/agent')
import { Agent } from 'http'
import { resolve } from 'path'
import { App } from 'supertest/types'

export function verifyRequest(app: App, verifyResponse: (err: any, res: request.Response) => any, methodOperation: (request: TestAgent<request.Test>) => request.Test, expectedStatus = 200) {
  return new Promise<void>((resolve, reject) => {
    const attemptRequest = (remainingRetries: number) => {
      methodOperation(request(app))
        .expect(expectedStatus)
        .end((err: any, res: any) => {
          if (err && !res && remainingRetries > 0) {
            attemptRequest(remainingRetries - 1)
            return
          }

          if (err && !res) {
            reject(err)
            return
          }

          let parsedError: any
          try {
            parsedError = typeof res?.error === 'string' ? JSON.parse(res.error) : res?.error
          } catch (_err) {
            parsedError = res?.error
          }

          try {
            if (err) {
              verifyResponse(err, res)
              reject({
                error: err,
                response: parsedError,
              })
              return
            }

            verifyResponse(parsedError, res)
            resolve()
          } catch (verificationError) {
            reject(verificationError)
          }
        })
    }

    attemptRequest(1)
  })
}

export function verifyGetRequest(app: App, path: string, verifyResponse: (err: any, res: request.Response) => any, expectedStatus?: number) {
  return verifyRequest(app, verifyResponse, request => request.get(path), expectedStatus)
}

export function verifyPostRequest(app: App, path: string, data: any, verifyResponse: (err: any, res: request.Response) => any, expectedStatus?: number) {
  return verifyRequest(app, verifyResponse, request => request.post(path).send(data), expectedStatus)
}

export function verifyFileUploadRequest(
  app: App,
  path: string,
  formData: any,
  verifyResponse: (err: any, res: request.Response) => any = () => {
    /**/
  },
  expectedStatus?: number,
) {
  const agent = new Agent({
    keepAlive: true,
    maxSockets: Infinity,
    timeout: 15000,
  })
  return verifyRequest(
    app,
    verifyResponse,
    request =>
      Object.keys(formData).reduce((req, key) => {
        const values = [].concat(formData[key])
        values.forEach((v: string) => {
          if (v.startsWith('@')) {
            req.attach(key, resolve(__dirname, v.slice(1)))
          } else {
            req.field(key, v)
          }
        })
        req.agent(agent)
        return req
      }, request.post(path)),
    expectedStatus,
  )
}
