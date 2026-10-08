import { expect } from 'chai'
import 'mocha'
import { spawnSync } from 'node:child_process'
import { existsSync, mkdtempSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'
import { stringify } from 'yaml'
import type { Config } from '@tsoa-next/runtime'

const packageVersion = (require('../../../packages/cli/package.json') as { version: string }).version
const binaries = [
  { name: '@tsoa-next/cli', path: resolve(__dirname, '../../../packages/cli/dist/cli.js') },
  { name: 'tsoa-next', path: resolve(__dirname, '../../../packages/tsoa/dist/cli-bin.js') },
]
const commands = ['discover', 'generate', 'check', 'spec', 'routes', 'spec-and-routes']

describe('CLI executables', () => {
  let directory: string

  beforeEach(() => {
    directory = mkdtempSync(join(tmpdir(), 'tsoa-cli-binary-'))
    writeFileSync(join(directory, 'package.json'), JSON.stringify({ name: 'consumer', version: '0.0.9', type: 'module' }))
  })

  afterEach(() => rmSync(directory, { force: true, recursive: true }))

  const run = (binary: string, args: string[]) => spawnSync(process.execPath, [binary, ...args], { cwd: directory, encoding: 'utf8', timeout: 30000 })

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

  it('generates, discovers, and checks real outputs through the CLI', function () {
    this.timeout(60000)
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
    const binary = binaries[1].path
    const specPath = join(directory, 'spec', 'swagger.json')
    const routesPath = join(directory, 'routes', 'routes.ts')
    const succeed = (args: string[]) => {
      const result = run(binary, args)
      expect(result.status, result.stderr).to.equal(0)
      return result
    }

    expect(succeed(['discover']).stdout).to.equal('tsoa.json\n')
    const missing = run(binary, ['check'])
    expect(missing.status).to.equal(1)
    expect(missing.stderr).to.contain('Generated outputs are out of date')
    expect(existsSync(join(directory, 'spec'))).to.be.false
    expect(existsSync(join(directory, 'routes'))).to.be.false

    succeed(['generate'])
    expect(readFileSync(specPath, 'utf8')).to.contain('"openapi": "3.1.0"')
    expect(readFileSync(routesPath, 'utf8')).to.contain('ExampleController')
    const specModified = statSync(specPath).mtimeMs
    const routesModified = statSync(routesPath).mtimeMs
    succeed(['check'])
    succeed(['generate'])
    expect(statSync(specPath).mtimeMs).to.equal(specModified)
    expect(statSync(routesPath).mtimeMs).to.equal(routesModified)

    writeFileSync(routesPath, 'stale routes')
    const stale = run(binary, ['check'])
    expect(stale.status).to.equal(1)
    expect(stale.stderr).to.contain(routesPath)
    expect(readFileSync(routesPath, 'utf8')).to.equal('stale routes')
    succeed(['routes', '--discover', '.', '--basePath', '/v2'])
    expect(readFileSync(routesPath, 'utf8')).to.contain('/v2/example')

    succeed(['spec', '-c', 'missing.json', '--configuration', configPath, '--host', 'api.example.com', '--yaml'])
    expect(readFileSync(join(directory, 'spec', 'swagger.yaml'), 'utf8')).to.contain('api.example.com')
    succeed(['spec-and-routes', '-c', configPath, '--yaml', '--json'])
    succeed(['check'])

    for (const specVersion of [2, 3, 3.1] as const) {
      config.spec.specVersion = specVersion
      writeFileSync(configPath, JSON.stringify(config))
      succeed(['spec', '-c', configPath])
      const spec = JSON.parse(readFileSync(specPath, 'utf8')) as { swagger?: string; openapi?: string }
      expect(spec.swagger ?? spec.openapi).to.equal(specVersion === 2 ? '2.0' : `${specVersion === 3 ? '3.0' : '3.1'}.0`)
    }

    writeFileSync(join(directory, 'package.json'), JSON.stringify({ name: 'consumer', version: '0.0.9', type: 'commonjs' }))
    const configFormats = [
      { name: 'tsoa.yaml', content: stringify(config) },
      { name: 'tsoa.yml', content: stringify(config) },
      { name: 'tsoa.config.js', content: `module.exports = ${JSON.stringify(config)}` },
      { name: 'tsoa.config.cjs', content: `module.exports = ${JSON.stringify(config)}` },
    ]
    for (const { name, content } of configFormats) {
      const path = join(directory, name)
      writeFileSync(path, content)
      expect(succeed(['discover', name]).stdout).to.equal(`${name}\n`)
      succeed(['spec', '-c', name])
      expect(readFileSync(specPath, 'utf8')).to.contain('"openapi": "3.1.0"')
      rmSync(path)
    }

    writeFileSync(configPath, JSON.stringify({ ...config, routes: { ...config.routes, routeGenerator: './custom-generator.js' } }))
    for (const command of ['generate', 'check']) {
      const result = run(binary, [command])
      expect(result.status).to.equal(1)
      expect(result.stderr).to.contain('Change-aware generation is not supported with routes.routeGenerator')
    }
  })
})
