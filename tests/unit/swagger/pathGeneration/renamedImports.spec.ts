import 'mocha'
import { MetadataGenerator } from '@tsoa-next/cli/metadataGeneration/metadataGenerator'
import { SpecGenerator2 } from '@tsoa-next/cli/swagger/specGenerator2'
import { SpecGenerator3 } from '@tsoa-next/cli/swagger/specGenerator3'
import { Swagger } from '@tsoa-next/runtime'
import { getDefaultExtendedOptions } from 'fixtures/defaultOptions'
import { VerifyPath } from 'unit/utilities/verifyPath'
import { expect } from 'chai'

const isSwagger2PathParameter = (parameter: Swagger.Parameter2): parameter is Swagger.Swagger2PathParameter => parameter.in === 'path'
const isOpenApiPathParameter = (parameter: Swagger.Parameter3 | Swagger.Parameter31): parameter is Swagger.Parameter3 | Swagger.Parameter31 => parameter.in === 'path'

describe('Renamed imports', () => {
  describe('runtime decorators', () => {
    const metadata = new MetadataGenerator('./fixtures/controllers/controllerWithAliasedImports.ts').Generate()
    const spec2 = new SpecGenerator2(metadata, getDefaultExtendedOptions()).GetSpec()
    const spec3 = new SpecGenerator3(metadata, getDefaultExtendedOptions()).GetSpec()

    it('should recognize aliased route and method decorators during metadata generation', () => {
      expect(metadata.controllers.map(controller => controller.path)).to.deep.equal(['AliasedDecorators', 'AliasedDecoratorsSecond'])
      expect(metadata.controllers[0].methods.map(method => method.name)).to.deep.equal(['getAliased', 'getAliasedRequestProp', 'postAliased'])
      expect(metadata.controllers[0].methods[0].method).to.equal('get')
      expect(metadata.controllers[0].methods[0].path).to.equal('{id}')
      expect(metadata.controllers[0].methods[1].method).to.equal('get')
      expect(metadata.controllers[0].methods[1].path).to.equal('requestProp')
      expect(metadata.controllers[0].methods[2].method).to.equal('post')
      expect(metadata.controllers[0].methods[2].path).to.equal('body')
    })

    it('should recognize aliased parameter, tags, security, and response decorators', () => {
      const controller = metadata.controllers[0]
      const getMethod = controller.methods.find(method => method.name === 'getAliased')
      const requestPropMethod = controller.methods.find(method => method.name === 'getAliasedRequestProp')
      const postMethod = controller.methods.find(method => method.name === 'postAliased')

      if (!getMethod || !requestPropMethod || !postMethod) {
        throw new Error('Expected aliased methods to be defined.')
      }

      expect(getMethod.tags).to.deep.equal(['MethodAliasTag', 'ControllerAliasTag'])
      expect(getMethod.security).to.deep.equal([{ api_key: [] }])
      expect(getMethod.parameters.map(parameter => ({ in: parameter.in, name: parameter.name }))).to.deep.equal([{ in: 'path', name: 'id' }])
      expect(requestPropMethod.parameters.map(parameter => ({ in: parameter.in, name: parameter.name }))).to.deep.equal([{ in: 'request-prop', name: 'query' }])
      expect(postMethod.parameters.map(parameter => ({ in: parameter.in, refName: 'type' in parameter ? (parameter.type as any).refName : undefined }))).to.deep.equal([
        { in: 'body', refName: 'TestModel' },
      ])

      const acceptedResponse = getMethod.responses.find(response => response.name === '202')
      if (!acceptedResponse || !acceptedResponse.schema || acceptedResponse.schema.dataType !== 'refObject') {
        throw new Error('Expected aliased response schema to resolve to a refObject.')
      }

      expect(acceptedResponse.schema.refName).to.equal('TestModel')
    })

    it('should resolve aliased imported models to one canonical schema name in OpenAPI 2', () => {
      expect(spec2.paths['/AliasedDecorators/{id}']?.get?.responses?.['200']?.schema).to.deep.equal({ $ref: '#/definitions/TestModel' })
      const pathParameter = spec2.paths['/AliasedDecorators/{id}']?.get?.parameters?.find(
        (parameter): parameter is Swagger.Swagger2PathParameter => isSwagger2PathParameter(parameter) && parameter.name === 'id',
      )
      expect(pathParameter).to.exist
      expect(pathParameter?.required).to.equal(true)
      expect(pathParameter?.type).to.equal('string')
      expect(spec2.paths['/AliasedDecorators/body']?.post?.parameters?.find(parameter => parameter.in === 'body')?.schema).to.deep.equal({
        $ref: '#/definitions/TestModel',
      })
      expect(spec2.definitions?.TestModel).to.exist
      expect(spec2.definitions?.TestSubModel).to.exist
      expect(spec2.definitions?.TestModelRenamed).to.be.undefined
      expect(spec2.definitions?.TestModelAlternative).to.be.undefined
    })

    it('should resolve aliased imported models to one canonical schema name in OpenAPI 3', () => {
      expect(spec3.paths['/AliasedDecorators/{id}']?.get?.responses?.[200]?.content?.['application/json']?.schema).to.deep.equal({
        $ref: '#/components/schemas/TestModel',
      })
      const pathParameter = spec3.paths['/AliasedDecorators/{id}']?.get?.parameters?.find(
        (parameter): parameter is Swagger.Parameter3 | Swagger.Parameter31 => isOpenApiPathParameter(parameter) && parameter.name === 'id',
      )
      expect(pathParameter).to.exist
      expect(pathParameter?.required).to.equal(true)
      expect(pathParameter?.schema?.type).to.equal('string')
      expect(spec3.paths['/AliasedDecorators/body']?.post?.requestBody?.content?.['application/json']?.schema).to.deep.equal({
        $ref: '#/components/schemas/TestModel',
      })
      expect(spec3.paths['/AliasedDecorators/body']?.post?.responses?.[200]?.content?.['application/json']?.schema).to.deep.equal({
        $ref: '#/components/schemas/TestSubModel',
      })
      expect(spec3.paths['/AliasedDecoratorsSecond']?.get?.responses?.[200]?.content?.['application/json']?.schema).to.deep.equal({
        $ref: '#/components/schemas/TestModel',
      })
      expect(spec3.components.schemas?.TestModel).to.exist
      expect(spec3.components.schemas?.TestSubModel).to.exist
      expect(spec3.components.schemas?.TestModelRenamed).to.be.undefined
      expect(spec3.components.schemas?.TestModelAlternative).to.be.undefined
    })
  })

  describe('top-level tsoa-next decorators', () => {
    const metadata = new MetadataGenerator('./fixtures/controllers/controllerWithAliasedTopLevelImports.ts').Generate()
    const spec2 = new SpecGenerator2(metadata, getDefaultExtendedOptions()).GetSpec()
    const spec3 = new SpecGenerator3(metadata, getDefaultExtendedOptions()).GetSpec()

    it('should recognize aliased decorators imported from tsoa-next', () => {
      expect(metadata.controllers.map(controller => controller.path)).to.deep.equal(['AliasedTopLevelDecorators'])
      expect(metadata.controllers[0].methods.map(method => method.name)).to.deep.equal(['getAliased'])
      expect(metadata.controllers[0].methods[0].method).to.equal('get')
      expect(metadata.controllers[0].methods[0].tags).to.deep.equal(['TopLevelAliasTag'])
    })

    it('should resolve tsoa-next aliased decorator imports to canonical schemas', () => {
      expect(spec2.paths['/AliasedTopLevelDecorators']?.get?.responses?.['200']?.schema).to.deep.equal({
        $ref: '#/definitions/TestModel',
      })
      expect(spec3.paths['/AliasedTopLevelDecorators']?.get?.responses?.[200]?.content?.['application/json']?.schema).to.deep.equal({
        $ref: '#/components/schemas/TestModel',
      })
    })
  })

  describe('negative controls', () => {
    it('should not recognize aliased decorators from non-runtime modules', () => {
      const metadata = new MetadataGenerator('./fixtures/controllers/controllerWithNonTsoaAliasedDecoratorImports.ts').Generate()

      expect(metadata.controllers).to.have.lengthOf(1)
      expect(metadata.controllers[0].path).to.equal('NonTsoaAliasedDecorators')
      expect(metadata.controllers[0].methods).to.deep.equal([])
    })
  })

  describe('model', () => {
    const metadata = new MetadataGenerator('./fixtures/controllers/controllerWithRenamedModelImport.ts').Generate()
    const spec2 = new SpecGenerator2(metadata, getDefaultExtendedOptions()).GetSpec()
    const spec3 = new SpecGenerator3(metadata, getDefaultExtendedOptions()).GetSpec()
    const baseRoute = '/RenamedModelImport'

    it('should generate a path for a function with a renamed model', () => {
      verifyPath(baseRoute)

      expect(spec2.definitions?.['TestModel']).to.exist
      expect(spec2.definitions?.['TestModelRenamed']).to.be.undefined
    })

    it('should generate a path for a function with a renamed model and a renamed parameter', () => {
      expect(spec3.paths?.[baseRoute]?.get?.responses?.[200]?.content?.['application/json']?.schema).to.deep.equal({
        $ref: '#/components/schemas/TestModel',
      })

      expect(spec3.components.schemas?.['TestModel']).to.exist
      expect(spec3.components.schemas?.['TestModelRenamed']).to.be.undefined
    })

    function verifyPath(route: string, isCollection?: boolean, isNoContent?: boolean) {
      return VerifyPath(spec2, route, path => path.get, isCollection, isNoContent, '#/definitions/TestModel')
    }
  })
})
