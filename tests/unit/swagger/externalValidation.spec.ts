import { expect } from 'chai'
import 'mocha'
import { MetadataGenerator } from '@tsoa-next/cli/metadataGeneration/metadataGenerator'
import { SpecGenerator2 } from '@tsoa-next/cli/swagger/specGenerator2'
import { SpecGenerator3 } from '@tsoa-next/cli/swagger/specGenerator3'
import { getDefaultExtendedOptions } from '../../fixtures/defaultOptions'

describe('External validation metadata', function () {
  this.timeout(30000)

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
      ['joiInferred', 'joi'],
      ['yup', 'yup'],
      ['superstruct', 'superstruct'],
      ['upload', 'joi'],
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
      allOf: [{ $ref: '#/components/schemas/ExternalObjectAlias' }],
      'x-schema-validator': 'zod',
    })
    expect(spec3.paths['/ExternalValidation/io-ts']?.post?.requestBody?.content?.['application/json']?.schema).to.deep.equal({
      allOf: [{ $ref: '#/components/schemas/Wager' }],
      'x-schema-validator': 'io-ts',
    })
  })

  const invalidValidateCases = [
    {
      controller: 'invalidValidateKindController',
      expectedError: '@Validate(kind, schema) requires a supported string kind and schema argument.',
    },
    {
      controller: 'invalidValidateMissingSchemaController',
      expectedError: "@Validate('zod', schema) requires a schema argument.",
    },
    {
      controller: 'invalidValidateObjectConfigController',
      expectedError: '@Validate({ kind, schema }) requires a supported string kind and a schema property.',
    },
    {
      controller: 'invalidValidateInferenceController',
      expectedError: '@Validate(schema) could not infer the validator kind. Use @Validate(kind, schema) instead.',
    },
    {
      controller: 'invalidValidateTargetController',
      expectedError: '@Validate is currently supported only on controller method parameters.',
    },
    {
      controller: 'invalidValidateRequestParamController',
      expectedError: "@Validate is not supported on 'request' parameters in this release.",
    },
  ] as const

  for (const { controller: invalidController, expectedError } of invalidValidateCases) {
    it(`fails clearly for ${invalidController}`, () => {
      expect(() => new MetadataGenerator(`./fixtures/controllers/${invalidController}.ts`).Generate()).to.throw(expectedError)
    })
  }

  it('infers validator kinds for namespace-imported schemas used in bare @Validate(schema) form', () => {
    const parameter = getMethod('joiInferred').parameters[0]
    expect(parameter.externalValidator).to.deep.equal({
      kind: 'joi',
      strategy: 'external',
    })
  })

  it('allows external validation on uploaded file parameters by treating them as form data', () => {
    const parameter = getMethod('upload').parameters[0]

    expect(parameter.in).to.equal('formData')
    expect(parameter.externalValidator).to.deep.equal({
      kind: 'joi',
      strategy: 'external',
    })
  })
})
