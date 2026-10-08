import { expect } from 'chai'
import 'mocha'
import Module = require('node:module')
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
      id => emitterName(id) !== undefined,
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
          return emitter !== undefined && !required.includes(emitter)
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
