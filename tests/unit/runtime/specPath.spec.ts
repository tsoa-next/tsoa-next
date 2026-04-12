import { expect } from 'chai'
import 'mocha'
import { Readable } from 'node:stream'
import { fetchSpecPaths, SpecCacheHandler, SpecPath } from '../../../packages/runtime/src/decorators/specPath'
import { resolveSpecPathResponse } from '../../../packages/runtime/src/routeGeneration/specPathSupport'
import { Swagger } from '../../../packages/runtime/src/swagger/swagger'

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

describe('SpecPath', () => {
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
})

function isReadable(value: unknown): value is Readable {
  return value instanceof Readable
}
