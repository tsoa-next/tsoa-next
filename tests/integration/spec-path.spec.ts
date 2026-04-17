import { expect } from 'chai'
import 'mocha'
import { verifyGetRequest, verifyRequest } from './utils'
import { cleanupMockUiPeers, installMockUiPeers } from '../utils/mockUiPeers'

type ExpressSpecPathFixture = typeof import('../fixtures/express-specpath/server')
type ExpressSpecPathPriorityFixture = typeof import('../fixtures/express-specpath-priority/server')
type KoaSpecPathFixture = typeof import('../fixtures/koa-specpath/server')
type KoaSpecPathPriorityFixture = typeof import('../fixtures/koa-specpath-priority/server')
type HapiSpecPathFixture = typeof import('../fixtures/hapi-specpath/server')
type HapiSpecPathPriorityFixture = typeof import('../fixtures/hapi-specpath-priority/server')
type ControllerFixture = typeof import('../fixtures/controllers/specPathController')

let expressFixture: ExpressSpecPathFixture
let expressPriorityFixture: ExpressSpecPathPriorityFixture
let koaFixture: KoaSpecPathFixture
let koaPriorityFixture: KoaSpecPathPriorityFixture
let hapiFixture: HapiSpecPathFixture
let hapiPriorityFixture: HapiSpecPathPriorityFixture
let controllerFixture: ControllerFixture

describe('SpecPath integration', () => {
  before(async () => {
    installMockUiPeers()
    controllerFixture = require('../fixtures/controllers/specPathController') as ControllerFixture
    expressFixture = require('../fixtures/express-specpath/server') as ExpressSpecPathFixture
    expressPriorityFixture = require('../fixtures/express-specpath-priority/server') as ExpressSpecPathPriorityFixture
    koaFixture = require('../fixtures/koa-specpath/server') as KoaSpecPathFixture
    koaPriorityFixture = require('../fixtures/koa-specpath-priority/server') as KoaSpecPathPriorityFixture
    hapiFixture = require('../fixtures/hapi-specpath/server') as HapiSpecPathFixture
    hapiPriorityFixture = require('../fixtures/hapi-specpath-priority/server') as HapiSpecPathPriorityFixture
    await hapiFixture.ready
    await hapiPriorityFixture.ready
  })

  beforeEach(() => {
    controllerFixture.resetSpecPathState()
  })

  after(async () => {
    await new Promise<void>((resolveClose, reject) => {
      koaFixture.server.close(error => {
        if (error) {
          reject(error)
          return
        }
        resolveClose()
      })
    })

    await new Promise<void>((resolveClose, reject) => {
      koaPriorityFixture.server.close(error => {
        if (error) {
          reject(error)
          return
        }
        resolveClose()
      })
    })

    await hapiFixture.server.stop()
    await hapiPriorityFixture.server.stop()
    cleanupMockUiPeers()
  })

  it('serves JSON and YAML specs from Express without local spec files', async () => {
    await verifyGetRequest(expressFixture.app, '/v1/SpecPath/spec', (_err, res) => {
      expect(res.type).to.equal('application/json')
      expect(res.body).to.have.property('openapi', '3.1.0')
      expect(res.body.paths).to.have.property('/SpecPath')
    })

    await verifyGetRequest(expressFixture.app, '/v1/SpecPath/yaml', (_err, res) => {
      expect(res.type).to.equal('application/yaml')
      expect(res.text).to.contain('openapi: 3.1.0')
      expect(res.text).to.contain('/SpecPath:')
    })
  })

  it('caches custom string and custom cached stream handlers', async () => {
    await verifyGetRequest(expressFixture.app, '/v1/SpecPath/custom-string', (_err, res) => {
      expect(res.text).to.equal('custom:Test API')
    })
    await verifyGetRequest(expressFixture.app, '/v1/SpecPath/custom-string', (_err, res) => {
      expect(res.text).to.equal('custom:Test API')
    })
    expect(controllerFixture.specPathState.customStringCalls).to.equal(1)

    controllerFixture.resetSpecPathState()

    await verifyGetRequest(expressFixture.app, '/v1/SpecPath/custom-cached-stream', (_err, res) => {
      expect(res.text).to.equal('streamed custom spec')
    })
    await verifyGetRequest(expressFixture.app, '/v1/SpecPath/custom-cached-stream', (_err, res) => {
      expect(res.text).to.equal('streamed custom spec')
    })

    expect(controllerFixture.specPathState.customStreamCalls).to.equal(1)
    expect(controllerFixture.specPathState.customCacheGets).to.equal(2)
    expect(controllerFixture.specPathState.customCacheSets).to.equal(1)
  })

  it('does not cache custom streamed handlers when cache is none', async () => {
    await verifyGetRequest(expressFixture.app, '/v1/SpecPath/custom-stream', (_err, res) => {
      expect(res.text).to.equal('streamed custom spec')
    })
    await verifyGetRequest(expressFixture.app, '/v1/SpecPath/custom-stream', (_err, res) => {
      expect(res.text).to.equal('streamed custom spec')
    })

    expect(controllerFixture.specPathState.customStreamCalls).to.equal(2)
  })

  it('serves UI HTML targets from Express', async () => {
    await verifyGetRequest(expressFixture.app, '/v1/SpecPath/swagger-ui', (_err, res) => {
      expect(res.type).to.equal('text/html')
      expect(res.text).to.contain('SwaggerUIBundle')
    })

    await verifyGetRequest(expressFixture.app, '/v1/SpecPath/redoc-ui', (_err, res) => {
      expect(res.type).to.equal('text/html')
      expect(res.text).to.contain('Redoc.init')
    })

    await verifyGetRequest(expressFixture.app, '/v1/SpecPath/rapidoc-ui', (_err, res) => {
      expect(res.type).to.equal('text/html')
      expect(res.text).to.contain('loadSpec')
    })
  })

  it('serves spec routes from Koa and Hapi', async () => {
    await verifyGetRequest(koaFixture.server, '/v1/SpecPath/spec', (_err, res) => {
      expect(res.body).to.have.property('openapi', '3.1.0')
    })

    await verifyGetRequest(koaFixture.server, '/v1/SpecPath/swagger-ui', (_err, res) => {
      expect(res.text).to.contain('SwaggerUIBundle')
    })

    await verifyGetRequest(hapiFixture.server.listener, '/v1/SpecPath/spec', (_err, res) => {
      expect(res.body).to.have.property('openapi', '3.1.0')
    })

    await verifyGetRequest(hapiFixture.server.listener, '/v1/SpecPath/swagger-ui', (_err, res) => {
      expect(res.text).to.contain('SwaggerUIBundle')
    })
  })

  it('registers spec routes before dynamic first-segment routes', async () => {
    await verifyGetRequest(expressPriorityFixture.app, '/v1/SpecPath/spec', (_err, res) => {
      expect(res.type).to.equal('application/json')
      expect(res.body).to.have.property('openapi', '3.1.0')
      expect(res.body).not.to.have.property('matched', 'dynamic')
    })

    await verifyGetRequest(koaPriorityFixture.server, '/v1/SpecPath/spec', (_err, res) => {
      expect(res.type).to.equal('application/json')
      expect(res.body).to.have.property('openapi', '3.1.0')
      expect(res.body).not.to.have.property('matched', 'dynamic')
    })

    await verifyGetRequest(hapiPriorityFixture.server.listener, '/v1/SpecPath/spec', (_err, res) => {
      expect(res.type).to.equal('application/json')
      expect(res.body).to.have.property('openapi', '3.1.0')
      expect(res.body).not.to.have.property('matched', 'dynamic')
    })
  })

  it('gates spec responses per request and skips statically disabled spec routes', async () => {
    await verifyRequest(
      expressFixture.app,
      (_err, res) => {
        expect(res.body).to.have.property('openapi', '3.1.0')
      },
      request => request.get('/v1/SpecPath/gated').set('x-allow-spec', 'true'),
    )

    await verifyGetRequest(
      expressFixture.app,
      '/v1/SpecPath/gated',
      (_err, res) => {
        expect(res.body).to.deep.include({
          message: 'Not Found',
          status: 404,
        })
      },
      404,
    )

    await verifyGetRequest(
      expressFixture.app,
      '/v1/SpecPath/disabled',
      (_err, res) => {
        expect(res.type).to.equal('text/html')
        expect(res.text).to.contain('Cannot GET /v1/SpecPath/disabled')
      },
      404,
    )

    await verifyGetRequest(
      koaFixture.server,
      '/v1/SpecPath/gated',
      (_err, res) => {
        expect(res.text).to.equal('Not Found')
      },
      404,
    )

    await verifyRequest(
      koaFixture.server,
      (_err, res) => {
        expect(res.body).to.have.property('openapi', '3.1.0')
      },
      request => request.get('/v1/SpecPath/gated').set('x-allow-spec', 'true'),
    )

    await verifyGetRequest(
      hapiFixture.server.listener,
      '/v1/SpecPath/gated',
      (_err, res) => {
        expect(res.body).to.deep.include({
          error: 'Not Found',
          message: 'Not Found',
          statusCode: 404,
        })
      },
      404,
    )

    await verifyRequest(
      hapiFixture.server.listener,
      (_err, res) => {
        expect(res.body).to.have.property('openapi', '3.1.0')
      },
      request => request.get('/v1/SpecPath/gated').set('x-allow-spec', 'true'),
    )
  })
})
