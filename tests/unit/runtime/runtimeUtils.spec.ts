import { expect } from 'chai'
import 'mocha'
import { CustomAttribute } from '../../../packages/runtime/src/decorators/customAttribute'
import { assertNever } from '../../../packages/runtime/src/utils/assertNever'

describe('runtime utils', () => {
  it('throws the discriminated union member in assertNever', () => {
    expect(() => assertNever('unexpected' as never)).to.throw('Unhandled discriminated union member: "unexpected"')
  })

  it('returns a no-op custom attribute decorator', () => {
    const decorator = CustomAttribute('x-test', 'value')
    expect(decorator).to.be.a('function')
    expect(() => decorator({}, 'field')).to.not.throw()
  })
})
