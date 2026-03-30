import { expect } from 'chai'
import { promises as fs } from 'node:fs'
import 'mocha'
import { tmpdir } from 'node:os'
import { dirname, join, resolve } from 'node:path'
import * as ts from 'typescript'
import { MetadataGenerator } from '../../../packages/cli/src/metadataGeneration/metadataGenerator'
import { GenerateMetadataError } from '../../../packages/cli/src/metadataGeneration/exceptions'
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

      expect(referenceType).to.equal(undefined)
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
