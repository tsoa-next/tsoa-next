import { assertNever, Tsoa } from '@tsoa-next/runtime'
import * as ts from 'typescript'
import { getDecorators, isDecorator } from './../utils/decoratorUtils'
import { getJSDocTagNames, isExistJSDocTag, symbolDisplayPartsToString } from './../utils/jsDocUtils'
import { getPropertyValidators } from './../utils/validatorUtils'
import { throwUnless } from '../utils/flowUtils'
import { GenerateMetadataError, GenerateMetaDataWarning } from './exceptions'
import { resolveIndexedAccessKeywordType, resolveIndexedAccessLiteralType, matchesKeyedIndexedAccess, resolveKeyedIndexedAccessType } from './indexed-access-type'
import { resolveKeyOfTypeOperator } from './key-of-type'
import { resolveMappedType } from './mapped-type'
import { getNodeDescription, getNodeFormat, getNodeTitle, getNodeExample, getNodeExtension } from './declaration-annotations'
import { getInitializerValue } from './initializer-value'
import { getDefaultValue } from './default-value'
import { resolveArrayTypeNode, resolveRestTypeNode, resolveUnionTypeNode, resolveTupleTypeNode, resolveLiteralTypeNode, resolveIntersectionTypes, getLiteralValue } from './structural-type'
import { MetadataGenerator } from './metadataGenerator'

import { PrimitiveTransformer } from './transformer/primitiveTransformer'
import { DateTransformer } from './transformer/dateTransformer'
import { EnumTransformer } from './transformer/enumTransformer'
import { PropertyTransformer } from './transformer/propertyTransformer'
import { ReferenceTransformer } from './transformer/referenceTransformer'

type ReferenceTypeCache = {
  referenceTypes: Tsoa.ReferenceTypeMap
  inProgressTypes: Record<string, Array<(realType: Tsoa.ReferenceType) => void>>
}

let referenceTypeCaches = new WeakMap<MetadataGenerator, ReferenceTypeCache>()

type UsableDeclaration = ts.InterfaceDeclaration | ts.ClassDeclaration | ts.PropertySignature | ts.TypeAliasDeclaration | ts.EnumMember
type UsableDeclarationWithoutPropertySignature = Exclude<UsableDeclaration, ts.PropertySignature>
export interface Context {
  [name: string]: {
    type: ts.TypeNode
    name: string
    resolvedType?: ts.Type
  }
}

type DeclarationWithTypeParameters = ts.Declaration & {
  typeParameters?: ts.NodeArray<ts.TypeParameterDeclaration>
}
type IoTsUtilityType = 'TypeOf' | 'Branded' | 'Brand'
type ResolvedContextualTypeArgument = {
  type: ts.TypeNode
  name?: string
  resolvedType?: ts.Type
}

const symbolModuleOriginCache = new WeakMap<ts.TypeChecker, WeakMap<ts.Symbol, Map<string, boolean>>>()
const ioTsUtilityTypeCache = new WeakMap<ts.TypeChecker, WeakMap<ts.Symbol, IoTsUtilityType | false>>()

const getSymbolModuleOriginCache = (typeChecker: ts.TypeChecker): WeakMap<ts.Symbol, Map<string, boolean>> => {
  let cache = symbolModuleOriginCache.get(typeChecker)
  if (!cache) {
    cache = new WeakMap<ts.Symbol, Map<string, boolean>>()
    symbolModuleOriginCache.set(typeChecker, cache)
  }

  return cache
}

const getIoTsUtilityTypeCache = (typeChecker: ts.TypeChecker): WeakMap<ts.Symbol, IoTsUtilityType | false> => {
  let cache = ioTsUtilityTypeCache.get(typeChecker)
  if (!cache) {
    cache = new WeakMap<ts.Symbol, IoTsUtilityType | false>()
    ioTsUtilityTypeCache.set(typeChecker, cache)
  }

  return cache
}

const isAsciiLetter = (char: string | undefined): boolean => {
  if (!char) {
    return false
  }

  const code = char.codePointAt(0) ?? -1
  return (code >= 65 && code <= 90) || (code >= 97 && code <= 122)
}

const isRefTypeTokenCharacter = (char: string | undefined): boolean => {
  if (!char) {
    return false
  }

  const code = char.codePointAt(0) ?? -1
  return isAsciiLetter(char) || (code >= 48 && code <= 57) || char === '_'
}

const readRefTypeToken = (value: string, startIndex: number): { token: string; nextIndex: number } => {
  let nextIndex = startIndex

  while (nextIndex < value.length && isRefTypeTokenCharacter(value[nextIndex])) {
    nextIndex += 1
  }

  if (value[nextIndex] === '?') {
    nextIndex += 1
  }

  return {
    token: value.slice(startIndex, nextIndex),
    nextIndex,
  }
}

const readRefTypeLiteralTypeSegment = (value: string, colonIndex: number): { replacement: string; nextIndex: number } | undefined => {
  if (value[colonIndex] !== ':') {
    return undefined
  }

  const typeStart = colonIndex + 1
  let typeEnd = typeStart

  while (typeEnd < value.length && isAsciiLetter(value[typeEnd])) {
    typeEnd += 1
  }

  if (typeEnd === typeStart) {
    return undefined
  }

  return {
    replacement: `-${value.slice(typeStart, typeEnd)}`,
    nextIndex: typeEnd,
  }
}

const replaceTypeLiteralPropertySeparators = (value: string): string => {
  let formatted = ''
  let index = 0

  while (index < value.length) {
    if (!isRefTypeTokenCharacter(value[index])) {
      formatted += value[index]
      index += 1
      continue
    }

    const { nextIndex, token } = readRefTypeToken(value, index)
    formatted += token

    const literalTypeSegment = readRefTypeLiteralTypeSegment(value, nextIndex)
    if (literalTypeSegment) {
      formatted += literalTypeSegment.replacement
      index = literalTypeSegment.nextIndex
      continue
    }

    index = nextIndex
  }

  return formatted
}

const replaceIndexedAccessSegments = (value: string): string => {
  let formatted = ''
  let index = 0

  while (index < value.length) {
    if (value[index] !== '[') {
      formatted += value[index]
      index += 1
      continue
    }

    const previousCharacter = (formatted as string & { at(index: number): string | undefined }).at(-1)
    if (!(isAsciiLetter(previousCharacter) || previousCharacter === '}' || previousCharacter === ']' || previousCharacter === ')')) {
      formatted += value[index]
      index += 1
      continue
    }

    let segmentEnd = index + 1
    while (segmentEnd < value.length && isAsciiLetter(value[segmentEnd])) {
      segmentEnd += 1
    }

    if (segmentEnd > index + 1 && value[segmentEnd] === ']') {
      formatted += `-at-${value.slice(index + 1, segmentEnd)}`
      index = segmentEnd + 1
      continue
    }

    formatted += value[index]
    index += 1
  }

  return formatted
}

export class TypeResolver {
  constructor(
    private readonly typeNode: ts.TypeNode,
    public readonly current: MetadataGenerator,
    private readonly parentNode?: ts.Node,
    public context: Context = {},
    public readonly referencer?: ts.Type,
  ) {}

  /** Explicitly resets reference caches; normal generation owns an independent cache. */
  public static clearCache() {
    referenceTypeCaches = new WeakMap<MetadataGenerator, ReferenceTypeCache>()
  }

  private get referenceTypeCache(): ReferenceTypeCache {
    let cache = referenceTypeCaches.get(this.current)
    if (!cache) {
      cache = { referenceTypes: {}, inProgressTypes: {} }
      referenceTypeCaches.set(this.current, cache)
    }
    return cache
  }

  public resolve(): Tsoa.Type {
    const recoverableTypeReference = this.getRecoverableTypeReferenceNode()
    if (recoverableTypeReference) {
      return this.resolveTypeReferenceNode(recoverableTypeReference, this.current, this.context, this.parentNode)
    }

    const parentJsDocTagNames = this.parentNode ? getJSDocTagNames(this.parentNode) : undefined
    const primitiveType = new PrimitiveTransformer().transform(this.current.defaultNumberType, this.typeNode, parentJsDocTagNames)
    if (primitiveType) {
      return primitiveType
    }

    const nonReferenceType = this.resolveNonReferenceTypeNode()
    if (nonReferenceType) {
      return nonReferenceType
    }

    throwUnless(ts.isTypeReferenceNode(this.typeNode), new GenerateMetadataError(`Unknown type: ${ts.SyntaxKind[this.typeNode.kind]}`, this.typeNode))
    return this.resolveTypeReferenceNode(this.typeNode, this.current, this.context, this.parentNode)
  }

  private getRecoverableTypeReferenceNode(): ts.TypeReferenceNode | undefined {
    if (!ts.isIdentifier(this.typeNode) && !ts.isQualifiedName(this.typeNode)) {
      return undefined
    }

    const parent = this.typeNode.parent
    return parent && ts.isTypeReferenceNode(parent) && parent.typeName === this.typeNode ? parent : undefined
  }

  private resolveNonReferenceTypeNode(): Tsoa.Type | undefined {
    return (
      this.resolveArrayTypeNode() ??
      this.resolveRestTypeNode() ??
      this.resolveUnionTypeNode() ??
      this.resolveIntersectionTypeNode() ??
      this.resolveTupleTypeNode() ??
      this.resolveAnyOrUnknownTypeNode() ??
      this.resolveLiteralTypeNode() ??
      this.resolveTypeLiteralNode() ??
      this.resolveObjectKeywordTypeNode() ??
      this.resolveMappedTypeNode() ??
      this.resolveConditionalTypeNode() ??
      this.resolveTypeOperatorTypeNode() ??
      this.resolveIndexedAccessTypeNodeWrapper() ??
      this.resolveTemplateLiteralTypeNode() ??
      this.resolveParenthesizedTypeNode()
    )
  }

  private resolveArrayTypeNode(): Tsoa.Type | undefined {
    return resolveArrayTypeNode(this.typeNode, this.current, this.parentNode, this.context, TypeResolver)
  }

  private resolveRestTypeNode(): Tsoa.Type | undefined {
    return resolveRestTypeNode(this.typeNode, this.current, this.parentNode, this.context, TypeResolver)
  }

  private resolveUnionTypeNode(): Tsoa.Type | undefined {
    return resolveUnionTypeNode(this.typeNode, this.current, this.parentNode, this.context, TypeResolver)
  }

  private resolveIntersectionTypeNode(): Tsoa.Type | undefined {
    if (!ts.isIntersectionTypeNode(this.typeNode)) {
      return undefined
    }

    return {
      dataType: 'intersection',
      types: resolveIntersectionTypes(
        this.typeNode.types.filter(type => !this.isIoTsBrandMarker(type, this.current.typeChecker)),
        this.current,
        this.parentNode,
        this.context,
        TypeResolver,
      ),
    }
  }

  private resolveTupleTypeNode(): Tsoa.Type | undefined {
    return resolveTupleTypeNode(this.typeNode, this.current, this.context, TypeResolver)
  }

  private resolveAnyOrUnknownTypeNode(): Tsoa.Type | undefined {
    if (this.typeNode.kind !== ts.SyntaxKind.AnyKeyword && this.typeNode.kind !== ts.SyntaxKind.UnknownKeyword) {
      return undefined
    }

    return { dataType: 'any' }
  }

  private resolveLiteralTypeNode(): Tsoa.Type | undefined {
    return resolveLiteralTypeNode(this.typeNode)
  }

  private resolveTypeLiteralNode(): Tsoa.Type | undefined {
    if (!ts.isTypeLiteralNode(this.typeNode)) {
      return undefined
    }

    const properties = this.typeNode.members.filter(ts.isPropertySignature).reduce<Tsoa.Property[]>((result, propertySignature) => [this.resolveTypeLiteralProperty(propertySignature), ...result], [])

    return {
      additionalProperties: this.resolveTypeLiteralAdditionalProperties(this.typeNode),
      dataType: 'nestedObjectLiteral',
      properties,
    }
  }

  private resolveTypeLiteralProperty(propertySignature: ts.PropertySignature): Tsoa.Property {
    return {
      example: this.getNodeExample(propertySignature),
      default: TypeResolver.getDefault(propertySignature),
      description: this.getNodeDescription(propertySignature),
      format: this.getNodeFormat(propertySignature),
      name: this.getPropertyName(propertySignature),
      required: !propertySignature.questionToken,
      type: new TypeResolver(propertySignature.type as ts.TypeNode, this.current, propertySignature, this.context).resolve(),
      validators: getPropertyValidators(propertySignature) || {},
      deprecated: isExistJSDocTag(propertySignature, tag => tag.tagName.text === 'deprecated'),
      title: this.getNodeTitle(propertySignature),
      extensions: this.getNodeExtension(propertySignature),
    }
  }

  private resolveTypeLiteralAdditionalProperties(typeLiteralNode: ts.TypeLiteralNode): Tsoa.Type | undefined {
    const indexMember = typeLiteralNode.members.find(member => ts.isIndexSignatureDeclaration(member))
    if (!indexMember) {
      return undefined
    }

    const indexType = new TypeResolver(indexMember.parameters[0].type as ts.TypeNode, this.current, this.parentNode, this.context).resolve()
    throwUnless(indexType.dataType === 'string', new GenerateMetadataError(`Only string indexers are supported.`, this.typeNode))

    return new TypeResolver(indexMember.type, this.current, this.parentNode, this.context).resolve()
  }

  private resolveObjectKeywordTypeNode(): Tsoa.Type | undefined {
    if (this.typeNode.kind !== ts.SyntaxKind.ObjectKeyword) {
      return undefined
    }

    return { dataType: 'object' }
  }

  private resolveMappedTypeNode(): Tsoa.Type | undefined {
    if (!ts.isMappedTypeNode(this.typeNode)) {
      return undefined
    }

    return resolveMappedType(this.getReferencer(), this.typeNode, this.typeNode, this.current, this.context, this, TypeResolver)
  }

  private resolveConditionalTypeNode(): Tsoa.Type | undefined {
    if (!ts.isConditionalTypeNode(this.typeNode)) {
      return undefined
    }

    const referencer = this.getReferencer()
    const resolvedNode = this.current.typeChecker.typeToTypeNode(referencer, undefined, ts.NodeBuilderFlags.NoTruncation)!
    return new TypeResolver(resolvedNode, this.current, this.typeNode, this.context, referencer).resolve()
  }

  private resolveTypeOperatorTypeNode(): Tsoa.Type | undefined {
    if (!ts.isTypeOperatorNode(this.typeNode)) {
      return undefined
    }

    return this.resolveTypeOperatorNode(this.typeNode, this.current.typeChecker, this.current, this.context, this.parentNode, this.referencer)
  }

  private resolveIndexedAccessTypeNodeWrapper(): Tsoa.Type | undefined {
    if (!ts.isIndexedAccessTypeNode(this.typeNode)) {
      return undefined
    }

    return this.resolveIndexedAccessTypeNode(this.typeNode, this.current.typeChecker, this.current, this.context)
  }

  private resolveTemplateLiteralTypeNode(): Tsoa.Type | undefined {
    if (!ts.isTemplateLiteralTypeNode(this.typeNode)) {
      return undefined
    }

    const type = this.getReferencer()
    throwUnless(
      type.isUnion() && type.types.every((unionElementType): unionElementType is ts.StringLiteralType => unionElementType.isStringLiteral()),
      new GenerateMetadataError(`Could not the type of ${this.current.typeChecker.typeToString(this.current.typeChecker.getTypeFromTypeNode(this.typeNode), this.typeNode)}`, this.typeNode),
    )

    return {
      dataType: 'enum',
      enums: type.types.map((stringLiteralType: ts.StringLiteralType) => stringLiteralType.value),
    }
  }

  private resolveParenthesizedTypeNode(): Tsoa.Type | undefined {
    if (!ts.isParenthesizedTypeNode(this.typeNode)) {
      return undefined
    }

    return new TypeResolver(this.typeNode.type, this.current, this.typeNode, this.context, this.referencer).resolve()
  }

  private resolveTypeOperatorNode(typeNode: ts.TypeOperatorNode, typeChecker: ts.TypeChecker, current: MetadataGenerator, context: Context, parentNode?: ts.Node, referencer?: ts.Type): Tsoa.Type {
    switch (typeNode.operator) {
      case ts.SyntaxKind.KeyOfKeyword: {
        return this.resolveKeyOfTypeOperator(typeNode, typeChecker, current, context, parentNode)
      }
      case ts.SyntaxKind.ReadonlyKeyword:
        // Handle `readonly` arrays
        return new TypeResolver(typeNode.type, current, typeNode, context, referencer).resolve()
      default:
        throw new GenerateMetadataError(`Unknown type: ${ts.SyntaxKind[typeNode.kind]}`, typeNode)
    }
  }

  private resolveKeyOfTypeOperator(typeNode: ts.TypeOperatorNode, typeChecker: ts.TypeChecker, current: MetadataGenerator, context: Context, parentNode?: ts.Node): Tsoa.Type {
    return resolveKeyOfTypeOperator(typeNode, typeChecker, current, context, parentNode, TypeResolver)
  }

  private resolveIndexedAccessTypeNode(typeNode: ts.IndexedAccessTypeNode, typeChecker: ts.TypeChecker, current: MetadataGenerator, context: Context): Tsoa.Type {
    const { indexType, objectType } = typeNode

    if ([ts.SyntaxKind.NumberKeyword, ts.SyntaxKind.StringKeyword].includes(indexType.kind)) {
      return resolveIndexedAccessKeywordType(typeNode, typeChecker, current, context, objectType, indexType, TypeResolver)
    }

    if (ts.isLiteralTypeNode(indexType) && (ts.isStringLiteral(indexType.literal) || ts.isNumericLiteral(indexType.literal))) {
      return resolveIndexedAccessLiteralType(typeNode, typeChecker, current, context, objectType, indexType, TypeResolver)
    }

    if (ts.isTypeOperatorNode(indexType) && indexType.operator === ts.SyntaxKind.KeyOfKeyword) {
      const keyedIndexedAccessType = this.resolveKeyedIndexedAccessType(typeNode, typeChecker, current, context, objectType, indexType)
      if (keyedIndexedAccessType) {
        return keyedIndexedAccessType
      }
    }

    throw new GenerateMetadataError(`Unknown type: ${ts.SyntaxKind[typeNode.kind]}`, typeNode)
  }

  private resolveKeyedIndexedAccessType(
    typeNode: ts.IndexedAccessTypeNode,
    typeChecker: ts.TypeChecker,
    current: MetadataGenerator,
    context: Context,
    objectType: ts.TypeNode,
    indexType: ts.TypeOperatorNode,
  ): Tsoa.Type | undefined {
    if (!matchesKeyedIndexedAccess(objectType, indexType)) {
      return undefined
    }

    const type = this.getReferencer()
    return resolveKeyedIndexedAccessType(type, typeChecker, current, context, typeNode, this.referencer, TypeResolver)
  }

  private resolveTypeReferenceNode(typeNode: ts.TypeReferenceNode, current: MetadataGenerator, context: Context, parentNode?: ts.Node): Tsoa.Type {
    const { typeName } = typeNode
    const resolvedTypeArguments = typeNode.typeArguments ? [...typeNode.typeArguments] : undefined
    const ioTsType = this.resolveIoTsUtilityTypeReference(typeNode, current, context, parentNode, resolvedTypeArguments)
    if (ioTsType) {
      return ioTsType
    }

    if (!ts.isIdentifier(typeName)) {
      return this.getReferenceType(typeNode)
    }

    const builtinType = this.resolveBuiltinTypeReference(typeName.text, resolvedTypeArguments, current, context, parentNode)
    if (builtinType) {
      return builtinType
    }

    return this.getReferenceType(typeNode)
  }

  private resolveIoTsUtilityTypeReference(
    typeNode: ts.TypeReferenceNode,
    current: MetadataGenerator,
    context: Context,
    parentNode: ts.Node | undefined,
    resolvedTypeArguments: ts.TypeNode[] | undefined,
  ): Tsoa.Type | undefined {
    const ioTsUtilityType = this.getIoTsUtilityType(typeNode.typeName, current.typeChecker)
    if (!ioTsUtilityType) {
      return undefined
    }

    switch (ioTsUtilityType) {
      case 'TypeOf':
        return this.resolveIoTsDecodedType(typeNode, current, context, parentNode, resolvedTypeArguments)
      case 'Branded':
        if (resolvedTypeArguments?.length) {
          return new TypeResolver(resolvedTypeArguments[0], current, parentNode, context).resolve()
        }
        return undefined
      case 'Brand':
        return { dataType: 'any' }
      default:
        return undefined
    }
  }

  private resolveIoTsDecodedType(
    typeNode: ts.TypeReferenceNode,
    current: MetadataGenerator,
    context: Context,
    parentNode: ts.Node | undefined,
    resolvedTypeArguments: ts.TypeNode[] | undefined,
  ): Tsoa.Type | undefined {
    if (resolvedTypeArguments?.length !== 1) {
      return undefined
    }

    const [codecTypeArgument] = resolvedTypeArguments
    const codecType = current.typeChecker.getTypeFromTypeNode(codecTypeArgument)
    const decodedSymbol = current.typeChecker.getPropertyOfType(codecType, '_A')
    if (decodedSymbol) {
      const decodedType = current.typeChecker.getTypeOfSymbolAtLocation(decodedSymbol, codecTypeArgument)
      const decodedNode = this.normalizeTypeNodeFromBuilder(current.typeChecker.typeToTypeNode(decodedType, undefined, ts.NodeBuilderFlags.InTypeAlias | ts.NodeBuilderFlags.NoTruncation))
      if (decodedNode) {
        return new TypeResolver(decodedNode, current, parentNode, context, decodedType).resolve()
      }
    }

    const resolvedType = current.typeChecker.getTypeFromTypeNode(typeNode)
    const resolvedNode = this.normalizeTypeNodeFromBuilder(current.typeChecker.typeToTypeNode(resolvedType, undefined, ts.NodeBuilderFlags.InTypeAlias | ts.NodeBuilderFlags.NoTruncation))
    if (resolvedNode && !ts.isTypeReferenceNode(resolvedNode)) {
      return new TypeResolver(resolvedNode, current, parentNode, context, resolvedType).resolve()
    }

    return undefined
  }

  private resolveBuiltinTypeReference(
    typeName: string,
    typeArguments: ts.TypeNode[] | undefined,
    current: MetadataGenerator,
    context: Context,
    parentNode: ts.Node | undefined,
  ): Tsoa.Type | undefined {
    switch (typeName) {
      case 'Date':
        return new DateTransformer().transform(parentNode)
      case 'Buffer':
      case 'Readable':
        return { dataType: 'buffer' }
      case 'Array':
        if (typeArguments?.length === 1) {
          return {
            dataType: 'array',
            elementType: new TypeResolver(typeArguments[0], current, parentNode, context).resolve(),
          }
        }
        return undefined
      case 'Promise':
        if (typeArguments?.length === 1) {
          const promisedType = this.getPromisedTypeOfReferencer(current.typeChecker)
          return new TypeResolver(typeArguments[0], current, parentNode, context, promisedType).resolve()
        }
        return undefined
      case 'String':
        return { dataType: 'string' }
      default:
        if (context[typeName]) {
          return new TypeResolver(context[typeName].type, current, parentNode, context, context[typeName].resolvedType).resolve()
        }
        return undefined
    }
  }

  private isIoTsBrandMarker(typeNode: ts.TypeNode, typeChecker: ts.TypeChecker): boolean {
    return ts.isTypeReferenceNode(typeNode) && this.getIoTsUtilityType(typeNode.typeName, typeChecker) === 'Brand'
  }

  private getIoTsUtilityType(typeName: ts.EntityName, typeChecker: ts.TypeChecker): IoTsUtilityType | undefined {
    const symbolNode = ts.isQualifiedName(typeName) ? typeName.right : typeName
    const symbolName = symbolNode.text
    if (symbolName !== 'TypeOf' && symbolName !== 'Branded' && symbolName !== 'Brand') {
      return undefined
    }

    if (ts.isQualifiedName(typeName) && this.entityNameComesFromModule(typeName.left, typeChecker, 'io-ts')) {
      return symbolName
    }

    const symbol = typeChecker.getSymbolAtLocation(symbolNode)
    if (!symbol) {
      return undefined
    }

    return this.getIoTsUtilityTypeFromSymbol(symbol, typeChecker)
  }

  private entityNameComesFromModule(entityName: ts.EntityName, typeChecker: ts.TypeChecker, moduleName: string): boolean {
    const symbolNode = ts.isQualifiedName(entityName) ? entityName.right : entityName
    const symbol = typeChecker.getSymbolAtLocation(symbolNode)
    return !!symbol && this.symbolComesFromModule(symbol, typeChecker, moduleName)
  }

  private getIoTsUtilityTypeFromSymbol(symbol: ts.Symbol | undefined, typeChecker: ts.TypeChecker, visited: Set<ts.Symbol> = new Set()): IoTsUtilityType | undefined {
    if (!symbol || visited.has(symbol)) {
      return undefined
    }

    const cache = getIoTsUtilityTypeCache(typeChecker)
    if (cache.has(symbol)) {
      const cachedType = cache.get(symbol)
      return cachedType || undefined
    }

    visited.add(symbol)

    if ((symbol.flags & ts.SymbolFlags.Alias) !== 0) {
      const aliasedSymbol = typeChecker.getAliasedSymbol(symbol)
      const aliasedType = this.getIoTsUtilityTypeFromSymbol(aliasedSymbol, typeChecker, visited)
      if (aliasedType) {
        cache.set(symbol, aliasedType)
        return aliasedType
      }
    }

    const symbolName = symbol.getName()
    if ((symbolName === 'TypeOf' || symbolName === 'Branded' || symbolName === 'Brand') && this.symbolComesFromModule(symbol, typeChecker, 'io-ts')) {
      cache.set(symbol, symbolName)
      return symbolName
    }

    cache.set(symbol, false)
    return undefined
  }

  private symbolComesFromModule(symbol: ts.Symbol, typeChecker: ts.TypeChecker, moduleName: string, visited: Set<ts.Symbol> = new Set()): boolean {
    if (visited.has(symbol)) {
      return false
    }

    const moduleCache = getSymbolModuleOriginCache(typeChecker)
    const cachedByModule = moduleCache.get(symbol)
    const cachedResult = cachedByModule?.get(moduleName)
    if (cachedResult !== undefined) {
      return cachedResult
    }

    visited.add(symbol)

    const comesFromModule = this.symbolDeclarationsComeFromModule(symbol, moduleName) || this.aliasedSymbolComesFromModule(symbol, typeChecker, moduleName, visited)
    if (cachedByModule) {
      cachedByModule.set(moduleName, comesFromModule)
    } else {
      moduleCache.set(symbol, new Map([[moduleName, comesFromModule]]))
    }

    return comesFromModule
  }

  private symbolDeclarationsComeFromModule(symbol: ts.Symbol, moduleName: string): boolean {
    const declarations = symbol.declarations || (symbol.valueDeclaration ? [symbol.valueDeclaration] : [])
    return declarations.some(declaration => this.declarationComesFromModule(declaration, moduleName))
  }

  private declarationComesFromModule(declaration: ts.Declaration, moduleName: string): boolean {
    const containingImportModuleSpecifier = this.getContainingImportModuleSpecifier(declaration)
    if (containingImportModuleSpecifier === moduleName) {
      return true
    }

    const fileName = declaration.getSourceFile().fileName.replaceAll('\\', '/')
    return fileName.includes(`/node_modules/${moduleName}/`)
  }

  private getContainingImportModuleSpecifier(node: ts.Node): string | undefined {
    let current: ts.Node | undefined = node.parent
    while (current && !ts.isImportDeclaration(current)) {
      current = current.parent
    }

    return current && ts.isStringLiteral(current.moduleSpecifier) ? current.moduleSpecifier.text : undefined
  }

  private aliasedSymbolComesFromModule(symbol: ts.Symbol, typeChecker: ts.TypeChecker, moduleName: string, visited: Set<ts.Symbol>): boolean {
    if ((symbol.flags & ts.SymbolFlags.Alias) === 0) {
      return false
    }

    const aliasedSymbol = typeChecker.getAliasedSymbol(symbol)
    return aliasedSymbol !== symbol && this.symbolComesFromModule(aliasedSymbol, typeChecker, moduleName, visited)
  }

  private getDesignatedModels<T extends ts.Node>(nodes: T[], typeName: string): T[] {
    /**
     * Model is marked with '@tsoaModel', indicating that it should be the 'canonical' model used
     */
    const designatedNodes = nodes.filter(enumNode => {
      return isExistJSDocTag(enumNode, tag => tag.tagName.text === 'tsoaModel')
    })
    if (designatedNodes.length === 0) {
      return nodes
    }

    throwUnless(designatedNodes.length === 1, new GenerateMetadataError(`Multiple models for ${typeName} marked with '@tsoaModel'; '@tsoaModel' should only be applied to one model.`))

    return designatedNodes
  }

  private hasFlag(type: ts.Type | ts.Symbol | ts.Declaration, flag: ts.TypeFlags | ts.NodeFlags | ts.SymbolFlags) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison
    return (type.flags & flag) === flag
  }

  private getReferencer(): ts.Type {
    if (this.referencer) {
      return this.referencer
    }
    if (this.typeNode.pos !== -1) {
      return this.current.typeChecker.getTypeFromTypeNode(this.typeNode)
    }
    throw new GenerateMetadataError(`Can not succeeded to calculate referencer type.`, this.typeNode)
  }

  private static typeReferenceToEntityName(node: ts.TypeReferenceType): ts.EntityName {
    if (ts.isTypeReferenceNode(node)) {
      return node.typeName
    } else if (ts.isExpressionWithTypeArguments(node)) {
      return node.expression as ts.EntityName
    }
    throw new GenerateMetadataError(`Can't resolve Reference type.`)
  }

  //Generates type name for type references
  private calcRefTypeName(type: ts.EntityName): string {
    const contextualName = this.context[this.getEntityNameText(type)]?.name
    if (contextualName) {
      return contextualName
    }

    const declarations = this.getModelTypeDeclarations(type)
    if (!declarations.length) {
      return this.getFallbackRefTypeName(type)
    }

    const name = this.getDeclarationBasedRefTypeName(type, declarations)
    this.current.CheckModelUnicity(
      name,
      declarations.map(declaration => ({
        fileName: declaration.getSourceFile().fileName,
        pos: declaration.pos,
      })),
    )
    return name
  }

  private getEntityNameText(type: ts.EntityName): string {
    if (ts.isIdentifier(type)) {
      return type.text
    }

    return `${this.getEntityNameText(type.left)}.${type.right.text}`
  }

  private getFallbackRefTypeName(type: ts.EntityName): string {
    if (ts.isIdentifier(type)) {
      return type.text
    }

    return this.createInlineReferenceTypeName(type as unknown as ts.TypeNode)
  }

  private createInlineReferenceTypeName(typeNode: ts.TypeNode): string {
    const resolvedType = new TypeResolver(typeNode, this.current, this.parentNode, this.context).resolve()
    const uniqueName = `Inline_${this.sanitizeInlineTypeName(this.calcTypeName(typeNode))}`
    this.current.AddReferenceType({
      dataType: 'refAlias',
      refName: uniqueName,
      type: resolvedType,
      validators: {},
      deprecated: false,
    })
    return uniqueName
  }

  private sanitizeInlineTypeName(typeName: string): string {
    const normalizedName = typeName.replaceAll(/[^A-Za-z0-9]/g, '_').replaceAll(/_+/g, '_')
    const withoutLeadingUnderscore = normalizedName.startsWith('_') ? normalizedName.slice(1) : normalizedName
    return withoutLeadingUnderscore.endsWith('_') ? withoutLeadingUnderscore.slice(0, -1) : withoutLeadingUnderscore
  }

  private getDeclarationBasedRefTypeName(type: ts.EntityName, declarations: UsableDeclarationWithoutPropertySignature[]): string {
    const declaration = declarations[0]
    let name = this.getDeclarationRefTypeName(declaration, this.getEntityNameText(type))
    let currentNode = declaration.parent
    let isFirst = true

    while (!ts.isSourceFile(currentNode)) {
      if (ts.isBlock(currentNode)) {
        break
      }

      if (this.shouldPrefixDeclarationNamespace(currentNode, isFirst)) {
        throwUnless(ts.isModuleDeclaration(currentNode), new GenerateMetadataError(`This node kind is unknown: ${currentNode.kind}`, type))
        if (!this.isGlobalDeclaration(currentNode)) {
          name = `${currentNode.name.text}.${name}`
        }
      }

      isFirst = false
      currentNode = currentNode.parent
    }

    return name
  }

  private getDeclarationRefTypeName(declaration: UsableDeclarationWithoutPropertySignature, fallbackName: string): string {
    if (ts.isEnumMember(declaration)) {
      return `${declaration.parent.name.getText()}.${declaration.name.getText()}`
    }

    return declaration.name?.getText() ?? fallbackName
  }

  private shouldPrefixDeclarationNamespace(node: ts.Node, isFirst: boolean): boolean {
    return !(isFirst && ts.isEnumDeclaration(node)) && !ts.isModuleBlock(node)
  }

  private isGlobalDeclaration(node: ts.ModuleDeclaration): boolean {
    return node.name.kind === ts.SyntaxKind.Identifier && node.name.text === 'global'
  }

  private calcMemberJsDocProperties(arg: ts.PropertySignature): string {
    const def = TypeResolver.getDefault(arg)
    const isDeprecated = isExistJSDocTag(arg, tag => tag.tagName.text === 'deprecated') || isDecorator(arg, (identifier, canonicalName) => canonicalName === 'Deprecated', this.current.typeChecker)

    const symbol = this.getSymbolAtLocation(arg.name)
    const comments = symbol ? symbol.getDocumentationComment(this.current.typeChecker) : []
    const description = symbolDisplayPartsToString(comments)

    const validators = getPropertyValidators(arg)
    const format = this.getNodeFormat(arg)
    const example = this.getNodeExample(arg)
    const extensions = this.getNodeExtension(arg)
    const isIgnored = getJSDocTagNames(arg).includes('ignore')

    const jsonObj = {
      default: def,
      description,
      validators: validators && Object.keys(validators).length ? validators : undefined,
      format,
      example,
      extensions: extensions.length ? extensions : undefined,
      deprecated: isDeprecated ? true : undefined,
      ignored: isIgnored ? true : undefined,
    }
    const keys = Object.keys(jsonObj) as Array<keyof typeof jsonObj>
    for (const key of keys) {
      if (jsonObj[key] === undefined) {
        delete jsonObj[key]
      }
    }
    if (Object.keys(jsonObj).length) {
      return JSON.stringify(jsonObj)
    }
    return ''
  }

  //Generates type name for type references
  private calcTypeName(arg: ts.TypeNode): string {
    const literalTypeName = this.getLiteralTypeName(arg)
    if (literalTypeName) {
      return literalTypeName
    }

    const resolvedType = PrimitiveTransformer.resolveKindToPrimitive(arg.kind)
    if (resolvedType) {
      return resolvedType
    }

    const structuralTypeName = this.getStructuralTypeName(arg)
    if (structuralTypeName) {
      return structuralTypeName
    }

    console.warn(new GenerateMetaDataWarning(`This kind (${arg.kind}) is unhandled, so the type will be any, and no type conflict checks will made`, arg).toString())
    return 'any'
  }

  private getLiteralTypeName(arg: ts.TypeNode): string | undefined {
    if (!ts.isLiteralTypeNode(arg)) {
      return undefined
    }

    const literalValue = getLiteralValue(arg)
    if (typeof literalValue === 'string') {
      return `'${literalValue}'`
    }

    if (literalValue === null) {
      return 'null'
    }

    if (typeof literalValue === 'boolean') {
      return literalValue ? 'true' : 'false'
    }

    return `${literalValue}`
  }

  private getStructuralTypeName(arg: ts.TypeNode): string | undefined {
    return (
      this.getReferenceLikeTypeName(arg) ??
      this.getTypeLiteralName(arg) ??
      this.getArrayTypeName(arg) ??
      this.getIntersectionTypeName(arg) ??
      this.getUnionTypeName(arg) ??
      this.getTypeOperatorTypeName(arg) ??
      this.getTypeQueryName(arg) ??
      this.getIndexedAccessTypeName(arg) ??
      this.getKeywordTypeName(arg) ??
      this.getConditionalTypeName(arg) ??
      this.getParenthesizedTypeName(arg)
    )
  }

  private getReferenceLikeTypeName(arg: ts.TypeNode): string | undefined {
    if (!ts.isTypeReferenceNode(arg) && !ts.isExpressionWithTypeArguments(arg)) {
      return undefined
    }

    return this.calcTypeReferenceTypeName(arg)[1]
  }

  private getTypeLiteralName(arg: ts.TypeNode): string | undefined {
    if (!ts.isTypeLiteralNode(arg)) {
      return undefined
    }

    return `{${arg.members.map(member => this.getTypeLiteralMemberName(member)).join('; ')}}`
  }

  private getTypeLiteralMemberName(member: ts.TypeElement): string {
    if (ts.isPropertySignature(member)) {
      const name = (member.name as ts.Identifier).text
      const typeText = this.calcTypeName(member.type as ts.TypeNode)
      return `"${name}"${member.questionToken ? '?' : ''}${this.calcMemberJsDocProperties(member)}: ${typeText}`
    }

    if (ts.isIndexSignatureDeclaration(member)) {
      return this.getIndexSignatureTypeName(member)
    }

    throw new GenerateMetadataError(`Unhandled member kind has found: ${member.kind}`, member)
  }

  private getIndexSignatureTypeName(member: ts.IndexSignatureDeclaration): string {
    throwUnless(member.parameters.length === 1, new GenerateMetadataError(`Index signature parameters length != 1`, member))

    const indexType = member.parameters[0]
    throwUnless(ts.isParameter(indexType), new GenerateMetadataError(`indexSignature declaration parameter kind is not SyntaxKind.Parameter`, indexType))
    throwUnless(!indexType.questionToken, new GenerateMetadataError(`Question token has found for an indexSignature declaration`, indexType))

    const indexName = (indexType.name as ts.Identifier).text
    const indexTypeText = this.calcTypeName(indexType.type as ts.TypeNode)
    return `["${indexName}": ${indexTypeText}]: ${this.calcTypeName(member.type)}`
  }

  private getArrayTypeName(arg: ts.TypeNode): string | undefined {
    return ts.isArrayTypeNode(arg) ? `${this.calcTypeName(arg.elementType)}[]` : undefined
  }

  private getIntersectionTypeName(arg: ts.TypeNode): string | undefined {
    return ts.isIntersectionTypeNode(arg) ? arg.types.map(type => this.calcTypeName(type)).join(' & ') : undefined
  }

  private getUnionTypeName(arg: ts.TypeNode): string | undefined {
    return ts.isUnionTypeNode(arg) ? arg.types.map(type => this.calcTypeName(type)).join(' | ') : undefined
  }

  private getTypeOperatorTypeName(arg: ts.TypeNode): string | undefined {
    if (!ts.isTypeOperatorNode(arg)) {
      return undefined
    }

    const subTypeName = this.calcTypeName(arg.type)
    if (arg.operator === ts.SyntaxKind.KeyOfKeyword) {
      return `keyof ${subTypeName}`
    }

    if (arg.operator === ts.SyntaxKind.ReadonlyKeyword) {
      return `readonly ${subTypeName}`
    }

    throw new GenerateMetadataError(`Unknown keyword has found: ${arg.operator}`, arg)
  }

  private getTypeQueryName(arg: ts.TypeNode): string | undefined {
    return ts.isTypeQueryNode(arg) ? `typeof ${this.calcRefTypeName(arg.exprName)}` : undefined
  }

  private getIndexedAccessTypeName(arg: ts.TypeNode): string | undefined {
    return ts.isIndexedAccessTypeNode(arg) ? `${this.calcTypeName(arg.objectType)}[${this.calcTypeName(arg.indexType)}]` : undefined
  }

  private getKeywordTypeName(arg: ts.TypeNode): string | undefined {
    if (arg.kind === ts.SyntaxKind.UnknownKeyword) {
      return 'unknown'
    }

    if (arg.kind === ts.SyntaxKind.AnyKeyword) {
      return 'any'
    }

    return arg.kind === ts.SyntaxKind.NeverKeyword ? 'never' : undefined
  }

  private getConditionalTypeName(arg: ts.TypeNode): string | undefined {
    if (!ts.isConditionalTypeNode(arg)) {
      return undefined
    }

    const checkTypeName = this.calcTypeName(arg.checkType)
    const extendsTypeName = this.calcTypeName(arg.extendsType)
    const trueTypeName = this.calcTypeName(arg.trueType)
    const falseTypeName = this.calcTypeName(arg.falseType)
    return `${checkTypeName} extends ${extendsTypeName} ? ${trueTypeName} : ${falseTypeName}`
  }

  private getParenthesizedTypeName(arg: ts.TypeNode): string | undefined {
    return ts.isParenthesizedTypeNode(arg) ? `(${this.calcTypeName(arg.type)})` : undefined
  }

  //Generates type name for type references
  private calcTypeReferenceTypeName(node: ts.TypeReferenceType): [ts.EntityName, string] {
    const type = TypeResolver.typeReferenceToEntityName(node)
    const refTypeName = this.calcRefTypeName(type)
    if (Array.isArray(node.typeArguments)) {
      // Add typeArguments for Synthetic nodes (e.g. Record<> in TestClassModel.indexedResponse)
      const argumentsString = node.typeArguments.map(type => this.calcTypeName(type))
      return [type, `${refTypeName}<${argumentsString.join(', ')}>`]
    }
    return [type, refTypeName]
  }

  private getReferenceType(node: ts.TypeReferenceType, addToRefTypeMap = true): Tsoa.ReferenceType {
    const [type, name] = this.calcTypeReferenceTypeName(node)
    const refTypeName = this.getRefTypeName(name)
    this.current.CheckExpressionUnicity(refTypeName, name)

    this.context = this.typeArgumentsToContext(node, type)

    const result = this.resolveReferenceType(node, type, name, refTypeName)
    if (addToRefTypeMap) {
      this.current.AddReferenceType(result)
    }
    return result
  }

  private resolveReferenceType(node: ts.TypeReferenceType, type: ts.EntityName, name: string, refTypeName: string): Tsoa.ReferenceType {
    try {
      const existingType = this.referenceTypeCache.referenceTypes[name]
      if (existingType) {
        return existingType
      }

      if (this.referenceTypeCache.inProgressTypes[name]) {
        return this.createCircularDependencyResolver(name, refTypeName)
      }

      this.referenceTypeCache.inProgressTypes[name] = []

      const declarations = this.getModelTypeDeclarations(type)
      if (!declarations.length) {
        return this.resolveReferenceTypeFallback(node, name, refTypeName)
      }

      const referenceType = ReferenceTransformer.merge(declarations.map(declaration => this.resolveDeclarationReferenceType(declaration, node, refTypeName)))
      this.addToLocalReferenceTypeCache(name, referenceType)
      return referenceType
    } catch (error) {
      delete this.referenceTypeCache.inProgressTypes[name]
      throw error
    }
  }

  private resolveReferenceTypeFallback(node: ts.TypeReferenceType, name: string, refTypeName: string): Tsoa.ReferenceType {
    const fallbackReferenceType = this.getReferenceTypeFromTypeChecker(node, name, refTypeName)
    if (fallbackReferenceType) {
      this.addToLocalReferenceTypeCache(name, fallbackReferenceType)
      return fallbackReferenceType
    }

    throw new GenerateMetadataError(`Could not find declarations for type '${name}'. This might be a complex generic type that needs special handling.`)
  }

  private resolveDeclarationReferenceType(declaration: UsableDeclarationWithoutPropertySignature, node: ts.TypeReferenceType, refTypeName: string): Tsoa.ReferenceType {
    if (ts.isTypeAliasDeclaration(declaration)) {
      const referencer = node.pos !== -1 ? this.current.typeChecker.getTypeFromTypeNode(node) : undefined
      return new ReferenceTransformer().transform(declaration, refTypeName, this, referencer)
    }

    if (EnumTransformer.transformable(declaration)) {
      return new EnumTransformer().transform(this, declaration, refTypeName)
    }

    return this.getModelReference(declaration, refTypeName)
  }

  private addToLocalReferenceTypeCache(name: string, refType: Tsoa.ReferenceType) {
    if (this.referenceTypeCache.inProgressTypes[name]) {
      for (const fn of this.referenceTypeCache.inProgressTypes[name]) {
        fn(refType)
      }
    }
    this.referenceTypeCache.referenceTypes[name] = refType

    delete this.referenceTypeCache.inProgressTypes[name]
  }

  private getModelReference(modelType: ts.InterfaceDeclaration | ts.ClassDeclaration, refTypeName: string) {
    const example = this.getNodeExample(modelType)
    const description = this.getNodeDescription(modelType)
    const deprecated =
      isExistJSDocTag(modelType, tag => tag.tagName.text === 'deprecated') || isDecorator(modelType, (identifier, canonicalName) => canonicalName === 'Deprecated', this.current.typeChecker)
    const title = this.getNodeTitle(modelType)

    // Handle toJSON methods
    throwUnless(modelType.name, new GenerateMetadataError("Can't get Symbol from anonymous class", modelType))

    const type = this.current.typeChecker.getTypeAtLocation(modelType.name)
    const toJSONDeclaration = this.current.typeChecker.getPropertyOfType(type, 'toJSON')?.valueDeclaration
    if (toJSONDeclaration && (ts.isMethodDeclaration(toJSONDeclaration) || ts.isMethodSignature(toJSONDeclaration))) {
      let nodeType = toJSONDeclaration.type
      if (!nodeType) {
        const signature = this.current.typeChecker.getSignatureFromDeclaration(toJSONDeclaration)
        const implicitType = this.current.typeChecker.getReturnTypeOfSignature(signature!)
        nodeType = this.current.typeChecker.typeToTypeNode(implicitType, undefined, ts.NodeBuilderFlags.NoTruncation)
      }
      if (!nodeType) {
        throw new GenerateMetadataError(`Could not resolve the return type for ${refTypeName}.`, toJSONDeclaration)
      }
      return this.withDefinedReferenceMetadata(
        {
          refName: refTypeName,
          dataType: 'refAlias',
          description,
          type: new TypeResolver(nodeType, this.current).resolve(),
          validators: {},
          deprecated,
        },
        { example, title },
      )
    }

    const properties = new PropertyTransformer().transform(this, modelType)
    const additionalProperties = this.getModelAdditionalProperties(modelType)
    const inheritedProperties = this.getModelInheritedProperties(modelType) || []

    const referenceType = this.withDefinedReferenceMetadata<Tsoa.ReferenceType & { properties: Tsoa.Property[] }>(
      {
        additionalProperties,
        dataType: 'refObject',
        description,
        properties: inheritedProperties,
        refName: refTypeName,
        deprecated,
      },
      { example, title },
    )

    referenceType.properties = referenceType.properties.concat(properties)

    return referenceType
  }

  private withDefinedReferenceMetadata<TReferenceType extends Tsoa.ReferenceType>(referenceType: TReferenceType, metadata: { example: unknown; title: string | undefined }): TReferenceType {
    if (metadata.example !== undefined) {
      referenceType.example = metadata.example
    }

    if (metadata.title !== undefined) {
      referenceType.title = metadata.title
    }

    return referenceType
  }

  //Generates a name from the original type expression.
  //This function is not invertable, so it's possible, that 2 type expressions have the same refTypeName.
  private getRefTypeName(name: string): string {
    let preformattedName = name //Preformatted name handles most cases
      .replaceAll('<', '_')
      .replaceAll('>', '_')
      .replaceAll(/\s+/g, '')
      .replaceAll(',', '.')
      .replaceAll(/'([^']*)'/g, '$1')
      .replaceAll(/"([^"]*)"/g, '$1')
      .replaceAll('&', '-and-')
      .replaceAll('|', '-or-')
      .replaceAll('[]', '-Array')
      .replaceAll(/[{}]/g, '_') // SuccessResponse_{indexesCreated-number}_ -> SuccessResponse__indexesCreated-number__

    preformattedName = replaceTypeLiteralPropertySeparators(preformattedName) // SuccessResponse_indexesCreated:number_ -> SuccessResponse_indexesCreated-number_
    preformattedName = preformattedName.replaceAll(';', '--')
    preformattedName = replaceIndexedAccessSegments(preformattedName) // Partial_SerializedDatasourceWithVersion[format]_ -> Partial_SerializedDatasourceWithVersion~format~_,

    //Safety fixes to replace all characters which are not accepted by swagger ui
    let formattedName = preformattedName.replaceAll(/[^A-Za-z0-9\-._]/g, match => {
      return `_${match.codePointAt(0) ?? 0}_`
    })
    formattedName = formattedName.replaceAll('92_r_92_n', '92_n') //Windows uses \r\n, but linux uses \n.

    return formattedName
  }

  private createCircularDependencyResolver(refName: string, refTypeName: string) {
    const referenceType = {
      dataType: 'refObject',
      refName: refTypeName,
    } as Tsoa.ReferenceType

    this.referenceTypeCache.inProgressTypes[refName].push(realReferenceType => {
      Object.assign(referenceType, realReferenceType)
    })
    return referenceType
  }

  private nodeIsUsable(node: ts.Node): node is UsableDeclarationWithoutPropertySignature {
    switch (node.kind) {
      case ts.SyntaxKind.InterfaceDeclaration:
      case ts.SyntaxKind.ClassDeclaration:
      case ts.SyntaxKind.TypeAliasDeclaration:
      case ts.SyntaxKind.EnumDeclaration:
      case ts.SyntaxKind.EnumMember:
        return true
      default:
        return false
    }
  }

  private getModelTypeDeclarations(type: ts.EntityName): UsableDeclarationWithoutPropertySignature[] {
    let typeName: string = type.kind === ts.SyntaxKind.Identifier ? type.text : type.right.text

    let symbol: ts.Symbol | undefined = this.getSymbolAtLocation(type)
    if (!symbol && type.kind === ts.SyntaxKind.QualifiedName) {
      const fullEnumSymbol = this.getSymbolAtLocation(type.left)
      symbol = fullEnumSymbol?.exports?.get(typeName as ts.__String)
    }

    // Handle built-in types that don't have declarations in user code
    if (!symbol?.getDeclarations) {
      return []
    }

    const declarations = symbol.getDeclarations()
    if (!declarations || declarations.length === 0) {
      return []
    }

    if ((symbol.escapedName as string) !== typeName && (symbol.escapedName as string) !== 'default') {
      typeName = symbol.escapedName as string
    }

    let modelTypes = declarations.filter((node): node is UsableDeclarationWithoutPropertySignature => {
      return this.nodeIsUsable(node) && node.name?.getText() === typeName
    })

    // If no usable model types found, return empty array instead of throwing
    if (modelTypes.length === 0) {
      return []
    }

    if (modelTypes.length > 1) {
      // remove types that are from typescript e.g. 'Account'
      modelTypes = modelTypes.filter(modelType => {
        return modelType.getSourceFile().fileName.replaceAll('\\', '/').toLowerCase().indexOf('node_modules/typescript') <= -1
      })

      modelTypes = this.getDesignatedModels(modelTypes, typeName)
    }

    return modelTypes
  }

  private getReferenceTypeFromTypeChecker(node: ts.TypeReferenceType, name: string, refTypeName: string): Tsoa.ReferenceType | undefined {
    const resolvedType = this.getResolvedTypeForReferenceNode(node)
    const declarationReferenceTypes = this.getReferenceTypesFromResolvedType(resolvedType, refTypeName)
    if (declarationReferenceTypes.length > 0) {
      return ReferenceTransformer.merge(declarationReferenceTypes)
    }

    const resolvedNode = this.current.typeChecker.typeToTypeNode(resolvedType, undefined, ts.NodeBuilderFlags.InTypeAlias | ts.NodeBuilderFlags.NoTruncation)
    if (!resolvedNode || this.isEquivalentReferenceTypeNode(node, resolvedNode, name)) {
      return undefined
    }

    const resolved = new TypeResolver(resolvedNode, this.current, this.parentNode, this.context, resolvedType).resolve()
    return this.wrapResolvedTypeAsReference(resolved, refTypeName)
  }

  private getResolvedTypeForReferenceNode(node: ts.TypeReferenceType): ts.Type {
    if (ts.isTypeReferenceNode(node)) {
      return this.current.typeChecker.getTypeFromTypeNode(node)
    }

    return this.current.typeChecker.getTypeAtLocation(node)
  }

  private getReferenceTypesFromResolvedType(resolvedType: ts.Type, refTypeName: string): Tsoa.ReferenceType[] {
    const symbols = [(resolvedType as ts.Type & { aliasSymbol?: ts.Symbol }).aliasSymbol, (resolvedType as ts.Type & { symbol?: ts.Symbol }).symbol].filter((symbol): symbol is ts.Symbol => !!symbol)

    const declarations = symbols.flatMap(symbol => this.getUsableDeclarationsFromSymbol(symbol))
    const uniqueDeclarations = declarations.filter((declaration, index, allDeclarations) => {
      return allDeclarations.indexOf(declaration) === index
    })

    return uniqueDeclarations.map(declaration => {
      if (ts.isTypeAliasDeclaration(declaration)) {
        return new ReferenceTransformer().transform(declaration, refTypeName, this, resolvedType)
      }
      if (EnumTransformer.transformable(declaration)) {
        return new EnumTransformer().transform(this, declaration, refTypeName)
      }
      return this.getModelReference(declaration, refTypeName)
    })
  }

  private getUsableDeclarationsFromSymbol(symbol: ts.Symbol): UsableDeclarationWithoutPropertySignature[] {
    const targetSymbol = this.hasFlag(symbol, ts.SymbolFlags.Alias) ? this.current.typeChecker.getAliasedSymbol(symbol) : symbol
    const declarations = targetSymbol?.getDeclarations?.() || []

    return declarations.filter((node): node is UsableDeclarationWithoutPropertySignature => this.nodeIsUsable(node))
  }

  private isEquivalentReferenceTypeNode(originalNode: ts.TypeReferenceType, resolvedNode: ts.TypeNode, originalName: string): boolean {
    if (!ts.isTypeReferenceNode(originalNode) || !ts.isTypeReferenceNode(resolvedNode)) {
      return false
    }

    return this.calcTypeName(resolvedNode) === originalName && resolvedNode.typeArguments?.length === originalNode.typeArguments?.length
  }

  private wrapResolvedTypeAsReference(type: Tsoa.Type, refTypeName: string): Tsoa.ReferenceType {
    if (type.dataType === 'refAlias' || type.dataType === 'refEnum' || type.dataType === 'refObject') {
      return {
        ...type,
        refName: refTypeName,
      }
    }

    return {
      dataType: 'refAlias',
      deprecated: false,
      refName: refTypeName,
      type,
      validators: {},
    }
  }

  private getSymbolAtLocation(type: ts.Node): ts.Symbol | undefined {
    const fallbackSymbol = (type as ts.Node & { symbol?: ts.Symbol }).symbol
    const symbol = this.current.typeChecker.getSymbolAtLocation(type) || fallbackSymbol
    // resolve alias if it is an alias, otherwise take symbol directly
    return (symbol && this.hasFlag(symbol, ts.SymbolFlags.Alias) && this.current.typeChecker.getAliasedSymbol(symbol)) || symbol
  }

  private getModelAdditionalProperties(node: UsableDeclaration) {
    if (node.kind === ts.SyntaxKind.InterfaceDeclaration) {
      const interfaceDeclaration = node
      const indexMember = interfaceDeclaration.members.find(member => member.kind === ts.SyntaxKind.IndexSignature)
      if (!indexMember) {
        return undefined
      }

      const indexSignatureDeclaration = indexMember as ts.IndexSignatureDeclaration
      const indexType = new TypeResolver(indexSignatureDeclaration.parameters[0].type as ts.TypeNode, this.current, this.parentNode, this.context).resolve()
      throwUnless(indexType.dataType === 'string', new GenerateMetadataError(`Only string indexers are supported.`, this.typeNode))

      return new TypeResolver(indexSignatureDeclaration.type, this.current, this.parentNode, this.context).resolve()
    }

    return undefined
  }

  private typeArgumentsToContext(type: ts.TypeReferenceNode | ts.ExpressionWithTypeArguments, targetEntity: ts.Node): Context {
    // Inline object types don't contribute generic declarations, so they map to an empty context.
    const typeParameters = this.getTypeParametersForTargetEntity(targetEntity)
    if (!typeParameters?.length) {
      return {}
    }

    let newContext: Context = {}
    for (let index = 0; index < typeParameters.length; index += 1) {
      const typeParameter = typeParameters[index]
      const resolvedType = this.resolveContextualTypeArgument(type, typeParameter, index)

      newContext = {
        ...newContext,
        [typeParameter.name.text]: {
          type: resolvedType.type,
          name: resolvedType.name || this.calcTypeName(resolvedType.type),
          resolvedType: resolvedType.resolvedType,
        },
      }
    }

    return newContext
  }

  private getTypeParametersForTargetEntity(targetEntity: ts.Node): ts.NodeArray<ts.TypeParameterDeclaration> | undefined {
    if (!this.current.typeChecker || (!ts.isIdentifier(targetEntity) && !ts.isQualifiedName(targetEntity))) {
      return undefined
    }

    const firstDeclaration = this.getModelTypeDeclarations(targetEntity)[0] as DeclarationWithTypeParameters | undefined
    return firstDeclaration?.typeParameters
  }

  private resolveContextualTypeArgument(type: ts.TypeReferenceNode | ts.ExpressionWithTypeArguments, typeParameter: ts.TypeParameterDeclaration, index: number): ResolvedContextualTypeArgument {
    const typeArgument = type.typeArguments?.[index]
    const contextualType = this.getForwardReferencedContextType(typeArgument)
    if (contextualType) {
      return contextualType
    }

    const resolvedType = typeArgument ?? typeParameter.default
    if (!resolvedType) {
      throw new GenerateMetadataError(`Could not find a value for type parameter ${typeParameter.name.text}`, type)
    }

    return {
      type: resolvedType,
      name: undefined,
      resolvedType: this.getResolvedTypeForContextTypeArgument(resolvedType, index),
    }
  }

  private getForwardReferencedContextType(typeArgument: ts.TypeNode | undefined): Context[string] | undefined {
    if (!typeArgument || !ts.isTypeReferenceNode(typeArgument) || !ts.isIdentifier(typeArgument.typeName)) {
      return undefined
    }

    return this.context[typeArgument.typeName.text]
  }

  private getResolvedTypeForContextTypeArgument(typeNode: ts.TypeNode, index: number): ts.Type | undefined {
    if (typeNode.pos === -1) {
      return this.getReferencerTypeArgument(index)
    }

    return this.current.typeChecker.getTypeFromTypeNode(typeNode)
  }

  private getReferencerTypeArgument(index: number): ts.Type | undefined {
    const referencer = this.referencer as ts.Type & {
      aliasTypeArguments?: readonly ts.Type[]
      typeArguments?: readonly ts.Type[]
    }

    return referencer?.aliasTypeArguments?.[index] ?? referencer?.typeArguments?.[index]
  }

  private getPromisedTypeOfReferencer(typeChecker: ts.TypeChecker): ts.Type | undefined {
    if (!this.referencer) {
      return undefined
    }

    const extendedTypeChecker = typeChecker as ts.TypeChecker & {
      getPromisedTypeOfPromise?: (type: ts.Type) => ts.Type | undefined
    }

    return extendedTypeChecker.getPromisedTypeOfPromise?.(this.referencer)
  }

  private normalizeTypeNodeFromBuilder(node: ts.Node | undefined): ts.TypeNode | undefined {
    if (!node) {
      return undefined
    }

    if (ts.isIdentifier(node) || ts.isQualifiedName(node)) {
      return ts.factory.createTypeReferenceNode(node, undefined)
    }

    return node as ts.TypeNode
  }

  private getReferenceAliasProperties(referenceType: Tsoa.RefAliasType): Tsoa.Property[] {
    let type: Tsoa.Type = referenceType
    while (type.dataType === 'refAlias') {
      type = type.type
    }

    if (type.dataType === 'refObject' || type.dataType === 'nestedObjectLiteral') {
      return type.properties
    }

    return []
  }

  private appendInheritedProperties(properties: Tsoa.Property[], referenceType: Tsoa.ReferenceType | undefined): Tsoa.Property[] {
    if (!referenceType || referenceType.dataType === 'refEnum') {
      return properties
    }

    if (referenceType.dataType === 'refAlias') {
      return [...properties, ...this.getReferenceAliasProperties(referenceType)]
    }

    if (referenceType.dataType === 'refObject') {
      return [...properties, ...(referenceType.properties ?? [])]
    }

    return assertNever(referenceType)
  }

  private getInheritedReferenceType(typeNode: ts.ExpressionWithTypeArguments): Tsoa.ReferenceType | undefined {
    if (!ts.isIdentifier(typeNode.expression) && !ts.isQualifiedName(typeNode.expression)) {
      return undefined
    }

    const resetContext = this.context
    this.context = this.typeArgumentsToContext(typeNode, typeNode.expression)

    try {
      return this.getReferenceType(typeNode, false)
    } catch (error) {
      if (error instanceof GenerateMetadataError) {
        return undefined
      }
      throw error
    } finally {
      this.context = resetContext
    }
  }

  private getModelInheritedProperties(modelTypeDeclaration: Exclude<UsableDeclaration, ts.PropertySignature | ts.TypeAliasDeclaration | ts.EnumMember>): Tsoa.Property[] {
    let properties: Tsoa.Property[] = []

    const heritageClauses = modelTypeDeclaration.heritageClauses
    if (!heritageClauses) {
      return properties
    }

    for (const clause of heritageClauses) {
      if (!clause.types) {
        continue
      }

      for (const t of clause.types) {
        properties = this.appendInheritedProperties(properties, this.getInheritedReferenceType(t))
      }
    }

    return properties
  }

  public getNodeDescription(node: UsableDeclaration | ts.PropertyDeclaration | ts.ParameterDeclaration | ts.EnumDeclaration) {
    const symbol = this.getSymbolAtLocation(node.name as ts.Node)
    if (!symbol) {
      return undefined
    }

    return getNodeDescription(node, symbol, this.current)
  }

  public getNodeFormat(node: ts.Node) {
    return getNodeFormat(node)
  }

  public getNodeTitle(node: ts.Node) {
    return getNodeTitle(node)
  }

  public getPropertyName(prop: ts.PropertySignature | ts.PropertyDeclaration | ts.ParameterDeclaration): string {
    if (ts.isComputedPropertyName(prop.name) && ts.isPropertyAccessExpression(prop.name.expression)) {
      const initializerValue = getInitializerValue(prop.name.expression, this.current.typeChecker)
      if (typeof initializerValue === 'string' || typeof initializerValue === 'number' || typeof initializerValue === 'boolean') {
        return `${initializerValue}`
      }

      return prop.name.expression.getText()
    }
    return (prop.name as ts.Identifier).text
  }

  public getNodeExample(node: ts.Node) {
    return getNodeExample(node, this.current)
  }

  public getNodeExtension(node: ts.Node) {
    const decorators = this.getDecoratorsByIdentifier(node, 'Extension')
    return getNodeExtension(node, decorators, this.current)
  }

  private getDecoratorsByIdentifier(node: ts.Node, id: string) {
    return getDecorators(node, (identifier, canonicalName) => canonicalName === id, this.current.typeChecker)
  }

  public static getDefault(node: ts.Node): unknown {
    return getDefaultValue(node)
  }
}
