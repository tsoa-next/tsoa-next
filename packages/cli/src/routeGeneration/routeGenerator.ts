import * as path from 'node:path'
import type { ExtendedRoutesConfig } from '../api'
import { Tsoa, TsoaRoute } from '@tsoa-next/runtime'
import { buildModels, buildPropertySchema, buildProperty, type RouteSchemaOwner } from './route-schema'
import { buildContext, buildParameterSchema, type RouteContextOwner } from './route-context'
import { convertBracesPathParams } from '../utils/pathUtils'
import { fsExists, fsReadFile } from '../utils/fs'

/**
 * Base implementation for route generators that transform metadata into framework-specific route files.
 */
export abstract class AbstractRouteGenerator<Config extends ExtendedRoutesConfig> {
  constructor(
    protected readonly metadata: Tsoa.Metadata,
    protected readonly options: Config,
  ) {}

  /**
   * Generates the configured route output for the active framework or custom template.
   */
  public abstract GenerateCustomRoutes(): Promise<void>

  /** Builds the runtime model metadata consumed by generated route handlers. */
  public buildModels(): TsoaRoute.Models {
    return buildModels(this as unknown as RouteSchemaOwner)
  }

  protected pathTransformer(path: string): string {
    return convertBracesPathParams(path)
  }

  /** Builds the Handlebars template context used by the default route templates. */
  protected buildContext() {
    return buildContext(this as unknown as RouteContextOwner<Config>)
  }

  protected buildEmbeddedSpecGeneratorArtifacts(useSpecPaths: boolean) {
    if (!useSpecPaths || !this.options.runtimeSpecConfig) {
      return undefined
    }

    const { buildSpec, serializeSpec } = require('../module/generate-spec') as typeof import('../module/generate-spec')
    const spec = buildSpec(
      this.options.runtimeSpecConfig.spec,
      this.options.runtimeSpecConfig.compilerOptions as import('typescript').CompilerOptions | undefined,
      this.options.runtimeSpecConfig.ignore,
      this.metadata,
      this.options.runtimeSpecConfig.defaultNumberType,
    )
    return {
      spec,
      yaml: serializeSpec(spec, true),
    }
  }

  protected getRelativeImportPath(fileLocation: string) {
    const currentExt = path.extname(fileLocation)
    let newExtension = this.options.rewriteRelativeImportExtensions ? currentExt : ''

    if (this.options.esm && !this.options.rewriteRelativeImportExtensions) {
      newExtension = this.getEsmImportExtension(currentExt)
    }

    fileLocation = fileLocation.replace(/\.(ts|mts|cts)$/, '') // no ts extension in import
    return `./${path.relative(this.options.routesDir, fileLocation).replaceAll('\\', '/')}${newExtension}`
  }

  protected buildPropertySchema(source: Tsoa.Property): TsoaRoute.PropertySchema {
    return buildPropertySchema(this as unknown as RouteSchemaOwner, source)
  }

  protected buildParameterSchema(source: Tsoa.Parameter): TsoaRoute.ParameterSchema {
    return buildParameterSchema(this as unknown as RouteSchemaOwner, source)
  }

  protected buildProperty(type: Tsoa.Type): TsoaRoute.PropertySchema {
    return buildProperty(this as unknown as RouteSchemaOwner, type)
  }

  protected async shouldWriteFile(fileName: string, content: string) {
    if (this.options.noWriteIfUnchanged) {
      if (await fsExists(fileName)) {
        const existingContent = (await fsReadFile(fileName)).toString()
        return content !== existingContent
      }
    }
    return true
  }

  private getEsmImportExtension(currentExt: string): '.js' | '.mjs' | '.cjs' {
    switch (currentExt) {
      case '.mts':
        return '.mjs'
      case '.cts':
        return '.cjs'
      default:
        return '.js'
    }
  }
}
