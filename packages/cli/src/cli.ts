#!/usr/bin/env node
import YAML from 'yaml'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { Config, RoutesConfig, SpecConfig, Tsoa } from '@tsoa-next/runtime'
import * as ts from 'typescript'
import { MetadataGenerator } from './metadataGeneration/metadataGenerator'
import { generateRoutes } from './module/generate-routes'
import { generateSpec } from './module/generate-spec'
import { fsExists, fsReadFile } from './utils/fs'
import { AbstractRouteGenerator } from './routeGeneration/routeGenerator'
import { dirname, extname, isAbsolute, resolve } from 'node:path'
import type { CompilerOptions } from 'typescript'

const workingDir: string = process.cwd()
const yamlModule = YAML as unknown as { parse(source: string): unknown }

let packageJson: Record<string, unknown> | undefined
const getPackageJsonValue = async (key: string, defaultValue = ''): Promise<string> => {
  if (!packageJson) {
    try {
      const packageJsonRaw = await fsReadFile(`${workingDir}/package.json`)
      const parsedPackageJson: unknown = JSON.parse(packageJsonRaw.toString('utf8'))
      packageJson = typeof parsedPackageJson === 'object' && parsedPackageJson !== null ? (parsedPackageJson as Record<string, unknown>) : {}
    } catch (_) {
      return defaultValue
    }
  }

  const value = packageJson[key]
  return typeof value === 'string' ? value : defaultValue
}

const nameDefault = () => getPackageJsonValue('name', 'TSOA')
const versionDefault = () => getPackageJsonValue('version', '1.0.0')
const descriptionDefault = () => getPackageJsonValue('description', 'Build swagger-compliant REST APIs using TypeScript and Node')
const licenseDefault = () => getPackageJsonValue('license', 'MIT')
const determineNoImplicitAdditionalSetting = (noImplicitAdditionalProperties: Config['noImplicitAdditionalProperties']): Exclude<Config['noImplicitAdditionalProperties'], undefined> => {
  if (noImplicitAdditionalProperties === 'silently-remove-extras' || noImplicitAdditionalProperties === 'throw-on-extras' || noImplicitAdditionalProperties === 'ignore') {
    return noImplicitAdditionalProperties
  } else {
    return 'ignore'
  }
}

type ParsedAuthorContact = {
  name?: string
  email?: string
  url?: string
}

const isAuthorWhitespace = (char: string | undefined): boolean => char === ' ' || char === '\t' || char === '\n' || char === '\r'

const skipAuthorWhitespace = (value: string, index: number): number => {
  let currentIndex = index

  while (currentIndex < value.length && isAuthorWhitespace(value[currentIndex])) {
    currentIndex += 1
  }

  return currentIndex
}

const trimToUndefined = (value: string): string | undefined => {
  const trimmed = value.trim()
  return trimmed.length > 0 ? trimmed : undefined
}

const parseAuthorContact = (author: string): ParsedAuthorContact => {
  const contact: ParsedAuthorContact = {}
  let index = skipAuthorWhitespace(author, 0)
  let nameBoundary = author.length

  const emailStart = author.indexOf('<', index)
  if (emailStart !== -1 && emailStart < nameBoundary) {
    nameBoundary = emailStart
  }

  const urlStart = author.indexOf('(', index)
  if (urlStart !== -1 && urlStart < nameBoundary) {
    nameBoundary = urlStart
  }

  const name = trimToUndefined(author.slice(index, nameBoundary))
  if (name) {
    contact.name = name
  }

  index = skipAuthorWhitespace(author, nameBoundary)

  if (author[index] === '<') {
    const emailEnd = author.indexOf('>', index + 1)

    if (emailEnd !== -1) {
      const email = trimToUndefined(author.slice(index + 1, emailEnd))
      if (email) {
        contact.email = email
      }

      index = skipAuthorWhitespace(author, emailEnd + 1)
    }
  }

  if (author[index] === '(') {
    const urlEnd = author.indexOf(')', index + 1)

    if (urlEnd !== -1) {
      const url = trimToUndefined(author.slice(index + 1, urlEnd))
      if (url) {
        contact.url = url
      }
    }
  }

  return contact
}

const authorInformation: Promise<
  | string
  | {
      name?: string
      email?: string
      url?: string
    }
> = getPackageJsonValue('author', 'unknown')

const isYamlExtension = (extension: string): boolean => extension === '.yaml' || extension === '.yml'

const isJsExtension = (extension: string): boolean => extension === '.js' || extension === '.cjs'

type ConfigWithContext = {
  config: Config
  configBaseDir: string
}

const getConfig = async (configPath = 'tsoa.json'): Promise<ConfigWithContext> => {
  let config: Config
  const ext = extname(configPath)
  const configFullPath = isAbsolute(configPath) ? configPath : `${workingDir}/${configPath}`
  try {
    if (isYamlExtension(ext)) {
      const configRaw = await fsReadFile(configFullPath)
      config = parseConfigValue(yamlModule.parse(configRaw.toString('utf8')))
    } else if (isJsExtension(ext)) {
      const importedConfig: unknown = await import(configFullPath)
      if (typeof importedConfig !== 'object' || importedConfig === null) {
        throw new Error(`Invalid JS config export at '${configPath}'`)
      }
      config = parseConfigModule(importedConfig as Record<string, unknown>)
    } else {
      const configRaw = await fsReadFile(configFullPath)
      config = parseConfigValue(JSON.parse(configRaw.toString('utf8')))
    }
  } catch (err) {
    if (!(err instanceof Error)) {
      console.error(err)
      throw Error(`Unhandled error encountered loading '${configPath}': ${String(err)}`)
    } else if ('code' in err && err.code === 'MODULE_NOT_FOUND') {
      throw Error(`No config file found at '${configPath}'`)
    } else if (err.name === 'SyntaxError') {
      console.error(err)
      const errorType = isJsExtension(ext) ? 'JS' : 'JSON'
      throw Error(`Invalid ${errorType} syntax in config at '${configPath}': ${err.message}`)
    } else {
      console.error(err)
      throw Error(`Unhandled error encountered loading '${configPath}': ${err.message}`)
    }
  }

  return {
    config,
    configBaseDir: dirname(configFullPath),
  }
}

const resolveConfig = async (config?: string | Config): Promise<ConfigWithContext> => {
  if (typeof config === 'object' && config !== null) {
    return {
      config,
      configBaseDir: workingDir,
    }
  }

  return getConfig(config)
}

const formatCompilerOptionsErrors = (context: string, errors: readonly ts.Diagnostic[]) => {
  const message = errors.map(error => ts.flattenDiagnosticMessageText(error.messageText, ts.sys.newLine)).join(ts.sys.newLine)
  throw new Error(`${context}: ${message}`)
}

const parseCompilerOptionsObject = (compilerOptions: Record<string, unknown>, configBaseDir: string, context: string, validateDiagnostics = true): CompilerOptions => {
  const parsed = ts.convertCompilerOptionsFromJson(compilerOptions, configBaseDir)

  if (validateDiagnostics && parsed.errors.length > 0) {
    formatCompilerOptionsErrors(context, parsed.errors)
  }

  return parsed.options
}

const loadTsConfigCompilerOptions = (config: Config, configBaseDir: string): CompilerOptions => {
  const configuredTsconfig = config.tsconfig
  const fileExists = (fileName: string) => ts.sys.fileExists(fileName)
  const readFile = (fileName: string) => ts.sys.readFile(fileName)
  const resolvedTsconfigPath =
    configuredTsconfig !== undefined
      ? isAbsolute(configuredTsconfig)
        ? configuredTsconfig
        : resolve(configBaseDir, configuredTsconfig)
      : ts.findConfigFile(configBaseDir, fileExists, 'tsconfig.json')

  if (!resolvedTsconfigPath) {
    return {}
  }

  const readResult = ts.readConfigFile(resolvedTsconfigPath, readFile)
  if (readResult.error) {
    formatCompilerOptionsErrors(`Failed to read tsconfig at '${resolvedTsconfigPath}'`, [readResult.error])
  }

  const parsed = ts.parseJsonConfigFileContent(readResult.config, ts.sys, dirname(resolvedTsconfigPath), undefined, resolvedTsconfigPath)
  const relevantErrors = parsed.errors.filter(error => error.code !== 18003)
  if (relevantErrors.length > 0) {
    formatCompilerOptionsErrors(`Failed to resolve tsconfig at '${resolvedTsconfigPath}'`, relevantErrors)
  }

  return parsed.options
}

const isConfig = (value: Config | Record<string, unknown> | undefined): value is Config => {
  return typeof value === 'object' && value !== null && ('entryFile' in value || 'routes' in value || 'spec' in value || 'tsconfig' in value)
}

const parseConfigValue = (value: unknown): Config => {
  if (isConfig(value as Record<string, unknown> | undefined)) {
    return value as Config
  }

  throw new Error('Invalid tsoa-next config shape')
}

const parseConfigModule = (moduleExports: Record<string, unknown>): Config => {
  const defaultExport = 'default' in moduleExports ? moduleExports.default : moduleExports
  return parseConfigValue(defaultExport)
}

export function validateCompilerOptions(config: Config, configBaseDir?: string): CompilerOptions
export function validateCompilerOptions(compilerOptions?: Record<string, unknown>, configBaseDir?: string): CompilerOptions
export function validateCompilerOptions(configOrCompilerOptions?: Config | Record<string, unknown>, configBaseDir = workingDir): CompilerOptions {
  if (!isConfig(configOrCompilerOptions)) {
    return configOrCompilerOptions ? parseCompilerOptionsObject(configOrCompilerOptions, configBaseDir, 'Invalid compilerOptions in tsoa-next config', false) : {}
  }

  const tsconfigCompilerOptions = loadTsConfigCompilerOptions(configOrCompilerOptions, configBaseDir)
  const compilerOptionsBaseDir = typeof tsconfigCompilerOptions.configFilePath === 'string' ? dirname(tsconfigCompilerOptions.configFilePath) : configBaseDir
  const explicitCompilerOptions = configOrCompilerOptions.compilerOptions
    ? parseCompilerOptionsObject(configOrCompilerOptions.compilerOptions, compilerOptionsBaseDir, 'Invalid compilerOptions in tsoa-next config')
    : {}

  return {
    ...tsconfigCompilerOptions,
    ...explicitCompilerOptions,
  }
}

export interface ExtendedSpecConfig extends SpecConfig {
  entryFile: Config['entryFile']
  noImplicitAdditionalProperties: Exclude<Config['noImplicitAdditionalProperties'], undefined>
  controllerPathGlobs?: Config['controllerPathGlobs']
}

export const validateSpecConfig = async (config: Config): Promise<ExtendedSpecConfig> => {
  if (!config.spec) {
    throw new Error('Missing spec: configuration must contain spec. Spec used to be called swagger in previous versions of tsoa.')
  }
  if (!config.spec.outputDirectory) {
    throw new Error('Missing outputDirectory: configuration must contain output directory.')
  }
  if (!config.entryFile && (!config.controllerPathGlobs || !config.controllerPathGlobs.length)) {
    throw new Error('Missing entryFile and controllerPathGlobs: Configuration must contain an entry point file or controller path globals.')
  }
  if (!!config.entryFile && !(await fsExists(config.entryFile))) {
    throw new Error(`EntryFile not found: ${config.entryFile} - please check your tsoa config.`)
  }
  config.spec.version = config.spec.version || (await versionDefault())

  config.spec.specVersion = config.spec.specVersion || 2
  const supportedVersions = [2, 3, 3.1]
  if (!supportedVersions.includes(config.spec.specVersion)) {
    throw new Error(`Unsupported Spec version: ${config.spec.specVersion}.`)
  }

  if (config.spec.spec && !['immediate', 'recursive', 'deepmerge', undefined].includes(config.spec.specMerging)) {
    throw new Error(`Invalid specMerging config: ${config.spec.specMerging}`)
  }

  const noImplicitAdditionalProperties = determineNoImplicitAdditionalSetting(config.noImplicitAdditionalProperties)
  config.spec.name = config.spec.name || (await nameDefault())
  config.spec.description = config.spec.description || (await descriptionDefault())
  config.spec.license = config.spec.license || (await licenseDefault())
  config.spec.basePath = config.spec.basePath || '/'
  // defaults to template that may generate non-unique operation ids.
  // @see https://github.com/lukeautry/tsoa/issues/1005
  config.spec.operationIdTemplate = config.spec.operationIdTemplate || '{{titleCase method.name}}'

  if (!config.spec.contact) {
    config.spec.contact = {}
  }

  const specContact = config.spec.contact
  const setContactValue = (key: keyof NonNullable<Config['spec']['contact']>, value: string | undefined) => {
    if (!specContact[key] && value !== undefined) {
      specContact[key] = value
    }
  }

  const author = await authorInformation

  if (typeof author === 'string') {
    const contact = parseAuthorContact(author)

    setContactValue('name', contact.name)
    setContactValue('email', contact.email)
    setContactValue('url', contact.url)
  } else if (typeof author === 'object') {
    setContactValue('name', author?.name)
    setContactValue('email', author?.email)
    setContactValue('url', author?.url)
  }

  if (!config.defaultNumberType) {
    config.defaultNumberType = 'double'
  }

  if (config.spec.rootSecurity) {
    if (!Array.isArray(config.spec.rootSecurity)) {
      throw new Error('spec.rootSecurity must be an array')
    }

    if (config.spec.rootSecurity) {
      const ok = config.spec.rootSecurity.every(security => typeof security === 'object' && security !== null && Object.values(security).every(scope => Array.isArray(scope)))

      if (!ok) {
        throw new Error('spec.rootSecurity must be an array of objects whose keys are security scheme names and values are arrays of scopes')
      }
    }
  }

  return {
    ...config.spec,
    noImplicitAdditionalProperties,
    entryFile: config.entryFile,
    controllerPathGlobs: config.controllerPathGlobs,
  }
}

type RouteGeneratorImpl = new (metadata: Tsoa.Metadata, options: ExtendedRoutesConfig) => AbstractRouteGenerator<ExtendedRoutesConfig>

export interface ExtendedRoutesConfig extends RoutesConfig {
  entryFile: Config['entryFile']
  noImplicitAdditionalProperties: Exclude<Config['noImplicitAdditionalProperties'], undefined>
  bodyCoercion: Exclude<RoutesConfig['bodyCoercion'], undefined>
  controllerPathGlobs?: Config['controllerPathGlobs']
  multerOpts?: Config['multerOpts']
  rootSecurity?: Config['spec']['rootSecurity']
  routeGenerator?: string | RouteGeneratorImpl
}

const validateRoutesConfig = async (config: Config): Promise<ExtendedRoutesConfig> => {
  if (!config.entryFile && (!config.controllerPathGlobs || !config.controllerPathGlobs.length)) {
    throw new Error('Missing entryFile and controllerPathGlobs: Configuration must contain an entry point file or controller path globals.')
  }
  if (!!config.entryFile && !(await fsExists(config.entryFile))) {
    throw new Error(`EntryFile not found: ${config.entryFile} - Please check your tsoa config.`)
  }
  if (!config.routes.routesDir) {
    throw new Error('Missing routesDir: Configuration must contain a routes file output directory.')
  }

  if (config.routes.authenticationModule && !((await fsExists(config.routes.authenticationModule)) || (await fsExists(config.routes.authenticationModule + '.ts')))) {
    throw new Error(`No authenticationModule file found at '${config.routes.authenticationModule}'`)
  }

  if (config.routes.iocModule && !((await fsExists(config.routes.iocModule)) || (await fsExists(config.routes.iocModule + '.ts')))) {
    throw new Error(`No iocModule file found at '${config.routes.iocModule}'`)
  }

  const noImplicitAdditionalProperties = determineNoImplicitAdditionalSetting(config.noImplicitAdditionalProperties)

  const bodyCoercion = config.routes.bodyCoercion ?? true

  config.routes.basePath = config.routes.basePath || '/'

  return {
    ...config.routes,
    entryFile: config.entryFile,
    noImplicitAdditionalProperties,
    bodyCoercion,
    controllerPathGlobs: config.controllerPathGlobs,
    multerOpts: config.multerOpts,
    rootSecurity: config.spec.rootSecurity,
  }
}

const configurationArgs = {
  alias: 'c',
  describe: 'tsoa configuration file; default is tsoa.json in the working directory',
  required: false,
  string: true,
} as const

const hostArgs = {
  describe: 'API host',
  required: false,
  string: true,
} as const

const basePathArgs = {
  describe: 'Base API path',
  required: false,
  string: true,
} as const

const yarmlArgs = {
  describe: 'Swagger spec yaml format',
  required: false,
  boolean: true,
} as const

const jsonArgs = {
  describe: 'Swagger spec json format',
  required: false,
  boolean: true,
} as const

export interface ConfigArgs {
  basePath?: string
  configuration?: string | Config
}

export interface SwaggerArgs extends ConfigArgs {
  host?: string
  json?: boolean
  yaml?: boolean
}

export function runCLI() {
  return yargs(hideBin(process.argv))
    .usage('Usage: $0 <command> [options]')
    .command(
      'spec',
      'Generate OpenAPI spec',
      {
        basePath: basePathArgs,
        configuration: configurationArgs,
        host: hostArgs,
        json: jsonArgs,
        yaml: yarmlArgs,
      },
      args => SpecGenerator(args),
    )
    .command(
      'routes',
      'Generate routes',
      {
        basePath: basePathArgs,
        configuration: configurationArgs,
      },
      args => routeGenerator(args),
    )
    .command(
      'spec-and-routes',
      'Generate OpenAPI spec and routes',
      {
        basePath: basePathArgs,
        configuration: configurationArgs,
        host: hostArgs,
        json: jsonArgs,
        yaml: yarmlArgs,
      },
      args => void generateSpecAndRoutes(args),
    )
    .demandCommand(1, 1, 'Must provide a valid command.')
    .help('help')
    .alias('help', 'h')
    .parse()
}

if (require.main === module) {
  void (async () => {
    try {
      await runCLI()
    } catch (err) {
      console.error('tsoa cli error:\n', err)
      process.exit(1)
    }
  })()
}

async function SpecGenerator(args: SwaggerArgs) {
  try {
    const { config, configBaseDir } = await resolveConfig(args.configuration)
    if (args.basePath) {
      config.spec.basePath = args.basePath
    }
    if (args.host) {
      config.spec.host = args.host
    }
    if (args.yaml) {
      config.spec.yaml = args.yaml
    }
    if (args.json) {
      config.spec.yaml = false
    }

    const compilerOptions = validateCompilerOptions(config, configBaseDir)
    const swaggerConfig = await validateSpecConfig(config)

    await generateSpec(swaggerConfig, compilerOptions, config.ignore)
  } catch (err) {
    console.error('Generate swagger error.\n', err)
    process.exit(1)
  }
}

async function routeGenerator(args: ConfigArgs) {
  try {
    const { config, configBaseDir } = await resolveConfig(args.configuration)
    if (args.basePath) {
      config.routes.basePath = args.basePath
    }

    const compilerOptions = validateCompilerOptions(config, configBaseDir)
    const routesConfig = await validateRoutesConfig(config)

    await generateRoutes(routesConfig, compilerOptions, config.ignore)
  } catch (err) {
    console.error('Generate routes error.\n', err)
    process.exit(1)
  }
}

export async function generateSpecAndRoutes(args: SwaggerArgs, metadata?: Tsoa.Metadata) {
  try {
    const { config, configBaseDir } = await resolveConfig(args.configuration)
    if (args.basePath) {
      config.spec.basePath = args.basePath
    }
    if (args.host) {
      config.spec.host = args.host
    }
    if (args.yaml) {
      config.spec.yaml = args.yaml
    }
    if (args.json) {
      config.spec.yaml = false
    }

    const compilerOptions = validateCompilerOptions(config, configBaseDir)
    const routesConfig = await validateRoutesConfig(config)
    const swaggerConfig = await validateSpecConfig(config)

    if (!metadata) {
      metadata = new MetadataGenerator(config.entryFile, compilerOptions, config.ignore, config.controllerPathGlobs, config.spec.rootSecurity, config.defaultNumberType, config.routes.esm).Generate()
    }

    await Promise.all([generateRoutes(routesConfig, compilerOptions, config.ignore, metadata), generateSpec(swaggerConfig, compilerOptions, config.ignore, metadata)])
    return metadata
  } catch (err) {
    console.error('Generate routes error.\n', err)
    process.exit(1)
    throw err
  }
}
export type RouteGeneratorModule<Config extends ExtendedRoutesConfig> = {
  default: new (
    metadata: Tsoa.Metadata,
    routesConfig: Config,
  ) => {
    GenerateCustomRoutes: () => Promise<void>
  }
}
