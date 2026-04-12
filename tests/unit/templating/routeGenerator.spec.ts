import { expect } from 'chai'
import { existsSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, relative } from 'node:path'
import 'mocha'
import { Tsoa } from '@tsoa-next/runtime'
import { generateRoutes, getRouteGeneratorImportAttempts } from '@tsoa-next/cli/module/generate-routes'
import { DefaultRouteGenerator } from '@tsoa-next/cli/routeGeneration/defaultRouteGenerator'

function withTempWorkingDirectory<T>(prefix: string, run: (tempDir: string) => T): T {
  const originalCwd = process.cwd()
  const tempDir = mkdtempSync(join(tmpdir(), prefix))

  try {
    process.chdir(tempDir)
    return run(tempDir)
  } finally {
    process.chdir(originalCwd)
    rmSync(tempDir, { force: true, recursive: true })
  }
}

describe('RouteGenerator', () => {
  describe('.buildModels', () => {
    it('should produce models where additionalProperties are not allowed unless explicitly stated', () => {
      // Arrange
      const stringType: Tsoa.Type = {
        dataType: 'string',
      }
      const refThatShouldNotAllowExtras = 'refThatShouldNotAllowExtras'
      const refWithExtraStrings = 'refWithExtraStrings'
      const generator = new DefaultRouteGenerator(
        {
          controllers: [],
          referenceTypeMap: {
            [refThatShouldNotAllowExtras]: {
              dataType: 'refObject',
              properties: [
                {
                  name: 'aStringOnTheObject',
                  required: true,
                  type: stringType,
                  validators: {},
                  deprecated: false,
                },
              ],
              refName: refThatShouldNotAllowExtras,
              deprecated: false,
            },
            [refWithExtraStrings]: {
              additionalProperties: stringType,
              dataType: 'refObject',
              properties: [],
              refName: refThatShouldNotAllowExtras,
              deprecated: false,
            },
          },
        },
        {
          bodyCoercion: true,
          entryFile: 'mockEntryFile',
          routesDir: 'mockRoutesDir',
          noImplicitAdditionalProperties: 'silently-remove-extras',
        },
      )

      // Act
      const models = generator.buildModels()

      // Assert
      const strictModel = models[refThatShouldNotAllowExtras]
      if (!strictModel) {
        throw new Error(`.buildModels should have created a model for ${refThatShouldNotAllowExtras}`)
      }
      if (strictModel.dataType !== 'refObject') {
        throw new Error(`Expected strictModel.dataType to be refObject`)
      }
      expect(strictModel.additionalProperties).to.equal(false)
      const stringDictionaryModel = models[refWithExtraStrings]
      if (!stringDictionaryModel) {
        throw new Error(`.buildModels should have created a model for ${refWithExtraStrings}`)
      }
      if (stringDictionaryModel.dataType !== 'refObject') {
        throw new Error(`.buildModels should have created a model for ${refThatShouldNotAllowExtras}`)
      }
      expect(stringDictionaryModel.additionalProperties).to.deep.equal({
        dataType: stringType.dataType,
      })
    })
  })

  describe('.buildContent', () => {
    it('strips .ts from the end of module paths but not from the middle', () => {
      const generator = new DefaultRouteGenerator(
        {
          controllers: [
            {
              location: 'controllerWith.tsInPath.ts',
              methods: [],
              name: '',
              path: '',
            },
          ],
          referenceTypeMap: {},
        },
        {
          bodyCoercion: true,
          entryFile: 'mockEntryFile',
          routesDir: '.',
          noImplicitAdditionalProperties: 'silently-remove-extras',
        },
      )

      const models = generator.buildContent('{{#each controllers}}{{modulePath}}{{/each}}')

      expect(models).to.equal('./controllerWith.tsInPath')
    })

    it('adds js for routes if esm is true', () => {
      const generator = new DefaultRouteGenerator(
        {
          controllers: [
            {
              location: 'controller.ts',
              methods: [],
              name: '',
              path: '',
            },
          ],
          referenceTypeMap: {},
        },
        {
          bodyCoercion: true,
          entryFile: 'mockEntryFile',
          routesDir: '.',
          noImplicitAdditionalProperties: 'silently-remove-extras',
          esm: true,
        },
      )

      const models = generator.buildContent('{{#each controllers}}{{modulePath}}{{/each}}')

      expect(models).to.equal('./controller.js')
    })

    it('adds mjs for routes if esm is true and source is mts', () => {
      const generator = new DefaultRouteGenerator(
        {
          controllers: [
            {
              location: 'controller.mts',
              methods: [],
              name: '',
              path: '',
            },
          ],
          referenceTypeMap: {},
        },
        {
          bodyCoercion: true,
          entryFile: 'mockEntryFile',
          routesDir: '.',
          noImplicitAdditionalProperties: 'silently-remove-extras',
          esm: true,
        },
      )

      const models = generator.buildContent('{{#each controllers}}{{modulePath}}{{/each}}')

      expect(models).to.equal('./controller.mjs')
    })

    it('adds cjs for routes if esm is true and source is cts', () => {
      const generator = new DefaultRouteGenerator(
        {
          controllers: [
            {
              location: 'controller.cts',
              methods: [],
              name: '',
              path: '',
            },
          ],
          referenceTypeMap: {},
        },
        {
          bodyCoercion: true,
          entryFile: 'mockEntryFile',
          routesDir: '.',
          noImplicitAdditionalProperties: 'silently-remove-extras',
          esm: true,
        },
      )

      const models = generator.buildContent('{{#each controllers}}{{modulePath}}{{/each}}')

      expect(models).to.equal('./controller.cjs')
    })

    it('uses ts for routes if esm is true and rewriteRelativeImportExtensions is true', () => {
      const generator = new DefaultRouteGenerator(
        {
          controllers: [
            {
              location: 'controller.ts',
              methods: [],
              name: '',
              path: '',
            },
          ],
          referenceTypeMap: {},
        },
        {
          bodyCoercion: true,
          entryFile: 'mockEntryFile',
          routesDir: '.',
          noImplicitAdditionalProperties: 'silently-remove-extras',
          esm: true,
          rewriteRelativeImportExtensions: true,
        },
      )

      const models = generator.buildContent('{{#each controllers}}{{modulePath}}{{/each}}')

      expect(models).to.equal('./controller.ts')
    })

    it('uses mts for routes if rewriteRelativeImportExtensions and esm is true and source is mts', () => {
      const generator = new DefaultRouteGenerator(
        {
          controllers: [
            {
              location: 'controller.mts',
              methods: [],
              name: '',
              path: '',
            },
          ],
          referenceTypeMap: {},
        },
        {
          bodyCoercion: true,
          entryFile: 'mockEntryFile',
          routesDir: '.',
          noImplicitAdditionalProperties: 'silently-remove-extras',
          esm: true,
          rewriteRelativeImportExtensions: true,
        },
      )

      const models = generator.buildContent('{{#each controllers}}{{modulePath}}{{/each}}')

      expect(models).to.equal('./controller.mts')
    })

    it('includes mixed-case GET methods in existingGetPaths for SpecPath collision detection', () => {
      const metadata = {
        controllers: [
          {
            location: 'controller.ts',
            methods: [
              {
                extensions: [],
                isHidden: false,
                method: 'get' as const,
                name: 'existingGet',
                parameters: [],
                path: 'existing',
                responses: [],
                security: [],
                type: {
                  dataType: 'void' as const,
                },
              },
            ],
            name: 'ExampleController',
            path: 'example',
          },
        ],
        referenceTypeMap: {},
      }

      Object.assign(metadata.controllers[0]!.methods[0]!, { method: 'GET' })

      const generator = new DefaultRouteGenerator(metadata, {
        basePath: '/v1',
        bodyCoercion: true,
        entryFile: 'mockEntryFile',
        routesDir: '.',
        noImplicitAdditionalProperties: 'silently-remove-extras',
      })

      const existingGetPaths = generator.buildContent('{{{json existingGetPaths}}}')

      expect(existingGetPaths).to.equal('["/v1/example/existing"]')
    })
  })

  describe('.generateRoutes', () => {
    it('loads a custom route generator from a bare file path', async () => {
      const routesDir = mkdtempSync(join(tmpdir(), 'tsoa-custom-route-generator-'))
      const testsRoot = join(__dirname, '..', '..')
      const routeGeneratorPath = relative(process.cwd(), join(testsRoot, 'fixtures', 'custom', 'custom-route-generator', 'serverlessRouteGenerator')).replace(/\.ts$/, '')

      try {
        await generateRoutes({
          noImplicitAdditionalProperties: 'silently-remove-extras',
          bodyCoercion: true,
          basePath: '/v1',
          entryFile: relative(process.cwd(), join(testsRoot, 'fixtures', 'custom', 'server.ts')),
          routesDir,
          routeGenerator: routeGeneratorPath,
          modelsTemplate: relative(process.cwd(), join(testsRoot, 'fixtures', 'custom', 'custom-route-generator', 'templates', 'models.hbs')),
          handlerTemplate: relative(process.cwd(), join(testsRoot, 'fixtures', 'custom', 'custom-route-generator', 'templates', 'handler.hbs')),
          stackTemplate: relative(process.cwd(), join(testsRoot, 'fixtures', 'custom', 'custom-route-generator', 'templates', 'api-stack.hbs')),
        })

        expect(existsSync(join(routesDir, 'stack.ts'))).to.equal(true)
      } finally {
        rmSync(routesDir, { force: true, recursive: true })
      }
    })

    it('keeps module resolution precedence for bare route generator specifiers', () => {
      withTempWorkingDirectory('tsoa-route-generator-module-precedence-', tempDir => {
        const packageScope = '@tsoa-test'
        const packageLeaf = 'scope-generator'
        const packageName = `${packageScope}/${packageLeaf}`
        const packageScopeDir = join(tempDir, packageScope)
        const localGeneratorFile = join(packageScopeDir, `${packageLeaf}.ts`)

        mkdirSync(packageScopeDir, { recursive: true })
        writeFileSync(localGeneratorFile, 'export default class LocalRouteGenerator {}', 'utf8')
        const importAttempts = getRouteGeneratorImportAttempts(packageName)

        expect(importAttempts[0]).to.equal(packageName)
        expect(importAttempts[1]).not.to.equal(packageName)
      })
    })

    it('prefers local resolution for explicit path-like route generator specifiers when the file exists', () => {
      withTempWorkingDirectory('tsoa-route-generator-local-precedence-', tempDir => {
        const packageLeaf = 'local-generator'
        const routeGenerator = `./${packageLeaf}`
        const localGeneratorFile = join(tempDir, `${packageLeaf}.ts`)

        writeFileSync(localGeneratorFile, 'export default class LocalRouteGenerator {}', 'utf8')
        const importAttempts = getRouteGeneratorImportAttempts(routeGenerator)

        expect(importAttempts[0]).not.to.equal(routeGenerator)
        expect(importAttempts[1]).to.equal(routeGenerator)
      })
    })
  })
})
