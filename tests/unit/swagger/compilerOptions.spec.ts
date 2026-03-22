import { expect } from 'chai'
import { mkdtemp, mkdir, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import 'mocha'
import * as ts from 'typescript'
import { validateCompilerOptions } from '@tsoa-next/cli/cli'
import { MetadataGenerator } from '@tsoa-next/cli/metadataGeneration/metadataGenerator'
import { Config } from '@tsoa-next/runtime/config'

const testConfig = (overrides: Partial<Config> = {}): Config => ({
  entryFile: './src/server.ts',
  spec: {
    outputDirectory: './dist',
  },
  routes: {
    routesDir: './routes',
  },
  ...overrides,
})

const normalizePathForAssertion = (value: string) => value.replaceAll('\\', '/')
const getErrorMessage = (error: unknown) => (error instanceof Error ? error.message : String(error))

describe('CompilerOptions', () => {
  let testDir: string

  beforeEach(async () => {
    testDir = await mkdtemp(join(tmpdir(), 'tsoa-next-compiler-options-'))
  })

  afterEach(async () => {
    await rm(testDir, { recursive: true, force: true })
  })

  it('reads compiler options from the discovered tsconfig.json', async () => {
    await writeFile(
      join(testDir, 'tsconfig.json'),
      JSON.stringify({
        compilerOptions: {
          target: 'es2020',
          module: 'commonjs',
          strict: true,
          experimentalDecorators: true,
        },
      }),
      'utf8',
    )

    const compilerOptions = validateCompilerOptions(testConfig(), testDir)

    expect(compilerOptions.target).to.equal(ts.ScriptTarget.ES2020)
    expect(compilerOptions.module).to.equal(ts.ModuleKind.CommonJS)
    expect(compilerOptions.strict).to.equal(true)
    expect(compilerOptions.experimentalDecorators).to.equal(true)
  })

  it('retains the legacy compilerOptions-only call shape', () => {
    const compilerOptions = validateCompilerOptions(
      {
        module: 'esnext',
        strict: true,
      },
      testDir,
    )

    expect(compilerOptions.module).to.equal(ts.ModuleKind.ESNext)
    expect(compilerOptions.strict).to.equal(true)
  })

  it('keeps the legacy compilerOptions-only call shape permissive for unknown options', () => {
    expect(() =>
      validateCompilerOptions(
        {
          module: 'esnext',
          invalidLegacyOption: true,
        },
        testDir,
      ),
    ).to.not.throw()
  })

  it('supports an explicit tsconfig path and extends', async () => {
    await writeFile(
      join(testDir, 'tsconfig.base.json'),
      JSON.stringify({
        compilerOptions: {
          module: 'node16',
          strict: true,
          experimentalDecorators: true,
        },
      }),
      'utf8',
    )
    await writeFile(
      join(testDir, 'tsconfig.app.json'),
      JSON.stringify({
        extends: './tsconfig.base.json',
        compilerOptions: {
          target: 'es2022',
        },
      }),
      'utf8',
    )

    const compilerOptions = validateCompilerOptions(
      testConfig({
        tsconfig: './tsconfig.app.json',
      }),
      testDir,
    )

    expect(compilerOptions.target).to.equal(ts.ScriptTarget.ES2022)
    expect(compilerOptions.module).to.equal(ts.ModuleKind.Node16)
    expect(compilerOptions.strict).to.equal(true)
    expect(compilerOptions.experimentalDecorators).to.equal(true)
  })

  it('lets explicit tsoa-next compiler options override tsconfig values', async () => {
    await writeFile(
      join(testDir, 'tsconfig.json'),
      JSON.stringify({
        compilerOptions: {
          target: 'es2022',
          module: 'commonjs',
          strict: false,
        },
      }),
      'utf8',
    )

    const compilerOptions = validateCompilerOptions(
      testConfig({
        compilerOptions: {
          target: 'es2019',
          strict: true,
        },
      }),
      testDir,
    )

    expect(compilerOptions.target).to.equal(ts.ScriptTarget.ES2019)
    expect(compilerOptions.module).to.equal(ts.ModuleKind.CommonJS)
    expect(compilerOptions.strict).to.equal(true)
  })

  it('returns only explicit compiler options when no implicit tsconfig exists', () => {
    const compilerOptions = validateCompilerOptions(
      testConfig({
        compilerOptions: {
          module: 'esnext',
        },
      }),
      testDir,
    )

    expect(compilerOptions.module).to.equal(ts.ModuleKind.ESNext)
  })

  it('throws for an explicitly configured missing tsconfig', () => {
    const expectedPath = normalizePathForAssertion(join(testDir, 'missing.tsconfig.json'))

    expect(() =>
      validateCompilerOptions(
        testConfig({
          tsconfig: './missing.tsconfig.json',
        }),
        testDir,
      ),
    ).to.throw()

    try {
      validateCompilerOptions(
        testConfig({
          tsconfig: './missing.tsconfig.json',
        }),
        testDir,
      )
      expect.fail('Expected validateCompilerOptions to throw for a missing tsconfig')
    } catch (error) {
      expect(normalizePathForAssertion(getErrorMessage(error))).to.contain(`Failed to read tsconfig at '${expectedPath}'`)
    }
  })

  it('throws for invalid tsconfig json', async () => {
    await writeFile(join(testDir, 'tsconfig.json'), '{ "compilerOptions": ', 'utf8')

    const expectedPath = normalizePathForAssertion(join(testDir, 'tsconfig.json'))

    expect(() => validateCompilerOptions(testConfig(), testDir)).to.throw()

    try {
      validateCompilerOptions(testConfig(), testDir)
      expect.fail('Expected validateCompilerOptions to throw for invalid tsconfig JSON')
    } catch (error) {
      expect(normalizePathForAssertion(getErrorMessage(error))).to.contain(`Failed to read tsconfig at '${expectedPath}'`)
    }
  })

  it('throws for broken tsconfig extends', async () => {
    await writeFile(
      join(testDir, 'tsconfig.json'),
      JSON.stringify({
        extends: './missing-base.json',
      }),
      'utf8',
    )

    const expectedPath = normalizePathForAssertion(join(testDir, 'tsconfig.json'))

    expect(() => validateCompilerOptions(testConfig(), testDir)).to.throw()

    try {
      validateCompilerOptions(testConfig(), testDir)
      expect.fail('Expected validateCompilerOptions to throw for broken tsconfig extends')
    } catch (error) {
      expect(normalizePathForAssertion(getErrorMessage(error))).to.contain(`Failed to resolve tsconfig at '${expectedPath}'`)
    }
  })

  it('uses merged tsconfig path mapping during metadata generation', async () => {
    const repoRoot = join(__dirname, '..', '..', '..')
    const fixtureRoot = await mkdtemp(join(repoRoot, '.tmp-compiler-options-fixture-'))

    try {
      await mkdir(join(fixtureRoot, 'src', 'controllers'), { recursive: true })
      await mkdir(join(fixtureRoot, 'src', 'models'), { recursive: true })

      await writeFile(
        join(fixtureRoot, 'tsconfig.json'),
        JSON.stringify({
          compilerOptions: {
            baseUrl: './src',
            paths: {
              '@models/*': ['models/*'],
            },
            experimentalDecorators: true,
            emitDecoratorMetadata: true,
          },
        }),
        'utf8',
      )

      await writeFile(
        join(fixtureRoot, 'src', 'models', 'user.ts'),
        `export interface FixtureUser {
  name: string
}
`,
        'utf8',
      )

      await writeFile(
        join(fixtureRoot, 'src', 'server.ts'),
        `import './controllers/userController'
`,
        'utf8',
      )

      await writeFile(
        join(fixtureRoot, 'src', 'controllers', 'userController.ts'),
        `import { Body, Post, Route } from '@tsoa-next/runtime'
import { FixtureUser } from '@models/user'

@Route('fixture-users')
export class FixtureUserController {
  @Post()
  public create(@Body() body: FixtureUser): FixtureUser {
    return body
  }
}
`,
        'utf8',
      )

      const config = testConfig({
        entryFile: join(fixtureRoot, 'src', 'server.ts'),
        tsconfig: './tsconfig.json',
        compilerOptions: {
          strict: true,
        },
      })

      const compilerOptions = validateCompilerOptions(config, fixtureRoot)
      const metadata = new MetadataGenerator(config.entryFile, compilerOptions).Generate()

      expect(metadata.controllers).to.have.length(1)
      expect(metadata.referenceTypeMap).to.have.property('FixtureUser')
    } finally {
      await rm(fixtureRoot, { recursive: true, force: true })
    }
  })
})
