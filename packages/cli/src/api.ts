import { parse as parseYAML } from 'yaml'
import { Config, RoutesConfig, SpecConfig, Tsoa } from '@tsoa-next/runtime'
import * as ts from 'typescript'
import { MetadataGenerator } from './metadataGeneration/metadataGenerator'
import { generateRoutes } from './module/generate-routes'
import { generateSpec } from './module/generate-spec'
import { fsExists, fsReadFile } from './utils/fs'
import { AbstractRouteGenerator } from './routeGeneration/routeGenerator'
import { dirname, extname, isAbsolute, resolve } from 'node:path'
import type { Options as MulterOptions } from 'multer'
import type { CompilerOptions } from 'typescript'

const workingDir: string = process.cwd()
const isRecord = (value: unknown): value is Record<string, unknown> => typeof value === 'object' && value !== null

let packageJson: Record<string, unknown> | undefined
const getPackageJsonValue = async (key: string, defaultValue = ''): Promise<string> => {
  if (!packageJson) {
    try {
      const packageJsonRaw = await fsReadFile(`${workingDir}/package.json`)
      const parsedPackageJson: unknown = JSON.parse(packageJsonRaw.toString('utf8'))
      packageJson = isRecord(parsedPackageJson) ? parsedPackageJson : {}
    } catch {
      return defaultValue
    }
  }

  const value = packageJson[key]
  return typeof value === 'string' ? value : defaultValue
}

const nameDefault = () => getPackageJsonValue('name', 'TSOA')
const versionDefault = () => getPackageJsonValue('version', '1.0.0')
const descriptionDefault = () => getPackageJsonValue('description', 'Build swagger-compliant REST APIs using TypeScript and Node')
const licenseDefault = () => getPackageJsonValue('license')
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

const findAuthorNameBoundary = (author: string, startIndex: number): number => {
  let boundary = author.length

  for (const token of ['<', '(']) {
    const tokenIndex = author.indexOf(token, startIndex)
    if (tokenIndex !== -1 && tokenIndex < boundary) {
      boundary = tokenIndex
    }
  }

  return boundary
}

const setParsedContactValue = (contact: ParsedAuthorContact, key: keyof ParsedAuthorContact, value: string | undefined) => {
  if (value) {
    contact[key] = value
  }
}

const readDelimitedAuthorValue = (author: string, index: number, openingToken: string, closingToken: string): { value?: string; nextIndex: number } => {
  if (author[index] !== openingToken) {
    return { nextIndex: index }
  }

  const closingIndex = author.indexOf(closingToken, index + 1)
  if (closingIndex === -1) {
    return { nextIndex: index }
  }

  return {
    value: trimToUndefined(author.slice(index + 1, closingIndex)),
    nextIndex: skipAuthorWhitespace(author, closingIndex + 1),
  }
}

const parseAuthorContact = (author: string): ParsedAuthorContact => {
  const contact: ParsedAuthorContact = {}
  let index = skipAuthorWhitespace(author, 0)
  const nameBoundary = findAuthorNameBoundary(author, index)
  const name = trimToUndefined(author.slice(index, nameBoundary))
  setParsedContactValue(contact, 'name', name)

  index = skipAuthorWhitespace(author, nameBoundary)

  const emailResult = readDelimitedAuthorValue(author, index, '<', '>')
  setParsedContactValue(contact, 'email', emailResult.value)

  const urlResult = readDelimitedAuthorValue(author, emailResult.nextIndex, '(', ')')
  setParsedContactValue(contact, 'url', urlResult.value)

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

const parseConfigContents = async (configFullPath: string, extension: string, configPath: string): Promise<Config> => {
  if (isYamlExtension(extension)) {
    const configRaw = await fsReadFile(configFullPath)
    return parseConfigValue(parseYAML(configRaw.toString('utf8')))
  }

  if (isJsExtension(extension)) {
    const importedConfig: unknown = await import(configFullPath)
    if (!isRecord(importedConfig)) {
      throw new Error(`Invalid JS config export at '${configPath}'`)
    }
    return parseConfigModule(importedConfig)
  }

  const configRaw = await fsReadFile(configFullPath)
  return parseConfigValue(JSON.parse(configRaw.toString('utf8')))
}

const rethrowConfigLoadError = (err: unknown, configPath: string, extension: string): never => {
  if (!(err instanceof Error)) {
    console.error(err)
    throw new Error(`Unhandled error encountered loading '${configPath}': ${String(err)}`)
  }

  if ('code' in err && err.code === 'MODULE_NOT_FOUND') {
    throw new Error(`No config file found at '${configPath}'`)
  }

  if (err.name === 'SyntaxError') {
    console.error(err)
    const errorType = isJsExtension(extension) ? 'JS' : 'JSON'
    throw new Error(`Invalid ${errorType} syntax in config at '${configPath}': ${err.message}`)
  }

  console.error(err)
  throw new Error(`Unhandled error encountered loading '${configPath}': ${err.message}`)
}

const getConfig = async (configPath = 'tsoa.json'): Promise<ConfigWithContext> => {
  const ext = extname(configPath)
  const configFullPath = isAbsolute(configPath) ? configPath : `${workingDir}/${configPath}`
  try {
    const config = await parseConfigContents(configFullPath, ext, configPath)
    return {
      config,
      configBaseDir: dirname(configFullPath),
    }
  } catch (err) {
    return rethrowConfigLoadError(err, configPath, ext)
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

const resolveTsconfigPath = (config: Config, configBaseDir: string): string | undefined => {
  if (config.tsconfig === undefined) {
    return ts.findConfigFile(configBaseDir, fileName => ts.sys.fileExists(fileName), 'tsconfig.json')
  }

  return isAbsolute(config.tsconfig) ? config.tsconfig : resolve(configBaseDir, config.tsconfig)
}

const loadTsConfigCompilerOptions = (config: Config, configBaseDir: string): CompilerOptions => {
  const resolvedTsconfigPath = resolveTsconfigPath(config, configBaseDir)

  if (!resolvedTsconfigPath) {
    return {}
  }

  const readResult = ts.readConfigFile(resolvedTsconfigPath, fileName => ts.sys.readFile(fileName))
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

const isConfig = (value: unknown): value is Config => {
  return isRecord(value) && ('entryFile' in value || 'routes' in value || 'spec' in value || 'tsconfig' in value)
}

const parseConfigValue = (value: unknown): Config => {
  if (isConfig(value)) {
    return value
  }

  throw new Error('Invalid tsoa-next config shape')
}

const parseConfigModule = (moduleExports: Record<string, unknown>): Config => {
  const defaultExport = 'default' in moduleExports ? moduleExports.default : moduleExports
  return parseConfigValue(defaultExport)
}

const hasEntryPointConfiguration = (config: Pick<Config, 'entryFile' | 'controllerPathGlobs'>): boolean => {
  return !!config.entryFile || !!config.controllerPathGlobs?.length
}

const assertEntryPointConfiguration = (config: Pick<Config, 'entryFile' | 'controllerPathGlobs'>): void => {
  if (!hasEntryPointConfiguration(config)) {
    throw new Error('Missing entryFile and controllerPathGlobs: Configuration must contain an entry point file or controller path globs.')
  }
}

const assertExistingEntryFile = async (entryFile: Config['entryFile'], message: string): Promise<void> => {
  if (entryFile && !(await fsExists(entryFile))) {
    throw new Error(message)
  }
}

const supportedSpecVersions = [2, 3, 3.1] as const

function assertSupportedSpecVersion(specVersion: SpecConfig['specVersion']): asserts specVersion is (typeof supportedSpecVersions)[number] {
  if (!supportedSpecVersions.includes(specVersion as (typeof supportedSpecVersions)[number])) {
    throw new Error(`Unsupported Spec version: ${specVersion}.`)
  }
}

const assertValidSpecMerging = (spec: SpecConfig): void => {
  if (spec.spec && !['immediate', 'recursive', 'deepmerge', undefined].includes(spec.specMerging)) {
    throw new Error(`Invalid specMerging config: ${spec.specMerging}`)
  }
}

const ensureContact = (spec: SpecConfig): NonNullable<SpecConfig['contact']> => {
  spec.contact ??= {}
  return spec.contact
}

const setContactValueIfMissing = (contact: NonNullable<SpecConfig['contact']>, key: keyof NonNullable<SpecConfig['contact']>, value: string | undefined) => {
  if (!contact[key] && value !== undefined) {
    contact[key] = value
  }
}

const populateContactFromAuthor = (contact: NonNullable<SpecConfig['contact']>, author: string | { name?: string; email?: string; url?: string }) => {
  if (typeof author === 'string') {
    const parsedContact = parseAuthorContact(author)
    setContactValueIfMissing(contact, 'name', parsedContact.name)
    setContactValueIfMissing(contact, 'email', parsedContact.email)
    setContactValueIfMissing(contact, 'url', parsedContact.url)
    return
  }

  setContactValueIfMissing(contact, 'name', author.name)
  setContactValueIfMissing(contact, 'email', author.email)
  setContactValueIfMissing(contact, 'url', author.url)
}

const assertValidRootSecurity = (rootSecurity: SpecConfig['rootSecurity']): void => {
  if (!rootSecurity) {
    return
  }

  if (!Array.isArray(rootSecurity)) {
    throw new TypeError('spec.rootSecurity must be an array')
  }

  const isValidRootSecurity = rootSecurity.every(security => typeof security === 'object' && security !== null && Object.values(security).every(scope => Array.isArray(scope)))
  if (!isValidRootSecurity) {
    throw new Error('spec.rootSecurity must be an array of objects whose keys are security scheme names and values are arrays of scopes')
  }
}

const applySpecDefaults = async (config: Config): Promise<void> => {
  const spec = config.spec

  spec.version ??= await versionDefault()
  spec.specVersion ??= 2
  assertSupportedSpecVersion(spec.specVersion)
  assertValidSpecMerging(spec)
  spec.name ??= await nameDefault()
  spec.description ??= await descriptionDefault()
  spec.basePath ??= '/'
  // defaults to template that may generate non-unique operation ids.
  // @see https://github.com/lukeautry/tsoa/issues/1005
  spec.operationIdTemplate ??= '{{titleCase method.name}}'

  const packageLicense = spec.license ? undefined : await licenseDefault()
  if (packageLicense) {
    spec.license = packageLicense
  }

  populateContactFromAuthor(ensureContact(spec), await authorInformation)
  config.defaultNumberType ??= 'double'
  assertValidRootSecurity(spec.rootSecurity)
}

const hasFileOrTsSibling = async (path: string): Promise<boolean> => {
  return (await fsExists(path)) || (await fsExists(`${path}.ts`))
}

const getLegacyMulterOptions = (config: Config): MulterOptions | undefined => {
  return Reflect.get(config as object, 'multerOpts') as MulterOptions | undefined
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
  assertEntryPointConfiguration(config)
  await assertExistingEntryFile(config.entryFile, `EntryFile not found: ${config.entryFile} - please check your tsoa config.`)
  await applySpecDefaults(config)

  const noImplicitAdditionalProperties = determineNoImplicitAdditionalSetting(config.noImplicitAdditionalProperties)

  return {
    ...config.spec,
    noImplicitAdditionalProperties,
    entryFile: config.entryFile,
    controllerPathGlobs: config.controllerPathGlobs,
  }
}

export interface ExtendedRoutesConfig extends RoutesConfig {
  entryFile: Config['entryFile']
  noImplicitAdditionalProperties: Exclude<Config['noImplicitAdditionalProperties'], undefined>
  bodyCoercion: Exclude<RoutesConfig['bodyCoercion'], undefined>
  controllerPathGlobs?: Config['controllerPathGlobs']
  multerOpts?: MulterOptions
  rootSecurity?: Config['spec']['rootSecurity']
  routeGenerator?: string | (new (metadata: Tsoa.Metadata, options: ExtendedRoutesConfig) => AbstractRouteGenerator<ExtendedRoutesConfig>)
}

export const validateRoutesConfig = async (config: Config): Promise<ExtendedRoutesConfig> => {
  assertEntryPointConfiguration(config)
  await assertExistingEntryFile(config.entryFile, `EntryFile not found: ${config.entryFile} - Please check your tsoa config.`)
  const routes = config.routes

  if (!routes) {
    throw new Error('Missing routes: configuration must contain routes.')
  }
  if (!routes.routesDir) {
    throw new Error('Missing routesDir: Configuration must contain a routes file output directory.')
  }

  if (routes.authenticationModule && !(await hasFileOrTsSibling(routes.authenticationModule))) {
    throw new Error(`No authenticationModule file found at '${routes.authenticationModule}'`)
  }

  if (routes.iocModule && !(await hasFileOrTsSibling(routes.iocModule))) {
    throw new Error(`No iocModule file found at '${routes.iocModule}'`)
  }

  const noImplicitAdditionalProperties = determineNoImplicitAdditionalSetting(config.noImplicitAdditionalProperties)

  const bodyCoercion = routes.bodyCoercion ?? true

  routes.basePath = routes.basePath || '/'

  return {
    ...routes,
    entryFile: config.entryFile,
    noImplicitAdditionalProperties,
    bodyCoercion,
    controllerPathGlobs: config.controllerPathGlobs,
    multerOpts: getLegacyMulterOptions(config),
    rootSecurity: config.spec?.rootSecurity,
  }
}

export interface ConfigArgs {
  basePath?: string
  configuration?: string | Config
}

export interface SwaggerArgs extends ConfigArgs {
  host?: string
  json?: boolean
  yaml?: boolean
}

const applyBasePathArg = <T extends { basePath?: string }>(config: T, args: ConfigArgs) => {
  if (args.basePath) {
    config.basePath = args.basePath
  }
}

const applySwaggerArgs = (config: ExtendedSpecConfig, args: SwaggerArgs) => {
  applyBasePathArg(config, args)

  if (args.host) {
    config.host = args.host
  }
  if (args.yaml) {
    config.yaml = args.yaml
  }
  if (args.json) {
    config.yaml = false
  }
}

export async function generateSpecFromArgs(args: SwaggerArgs) {
  const { config, configBaseDir } = await resolveConfig(args.configuration)
  const compilerOptions = validateCompilerOptions(config, configBaseDir)
  const swaggerConfig = await validateSpecConfig(config)
  applySwaggerArgs(swaggerConfig, args)

  await generateSpec(swaggerConfig, compilerOptions, config.ignore)
}

export async function generateRoutesFromArgs(args: ConfigArgs) {
  const { config, configBaseDir } = await resolveConfig(args.configuration)
  const compilerOptions = validateCompilerOptions(config, configBaseDir)
  const routesConfig = await validateRoutesConfig(config)
  applyBasePathArg(routesConfig, args)

  await generateRoutes(routesConfig, compilerOptions, config.ignore)
}

export async function generateSpecAndRoutes(args: SwaggerArgs, metadata?: Tsoa.Metadata) {
  const { config, configBaseDir } = await resolveConfig(args.configuration)
  const compilerOptions = validateCompilerOptions(config, configBaseDir)
  const swaggerConfig = await validateSpecConfig(config)
  const routesConfig = await validateRoutesConfig(config)
  applySwaggerArgs(swaggerConfig, args)
  applyBasePathArg(routesConfig, args)

  metadata ??= new MetadataGenerator(config.entryFile, compilerOptions, config.ignore, config.controllerPathGlobs, swaggerConfig.rootSecurity, config.defaultNumberType, routesConfig.esm).Generate()

  await Promise.all([generateRoutes(routesConfig, compilerOptions, config.ignore, metadata), generateSpec(swaggerConfig, compilerOptions, config.ignore, metadata)])
  return metadata
}

export type RouteGeneratorModule<Config extends ExtendedRoutesConfig> = {
  default: new (
    metadata: Tsoa.Metadata,
    routesConfig: Config,
  ) => {
    GenerateCustomRoutes: () => Promise<void>
  }
}
