import { expect } from 'chai'
import 'mocha'
import { buildSpec, getSwaggerOutputPath, serializeSpec } from '../../../../packages/cli/src/module/generate-spec'
import { ExtendedSpecConfig } from '../../../../packages/cli'
import { MetadataGenerator } from '../../../../packages/cli/src/metadataGeneration/metadataGenerator'
import { Swagger } from '../../../../packages/runtime/src/swagger/swagger'

const fakeSwaggerConfig = ({ outputDirectory, yaml, specFileBaseName, ...more }: Partial<ExtendedSpecConfig> & { outputDirectory: string; yaml?: boolean; specFileBaseName?: string }) => {
  const answer: ExtendedSpecConfig = {
    entryFile: '',
    outputDirectory,
    yaml,
    specFileBaseName,
    noImplicitAdditionalProperties: 'throw-on-extras',
    ...more,
  }
  return answer
}

describe('getSwaggerOutputPath()', () => {
  it('should make the output path (base case)', () => {
    const result = getSwaggerOutputPath(
      fakeSwaggerConfig({
        outputDirectory: '.',
      }),
    )
    expect(result).to.equal('./swagger.json')
  })

  it('should make the output path (YAML)', () => {
    const result = getSwaggerOutputPath(
      fakeSwaggerConfig({
        outputDirectory: '.',
        yaml: true,
      }),
    )
    expect(result).to.equal('./swagger.yaml')
  })

  it('should make the output path (YAML, different filename)', () => {
    const result = getSwaggerOutputPath(
      fakeSwaggerConfig({
        outputDirectory: '.',
        yaml: true,
        specFileBaseName: 'api-spec',
      }),
    )
    expect(result).to.equal('./api-spec.yaml')
  })

  it('should make the output path (Different filename, Different directory)', () => {
    const result = getSwaggerOutputPath(
      fakeSwaggerConfig({
        outputDirectory: 'my-routes',
        specFileBaseName: 'private-routes',
      }),
    )
    expect(result).to.equal('my-routes/private-routes.json')
  })
})

describe('buildSpec()', () => {
  it('builds a spec object without writing files', () => {
    const config = fakeSwaggerConfig({
      entryFile: './fixtures/controllers/getController.ts',
      outputDirectory: '.',
      specVersion: 3,
    })
    const metadata = new MetadataGenerator('./fixtures/controllers/getController.ts').Generate()

    const spec = buildSpec(config, undefined, undefined, metadata)

    expect(spec).to.have.property('openapi', '3.0.0')
    expect(spec).to.have.nested.property('paths./GetTest.get')
  })
})

describe('serializeSpec()', () => {
  it('serializes specs as JSON', () => {
    const spec: Swagger.Spec2 = {
      info: {
        title: 'Example',
      },
      swagger: '2.0',
      paths: {},
    }
    const result = serializeSpec(spec)

    expect(result).to.contain('"swagger": "2.0"')
  })

  it('serializes specs as YAML when requested', () => {
    const spec: Swagger.Spec2 = {
      info: {
        title: 'Example',
      },
      swagger: '2.0',
      paths: {},
    }
    const result = serializeSpec(spec, true)

    expect(result).to.contain('swagger: "2.0"')
  })
})
