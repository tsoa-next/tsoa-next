import 'mocha'

import { expect } from 'chai'

import { MetadataGenerator } from '@tsoa-next/cli/metadataGeneration/metadataGenerator'
import { SpecGenerator2 } from '@tsoa-next/cli/swagger/specGenerator2'
import { SpecGenerator3 } from '@tsoa-next/cli/swagger/specGenerator3'
import { SpecGenerator31 } from '@tsoa-next/cli/swagger/specGenerator31'
import { getDefaultExtendedOptions } from '../../fixtures/defaultOptions'

describe('Exclusive numeric bounds', () => {
  it('captures exclusive validators for parameters and properties in metadata', () => {
    const parameterMetadata = new MetadataGenerator('./fixtures/controllers/exclusiveParameterController.ts').Generate()
    const rangeMethod = parameterMetadata.controllers[0].methods.find(method => method.name === 'range')
    const rangeParameter = rangeMethod?.parameters[0]

    expect(rangeParameter?.validators.exclusiveMinimum?.value).to.equal(5)
    expect(rangeParameter?.validators.exclusiveMaximum?.value).to.equal(10)

    const validateMetadata = new MetadataGenerator('./fixtures/controllers/validateController.ts').Generate()
    const validateModel = validateMetadata.referenceTypeMap.ValidateModel

    if (validateModel.dataType !== 'refObject') {
      throw new Error('ValidateModel was not generated as an object schema')
    }

    const exclusiveRangeProperty = validateModel.properties.find(property => property.name === 'numberExclusiveRange')
    expect(exclusiveRangeProperty?.validators.exclusiveMinimum?.value).to.equal(1.5)
    expect(exclusiveRangeProperty?.validators.exclusiveMaximum?.value).to.equal(3.5)
  }).timeout(15000)

  it('emits boolean exclusive bounds for Swagger 2.0', () => {
    const metadata = new MetadataGenerator('./fixtures/controllers/exclusiveParameterController.ts').Generate()
    const spec = new SpecGenerator2(metadata, getDefaultExtendedOptions()).GetSpec()

    const lowerParameter = spec.paths['/ExclusiveParameter/lower'].get?.parameters?.[0]
    expect(lowerParameter).to.include({ minimum: 5, exclusiveMinimum: true })
    expect(lowerParameter).not.to.have.property('schema')

    const upperParameter = spec.paths['/ExclusiveParameter/upper'].get?.parameters?.[0]
    expect(upperParameter).to.include({ maximum: 10, exclusiveMaximum: true })
    expect(upperParameter).not.to.have.property('schema')

    const rangeParameter = spec.paths['/ExclusiveParameter/range'].get?.parameters?.[0]
    expect(rangeParameter).to.include({ minimum: 5, exclusiveMinimum: true, maximum: 10, exclusiveMaximum: true })
    expect(rangeParameter).not.to.have.property('schema')
  })

  it('emits boolean exclusive bounds for OpenAPI 3.0', () => {
    const metadata = new MetadataGenerator('./fixtures/controllers/exclusiveParameterController.ts').Generate()
    const spec = new SpecGenerator3(metadata, getDefaultExtendedOptions()).GetSpec()

    const lowerParameter = spec.paths['/ExclusiveParameter/lower'].get?.parameters?.[0]
    expect(lowerParameter?.schema).to.include({ minimum: 5, exclusiveMinimum: true })
    expect(lowerParameter).not.to.have.property('minimum')
    expect(lowerParameter).not.to.have.property('exclusiveMinimum')
    expect(lowerParameter).not.to.have.property('type')

    const upperParameter = spec.paths['/ExclusiveParameter/upper'].get?.parameters?.[0]
    expect(upperParameter?.schema).to.include({ maximum: 10, exclusiveMaximum: true })
    expect(upperParameter).not.to.have.property('maximum')
    expect(upperParameter).not.to.have.property('exclusiveMaximum')
    expect(upperParameter).not.to.have.property('type')

    const rangeParameter = spec.paths['/ExclusiveParameter/range'].get?.parameters?.[0]
    expect(rangeParameter?.schema).to.include({ minimum: 5, exclusiveMinimum: true, maximum: 10, exclusiveMaximum: true })
    expect(rangeParameter).not.to.have.property('minimum')
    expect(rangeParameter).not.to.have.property('exclusiveMinimum')
    expect(rangeParameter).not.to.have.property('maximum')
    expect(rangeParameter).not.to.have.property('exclusiveMaximum')
    expect(rangeParameter).not.to.have.property('type')
  })

  it('rejects inclusive and exclusive conflicts for Swagger 2.0 and OpenAPI 3.0', () => {
    const metadata = new MetadataGenerator('./fixtures/controllers/exclusiveConflictController.ts').Generate()

    expect(() => new SpecGenerator2(metadata, getDefaultExtendedOptions()).GetSpec()).to.throw(
      'Cannot combine minimum and exclusiveMinimum in OpenAPI 2.0/3.0 schemas. Use only one lower-bound annotation or switch to OpenAPI 3.1.',
    )

    expect(() => new SpecGenerator3(metadata, getDefaultExtendedOptions()).GetSpec()).to.throw(
      'Cannot combine minimum and exclusiveMinimum in OpenAPI 2.0/3.0 schemas. Use only one lower-bound annotation or switch to OpenAPI 3.1.',
    )
  })

  it('emits numeric exclusive bounds in OpenAPI 3.1', () => {
    const metadata = new MetadataGenerator('./fixtures/controllers/exclusiveParameterController.ts').Generate()
    const spec = new SpecGenerator31(metadata, getDefaultExtendedOptions()).GetSpec()

    const lowerParameter = spec.paths['/ExclusiveParameter/lower'].get?.parameters?.[0]
    expect(lowerParameter?.schema).to.include({ exclusiveMinimum: 5 })
    expect(lowerParameter?.schema).not.to.have.property('minimum')
    expect(lowerParameter).not.to.have.property('exclusiveMinimum')
    expect(lowerParameter).not.to.have.property('type')

    const upperParameter = spec.paths['/ExclusiveParameter/upper'].get?.parameters?.[0]
    expect(upperParameter?.schema).to.include({ exclusiveMaximum: 10 })
    expect(upperParameter?.schema).not.to.have.property('maximum')
    expect(upperParameter).not.to.have.property('exclusiveMaximum')
    expect(upperParameter).not.to.have.property('type')

    const rangeParameter = spec.paths['/ExclusiveParameter/range'].get?.parameters?.[0]
    expect(rangeParameter?.schema).to.include({ exclusiveMinimum: 5, exclusiveMaximum: 10 })
    expect(rangeParameter).not.to.have.property('exclusiveMinimum')
    expect(rangeParameter).not.to.have.property('exclusiveMaximum')
    expect(rangeParameter).not.to.have.property('type')
  })

  it('allows inclusive and exclusive coexistence in OpenAPI 3.1', () => {
    const metadata = new MetadataGenerator('./fixtures/controllers/exclusiveConflictController.ts').Generate()
    const spec = new SpecGenerator31(metadata, getDefaultExtendedOptions()).GetSpec()

    const conflictParameter = spec.paths['/ExclusiveConflict/value'].get?.parameters?.[0]
    expect(conflictParameter?.schema).to.include({ minimum: 5, exclusiveMinimum: 5, maximum: 10, exclusiveMaximum: 10 })
  })

  it('emits exclusive type-alias bounds in each schema version', () => {
    const metadata = new MetadataGenerator('./fixtures/controllers/getController.ts').Generate()

    const spec2 = new SpecGenerator2(metadata, getDefaultExtendedOptions()).GetSpec()
    expect(spec2.definitions?.ExclusiveWindow).to.deep.include({
      type: 'integer',
      format: 'int32',
      exclusiveMinimum: true,
      minimum: 1,
      exclusiveMaximum: true,
      maximum: 100,
      example: 42,
    })

    const spec3 = new SpecGenerator3(metadata, getDefaultExtendedOptions()).GetSpec()
    expect(spec3.components.schemas?.ExclusiveWindow).to.deep.include({
      type: 'integer',
      format: 'int32',
      exclusiveMinimum: true,
      minimum: 1,
      exclusiveMaximum: true,
      maximum: 100,
      example: 42,
    })

    const spec31 = new SpecGenerator31(metadata, getDefaultExtendedOptions()).GetSpec()
    expect(spec31.components.schemas?.ExclusiveWindow).to.deep.include({
      type: 'integer',
      format: 'int32',
      exclusiveMinimum: 1,
      exclusiveMaximum: 100,
      example: 42,
    })
  })
})
