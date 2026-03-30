import { expect } from 'chai'
import 'mocha'
import * as ts from 'typescript'
import { TypeResolver } from '../../../packages/cli/src/metadataGeneration/typeResolver'

describe('TypeResolver', () => {
  const resolver = new TypeResolver(ts.factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword), {} as any)
  const getRefTypeName = (name: string): string => (resolver as any).getRefTypeName(name)

  it('should normalize type literal property separators without regex backtracking', () => {
    expect(getRefTypeName('SuccessResponse_indexesCreated:number_')).to.equal('SuccessResponse_indexesCreated-number_')
  })

  it('should normalize indexed access segments after property replacement', () => {
    expect(getRefTypeName('Partial_SerializedDatasourceWithVersion[format]_')).to.equal('Partial_SerializedDatasourceWithVersion-at-format_')
  })

  it('should normalize indexed access segments after parenthesized types', () => {
    expect(getRefTypeName('(A|B)[K]')).to.equal('_40_A-or-B_41_-at-K')
  })
})
