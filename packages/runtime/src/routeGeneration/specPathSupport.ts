import { createHash } from 'node:crypto'
import { readFile } from 'node:fs/promises'
import { createRequire } from 'node:module'
import { dirname, join } from 'node:path'
import { Readable } from 'node:stream'
import { BuiltinSpecPathTarget, SpecCacheContext, SpecCacheHandler, SpecGenerator, SpecPathDefinition, SpecRequestContext, SpecResponseValue, SpecRuntime } from '../decorators/specPath'
import { Config, SpecConfig } from '../config'
import type { Tsoa } from '../metadataGeneration/tsoa'
import { Swagger } from '../swagger/swagger'

/** Snapshot of spec-generation settings embedded into generated routes for {@link SpecPath}. */
export interface RuntimeSpecConfigSnapshot {
  compilerOptions?: Record<string, unknown>
  defaultNumberType?: Config['defaultNumberType']
  ignore?: string[]
  metadata?: Tsoa.Metadata
  spec: SpecConfig & {
    entryFile: Config['entryFile']
    controllerPathGlobs?: Config['controllerPathGlobs']
    noImplicitAdditionalProperties: Exclude<Config['noImplicitAdditionalProperties'], undefined>
  }
}

/** Fully resolved response body and content type returned by spec-path helpers. */
export interface ResolvedSpecResponse {
  body: SpecResponseValue
  contentType?: string
}

type SpecContextArgs = {
  controllerClass: object
  fullPath: string
  request?: unknown
  response?: unknown
  runtime: SpecRuntime
  specGenerator: SpecGenerator
  specPath: SpecPathDefinition
}

type UiAssetBundle = {
  script: string
  style?: string
  preset?: string
}

const memoryCache = new WeakMap<SpecGenerator, Map<string, string>>()
const assetCache = new Map<string, Promise<string>>()
const controllerCacheScopes = new WeakMap<object, string>()
const specGeneratorCacheScopes = new WeakMap<SpecGenerator, string>()
let controllerCacheScopeId = 0
let specGeneratorCacheScopeId = 0

function isAsyncIterable(value: unknown): value is AsyncIterable<unknown> {
  return value != null && typeof (value as AsyncIterable<unknown>)[Symbol.asyncIterator] === 'function'
}

function isReadableStream(value: unknown): value is Readable | NodeJS.ReadableStream | AsyncIterable<unknown> {
  return (
    isAsyncIterable(value) ||
    value instanceof Readable ||
    (typeof value === 'object' &&
      value !== null &&
      'pipe' in value &&
      typeof (value as NodeJS.ReadableStream).pipe === 'function' &&
      'on' in value &&
      typeof (value as NodeJS.ReadableStream).on === 'function')
  )
}

function getMemoryCache(specGenerator: SpecGenerator) {
  const cached = memoryCache.get(specGenerator)
  if (cached) {
    return cached
  }

  const created = new Map<string, string>()
  memoryCache.set(specGenerator, created)
  return created
}

function getControllerCacheScope(controllerClass: object) {
  const cached = controllerCacheScopes.get(controllerClass)
  if (cached) {
    return cached
  }

  const created = `controller:${controllerCacheScopeId++}`
  controllerCacheScopes.set(controllerClass, created)
  return created
}

function getSpecGeneratorCacheScope(specGenerator: SpecGenerator) {
  const cached = specGeneratorCacheScopes.get(specGenerator)
  if (cached) {
    return cached
  }

  const created = `spec-generator:${specGeneratorCacheScopeId++}`
  specGeneratorCacheScopes.set(specGenerator, created)
  return created
}

function getContentType(target: BuiltinSpecPathTarget): string {
  switch (target) {
    case 'json':
      return 'application/json; charset=utf-8'
    case 'yaml':
      return 'application/yaml; charset=utf-8'
    default:
      return 'text/html; charset=utf-8'
  }
}

function getFormat(target: BuiltinSpecPathTarget | 'custom'): SpecCacheContext['format'] {
  switch (target) {
    case 'json':
      return 'json'
    case 'yaml':
      return 'yaml'
    case 'swagger':
    case 'redoc':
    case 'rapidoc':
      return 'html'
    default:
      return undefined
  }
}

function getCacheHandler({ specGenerator, specPath }: Pick<SpecContextArgs, 'specGenerator' | 'specPath'>): SpecCacheHandler | undefined {
  const { cache } = specPath
  if (cache === 'none') {
    return undefined
  }

  if (cache === 'memory') {
    const scopedMemoryCache = getMemoryCache(specGenerator)
    return {
      get(context) {
        return scopedMemoryCache.get(context.cacheKey)
      },
      set(context, value) {
        scopedMemoryCache.set(context.cacheKey, value)
      },
    }
  }

  return cache
}

function getCacheKey({ controllerClass, fullPath, runtime, specGenerator, specPath }: Pick<SpecContextArgs, 'controllerClass' | 'fullPath' | 'runtime' | 'specGenerator' | 'specPath'>) {
  const format = typeof specPath.target === 'string' ? specPath.target : 'custom'
  let cacheMode: 'none' | 'memory' | 'custom'
  if (specPath.cache === 'none') {
    cacheMode = 'none'
  } else if (specPath.cache === 'memory') {
    cacheMode = 'memory'
  } else {
    cacheMode = 'custom'
  }

  const cacheInput = JSON.stringify({
    cache: cacheMode,
    controller: getControllerCacheScope(controllerClass),
    fullPath,
    format,
    runtime,
    specGenerator: getSpecGeneratorCacheScope(specGenerator),
  })

  return createHash('sha256').update(cacheInput).digest('hex')
}

function createSpecRequestContext(args: SpecContextArgs): SpecRequestContext {
  const target = typeof args.specPath.target === 'string' ? args.specPath.target : 'custom'
  const cacheContext: SpecCacheContext = {
    cacheKey: getCacheKey(args),
    controllerClass: args.controllerClass,
    format: getFormat(target),
    fullPath: args.fullPath,
    path: args.specPath.path,
    runtime: args.runtime,
    target,
  }

  return {
    ...cacheContext,
    getSpecObject: () => args.specGenerator.getSpecObject(),
    getSpecString: format => args.specGenerator.getSpecString(format),
    request: args.request,
    response: args.response,
  }
}

function createSpecPathNotFoundError() {
  const error = new Error('Not Found') as Error & { status: number }
  error.status = 404
  return error
}

async function isSpecPathAllowed(specPath: SpecPathDefinition, context: SpecRequestContext) {
  if (specPath.gate === undefined || specPath.gate === true) {
    return true
  }

  if (specPath.gate === false) {
    return false
  }

  return specPath.gate(context)
}

async function readResponseValue(value: SpecResponseValue): Promise<string> {
  if (!isReadableStream(value)) {
    return value
  }

  if (isAsyncIterable(value)) {
    const chunks: Uint8Array[] = []
    for await (const chunk of value) {
      chunks.push(toResponseChunkBuffer(chunk))
    }

    return Buffer.concat(chunks).toString('utf8')
  }

  return readReadableStreamFromEvents(value)
}

function toResponseChunkBuffer(chunk: unknown): Uint8Array {
  if (typeof chunk === 'string') {
    return Buffer.from(chunk)
  }

  if (chunk instanceof Uint8Array) {
    return chunk
  }

  return Buffer.from(String(chunk))
}

function readReadableStreamFromEvents(value: NodeJS.ReadableStream): Promise<string> {
  return new Promise((resolve, reject) => {
    const chunks: Uint8Array[] = []

    value.on('data', (chunk: unknown) => {
      chunks.push(toResponseChunkBuffer(chunk))
    })
    value.once('end', () => {
      resolve(Buffer.concat(chunks).toString('utf8'))
    })
    value.once('error', reject)
  })
}

function serializeSpecForHtml(spec: Swagger.Spec) {
  return JSON.stringify(spec)
    .replaceAll('<', String.raw`\u003c`)
    .replaceAll('>', String.raw`\u003e`)
    .replaceAll('&', String.raw`\u0026`)
}

function escapeHtmlText(value: string) {
  return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
}

async function readPeerFile(packageName: string, candidates: string[]): Promise<string> {
  const cacheKey = `${packageName}:${candidates.join('|')}`
  const cached = assetCache.get(cacheKey)
  if (cached) {
    return cached
  }

  const loadPromise = (async () => {
    let packageJsonPath: string

    try {
      packageJsonPath = require.resolve(`${packageName}/package.json`)
    } catch {
      throw new Error(`SpecPath target requires optional peer dependency '${packageName}'. Install it to serve this documentation target.`)
    }

    const packageRoot = dirname(packageJsonPath)
    for (const candidate of candidates) {
      try {
        return await readFile(join(packageRoot, candidate), 'utf8')
      } catch {
        continue
      }
    }

    throw new Error(`Unable to locate runtime asset for optional peer dependency '${packageName}'. Checked: ${candidates.join(', ')}`)
  })()

  assetCache.set(cacheKey, loadPromise)
  return loadPromise
}

async function readSwaggerDistAsset(runtime: SpecRuntime, assetName: 'swagger-ui-bundle.js' | 'swagger-ui-standalone-preset.js' | 'swagger-ui.css') {
  let packageName: 'swagger-ui-express' | 'swagger-ui-koa' | 'hapi-swagger'
  if (runtime === 'express') {
    packageName = 'swagger-ui-express'
  } else if (runtime === 'koa') {
    packageName = 'swagger-ui-koa'
  } else {
    packageName = 'hapi-swagger'
  }

  let packageJsonPath: string
  try {
    packageJsonPath = require.resolve(`${packageName}/package.json`)
  } catch {
    throw new Error(`SpecPath target 'swagger' requires optional peer dependency '${packageName}' for the '${runtime}' runtime.`)
  }

  const directPackageRoot = dirname(packageJsonPath)
  const directCandidates = runtime === 'koa' ? [join('static', assetName)] : []
  for (const candidate of directCandidates) {
    try {
      return await readFile(join(directPackageRoot, candidate), 'utf8')
    } catch {
      continue
    }
  }

  const requireFromPackage = createRequire(packageJsonPath)
  let swaggerUiDistPackagePath: string
  try {
    swaggerUiDistPackagePath = requireFromPackage.resolve('swagger-ui-dist/package.json')
  } catch {
    throw new Error(`SpecPath target 'swagger' requires '${packageName}' to provide 'swagger-ui-dist'. Install or re-install '${packageName}'.`)
  }

  return readFile(join(dirname(swaggerUiDistPackagePath), assetName), 'utf8')
}

async function loadSwaggerAssets(runtime: SpecRuntime): Promise<UiAssetBundle> {
  const [script, preset, style] = await Promise.all([
    readSwaggerDistAsset(runtime, 'swagger-ui-bundle.js'),
    readSwaggerDistAsset(runtime, 'swagger-ui-standalone-preset.js'),
    readSwaggerDistAsset(runtime, 'swagger-ui.css'),
  ])

  return { preset, script, style }
}

async function loadRedocAssets(): Promise<UiAssetBundle> {
  return {
    script: await readPeerFile('redoc', ['bundles/redoc.standalone.js']),
  }
}

async function loadRapiDocAssets(): Promise<UiAssetBundle> {
  return {
    script: await readPeerFile('rapidoc', ['dist/rapidoc-min.js']),
  }
}

async function renderSwaggerHtml(spec: Swagger.Spec, runtime: SpecRuntime): Promise<string> {
  const assets = await loadSwaggerAssets(runtime)
  const title = escapeHtmlText(spec.info.title || 'API documentation')
  const serializedSpec = serializeSpecForHtml(spec)

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${title}</title>
    <style>
      html { box-sizing: border-box; overflow-y: scroll; }
      *, *:before, *:after { box-sizing: inherit; }
      body { margin: 0; background: #fafafa; }
      ${assets.style ?? ''}
    </style>
  </head>
  <body>
    <div id="swagger-ui"></div>
    <script>${assets.script}</script>
    <script>${assets.preset ?? ''}</script>
    <script>
      window.ui = SwaggerUIBundle({
        spec: ${serializedSpec},
        dom_id: '#swagger-ui',
        deepLinking: true,
        presets: [SwaggerUIBundle.presets.apis, SwaggerUIStandalonePreset],
        layout: 'BaseLayout'
      });
    </script>
  </body>
</html>`
}

async function renderRedocHtml(spec: Swagger.Spec): Promise<string> {
  const assets = await loadRedocAssets()
  const title = escapeHtmlText(spec.info.title || 'API documentation')
  const serializedSpec = serializeSpecForHtml(spec)

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${title}</title>
    <style>
      body { margin: 0; padding: 0; }
    </style>
  </head>
  <body>
    <div id="redoc-container"></div>
    <script>${assets.script}</script>
    <script>
      Redoc.init(${serializedSpec}, {}, document.getElementById('redoc-container'));
    </script>
  </body>
</html>`
}

async function renderRapiDocHtml(spec: Swagger.Spec): Promise<string> {
  const assets = await loadRapiDocAssets()
  const title = escapeHtmlText(spec.info.title || 'API documentation')
  const serializedSpec = serializeSpecForHtml(spec)

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${title}</title>
    <style>
      body { margin: 0; padding: 0; }
      rapi-doc { width: 100vw; height: 100vh; display: block; }
    </style>
  </head>
  <body>
    <rapi-doc id="rapidoc" render-style="read" show-header="false"></rapi-doc>
    <script>${assets.script}</script>
    <script>
      document.getElementById('rapidoc').loadSpec(${serializedSpec});
    </script>
  </body>
</html>`
}

async function buildBuiltinResponse(target: BuiltinSpecPathTarget, context: SpecRequestContext): Promise<ResolvedSpecResponse> {
  switch (target) {
    case 'json':
      return {
        body: await context.getSpecString('json'),
        contentType: getContentType(target),
      }
    case 'yaml':
      return {
        body: await context.getSpecString('yaml'),
        contentType: getContentType(target),
      }
    case 'swagger':
      return {
        body: await renderSwaggerHtml(await context.getSpecObject(), context.runtime),
        contentType: getContentType(target),
      }
    case 'redoc':
      return {
        body: await renderRedocHtml(await context.getSpecObject()),
        contentType: getContentType(target),
      }
    case 'rapidoc':
      return {
        body: await renderRapiDocHtml(await context.getSpecObject()),
        contentType: getContentType(target),
      }
  }
}

async function resolveHandlerResponse(specPath: SpecPathDefinition, context: SpecRequestContext): Promise<ResolvedSpecResponse> {
  if (typeof specPath.target === 'string') {
    return buildBuiltinResponse(specPath.target, context)
  }

  const body = await specPath.target(context)
  return { body }
}

/**
 * Resolves a declared {@link SpecPath} target into a concrete response body, applying built-in rendering and caching behavior.
 */
export async function resolveSpecPathResponse(args: SpecContextArgs): Promise<ResolvedSpecResponse> {
  const context = createSpecRequestContext(args)
  if (!(await isSpecPathAllowed(args.specPath, context))) {
    throw createSpecPathNotFoundError()
  }

  const cacheHandler = getCacheHandler(args)
  if (cacheHandler) {
    const cached = await cacheHandler.get(context)
    if (cached !== undefined) {
      return {
        body: cached,
        contentType: typeof args.specPath.target === 'string' ? getContentType(args.specPath.target) : undefined,
      }
    }
  }

  const resolved = await resolveHandlerResponse(args.specPath, context)
  if (!cacheHandler) {
    return resolved
  }

  if (typeof resolved.body === 'string') {
    await cacheHandler.set(context, resolved.body)
    return resolved
  }

  const serialized = await readResponseValue(resolved.body)
  await cacheHandler.set(context, serialized)
  return { ...resolved, body: serialized }
}
