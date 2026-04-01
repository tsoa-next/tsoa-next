import { expect } from 'chai'
import 'mocha'
import Module = require('node:module')

type CLIExports = Pick<typeof import('../../../packages/cli/src/api'), 'generateRoutesFromArgs' | 'generateSpecAndRoutes' | 'generateSpecFromArgs'>

const cliModulePath = require.resolve('../../../packages/cli/src/api')
const runCLIModulePath = require.resolve('../../../packages/cli/src/runCLI')
const originalArgv = [...process.argv]

const clearModule = (modulePath: string) => {
  delete require.cache[modulePath]
}

const setCLIExports = (cliExports: CLIExports) => {
  const stubbedModule = new Module(cliModulePath, module)
  stubbedModule.exports = cliExports
  stubbedModule.loaded = true
  require.cache[cliModulePath] = stubbedModule
}

const loadRunCLI = (cliExports: CLIExports): typeof import('../../../packages/cli/src/runCLI').runCLI => {
  clearModule(cliModulePath)
  clearModule(runCLIModulePath)
  setCLIExports(cliExports)

  return require('../../../packages/cli/src/runCLI').runCLI
}

describe('runCLI', () => {
  afterEach(() => {
    clearModule(cliModulePath)
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
    expect(renderedHelp).to.contain('spec-and-routes')
  })
})
