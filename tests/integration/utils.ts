import * as request from 'supertest'
import TestAgent = require('supertest/lib/agent')
import { Agent } from 'http'
import { resolve } from 'path'
import { App } from 'supertest/types'

type VerifyResponse = (err: any, res: request.Response) => any

function parseResponseError(response: { error?: unknown } | undefined): unknown {
  if (typeof response?.error !== 'string') {
    return response?.error
  }

  try {
    return JSON.parse(response.error)
  } catch (error) {
    if (error instanceof SyntaxError) {
      return response.error
    }

    throw error
  }
}

const noopVerifyResponse: VerifyResponse = () => undefined

export function verifyRequest(app: App, verifyResponse: VerifyResponse = noopVerifyResponse, methodOperation: (request: TestAgent<request.Test>) => request.Test, expectedStatus = 200) {
  return new Promise<request.Response>((resolve, reject) => {
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

          const parsedError = parseResponseError(res)

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
            resolve(res)
          } catch (verificationError) {
            reject(verificationError)
          }
        })
    }

    attemptRequest(1)
  })
}

export function verifyGetRequest(app: App, path: string, verifyResponse: VerifyResponse = noopVerifyResponse, expectedStatus?: number) {
  return verifyRequest(app, verifyResponse, request => request.get(path), expectedStatus)
}

export function verifyPostRequest(app: App, path: string, data: any, verifyResponse: VerifyResponse = noopVerifyResponse, expectedStatus?: number) {
  return verifyRequest(app, verifyResponse, request => request.post(path).send(data), expectedStatus)
}

export function verifyFileUploadRequest(app: App, path: string, formData: any, verifyResponse: VerifyResponse = noopVerifyResponse, expectedStatus?: number) {
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
