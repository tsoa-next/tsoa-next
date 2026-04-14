import { expect } from 'chai'
import 'mocha'
import { EventEmitter } from 'node:events'
import { Readable } from 'node:stream'
import { fetchSpecPaths, SpecCacheHandler, SpecPath } from '../../../packages/runtime/src/decorators/specPath'
import { resolveSpecPathResponse } from '../../../packages/runtime/src/routeGeneration/specPathSupport'
import { Swagger } from '../../../packages/runtime/src/swagger/swagger'
import { cleanupMockUiPeers, installMockUiPeers } from '../../utils/mockUiPeers'

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
  before(() => {
    installMockUiPeers()
  })

  after(() => {
    cleanupMockUiPeers()
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

  it('supports the options-object signature', () => {
    const gate = async () => true

    @SpecPath('docs', { target: 'yaml', cache: 'none', gate })
    class OptionsSpecPathController {}

    expect(fetchSpecPaths(OptionsSpecPathController)).to.deep.equal([
      {
        cache: 'none',
        gate,
        normalizedPath: '/docs',
        path: 'docs',
        target: 'yaml',
      },
    ])
  })

  it('treats an empty options object as default spec-path options', () => {
    @SpecPath('docs', {})
    class EmptyOptionsSpecPathController {}

    expect(fetchSpecPaths(EmptyOptionsSpecPathController)).to.deep.equal([
      {
        cache: 'memory',
        normalizedPath: '/docs',
        path: 'docs',
        target: 'json',
      },
    ])
  })

  it('rejects unsupported object shapes for the options-object signature', () => {
    expect(() => {
      @SpecPath('docs', { get: () => undefined } as unknown as never)
      class InvalidOptionsSpecPathController {}

      return InvalidOptionsSpecPathController
    }).to.throw("supported keys are 'target', 'cache', and 'gate'")
  })

  it('rejects mixing the options-object signature with the legacy cache argument', () => {
    expect(() => {
      @SpecPath('docs', { target: 'yaml' }, 'none')
      class MixedSpecPathController {}

      return MixedSpecPathController
    }).to.throw('do not combine the options-object signature with the legacy third cache argument')
  })

  it('rejects mixing the options-object signature with an explicit default cache argument', () => {
    expect(() => {
      @SpecPath('docs', { target: 'yaml' }, 'memory')
      class MixedDefaultCacheSpecPathController {}

      return MixedDefaultCacheSpecPathController
    }).to.throw('do not combine the options-object signature with the legacy third cache argument')
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

  it('rejects gated spec requests before consulting caches or handlers', async () => {
    let cacheReads = 0
    let gateReads = 0
    let handlerCalls = 0

    const cache: SpecCacheHandler = {
      get: () => {
        cacheReads += 1
        return 'cached secret'
      },
      set: () => undefined,
    }

    const handler = async () => {
      handlerCalls += 1
      return 'secret spec'
    }

    @SpecPath('gated', {
      cache,
      gate: async () => {
        gateReads += 1
        return false
      },
      target: handler,
    })
    class GatedSpecPathController {}

    const [specPath] = fetchSpecPaths(GatedSpecPathController)
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

    try {
      await resolveSpecPathResponse({
        controllerClass: GatedSpecPathController,
        fullPath: '/v1/spec/gated',
        runtime: 'express',
        specGenerator,
        specPath,
      })
      throw new Error('Expected resolveSpecPathResponse to reject gated requests.')
    } catch (error) {
      expect((error as { status?: number }).status).to.equal(404)
    }

    expect(gateReads).to.equal(1)
    expect(cacheReads).to.equal(0)
    expect(handlerCalls).to.equal(0)
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

  it('buffers stream-like custom responses that are not async iterable before caching', async () => {
    let handlerCalls = 0
    let cacheWrites = 0
    let stored: string | undefined

    const cache: SpecCacheHandler = {
      get: () => stored,
      set: (_context, value) => {
        cacheWrites += 1
        stored = value
      },
    }

    const handler = async () => {
      handlerCalls += 1
      const stream = new EventEmitter() as NodeJS.ReadableStream
      Object.assign(stream, {
        pipe() {
          return stream
        },
      })

      setImmediate(() => {
        stream.emit('data', 'stream-like response')
        stream.emit('end')
      })

      return stream as unknown as Readable
    }

    @SpecPath('stream-like', handler, cache)
    class StreamLikeSpecPathController {}

    const [specPath] = fetchSpecPaths(StreamLikeSpecPathController)
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
      controllerClass: StreamLikeSpecPathController,
      fullPath: '/v1/spec/stream-like',
      runtime: 'express',
      specGenerator,
      specPath,
    })

    expect(first.body).to.equal('stream-like response')
    expect(handlerCalls).to.equal(1)
    expect(cacheWrites).to.equal(1)
  })

  it('isolates memory cache entries per spec generator', async () => {
    @SpecPath('isolated-memory')
    class IsolatedMemorySpecPathController {}

    const [specPath] = fetchSpecPaths(IsolatedMemorySpecPathController)
    if (!specPath) {
      throw new Error('Expected @SpecPath metadata to be defined.')
    }

    const createSpecGenerator = (title: string) => ({
      async getSpecObject() {
        return {
          ...spec,
          info: {
            title,
          },
        }
      },
      async getSpecString() {
        return JSON.stringify({
          ...spec,
          info: {
            title,
          },
        })
      },
    })

    const first = await resolveSpecPathResponse({
      controllerClass: IsolatedMemorySpecPathController,
      fullPath: '/v1/spec/isolated-memory',
      runtime: 'express',
      specGenerator: createSpecGenerator('first'),
      specPath,
    })
    const second = await resolveSpecPathResponse({
      controllerClass: IsolatedMemorySpecPathController,
      fullPath: '/v1/spec/isolated-memory',
      runtime: 'express',
      specGenerator: createSpecGenerator('second'),
      specPath,
    })

    expect(first.body).to.equal(JSON.stringify({ ...spec, info: { title: 'first' } }))
    expect(second.body).to.equal(JSON.stringify({ ...spec, info: { title: 'second' } }))
  })

  it('escapes spec titles before embedding UI HTML', async () => {
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
