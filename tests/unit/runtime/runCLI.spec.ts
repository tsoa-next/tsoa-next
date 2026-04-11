import { expect } from 'chai'
import 'mocha'
import Module = require('node:module')

type CLIExports = Pick<typeof import('../../../packages/cli/src/api'), 'generateRoutesFromArgs' | 'generateSpecAndRoutes' | 'generateSpecFromArgs'>
type DiscoveryExports = Pick<typeof import('../../../packages/cli/src/discovery'), 'discoverConfigs' | 'getDefaultDiscoverRoot'>

const cliModulePath = require.resolve('../../../packages/cli/src/api')
const discoveryModulePath = require.resolve('../../../packages/cli/src/discovery')
const runCLIModulePath = require.resolve('../../../packages/cli/src/runCLI')
const originalArgv = [...process.argv]

const clearModule = (modulePath: string) => {
  delete require.cache[modulePath]
}

const setModuleExports = (modulePath: string, moduleExports: unknown) => {
  const stubbedModule = new Module(modulePath, module)
  stubbedModule.exports = moduleExports
  stubbedModule.loaded = true
  require.cache[modulePath] = stubbedModule
}

const setCLIExports = (cliExports: CLIExports) => {
  setModuleExports(cliModulePath, cliExports)
}

const setDiscoveryExports = (discoveryExports?: Partial<DiscoveryExports>) => {
  setModuleExports(discoveryModulePath, {
    async discoverConfigs() {
      return {
        effectiveRoot: '/mock',
        matches: [],
        mode: 'path',
      }
    },
    getDefaultDiscoverRoot() {
      return '/mock'
    },
    ...discoveryExports,
  })
}

const loadRunCLI = (cliExports: CLIExports, discoveryExports?: Partial<DiscoveryExports>): typeof import('../../../packages/cli/src/runCLI').runCLI => {
  clearModule(cliModulePath)
  clearModule(discoveryModulePath)
  clearModule(runCLIModulePath)
  setCLIExports(cliExports)
  setDiscoveryExports(discoveryExports)

  return require('../../../packages/cli/src/runCLI').runCLI
}

describe('runCLI', () => {
  afterEach(() => {
    clearModule(cliModulePath)
    clearModule(discoveryModulePath)
    clearModule(runCLIModulePath)
    process.argv = [...originalArgv]
  })

  it('dispatches the spec command without exposing CLI-only helpers on the public surface', async () => {
    const calls: Array<Parameters<CLIExports['generateSpecFromArgs']>[0]> = []
    const runCLI = loadRunCLI({
      async generateSpecFromArgs(args) {
        calls.push(args)
      },
      async generateRoutesFromArgs() {
        throw new Error('routes command should not run')
      },
      async generateSpecAndRoutes() {
        throw new Error('spec-and-routes command should not run')
      },
    })

    process.argv = ['node', 'tsoa', 'spec', '--configuration', 'custom.json', '--basePath', '/v1', '--host', 'api.example.com', '--yaml']

    await runCLI()

    expect(calls).to.have.length(1)
    const [args] = calls

    if (!args) {
      throw new Error('Expected spec arguments to be captured.')
    }

    expect(args.configuration).to.equal('custom.json')
    expect(args.basePath).to.equal('/v1')
    expect(args.host).to.equal('api.example.com')
    expect(args.yaml).to.equal(true)
    expect(args.json).to.not.equal(true)
  })

  it('dispatches the routes command', async () => {
    const calls: Array<Parameters<CLIExports['generateRoutesFromArgs']>[0]> = []
    const runCLI = loadRunCLI({
      async generateSpecFromArgs() {
        throw new Error('spec command should not run')
      },
      async generateRoutesFromArgs(args) {
        calls.push(args)
      },
      async generateSpecAndRoutes() {
        throw new Error('spec-and-routes command should not run')
      },
    })

    process.argv = ['node', 'tsoa', 'routes', '--configuration', 'routes.json', '--basePath', '/routes']

    await runCLI()

    expect(calls).to.have.length(1)
    const [args] = calls

    if (!args) {
      throw new Error('Expected route arguments to be captured.')
    }

    expect(args.configuration).to.equal('routes.json')
    expect(args.basePath).to.equal('/routes')
  })

  it('dispatches the spec-and-routes command', async () => {
    const calls: Array<Parameters<CLIExports['generateSpecAndRoutes']>[0]> = []
    const runCLI = loadRunCLI({
      async generateSpecFromArgs() {
        throw new Error('spec command should not run')
      },
      async generateRoutesFromArgs() {
        throw new Error('routes command should not run')
      },
      async generateSpecAndRoutes(args) {
        calls.push(args)
        return {
          controllers: [],
          referenceTypeMap: {},
        }
      },
    })

    process.argv = ['node', 'tsoa', 'spec-and-routes', '--configuration', 'combined.json', '--json']

    await runCLI()

    expect(calls).to.have.length(1)
    const [args] = calls

    if (!args) {
      throw new Error('Expected spec-and-routes arguments to be captured.')
    }

    expect(args.configuration).to.equal('combined.json')
    expect(args.json).to.equal(true)
    expect(args.yaml).to.not.equal(true)
  })

  it('prints discovered configs for the standalone discover command', async () => {
    const runCLI = loadRunCLI(
      {
        async generateSpecFromArgs() {
          throw new Error('spec command should not run')
        },
        async generateRoutesFromArgs() {
          throw new Error('routes command should not run')
        },
        async generateSpecAndRoutes() {
          throw new Error('spec-and-routes command should not run')
        },
      },
      {
        async discoverConfigs() {
          return {
            effectiveRoot: '/mock',
            matches: [
              {
                absolutePath: '/mock/a/tsoa.json',
                displayPath: 'a/tsoa.json',
                sortKey: 'a/tsoa.json',
              },
              {
                absolutePath: '/mock/b/tsoa.yaml',
                displayPath: 'b/tsoa.yaml',
                sortKey: 'b/tsoa.yaml',
              },
            ],
            mode: 'path',
          }
        },
      },
    )

    process.argv = ['node', 'tsoa', 'discover']

    const originalStdoutWrite = process.stdout.write.bind(process.stdout)
    const output: string[] = []
    process.stdout.write = ((chunk: string | Uint8Array) => {
      output.push(typeof chunk === 'string' ? chunk : Buffer.from(chunk).toString('utf8'))
      return true
    }) as typeof process.stdout.write

    try {
      await runCLI()
    } finally {
      process.stdout.write = originalStdoutWrite
    }

    expect(output.join('')).to.equal('a/tsoa.json\nb/tsoa.yaml\n')
  })

  it('dispatches one spec run per discovered config', async () => {
    const calls: Array<Parameters<CLIExports['generateSpecFromArgs']>[0]> = []
    const runCLI = loadRunCLI(
      {
        async generateSpecFromArgs(args) {
          calls.push(args)
        },
        async generateRoutesFromArgs() {
          throw new Error('routes command should not run')
        },
        async generateSpecAndRoutes() {
          throw new Error('spec-and-routes command should not run')
        },
      },
      {
        async discoverConfigs() {
          return {
            effectiveRoot: '/mock',
            matches: [
              {
                absolutePath: '/mock/a/tsoa.json',
                displayPath: 'a/tsoa.json',
                sortKey: 'a/tsoa.json',
              },
              {
                absolutePath: '/mock/b/tsoa.yaml',
                displayPath: 'b/tsoa.yaml',
                sortKey: 'b/tsoa.yaml',
              },
            ],
            mode: 'path',
          }
        },
      },
    )

    process.argv = ['node', 'tsoa', 'spec', '--discover', 'packages/*', '--host', 'api.example.com']

    await runCLI()

    expect(calls).to.have.length(2)
    expect(calls.map(call => call.configuration).sort()).to.deep.equal(['/mock/a/tsoa.json', '/mock/b/tsoa.yaml'])
    expect(calls.every(call => call.host === 'api.example.com')).to.equal(true)
  })

  it('dispatches one routes run per discovered config', async () => {
    const calls: Array<Parameters<CLIExports['generateRoutesFromArgs']>[0]> = []
    const runCLI = loadRunCLI(
      {
        async generateSpecFromArgs() {
          throw new Error('spec command should not run')
        },
        async generateRoutesFromArgs(args) {
          calls.push(args)
        },
        async generateSpecAndRoutes() {
          throw new Error('spec-and-routes command should not run')
        },
      },
      {
        async discoverConfigs() {
          return {
            effectiveRoot: '/mock',
            matches: [
              {
                absolutePath: '/mock/a/tsoa.json',
                displayPath: 'a/tsoa.json',
                sortKey: 'a/tsoa.json',
              },
              {
                absolutePath: '/mock/b/tsoa.json',
                displayPath: 'b/tsoa.json',
                sortKey: 'b/tsoa.json',
              },
            ],
            mode: 'path',
          }
        },
      },
    )

    process.argv = ['node', 'tsoa', 'routes', '--discover', 'packages/*', '--basePath', '/routes']

    await runCLI()

    expect(calls).to.have.length(2)
    expect(calls.every(call => call.basePath === '/routes')).to.equal(true)
  })

  it('dispatches one spec-and-routes run per discovered config', async () => {
    const calls: Array<Parameters<CLIExports['generateSpecAndRoutes']>[0]> = []
    const runCLI = loadRunCLI(
      {
        async generateSpecFromArgs() {
          throw new Error('spec command should not run')
        },
        async generateRoutesFromArgs() {
          throw new Error('routes command should not run')
        },
        async generateSpecAndRoutes(args) {
          calls.push(args)
          return {
            controllers: [],
            referenceTypeMap: {},
          }
        },
      },
      {
        async discoverConfigs() {
          return {
            effectiveRoot: '/mock',
            matches: [
              {
                absolutePath: '/mock/a/tsoa.json',
                displayPath: 'a/tsoa.json',
                sortKey: 'a/tsoa.json',
              },
              {
                absolutePath: '/mock/b/tsoa.json',
                displayPath: 'b/tsoa.json',
                sortKey: 'b/tsoa.json',
              },
            ],
            mode: 'path',
          }
        },
      },
    )

    process.argv = ['node', 'tsoa', 'spec-and-routes', '--discover', 'packages/*', '--json']

    await runCLI()

    expect(calls).to.have.length(2)
    expect(calls.every(call => call.json === true)).to.equal(true)
  })

  it('rejects mixing discover and configuration options', async () => {
    const runCLI = loadRunCLI({
      async generateSpecFromArgs() {
        throw new Error('spec command should not run')
      },
      async generateRoutesFromArgs() {
        throw new Error('routes command should not run')
      },
      async generateSpecAndRoutes() {
        throw new Error('spec-and-routes command should not run')
      },
    })

    process.argv = ['node', 'tsoa', 'spec', '--configuration', 'custom.json', '--discover', 'packages/*']

    let thrownError: Error | undefined

    try {
      await runCLI()
    } catch (error) {
      if (error instanceof Error) {
        thrownError = error
      } else {
        throw error
      }
    }

    expect(thrownError?.message).to.equal('The --configuration and --discover options cannot be used together.')
  })

  it('fails discover when no config files are found', async () => {
    const runCLI = loadRunCLI(
      {
        async generateSpecFromArgs() {
          throw new Error('spec command should not run')
        },
        async generateRoutesFromArgs() {
          throw new Error('routes command should not run')
        },
        async generateSpecAndRoutes() {
          throw new Error('spec-and-routes command should not run')
        },
      },
      {
        async discoverConfigs() {
          return {
            effectiveRoot: '/mock',
            matches: [],
            mode: 'path',
          }
        },
      },
    )

    process.argv = ['node', 'tsoa', 'discover']

    let thrownError: Error | undefined

    try {
      await runCLI()
    } catch (error) {
      if (error instanceof Error) {
        thrownError = error
      } else {
        throw error
      }
    }

    expect(thrownError?.message).to.equal("No tsoa config files found for '/mock'.")
  })

  it('aggregates failures from discovered generation runs', async () => {
    const runCLI = loadRunCLI(
      {
        async generateSpecFromArgs(args) {
          if (args.configuration === '/mock/bad/tsoa.json') {
            throw new Error('spec failed')
          }
        },
        async generateRoutesFromArgs() {
          throw new Error('routes command should not run')
        },
        async generateSpecAndRoutes() {
          throw new Error('spec-and-routes command should not run')
        },
      },
      {
        async discoverConfigs() {
          return {
            effectiveRoot: '/mock',
            matches: [
              {
                absolutePath: '/mock/good/tsoa.json',
                displayPath: 'good/tsoa.json',
                sortKey: 'good/tsoa.json',
              },
              {
                absolutePath: '/mock/bad/tsoa.json',
                displayPath: 'bad/tsoa.json',
                sortKey: 'bad/tsoa.json',
              },
            ],
            mode: 'path',
          }
        },
      },
    )

    process.argv = ['node', 'tsoa', 'spec', '--discover', 'packages/*']

    let thrownError: Error | undefined

    try {
      await runCLI()
    } catch (error) {
      if (error instanceof Error) {
        thrownError = error
      } else {
        throw error
      }
    }

    expect(thrownError?.message).to.equal('Failed spec for discovered config files:\n- bad/tsoa.json: spec failed')
  })

  it('propagates command handler failures', async () => {
    const expectedError = new Error('spec failed')
    const runCLI = loadRunCLI({
      async generateSpecFromArgs() {
        throw expectedError
      },
      async generateRoutesFromArgs() {
        throw new Error('routes command should not run')
      },
      async generateSpecAndRoutes() {
        throw new Error('spec-and-routes command should not run')
      },
    })

    process.argv = ['node', 'tsoa', 'spec']

    let thrownError: Error | undefined

    try {
      await runCLI()
    } catch (error) {
      if (error instanceof Error) {
        thrownError = error
      } else {
        throw error
      }
    }

    expect(thrownError).to.equal(expectedError)
  })

  it('prints CLI help before throwing on invalid command usage', async () => {
    const runCLI = loadRunCLI({
      async generateSpecFromArgs() {
        throw new Error('spec command should not run')
      },
      async generateRoutesFromArgs() {
        throw new Error('routes command should not run')
      },
      async generateSpecAndRoutes() {
        throw new Error('spec-and-routes command should not run')
      },
    })

    process.argv = ['node', 'tsoa']

    const originalConsoleError = console.error
    const renderedErrors: string[] = []
    console.error = (...args: unknown[]) => {
      renderedErrors.push(args.map(value => String(value)).join(' '))
    }

    let thrownError: Error | undefined

    try {
      await runCLI()
    } catch (error) {
      if (error instanceof Error) {
        thrownError = error
      } else {
        throw error
      }
    } finally {
      console.error = originalConsoleError
    }

    expect(thrownError?.message).to.equal('Must provide a valid command.')

    const renderedHelp = renderedErrors.join('\n')
    expect(renderedHelp).to.contain('Usage: tsoa <command> [options]')
    expect(renderedHelp).to.contain('discover')
    expect(renderedHelp).to.contain('spec-and-routes')
  })
})
