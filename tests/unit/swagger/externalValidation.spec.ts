import { expect } from 'chai'
import 'mocha'
import { MetadataGenerator } from '@tsoa-next/cli/metadataGeneration/metadataGenerator'
import { SpecGenerator2 } from '@tsoa-next/cli/swagger/specGenerator2'
import { SpecGenerator3 } from '@tsoa-next/cli/swagger/specGenerator3'
import { getDefaultExtendedOptions } from '../../fixtures/defaultOptions'

describe('External validation metadata', function () {
  this.timeout(15000)

  const metadata = new MetadataGenerator('./fixtures/controllers/externalValidationController.ts').Generate()
  const spec2 = new SpecGenerator2(metadata, getDefaultExtendedOptions()).GetSpec()
  const spec3 = new SpecGenerator3(metadata, getDefaultExtendedOptions()).GetSpec()
  const controller = metadata.controllers[0]

  const getMethod = (methodName: string) => {
    const method = controller.methods.find(candidate => candidate.name === methodName)
    if (!method) {
      throw new Error(`Expected method '${methodName}' to exist.`)
    }

    return method
  }

  it('normalizes parameter-level external validator metadata for all supported kinds', () => {
    const cases = [
      ['zod', 'zod'],
      ['joi', 'joi'],
      ['yup', 'yup'],
      ['superstruct', 'superstruct'],
      ['ioTs', 'io-ts'],
    ] as const

    for (const [methodName, kind] of cases) {
      const parameter = getMethod(methodName).parameters[0]
      expect(parameter.parameterIndex).to.equal(0)
      expect(parameter.validationStrategy).to.equal('external')
      expect(parameter.externalValidator).to.deep.equal({
        kind,
        strategy: 'external',
      })
    }
  })

  it('preserves TypeOf-based io-ts aliases as first-class model refs', () => {
    const ioTsParameter = getMethod('ioTs').parameters[0]
    if (!('refName' in ioTsParameter.type) || ioTsParameter.type.refName !== 'Wager') {
      throw new Error('Expected io-ts body parameter to resolve to the Wager alias reference.')
    }

    expect(metadata.referenceTypeMap).to.have.property('Wager')
    expect(spec3.components.schemas?.Wager).to.include({
      type: 'object',
    })
    expect(spec3.components.schemas?.Wager).to.have.property('required').that.deep.equals(['outcome', 'amount'])
    expect(spec3.components.schemas?.Wager).to.have.nested.property('properties.amount.type', 'number')
    expect(spec3.components.schemas?.Wager).to.have.nested.property('properties.amount.format', 'double')
    expect(spec3.components.schemas?.Wager).to.have.nested.property('properties.outcome.type', 'number')
  })

  it('keeps alias-based models addressable in the generated spec', () => {
    expect(metadata.referenceTypeMap).to.have.property('ExternalObjectAlias')
    expect(metadata.referenceTypeMap).to.have.property('ExternalIntersectionAlias')
    expect(metadata.referenceTypeMap).to.have.property('ExternalObjectPageAlias')
    expect(metadata.referenceTypeMap).to.have.property('ExternalPage_ExternalObjectAlias_')
    expect(metadata.referenceTypeMap).to.have.property('ExternalSearchResultAlias')

    expect(spec3.paths['/ExternalValidation/alias']?.post?.requestBody?.content?.['application/json']?.schema).to.deep.equal({
      $ref: '#/components/schemas/ExternalIntersectionAlias',
    })
    expect(spec3.paths['/ExternalValidation/page']?.get?.responses?.[200]?.content?.['application/json']?.schema).to.deep.equal({
      $ref: '#/components/schemas/ExternalObjectPageAlias',
    })
    expect(spec3.paths['/ExternalValidation/search']?.get?.responses?.[200]?.content?.['application/json']?.schema).to.deep.equal({
      $ref: '#/components/schemas/ExternalSearchResultAlias',
    })
  })

  it('adds x-schema-validator vendor extensions without changing the TS-derived schema refs', () => {
    expect(spec2.paths['/ExternalValidation/zod']?.post?.parameters?.[0]).to.have.nested.property('schema.x-schema-validator', 'zod')
    expect(spec2.paths['/ExternalValidation/io-ts']?.post?.parameters?.[0]).to.have.nested.property('schema.x-schema-validator', 'io-ts')

    expect(spec3.paths['/ExternalValidation/zod']?.post?.requestBody?.content?.['application/json']?.schema).to.deep.equal({
      $ref: '#/components/schemas/ExternalObjectAlias',
      'x-schema-validator': 'zod',
    })
    expect(spec3.paths['/ExternalValidation/io-ts']?.post?.requestBody?.content?.['application/json']?.schema).to.deep.equal({
      $ref: '#/components/schemas/Wager',
      'x-schema-validator': 'io-ts',
    })
  })

  it('fails clearly for invalid validate decorator forms and unsupported targets', () => {
    expect(() => new MetadataGenerator('./fixtures/controllers/invalidValidateKindController.ts').Generate()).to.throw(
      '@Validate(kind, schema) requires a supported string kind and schema argument.',
    )
    expect(() => new MetadataGenerator('./fixtures/controllers/invalidValidateMissingSchemaController.ts').Generate()).to.throw(
      "@Validate('zod', schema) requires a schema argument.",
    )
    expect(() => new MetadataGenerator('./fixtures/controllers/invalidValidateObjectConfigController.ts').Generate()).to.throw(
      '@Validate({ kind, schema }) requires a supported string kind and a schema property.',
    )
    expect(() => new MetadataGenerator('./fixtures/controllers/invalidValidateInferenceController.ts').Generate()).to.throw(
      '@Validate(schema) could not infer the validator kind. Use @Validate(kind, schema) instead.',
    )
    expect(() => new MetadataGenerator('./fixtures/controllers/invalidValidateTargetController.ts').Generate()).to.throw(
      '@Validate is currently supported only on controller method parameters.',
    )
    expect(() => new MetadataGenerator('./fixtures/controllers/invalidValidateRequestParamController.ts').Generate()).to.throw(
      "@Validate is not supported on 'request' parameters in this release.",
    )
  })
})
