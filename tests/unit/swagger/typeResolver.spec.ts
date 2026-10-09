import { expect } from 'chai'
import { promises as fs } from 'node:fs'
import 'mocha'
import { tmpdir } from 'node:os'
import { dirname, join, resolve } from 'node:path'
import * as ts from 'typescript'
import type { Tsoa } from '@tsoa-next/runtime'
import { resolveKeyOfTypeOperator, resolveKeyOfIndexType, resolveFallbackKeyOfType } from '../../../packages/cli/src/metadataGeneration/key-of-type'
import { resolveMappedType } from '../../../packages/cli/src/metadataGeneration/mapped-type'
import { resolveTupleTypeNode } from '../../../packages/cli/src/metadataGeneration/structural-type'
import { MetadataGenerator } from '../../../packages/cli/src/metadataGeneration/metadataGenerator'
import { GenerateMetadataError } from '../../../packages/cli/src/metadataGeneration/exceptions'
import { formatDefaultString } from '../../../packages/cli/src/metadataGeneration/default-value'
import { TypeResolver, type Context } from '../../../packages/cli/src/metadataGeneration/typeResolver'

describe('TypeResolver', () => {
  const resolver = new TypeResolver(ts.factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword), {} as any)
  const getRefTypeName = (name: string): string => (resolver as any).getRefTypeName(name)
  const getDefaultProperty = (jsDocTag: string) => {
    const sourceFile = ts.createSourceFile('defaults.ts', `interface Defaults {\n  /** ${jsDocTag} */\n  value: string\n}`, ts.ScriptTarget.ES2021, true, ts.ScriptKind.TS)

    const interfaceDeclaration = sourceFile.statements.find(ts.isInterfaceDeclaration)
    if (!interfaceDeclaration) {
      throw new Error('Missing interface declaration')
    }

    const property = interfaceDeclaration.members.find(ts.isPropertySignature)
    if (!property) {
      throw new Error('Missing property signature')
    }

    return property
  }

  it('should normalize type literal property separators without regex backtracking', () => {
    expect(getRefTypeName('SuccessResponse_indexesCreated:number_')).to.equal('SuccessResponse_indexesCreated-number_')
  })

  it('should normalize indexed access segments after property replacement', () => {
    expect(getRefTypeName('Partial_SerializedDatasourceWithVersion[format]_')).to.equal('Partial_SerializedDatasourceWithVersion-at-format_')
  })

  it('should normalize indexed access segments after parenthesized types', () => {
    expect(getRefTypeName('(A|B)[K]')).to.equal('_40_A-or-B_41_-at-K')
  })

  describe('structural resolution boundaries', () => {
    it('retains tuple child order, owning elements, context identity and rest unwrapping', () => {
      const current = { defaultNumberType: 'double' } as MetadataGenerator
      const context: Context = {}
      const calls: Array<{ node: ts.TypeNode; parent: ts.Node | undefined }> = []
      class ChildResolver extends TypeResolver {
        constructor(
          private readonly node: ts.TypeNode,
          owner: MetadataGenerator,
          parent?: ts.Node,
          childContext: Context = {},
        ) {
          super(node, owner, parent, childContext)
          expect(owner).to.equal(current)
          expect(childContext).to.equal(context)
          calls.push({ node, parent })
        }
        public override resolve(): Tsoa.Type {
          return ts.isArrayTypeNode(this.node) ? { dataType: 'array', elementType: { dataType: 'string' } } : { dataType: 'double' }
        }
      }
      const first = ts.factory.createNamedTupleMember(undefined, ts.factory.createIdentifier('count'), undefined, ts.factory.createKeywordTypeNode(ts.SyntaxKind.NumberKeyword))
      const rest = ts.factory.createRestTypeNode(ts.factory.createArrayTypeNode(ts.factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword)))
      const tuple = ts.factory.createTupleTypeNode([first, rest])
      expect(resolveTupleTypeNode(tuple, current, context, ChildResolver)).to.deep.equal({ dataType: 'tuple', types: [{ dataType: 'double' }], restType: { dataType: 'string' } })
      expect(calls.map(call => call.node)).to.deep.equal([first.type, rest.type])
      expect(calls[0].parent).to.equal(first)
      expect(calls[1].parent).to.equal(rest)
    })

    it('reports the first unsupported union child without resolving a later child', () => {
      const source = ts.createSourceFile('structural.ts', 'type Selection = symbol | string', ts.ScriptTarget.ES2021, true)
      const declaration = source.statements.find(ts.isTypeAliasDeclaration)
      if (!declaration || !ts.isUnionTypeNode(declaration.type)) throw new Error('Expected union fixture')
      Object.defineProperty(declaration.type.types[1], 'kind', {
        get: () => {
          throw new Error('Unused union child inspected')
        },
      })
      expect(() => new TypeResolver(declaration.type, { defaultNumberType: 'double' } as MetadataGenerator).resolve()).to.throw(GenerateMetadataError, 'Unknown type: SymbolKeyword')
    })
  })

  describe('declaration annotation compatibility', () => {
    it('uses JSDoc annotations without reading an unused decorator checker', () => {
      const source = ts.createSourceFile(
        'annotations.ts',
        `interface Model {
        /**
         * @example {"value":42}
         * @format custom-format
         * @title Custom title
         */
        value: string
      }`,
        ts.ScriptTarget.ES2021,
        true,
      )
      const declaration = source.statements.find(ts.isInterfaceDeclaration)
      if (!declaration || !ts.isPropertySignature(declaration.members[0])) throw new Error('Expected annotated property')
      const current = {
        get typeChecker(): ts.TypeChecker {
          throw new Error('Unused decorator checker read')
        },
      } as MetadataGenerator
      const annotationResolver = new TypeResolver(ts.factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword), current)
      const property = declaration.members[0]
      expect(annotationResolver.getNodeExample(property)).to.deep.equal({ value: 42 })
      expect(annotationResolver.getNodeFormat(property)).to.equal('custom-format')
      expect(annotationResolver.getNodeTitle(property)).to.equal('Custom title')
    })

    it('does not read documentation checker when declaration lookup has no symbol', () => {
      let checkerReads = 0
      const current = {
        get typeChecker(): ts.TypeChecker {
          if (++checkerReads > 1) throw new Error('Unused documentation checker read')
          return { getSymbolAtLocation: () => undefined } as unknown as ts.TypeChecker
        },
      } as MetadataGenerator
      const annotationResolver = new TypeResolver(ts.factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword), current)
      const property = ts.factory.createPropertySignature(undefined, 'missing', undefined, ts.factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword))
      expect(annotationResolver.getNodeDescription(property)).to.be.undefined
      expect(checkerReads).to.equal(1)
    })

    it('clears parameter symbol flags before reading its documentation checker', () => {
      let checkerReads = 0
      const symbol = {
        flags: ts.SymbolFlags.Property,
        getDocumentationComment: () => [{ text: 'Parameter description', kind: 'text' }],
      } as unknown as ts.Symbol
      const checker = { getSymbolAtLocation: () => symbol } as unknown as ts.TypeChecker
      const current = {
        get typeChecker(): ts.TypeChecker {
          if (++checkerReads > 1) expect(symbol.flags).to.equal(0)
          return checker
        },
      } as MetadataGenerator
      const annotationResolver = new TypeResolver(ts.factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword), current)
      const parameter = ts.factory.createParameterDeclaration(undefined, undefined, 'value', undefined, ts.factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword))
      expect(annotationResolver.getNodeDescription(parameter)).to.equal('Parameter description')
      expect(symbol.flags).to.equal(0)
      expect(checkerReads).to.equal(2)
    })

    it('retains public annotation override dispatch for reached properties', () => {
      class AnnotatedResolver extends TypeResolver {
        public override getNodeDescription() {
          return 'Override description'
        }
        public override getNodeFormat() {
          return 'override-format'
        }
        public override getNodeTitle() {
          return 'Override title'
        }
        public override getNodeExample() {
          return { value: 'override' }
        }
        public override getNodeExtension() {
          return [{ key: 'x-override' as const, value: true }]
        }
      }
      const property = ts.factory.createPropertySignature(undefined, 'value', undefined, ts.factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword))
      const type = new AnnotatedResolver(ts.factory.createTypeLiteralNode([property]), {} as MetadataGenerator).resolve()
      if (type.dataType !== 'nestedObjectLiteral') throw new Error('Expected nested object')
      expect(type.properties[0]).to.include({ description: 'Override description', format: 'override-format', title: 'Override title' })
      expect(type.properties[0].example).to.deep.equal({ value: 'override' })
      expect(type.properties[0].extensions).to.deep.equal([{ key: 'x-override', value: true }])
    })
  })

  describe('mapped resolution boundaries', () => {
    function mappedFixture() {
      const source = ts.createSourceFile(
        'mapped.ts',
        `interface Original {
        /** @default "initial"
         * @deprecated
         */
        value?: string
        /** @ignore */
        hidden: string
      }
      type Mapped = { [P in keyof Original]: Original[P] }`,
        ts.ScriptTarget.ES2021,
        true,
      )
      const original = source.statements.find(ts.isInterfaceDeclaration)
      const alias = source.statements.find(ts.isTypeAliasDeclaration)
      if (!original || !alias || !ts.isMappedTypeNode(alias.type)) throw new Error('Expected mapped fixture')
      return { property: original.members[0], ignored: original.members[1], mapped: alias.type }
    }

    it('retains synthetic declaration metadata, public hook receiver, child context and index order', () => {
      const { property, ignored, mapped } = mappedFixture()
      const context: Context = {}
      const events: string[] = []
      const propertyType = { flags: ts.TypeFlags.String } as ts.Type
      const numberIndex = { flags: ts.TypeFlags.Number } as ts.Type
      const neverIndex = { flags: ts.TypeFlags.Never } as ts.Type
      const origin = { name: 'value', declarations: [property] } as unknown as ts.Symbol
      const valueSymbol = {
        flags: ts.SymbolFlags.Optional,
        name: 'value',
        links: { syntheticOrigin: origin },
        get declarations() {
          events.push('filter-value')
          return undefined
        },
        getName: () => 'value',
        getDocumentationComment: () => [{ text: 'Original description', kind: 'text' }],
      } as unknown as ts.Symbol
      const ignoredSymbol = {
        get declarations() {
          events.push('filter-hidden')
          return [ignored]
        },
      } as unknown as ts.Symbol
      const type = { flags: ts.TypeFlags.Object, getProperties: () => [valueSymbol, ignoredSymbol] } as unknown as ts.Type
      const current = {
        typeChecker: {
          getTypeOfSymbolAtLocation: (symbol: ts.Symbol, node: ts.Node) => {
            expect(symbol).to.equal(valueSymbol)
            expect(node).to.equal(mapped)
            expect(events.slice(0, 2)).to.deep.equal(['filter-value', 'filter-hidden'])
            events.push('property')
            return propertyType
          },
          typeToTypeNode: (type: ts.Type) =>
            ts.factory.createKeywordTypeNode(type === neverIndex ? ts.SyntaxKind.NeverKeyword : type === numberIndex ? ts.SyntaxKind.NumberKeyword : ts.SyntaxKind.StringKeyword),
          getIndexInfosOfType: () => {
            events.push('indices')
            return [{ type: neverIndex }, { type: numberIndex }, { type: propertyType }]
          },
        },
      } as unknown as MetadataGenerator
      class ChildResolver extends TypeResolver {
        constructor(
          node: ts.TypeNode,
          owner: MetadataGenerator,
          parent?: ts.Node,
          childContext: Context = {},
          private readonly childType?: ts.Type,
        ) {
          super(node, owner, parent, childContext, childType)
          expect(owner).to.equal(current)
          expect(childContext).to.equal(context)
          expect(parent).to.equal(events.includes('indices') ? mapped : property)
        }
        public override resolve(): Tsoa.Type {
          events.push(this.childType === numberIndex ? 'number' : 'string')
          return this.childType === numberIndex ? { dataType: 'double' } : { dataType: 'string' }
        }
      }
      class AnnotationResolver extends TypeResolver {
        public override getNodeFormat(node: ts.Node) {
          expect(this).to.equal(annotations)
          expect(node).to.equal(property)
          return 'custom-format'
        }
        public override getNodeExample(node: ts.Node) {
          expect(this).to.equal(annotations)
          expect(node).to.equal(property)
          return 'example'
        }
        public override getNodeExtension(node: ts.Node) {
          expect(this).to.equal(annotations)
          expect(node).to.equal(property)
          return [{ key: 'x-custom' as const, value: true }]
        }
      }
      const annotations = new AnnotationResolver(mapped, current)
      const result = resolveMappedType(type, mapped, mapped, current, context, annotations, ChildResolver)
      if (result.dataType !== 'nestedObjectLiteral') throw new Error('Expected mapped object')
      expect(result.properties).to.have.length(1)
      expect(result.properties[0]).to.include({
        name: 'value',
        required: false,
        deprecated: true,
        default: 'initial',
        description: 'Original description',
        format: 'custom-format',
        example: 'example',
      })
      expect(result.properties[0].extensions).to.deep.equal([{ key: 'x-custom', value: true }])
      expect(result.additionalProperties).to.deep.equal({ dataType: 'union', types: [{ dataType: 'double' }, { dataType: 'string' }] })
      expect(events.slice(-3)).to.deep.equal(['indices', 'number', 'string'])
    })

    it('reports a reached property failure without resolving later properties or indices', () => {
      const { mapped } = mappedFixture()
      const first = { flags: 0, name: 'first' } as ts.Symbol
      const unused = { flags: 0, name: 'unused' } as ts.Symbol
      const failure = new Error('Property type unavailable')
      const current = {
        typeChecker: {
          getTypeOfSymbolAtLocation: (symbol: ts.Symbol) => {
            expect(symbol).to.equal(first)
            throw failure
          },
          getIndexInfosOfType: () => {
            throw new Error('Unused indices reached')
          },
        },
      } as unknown as MetadataGenerator
      const type = { flags: ts.TypeFlags.Object, getProperties: () => [first, unused] } as unknown as ts.Type
      expect(() => resolveMappedType(type, mapped, mapped, current, {}, new TypeResolver(mapped, current), TypeResolver)).to.throw(failure)
    })
  })

  describe('key-of resolution boundaries', () => {
    function keyOfFixture() {
      const source = ts.createSourceFile('keys.ts', 'type Keys = keyof Model', ts.ScriptTarget.ES2021, true)
      const declaration = source.statements.find(ts.isTypeAliasDeclaration)
      if (!declaration || !ts.isTypeOperatorNode(declaration.type)) throw new Error('Expected key-of fixture')
      return declaration.type
    }

    it('reports a required contextual child failure before unused key fallback paths', () => {
      const node = keyOfFixture()
      const indexedType = {
        isIndexType: () => true,
        type: { flags: ts.TypeFlags.TypeParameter, getSymbol: () => ({ getEscapedName: () => 'T' }) },
        isUnion: () => {
          throw new Error('Unused union fallback reached')
        },
        isLiteral: () => {
          throw new Error('Unused literal fallback reached')
        },
      } as unknown as ts.Type
      const checker = { getTypeFromTypeNode: () => indexedType } as unknown as ts.TypeChecker
      const current = { defaultNumberType: 'double', typeChecker: checker } as MetadataGenerator
      const context: Context = { T: { name: 'T', type: ts.factory.createKeywordTypeNode(ts.SyntaxKind.SymbolKeyword) } }
      expect(() => resolveKeyOfTypeOperator(node, checker, current, context, undefined, TypeResolver)).to.throw(GenerateMetadataError, 'Unknown type: SymbolKeyword')
    })

    it('preserves mixed key order and skipped-member warning source', () => {
      const node = keyOfFixture()
      const literal = (value: string | number) => ({ value, isLiteral: () => true }) as unknown as ts.LiteralType
      const symbol = { flags: ts.TypeFlags.ESSymbol, isLiteral: () => false } as ts.Type
      const type = { isIndexType: () => false, isUnion: () => true, types: [literal(2), literal('b'), symbol, literal(1), literal('a')] } as unknown as ts.Type
      const checker = {
        getTypeFromTypeNode: () => type,
        typeToString: (member: ts.Type) => (member === symbol ? 'symbol' : String((member as ts.LiteralType).value)),
      } as unknown as ts.TypeChecker
      const warnings: unknown[] = []
      const previousWarn = console.warn
      console.warn = warning => warnings.push(warning)
      try {
        expect(resolveKeyOfTypeOperator(node, checker, {} as MetadataGenerator, {}, undefined, TypeResolver)).to.deep.equal({
          dataType: 'union',
          types: [
            { dataType: 'enum', enums: ['b', 'a'] },
            { dataType: 'enum', enums: [2, 1] },
          ],
        })
      } finally {
        console.warn = previousWarn
      }
      expect(warnings).to.have.length(1)
      expect(warnings[0]).to.include('Skipped non-literal type(s) symbol')
      expect(warnings[0]).to.include('At: keys.ts:1:1.')
      expect(warnings[0]).to.include("This was caused by 'type Keys = keyof Model'")
    })
  })

  describe('indexed-access resolution boundaries', () => {
    function indexedFixture(expression: string) {
      const source = ts.createSourceFile('indexed.ts', `type Selected = ${expression}`, ts.ScriptTarget.ES2021, true)
      const declaration = source.statements.find(ts.isTypeAliasDeclaration)
      if (!declaration || !ts.isIndexedAccessTypeNode(declaration.type)) throw new Error('Expected indexed-access fixture')
      return declaration.type
    }

    it('uses the selected contextual type and preserves an optional property value', () => {
      const node = indexedFixture("T['value']")
      const selectedType = { flags: ts.TypeFlags.Object } as ts.Type
      const propertyType = ts.factory.createUnionTypeNode([ts.factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword), ts.factory.createKeywordTypeNode(ts.SyntaxKind.UndefinedKeyword)])
      const declaration = ts.factory.createPropertySignature(undefined, 'value', ts.factory.createToken(ts.SyntaxKind.QuestionToken), propertyType)
      const checker = {
        getPropertyOfType: (type: ts.Type, name: string) => {
          expect(type).to.equal(selectedType)
          expect(name).to.equal('value')
          return { valueDeclaration: declaration }
        },
        typeToString: () => 'SelectedModel',
        getTypeFromTypeNode: () => {
          throw new Error('Unused contextual type lookup')
        },
        getTypeOfSymbolAtLocation: () => {
          throw new Error('Unused inferred property lookup')
        },
      } as unknown as ts.TypeChecker
      const current = { typeChecker: checker } as MetadataGenerator
      const context: Context = {
        T: { name: 'T', type: ts.factory.createTypeLiteralNode([]), resolvedType: selectedType },
        get Unused(): Context[string] {
          throw new Error('Unused generic context read')
        },
      }
      expect(new TypeResolver(node, current, undefined, context).resolve()).to.deep.equal({ dataType: 'union', types: [{ dataType: 'string' }, { dataType: 'undefined' }] })
    })

    it('reports a missing selected property before attempting to build its type', () => {
      const node = indexedFixture("T['missing']")
      const selectedType = { flags: ts.TypeFlags.Object } as ts.Type
      const checker = {
        getPropertyOfType: (type: ts.Type, name: string) => {
          expect(type).to.equal(selectedType)
          expect(name).to.equal('missing')
          return undefined
        },
        typeToString: () => 'SelectedModel',
        typeToTypeNode: () => {
          throw new Error('Unused property builder reached')
        },
      } as unknown as ts.TypeChecker
      const context: Context = { T: { name: 'T', type: ts.factory.createTypeLiteralNode([]), resolvedType: selectedType } }
      expect(() => new TypeResolver(node, { typeChecker: checker } as MetadataGenerator, undefined, context).resolve()).to.throw(
        GenerateMetadataError,
        'Could not determine the keys on SelectedModel\nAt: indexed.ts:1:1.',
      )
    })

    it('does not resolve a referencer for unmatched keyed object and index types', () => {
      const node = indexedFixture('Model[keyof Other]')
      const checker = {
        getTypeFromTypeNode: () => {
          throw new Error('Unused referencer reached')
        },
        typeToTypeNode: () => {
          throw new Error('Unused indexed builder reached')
        },
      } as unknown as ts.TypeChecker
      expect(() => new TypeResolver(node, { typeChecker: checker } as MetadataGenerator).resolve()).to.throw(GenerateMetadataError, 'Unknown type: IndexedAccessType')
    })
  })

  describe('direct helper coverage', () => {
    it('formats default strings with comments and escapes', () => {
      const trailingEscapedDefault = "'value\\"
      const formattedTrailingDefault = '"value' + '\\'

      expect(formatDefaultString(String.raw`'value \"quoted\"' // comment`)).to.equal(`${String.raw`"value \"quoted\""`} `)
      expect(formatDefaultString(trailingEscapedDefault)).to.equal(formattedTrailingDefault)
    })

    it('parses and rejects default tags consistently', () => {
      expect(TypeResolver.getDefault(getDefaultProperty('@default "value"'))).to.equal('value')
      expect(TypeResolver.getDefault(getDefaultProperty('@default undefined'))).to.be.undefined
      expect(TypeResolver.getDefault(getDefaultProperty('No default annotation'))).to.be.undefined
      expect(() => TypeResolver.getDefault(getDefaultProperty('@default {"unterminated": }'))).to.throw(GenerateMetadataError, 'JSON could not parse default str')
    })

    it('resolves builtin type references without extra metadata state', () => {
      const builtinResolver = new TypeResolver(ts.factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword), { defaultNumberType: 'double' } as any)

      expect((builtinResolver as any).resolveBuiltinTypeReference('String', undefined, { defaultNumberType: 'double' }, {}, undefined)).to.deep.equal({ dataType: 'string' })
      expect((builtinResolver as any).resolveBuiltinTypeReference('Buffer', undefined, { defaultNumberType: 'double' }, {}, undefined)).to.deep.equal({ dataType: 'buffer' })
      expect((builtinResolver as any).resolveBuiltinTypeReference('Readable', undefined, { defaultNumberType: 'double' }, {}, undefined)).to.deep.equal({ dataType: 'buffer' })
      expect(
        (builtinResolver as any).resolveBuiltinTypeReference('Array', [ts.factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword)], { defaultNumberType: 'double' }, {}, undefined),
      ).to.deep.equal({ dataType: 'array', elementType: { dataType: 'string' } })
      expect((builtinResolver as any).resolveBuiltinTypeReference('Array', undefined, { defaultNumberType: 'double' }, {}, undefined)).to.be.undefined
      expect((builtinResolver as any).resolveBuiltinTypeReference('Promise', undefined, { defaultNumberType: 'double' }, {}, undefined)).to.be.undefined
    })

    it('resolves io-ts helper types from utility references and aliases', () => {
      const current = {
        defaultNumberType: 'double',
        typeChecker: {
          getAliasedSymbol: (symbol: ts.Symbol) => symbol,
        },
      }
      const ioTsResolver = new TypeResolver(ts.factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword), current as any)
      const brandedType = ts.factory.createTypeReferenceNode('Branded', [ts.factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword)])
      const brandType = ts.factory.createTypeReferenceNode('Brand', [])

      ;(ioTsResolver as any).getIoTsUtilityType = (_typeName: ts.EntityName) => 'Branded'
      expect((ioTsResolver as any).resolveIoTsUtilityTypeReference(brandedType, current, {}, undefined, [...(brandedType.typeArguments || [])])).to.deep.equal({ dataType: 'string' })
      ;(ioTsResolver as any).getIoTsUtilityType = (_typeName: ts.EntityName) => 'Brand'
      expect((ioTsResolver as any).resolveIoTsUtilityTypeReference(brandType, current, {}, undefined, [])).to.deep.equal({ dataType: 'any' })

      const moduleDeclaration = { parent: undefined, getSourceFile: () => ({ fileName: '/tmp/node_modules/io-ts/index.d.ts' }) }
      const resolvedSymbol = {
        declarations: [moduleDeclaration],
        flags: 0,
        getName: () => 'TypeOf',
      }
      const aliasSymbol = {
        declarations: [],
        flags: ts.SymbolFlags.Alias,
        getName: () => 'AliasTypeOf',
      }

      expect((ioTsResolver as any).getIoTsUtilityTypeFromSymbol(aliasSymbol, { getAliasedSymbol: () => resolvedSymbol })).to.equal('TypeOf')
      expect((ioTsResolver as any).symbolComesFromModule(aliasSymbol, { getAliasedSymbol: () => resolvedSymbol }, 'io-ts')).to.equal(true)
    })

    it('handles io-ts decoded type fallbacks', () => {
      const codecType = {} as ts.Type
      const decodedType = {} as ts.Type
      const decodedSymbol = {} as ts.Symbol
      const current = {
        defaultNumberType: 'double',
        typeChecker: {
          getPropertyOfType: (_type: ts.Type, key: string) => (key === '_A' ? decodedSymbol : undefined),
          getTypeFromTypeNode: () => codecType,
          getTypeOfSymbolAtLocation: () => decodedType,
          typeToTypeNode: (type: ts.Type) => {
            if (type === decodedType) {
              return ts.factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword)
            }

            if (type === codecType) {
              return ts.factory.createKeywordTypeNode(ts.SyntaxKind.NumberKeyword)
            }

            return ts.factory.createTypeReferenceNode('CodecReference', [])
          },
        },
      }
      const ioTsResolver = new TypeResolver(ts.factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword), current as any)
      const typeNode = ts.factory.createTypeReferenceNode('TypeOf', [ts.factory.createTypeReferenceNode('Codec', [])])

      expect((ioTsResolver as any).resolveIoTsDecodedType(typeNode, current, {}, undefined, [...(typeNode.typeArguments || [])])).to.deep.equal({ dataType: 'string' })
      ;(current.typeChecker.getPropertyOfType as any) = () => undefined
      expect((ioTsResolver as any).resolveIoTsDecodedType(typeNode, current, {}, undefined, [...(typeNode.typeArguments || [])])).to.deep.equal({ dataType: 'double' })
      ;(current.typeChecker.typeToTypeNode as any) = () => ts.factory.createTypeReferenceNode('CodecReference', [])
      expect((ioTsResolver as any).resolveIoTsDecodedType(typeNode, current, {}, undefined, [...(typeNode.typeArguments || [])])).to.be.undefined
      expect((ioTsResolver as any).resolveIoTsDecodedType(typeNode, current, {}, undefined, [])).to.be.undefined
    })

    it('handles fallback keyof types and keyword defaults', () => {
      const keyOfResolver = new TypeResolver(ts.factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword), {
        typeChecker: {
          getTypeFromTypeNode: () => ({}) as ts.Type,
          typeToString: () => 'Fallback',
        },
      } as any)
      const keyOfNode = ts.factory.createTypeOperatorNode(ts.SyntaxKind.KeyOfKeyword, ts.factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword))

      expect(resolveFallbackKeyOfType({ flags: ts.TypeFlags.TemplateLiteral } as ts.Type, keyOfNode, (keyOfResolver as any).current.typeChecker)).to.deep.equal({
        dataType: 'string',
      })
      expect(resolveFallbackKeyOfType({ flags: ts.TypeFlags.Number } as ts.Type, keyOfNode, (keyOfResolver as any).current.typeChecker)).to.deep.equal({ dataType: 'double' })
      expect(() => resolveFallbackKeyOfType({ flags: ts.TypeFlags.Never } as ts.Type, keyOfNode, (keyOfResolver as any).current.typeChecker)).to.throw(
        GenerateMetadataError,
        "TypeOperator 'keyof' on node produced a never type",
      )
    })

    it('ignores keyof index types whose target is not a type parameter', () => {
      const keyOfNode = ts.factory.createTypeOperatorNode(ts.SyntaxKind.KeyOfKeyword, ts.factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword))
      const indexedType = {
        isIndexType: () => true,
        type: {
          flags: ts.TypeFlags.String,
          getSymbol: () => ({ getEscapedName: () => 'NotATypeParameter' }),
        },
      } as unknown as ts.Type

      expect(resolveKeyOfIndexType(indexedType, keyOfNode, {} as MetadataGenerator, {}, undefined, TypeResolver)).to.be.undefined
    })

    it('fails clearly when TypeScript cannot represent an inferred toJSON return type', () => {
      const sourceFile = ts.createSourceFile('model.ts', `class Model { toJSON() { return { value: 'ok' } } }`, ts.ScriptTarget.ES2021, true, ts.ScriptKind.TS)
      const model = sourceFile.statements.find(ts.isClassDeclaration)
      const toJSONDeclaration = model?.members.find((member): member is ts.MethodDeclaration => ts.isMethodDeclaration(member) && member.name.getText(sourceFile) === 'toJSON')

      if (!model || !toJSONDeclaration) {
        throw new Error('Failed to create the toJSON test model')
      }

      const modelType = {} as ts.Type
      const implicitType = {} as ts.Type
      const current = {
        typeChecker: {
          getPropertyOfType: () => ({ valueDeclaration: toJSONDeclaration }),
          getReturnTypeOfSignature: () => implicitType,
          getSignatureFromDeclaration: () => ({}) as ts.Signature,
          getTypeAtLocation: () => modelType,
          typeToTypeNode: () => undefined,
        },
      }
      const modelResolver = new TypeResolver(ts.factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword), current as any)

      ;(modelResolver as any).getNodeDescription = () => undefined
      ;(modelResolver as any).getNodeExample = () => undefined
      ;(modelResolver as any).getNodeTitle = () => undefined

      expect(() => (modelResolver as any).getModelReference(model, 'Model')).to.throw(GenerateMetadataError, 'Could not resolve the return type for Model.')
    })
  })

  describe('reference fallback helpers', () => {
    function getTempCompilerOptions(): ts.CompilerOptions {
      const repoRoot = resolve(__dirname, '../../..')
      return {
        baseUrl: repoRoot,
        emitDecoratorMetadata: true,
        experimentalDecorators: true,
        module: ts.ModuleKind.CommonJS,
        paths: {
          'tsoa-next': ['packages/tsoa/src/index.ts'],
          '@tsoa-next/cli': ['packages/cli/src/index.ts'],
          '@tsoa-next/cli/*': ['packages/cli/src/*'],
          '@tsoa-next/runtime': ['packages/runtime/src/index.ts'],
          '@tsoa-next/runtime/*': ['packages/runtime/src/*'],
        },
        target: ts.ScriptTarget.ES2021,
      }
    }

    async function withTempSource(files: Record<string, string>, run: (paths: { root: string; entryFile: string }) => Promise<void>) {
      const root = await fs.mkdtemp(join(tmpdir(), 'tsoa-type-resolver-'))
      const entryFile = join(root, 'entry.ts')

      try {
        for (const [relativePath, content] of Object.entries(files)) {
          const filePath = join(root, relativePath)
          await fs.mkdir(dirname(filePath), { recursive: true })
          await fs.writeFile(filePath, content, 'utf8')
        }

        await run({ entryFile, root })
      } finally {
        await fs.rm(root, { force: true, recursive: true })
      }
    }

    async function createResolverHarness(files: Record<string, string>) {
      let harness:
        | {
            metadata: MetadataGenerator
            root: string
            sourceFile: ts.SourceFile
          }
        | undefined

      await withTempSource(files, async ({ entryFile }) => {
        const metadata = new MetadataGenerator(entryFile, getTempCompilerOptions())
        const sourceFile = ((metadata as any).program as ts.Program).getSourceFile(entryFile)

        if (!sourceFile) {
          throw new Error(`Missing source file for ${entryFile}`)
        }

        harness = { metadata, root: dirname(entryFile), sourceFile }
      })

      if (!harness) {
        throw new Error('Failed to create resolver harness')
      }

      return harness
    }

    function findFirstNode<T extends ts.Node>(sourceFile: ts.SourceFile, predicate: (node: ts.Node) => node is T): T {
      let match: T | undefined

      const visit = (node: ts.Node) => {
        if (match) {
          return
        }

        if (predicate(node)) {
          match = node
          return
        }

        ts.forEachChild(node, visit)
      }

      ts.forEachChild(sourceFile, visit)

      if (!match) {
        throw new Error('Requested node was not found')
      }

      return match
    }

    const controllerSource = (propertyType: string) => `
      import { Get, Route } from '@tsoa-next/runtime'
      export interface SharedModel { value: ${propertyType}; next?: SharedModel }
      @Route('example')
      export class ExampleController {
        @Get()
        public get(): SharedModel { throw new Error('not executed') }
      }
    `

    it('only parses malformed defaults when their owning model is needed', async () => {
      const unusedModel = `
        export interface UnusedModel {
          /** @default {'broken': } */
          value: string
        }
      `
      await withTempSource({ 'entry.ts': controllerSource('string') + unusedModel }, async ({ entryFile }) => {
        const metadata = new MetadataGenerator(entryFile, getTempCompilerOptions()).Generate()
        expect(metadata.referenceTypeMap).to.have.property('SharedModel')
        expect(metadata.referenceTypeMap).not.to.have.property('UnusedModel')
        await fs.writeFile(entryFile, controllerSource('UnusedModel') + unusedModel, 'utf8')
        expect(() => new MetadataGenerator(entryFile, getTempCompilerOptions()).Generate()).to.throw(
          GenerateMetadataError,
          `JSON could not parse default str: "{'broken': }", preformatted: "{"broken": }"`,
        )
      })
    })

    it('isolates reference types and recursive callbacks across independently constructed generations', async () => {
      await withTempSource({ 'entry.ts': controllerSource('string'), 'other.ts': controllerSource('number') }, async ({ entryFile, root }) => {
        const first = new MetadataGenerator(entryFile, getTempCompilerOptions())
        const second = new MetadataGenerator(join(root, 'other.ts'), getTempCompilerOptions())
        const firstModel = first.Generate().referenceTypeMap.SharedModel
        const secondModel = second.Generate().referenceTypeMap.SharedModel
        expect(firstModel.dataType).to.equal('refObject')
        expect(secondModel.dataType).to.equal('refObject')
        if (firstModel.dataType !== 'refObject' || secondModel.dataType !== 'refObject') throw new Error('Expected object models')
        expect(firstModel.properties.find(property => property.name === 'value')?.type).to.deep.equal({ dataType: 'string' })
        expect(secondModel.properties.find(property => property.name === 'value')?.type).to.deep.equal({ dataType: 'double' })
        const firstNext = firstModel.properties.find(property => property.name === 'next')?.type
        const secondNext = secondModel.properties.find(property => property.name === 'next')?.type
        expect(firstNext).to.have.property('refName', 'SharedModel')
        expect(secondNext).to.have.property('refName', 'SharedModel')
        expect(firstNext).to.have.property('properties', firstModel.properties)
        expect(secondNext).to.have.property('properties', secondModel.properties)
        expect(firstNext).to.not.equal(secondNext)
      })
    })

    it('keeps an existing owner cache intact when a different generation is constructed', async () => {
      const first = await createResolverHarness({ 'entry.ts': 'export interface SharedModel { value: string }\nexport type Result = SharedModel' })
      const firstAlias = findFirstNode(first.sourceFile, (node): node is ts.TypeAliasDeclaration => ts.isTypeAliasDeclaration(node))
      const resolver = new TypeResolver(firstAlias.type, first.metadata)
      const resolved = resolver.resolve()
      const second = await createResolverHarness({ 'entry.ts': 'export interface SharedModel { value: number }\nexport type Result = SharedModel' })
      const secondAlias = findFirstNode(second.sourceFile, (node): node is ts.TypeAliasDeclaration => ts.isTypeAliasDeclaration(node))
      const secondResolved = new TypeResolver(secondAlias.type, second.metadata).resolve()
      expect(resolver.resolve()).to.equal(resolved)
      expect(secondResolved).to.not.equal(resolved)

      TypeResolver.clearCache()
      const afterExplicitReset = resolver.resolve()
      expect(afterExplicitReset).to.not.equal(resolved)
      expect(afterExplicitReset).to.deep.equal(resolved)
    })

    it('recovers with a corrected generation after a reference-type resolution failure', async () => {
      await withTempSource({ 'entry.ts': controllerSource('symbol') }, async ({ entryFile }) => {
        expect(() => new MetadataGenerator(entryFile, getTempCompilerOptions()).Generate()).to.throw(GenerateMetadataError, 'Unknown type: SymbolKeyword')
        await fs.writeFile(entryFile, controllerSource('string'), 'utf8')
        const corrected = new MetadataGenerator(entryFile, getTempCompilerOptions()).Generate().referenceTypeMap.SharedModel
        expect(corrected.dataType).to.equal('refObject')
        if (corrected.dataType !== 'refObject') throw new Error('Expected corrected object model')
        expect(corrected.properties.find(property => property.name === 'value')?.type).to.deep.equal({ dataType: 'string' })
        expect(corrected.properties.find(property => property.name === 'next')?.type).to.have.property('refName', 'SharedModel')
      })
    })

    it('resolves ExpressionWithTypeArguments nodes through the type checker without throwing', async () => {
      const { metadata, root } = await createResolverHarness({
        'models.ts': `
          export class BaseError {
            public payload!: { code: string }
          }

          export class DerivedError extends BaseError {
            public status!: number
          }
        `,
        'entry.ts': `
          import { Controller, Get, Response, Route } from 'tsoa-next'
          import { DerivedError } from './models'

          @Route('expression-with-type-arguments')
          export class ExpressionWithTypeArgumentsController extends Controller {
            @Get()
            @Response<DerivedError>('400', 'Derived error')
            public get(): string {
              return 'ok'
            }
          }
        `,
      })

      const modelsFile = ((metadata as any).program as ts.Program).getSourceFile(join(root, 'models.ts'))
      if (!modelsFile) {
        throw new Error('Missing models source file')
      }

      const derivedError = findFirstNode(modelsFile, (node): node is ts.ClassDeclaration => ts.isClassDeclaration(node) && node.name?.text === 'DerivedError')
      const heritageType = derivedError.heritageClauses?.[0]?.types[0]
      if (!heritageType) {
        throw new Error('Missing heritage clause')
      }

      const resolverWithExpression = new TypeResolver(ts.factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword), metadata as any)
      const resolvedType = (resolverWithExpression as any).getResolvedTypeForReferenceNode(heritageType)
      const referenceType = (resolverWithExpression as any).getReferenceTypeFromTypeChecker(heritageType, 'BaseError', 'BaseError')

      expect(resolvedType).to.exist
      expect(referenceType).to.exist
      expect(referenceType.dataType).to.equal('refObject')
      expect((referenceType as any).properties.map((property: { name: string }) => property.name)).to.include('payload')
    })

    it('deduplicates resolved declarations and wraps non-reference fallback types consistently', async () => {
      const { metadata, sourceFile } = await createResolverHarness({
        'models.ts': `
          export type ImportedAlias = {
            value: string
          }
        `,
        'entry.ts': `
          import type { ImportedAlias } from './models'

          export type LocalAlias = ImportedAlias
        `,
      })

      const importedAlias = findFirstNode(sourceFile, (node): node is ts.TypeAliasDeclaration => ts.isTypeAliasDeclaration(node) && node.name.text === 'LocalAlias').type
      if (!ts.isTypeReferenceNode(importedAlias)) {
        throw new Error('Expected a type reference')
      }

      const resolverWithTypeReference = new TypeResolver(ts.factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword), metadata as any)
      const resolvedType = (resolverWithTypeReference as any).getResolvedTypeForReferenceNode(importedAlias)
      const referenceTypes = (resolverWithTypeReference as any).getReferenceTypesFromResolvedType(resolvedType, 'ImportedAlias')

      expect(referenceTypes).to.have.length(1)
      expect(referenceTypes[0].dataType).to.equal('refAlias')

      const wrappedPrimitive = (resolverWithTypeReference as any).wrapResolvedTypeAsReference({ dataType: 'string' }, 'WrappedString')
      expect(wrappedPrimitive).to.deep.equal({
        dataType: 'refAlias',
        deprecated: false,
        refName: 'WrappedString',
        type: { dataType: 'string' },
        validators: {},
      })
    })

    it('wraps rewritten fallback types as aliases when the type checker resolves a non-reference type', () => {
      const originalReference = ts.factory.createTypeReferenceNode('Wrapper', [ts.factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword)])
      const fakeCurrent = {
        typeChecker: {
          getTypeFromTypeNode: () => ({}) as ts.Type,
          typeToTypeNode: () => ts.factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword),
        },
      }

      const resolverWithFallback = new TypeResolver(originalReference, fakeCurrent as any)
      const referenceType = (resolverWithFallback as any).getReferenceTypeFromTypeChecker(originalReference, 'Wrapper<string>', 'Wrapper_string_')

      expect(referenceType).to.deep.equal({
        dataType: 'refAlias',
        deprecated: false,
        refName: 'Wrapper_string_',
        type: { dataType: 'string' },
        validators: {},
      })
    })

    it('returns undefined when the type checker fallback resolves to the original reference type', () => {
      const originalReference = ts.factory.createTypeReferenceNode('Thing', [ts.factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword)])
      const fakeCurrent = {
        typeChecker: {
          getTypeFromTypeNode: () => ({}) as ts.Type,
          typeToTypeNode: () => originalReference,
        },
      }

      const resolverWithEquivalentFallback = new TypeResolver(originalReference, fakeCurrent as any)
      ;(resolverWithEquivalentFallback as any).isEquivalentReferenceTypeNode = () => true
      const referenceType = (resolverWithEquivalentFallback as any).getReferenceTypeFromTypeChecker(originalReference, 'Thing<string>', 'Thing_string_')

      expect(referenceType).to.be.undefined
    })

    it('resolves enum declarations from the resolved type fallback', async () => {
      const { metadata, sourceFile } = await createResolverHarness({
        'models.ts': `
          export enum ImportedEnum {
            One = 'one',
            Two = 'two',
          }
        `,
        'entry.ts': `
          import type { ImportedEnum } from './models'

          export type LocalEnum = ImportedEnum
        `,
      })

      const localEnum = findFirstNode(sourceFile, (node): node is ts.TypeAliasDeclaration => ts.isTypeAliasDeclaration(node) && node.name.text === 'LocalEnum').type
      if (!ts.isTypeReferenceNode(localEnum)) {
        throw new Error('Expected an enum type reference')
      }

      const resolverWithEnumFallback = new TypeResolver(ts.factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword), metadata as any)
      const resolvedType = (resolverWithEnumFallback as any).getResolvedTypeForReferenceNode(localEnum)
      const referenceTypes = (resolverWithEnumFallback as any).getReferenceTypesFromResolvedType(resolvedType, 'ImportedEnum')

      expect(referenceTypes).to.have.length(1)
      expect(referenceTypes[0].dataType).to.equal('refEnum')
      expect((referenceTypes[0] as any).enums).to.deep.equal(['one', 'two'])
    })

    it('uses the type checker fallback when declarations are unavailable', () => {
      const originalReference = ts.factory.createTypeReferenceNode('Thing', [ts.factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword)])
      const fakeCurrent = {
        AddReferenceType: () => undefined,
        CheckExpressionUnicity: () => undefined,
        typeChecker: {},
      }

      const resolverWithMissingDeclarations = new TypeResolver(originalReference, fakeCurrent as any)
      const fallbackReference = {
        dataType: 'refAlias',
        deprecated: false,
        refName: 'Thing_string_',
        type: { dataType: 'string' },
        validators: {},
      }

      let cachedName: string | undefined
      let cachedValue: unknown
      ;(resolverWithMissingDeclarations as any).calcTypeReferenceTypeName = () => [ts.factory.createIdentifier('Thing'), 'Thing<string>']
      ;(resolverWithMissingDeclarations as any).getRefTypeName = () => 'Thing_string_'
      ;(resolverWithMissingDeclarations as any).typeArgumentsToContext = () => ({})
      ;(resolverWithMissingDeclarations as any).getModelTypeDeclarations = () => []
      ;(resolverWithMissingDeclarations as any).getReferenceTypeFromTypeChecker = () => fallbackReference
      ;(resolverWithMissingDeclarations as any).addToLocalReferenceTypeCache = (name: string, value: unknown) => {
        cachedName = name
        cachedValue = value
      }

      const referenceType = (resolverWithMissingDeclarations as any).getReferenceType(originalReference, false)

      expect(referenceType).to.equal(fallbackReference)
      expect(cachedName).to.equal('Thing<string>')
      expect(cachedValue).to.equal(fallbackReference)
    })

    it('throws a metadata error when declarations and fallback resolution are both unavailable', () => {
      TypeResolver.clearCache()
      const originalReference = ts.factory.createTypeReferenceNode('UnresolvedThing', [ts.factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword)])
      const fakeCurrent = {
        AddReferenceType: () => undefined,
        CheckExpressionUnicity: () => undefined,
        typeChecker: {},
      }

      const resolverWithUnresolvedFallback = new TypeResolver(originalReference, fakeCurrent as any)

      ;(resolverWithUnresolvedFallback as any).calcTypeReferenceTypeName = () => [ts.factory.createIdentifier('UnresolvedThing'), 'UnresolvedThing<string>']
      ;(resolverWithUnresolvedFallback as any).getRefTypeName = () => 'UnresolvedThing_string_'
      ;(resolverWithUnresolvedFallback as any).typeArgumentsToContext = () => ({})
      ;(resolverWithUnresolvedFallback as any).getModelTypeDeclarations = () => []
      ;(resolverWithUnresolvedFallback as any).getReferenceTypeFromTypeChecker = () => undefined

      expect(() => (resolverWithUnresolvedFallback as any).getReferenceType(originalReference, false)).to.throw(GenerateMetadataError, "Could not find declarations for type 'UnresolvedThing<string>'")
    })

    it('clears in-progress markers after failed resolution so later lookups do not return circular placeholders', () => {
      TypeResolver.clearCache()
      const originalReference = ts.factory.createTypeReferenceNode('RecoverableThing', [ts.factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword)])
      const fakeCurrent = {
        AddReferenceType: () => undefined,
        CheckExpressionUnicity: () => undefined,
        typeChecker: {},
      }

      const resolverWithRecoverableFailure = new TypeResolver(originalReference, fakeCurrent as any)
      const fallbackReference = {
        dataType: 'refAlias',
        deprecated: false,
        refName: 'RecoverableThing_string_',
        type: { dataType: 'string' },
        validators: {},
      }

      let shouldFail = true
      ;(resolverWithRecoverableFailure as any).calcTypeReferenceTypeName = () => [ts.factory.createIdentifier('RecoverableThing'), 'RecoverableThing<string>']
      ;(resolverWithRecoverableFailure as any).getRefTypeName = () => 'RecoverableThing_string_'
      ;(resolverWithRecoverableFailure as any).typeArgumentsToContext = () => ({})
      ;(resolverWithRecoverableFailure as any).getModelTypeDeclarations = () => {
        if (shouldFail) {
          throw new Error('Simulated declaration resolution failure')
        }
        return []
      }
      ;(resolverWithRecoverableFailure as any).getReferenceTypeFromTypeChecker = () => fallbackReference

      expect(() => (resolverWithRecoverableFailure as any).getReferenceType(originalReference, false)).to.throw('Simulated declaration resolution failure')

      shouldFail = false
      const recoveredReference = (resolverWithRecoverableFailure as any).getReferenceType(originalReference, false)
      expect(recoveredReference).to.equal(fallbackReference)
    })

    it('detects equivalent reference nodes only for matching type references', async () => {
      const { metadata, sourceFile } = await createResolverHarness({
        'entry.ts': `
          export class Thing<T> {
            public value!: T
          }
          export type Matching = Thing<string>
          export type Mismatched = Thing<number>

          export class Derived extends Thing<string> {}
        `,
      })

      const aliases = sourceFile.statements.filter(ts.isTypeAliasDeclaration)
      const matchingOriginal = aliases.find(alias => alias.name.text === 'Matching')?.type
      const mismatchedResolved = aliases.find(alias => alias.name.text === 'Mismatched')?.type
      const derivedClass = findFirstNode(sourceFile, (node): node is ts.ClassDeclaration => ts.isClassDeclaration(node) && node.name?.text === 'Derived')
      const expressionOriginal = derivedClass.heritageClauses?.[0]?.types[0]

      if (!matchingOriginal || !mismatchedResolved || !expressionOriginal || !ts.isTypeReferenceNode(matchingOriginal) || !ts.isTypeReferenceNode(mismatchedResolved)) {
        throw new Error('Expected matching type references')
      }

      const resolverWithMetadata = new TypeResolver(ts.factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword), metadata as any)

      expect((resolverWithMetadata as any).isEquivalentReferenceTypeNode(matchingOriginal, matchingOriginal, 'Thing<string>')).to.equal(true)
      expect((resolverWithMetadata as any).isEquivalentReferenceTypeNode(matchingOriginal, mismatchedResolved, 'Thing<string>')).to.equal(false)
      expect((resolverWithMetadata as any).isEquivalentReferenceTypeNode(expressionOriginal, matchingOriginal, 'Thing<string>')).to.equal(false)
    })

    it('preserves reference object fallback payloads while renaming the ref name', () => {
      const refObject = {
        additionalProperties: false,
        dataType: 'refObject',
        deprecated: false,
        properties: [],
        refName: 'Original',
      }

      expect((resolver as any).wrapResolvedTypeAsReference(refObject, 'Renamed')).to.deep.equal({
        ...refObject,
        refName: 'Renamed',
      })
    })

    it('skips inherited references that still raise metadata errors', () => {
      const sourceFile = ts.createSourceFile('inheritance.ts', 'class BrokenBase {} class Child extends BrokenBase {}', ts.ScriptTarget.ES2021, true, ts.ScriptKind.TS)
      const childClass = findFirstNode(sourceFile, (node): node is ts.ClassDeclaration => ts.isClassDeclaration(node) && node.name?.text === 'Child')
      const resolverWithInheritedFailure = new TypeResolver(ts.factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword), {} as any)

      ;(resolverWithInheritedFailure as any).context = { preserved: true }
      ;(resolverWithInheritedFailure as any).getReferenceType = () => {
        throw new GenerateMetadataError('Simulated inherited resolution failure')
      }

      const inheritedProperties = (resolverWithInheritedFailure as any).getModelInheritedProperties(childClass)

      expect(inheritedProperties).to.deep.equal([])
      expect((resolverWithInheritedFailure as any).context).to.deep.equal({ preserved: true })
    })

    it('ignores inherited mixin expressions that are not entity names', () => {
      const sourceFile = ts.createSourceFile('inheritance.ts', 'declare function createBase(): new () => {}; class Child extends createBase() {}', ts.ScriptTarget.ES2021, true, ts.ScriptKind.TS)
      const childClass = findFirstNode(sourceFile, (node): node is ts.ClassDeclaration => ts.isClassDeclaration(node) && node.name?.text === 'Child')
      const resolverWithMixinHeritage = new TypeResolver(ts.factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword), {} as any)

      ;(resolverWithMixinHeritage as any).context = { preserved: true }

      const inheritedProperties = (resolverWithMixinHeritage as any).getModelInheritedProperties(childClass)

      expect(inheritedProperties).to.deep.equal([])
      expect((resolverWithMixinHeritage as any).context).to.deep.equal({ preserved: true })
    })

    it('rethrows unexpected inherited reference failures', () => {
      const sourceFile = ts.createSourceFile('inheritance.ts', 'class BrokenBase {} class Child extends BrokenBase {}', ts.ScriptTarget.ES2021, true, ts.ScriptKind.TS)
      const childClass = findFirstNode(sourceFile, (node): node is ts.ClassDeclaration => ts.isClassDeclaration(node) && node.name?.text === 'Child')
      const resolverWithUnexpectedInheritedFailure = new TypeResolver(ts.factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword), {} as any)
      const originalError = new Error('Unexpected inherited resolution failure')

      ;(resolverWithUnexpectedInheritedFailure as any).getReferenceType = () => {
        throw originalError
      }

      expect(() => (resolverWithUnexpectedInheritedFailure as any).getModelInheritedProperties(childClass)).to.throw(originalError)
    })
  })
})
