import { expect } from 'chai'
import 'mocha'
import type { ExtendedRoutesConfig, ExtendedSpecConfig } from '../../../packages/cli/src/api'
import type { Config, Tsoa } from '@tsoa-next/runtime'
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import type { CompilerOptions } from 'typescript'
import { getDefaultOptions } from '../../fixtures/defaultOptions'

const Module = require('node:module')

type LoadedAPI = typeof import('../../../packages/cli/src/api')
type MetadataGeneratorConstructor = typeof import('../../../packages/cli/src/metadataGeneration/metadataGenerator').MetadataGenerator
type GenerateRoutesCall = [ExtendedRoutesConfig, CompilerOptions?, string[]?, Tsoa.Metadata?, Config['defaultNumberType']?]
type GenerateSpecCall = [ExtendedSpecConfig, CompilerOptions?, string[]?, Tsoa.Metadata?, Config['defaultNumberType']?]
type GenerateRoutes = (...args: GenerateRoutesCall) => Promise<Tsoa.Metadata>
type GenerateSpec = (...args: GenerateSpecCall) => Promise<Tsoa.Metadata>

const apiModulePath = require.resolve('../../../packages/cli/src/api')
const generateRoutesModulePath = require.resolve('../../../packages/cli/src/module/generate-routes')
const generateSpecModulePath = require.resolve('../../../packages/cli/src/module/generate-spec')
const metadataGeneratorModulePath = require.resolve('../../../packages/cli/src/metadataGeneration/metadataGenerator')

const clearModule = (modulePath: string) => {
  delete require.cache[modulePath]
}

const setModuleExports = (modulePath: string, moduleExports: unknown) => {
  const stubbedModule = new Module(modulePath, module)
  stubbedModule.exports = moduleExports
  stubbedModule.loaded = true
  require.cache[modulePath] = stubbedModule
}

type MetadataGeneratorArgs = ConstructorParameters<MetadataGeneratorConstructor>

type LoadAPIOptions = {
  generateRoutes?: GenerateRoutes
  generateSpec?: GenerateSpec
  metadataGenerator?: (...args: MetadataGeneratorArgs) => Tsoa.Metadata
}

const loadAPI = (options: LoadAPIOptions = {}): LoadedAPI => {
  clearModule(apiModulePath)
  clearModule(generateRoutesModulePath)
  clearModule(generateSpecModulePath)
  clearModule(metadataGeneratorModulePath)

  const defaultMetadata: Tsoa.Metadata = {
    controllers: [],
    referenceTypeMap: {},
  }

  const generateRoutes: GenerateRoutes = options.generateRoutes ?? (async () => defaultMetadata)
  const generateSpec: GenerateSpec = options.generateSpec ?? (async () => defaultMetadata)
  const createMetadata = options.metadataGenerator ?? (() => ({ controllers: [], referenceTypeMap: {} }))

  class StubMetadataGenerator {
    private readonly args: MetadataGeneratorArgs

    constructor(...args: MetadataGeneratorArgs) {
      this.args = args
    }

    public Generate() {
      return createMetadata(...this.args)
    }
  }

  setModuleExports(generateRoutesModulePath, { generateRoutes })
  setModuleExports(generateSpecModulePath, { generateSpec })
  setModuleExports(metadataGeneratorModulePath, { MetadataGenerator: StubMetadataGenerator })

  return require('../../../packages/cli/src/api')
}

type TempFixture = {
  configPath: string
  entryFile: string
  rootDir: string
  routesDir: string
  specOutputDirectory: string
}

const createYamlFixture = (): TempFixture => {
  const rootDir = mkdtempSync(join(tmpdir(), 'tsoa-cli-api-yaml-'))
  const entryFile = join(rootDir, 'entry.ts')
  const routesDir = join(rootDir, 'routes')
  const specOutputDirectory = join(rootDir, 'spec')
  const configPath = join(rootDir, 'tsoa.yaml')

  writeFileSync(entryFile, 'export const controller = true\n', 'utf8')
  writeFileSync(
    configPath,
    [`entryFile: ${JSON.stringify(entryFile)}`, 'spec:', `  outputDirectory: ${JSON.stringify(specOutputDirectory)}`, `routes:`, `  routesDir: ${JSON.stringify(routesDir)}`, ''].join('\n'),
    'utf8',
  )

  return {
    configPath,
    entryFile,
    rootDir,
    routesDir,
    specOutputDirectory,
  }
}

describe('CLI API', () => {
  const temporaryDirectories = new Set<string>()

  afterEach(() => {
    clearModule(apiModulePath)
    clearModule(generateRoutesModulePath)
    clearModule(generateSpecModulePath)
    clearModule(metadataGeneratorModulePath)

    for (const directory of temporaryDirectories) {
      rmSync(directory, { force: true, recursive: true })
    }

    temporaryDirectories.clear()
  })

  it('loads YAML config files for programmatic spec generation', async () => {
    const fixture = createYamlFixture()
    temporaryDirectories.add(fixture.rootDir)

    const specCalls: GenerateSpecCall[] = []
    const api = loadAPI({
      generateSpec: async (...args) => {
        specCalls.push(args)
        return {
          controllers: [],
          referenceTypeMap: {},
        }
      },
    })

    await api.generateSpecFromArgs({
      basePath: '/v2',
      configuration: fixture.configPath,
      host: 'api.example.com',
      json: true,
      yaml: true,
    })

    expect(specCalls).to.have.length(1)
    const [call] = specCalls

    if (!call) {
      throw new Error('Expected a spec generation call.')
    }

    const [swaggerConfig, compilerOptions, ignore, metadata] = call

    expect(swaggerConfig.basePath).to.equal('/v2')
    expect(swaggerConfig.host).to.equal('api.example.com')
    expect(swaggerConfig.yaml).to.equal(false)
    expect(compilerOptions).to.deep.equal({})
    expect(ignore).to.equal(undefined)
    expect(metadata).to.equal(undefined)
  })

  it('loads JS config files for programmatic route generation', async () => {
    const rootDir = mkdtempSync(join(tmpdir(), 'tsoa-cli-api-js-'))
    temporaryDirectories.add(rootDir)
    const entryFile = join(rootDir, 'entry.ts')
    const routesDir = join(rootDir, 'routes')
    const specOutputDirectory = join(rootDir, 'spec')
    const configPath = join(rootDir, 'tsoa.config.cjs')

    writeFileSync(entryFile, 'export const controller = true\n', 'utf8')
    writeFileSync(
      configPath,
      [
        'module.exports = {',
        `  entryFile: ${JSON.stringify(entryFile)},`,
        '  spec: {',
        `    outputDirectory: ${JSON.stringify(specOutputDirectory)},`,
        '  },',
        '  routes: {',
        `    routesDir: ${JSON.stringify(routesDir)},`,
        '  },',
        '}',
        '',
      ].join('\n'),
      'utf8',
    )

    const routeCalls: GenerateRoutesCall[] = []
    const api = loadAPI({
      generateRoutes: async (...args) => {
        routeCalls.push(args)
        return {
          controllers: [],
          referenceTypeMap: {},
        }
      },
    })

    await api.generateRoutesFromArgs({
      basePath: '/routes',
      configuration: configPath,
    })

    expect(routeCalls).to.have.length(1)
    const [call] = routeCalls

    if (!call) {
      throw new Error('Expected a route generation call.')
    }

    const [routesConfig, compilerOptions, ignore, metadata] = call

    expect(routesConfig.basePath).to.equal('/routes')
    expect(compilerOptions).to.deep.equal({})
    expect(ignore).to.equal(undefined)
    expect(metadata).to.equal(undefined)
  })

  it('generates spec and routes from a config object without loading CLI parsing dependencies', async () => {
    const rootDir = mkdtempSync(join(tmpdir(), 'tsoa-cli-api-object-'))
    temporaryDirectories.add(rootDir)

    const entryFile = join(rootDir, 'entry.ts')
    const routesDir = join(rootDir, 'routes')
    const specOutputDirectory = join(rootDir, 'spec')

    writeFileSync(entryFile, 'export const controller = true\n', 'utf8')

    const routeCalls: GenerateRoutesCall[] = []
    const specCalls: GenerateSpecCall[] = []
    const metadataCalls: MetadataGeneratorArgs[] = []
    const generatedMetadata: Tsoa.Metadata = {
      controllers: [],
      referenceTypeMap: {},
    }

    const api = loadAPI({
      generateRoutes: async (...args) => {
        routeCalls.push(args)
        return generatedMetadata
      },
      generateSpec: async (...args) => {
        specCalls.push(args)
        return generatedMetadata
      },
      metadataGenerator: (...args) => {
        metadataCalls.push(args)
        return generatedMetadata
      },
    })

    const config: Config = getDefaultOptions(specOutputDirectory, entryFile)
    config.routes.routesDir = routesDir
    config.spec.rootSecurity = [{ bearerAuth: ['read'] }]

    const metadata = await api.generateSpecAndRoutes({
      basePath: '/combined',
      configuration: config,
      host: 'combined.example.com',
      json: true,
      yaml: true,
    })

    expect(metadata).to.equal(generatedMetadata)
    expect(metadataCalls).to.have.length(1)
    expect(routeCalls).to.have.length(1)
    expect(specCalls).to.have.length(1)

    const [metadataArgs] = metadataCalls
    if (!metadataArgs) {
      throw new Error('Expected metadata generation arguments.')
    }

    expect(metadataArgs[0]).to.equal(entryFile)
    const compilerOptions = metadataArgs[1]
    if (!compilerOptions || typeof compilerOptions.configFilePath !== 'string') {
      throw new Error('Expected compiler options resolved from the test tsconfig.')
    }

    expect(compilerOptions.configFilePath).to.equal(join(process.cwd(), 'tsconfig.json'))
    expect(metadataArgs[4]).to.deep.equal([{ bearerAuth: ['read'] }])

    const [routeCall] = routeCalls
    const [specCall] = specCalls

    if (!routeCall || !specCall) {
      throw new Error('Expected route and spec generation calls.')
    }

    expect(routeCall[3]).to.equal(generatedMetadata)
    expect(specCall[0].basePath).to.equal('/combined')
    expect(specCall[0].host).to.equal('combined.example.com')
    expect(specCall[0].yaml).to.equal(false)
    expect(specCall[3]).to.equal(generatedMetadata)
  })

  it('rejects malformed rootSecurity objects with type narrowing instead of casts', async () => {
    const rootDir = mkdtempSync(join(tmpdir(), 'tsoa-cli-api-root-security-'))
    temporaryDirectories.add(rootDir)

    const entryFile = join(rootDir, 'entry.ts')
    writeFileSync(entryFile, 'export const controller = true\n', 'utf8')

    const api = loadAPI()
    const config: Config = getDefaultOptions(join(rootDir, 'spec'), entryFile)
    Reflect.set(config.spec, 'rootSecurity', [{ bearerAuth: 'read' }])

    let thrownError: Error | undefined

    try {
      await api.validateSpecConfig(config)
    } catch (error) {
      if (error instanceof Error) {
        thrownError = error
      } else {
        throw error
      }
    }

    expect(thrownError?.message).to.equal('spec.rootSecurity must be an array of objects whose keys are security scheme names and values are arrays of scopes')
  })
})
