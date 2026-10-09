import { expect } from 'chai'
import 'mocha'
import Module = require('node:module')
import { mkdtempSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import type { Config, Tsoa, Swagger } from '@tsoa-next/runtime'
import { getDefaultExtendedOptions } from '../../fixtures/defaultOptions'

const withBlockedRequires = async <T>(blocked: (id: string) => boolean, run: () => T | Promise<T>): Promise<T> => {
  const requireDescriptor = Object.getOwnPropertyDescriptor(Module.prototype, 'require')

  if (!requireDescriptor || typeof requireDescriptor.value !== 'function') {
    throw new Error('Module.prototype.require is unavailable.')
  }

  const originalRequire = requireDescriptor.value

  Module.prototype.require = function patchedRequire(this: NodeJS.Module, id: string) {
    if (blocked(id)) {
      throw new Error(`unexpected CLI dependency load: ${id}`)
    }

    return originalRequire.call(this, id)
  }

  try {
    return await run()
  } finally {
    Object.defineProperty(Module.prototype, 'require', requireDescriptor)
  }
}

const clearModule = (specifier: string) => {
  try {
    delete require.cache[require.resolve(specifier)]
  } catch {
    // Ignore modules that were never loaded.
  }
}

function reload(specifier: 'tsoa-next'): typeof import('tsoa-next')
function reload(specifier: 'tsoa-next/cli'): typeof import('tsoa-next/cli')
function reload(specifier: 'tsoa-next' | 'tsoa-next/cli') {
  clearModule('tsoa-next')
  clearModule('tsoa-next/cli')
  clearModule('@tsoa-next/cli')
  clearModule('@tsoa-next/cli/metadataGeneration/metadataGenerator')

  const modulePath = require.resolve(specifier)
  delete require.cache[modulePath]
  return require(specifier)
}

describe('Package boundary', () => {
  it('loads runtime exports from tsoa-next without touching CLI dependencies', () => {
    return withBlockedRequires(
      id => id === '@tsoa-next/cli' || id.startsWith('@tsoa-next/cli/') || id === 'yargs' || id === 'yargs/helpers',
      () => {
        const runtime = reload('tsoa-next')

        expect(runtime.Get).to.be.a('function')
        expect(runtime.Route).to.be.a('function')
        expect(runtime.SpecPath).to.be.a('function')
        expect(runtime.createEmbeddedSpecGenerator).to.be.a('function')
        expect(runtime.createOpenApiSpecGenerator).to.be.a('function')
        expect('generateRoutes' in runtime).to.equal(false)
        expect('generateSpec' in runtime).to.equal(false)
        expect('generateSpecAndRoutes' in runtime).to.equal(false)
        expect('validateCompilerOptions' in runtime).to.equal(false)
        expect('runCLI' in runtime).to.equal(false)
      },
    )
  })

  it('loads programmatic APIs from tsoa-next/cli without touching yargs eagerly', () => {
    return withBlockedRequires(
      id => id === 'yargs' || id === 'yargs/helpers',
      () => {
        const cli = reload('tsoa-next/cli')

        expect(cli.generateRoutes).to.be.a('function')
        expect(cli.generateSpec).to.be.a('function')
        expect(cli.generateSpecAndRoutes).to.be.a('function')
        expect(cli.validateCompilerOptions).to.be.a('function')
        expect(cli.runCLI).to.be.a('function')
        expect('generateSpecFromArgs' in cli).to.equal(false)
        expect('generateRoutesFromArgs' in cli).to.equal(false)
      },
    )
  })

  it('loads runCLI without touching heavy generation dependencies eagerly', () => {
    return withBlockedRequires(
      id => id === './api' || id === 'typescript' || id === 'yaml' || id.endsWith('/api') || id.endsWith('/module/generate-routes') || id.endsWith('/module/generate-spec'),
      () => {
        clearModule('../../../packages/cli/src/runCLI')
        const cliModule = require('../../../packages/cli/src/runCLI') as typeof import('../../../packages/cli/src/runCLI')

        expect(cliModule.runCLI).to.be.a('function')
      },
    )
  })

  it('keeps getSpecString callable after destructuring the spec generator methods', async () => {
    const runtime = reload('tsoa-next')
    const specConfig = getDefaultExtendedOptions('.', './fixtures/controllers/getController.ts')
    // Intentionally detach the method to verify it does not rely on `this`.
    // eslint-disable-next-line @typescript-eslint/unbound-method
    const { getSpecString } = runtime.createOpenApiSpecGenerator({
      spec: specConfig,
    })

    const specString = await getSpecString('json')

    expect(specString).to.contain('"swagger": "2.0"')
    expect(specString).to.contain('"/GetTest"')
  })

  it('serves embedded spec artifacts without touching CLI dependencies', async () => {
    await withBlockedRequires(
      id => id === '@tsoa-next/cli' || id.startsWith('@tsoa-next/cli/'),
      async () => {
        const runtime = reload('tsoa-next')
        // eslint-disable-next-line @typescript-eslint/unbound-method
        const { getSpecString } = runtime.createEmbeddedSpecGenerator({
          json: '{"swagger":"2.0","info":{"title":"test"},"paths":{}}',
          spec: {
            info: { title: 'test' },
            paths: {},
            swagger: '2.0',
          },
          yaml: 'swagger: "2.0"\ninfo:\n  title: test\npaths: {}\n',
        } as Parameters<typeof runtime.createEmbeddedSpecGenerator>[0])

        expect(await getSpecString('json')).to.equal('{"swagger":"2.0","info":{"title":"test"},"paths":{}}')
        expect(await getSpecString('yaml')).to.equal('swagger: "2.0"\ninfo:\n  title: test\npaths: {}\n')
      },
    )
  })

  it('fails embedded YAML requests without touching CLI dependencies when YAML was not embedded', async () => {
    await withBlockedRequires(
      id => id === '@tsoa-next/cli' || id.startsWith('@tsoa-next/cli/'),
      async () => {
        const runtime = reload('tsoa-next')
        // eslint-disable-next-line @typescript-eslint/unbound-method
        const { getSpecString } = runtime.createEmbeddedSpecGenerator({
          spec: {
            info: { title: 'test' },
            paths: {},
            swagger: '2.0',
          },
        } as Parameters<typeof runtime.createEmbeddedSpecGenerator>[0])

        let error: unknown
        try {
          await getSpecString('yaml')
        } catch (caughtError) {
          error = caughtError
        }

        expect(error).to.be.instanceOf(Error)
        expect((error as Error).message).to.equal(
          'Embedded spec generator cannot produce YAML because no embedded YAML artifact was provided. Embed `artifacts.yaml` when generating routes, or use `createOpenApiSpecGenerator` if runtime CLI-based serialization is required.',
        )
      },
    )
  })

  it('reuses embedded metadata when controller source globs are unavailable', async () => {
    const runtime = reload('tsoa-next')
    const { MetadataGenerator } = require('@tsoa-next/cli/metadataGeneration/metadataGenerator') as typeof import('@tsoa-next/cli/metadataGeneration/metadataGenerator')
    const metadata = new MetadataGenerator('./fixtures/controllers/getController.ts').Generate()
    const specConfig = {
      ...getDefaultExtendedOptions('.', './fixtures/controllers/getController.ts'),
      controllerPathGlobs: ['./fixtures/controllers/does-not-exist/**/*Controller.ts'],
    }
    const runtimeSpecConfig = {
      metadata,
      spec: specConfig,
    } as Parameters<typeof runtime.createOpenApiSpecGenerator>[0]

    // Intentionally detach the method to verify embedded metadata keeps the generator callable without relying on `this`.
    // eslint-disable-next-line @typescript-eslint/unbound-method
    const { getSpecString } = runtime.createOpenApiSpecGenerator(runtimeSpecConfig)

    const specString = await getSpecString('json')

    expect(specString).to.contain('"swagger": "2.0"')
    expect(specString).to.contain('"/GetTest"')
  })
})

describe('OpenAPI emitter loading', () => {
  const coordinator = '@tsoa-next/cli/module/generate-spec'
  const emitters = {
    '2': '@tsoa-next/cli/swagger/specGenerator2',
    '3': '@tsoa-next/cli/swagger/specGenerator3',
    '31': '@tsoa-next/cli/swagger/specGenerator31',
  }
  const reloadCoordinator = () => {
    clearModule(coordinator)
    for (const emitter of Object.values(emitters)) {
      clearModule(emitter)
    }
    return require(coordinator) as typeof import('@tsoa-next/cli/module/generate-spec')
  }
  const emitterName = (id: string) => /(?:^|[\\/])specGenerator(2|3|31)$/.exec(id)?.[1]

  it('imports the coordinator without loading an emitter', () => {
    return withBlockedRequires(
      id => emitterName(id) !== undefined || id.endsWith('/metadataGeneration/metadataGenerator'),
      () => {
        const module = reloadCoordinator()
        expect(module.buildSpec).to.be.a('function')
        expect(module.generateSpec).to.be.a('function')
        for (const emitter of Object.values(emitters)) {
          expect(require.cache[require.resolve(emitter)]).to.be.undefined
        }
      },
    )
  })

  const selections = [
    { selection: 2, version: '2.0', required: ['2'] },
    { selection: 3, version: '3.0.0', required: ['3'] },
    // OpenAPI 3.1 inherits its shared implementation from the OpenAPI 3 generator.
    { selection: 3.1, version: '3.1.0', required: ['3', '31'] },
    { selection: undefined, version: '2.0', required: ['2'] },
    { selection: 99, version: '3.1.0', required: ['3', '31'] },
  ]
  for (const { selection, version, required } of selections) {
    it(`synchronously builds version ${version} for selection ${String(selection)} with only its required emitters`, () => {
      return withBlockedRequires(
        id => {
          const emitter = emitterName(id)
          return id.endsWith('/metadataGeneration/metadataGenerator') || (emitter !== undefined && !required.includes(emitter))
        },
        () => {
          const { buildSpec } = reloadCoordinator()
          const config = { ...getDefaultExtendedOptions(), specVersion: selection as import('@tsoa-next/cli').ExtendedSpecConfig['specVersion'] }
          const spec = buildSpec(config, undefined, undefined, { controllers: [], referenceTypeMap: {} })
          expect(spec).not.to.be.instanceOf(Promise)
          expect(spec).to.have.property(version === '2.0' ? 'swagger' : 'openapi', version)
          expect(spec.info.title).to.equal(config.name)
          expect(spec).to.have.property('paths').that.deep.equals({})
          for (const [name, emitter] of Object.entries(emitters)) {
            if (required.includes(name)) {
              expect(require.cache[require.resolve(emitter)]).not.to.be.undefined
            } else {
              expect(require.cache[require.resolve(emitter)]).to.be.undefined
            }
          }
        },
      )
    })
  }
})

describe('Generation metadata loading', () => {
  const loadCoordinators = () => {
    clearModule('@tsoa-next/cli/module/generate-spec')
    clearModule('@tsoa-next/cli/module/generate-routes')
    return {
      spec: require('@tsoa-next/cli/module/generate-spec') as typeof import('@tsoa-next/cli/module/generate-spec'),
      routes: require('@tsoa-next/cli/module/generate-routes') as typeof import('@tsoa-next/cli/module/generate-routes'),
    }
  }
  const blocksMetadata = (id: string) => id.endsWith('/metadataGeneration/metadataGenerator')

  it('imports both coordinators without loading compiler analysis', () => {
    return withBlockedRequires(blocksMetadata, () => {
      const { spec, routes } = loadCoordinators()
      expect(spec.buildSpec).to.be.a('function')
      expect(routes.generateRoutes).to.be.a('function')
    })
  })

  it('uses supplied metadata by identity and observes later mutations without loading compiler analysis', async () => {
    const directory = mkdtempSync(join(tmpdir(), 'tsoa-supplied-metadata-'))
    const selected: Tsoa.RefEnumType = { dataType: 'refEnum', refName: 'Selected', enums: ['before'], deprecated: false }
    const metadata: Tsoa.Metadata = { controllers: [], referenceTypeMap: { Selected: selected } }
    try {
      await withBlockedRequires(blocksMetadata, async () => {
        const { spec, routes } = loadCoordinators()
        const config = getDefaultExtendedOptions(directory, 'missing-unused-controller.ts')
        expect(await spec.generateSpec(config, undefined, undefined, metadata)).to.equal(metadata)
        expect(JSON.parse(readFileSync(join(directory, 'swagger.json'), 'utf8')).definitions.Selected.enum).to.deep.equal(['before'])
        selected.enums = ['after']
        const updated = spec.buildSpec(config, undefined, undefined, metadata)
        expect(updated).to.have.nested.property('definitions.Selected.enum').that.deep.equals(['after'])
        expect(
          await routes.generateRoutes({ entryFile: config.entryFile, routesDir: directory, bodyCoercion: true, noImplicitAdditionalProperties: 'ignore' }, undefined, undefined, metadata),
        ).to.equal(metadata)
        expect(readFileSync(join(directory, 'routes.ts'), 'utf8')).to.contain('"after"')
      })
    } finally {
      rmSync(directory, { force: true, recursive: true })
    }
  })

  it('surfaces required analysis loading failures when each generation entry reaches missing metadata', async () => {
    const directory = mkdtempSync(join(tmpdir(), 'tsoa-required-metadata-'))
    try {
      await withBlockedRequires(blocksMetadata, async () => {
        const { spec, routes } = loadCoordinators()
        const config = getDefaultExtendedOptions(directory, 'missing-controller.ts')
        expect(() => spec.buildSpec(config)).to.throw('unexpected CLI dependency load: ../metadataGeneration/metadataGenerator')
        for (const generate of [
          () => spec.generateSpec(config),
          () => routes.generateRoutes({ entryFile: config.entryFile, routesDir: directory, bodyCoercion: true, noImplicitAdditionalProperties: 'ignore' }),
        ]) {
          let failure: unknown
          try {
            await generate()
          } catch (error) {
            failure = error
          }
          expect(failure).to.be.instanceOf(Error)
          expect((failure as Error).message).to.equal('unexpected CLI dependency load: ../metadataGeneration/metadataGenerator')
        }
        expect(readdirSync(directory)).to.deep.equal([])
      })
    } finally {
      rmSync(directory, { force: true, recursive: true })
    }
  })
})

describe('Selected spec serialization dependencies', () => {
  const spec: Swagger.Spec2 = { info: { title: 'Example' }, swagger: '2.0', paths: {} }
  const reloadSerializer = () => {
    clearModule('@tsoa-next/cli/module/generate-spec')
    return require('@tsoa-next/cli/module/generate-spec') as typeof import('@tsoa-next/cli/module/generate-spec')
  }

  it('serializes JSON with YAML unavailable and retries a required YAML load after the dependency becomes available', async () => {
    let serializer: ReturnType<typeof reloadSerializer> | undefined
    await withBlockedRequires(
      id => id === 'yaml',
      () => {
        serializer = reloadSerializer()
        expect(serializer.serializeSpec(spec)).to.equal(JSON.stringify(spec, null, '\t'))
        expect(() => serializer!.serializeSpec(spec, true)).to.throw('unexpected CLI dependency load: yaml')
      },
    )
    expect(serializer!.serializeSpec(spec, true)).to.equal('info:\n  title: Example\nswagger: "2.0"\npaths: {}\n')
  })

  it('finishes JSON normalization before loading YAML so original normalization failures take precedence', async () => {
    let yamlLoads = 0
    await withBlockedRequires(
      id => {
        if (id === 'yaml') {
          yamlLoads++
          return true
        }
        return false
      },
      () => {
        const { serializeSpec } = reloadSerializer()
        const failure = new Error('JSON serialization failed')
        const throwing = {
          ...spec,
          toJSON() {
            throw failure
          },
        }
        expect(() => serializeSpec(throwing, true)).to.throw(failure)
        const unparseable = { ...spec, toJSON: () => undefined }
        expect(() => serializeSpec(unparseable, true)).to.throw(SyntaxError)
        const jsonResult: unknown = serializeSpec(unparseable)
        expect(jsonResult).to.be.undefined
        expect(yamlLoads).to.equal(0)
      },
    )
  })

  it('writes JSON without YAML and writes the requested YAML only after a later successful retry', async () => {
    const directory = mkdtempSync(join(tmpdir(), 'tsoa-selected-yaml-'))
    const metadata: Tsoa.Metadata = { controllers: [], referenceTypeMap: {} }
    const config = getDefaultExtendedOptions(directory, 'unused-entry.ts')
    let generator: ReturnType<typeof reloadSerializer> | undefined
    try {
      await withBlockedRequires(
        id => id === 'yaml',
        async () => {
          generator = reloadSerializer()
          expect(await generator.generateSpec(config, undefined, undefined, metadata)).to.equal(metadata)
          const before = readFileSync(join(directory, 'swagger.json'), 'utf8')
          let failure: unknown
          try {
            await generator.generateSpec({ ...config, yaml: true }, undefined, undefined, metadata)
          } catch (error) {
            failure = error
          }
          expect(failure).to.be.instanceOf(Error)
          expect((failure as Error).message).to.equal('unexpected CLI dependency load: yaml')
          expect(readdirSync(directory)).to.deep.equal(['swagger.json'])
          expect(readFileSync(join(directory, 'swagger.json'), 'utf8')).to.equal(before)
        },
      )
      expect(await generator!.generateSpec({ ...config, yaml: true }, undefined, undefined, metadata)).to.equal(metadata)
      expect(readFileSync(join(directory, 'swagger.yaml'), 'utf8')).to.contain('swagger: "2.0"')
    } finally {
      rmSync(directory, { force: true, recursive: true })
    }
  })
})

describe('Selected API compiler dependencies', () => {
  const reloadAPI = () => {
    clearModule('@tsoa-next/cli/api')
    return require('@tsoa-next/cli/api') as typeof import('@tsoa-next/cli/api')
  }
  const blocksMetadata = (id: string) => id.endsWith('/metadataGeneration/metadataGenerator')
  const createConfig = (directory: string): Config => {
    const entryFile = join(directory, 'entry.ts')
    const tsconfig = join(directory, 'tsconfig.json')
    writeFileSync(entryFile, 'export const entry = true\n')
    writeFileSync(tsconfig, JSON.stringify({ compilerOptions: { strict: true }, files: [entryFile] }))
    return { entryFile, tsconfig, spec: { outputDirectory: join(directory, 'spec') }, routes: { routesDir: join(directory, 'routes') } }
  }

  it('imports the direct API and resolves selected output configs without compiler analysis', async () => {
    const directory = mkdtempSync(join(tmpdir(), 'tsoa-api-lightweight-'))
    try {
      const config = createConfig(directory)
      await withBlockedRequires(
        id => id === 'typescript' || blocksMetadata(id),
        async () => {
          const api = reloadAPI()
          expect(api.validateCompilerOptions()).to.deep.equal({})
          expect(await api.validateSpecConfig(config)).to.have.property('entryFile', config.entryFile)
          expect(await api.validateRoutesConfig(config)).to.have.property('entryFile', config.entryFile)
          expect(readdirSync(directory).sort()).to.deep.equal(['entry.ts', 'tsconfig.json'])
        },
      )
    } finally {
      rmSync(directory, { force: true, recursive: true })
    }
  })

  it('requires compiler operations even with supplied metadata and recovers without loading metadata analysis', async () => {
    const directory = mkdtempSync(join(tmpdir(), 'tsoa-api-compiler-'))
    try {
      const config = createConfig(directory)
      const metadata: Tsoa.Metadata = { controllers: [], referenceTypeMap: {} }
      const api = await withBlockedRequires(
        id => id === 'typescript' || blocksMetadata(id),
        async () => {
          const api = reloadAPI()
          expect(() => api.validateCompilerOptions({ strict: true })).to.throw('unexpected CLI dependency load: typescript')
          expect(() => api.validateCompilerOptions(config)).to.throw('unexpected CLI dependency load: typescript')
          expect(() => api.validateCompilerOptions({ ...config, tsconfig: undefined }, directory)).to.throw('unexpected CLI dependency load: typescript')
          let failure: unknown
          try {
            await api.generateSpecAndRoutes({ configuration: config }, metadata)
          } catch (error) {
            failure = error
          }
          expect(failure).to.be.instanceOf(Error)
          expect((failure as Error).message).to.equal('unexpected CLI dependency load: typescript')
          return api
        },
      )
      await withBlockedRequires(blocksMetadata, async () => {
        expect(api.validateCompilerOptions({ strict: true })).to.have.property('strict', true)
        expect(api.validateCompilerOptions(config)).to.have.property('strict', true)
        for (const [configuration, reason] of [
          [{ ...config, compilerOptions: { target: 'not-a-target' } }, 'Invalid compilerOptions in tsoa-next config'],
          [{ ...config, tsconfig: join(directory, 'missing.json') }, 'Failed to read tsconfig'],
        ] as Array<[Config, string]>) {
          let failure: unknown
          try {
            await api.generateSpecAndRoutes({ configuration }, metadata)
          } catch (error) {
            failure = error
          }
          expect(failure).to.be.instanceOf(Error)
          expect((failure as Error).message).to.contain(reason)
        }
        expect(await api.generateSpecAndRoutes({ configuration: config }, metadata)).to.equal(metadata)
        expect(readFileSync(join(directory, 'spec', 'swagger.json'), 'utf8')).to.contain('"swagger": "2.0"')
        expect(readFileSync(join(directory, 'routes', 'routes.ts'), 'utf8')).to.contain('RegisterRoutes')
      })
    } finally {
      rmSync(directory, { force: true, recursive: true })
    }
  })

  it('loads required metadata analysis at route preparation and combined generation and supports a later retry', async () => {
    const directory = mkdtempSync(join(tmpdir(), 'tsoa-api-analysis-'))
    try {
      const config = createConfig(directory)
      config.entryFile = join(__dirname, '../../fixtures/controllers/getController.ts')
      const api = await withBlockedRequires(blocksMetadata, async () => {
        const api = reloadAPI()
        for (const generate of [() => api.generateRoutesFromArgs({ configuration: config }), () => api.generateSpecAndRoutes({ configuration: config })]) {
          let failure: unknown
          try {
            await generate()
          } catch (error) {
            failure = error
          }
          expect(failure).to.be.instanceOf(Error)
          expect((failure as Error).message).to.equal('unexpected CLI dependency load: ./metadataGeneration/metadataGenerator')
        }
        expect(readdirSync(directory).sort()).to.deep.equal(['entry.ts', 'tsconfig.json'])
        return api
      })
      const metadata = await api.generateSpecAndRoutes({ configuration: config })
      expect(metadata.controllers.map(controller => controller.name)).to.deep.equal(['GetTestController'])
      expect(readFileSync(join(directory, 'spec', 'swagger.json'), 'utf8')).to.contain('"swagger": "2.0"')
    } finally {
      rmSync(directory, { force: true, recursive: true })
    }
  })
})
