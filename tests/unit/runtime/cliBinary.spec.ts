import { expect } from 'chai'
import 'mocha'
import { spawnSync } from 'node:child_process'
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'
import { createRequire } from 'node:module'
import { minVersion, satisfies } from 'semver'
import { stringify } from 'yaml'
import type { Config } from '@tsoa-next/runtime'

const cliPackagePath = require.resolve('../../../packages/cli/package.json')
const cliPackage = require(cliPackagePath) as { version: string; engines: { node: string } }
const packageVersion = cliPackage.version
const binaries = [
  { name: '@tsoa-next/cli', path: resolve(__dirname, '../../../packages/cli/dist/cli.js') },
  { name: 'tsoa-next', path: resolve(__dirname, '../../../packages/tsoa/dist/cli-bin.js') },
]
const commands = ['template-check', 'discover', 'generate', 'check', 'spec', 'routes', 'spec-and-routes']
const nodeExecutable = process.env.TSOA_CLI_TEST_NODE ?? process.execPath

describe('CLI executables', () => {
  let directory: string

  beforeEach(() => {
    directory = mkdtempSync(join(tmpdir(), 'tsoa-cli-binary-'))
    writeFileSync(join(directory, 'package.json'), JSON.stringify({ name: 'consumer', version: '0.0.9', type: 'module' }))
  })

  afterEach(() => rmSync(directory, { force: true, recursive: true }))

  const run = (binary: string, args: string[]) => spawnSync(nodeExecutable, [binary, ...args], { cwd: directory, encoding: 'utf8', timeout: 30000 })

  it('keeps the parser compatible with the declared minimum Node version', () => {
    const minimumNodeVersion = minVersion(cliPackage.engines.node)
    const parserPackage = createRequire(cliPackagePath)('yargs/package.json') as { engines: { node: string } }
    expect(minimumNodeVersion).to.not.be.null
    expect(satisfies(minimumNodeVersion?.version ?? '', parserPackage.engines.node)).to.be.true
  })

  for (const binary of binaries) {
    describe(binary.name, () => {
      it('reports the installed CLI version independently of the consumer package', () => {
        const result = run(binary.path, ['--version'])
        expect(result.error).to.be.undefined
        expect(result.status).to.equal(0)
        expect(result.stdout).to.equal(`${packageVersion}\n`)
        expect(result.stderr).to.equal('')
      })

      for (const args of [['--help'], ['-h'], ...commands.map(command => [command, '--help'])]) {
        it(`shows help for ${args.join(' ')} without a config`, () => {
          const result = run(binary.path, args)
          expect(result.status).to.equal(0)
          expect(result.stdout).to.contain('tsoa')
          expect(result.stdout).to.contain('--help')
          expect(result.stderr).to.equal('')
        })
      }

      const invalidArguments = [
        { args: [], message: 'Must provide a valid command.' },
        { args: ['not-a-command'], message: 'Unknown argument' },
        { args: ['spec', '--typo'], message: 'Unknown argument' },
        { args: ['routes', '--host', 'api.example.com'], message: 'Unknown argument' },
        { args: ['template-check', '--configuration'], message: 'Not enough arguments following' },
        { args: ['template-check', '--discover', '.'], message: 'Unknown argument' },
        { args: ['template-check', 'extra'], message: 'Unknown argument' },
        { args: ['discover', '.', 'extra'], message: 'Unknown argument' },
        { args: ['spec', 'extra'], message: 'Unknown argument' },
        ...['--configuration', '-c', '--discover', '--host', '--basePath'].map(option => ({ args: ['spec', option], message: 'Not enough arguments following' })),
        { args: ['spec', '-c', 'tsoa.json', '--discover', '.'], message: 'cannot be used together' },
        { args: ['discover'], message: 'No tsoa config files found' },
        { args: ['spec'], message: 'tsoa.json' },
      ]
      for (const { args, message } of invalidArguments) {
        it(`fails with a diagnostic for ${args.join(' ') || 'no command'}`, () => {
          const result = run(binary.path, args)
          expect(result.status).to.equal(1)
          expect(result.stderr).to.contain(message)
          expect(existsSync(join(directory, 'spec'))).to.be.false
          expect(existsSync(join(directory, 'routes'))).to.be.false
        })
      }
    })
  }

  const createFixture = () => {
    const entryFile = join(directory, 'controller.ts')
    const runtimePath = resolve(__dirname, '../../../packages/runtime/dist/index')
    writeFileSync(entryFile, `import { Get, Route } from ${JSON.stringify(runtimePath)}\n@Route('example')\nexport class ExampleController {\n @Get()\n public get(): string { return 'ok' }\n}\n`)
    const config: Config = {
      entryFile,
      spec: { outputDirectory: join(directory, 'spec'), specVersion: 3.1 },
      routes: { routesDir: join(directory, 'routes') },
    }
    const configPath = join(directory, 'tsoa.json')
    writeFileSync(configPath, JSON.stringify(config))
    return { config, configPath, specPath: join(directory, 'spec', 'swagger.json'), routesPath: join(directory, 'routes', 'routes.ts') }
  }

  for (const args of [['--help'], ['--version'], ['discover']]) {
    it(`executes ${args.join(' ')} while generation dependencies are unavailable`, () => {
      createFixture()
      const preload = join(directory, 'block-generation.cjs')
      writeFileSync(
        preload,
        `const Module = require('node:module')
const original = Module.prototype.require
Module.prototype.require = function (id) {
  if (id === 'typescript' || id === 'yaml' || id === './api') {
    throw new Error('blocked generation dependency: ' + id)
  }
  return original.call(this, id)
}
`,
      )
      for (const binary of binaries) {
        const result = spawnSync(nodeExecutable, ['--require', preload, binary.path, ...args], { cwd: directory, encoding: 'utf8', timeout: 30000 })
        expect(result.error).to.be.undefined
        expect(result.status, result.stderr).to.equal(0)
        expect(result.stdout).to.contain(args[0] === '--version' ? packageVersion : args[0] === 'discover' ? 'tsoa.json' : 'tsoa')
        expect(result.stderr).to.equal('')
      }
    })
  }

  it('generates a spec independently of unavailable route integrations', () => {
    const { config, configPath, specPath, routesPath } = createFixture()
    config.routes = {
      ...config.routes,
      authenticationModule: join(directory, 'missing-authentication.ts'),
      iocModule: join(directory, 'missing-ioc.ts'),
      middlewareTemplate: join(directory, 'missing-template.hbs'),
    }
    writeFileSync(configPath, JSON.stringify({ ...config, routes: { ...config.routes, routeGenerator: join(directory, 'missing-generator.cjs') } }))
    const spec = run(binaries[1].path, ['spec'])
    expect(spec.status, spec.stderr).to.equal(0)
    expect(readFileSync(specPath, 'utf8')).to.contain('"openapi": "3.1.0"')
    expect(existsSync(routesPath)).to.be.false

    const routes = run(binaries[1].path, ['routes'])
    expect(routes.status).to.equal(1)
    expect(routes.stderr).to.contain('No authenticationModule file found')
    expect(routes.stderr).to.contain('missing-authentication.ts')
    expect(existsSync(routesPath)).to.be.false
  })

  it('reports a missing selected route template when emission reaches it', () => {
    const { config, configPath, routesPath } = createFixture()
    config.routes.middlewareTemplate = join(directory, 'missing-template.hbs')
    writeFileSync(configPath, JSON.stringify(config))
    const result = run(binaries[1].path, ['routes'])
    expect(result.status).to.equal(1)
    expect(result.stderr).to.contain('ENOENT')
    expect(result.stderr).to.contain('missing-template.hbs')
    expect(existsSync(routesPath)).to.be.false
  })

  it('generates built-in routes without validating unused spec output settings', () => {
    const { config, configPath, routesPath } = createFixture()
    config.spec.outputDirectory = ''
    writeFileSync(configPath, JSON.stringify(config))
    const result = run(binaries[1].path, ['routes'])
    expect(result.status, result.stderr).to.equal(0)
    expect(readFileSync(routesPath, 'utf8')).to.contain('ExampleController')
    expect(existsSync(join(directory, 'spec'))).to.be.false
  })

  for (const command of ['spec', 'spec-and-routes']) {
    it(`validates required spec output settings for ${command}`, () => {
      const { config, configPath, routesPath } = createFixture()
      config.spec.outputDirectory = ''
      writeFileSync(configPath, JSON.stringify(config))
      const result = run(binaries[1].path, [command])
      expect(result.status).to.equal(1)
      expect(result.stderr).to.contain('Missing outputDirectory')
      expect(existsSync(routesPath)).to.be.false
    })
  }

  it('validates a required specification snapshot when routes expose SpecPath', () => {
    const { config, configPath, routesPath } = createFixture()
    const runtimePath = resolve(__dirname, '../../../packages/runtime/dist/index')
    writeFileSync(
      config.entryFile,
      `import { Get, Route, SpecPath } from ${JSON.stringify(runtimePath)}\n@Route('example')\n@SpecPath()\nexport class ExampleController {\n @Get()\n public get(): string { return 'ok' }\n}\n`,
    )
    config.spec.outputDirectory = ''
    writeFileSync(configPath, JSON.stringify(config))
    const result = run(binaries[1].path, ['routes'])
    expect(result.status).to.equal(1)
    expect(result.stderr).to.contain('Missing outputDirectory')
    expect(existsSync(routesPath)).to.be.false

    config.spec.outputDirectory = join(directory, 'spec')
    writeFileSync(configPath, JSON.stringify(config))
    const generated = run(binaries[1].path, ['routes'])
    expect(generated.status, generated.stderr).to.equal(0)
    expect(readFileSync(routesPath, 'utf8')).to.contain('createEmbeddedSpecGenerator')
    expect(readFileSync(routesPath, 'utf8')).to.contain('3.1.0')
    expect(existsSync(config.spec.outputDirectory)).to.be.false
  })

  it('preserves specification context for selected custom templates', () => {
    const { config, configPath, routesPath } = createFixture()
    const templatePath = join(directory, 'custom.hbs')
    writeFileSync(templatePath, '{{{json runtimeSpecConfig}}}')
    config.routes.middlewareTemplate = templatePath
    config.spec.name = 'Custom specification'
    writeFileSync(configPath, JSON.stringify(config))
    const generated = run(binaries[1].path, ['routes'])
    expect(generated.status, generated.stderr).to.equal(0)
    const context = JSON.parse(readFileSync(routesPath, 'utf8')) as { spec: { name: string }; metadata: { controllers: unknown[] } }
    expect(context.spec.name).to.equal('Custom specification')
    expect(context.metadata.controllers).to.have.length(1)

    config.spec.outputDirectory = ''
    writeFileSync(configPath, JSON.stringify(config))
    const invalid = run(binaries[1].path, ['routes'])
    expect(invalid.status).to.equal(1)
    expect(invalid.stderr).to.contain('Missing outputDirectory')
  })

  it('preserves specification options passed to a selected custom generator', () => {
    const { config, configPath, routesPath } = createFixture()
    const generatorPath = join(directory, 'custom-generator.cjs')
    writeFileSync(
      generatorPath,
      `const fs = require('node:fs')
module.exports = class CustomGenerator {
  constructor(metadata, options) { this.options = options }
  async GenerateCustomRoutes() {
    fs.writeFileSync(this.options.routesDir + '/routes.ts', JSON.stringify(this.options.runtimeSpecConfig))
  }
}
`,
    )
    config.spec.name = 'Generator specification'
    writeFileSync(configPath, JSON.stringify({ ...config, routes: { ...config.routes, routeGenerator: generatorPath } }))
    const generated = run(binaries[1].path, ['routes'])
    expect(generated.status, generated.stderr).to.equal(0)
    const snapshot = JSON.parse(readFileSync(routesPath, 'utf8')) as { spec: { name: string } }
    expect(snapshot.spec.name).to.equal('Generator specification')
  })

  it('reports a discovered config failure with its cause and supported retry arguments', () => {
    const { config, configPath } = createFixture()
    config.spec.outputDirectory = ''
    writeFileSync(configPath, JSON.stringify(config))
    for (const command of ['spec', 'check']) {
      const args = command === 'spec' ? ['spec', '--discover', configPath] : ['check', configPath]
      const result = run(binaries[1].path, args)
      expect(result.status).to.equal(1)
      expect(result.stderr).to.contain(`[tsoa.json] Failed ${command}:`)
      expect(result.stderr).to.contain('Missing outputDirectory')
      expect(result.stderr).to.contain('[tsoa.json] Next action:')
      expect(result.stderr).to.contain(command === 'spec' ? '--configuration set to' : 'path argument set to')
      expect(result.stderr).to.contain(JSON.stringify(configPath))
      expect(result.stderr).to.contain(`Failed ${command} for discovered config files:`)
    }
  })

  const createTemplateFixture = (template: string) => {
    const fixture = createFixture()
    const templatePath = join(directory, 'custom.hbs')
    writeFileSync(templatePath, template)
    fixture.config.routes.middlewareTemplate = templatePath
    writeFileSync(fixture.configPath, JSON.stringify(fixture.config))
    return { ...fixture, templatePath }
  }

  it('checks the selected template with real controller context through both executables without writing outputs', () => {
    const { config, configPath, templatePath } = createTemplateFixture('export const controllers = [{{#each controllers}}"{{name}}",{{/each}}];')
    writeFileSync(config.entryFile, `${readFileSync(config.entryFile, 'utf8')}\nthrow new Error('controller must not execute')\n`)
    const generatorPath = join(directory, 'must-not-execute.cjs')
    writeFileSync(generatorPath, "throw new Error('custom generator must not execute')")
    writeFileSync(configPath, JSON.stringify({ ...config, routes: { ...config.routes, routeGenerator: generatorPath } }))
    for (const binary of binaries) {
      const result = run(binary.path, ['template-check'])
      expect(result.status, result.stderr).to.equal(0)
      expect(result.stdout).to.contain(`Template check passed: ${templatePath}`)
      expect(result.stderr).to.equal('')
    }
    expect(existsSync(join(directory, 'routes'))).to.be.false
    expect(existsSync(join(directory, 'spec'))).to.be.false
  })

  for (const failure of [
    { template: '{{#each controllers}}', diagnostic: 'Parse error on line' },
    { template: '{{missingHelper controllers}}', diagnostic: 'Missing helper' },
    { template: 'export const value = ;', diagnostic: 'produced invalid TypeScript syntax' },
  ]) {
    it(`reports template-check ${failure.diagnostic} without generated files`, () => {
      const { configPath, templatePath } = createTemplateFixture(failure.template)
      const result = run(binaries[1].path, ['template-check', '-c', configPath])
      expect(result.status).to.equal(1)
      expect(result.stderr).to.contain(templatePath)
      expect(result.stderr).to.contain(failure.diagnostic)
      if (failure.diagnostic === 'produced invalid TypeScript syntax') {
        expect(result.stderr).to.contain(`${join(directory, 'routes', 'routes.ts')}:1:`)
      }
      expect(existsSync(join(directory, 'routes'))).to.be.false
      expect(existsSync(join(directory, 'spec'))).to.be.false
    })
  }

  it('reports the selected template read or parse failure before constructing source metadata', () => {
    const { config, configPath, templatePath } = createTemplateFixture('{{#each controllers}}')
    config.entryFile = join(directory, 'unavailable-controller.ts')
    writeFileSync(configPath, JSON.stringify(config))
    const syntax = run(binaries[1].path, ['template-check'])
    expect(syntax.status).to.equal(1)
    expect(syntax.stderr).to.contain('Parse error on line')
    expect(syntax.stderr).to.not.contain('EntryFile not found')
    config.routes.middlewareTemplate = join(directory, 'missing-template.hbs')
    writeFileSync(configPath, JSON.stringify(config))
    const missing = run(binaries[1].path, ['template-check'])
    expect(missing.status).to.equal(1)
    expect(missing.stderr).to.contain('missing-template.hbs')
    expect(missing.stderr).to.contain('ENOENT')
    expect(missing.stderr).to.not.contain('EntryFile not found')
    expect(existsSync(templatePath)).to.be.true
    expect(existsSync(join(directory, 'routes'))).to.be.false
  })

  it('keeps existing spec and route output bytes and modification times unchanged during template-check', () => {
    const { routesPath, specPath } = createTemplateFixture('export const checked = true;')
    mkdirSync(join(directory, 'routes'))
    mkdirSync(join(directory, 'spec'))
    writeFileSync(routesPath, 'existing routes')
    writeFileSync(specPath, 'existing specification')
    const routesModified = statSync(routesPath).mtimeMs
    const specModified = statSync(specPath).mtimeMs
    const result = run(binaries[1].path, ['template-check'])
    expect(result.status, result.stderr).to.equal(0)
    expect(readFileSync(routesPath, 'utf8')).to.equal('existing routes')
    expect(readFileSync(specPath, 'utf8')).to.equal('existing specification')
    expect(statSync(routesPath).mtimeMs).to.equal(routesModified)
    expect(statSync(specPath).mtimeMs).to.equal(specModified)
  })

  for (const extension of ['.mts', '.cts']) {
    it(`checks rendered ${extension} syntax without writing module output`, () => {
      const { config, configPath } = createTemplateFixture('export const checked = true;')
      config.routes.esm = true
      config.routes.routesFileName = `routes${extension}`
      writeFileSync(configPath, JSON.stringify(config))
      const result = run(binaries[1].path, ['template-check'])
      expect(result.status, result.stderr).to.equal(0)
      expect(existsSync(join(directory, 'routes'))).to.be.false
    })
  }

  it('requires a selected custom template for template-check', () => {
    createFixture()
    const result = run(binaries[1].path, ['template-check'])
    expect(result.status).to.equal(1)
    expect(result.stderr).to.contain('Missing routes.middlewareTemplate')
    expect(result.stderr).to.contain('configure the custom route template')
    expect(existsSync(join(directory, 'routes'))).to.be.false
  })

  it('checks syntax without resolving imports or type-checking the generated application', () => {
    const { configPath } = createTemplateFixture('import { missing } from "unavailable-package"; export const value: number = "string";')
    const result = run(binaries[1].path, ['template-check', '--configuration', configPath])
    expect(result.status, result.stderr).to.equal(0)
    expect(existsSync(join(directory, 'routes'))).to.be.false
    expect(existsSync(join(directory, 'spec'))).to.be.false
  })

  const succeed = (args: string[]) => {
    const result = run(binaries[1].path, args)
    expect(result.status, result.stderr).to.equal(0)
    return result
  }

  it('discovers configs and checks missing outputs without creating directories', () => {
    createFixture()
    expect(succeed(['discover']).stdout).to.equal('tsoa.json\n')
    const result = run(binaries[1].path, ['check'])
    expect(result.status).to.equal(1)
    expect(result.stderr).to.contain('Generated outputs are out of date')
    expect(existsSync(join(directory, 'spec'))).to.be.false
    expect(existsSync(join(directory, 'routes'))).to.be.false
  })

  it('generates real outputs and leaves current files untouched', () => {
    const { specPath, routesPath } = createFixture()
    succeed(['generate'])
    expect(readFileSync(specPath, 'utf8')).to.contain('"openapi": "3.1.0"')
    expect(readFileSync(routesPath, 'utf8')).to.contain('ExampleController')
    const specModified = statSync(specPath).mtimeMs
    const routesModified = statSync(routesPath).mtimeMs
    succeed(['check'])
    succeed(['generate'])
    expect(statSync(specPath).mtimeMs).to.equal(specModified)
    expect(statSync(routesPath).mtimeMs).to.equal(routesModified)
  })

  it('reports stale output paths without changing the files', () => {
    const { routesPath } = createFixture()
    succeed(['generate'])
    writeFileSync(routesPath, 'stale routes')
    const result = run(binaries[1].path, ['check'])
    expect(result.status).to.equal(1)
    expect(result.stderr).to.contain(routesPath)
    expect(readFileSync(routesPath, 'utf8')).to.equal('stale routes')
  })

  it('generates discovered routes with the base path override', () => {
    const { routesPath } = createFixture()
    succeed(['routes', '--discover', '.', '--basePath', '/v2'])
    expect(readFileSync(routesPath, 'utf8')).to.contain('/v2/example')
  })

  it('uses the last configuration option and preserves format override precedence', () => {
    const { configPath, specPath, routesPath } = createFixture()
    succeed(['spec', '-c', 'missing.json', '--configuration', configPath, '--host', 'api.example.com', '--yaml'])
    expect(readFileSync(join(directory, 'spec', 'swagger.yaml'), 'utf8')).to.contain('api.example.com')
    expect(existsSync(routesPath)).to.be.false
    succeed(['spec-and-routes', '-c', configPath, '--yaml', '--json'])
    expect(readFileSync(specPath, 'utf8')).to.contain('"openapi": "3.1.0"')
    expect(readFileSync(routesPath, 'utf8')).to.contain('ExampleController')
  })

  for (const specVersion of [2, 3, 3.1] as const) {
    it(`selects OpenAPI ${specVersion} from the config`, () => {
      const { config, configPath, specPath } = createFixture()
      config.spec.specVersion = specVersion
      writeFileSync(configPath, JSON.stringify(config))
      succeed(['spec', '-c', configPath])
      const spec = JSON.parse(readFileSync(specPath, 'utf8')) as { swagger?: string; openapi?: string }
      expect(spec.swagger ?? spec.openapi).to.equal(specVersion === 2 ? '2.0' : `${specVersion === 3 ? '3.0' : '3.1'}.0`)
    })
  }

  for (const name of ['tsoa.yaml', 'tsoa.yml', 'tsoa.config.js', 'tsoa.config.cjs']) {
    it(`discovers and generates specs from ${name}`, () => {
      const { config, specPath } = createFixture()
      writeFileSync(join(directory, 'package.json'), JSON.stringify({ name: 'consumer', version: '0.0.9', type: 'commonjs' }))
      const content = name.endsWith('.js') || name.endsWith('.cjs') ? `module.exports = ${JSON.stringify(config)}` : stringify(config)
      writeFileSync(join(directory, name), content)
      expect(succeed(['discover', name]).stdout).to.equal(`${name}\n`)
      succeed(['spec', '-c', name])
      expect(readFileSync(specPath, 'utf8')).to.contain('"openapi": "3.1.0"')
    })
  }

  for (const command of ['generate', 'check']) {
    it(`rejects custom route generators for ${command}`, () => {
      const { config, configPath } = createFixture()
      writeFileSync(configPath, JSON.stringify({ ...config, routes: { ...config.routes, routeGenerator: './custom-generator.js' } }))
      const result = run(binaries[1].path, [command])
      expect(result.status).to.equal(1)
      expect(result.stderr).to.contain('Change-aware generation is not supported with routes.routeGenerator')
    })
  }
})
