import { expect } from 'chai'
import 'mocha'
import express = require('express')
import { verifyRequest } from './utils'

describe('integration utils', () => {
  it('rejects with the original request error when supertest finishes without a response', async () => {
    const app = express()
    const originalError = new Error('socket hang up')
    let attempts = 0

    const fakeRequest = {
      expect(expectedStatus: number) {
        expect(expectedStatus).to.equal(200)
        return this
      },
      end(callback: (err: Error, res: undefined) => void) {
        attempts += 1
        callback(originalError, undefined)
      },
    }

    try {
      await verifyRequest(
        app,
        () => {
          throw new Error('verifyResponse should not run when no response is available')
        },
        () => fakeRequest as any,
      )
      throw new Error('Expected verifyRequest to reject')
    } catch (error) {
      expect(attempts).to.equal(2)
      expect(error).to.equal(originalError)
    }
  })
})
