import { Readable } from 'node:stream'
import { Swagger } from '../swagger/swagger'
import { normalisePath } from '../utils/pathUtils'

export type SpecRuntime = 'express' | 'koa' | 'hapi'
export type BuiltinSpecPathTarget = 'json' | 'yaml' | 'swagger' | 'redoc' | 'rapidoc'
export type SpecDocumentFormat = 'json' | 'yaml'
export type SpecResponseValue = string | Readable

export interface SpecGenerator {
  getSpecObject(): Promise<Swagger.Spec>
  getSpecString(format: SpecDocumentFormat): Promise<string>
}

export interface SpecCacheContext {
  cacheKey: string
  controllerClass: object
  fullPath: string
  path: string
  runtime: SpecRuntime
  target: BuiltinSpecPathTarget | 'custom'
  format?: SpecDocumentFormat | 'html'
}

export interface SpecRequestContext extends SpecCacheContext {
  request?: unknown
  response?: unknown
  getSpecObject(): Promise<Swagger.Spec>
  getSpecString(format: SpecDocumentFormat): Promise<string>
}

export type SpecResponseHandler = (context: SpecRequestContext) => SpecResponseValue | Promise<SpecResponseValue>

export interface SpecCacheHandler {
  get(context: SpecCacheContext): SpecResponseValue | Promise<SpecResponseValue | undefined> | undefined
  set(context: SpecCacheContext, value: string): void | Promise<void>
}

export type SpecPathTarget = BuiltinSpecPathTarget | SpecResponseHandler
export type SpecPathCache = 'none' | 'memory' | SpecCacheHandler

export interface SpecPathDefinition {
  path: string
  normalizedPath: string
  target: SpecPathTarget
  cache: SpecPathCache
}

const SPEC_PATHS_SYMBOL = Symbol.for('@tsoa-next/spec-paths')

function isBuiltinSpecTarget(target: SpecPathTarget): target is BuiltinSpecPathTarget {
  return typeof target === 'string'
}

function getTargetDescription(target: SpecPathTarget) {
  return isBuiltinSpecTarget(target) ? target : 'custom handler'
}

function getCacheDescription(cache: SpecPathCache) {
  return typeof cache === 'string' ? cache : 'custom cache'
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

export function SpecPath(path = 'spec', target: SpecPathTarget = 'json', cache: SpecPathCache = 'memory'): ClassDecorator {
  return classTarget => {
    const normalizedPath = normalizeSpecPath(path)
    const existing = getExistingSpecPaths(classTarget)

    if (existing.some(specPath => specPath.normalizedPath === normalizedPath)) {
      const className = typeof classTarget === 'function' && classTarget.name ? classTarget.name : 'anonymous controller'
      throw new Error(`Duplicate @SpecPath('${path}') found on '${className}'. Multiple SpecPath decorators must resolve to unique paths.`)
    }

    existing.push({
      cache,
      normalizedPath,
      path,
      target,
    })

    defineSpecPaths(classTarget, existing)
  }
}

export function fetchSpecPaths(target: object): readonly SpecPathDefinition[] {
  return getExistingSpecPaths(target)
}

export function describeSpecPath(specPath: SpecPathDefinition) {
  return {
    cache: getCacheDescription(specPath.cache),
    path: specPath.path,
    target: getTargetDescription(specPath.target),
  }
}
