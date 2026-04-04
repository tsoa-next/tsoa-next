import { expect } from 'chai'
import 'mocha'
import { isNotNullOrUndefined } from '../../../packages/cli/src/utils/genericTypeGuards'

describe('genericTypeGuards', () => {
  it('filters nullish values', () => {
    const values = ['value', null, undefined].filter(isNotNullOrUndefined)

    expect(values).to.deep.equal(['value'])
  })
})
