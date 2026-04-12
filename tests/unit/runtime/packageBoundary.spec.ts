import { expect } from 'chai'
import 'mocha'
import Module = require('node:module')

const withBlockedRequires = (blocked: (id: string) => boolean, run: () => void) => {
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
    run()
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

  const modulePath = require.resolve(specifier)
  delete require.cache[modulePath]
  return require(specifier)
}

describe('Package boundary', () => {
  it('loads runtime exports from tsoa-next without touching CLI dependencies', () => {
    withBlockedRequires(
      id => id === '@tsoa-next/cli' || id.startsWith('@tsoa-next/cli/') || id === 'yargs' || id === 'yargs/helpers',
      () => {
        const runtime = reload('tsoa-next')

        expect(runtime.Get).to.be.a('function')
        expect(runtime.Route).to.be.a('function')
        expect(runtime.SpecPath).to.be.a('function')
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
    withBlockedRequires(
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
    withBlockedRequires(
      id => id === './api' || id === 'typescript' || id === 'yaml' || id.endsWith('/api') || id.endsWith('/module/generate-routes') || id.endsWith('/module/generate-spec'),
      () => {
        clearModule('../../../packages/cli/src/runCLI')
        const cliModule = require('../../../packages/cli/src/runCLI') as typeof import('../../../packages/cli/src/runCLI')

        expect(cliModule.runCLI).to.be.a('function')
      },
    )
  })
})
