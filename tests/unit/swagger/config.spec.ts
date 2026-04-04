import { expect } from 'chai'
import 'mocha'
import { validateSpecConfig, ExtendedSpecConfig } from '@tsoa-next/cli'
import { Config } from '@tsoa-next/runtime'
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { getDefaultOptions } from '../../fixtures/defaultOptions'

describe('Configuration', () => {
  describe('.validateSwaggerConfig', () => {
    it('should reject when spec is not set', done => {
      const config: Config = getDefaultOptions()
      Reflect.deleteProperty(config, 'spec')
      validateSpecConfig(config).catch(err => {
        expect(err.message).to.equal('Missing spec: configuration must contain spec. Spec used to be called swagger in previous versions of tsoa.')
        done()
      })
    })

    it('should reject when outputDirectory is not set', done => {
      const config: Config = getDefaultOptions()
      validateSpecConfig(config).then(
        _result => {
          throw new Error('Should not get here, expecting error regarding outputDirectory')
        },
        err => {
          expect(err.message).to.equal('Missing outputDirectory: configuration must contain output directory.')
          done()
        },
      )
    })

    it('should reject when entryFile is not set and controllerPathGlobs is unset or empty', done => {
      const config: Config = getDefaultOptions('some/output/directory')
      expect(config.entryFile).not.to.be.ok
      expect(config.controllerPathGlobs).to.be.an('array').that.has.length(0)
      validateSpecConfig(config).then(
        _result => {
          throw new Error('Should not get here, expecting error regarding entryFile')
        },
        err => {
          expect(err.message).to.equal('Missing entryFile and controllerPathGlobs: Configuration must contain an entry point file or controller path globs.')
          done()
        },
      )
    })

    it('should pass when entryFile is not set but controllerPathGlobs is given', done => {
      const config: Config = getDefaultOptions('some/output/directory')
      config.controllerPathGlobs = ['/some/path']
      expect(config.entryFile).not.to.be.ok
      expect(config.controllerPathGlobs).to.be.an('array').that.does.not.have.length(0)
      validateSpecConfig(config).then(result => {
        expect(result).to.be.ok
        done()
      })
    })

    it('should set the default API version', done => {
      const config: Config = getDefaultOptions('some/output/directory', 'tsoa.json')
      validateSpecConfig(config).then((configResult: ExtendedSpecConfig) => {
        expect(configResult.version).to.equal('1.0.0')
        done()
      })
    })

    it('should set the default Spec version 2 when not specified', done => {
      const config: Config = getDefaultOptions('some/output/directory', 'tsoa.json')
      validateSpecConfig(config).then((configResult: ExtendedSpecConfig) => {
        expect(configResult.specVersion).to.equal(2)
        done()
      })
    })

    it('should reject an unsupported Spec version', done => {
      const config: Config = getDefaultOptions('some/output/directory', 'tsoa.json')
      Reflect.set(config.spec, 'specVersion', -2)
      validateSpecConfig(config).then(
        (_configResult: ExtendedSpecConfig) => {
          throw new Error('Should not get here, expecting error regarding unsupported Spec version')
        },
        err => {
          expect(err.message).to.equal('Unsupported Spec version: -2.')
          done()
        },
      )
    })

    it('should accept Spec version 3 when specified', done => {
      const config: Config = getDefaultOptions('some/output/directory', 'tsoa.json')
      config.spec.specVersion = 3
      validateSpecConfig(config).then((configResult: ExtendedSpecConfig) => {
        expect(configResult.specVersion).to.equal(3)
        done()
      })
    })

    it('should set the default spec operationIdTemplate when not specified', done => {
      const config: Config = getDefaultOptions('some/output/directory', 'tsoa.json')
      delete config.spec.operationIdTemplate
      validateSpecConfig(config).then((configResult: ExtendedSpecConfig) => {
        expect(configResult.operationIdTemplate).to.equal('{{titleCase method.name}}')
        done()
      })
    })

    it('should parse string author contact information without regex backtracking', async () => {
      const config: Config = getDefaultOptions('some/output/directory')
      config.entryFile = ''
      config.controllerPathGlobs = ['/some/path']
      delete config.spec.contact

      const configResult = await withCliModuleForPackageJson({ author: 'Jane Doe <jane@doe.com> (https://example.com)' }, (reloadedValidateSpecConfig: typeof validateSpecConfig) =>
        reloadedValidateSpecConfig(config),
      )

      expect(configResult.contact).to.deep.equal({
        email: 'jane@doe.com',
        name: 'Jane Doe',
        url: 'https://example.com',
      })
    })

    it('should ignore incomplete author segments without hanging', async () => {
      const config: Config = getDefaultOptions('some/output/directory')
      config.entryFile = ''
      config.controllerPathGlobs = ['/some/path']
      delete config.spec.contact

      const configResult = await withCliModuleForPackageJson({ author: 'Jane Doe <jane@doe.com' }, (reloadedValidateSpecConfig: typeof validateSpecConfig) => reloadedValidateSpecConfig(config))

      expect(configResult.contact).to.deep.equal({
        name: 'Jane Doe',
      })
    })

    it('should not set a default API license when package.json has no license', async () => {
      const config: Config = getDefaultOptions('some/output/directory')
      config.entryFile = ''
      config.controllerPathGlobs = ['/some/path']
      delete config.spec.license

      const configResult = await withCliModuleForPackageJson({}, (reloadedValidateSpecConfig: typeof validateSpecConfig) => reloadedValidateSpecConfig(config))

      expect(configResult.license).to.equal(undefined)
    })

    it('should use package.json license when available', async () => {
      const config: Config = getDefaultOptions('some/output/directory')
      config.entryFile = ''
      config.controllerPathGlobs = ['/some/path']
      delete config.spec.license

      const configResult = await withCliModuleForPackageJson({ license: 'Apache-2.0' }, (reloadedValidateSpecConfig: typeof validateSpecConfig) => reloadedValidateSpecConfig(config))

      expect(configResult.license).to.equal('Apache-2.0')
    })
  })
})

async function withCliModuleForPackageJson<T>(packageJson: Record<string, unknown>, callback: (reloadedValidateSpecConfig: typeof validateSpecConfig) => Promise<T>): Promise<T> {
  const workingDirectory = mkdtempSync(join(tmpdir(), 'tsoa-cli-config-'))
  const previousWorkingDirectory = process.cwd()
  const modulePath = require.resolve('../../../packages/cli/src/api')

  writeFileSync(join(workingDirectory, 'package.json'), JSON.stringify(packageJson), 'utf8')

  try {
    process.chdir(workingDirectory)
    delete require.cache[modulePath]

    const reloadedCliModule: unknown = require(modulePath)
    if (!isCliModule(reloadedCliModule)) {
      throw new Error('Failed to reload validateSpecConfig from the CLI module.')
    }

    return await callback(reloadedCliModule.validateSpecConfig)
  } finally {
    delete require.cache[modulePath]
    process.chdir(previousWorkingDirectory)
    rmSync(workingDirectory, { force: true, recursive: true })
  }
}

const isCliModule = (value: unknown): value is { validateSpecConfig: typeof validateSpecConfig } => {
  return typeof value === 'object' && value !== null && 'validateSpecConfig' in value && typeof value.validateSpecConfig === 'function'
}
