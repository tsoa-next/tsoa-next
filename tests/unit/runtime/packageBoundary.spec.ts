import { expect } from 'chai'
import 'mocha'

type ModuleLoader = {
  prototype: { require: (id: string) => unknown }
}

const withBlockedRequires = (blocked: (id: string) => boolean, run: () => void) => {
  const moduleLoader = require('node:module') as ModuleLoader
  const originalRequire = moduleLoader.prototype.require

  moduleLoader.prototype.require = function patchedRequire(id: string) {
    if (blocked(id)) {
      throw new Error(`unexpected CLI dependency load: ${id}`)
    }

    return originalRequire.apply(this, [id])
  }

  try {
    run()
  } finally {
    moduleLoader.prototype.require = originalRequire
  }
}

const reload = <T>(specifier: string): T => {
  const modulePath = require.resolve(specifier)
  delete require.cache[modulePath]
  return require(specifier) as T
}

describe('Package boundary', () => {
  it('loads runtime exports from tsoa-next without touching CLI dependencies', () => {
    withBlockedRequires(
      id => id === '@tsoa-next/cli' || id.startsWith('@tsoa-next/cli/') || id === 'yargs' || id === 'yargs/helpers',
      () => {
        const runtime = reload<typeof import('tsoa-next')>('tsoa-next')

        expect(runtime.Get).to.be.a('function')
        expect(runtime.Route).to.be.a('function')
        expect('generateRoutes' in runtime).to.equal(false)
      },
    )
  })

  it('loads programmatic APIs from tsoa-next/cli without touching yargs eagerly', () => {
    withBlockedRequires(
      id => id === 'yargs' || id === 'yargs/helpers',
      () => {
        const cli = reload<typeof import('tsoa-next/cli')>('tsoa-next/cli')

        expect(cli.generateRoutes).to.be.a('function')
        expect(cli.generateSpec).to.be.a('function')
        expect(cli.generateSpecAndRoutes).to.be.a('function')
        expect(cli.validateCompilerOptions).to.be.a('function')
        expect(cli.runCLI).to.be.a('function')
      },
    )
  })
})
