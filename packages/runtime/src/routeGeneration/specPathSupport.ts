import { createHash } from 'node:crypto'
import { readFile } from 'node:fs/promises'
import { createRequire } from 'node:module'
import { dirname, join } from 'node:path'
import { Readable } from 'node:stream'
import { BuiltinSpecPathTarget, SpecCacheContext, SpecCacheHandler, SpecGenerator, SpecPathDefinition, SpecRequestContext, SpecResponseValue, SpecRuntime } from '../decorators/specPath'
import { Config, SpecConfig } from '../config'
import { Swagger } from '../swagger/swagger'

export interface RuntimeSpecConfigSnapshot {
  compilerOptions?: Record<string, unknown>
  defaultNumberType?: Config['defaultNumberType']
  ignore?: string[]
  spec: SpecConfig & {
    entryFile: Config['entryFile']
    controllerPathGlobs?: Config['controllerPathGlobs']
    noImplicitAdditionalProperties: Exclude<Config['noImplicitAdditionalProperties'], undefined>
  }
}

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

const memoryCache = new Map<string, string>()
const assetCache = new Map<string, Promise<string>>()

function isReadableStream(value: unknown): value is Readable {
  return value instanceof Readable || (typeof value === 'object' && value !== null && 'pipe' in value && typeof (value as Readable).pipe === 'function')
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

function getCacheHandler(cache: SpecPathDefinition['cache']): SpecCacheHandler | undefined {
  if (cache === 'none') {
    return undefined
  }

  if (cache === 'memory') {
    return {
      get(context) {
        return memoryCache.get(context.cacheKey)
      },
      set(context, value) {
        memoryCache.set(context.cacheKey, value)
      },
    }
  }

  return cache
}

function getCacheKey({ fullPath, runtime, specPath }: Pick<SpecContextArgs, 'fullPath' | 'runtime' | 'specPath'>) {
  const format = typeof specPath.target === 'string' ? specPath.target : 'custom'
  const cacheInput = JSON.stringify({
    cache: specPath.cache === 'none' ? 'none' : specPath.cache === 'memory' ? 'memory' : 'custom',
    fullPath,
    format,
    runtime,
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

async function readResponseValue(value: SpecResponseValue): Promise<string> {
  if (!isReadableStream(value)) {
    return value
  }

  const chunks: Uint8Array[] = []
  for await (const chunk of value as AsyncIterable<unknown>) {
    if (typeof chunk === 'string') {
      chunks.push(Buffer.from(chunk))
    } else if (chunk instanceof Uint8Array) {
      chunks.push(chunk)
    } else {
      chunks.push(Buffer.from(String(chunk)))
    }
  }

  return Buffer.concat(chunks).toString('utf8')
}

function serializeSpecForHtml(spec: Swagger.Spec) {
  return JSON.stringify(spec).replaceAll('<', '\\u003c').replaceAll('>', '\\u003e').replaceAll('&', '\\u0026')
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
  const packageName = runtime === 'express' ? 'swagger-ui-express' : runtime === 'koa' ? 'swagger-ui-koa' : 'hapi-swagger'

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

export async function resolveSpecPathResponse(args: SpecContextArgs): Promise<ResolvedSpecResponse> {
  const context = createSpecRequestContext(args)
  const cacheHandler = getCacheHandler(args.specPath.cache)
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
