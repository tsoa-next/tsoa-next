import { expect } from 'chai'
import { existsSync, mkdirSync, rmSync, writeFileSync } from 'node:fs'
import { join, resolve } from 'node:path'
import 'mocha'
import { verifyGetRequest } from './utils'

type ExpressSpecPathFixture = typeof import('../fixtures/express-specpath/server')
type KoaSpecPathFixture = typeof import('../fixtures/koa-specpath/server')
type HapiSpecPathFixture = typeof import('../fixtures/hapi-specpath/server')
type ControllerFixture = typeof import('../fixtures/controllers/specPathController')

const repoRoot = resolve(__dirname, '..', '..')
const nodeModulesRoot = join(repoRoot, 'packages', 'runtime', 'node_modules')
const createdPackageRoots: string[] = []

let expressFixture: ExpressSpecPathFixture
let koaFixture: KoaSpecPathFixture
let hapiFixture: HapiSpecPathFixture
let controllerFixture: ControllerFixture

function ensurePackageFile(packageName: string, relativePath: string, contents: string) {
  const packageRoot = join(nodeModulesRoot, packageName)
  if (!existsSync(packageRoot)) {
    createdPackageRoots.push(packageRoot)
  }

  mkdirSync(join(packageRoot, relativePath === 'package.json' ? '' : relativePath.substring(0, relativePath.lastIndexOf('/'))), { recursive: true })
  writeFileSync(join(packageRoot, relativePath), contents, 'utf8')
}

function createMockUiPeers() {
  if (!existsSync(nodeModulesRoot)) {
    mkdirSync(nodeModulesRoot, { recursive: true })
  }

  if (!existsSync(join(nodeModulesRoot, 'swagger-ui-express'))) {
    ensurePackageFile('swagger-ui-express', 'package.json', JSON.stringify({ name: 'swagger-ui-express', version: '0.0.0' }))
    ensurePackageFile('swagger-ui-express', 'node_modules/swagger-ui-dist/package.json', JSON.stringify({ name: 'swagger-ui-dist', version: '0.0.0' }))
    ensurePackageFile(
      'swagger-ui-express',
      'node_modules/swagger-ui-dist/swagger-ui-bundle.js',
      'window.SwaggerUIBundle = window.SwaggerUIBundle || function () {}; window.SwaggerUIBundle.presets = { apis: {} };',
    )
    ensurePackageFile('swagger-ui-express', 'node_modules/swagger-ui-dist/swagger-ui-standalone-preset.js', 'window.SwaggerUIStandalonePreset = {};')
    ensurePackageFile('swagger-ui-express', 'node_modules/swagger-ui-dist/swagger-ui.css', 'body { background: #fff; }')
  }

  if (!existsSync(join(nodeModulesRoot, 'swagger-ui-koa'))) {
    ensurePackageFile('swagger-ui-koa', 'package.json', JSON.stringify({ name: 'swagger-ui-koa', version: '0.0.0' }))
    ensurePackageFile('swagger-ui-koa', 'static/swagger-ui-bundle.js', 'window.SwaggerUIBundle = window.SwaggerUIBundle || function () {}; window.SwaggerUIBundle.presets = { apis: {} };')
    ensurePackageFile('swagger-ui-koa', 'static/swagger-ui-standalone-preset.js', 'window.SwaggerUIStandalonePreset = {};')
    ensurePackageFile('swagger-ui-koa', 'static/swagger-ui.css', 'body { background: #fff; }')
  }

  if (!existsSync(join(nodeModulesRoot, 'hapi-swagger'))) {
    ensurePackageFile('hapi-swagger', 'package.json', JSON.stringify({ name: 'hapi-swagger', version: '0.0.0' }))
    ensurePackageFile('hapi-swagger', 'node_modules/swagger-ui-dist/package.json', JSON.stringify({ name: 'swagger-ui-dist', version: '0.0.0' }))
    ensurePackageFile(
      'hapi-swagger',
      'node_modules/swagger-ui-dist/swagger-ui-bundle.js',
      'window.SwaggerUIBundle = window.SwaggerUIBundle || function () {}; window.SwaggerUIBundle.presets = { apis: {} };',
    )
    ensurePackageFile('hapi-swagger', 'node_modules/swagger-ui-dist/swagger-ui-standalone-preset.js', 'window.SwaggerUIStandalonePreset = {};')
    ensurePackageFile('hapi-swagger', 'node_modules/swagger-ui-dist/swagger-ui.css', 'body { background: #fff; }')
  }

  if (!existsSync(join(nodeModulesRoot, 'redoc'))) {
    ensurePackageFile('redoc', 'package.json', JSON.stringify({ name: 'redoc', version: '0.0.0' }))
    ensurePackageFile('redoc', 'bundles/redoc.standalone.js', 'window.Redoc = { init: function () {} };')
  }

  if (!existsSync(join(nodeModulesRoot, 'rapidoc'))) {
    ensurePackageFile('rapidoc', 'package.json', JSON.stringify({ name: 'rapidoc', version: '0.0.0' }))
    ensurePackageFile('rapidoc', 'dist/rapidoc-min.js', 'window.customElements = window.customElements || { define: function () {} };')
  }
}

describe('SpecPath integration', () => {
  before(() => {
    createMockUiPeers()
    controllerFixture = require('../fixtures/controllers/specPathController') as ControllerFixture
    expressFixture = require('../fixtures/express-specpath/server') as ExpressSpecPathFixture
    koaFixture = require('../fixtures/koa-specpath/server') as KoaSpecPathFixture
    hapiFixture = require('../fixtures/hapi-specpath/server') as HapiSpecPathFixture
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

    await hapiFixture.server.stop()

    createdPackageRoots.forEach(packageRoot => {
      rmSync(packageRoot, { force: true, recursive: true })
    })
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
})
