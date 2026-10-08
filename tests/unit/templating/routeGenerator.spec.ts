import { expect } from 'chai'
import * as handlebars from 'handlebars'
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, relative } from 'node:path'
import 'mocha'
import { Tsoa } from '@tsoa-next/runtime'
import { generateRoutes, getRouteGeneratorImportAttempts } from '@tsoa-next/cli/module/generate-routes'
import { checkRenderedTemplateSyntax } from '../../../packages/cli/src/routeGeneration/templateCheck'
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

  it('checks a Windows-style virtual output path without reading or writing it', () => {
    const outputPath = String.raw`C:\application\routes\routes.ts`
    expect(() => checkRenderedTemplateSyntax('export const valid = true;', 'custom.hbs', outputPath)).to.not.throw()
    expect(() => checkRenderedTemplateSyntax('export const invalid = ;', 'custom.hbs', outputPath)).to.throw(`Generated output ${outputPath}:1:`)
  })

  describe('.buildContent', () => {
    it('keeps built-in helpers local during a reentrant custom helper render', () => {
      const options = { bodyCoercion: true, entryFile: 'entry.ts', routesDir: '.', noImplicitAdditionalProperties: 'ignore' as const }
      const metadata: Tsoa.Metadata = { controllers: [], referenceTypeMap: {} }
      const first = new DefaultRouteGenerator(metadata, options)
      const second = new DefaultRouteGenerator(metadata, { ...options, noImplicitAdditionalProperties: 'throw-on-extras' })
      handlebars.registerHelper('nestedRouteRender', () => second.buildContent('{{additionalPropsHelper false}}'))
      const helpersBefore = { ...handlebars.helpers }
      try {
        expect(first.buildContent('{{additionalPropsHelper false}}|{{nestedRouteRender}}|{{additionalPropsHelper false}}')).to.equal('true|false|true')
        expect(handlebars.helpers).to.deep.equal(helpersBefore)
      } finally {
        handlebars.unregisterHelper('nestedRouteRender')
      }
    })

    it('preserves registered custom helpers, partials and decorators without mutating their registries', () => {
      const generator = new DefaultRouteGenerator(
        { controllers: [], referenceTypeMap: {} },
        {
          bodyCoercion: true,
          entryFile: 'entry.ts',
          routesDir: '.',
          noImplicitAdditionalProperties: 'ignore',
        },
      )
      handlebars.registerHelper('routeCustomHelper', () => 'custom')
      handlebars.registerPartial('routeCustomPartial', '{{routeCustomHelper}}partial')
      handlebars.registerDecorator('routeCustomDecorator', (fn: handlebars.TemplateDelegate) => (context: unknown, options?: handlebars.RuntimeOptions) => `${fn(context, options)}|decorated`)
      const helpersBefore = { ...handlebars.helpers }
      const partialsBefore = { ...handlebars.partials }
      const decoratorsBefore = { ...handlebars.decorators }
      try {
        expect(generator.buildContent('{{*routeCustomDecorator}}{{routeCustomHelper}}|{{>routeCustomPartial}}')).to.equal('custom|custompartial|decorated')
        expect(handlebars.helpers).to.deep.equal(helpersBefore)
        expect(handlebars.partials).to.deep.equal(partialsBefore)
        expect(handlebars.decorators).to.deep.equal(decoratorsBefore)
      } finally {
        handlebars.unregisterHelper('routeCustomHelper')
        handlebars.unregisterPartial('routeCustomPartial')
        handlebars.unregisterDecorator('routeCustomDecorator')
      }
    })

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

    for (const middleware of ['express', 'koa', 'hapi'] as const) {
      it(`registers SpecPath routes before regular ${middleware} routes`, () => {
        const generator = new DefaultRouteGenerator(
          {
            controllers: [
              {
                location: 'dynamic-controller.ts',
                methods: [
                  {
                    extensions: [],
                    isHidden: false,
                    method: 'get' as const,
                    name: 'getDynamicRouteMatch',
                    parameters: [],
                    path: '{resource}',
                    responses: [],
                    security: [],
                    type: {
                      dataType: 'void' as const,
                    },
                  },
                ],
                name: 'DynamicController',
                path: '{tenant}',
              },
              {
                hasSpecPaths: true,
                location: 'spec-controller.ts',
                methods: [],
                name: 'SpecController',
                path: 'SpecPath',
              },
            ],
            referenceTypeMap: {},
          },
          {
            basePath: '/v1',
            bodyCoercion: true,
            entryFile: 'mockEntryFile',
            middleware,
            noImplicitAdditionalProperties: 'silently-remove-extras',
            routesDir: '.',
          },
        )

        const template = readFileSync(generator.template, 'utf8')
        const routes = generator.buildContent(template)
        const specPathRegistration = 'for (const specPath of fetchSpecPaths(DynamicController))'
        const dynamicRouteRegistration = middleware === 'hapi' ? "path: '/v1/{tenant}/{resource}'" : "'/v1/:tenant/:resource'"

        expect(routes.indexOf(specPathRegistration)).to.be.greaterThan(-1)
        expect(routes.indexOf(dynamicRouteRegistration)).to.be.greaterThan(-1)
        expect(routes.indexOf(specPathRegistration)).to.be.lessThan(routes.indexOf(dynamicRouteRegistration))
      })
    }

    it('omits spec path support from generated routes when no controller uses @SpecPath', () => {
      const generator = new DefaultRouteGenerator(
        {
          controllers: [
            {
              location: 'controller.ts',
              methods: [],
              name: 'ExampleController',
              path: 'example',
            },
          ],
          referenceTypeMap: {},
        },
        {
          bodyCoercion: true,
          entryFile: 'mockEntryFile',
          middleware: 'express',
          noImplicitAdditionalProperties: 'silently-remove-extras',
          routesDir: '.',
        },
      )

      const template = readFileSync(generator.template, 'utf8')
      const routes = generator.buildContent(template)

      expect(routes).not.to.contain('createOpenApiSpecGenerator')
      expect(routes).not.to.contain('fetchSpecPaths')
      expect(routes).not.to.contain('resolveSpecPathResponse')
      expect(routes).not.to.contain("import { pipeline } from 'node:stream';")
    })

    it('includes spec path support in generated routes when a controller uses @SpecPath', () => {
      const generator = new DefaultRouteGenerator(
        {
          controllers: [
            {
              hasSpecPaths: true,
              location: 'controller.ts',
              methods: [],
              name: 'ExampleController',
              path: 'example',
            },
          ],
          referenceTypeMap: {},
        },
        {
          bodyCoercion: true,
          entryFile: 'mockEntryFile',
          middleware: 'express',
          noImplicitAdditionalProperties: 'silently-remove-extras',
          routesDir: '.',
        },
      )

      const template = readFileSync(generator.template, 'utf8')
      const routes = generator.buildContent(template)

      expect(routes).to.contain('createOpenApiSpecGenerator')
      expect(routes).not.to.contain('createEmbeddedSpecGenerator')
      expect(routes).to.contain('fetchSpecPaths')
      expect(routes).to.contain('resolveSpecPathResponse')
      expect(routes).to.contain("import { pipeline } from 'node:stream';")
    })

    it('embeds a prebuilt spec artifact into generated routes when spec config is available', () => {
      const metadata: Tsoa.Metadata = {
        controllers: [
          {
            hasSpecPaths: true,
            location: 'controller.ts',
            methods: [
              {
                extensions: [],
                isHidden: false,
                method: 'get',
                name: 'list',
                parameters: [],
                path: '',
                responses: [],
                security: [],
                type: {
                  dataType: 'void',
                },
              },
            ],
            name: 'ExampleController',
            path: 'example',
          },
        ],
        referenceTypeMap: {},
      }

      const generator = new DefaultRouteGenerator(metadata, {
        basePath: '/v1',
        bodyCoercion: true,
        entryFile: 'mockEntryFile',
        middleware: 'express',
        noImplicitAdditionalProperties: 'silently-remove-extras',
        routesDir: '.',
        runtimeSpecConfig: {
          spec: {
            basePath: '/v1',
            entryFile: 'mockEntryFile',
            name: 'Embedded Test API',
            noImplicitAdditionalProperties: 'silently-remove-extras',
            outputDirectory: '.',
            specVersion: 3.1,
            version: '1.0.0',
          },
        },
      })

      const template = readFileSync(generator.template, 'utf8')
      const routes = generator.buildContent(template)
      const embeddedSpecGeneratorArtifacts = JSON.parse(generator.buildContent('{{{json embeddedSpecGeneratorArtifacts}}}')) as {
        spec?: { info?: { title?: string }; openapi?: string; paths?: Record<string, unknown> }
        yaml?: string
      }

      expect(routes).to.contain('createEmbeddedSpecGenerator')
      expect(routes).not.to.contain('const specGenerator = createOpenApiSpecGenerator({')
      expect(embeddedSpecGeneratorArtifacts.spec?.openapi).to.equal('3.1.0')
      expect(embeddedSpecGeneratorArtifacts.spec?.info?.title).to.equal('Embedded Test API')
      expect(embeddedSpecGeneratorArtifacts.spec?.paths).to.have.property('/example')
      expect(embeddedSpecGeneratorArtifacts).not.to.have.property('json')
      expect(embeddedSpecGeneratorArtifacts.yaml).to.contain('openapi: 3.1.0')
    })

    it('embeds metadata into runtimeSpecConfig for SpecPath routes', () => {
      const metadata: Tsoa.Metadata = {
        controllers: [
          {
            hasSpecPaths: true,
            location: 'controller.ts',
            methods: [],
            name: 'ExampleController',
            path: 'example',
          },
        ],
        referenceTypeMap: {},
      }

      const generator = new DefaultRouteGenerator(metadata, {
        bodyCoercion: true,
        entryFile: 'mockEntryFile',
        middleware: 'express',
        noImplicitAdditionalProperties: 'silently-remove-extras',
        routesDir: '.',
        runtimeSpecConfig: {
          spec: {
            basePath: '/v1',
            entryFile: 'mockEntryFile',
            noImplicitAdditionalProperties: 'silently-remove-extras',
            outputDirectory: '.',
          },
        },
      })

      const runtimeSpecConfig = JSON.parse(generator.buildContent('{{{json runtimeSpecConfig}}}')) as {
        metadata?: Tsoa.Metadata
      }

      expect(runtimeSpecConfig.metadata).to.deep.equal(metadata)
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
