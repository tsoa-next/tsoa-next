import { expect } from 'chai'
import * as handlebars from 'handlebars'
import * as ts from 'typescript'
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, relative } from 'node:path'
import 'mocha'
import { Tsoa, TsoaRoute } from '@tsoa-next/runtime'
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
    it('preserves recursive hook receivers, traversal order and live metadata on a reused generator', () => {
      const validators = { minLength: { value: 1 } }
      const child: Tsoa.Property = { name: 'child', type: { dataType: 'enum', enums: ['a'] }, default: null, required: false, validators: {}, deprecated: false }
      const first: Tsoa.Property = {
        name: 'first',
        type: {
          dataType: 'union',
          types: [
            { dataType: 'array', elementType: { dataType: 'string' } },
            { dataType: 'nestedObjectLiteral', properties: [child] },
          ],
        },
        default: 0,
        required: true,
        validators,
        deprecated: false,
      }
      const alias: Tsoa.RefAliasType = {
        dataType: 'refAlias',
        refName: 'Alias',
        type: { dataType: 'array', elementType: { dataType: 'refObject', refName: 'First', properties: [], deprecated: false } },
        default: false,
        validators,
        deprecated: false,
      }
      const metadata: Tsoa.Metadata = {
        controllers: [],
        referenceTypeMap: {
          First: { dataType: 'refObject', refName: 'First', properties: [first], deprecated: false },
          Second: { dataType: 'refObject', refName: 'Second', properties: [], deprecated: false },
          Alias: alias,
        },
      }
      const options = { bodyCoercion: true, entryFile: 'entry.ts', routesDir: '.', noImplicitAdditionalProperties: 'ignore' as 'ignore' | 'throw-on-extras' }
      const calls: string[] = []
      const receivers: unknown[] = []
      class HookGenerator extends DefaultRouteGenerator {
        protected override buildPropertySchema(source: Tsoa.Property): TsoaRoute.PropertySchema {
          receivers.push(this)
          calls.push(source.name)
          if (source === first) {
            metadata.referenceTypeMap.Second = { dataType: 'refEnum', refName: 'Second', enums: ['changed'], deprecated: false }
            options.noImplicitAdditionalProperties = 'throw-on-extras'
          }
          return super.buildPropertySchema(source)
        }
        protected override buildProperty(type: Tsoa.Type): TsoaRoute.PropertySchema {
          receivers.push(this)
          calls.push(type.dataType)
          return super.buildProperty(type)
        }
      }
      const generator = new HookGenerator(metadata, options)
      const models = generator.buildModels()
      expect(Object.keys(models)).to.deep.equal(['First', 'Second', 'Alias'])
      expect(calls).to.deep.equal(['first', 'union', 'array', 'string', 'nestedObjectLiteral', 'child', 'enum', 'array'])
      expect(receivers.every(receiver => receiver === generator)).to.be.true
      expect(models.First).to.deep.equal({
        dataType: 'refObject',
        properties: {
          first: {
            dataType: 'union',
            subSchemas: [
              { dataType: 'array', array: { dataType: 'string' } },
              { dataType: 'nestedObjectLiteral', nestedProperties: { child: { dataType: 'enum', enums: ['a'], default: null, required: undefined } }, additionalProperties: undefined },
            ],
            default: 0,
            required: true,
            validators,
          },
        },
        additionalProperties: false,
      })
      expect(models.Second).to.deep.equal({ dataType: 'refEnum', enums: ['changed'] })
      expect(models.Alias).to.deep.equal({ dataType: 'refAlias', type: { dataType: 'array', array: { dataType: 'refObject', ref: 'First' }, validators, default: false } })
      alias.default = 'updated'
      expect(generator.buildModels().Alias).to.have.nested.property('type.default', 'updated')
    })

    it('stops at a reached schema failure before reading later children or models', () => {
      const laterProperty: Tsoa.Property = { name: 'later', type: { dataType: 'string' }, required: false, validators: {}, deprecated: false }
      Object.defineProperty(laterProperty, 'type', {
        get() {
          throw new Error('Unused later child')
        },
      })
      const metadata: Tsoa.Metadata = {
        controllers: [],
        referenceTypeMap: {
          First: {
            dataType: 'refObject',
            refName: 'First',
            properties: [{ name: 'bad', type: { dataType: 'string' }, required: true, validators: {}, deprecated: false }, laterProperty],
            deprecated: false,
          },
        },
      }
      Object.defineProperty(metadata.referenceTypeMap, 'Later', {
        enumerable: true,
        get() {
          throw new Error('Unused later model')
        },
      })
      const failure = new Error('Required schema construction failed')
      class FailingGenerator extends DefaultRouteGenerator {
        protected override buildProperty(): TsoaRoute.PropertySchema {
          throw failure
        }
      }
      const generator = new FailingGenerator(metadata, { bodyCoercion: true, entryFile: 'entry.ts', routesDir: '.', noImplicitAdditionalProperties: 'ignore' })
      expect(() => generator.buildModels()).to.throw(failure)
    })

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

  describe('context preparation', () => {
    const validators = { minLength: { value: 1 } }
    const query: Tsoa.Parameter = { parameterName: 'query', name: 'query', parameterIndex: 3, in: 'query', type: { dataType: 'string' }, default: 0, required: true, validators, deprecated: false }
    const upload: Tsoa.Parameter = {
      parameterName: 'uploads',
      name: 'uploads',
      parameterIndex: 1,
      in: 'formData',
      type: { dataType: 'array', elementType: { dataType: 'file' } },
      required: false,
      validators: {},
      deprecated: false,
    }
    const method: Tsoa.Method = {
      name: 'getItems',
      method: 'get',
      path: 'items/{id}',
      parameters: [query, upload],
      type: { dataType: 'void' },
      responses: [],
      security: [{ apiKey: [] }],
      successStatus: 202,
      extensions: [],
      isHidden: false,
    }
    const metadata: Tsoa.Metadata = { controllers: [{ name: 'Controller', path: 'Controller', location: 'controller.ts', methods: [method] }], referenceTypeMap: {} }

    it('preserves context hook dispatch, parameter precedence, paths, uploads and security', () => {
      const calls: string[] = []
      const receivers: unknown[] = []
      class ContextGenerator extends DefaultRouteGenerator {
        public context() {
          return this.buildContext()
        }
        protected override getRelativeImportPath(file: string) {
          receivers.push(this)
          calls.push(`import:${file}`)
          return `hook:${file}`
        }
        protected override pathTransformer(path: string) {
          receivers.push(this)
          calls.push(`path:${path}`)
          return super.pathTransformer(path)
        }
        protected override buildEmbeddedSpecGeneratorArtifacts(selected: boolean) {
          receivers.push(this)
          calls.push(`spec:${selected}`)
          return super.buildEmbeddedSpecGeneratorArtifacts(selected)
        }
        protected override buildParameterSchema(parameter: Tsoa.Parameter) {
          receivers.push(this)
          calls.push(`parameter:${parameter.parameterName}`)
          return super.buildParameterSchema(parameter)
        }
        protected override buildProperty(type: Tsoa.Type) {
          receivers.push(this)
          calls.push(`property:${type.dataType}`)
          return type.dataType === 'string' ? { dataType: 'string' as const, default: 'hook' } : super.buildProperty(type)
        }
        public override buildModels() {
          receivers.push(this)
          calls.push('models')
          return super.buildModels()
        }
      }
      const generator = new ContextGenerator(metadata, {
        bodyCoercion: true,
        entryFile: 'entry.ts',
        routesDir: '.',
        basePath: '/api',
        authenticationModule: 'auth.ts',
        iocModule: 'ioc.ts',
        noImplicitAdditionalProperties: 'ignore',
      })
      const context = generator.context()
      expect(calls).to.deep.equal([
        'import:auth.ts',
        'import:ioc.ts',
        'spec:false',
        'path:/Controller',
        'parameter:query',
        'property:string',
        'parameter:uploads',
        'property:array',
        'property:file',
        'path:/items/{id}',
        'import:controller.ts',
        'path:/Controller',
        'path:/items/{id}',
        'models',
      ])
      expect(receivers.every(receiver => receiver === generator)).to.be.true
      const action = context.controllers[0].actions[0]
      expect(Object.keys(action.parameters)).to.deep.equal(['query', 'uploads'])
      expect(action.parameters.query).to.include({ default: 'hook', parameterIndex: 3, required: true, dataType: 'string' })
      expect(action.parameters.query.validators).to.equal(validators)
      expect(action.parameters.uploads.parameterIndex).to.equal(1)
      expect(action.fullPath).to.equal('/api/Controller/items/:id')
      expect(action.security).to.equal(method.security)
      expect(action.successStatus).to.equal(202)
      expect(action.uploadFileName).to.deep.equal([{ name: 'uploads', maxCount: undefined, multiple: true }])
      expect(context).to.include({ authenticationModule: 'hook:auth.ts', iocModule: 'hook:ioc.ts', useFileUploads: true, useSecurity: true, useSpecPaths: false })
      expect(context.existingGetPaths).to.deep.equal(['/api/Controller/items/:id'])
    })

    it('reports parameter failures before later parameters, method paths and model preparation', () => {
      const later = { ...upload }
      Object.defineProperty(later, 'type', {
        get() {
          throw new Error('Unused later parameter type')
        },
      })
      const failure = new Error('Required parameter preparation failed')
      const calls: string[] = []
      class FailingContextGenerator extends DefaultRouteGenerator {
        public context() {
          return this.buildContext()
        }
        protected override buildParameterSchema(): TsoaRoute.ParameterSchema {
          calls.push('parameter')
          throw failure
        }
        protected override pathTransformer(path: string) {
          calls.push(`path:${path}`)
          return super.pathTransformer(path)
        }
        public override buildModels(): TsoaRoute.Models {
          throw new Error('Unused models')
        }
      }
      const failingMetadata: Tsoa.Metadata = { ...metadata, controllers: [{ ...metadata.controllers[0], methods: [{ ...method, parameters: [query, later] }] }] }
      const generator = new FailingContextGenerator(failingMetadata, { bodyCoercion: true, entryFile: 'entry.ts', routesDir: '.', noImplicitAdditionalProperties: 'ignore' })
      expect(() => generator.context()).to.throw(failure)
      expect(calls).to.deep.equal(['path:/Controller', 'parameter'])
    })
  })

  it('compiles generated single and multiple Hapi uploads with strict payload typing', async () => {
    const directory = mkdtempSync(join(__dirname, 'hapi-upload-'))
    try {
      const controllerPath = join(directory, 'controller.ts')
      writeFileSync(controllerPath, 'export class UploadController { single(file: unknown): void {} multiple(files: unknown[]): void {} }')
      const methods: Tsoa.Method[] = ['single', 'multiple'].map((name, parameterIndex) => ({
        name,
        method: 'post',
        path: name,
        parameters: [
          {
            name: 'file',
            parameterName: 'file',
            parameterIndex: 0,
            in: 'formData',
            type: parameterIndex === 0 ? { dataType: 'file' } : { dataType: 'array', elementType: { dataType: 'file' } },
            required: true,
            validators: {},
            deprecated: false,
          },
        ],
        type: { dataType: 'void' },
        responses: [],
        security: [],
        extensions: [],
        isHidden: false,
      }))
      const metadata: Tsoa.Metadata = { controllers: [{ name: 'UploadController', path: 'uploads', location: controllerPath, methods }], referenceTypeMap: {} }
      await generateRoutes({ entryFile: controllerPath, routesDir: directory, middleware: 'hapi', bodyCoercion: true, noImplicitAdditionalProperties: 'ignore' }, {}, undefined, metadata)
      const program = ts.createProgram([join(directory, 'routes.ts')], {
        strict: true,
        noEmit: true,
        skipLibCheck: true,
        esModuleInterop: true,
        module: ts.ModuleKind.CommonJS,
        target: ts.ScriptTarget.ES2021,
      })
      const diagnostics = ts.getPreEmitDiagnostics(program)
      expect(diagnostics.map(diagnostic => ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n'))).to.deep.equal([])
    } finally {
      rmSync(directory, { recursive: true, force: true })
    }
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
