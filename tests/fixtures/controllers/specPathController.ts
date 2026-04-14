import { Readable } from 'node:stream'
import { Controller, Get, SpecCacheHandler, SpecPath, SpecRequestContext, Route } from 'tsoa-next'

export const specPathState = {
  customCacheGets: 0,
  customCacheSets: 0,
  customStreamCalls: 0,
  customStringCalls: 0,
}

const cachedStreamPayloads = new Map<string, string>()

export function resetSpecPathState() {
  specPathState.customCacheGets = 0
  specPathState.customCacheSets = 0
  specPathState.customStreamCalls = 0
  specPathState.customStringCalls = 0
  cachedStreamPayloads.clear()
}

async function customStringHandler(context: SpecRequestContext) {
  specPathState.customStringCalls += 1
  const spec = await context.getSpecObject()
  return `custom:${spec.info.title}`
}

async function customStreamHandler() {
  specPathState.customStreamCalls += 1
  return Readable.from(['streamed custom spec'])
}

function allowSpecPathWhenHeaderPresent(context: SpecRequestContext) {
  const headers = (context.request as { headers?: Record<string, string | string[] | undefined> } | undefined)?.headers
  return headers?.['x-allow-spec'] === 'true'
}

const streamCacheHandler: SpecCacheHandler = {
  get(context) {
    specPathState.customCacheGets += 1
    const cached = cachedStreamPayloads.get(context.cacheKey)
    return cached ? Readable.from([cached]) : undefined
  },
  set(context, value) {
    specPathState.customCacheSets += 1
    cachedStreamPayloads.set(context.cacheKey, value)
  },
}

@Route('SpecPath')
@SpecPath()
@SpecPath('yaml', { target: 'yaml' })
@SpecPath('custom-string', { target: customStringHandler, cache: 'memory' })
@SpecPath('custom-stream', { target: customStreamHandler, cache: 'none' })
@SpecPath('custom-cached-stream', { target: customStreamHandler, cache: streamCacheHandler })
@SpecPath('swagger-ui', { target: 'swagger' })
@SpecPath('redoc-ui', { target: 'redoc' })
@SpecPath('rapidoc-ui', { target: 'rapidoc' })
@SpecPath('gated', { gate: allowSpecPathWhenHeaderPresent })
@SpecPath('disabled', { gate: false })
export class SpecPathController extends Controller {
  @Get()
  public async getControllerStatus() {
    return {
      ok: true,
    }
  }
}
