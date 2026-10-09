import { expect } from 'chai'
import 'mocha'
import type { Tsoa } from '@tsoa-next/runtime'
import { SpecGenerator31 } from '@tsoa-next/cli/swagger/specGenerator31'
import { getDefaultExtendedOptions } from '../../fixtures/defaultOptions'
import { getPropertySchemaType, hasUndefined, isRequiredWithoutDefault } from '../../../packages/cli/src/swagger/schema-metadata'

describe('Shared schema metadata', () => {
  it('projects supported validators in order before invoking the version hook with its original receiver', () => {
    const calls: string[] = []
    const validators: Tsoa.Validators = {}
    Object.defineProperties(validators, {
      isInt: {
        enumerable: true,
        get() {
          throw new Error('Unused non-schema validator')
        },
      },
      maxLength: {
        enumerable: true,
        get() {
          calls.push('maxLength')
          return { value: 10 }
        },
      },
      minimum: {
        enumerable: true,
        get() {
          calls.push('minimum')
          return { value: 1 }
        },
      },
      exclusiveMaximum: {
        enumerable: true,
        get() {
          calls.push('exclusiveMaximum')
          return { value: 5 }
        },
      },
    })
    class ProjectingGenerator extends SpecGenerator31 {
      public project(source: Tsoa.Validators) {
        return this.getSchemaValidators(source)
      }
      protected override transformSchemaValidators(source: Partial<Record<Tsoa.SchemaValidatorKey, unknown>>) {
        expect(this).to.equal(generator)
        expect(Object.keys(source)).to.deep.equal(['maxLength', 'minimum', 'exclusiveMaximum'])
        calls.push('transform')
        return super.transformSchemaValidators(source)
      }
    }
    const generator = new ProjectingGenerator({ controllers: [], referenceTypeMap: {} }, getDefaultExtendedOptions())
    expect(generator.project(validators)).to.deep.equal({ maxLength: 10, minimum: 1, exclusiveMaximum: 5 })
    expect(calls).to.deep.equal(['maxLength', 'minimum', 'exclusiveMaximum', 'transform'])
  })

  it('reports a reached projection failure before later validator values or the version hook', () => {
    const failure = new Error('Required validator metadata failed')
    const validators: Tsoa.Validators = {}
    Object.defineProperties(validators, {
      minimum: {
        enumerable: true,
        get() {
          throw failure
        },
      },
      maximum: {
        enumerable: true,
        get() {
          throw new Error('Unused later validator')
        },
      },
    })
    class FailingGenerator extends SpecGenerator31 {
      public project(source: Tsoa.Validators) {
        return this.getSchemaValidators(source)
      }
      protected override transformSchemaValidators(): Partial<Record<Tsoa.SchemaValidatorKey, unknown>> {
        throw new Error('Unused version transform')
      }
    }
    const generator = new FailingGenerator({ controllers: [], referenceTypeMap: {} }, getDefaultExtendedOptions())
    expect(() => generator.project(validators)).to.throw(failure)
  })

  it('preserves nullish-default, shallow undefined and single-intersection brand interpretation', () => {
    const property: Tsoa.Property = { name: 'value', type: { dataType: 'string' }, required: true, validators: {}, deprecated: false }
    for (const defaultValue of [undefined, null, false, 0, '']) {
      expect(isRequiredWithoutDefault({ ...property, default: defaultValue })).to.equal(defaultValue == null)
    }
    const optional = { ...property, required: false }
    Object.defineProperty(optional, 'default', {
      get() {
        throw new Error('Unused optional default')
      },
    })
    expect(isRequiredWithoutDefault(optional)).to.be.false
    expect(hasUndefined({ ...property, type: { dataType: 'union', types: [{ dataType: 'undefined' }, property.type] } })).to.be.true
    const branded: Tsoa.RefAliasType = { dataType: 'refAlias', refName: 'Branded', type: { dataType: 'intersection', types: [property.type] }, validators: {}, deprecated: false }
    expect(getPropertySchemaType(branded)).to.equal(property.type)
    const ordinaryAlias: Tsoa.RefAliasType = { ...branded, type: { dataType: 'undefined' } }
    expect(getPropertySchemaType(ordinaryAlias)).to.equal(ordinaryAlias)
    expect(hasUndefined({ ...property, type: ordinaryAlias })).to.be.false
    const combined: Tsoa.IntersectionType = { dataType: 'intersection', types: [property.type, { dataType: 'string' }] }
    expect(getPropertySchemaType(combined)).to.equal(combined)
  })
})
