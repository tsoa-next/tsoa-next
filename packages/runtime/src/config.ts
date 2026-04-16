import { Options as MulterOpts } from 'multer'
import { Swagger } from './swagger/swagger'

/** Root tsoa-next configuration consumed by the CLI and programmatic generators. */
export interface Config {
  /**
   * OpenAPI generation configuration.
   */
  spec: SpecConfig

  /**
   * Route generation configuration.
   */
  routes: RoutesConfig

  /**
   * Directories to ignore during TypeScript metadata scan
   */
  ignore?: string[]

  /**
   * The entry point to your API
   */
  entryFile: string

  /**
   * An array of path globs that point to your route controllers that you would like to have tsoa include.
   */
  controllerPathGlobs?: string[]

  /**
   * Modes that allow you to prevent input data from entering into your API. This will document your decision in the swagger.yaml and it will turn on excess-property validation (at runtime) in your routes.
   */
  noImplicitAdditionalProperties?: 'throw-on-extras' | 'silently-remove-extras' | 'ignore'

  /**
   * Path to a tsconfig file used as an input source for compiler options during generation.
   * If omitted, tsoa-next will look for tsconfig.json starting from the loaded tsoa config directory.
   * Explicit compilerOptions in tsoa-next config still take precedence over tsconfig values.
   */
  tsconfig?: string

  /**
   * TypeScript CompilerOptions to be used during generation.
   * These are merged over compiler options resolved from tsconfig.
   */
  compilerOptions?: Record<string, unknown>

  /**
   * Legacy multer options forwarded into generated middleware.
   * The `storage` option is not supported.
   *
   * @example {
   *   "dest": "/tmp"
   * } Allows multer to write files to disk instead of keeping them in memory.
   * @deprecated
   *  Since v6.4.0, `RegisterRoutes` can receive `multerOptions` directly.
   *  This config-level option will be removed in a future release.
   *  (https://github.com/tsoa-next/tsoa-next/issues/1587#issuecomment-2391291433)
   *  (https://github.com/tsoa-next/tsoa-next/pull/1638)
   */
  multerOpts?: MulterOpts

  /**
   * OpenAPI number type to use for TypeScript `number` when no narrower annotation is present.
   * @default double
   */
  defaultNumberType?: 'double' | 'float' | 'integer' | 'long'
}

/**
 * Legacy boolean form of `noImplicitAdditionalProperties`.
 *
 * @deprecated Use the explicit string options instead.
 */
export type DeprecatedOptionForAdditionalPropertiesHandling = true | false

/** OpenAPI generation settings. */
export interface SpecConfig {
  /**
   * Directory where the generated spec file should be written.
   */
  outputDirectory: string

  /**
   * API host name for Swagger 2 output, for example `localhost:3000`.
   */
  host?: string

  /**
   * Server URLs for OpenAPI 3 output.
   *
   * Only available with spec version 3 or 3.1.
   */
  servers?: string[]

  /**
   * Base-name of swagger.json or swagger.yaml.
   *
   * @default: "swagger"
   */
  specFileBaseName?: string

  /** API version number; defaults to the package version. */
  version?: string

  /**
   * Major OpenAPI version to generate; defaults to version 2 when not specified
   * Possible values:
   *  - 2: generates OpenAPI version 2.
   *  - 3: generates OpenAPI version 3.
   *  - 3.1: generates OpenAPI version 3.1.
   */
  specVersion?: Swagger.SupportedSpecMajorVersion

  /**
   * API name; defaults to npm package name
   */
  name?: string

  /**
   * API description; defaults to npm package description
   */
  description?: string

  /**
   * Link to the page that describes the terms of service.
   * Must be in the URL format.
   */
  termsOfService?: string

  /**
   * Contact information for the published API.
   */
  contact?: {
    /**
     * The identifying name of the contact person/organization.
     * @default npm package author
     */
    name?: string

    /**
     * The email address of the contact person/organization.
     * @default npm package author email
     */
    email?: string

    /**
     * URL pointing to the contact information.
     * @default npm package author url
     */
    url?: string
  }

  /**
   * API license; defaults to npm package license when present
   */
  license?: string

  /**
   * Base API path; e.g. the 'v1' in https://myapi.com/v1
   */
  basePath?: string

  /**
   * Controls whether `basePath` is prefixed with `/` when composing OpenAPI 3 server URLs.
   *
   * Only available with spec version 3 or 3.1.
   */
  disableBasePathPrefixSlash?: boolean

  /**
   * Object merged into the generated spec.
   * Generated properties always take precedence over values provided here.
   */
  spec?: unknown

  /**
   * Controls how `spec` is merged into the generated document.
   * Possible values:
   *  - 'immediate' overrides only top-level elements.
   *  - 'recursive' performs a deep merge using `merge`.
   *  - 'deepmerge' performs a deep merge using `ts-deepmerge`, including arrays.
   * @default 'immediate'
   */
  specMerging?: 'immediate' | 'recursive' | 'deepmerge'

  /**
   * Template string for generating operation ids.
   * This should be a valid handlebars template and is provided
   * with the following context:
   *   - 'controllerName' - String name of controller class.
   *   - 'method' - Tsoa.Method object.
   *
   * @default '{{titleCase method.name}}'
   */
  operationIdTemplate?: string

  /**
   * Security schemes declared for the specification.
   */
  securityDefinitions?: {
    [name: string]: Swagger.SecuritySchemes
  }

  /**
   * Top-level tag metadata for the generated specification.
   */
  tags?: Swagger.Tag[]

  /** Writes the generated spec as YAML instead of JSON. */
  yaml?: boolean

  /** Supported protocols for Swagger 2 output. */
  schemes?: Swagger.Protocol[]

  /**
   * Enable x-enum-varnames support
   * @default false
   */
  xEnumVarnames?: boolean

  /**
   * Adds titles to inline response and request-body object schemas to improve client generation.
   */
  useTitleTagsForInlineObjects?: boolean

  /**
   * Applies a default security to the entire API.
   * Can be overridden with `@Security(...)` or `@NoSecurity()` decorators on controllers or methods.
   */
  rootSecurity?: Swagger.Security[]
}

export interface RoutesConfig {
  /**
   * Directory where generated route files are written.
   */
  routesDir: string

  /**
   * Filename for the generated route module.
   */
  routesFileName?: string

  /**
   * Skips writing the route file when the generated content matches the existing file.
   */
  noWriteIfUnchanged?: boolean

  /**
   * Base API path; e.g. the '/v1' in https://myapi.com/v1
   */
  basePath?: string

  /**
   * Middleware provider.
   */
  middleware?: 'express' | 'hapi' | 'koa'

  /**
   * Custom Handlebars template path used instead of the built-in middleware template.
   */
  middlewareTemplate?: string

  /**
   * IoC module path, for example `./inversify/ioc`.
   */
  iocModule?: string

  /**
   * Authentication module path used by generated routes.
   */
  authenticationModule?: string

  /**
   * When enabled, generated route imports use `.js` extensions for ESM output.
   *
   * @default false
   */
  esm?: boolean

  /**
   * Whether to implicitly coerce body parameters into an accepted type.
   *
   * @default true
   */
  bodyCoercion?: boolean

  /**
   * When enabled, generated route imports keep `.ts` extensions to support TypeScript 5.7 `rewriteRelativeImportExtensions`.
   *
   * @default false
   */
  rewriteRelativeImportExtensions?: boolean
}
