import { expect } from 'chai'
import { promises as fs } from 'node:fs'
import 'mocha'
import { tmpdir } from 'node:os'
import { dirname, join, resolve } from 'node:path'
import * as ts from 'typescript'
import type { Tsoa } from '@tsoa-next/runtime'
import { resolveContextualTypeArgument } from '../../../packages/cli/src/metadataGeneration/generic-context'
import { getIoTsUtilityType, getIoTsUtilityTypeFromSymbol, symbolComesFromModule } from '../../../packages/cli/src/metadataGeneration/io-ts-recognition'
import { getDeclarationBasedRefTypeName } from '../../../packages/cli/src/metadataGeneration/reference-name'
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

  describe('inline-object resolution boundaries', () => {
    it('resolves properties in source order, returns reversed metadata and keeps public hook receivers', () => {
      const source = ts.createSourceFile(
        'inline.ts',
        `type Inline = {
        /** @default "initial"
         * @minLength 2
         */
        first?: string
        second: string
        [key: string]: string
      }`,
        ts.ScriptTarget.ES2021,
        true,
      )
      const declaration = source.statements.find(ts.isTypeAliasDeclaration)
      if (!declaration || !ts.isTypeLiteralNode(declaration.type)) throw new Error('Expected inline object')
      const events: string[] = []
      for (const member of declaration.type.members) {
        if (ts.isPropertySignature(member)) {
          const type = member.type
          Object.defineProperty(member, 'type', {
            get: () => {
              events.push(`type:${member.name.getText()}`)
              return type
            },
          })
        } else if (ts.isIndexSignatureDeclaration(member)) {
          const parameters = member.parameters
          Object.defineProperty(member, 'parameters', {
            get: () => {
              events.push('index')
              return parameters
            },
          })
        }
      }
      const hook = (receiver: TypeResolver, node: ts.Node, name: string) => {
        expect(receiver).to.equal(inlineResolver)
        const property = node as ts.PropertySignature
        events.push(`${name}:${property.name.getText()}`)
        return property.name.getText()
      }
      class InlineResolver extends TypeResolver {
        public override getNodeExample(node: ts.Node) {
          return hook(this, node, 'example')
        }
        public override getNodeDescription(node: ts.PropertySignature) {
          return hook(this, node, 'description')
        }
        public override getNodeFormat(node: ts.Node) {
          return hook(this, node, 'format')
        }
        public override getPropertyName(node: ts.PropertySignature) {
          return `named-${hook(this, node, 'name')}`
        }
        public override getNodeTitle(node: ts.Node) {
          return hook(this, node, 'title')
        }
        public override getNodeExtension(node: ts.Node) {
          return [{ key: 'x-order' as const, value: hook(this, node, 'extensions') }]
        }
      }
      const inlineResolver = new InlineResolver(declaration.type, {} as MetadataGenerator)
      const result = inlineResolver.resolve()
      if (result.dataType !== 'nestedObjectLiteral') throw new Error('Expected inline object result')
      expect(result.properties.map(property => property.name)).to.deep.equal(['named-second', 'named-first'])
      expect(result.properties[0].required).to.be.true
      expect(result.properties[1]).to.include({ required: false, default: 'initial', example: 'first', description: 'first', format: 'first', title: 'first' })
      expect(result.properties[1].validators).to.have.property('minLength').that.has.property('value', 2)
      expect(result.properties[1].extensions).to.deep.equal([{ key: 'x-order', value: 'first' }])
      expect(result.additionalProperties).to.deep.equal({ dataType: 'string' })
      expect(events).to.deep.equal([
        'example:first',
        'description:first',
        'format:first',
        'name:first',
        'type:first',
        'title:first',
        'extensions:first',
        'example:second',
        'description:second',
        'format:second',
        'name:second',
        'type:second',
        'title:second',
        'extensions:second',
        'index',
      ])
    })

    it('rejects a numeric indexer before reading the unused value type', () => {
      const index = ts.factory.createIndexSignature(
        undefined,
        [ts.factory.createParameterDeclaration(undefined, undefined, 'key', undefined, ts.factory.createKeywordTypeNode(ts.SyntaxKind.NumberKeyword))],
        ts.factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword),
      )
      Object.defineProperty(index, 'type', {
        get: () => {
          throw new Error('Unused index value type read')
        },
      })
      const node = ts.factory.createTypeLiteralNode([index])
      expect(() => new TypeResolver(node, { defaultNumberType: 'double' } as MetadataGenerator).resolve()).to.throw(GenerateMetadataError, 'Only string indexers are supported.')
    })

    it('reports an encountered property type failure before later metadata or indexers', () => {
      const property = ts.factory.createPropertySignature(undefined, 'value', undefined, ts.factory.createKeywordTypeNode(ts.SyntaxKind.SymbolKeyword))
      const index = ts.factory.createIndexSignature(undefined, [], ts.factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword))
      Object.defineProperty(index, 'parameters', {
        get: () => {
          throw new Error('Unused indexer reached')
        },
      })
      class FailingInlineResolver extends TypeResolver {
        public override getNodeExample() {
          return undefined
        }
        public override getNodeDescription() {
          return undefined
        }
        public override getNodeFormat() {
          return undefined
        }
        public override getNodeTitle(): string {
          throw new Error('Unused title reached')
        }
        public override getNodeExtension(): Tsoa.Extension[] {
          throw new Error('Unused extension reached')
        }
      }
      expect(() => new FailingInlineResolver(ts.factory.createTypeLiteralNode([property, index]), {} as MetadataGenerator).resolve()).to.throw(GenerateMetadataError, 'Unknown type: SymbolKeyword')
    })
  })

  describe('reference-name selection boundaries', () => {
    it('uses selected declaration namespaces and enum names rather than the importing alias', () => {
      const source = ts.createSourceFile(
        'names.ts',
        `namespace First { export interface Model {} export enum Status { Ready } }
        namespace Second { export interface Model {} }
        declare global { interface GlobalModel {} }
        function local() { interface LocalModel {} }`,
        ts.ScriptTarget.ES2021,
        true,
      )
      const interfaces: ts.InterfaceDeclaration[] = []
      const enumMembers: ts.EnumMember[] = []
      const visit = (node: ts.Node) => {
        if (ts.isInterfaceDeclaration(node)) interfaces.push(node)
        if (ts.isEnumMember(node)) enumMembers.push(node)
        ts.forEachChild(node, visit)
      }
      visit(source)
      const alias = ts.factory.createQualifiedName(ts.factory.createIdentifier('Imported'), 'Alias')
      expect(interfaces.map(declaration => getDeclarationBasedRefTypeName(alias, [declaration]))).to.deep.equal(['First.Model', 'Second.Model', 'GlobalModel', 'LocalModel'])
      expect(getDeclarationBasedRefTypeName(alias, enumMembers)).to.equal('First.Status.Ready')
    })

    it('uses an existing contextual name without looking up unused declarations or uniqueness data', () => {
      const current = {
        get typeChecker(): ts.TypeChecker {
          throw new Error('Unused declaration checker read')
        },
        CheckModelUnicity: () => {
          throw new Error('Unused uniqueness data read')
        },
      } as unknown as MetadataGenerator
      const context: Context = { 'Imported.Alias': { name: 'SelectedModel', type: ts.factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword) } }
      const nameResolver = new TypeResolver(ts.factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword), current, undefined, context)
      const type = ts.factory.createQualifiedName(ts.factory.createIdentifier('Imported'), 'Alias')
      expect((nameResolver as any).calcRefTypeName(type)).to.equal('SelectedModel')
    })

    it('preserves the source diagnostic for unsupported declaration ancestry', () => {
      const source = ts.createSourceFile('names.ts', 'interface Model {} class Unexpected {} type Selected = Alias', ts.ScriptTarget.ES2021, true)
      const parent = source.statements.find(ts.isClassDeclaration)
      const alias = source.statements.find(ts.isTypeAliasDeclaration)
      const declaration = source.statements.find(ts.isInterfaceDeclaration)
      if (!parent || !alias || !declaration || !ts.isTypeReferenceNode(alias.type)) throw new Error('Expected naming fixture')
      Object.defineProperty(declaration, 'parent', { value: parent })
      const typeName = alias.type.typeName
      expect(() => getDeclarationBasedRefTypeName(typeName, [declaration])).to.throw(GenerateMetadataError, `This node kind is unknown: ${ts.SyntaxKind.ClassDeclaration}\nAt: names.ts:1:1.`)
    })
  })

  describe('io-ts recognition boundaries', () => {
    it('does not inspect unrelated names and preserves local utility lookalikes', () => {
      const unusedChecker = {
        getSymbolAtLocation: () => {
          throw new Error('Unused symbol lookup')
        },
      } as unknown as ts.TypeChecker
      expect(getIoTsUtilityType(ts.factory.createIdentifier('Ordinary'), unusedChecker)).to.be.undefined
      const source = ts.createSourceFile('ordinary.ts', 'interface TypeOf { value: string }', ts.ScriptTarget.ES2021, true)
      const declaration = source.statements.find(ts.isInterfaceDeclaration)
      if (!declaration) throw new Error('Expected local TypeOf fixture')
      const symbol = { flags: ts.SymbolFlags.Interface, declarations: [declaration], getName: () => 'TypeOf' } as unknown as ts.Symbol
      const checker = {
        getSymbolAtLocation: () => symbol,
        getAliasedSymbol: () => {
          throw new Error('Unused alias lookup')
        },
      } as unknown as ts.TypeChecker
      expect(getIoTsUtilityType(ts.factory.createIdentifier('TypeOf'), checker)).to.be.undefined
    })

    it('recognizes chained aliases and Windows provenance while terminating alias cycles', () => {
      const declaration = { parent: undefined, getSourceFile: () => ({ fileName: String.raw`C:\project\node_modules\io-ts\index.d.ts` }) } as unknown as ts.Declaration
      const target = { flags: 0, declarations: [declaration], getName: () => 'TypeOf' } as unknown as ts.Symbol
      const first = { flags: ts.SymbolFlags.Alias, declarations: [], getName: () => 'FirstAlias' } as unknown as ts.Symbol
      const second = { flags: ts.SymbolFlags.Alias, declarations: [], getName: () => 'SecondAlias' } as unknown as ts.Symbol
      const checker = { getAliasedSymbol: (symbol: ts.Symbol) => (symbol === first ? second : target) } as unknown as ts.TypeChecker
      expect(getIoTsUtilityTypeFromSymbol(first, checker)).to.equal('TypeOf')
      const cyclicChecker = { getAliasedSymbol: (symbol: ts.Symbol) => (symbol === first ? second : first) } as unknown as ts.TypeChecker
      expect(getIoTsUtilityTypeFromSymbol(first, cyclicChecker)).to.be.undefined
      expect(symbolComesFromModule(first, cyclicChecker, 'io-ts')).to.be.false
    })

    it('reuses recognition only within its checker and propagates fresh-session lookup failures', () => {
      let unavailable = false
      const failure = new Error('Selected symbol declarations unavailable')
      const declaration = { parent: undefined, getSourceFile: () => ({ fileName: '/project/node_modules/io-ts/index.d.ts' }) } as unknown as ts.Declaration
      const symbol = {
        flags: 0,
        getName: () => 'Brand',
        get declarations() {
          if (unavailable) throw failure
          return [declaration]
        },
      } as unknown as ts.Symbol
      const checker = {} as ts.TypeChecker
      expect(getIoTsUtilityTypeFromSymbol(symbol, checker)).to.equal('Brand')
      unavailable = true
      expect(getIoTsUtilityTypeFromSymbol(symbol, checker)).to.equal('Brand')
      expect(() => getIoTsUtilityTypeFromSymbol(symbol, {} as ts.TypeChecker)).to.throw(failure)
    })
  })

  describe('generic context binding boundaries', () => {
    it('preserves forwarded identity and synthetic default alias arguments without unused checker reads', () => {
      const current = {
        get typeChecker(): ts.TypeChecker {
          throw new Error('Unused generic checker read')
        },
      } as MetadataGenerator
      const forwarded = { name: 'Selected', type: ts.factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword), resolvedType: {} as ts.Type }
      const parameter = ts.factory.createTypeParameterDeclaration(undefined, 'Value')
      Object.defineProperty(parameter, 'default', {
        get: () => {
          throw new Error('Unused parameter default read')
        },
      })
      const reference = ts.factory.createTypeReferenceNode('Model', [ts.factory.createTypeReferenceNode('T')])
      expect(resolveContextualTypeArgument(reference, parameter, 0, { T: forwarded }, current, undefined)).to.equal(forwarded)
      const defaultType = ts.factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword)
      const defaultParameter = ts.factory.createTypeParameterDeclaration(undefined, 'Value', undefined, defaultType)
      const resolvedType = {} as ts.Type
      const referencer = {
        aliasTypeArguments: [resolvedType],
        get typeArguments(): readonly ts.Type[] {
          throw new Error('Unused fallback arguments read')
        },
      } as unknown as ts.Type
      const result = resolveContextualTypeArgument(ts.factory.createTypeReferenceNode('Model'), defaultParameter, 0, {}, current, referencer)
      expect(result.type).to.equal(defaultType)
      expect(result.resolvedType).to.equal(resolvedType)
    })

    function genericFixture() {
      const source = ts.createSourceFile('generic.ts', 'interface Model<T, U = number> {} type Selected = Model<string>', ts.ScriptTarget.ES2021, true)
      const declaration = source.statements.find(ts.isInterfaceDeclaration)
      const alias = source.statements.find(ts.isTypeAliasDeclaration)
      if (!declaration?.typeParameters || !alias || !ts.isTypeReferenceNode(alias.type)) throw new Error('Expected generic fixture')
      const symbol = { flags: ts.SymbolFlags.Interface, escapedName: 'Model', getDeclarations: () => [declaration] } as unknown as ts.Symbol
      return { declaration, reference: alias.type, symbol }
    }

    it('binds parsed arguments and defaults in order with exact resolved-type identity', () => {
      const { declaration, reference, symbol } = genericFixture()
      const firstType = {} as ts.Type
      const secondType = {} as ts.Type
      const reads: ts.TypeNode[] = []
      const checker = {
        getSymbolAtLocation: () => symbol,
        getTypeFromTypeNode: (node: ts.TypeNode) => {
          reads.push(node)
          return reads.length === 1 ? firstType : secondType
        },
      } as unknown as ts.TypeChecker
      const current = { typeChecker: checker } as MetadataGenerator
      const contextResolver = new TypeResolver(reference, current)
      const bound = (contextResolver as any).typeArgumentsToContext(reference, reference.typeName) as Context
      expect(reads).to.deep.equal([reference.typeArguments?.[0], declaration.typeParameters?.[1].default])
      expect(bound.T.type).to.equal(reference.typeArguments?.[0])
      expect(bound.T.resolvedType).to.equal(firstType)
      expect(bound.U.type).to.equal(declaration.typeParameters?.[1].default)
      expect(bound.U.resolvedType).to.equal(secondType)
      expect(bound.T.name).to.equal('string')
      expect(bound.U.name).to.equal('number')
    })

    it('reports a missing argument before reading a later default or resolved type', () => {
      const { declaration, symbol } = genericFixture()
      const parameters = declaration.typeParameters
      if (!parameters) throw new Error('Expected generic parameters')
      Object.defineProperty(parameters[1], 'default', {
        get: () => {
          throw new Error('Unused later default read')
        },
      })
      const reference = ts.factory.createTypeReferenceNode('Model')
      const checker = {
        getSymbolAtLocation: () => symbol,
        getTypeFromTypeNode: () => {
          throw new Error('Unused argument type read')
        },
      } as unknown as ts.TypeChecker
      const contextResolver = new TypeResolver(reference, { typeChecker: checker } as MetadataGenerator)
      expect(() => (contextResolver as any).typeArgumentsToContext(reference, reference.typeName)).to.throw(GenerateMetadataError, 'Could not find a value for type parameter T')
    })

    it('restores the owning context after both handled and propagated inheritance failures', () => {
      const original: Context = { T: { name: 'Original', type: ts.factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword) } }
      const checker = { getSymbolAtLocation: () => undefined } as unknown as ts.TypeChecker
      const contextResolver = new TypeResolver(ts.factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword), { typeChecker: checker } as MetadataGenerator, undefined, original)
      const inherited = ts.factory.createExpressionWithTypeArguments(ts.factory.createIdentifier('Base'), undefined)
      let failure: Error = new GenerateMetadataError('Required inherited type unavailable')
      ;(contextResolver as any).getReferenceType = function (node: ts.Node, addToRefTypeMap: boolean) {
        expect(this).to.equal(contextResolver)
        expect(node).to.equal(inherited)
        expect(addToRefTypeMap).to.be.false
        expect(this.context).to.deep.equal({})
        throw failure
      }
      expect((contextResolver as any).getInheritedReferenceType(inherited)).to.be.undefined
      expect((contextResolver as any).context).to.equal(original)
      failure = new Error('Unexpected inherited failure')
      expect(() => (contextResolver as any).getInheritedReferenceType(inherited)).to.throw(failure)
      expect((contextResolver as any).context).to.equal(original)
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

      expect(getIoTsUtilityTypeFromSymbol(aliasSymbol as unknown as ts.Symbol, { getAliasedSymbol: () => resolvedSymbol } as unknown as ts.TypeChecker)).to.equal('TypeOf')
      expect(symbolComesFromModule(aliasSymbol as unknown as ts.Symbol, { getAliasedSymbol: () => resolvedSymbol } as unknown as ts.TypeChecker, 'io-ts')).to.be.true
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
