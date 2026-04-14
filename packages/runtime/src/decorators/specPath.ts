import { Readable } from 'node:stream'
import { Swagger } from '../swagger/swagger'
import { normalisePath } from '../utils/pathUtils'

/** Supported runtimes for built-in {@link SpecPath} targets. */
export type SpecRuntime = 'express' | 'koa' | 'hapi'
/** Built-in documentation targets supported by {@link SpecPath}. */
export type BuiltinSpecPathTarget = 'json' | 'yaml' | 'swagger' | 'redoc' | 'rapidoc'
/** Serialized OpenAPI formats that can be requested from a {@link SpecGenerator}. */
export type SpecDocumentFormat = 'json' | 'yaml'
/** Response body types accepted from built-in and custom {@link SpecPath} handlers. */
export type SpecResponseValue = string | Readable

/** Describes the runtime contract needed to rebuild an OpenAPI document on demand. */
export interface SpecGenerator {
  getSpecObject(): Promise<Swagger.Spec>
  getSpecString(format: SpecDocumentFormat): Promise<string>
}

/** Context passed to spec-response caches. */
export interface SpecCacheContext {
  cacheKey: string
  controllerClass: object
  fullPath: string
  path: string
  runtime: SpecRuntime
  target: BuiltinSpecPathTarget | 'custom'
  format?: SpecDocumentFormat | 'html'
}

/** Request-scoped context passed to custom {@link SpecPath} handlers. */
export interface SpecRequestContext extends SpecCacheContext {
  request?: unknown
  response?: unknown
  getSpecObject(): Promise<Swagger.Spec>
  getSpecString(format: SpecDocumentFormat): Promise<string>
}

/** Custom handler used by {@link SpecPath} to serve spec content. */
export type SpecResponseHandler = (context: SpecRequestContext) => SpecResponseValue | Promise<SpecResponseValue>
/** Gate handler used by {@link SpecPath} to decide whether a request may receive the spec response. */
export type SpecPathGateHandler = (context: SpecRequestContext) => boolean | Promise<boolean>

/** Cache adapter used by {@link SpecPath} to memoize generated responses. */
export interface SpecCacheHandler {
  get(context: SpecCacheContext): SpecResponseValue | Promise<SpecResponseValue | undefined> | undefined
  set(context: SpecCacheContext, value: string): void | Promise<void>
}

/** Route target supported by {@link SpecPath}. */
export type SpecPathTarget = BuiltinSpecPathTarget | SpecResponseHandler
/** Cache strategy supported by {@link SpecPath}. */
export type SpecPathCache = 'none' | 'memory' | SpecCacheHandler
/** Gate strategy supported by {@link SpecPath}. */
export type SpecPathGate = boolean | SpecPathGateHandler

/** Options supported by {@link SpecPath}. */
export interface SpecPathOptions {
  cache?: SpecPathCache
  gate?: SpecPathGate
  target?: SpecPathTarget
}

/** Stored definition for a single declared {@link SpecPath}. */
export interface SpecPathDefinition {
  cache: SpecPathCache
  gate?: SpecPathGate
  normalizedPath: string
  path: string
  target: SpecPathTarget
}

const SPEC_PATHS_SYMBOL = Symbol.for('@tsoa-next/spec-paths')
const hasOwn = Object.hasOwn as (value: object, key: PropertyKey) => boolean

function isBuiltinSpecTarget(target: SpecPathTarget): target is BuiltinSpecPathTarget {
  return typeof target === 'string'
}

function getTargetDescription(target: SpecPathTarget) {
  return isBuiltinSpecTarget(target) ? target : 'custom handler'
}

function getCacheDescription(cache: SpecPathCache) {
  return typeof cache === 'string' ? cache : 'custom cache'
}

function isSpecPathOptions(value: SpecPathTarget | SpecPathOptions | undefined): value is SpecPathOptions {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    return false
  }

  return hasOwn(value, 'cache') || hasOwn(value, 'gate') || hasOwn(value, 'target')
}

function getExistingSpecPaths(target: object): SpecPathDefinition[] {
  const existing = Reflect.get(target, SPEC_PATHS_SYMBOL) as SpecPathDefinition[] | undefined
  return existing ? [...existing] : []
}

function defineSpecPaths(target: object, specPaths: SpecPathDefinition[]) {
  Reflect.defineProperty(target, SPEC_PATHS_SYMBOL, {
    configurable: true,
    enumerable: false,
    value: specPaths,
    writable: true,
  })
}

function normalizeSpecPath(path: string | undefined) {
  return normalisePath(path ?? 'spec', '/')
}

function resolveSpecPathOptions(targetOrOptions: SpecPathTarget | SpecPathOptions | undefined, cache: SpecPathCache): Pick<SpecPathDefinition, 'cache' | 'gate' | 'target'> {
  if (isSpecPathOptions(targetOrOptions)) {
    if (cache !== 'memory') {
      throw new Error('Invalid @SpecPath usage: do not combine the options-object signature with the legacy third cache argument.')
    }

    return {
      cache: targetOrOptions.cache ?? 'memory',
      gate: targetOrOptions.gate,
      target: targetOrOptions.target ?? 'json',
    }
  }

  return {
    cache,
    target: targetOrOptions ?? 'json',
  }
}

/**
 * Registers a controller-local route that serves the generated OpenAPI document or a custom derived response.
 *
 * @param path The relative route path. Defaults to `spec`.
 * @param optionsOrTarget Either a `SpecPathOptions` object or the legacy target argument.
 * @param cache Legacy cache strategy argument. Defaults to in-memory caching.
 */
export function SpecPath(path = 'spec', optionsOrTarget: SpecPathTarget | SpecPathOptions = 'json', cache: SpecPathCache = 'memory'): ClassDecorator {
  return classTarget => {
    const resolvedOptions = resolveSpecPathOptions(optionsOrTarget, cache)
    const normalizedPath = normalizeSpecPath(path)
    const existing = getExistingSpecPaths(classTarget)

    if (existing.some(specPath => specPath.normalizedPath === normalizedPath)) {
      const className = typeof classTarget === 'function' && classTarget.name ? classTarget.name : 'anonymous controller'
      throw new Error(`Duplicate @SpecPath('${path}') found on '${className}'. Multiple SpecPath decorators must resolve to unique paths.`)
    }

    const specPath: SpecPathDefinition = {
      cache: resolvedOptions.cache,
      normalizedPath,
      path,
      target: resolvedOptions.target,
    }
    if (resolvedOptions.gate !== undefined) {
      specPath.gate = resolvedOptions.gate
    }

    existing.push(specPath)

    defineSpecPaths(classTarget, existing)
  }
}

/** Returns the spec-path definitions declared on a controller. */
export function fetchSpecPaths(target: object): readonly SpecPathDefinition[] {
  return getExistingSpecPaths(target)
}

/** Produces a human-readable summary of a spec-path definition for logging and diagnostics. */
export function describeSpecPath(specPath: SpecPathDefinition) {
  return {
    cache: getCacheDescription(specPath.cache),
    path: specPath.path,
    target: getTargetDescription(specPath.target),
  }
}
