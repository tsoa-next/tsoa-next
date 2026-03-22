import { expect } from 'chai'
import 'mocha'
import { app } from '../fixtures/express-external-validation/server'
import { verifyPostRequest } from './utils'

const basePath = '/v1/ExternalValidation'

function getErrorBody(err: { text?: string } | undefined, res: { body?: unknown; text?: string }) {
  if (res.body && typeof res.body === 'object' && Object.keys(res.body as Record<string, unknown>).length > 0) {
    return res.body as { fields: Record<string, { message: string }> }
  }

  const rawBody = err?.text || res.text
  if (!rawBody) {
    throw new Error('Expected an error response body.')
  }

  return JSON.parse(rawBody) as { fields: Record<string, { message: string }> }
}

describe('Express Server external validation', () => {
  it('validates zod-decorated bodies through generated routes', () => {
    return verifyPostRequest(
      app,
      `${basePath}/zod`,
      {
        name: 'valid-name',
        status: 'active',
        tags: ['one'],
      },
      (_err, res) => {
        expect(res.body).to.deep.equal({
          name: 'valid-name',
          status: 'active',
          tags: ['one'],
        })
      },
    )
  })

  it('returns translated zod field errors from the external validator', () => {
    return verifyPostRequest(
      app,
      `${basePath}/zod`,
      {
        name: 'xy',
        status: 'active',
        tags: [],
      },
      (err, res) => {
        const body = getErrorBody(err, res)
        expect(body.fields['payload.name'].message).to.equal('translated:validation.external.zod.name.min')
        expect(body.fields['payload.tags'].message).to.equal('translated:validation.external.zod.tags.min')
      },
      400,
    )
  })

  it('validates joi-decorated bodies through generated routes', () => {
    return verifyPostRequest(
      app,
      `${basePath}/joi`,
      {
        name: 'valid-name',
        status: 'active',
        tags: ['one'],
        auditId: -1,
      },
      (err, res) => {
        const body = getErrorBody(err, res)
        expect(body.fields['payload.auditId'].message).to.contain('positive')
      },
      400,
    )
  })

  it('validates yup-decorated bodies through generated routes', () => {
    return verifyPostRequest(
      app,
      `${basePath}/yup`,
      {
        name: 'xy',
        status: 'invalid',
        tags: [],
      },
      (err, res) => {
        const body = getErrorBody(err, res)
        expect(body.fields['payload.name'].message).to.be.a('string')
        expect(body.fields['payload.status'].message).to.be.a('string')
      },
      400,
    )
  })

  it('validates superstruct-decorated bodies through generated routes', () => {
    return verifyPostRequest(
      app,
      `${basePath}/superstruct`,
      {
        name: 12,
        status: 'active',
        tags: [],
        auditId: 1,
      },
      (err, res) => {
        const body = getErrorBody(err, res)
        expect(body.fields['payload.name'].message).to.be.a('string')
        expect(body.fields['payload.tags'].message).to.be.a('string')
      },
      400,
    )
  })

  it('validates io-ts branded codecs through generated routes', () => {
    return verifyPostRequest(
      app,
      `${basePath}/io-ts`,
      {
        amount: -1,
        outcome: 0,
      },
      (err, res) => {
        const body = getErrorBody(err, res)
        expect(body.fields['wager.amount'].message).to.equal('translated:validation.wager.amount.mustBePositiveFloat')
        expect(body.fields['wager.outcome'].message).to.equal('translated:validation.wager.outcome.mustBePositiveInteger')
      },
      400,
    )
  })
})
