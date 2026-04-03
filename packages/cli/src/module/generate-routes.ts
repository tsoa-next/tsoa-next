import * as ts from 'typescript'
import type { ExtendedRoutesConfig, RouteGeneratorModule } from '../api'
import { MetadataGenerator } from '../metadataGeneration/metadataGenerator'
import { Config as BaseConfig, Tsoa } from '@tsoa-next/runtime'
import { DefaultRouteGenerator } from '../routeGeneration/defaultRouteGenerator'
import { fsMkDir } from '../utils/fs'
import * as path from 'node:path'

export async function generateRoutes<Config extends ExtendedRoutesConfig>(
  routesConfig: Config,
  compilerOptions?: ts.CompilerOptions,
  ignorePaths?: string[],
  /**
   * pass in cached metadata returned in a previous step to speed things up
   */
  metadata?: Tsoa.Metadata,
  defaultNumberType?: BaseConfig['defaultNumberType'],
) {
  metadata ??= new MetadataGenerator(routesConfig.entryFile, compilerOptions, ignorePaths, routesConfig.controllerPathGlobs, routesConfig.rootSecurity, defaultNumberType).Generate()

  const routeGenerator = await getRouteGenerator(metadata, routesConfig)

  await fsMkDir(routesConfig.routesDir, { recursive: true })
  await routeGenerator.GenerateCustomRoutes()

  if (routesConfig.multerOpts) {
    console.warn(
      'Config MulterOptions is deprecated since v6.4.0 instroduces RegisterRoutes can pass multerOptions,' +
        'we will quickly remove this options soon at future version.' +
        '(https://github.com/lukeautry/tsoa/issues/1587#issuecomment-2391291433)' +
        '(https://github.com/lukeautry/tsoa/pull/1638)',
    )
  }

  return metadata
}

async function getRouteGenerator<Config extends ExtendedRoutesConfig>(metadata: Tsoa.Metadata, routesConfig: Config) {
  // default route generator for express/koa/hapi
  // custom route generator
  const routeGenerator = routesConfig.routeGenerator
  if (routeGenerator !== undefined) {
    if (typeof routeGenerator === 'string') {
      try {
        // try as a module import
        const module = (await import(routeGenerator)) as RouteGeneratorModule<Config>
        return new module.default(metadata, routesConfig)
      } catch (moduleImportError) {
        // try to find a relative import path
        const relativePath = path.relative(__dirname, routeGenerator)
        try {
          const module = (await import(relativePath)) as RouteGeneratorModule<Config>
          return new module.default(metadata, routesConfig)
        } catch (relativeImportError) {
          throw new AggregateError([moduleImportError, relativeImportError], `Failed to load route generator '${routeGenerator}' as a module import or relative path.`)
        }
      }
    }

    return new routeGenerator(metadata, routesConfig)
  }

  if (routesConfig.middleware === undefined && routesConfig.middlewareTemplate === undefined) {
    routesConfig.middleware = 'express'
  }

  return new DefaultRouteGenerator(metadata, routesConfig)
}
