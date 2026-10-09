import { expect } from 'chai'
import { MetadataGenerator } from '@tsoa-next/cli/metadataGeneration/metadataGenerator'
import { spy } from 'sinon'
import type { Tsoa } from '@tsoa-next/runtime'
import { checkForMethodSignatureDuplicates, checkForPathParamSignatureDuplicates } from '../../../../packages/cli/src/metadataGeneration/route-collisions'

describe('Overlapping routes', () => {
  const methodBase = new MetadataGenerator('./fixtures/controllers/getController.ts').Generate().controllers[0].methods[0]

  it('reports aggregated method duplicates in first-signature and controller traversal order', () => {
    const controllers: Tsoa.Controller[] = [
      {
        name: 'First',
        path: 'root',
        location: '',
        methods: [
          { ...methodBase, name: 'rootFirst', method: 'get', path: '' },
          { ...methodBase, name: 'childFirst', method: 'get', path: 'child' },
        ],
      },
      {
        name: 'Second',
        path: 'root',
        location: '',
        methods: [
          { ...methodBase, name: 'childSecond', method: 'get', path: 'child' },
          { ...methodBase, name: 'rootSecond', method: 'get', path: '' },
        ],
      },
    ]
    expect(() => checkForMethodSignatureDuplicates(controllers)).to.throw(
      'Duplicate method signature @get(root) found in controllers: First#rootFirst, Second#rootSecond\nDuplicate method signature @get(root/child) found in controllers: First#childFirst, Second#childSecond\n',
    )
  })

  it('preserves grouped collision warnings in controller and later-method order without mutating routes', () => {
    const controllers: Tsoa.Controller[] = [
      {
        name: 'First',
        path: 'root',
        location: '',
        methods: [
          { ...methodBase, name: 'one', method: 'get', path: '{id}' },
          { ...methodBase, name: 'two', method: 'get', path: ':identifier' },
          { ...methodBase, name: 'three', method: 'get', path: '{id}-{suffix}' },
        ],
      },
      {
        name: 'Second',
        path: 'root',
        location: '',
        methods: [
          { ...methodBase, name: 'one', method: 'get', path: '{id}' },
          { ...methodBase, name: 'two', method: 'get', path: ':identifier' },
        ],
      },
    ]
    const originalPaths = controllers.map(controller => controller.methods.map(method => method.path))
    const consoleWarn = spy(console, 'warn')
    try {
      checkForPathParamSignatureDuplicates(controllers)
      expect(consoleWarn.getCalls().map(call => call.args[0])).to.deep.equal([
        'Duplicate path parameter definition signature found in controller First [ method GET two route: :identifier ] collides with [ method GET one route: {id} ]\n',
        'Overlapping path parameter definition signature found in controller First [ method GET three route: {id}-{suffix} ] collides with [ method GET one route: {id} ], [ method GET two route: :identifier ]\n',
        'Duplicate path parameter definition signature found in controller Second [ method GET two route: :identifier ] collides with [ method GET one route: {id} ]\n',
      ])
      expect(controllers.map(controller => controller.methods.map(method => method.path))).to.deep.equal(originalPaths)
    } finally {
      consoleWarn.restore()
    }
  })

  it('rejects method duplicates before path-collision reporting at the generation junction', () => {
    const generator = new MetadataGenerator('./fixtures/controllers/duplicateMethodsController.ts')
    let pathCheckReached = false
    ;(generator as any).checkForPathParamSignatureDuplicates = () => {
      pathCheckReached = true
    }
    expect(() => generator.Generate()).to.throw('Duplicate method signature @get(GetTest/Complex)')
    expect(pathCheckReached).to.be.false
  })

  it('should reject methods with same routes', () => {
    expect(() => {
      new MetadataGenerator('./fixtures/controllers/duplicateMethodsController.ts').Generate()
    }).to.throw(`Duplicate method signature @get(GetTest/Complex) found in controllers: DuplicateMethodsTestController#getModel, DuplicateMethodsTestController#duplicateGetModel\n`)
  })

  it('should warn about duplicate path parameters', () => {
    const consoleWarn = spy(console, 'warn')

    new MetadataGenerator('./fixtures/controllers/duplicatePathParamController.ts').Generate()

    expect(
      consoleWarn.calledWith(
        'Duplicate path parameter definition signature found in controller DuplicatePathParamTestController [ method GET getPathParamTest2 route: {identifier} ] collides with [ method GET getPathParamTest route: {id} ]\n',
      ),
    ).to.be.true

    expect(
      consoleWarn.calledWith(
        'Duplicate path parameter definition signature found in controller DuplicatePathParamTestController [ method POST postPathParamTest2 route: {identifier} ] collides with [ method POST postPathParamTest route: {id} ]\n',
      ),
    ).to.be.true

    expect(
      consoleWarn.calledWith(
        'Duplicate path parameter definition signature found in controller DuplicatePathParamTestController [ method POST postPathParamTest3 route: :anotherIdentifier ] collides with [ method POST postPathParamTest route: {id} ], [ method POST postPathParamTest2 route: {identifier} ]\n',
      ),
    ).to.be.true

    expect(
      consoleWarn.calledWith(
        'Overlapping path parameter definition signature found in controller DuplicatePathParamTestController [ method POST postPathParamTest4 route: {identifier}-{identifier2} ] collides with [ method POST postPathParamTest route: {id} ], [ method POST postPathParamTest2 route: {identifier} ], [ method POST postPathParamTest3 route: :anotherIdentifier ]\n',
      ),
    ).to.be.true

    expect(
      consoleWarn.calledWith(
        'Duplicate path parameter definition signature found in controller DuplicatePathParamTestController [ method DELETE deletePathParamTest3 route: Delete/:identifier ] collides with [ method DELETE deletePathParamTest route: Delete/{id} ]\n',
      ),
    ).to.be.true

    expect(consoleWarn.callCount).to.be.eq(6)

    consoleWarn.restore()
  })
})
