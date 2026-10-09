import 'mocha'
import { expect } from 'chai'
import { getDefaultExtendedOptions } from '../../fixtures/defaultOptions'
import { MetadataGenerator } from '@tsoa-next/cli/metadataGeneration/metadataGenerator'
import { ExtendedSpecConfig } from '@tsoa-next/cli'
import { Swagger, Tsoa } from '@tsoa-next/runtime'
import { SpecGenerator2 } from '@tsoa-next/cli/swagger/specGenerator2'
import { SpecGenerator31 } from '@tsoa-next/cli/swagger/specGenerator31'
import { SpecGenerator3 } from '@tsoa-next/cli/swagger/specGenerator3'
import { recursiveMerge } from '@tsoa-next/cli/utils/specMerge'

describe('specMergins', () => {
  const metadata = new MetadataGenerator('./fixtures/controllers/getController.ts').Generate()
  const defaultOptions: ExtendedSpecConfig = getDefaultExtendedOptions()

  describe('recursive', () => {
    const addedParameter: Swagger.Parameter3 = {
      name: 'deepQueryParamObject',
      in: 'query',
      style: 'deepObject',
      explode: true,
      description: 'Accepts a deep Object as query param',
      examples: {
        color: {
          description: 'Setting a rgb color',
          value: { color: 'rgba(100, 23, 12, 1)' },
        },
      },
      schema: {
        type: 'object',
        additionalProperties: true,
      },
    }

    const options: ExtendedSpecConfig = {
      ...defaultOptions,
      specMerging: 'recursive',
      spec: {
        paths: {
          '/GetTest/DateParam': {
            get: {
              operationId: 'OverriddenId',
              parameters: [addedParameter],
            },
          },
        },
      },
    }
    const mergedSpec = new SpecGenerator3(metadata, options).GetSpec()

    it('merges arrays', () => {
      expect(mergedSpec.paths['/GetTest/DateParam'].get?.parameters).to.deep.eq([
        {
          description: undefined,
          example: undefined,
          in: 'query',
          name: 'date',
          required: true,
          schema: { format: 'date-time', type: 'string', default: undefined, enum: undefined },
        },
        addedParameter,
      ])
    })

    it('merges deep object, overriding primitives', () => {
      expect(mergedSpec.paths['/GetTest/DateParam'].get?.operationId).to.eq('OverriddenId')
    })

    it('does not affect anything else', () => {
      const originalSpec = new SpecGenerator3(metadata, defaultOptions).GetSpec()

      originalSpec.paths['/GetTest/DateParam'].get!.operationId = 'OverriddenId'
      originalSpec.paths['/GetTest/DateParam'].get?.parameters?.push(addedParameter as any)

      expect(mergedSpec).to.deep.eq(originalSpec)
    })

    it('skips unsafe keys when recursively merging user supplied specs', () => {
      const pollutedSource = JSON.parse('{"__proto__":{"polluted":"yes"}}') as Swagger.Spec3

      const merged = recursiveMerge({}, pollutedSource as unknown as Record<string, unknown>)

      expect(Object.prototype.hasOwnProperty.call(merged, '__proto__')).to.equal(false)
      expect(({} as { polluted?: string }).polluted).to.equal(undefined)
    })
  })

  describe('deepMerging', () => {
    const addedParameter: Swagger.Parameter3 = {
      name: 'appearance',
      in: 'query',
      style: 'deepObject',
      explode: true,
      description: 'Accepts an object containing style information for the marker',
      examples: {
        color: {
          description: 'Setting a rgb color',
          value: { color: 'rgba(100, 23, 12, 1)' },
        },
      },
      schema: {
        type: 'object',
        additionalProperties: true,
      },
    }

    const options: ExtendedSpecConfig = {
      ...defaultOptions,
      specMerging: 'deepmerge',
      spec: {
        paths: {
          '/GetTest/DateParam': {
            get: {
              operationId: 'OverriddenId',
              parameters: [addedParameter],
            },
          },
        },
      },
    }
    const mergedSpec = new SpecGenerator3(metadata, options).GetSpec()

    it('merges arrays', () => {
      expect(mergedSpec.paths['/GetTest/DateParam'].get?.parameters).to.deep.eq([
        {
          description: undefined,
          example: undefined,
          in: 'query',
          name: 'date',
          required: true,
          schema: { format: 'date-time', type: 'string', default: undefined, enum: undefined },
        },
        addedParameter,
      ])
    })

    it('merges deep object, overriding primitives', () => {
      expect(mergedSpec.paths['/GetTest/DateParam'].get?.operationId).to.eq('OverriddenId')
    })

    it('does not affect anything else', () => {
      const originalSpec = new SpecGenerator3(metadata, defaultOptions).GetSpec()

      originalSpec.paths['/GetTest/DateParam'].get!.operationId = 'OverriddenId'

      originalSpec.paths['/GetTest/DateParam'].get?.parameters?.push(addedParameter as any)

      expect(mergedSpec).to.deep.eq(originalSpec)
    })
  })
})

describe('configured spec merge compatibility across versions', () => {
  const metadata: Tsoa.Metadata = { controllers: [], referenceTypeMap: {} }
  const versions = [
    { version: '2.0', generate: (config: ExtendedSpecConfig) => new SpecGenerator2(metadata, config).GetSpec() },
    { version: '3.0.0', generate: (config: ExtendedSpecConfig) => new SpecGenerator3(metadata, config).GetSpec() },
    { version: '3.1.0', generate: (config: ExtendedSpecConfig) => new SpecGenerator31(metadata, config).GetSpec() },
  ]

  for (const { version, generate } of versions) {
    for (const mode of ['immediate', 'recursive', 'deepmerge'] as const) {
      it(`${version} preserves ${mode} overlay precedence, nesting and array semantics`, () => {
        const tag = { name: 'shared' }
        const overlay = { info: { title: 'Overlay title', license: { url: 'https://example.com/license' } }, tags: [tag] }
        const config: ExtendedSpecConfig = { ...getDefaultExtendedOptions(), tags: [tag], specMerging: mode, spec: overlay }
        const spec = generate(config)

        expect('swagger' in spec ? spec.swagger : spec.openapi).to.equal(version)
        expect(spec.info.title).to.equal('Overlay title')
        expect(spec.info.license).to.deep.equal(mode === 'immediate' ? overlay.info.license : { name: 'MIT', ...overlay.info.license })
        expect(spec.tags).to.deep.equal(mode === 'recursive' ? [tag, tag] : [tag])
        expect(config.specMerging).to.equal(mode)
        expect(overlay).to.deep.equal({ info: { title: 'Overlay title', license: { url: 'https://example.com/license' } }, tags: [tag] })
        if (mode === 'immediate') {
          expect(spec.info).to.equal(overlay.info)
          expect(spec.tags).to.equal(overlay.tags)
        } else {
          expect(spec.info).not.to.equal(overlay.info)
          expect(spec.tags).not.to.equal(overlay.tags)
        }
      })
    }

    it(`${version} defaults a supplied overlay to immediate and leaves unused merge configuration alone`, () => {
      const withoutOverlay = getDefaultExtendedOptions()
      generate(withoutOverlay)
      expect(withoutOverlay.specMerging).to.be.undefined
      const overlay = { info: { title: 'Replacement' } }
      const config: ExtendedSpecConfig = { ...getDefaultExtendedOptions(), spec: overlay }
      expect(generate(config).info).to.equal(overlay.info)
      expect(config.specMerging).to.equal('immediate')
    })
  }

  for (const mode of ['immediate', 'recursive', 'deepmerge'] as const) {
    it(`Swagger 2 configured schemes override the ${mode} overlay after merging`, () => {
      const config: ExtendedSpecConfig = { ...getDefaultExtendedOptions(), specMerging: mode, schemes: ['https'], spec: { schemes: ['http'] } }
      const spec = new SpecGenerator2(metadata, config).GetSpec()
      expect(spec.schemes).to.equal(config.schemes)
      expect(spec.schemes).to.deep.equal(['https'])
    })
  }
})
