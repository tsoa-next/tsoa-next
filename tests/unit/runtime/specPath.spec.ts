import { expect } from 'chai'
import 'mocha'
import { existsSync, mkdirSync, rmSync, writeFileSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { Readable } from 'node:stream'
import { fetchSpecPaths, SpecCacheHandler, SpecPath } from '../../../packages/runtime/src/decorators/specPath'
import { resolveSpecPathResponse } from '../../../packages/runtime/src/routeGeneration/specPathSupport'
import { Swagger } from '../../../packages/runtime/src/swagger/swagger'

const repoRoot = resolve(__dirname, '..', '..', '..')
const nodeModulesRoot = join(repoRoot, 'packages', 'runtime', 'node_modules')
const createdPackageRoots: string[] = []

const readStream = async (stream: Readable) => {
  const chunks: Buffer[] = []
  for await (const chunk of stream) {
    chunks.push(Buffer.from(chunk))
  }

  return Buffer.concat(chunks).toString('utf8')
}

const spec: Swagger.Spec2 = {
  info: {
    title: 'SpecPath Test API',
  },
  swagger: '2.0',
  paths: {},
}

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

  if (!existsSync(join(nodeModulesRoot, 'redoc'))) {
    ensurePackageFile('redoc', 'package.json', JSON.stringify({ name: 'redoc', version: '0.0.0' }))
    ensurePackageFile('redoc', 'bundles/redoc.standalone.js', 'window.Redoc = { init: function () {} };')
  }

  if (!existsSync(join(nodeModulesRoot, 'rapidoc'))) {
    ensurePackageFile('rapidoc', 'package.json', JSON.stringify({ name: 'rapidoc', version: '0.0.0' }))
    ensurePackageFile('rapidoc', 'dist/rapidoc-min.js', 'window.customElements = window.customElements || { define: function () {} };')
  }
}

describe('SpecPath', () => {
  after(() => {
    createdPackageRoots.forEach(packageRoot => {
      rmSync(packageRoot, { force: true, recursive: true })
    })
  })

  it('stores default decorator values', () => {
    @SpecPath()
    class DefaultSpecPathController {}

    expect(fetchSpecPaths(DefaultSpecPathController)).to.deep.equal([
      {
        cache: 'memory',
        normalizedPath: '/spec',
        path: 'spec',
        target: 'json',
      },
    ])
  })

  it('accumulates multiple decorators on the same controller', () => {
    @SpecPath()
    @SpecPath('yaml', 'yaml', 'none')
    class MultipleSpecPathController {}

    const specPaths = fetchSpecPaths(MultipleSpecPathController).map(specPath => ({
      cache: specPath.cache,
      normalizedPath: specPath.normalizedPath,
      path: specPath.path,
      target: typeof specPath.target === 'string' ? specPath.target : 'custom',
    }))

    expect(specPaths).to.deep.equal([
      {
        cache: 'none',
        normalizedPath: '/yaml',
        path: 'yaml',
        target: 'yaml',
      },
      {
        cache: 'memory',
        normalizedPath: '/spec',
        path: 'spec',
        target: 'json',
      },
    ])
  })

  it('rejects duplicate normalized paths on the same controller', () => {
    expect(() => {
      @SpecPath('spec')
      @SpecPath('/spec/')
      class DuplicateSpecPathController {}

      return DuplicateSpecPathController
    }).to.throw("Duplicate @SpecPath('spec') found")
  })

  it('preserves custom handler and cache references', () => {
    const handler = async () => 'custom response'
    const cache: SpecCacheHandler = {
      get: () => undefined,
      set: () => undefined,
    }

    @SpecPath('custom', handler, cache)
    class CustomSpecPathController {}

    const [specPath] = fetchSpecPaths(CustomSpecPathController)
    expect(specPath?.target).to.equal(handler)
    expect(specPath?.cache).to.equal(cache)
  })

  it('caches built-in spec strings in memory', async () => {
    let jsonReads = 0

    @SpecPath('json-memory')
    class MemorySpecPathController {}

    const [specPath] = fetchSpecPaths(MemorySpecPathController)
    if (!specPath) {
      throw new Error('Expected @SpecPath metadata to be defined.')
    }

    const specGenerator = {
      async getSpecObject() {
        return spec
      },
      async getSpecString(format: 'json' | 'yaml') {
        if (format === 'json') {
          jsonReads += 1
          return JSON.stringify(spec)
        }

        return 'swagger: "2.0"'
      },
    }

    const first = await resolveSpecPathResponse({
      controllerClass: MemorySpecPathController,
      fullPath: '/v1/spec/json-memory',
      runtime: 'express',
      specGenerator,
      specPath,
    })
    const second = await resolveSpecPathResponse({
      controllerClass: MemorySpecPathController,
      fullPath: '/v1/spec/json-memory',
      runtime: 'express',
      specGenerator,
      specPath,
    })

    expect(first.contentType).to.equal('application/json; charset=utf-8')
    expect(first.body).to.equal(JSON.stringify(spec))
    expect(second.body).to.equal(JSON.stringify(spec))
    expect(jsonReads).to.equal(1)
  })

  it('buffers streamed custom responses before caching and can read streams back from custom cache handlers', async () => {
    let handlerCalls = 0
    let cacheReads = 0
    let cacheWrites = 0
    let stored: string | undefined

    const cache: SpecCacheHandler = {
      get: () => {
        cacheReads += 1
        return stored ? Readable.from([stored]) : undefined
      },
      set: (_context, value) => {
        cacheWrites += 1
        stored = value
      },
    }

    const handler = async () => {
      handlerCalls += 1
      return Readable.from(['streamed custom response'])
    }

    @SpecPath('custom-stream', handler, cache)
    class CachedStreamSpecPathController {}

    const [specPath] = fetchSpecPaths(CachedStreamSpecPathController)
    if (!specPath) {
      throw new Error('Expected @SpecPath metadata to be defined.')
    }

    const specGenerator = {
      async getSpecObject() {
        return spec
      },
      async getSpecString() {
        return JSON.stringify(spec)
      },
    }

    const first = await resolveSpecPathResponse({
      controllerClass: CachedStreamSpecPathController,
      fullPath: '/v1/spec/custom-stream',
      runtime: 'express',
      specGenerator,
      specPath,
    })
    const second = await resolveSpecPathResponse({
      controllerClass: CachedStreamSpecPathController,
      fullPath: '/v1/spec/custom-stream',
      runtime: 'express',
      specGenerator,
      specPath,
    })

    expect(first.body).to.equal('streamed custom response')
    expect(isReadable(second.body)).to.equal(true)
    if (!isReadable(second.body)) {
      throw new Error('Expected cached response body to be a readable stream.')
    }

    expect(await readStream(second.body)).to.equal('streamed custom response')
    expect(handlerCalls).to.equal(1)
    expect(cacheReads).to.equal(2)
    expect(cacheWrites).to.equal(1)
  })

  it('escapes spec titles before embedding UI HTML', async () => {
    createMockUiPeers()

    const htmlInjectionSpec: Swagger.Spec2 = {
      ...spec,
      info: {
        title: '</title><script>window.specPathInjected = true</script>',
      },
    }

    const specGenerator = {
      async getSpecObject() {
        return htmlInjectionSpec
      },
      async getSpecString() {
        return JSON.stringify(htmlInjectionSpec)
      },
    }

    for (const target of ['swagger', 'redoc', 'rapidoc'] as const) {
      @SpecPath(`escaped-${target}`, target, 'none')
      class EscapedTitleController {}

      const [specPath] = fetchSpecPaths(EscapedTitleController)
      if (!specPath) {
        throw new Error(`Expected @SpecPath metadata for ${target}.`)
      }

      const response = await resolveSpecPathResponse({
        controllerClass: EscapedTitleController,
        fullPath: `/v1/spec/${target}`,
        runtime: 'express',
        specGenerator,
        specPath,
      })

      expect(response.body).to.be.a('string')
      if (typeof response.body !== 'string') {
        throw new Error(`Expected HTML response for ${target}.`)
      }

      expect(response.body).to.contain('&lt;/title&gt;&lt;script&gt;window.specPathInjected = true&lt;/script&gt;')
      expect(response.body).not.to.contain('</title><script>window.specPathInjected = true</script>')
    }
  })
})

function isReadable(value: unknown): value is Readable {
  return value instanceof Readable
}
