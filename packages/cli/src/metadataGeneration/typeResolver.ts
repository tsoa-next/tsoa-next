import { assertNever, Tsoa } from '@tsoa-next/runtime'
import * as ts from 'typescript'
import { safeFromJson } from '../utils/jsonUtils'
import { getDecorators, getNodeFirstDecoratorValue, isDecorator } from './../utils/decoratorUtils'
import { getJSDocComment, getJSDocComments, getJSDocTagNames, isExistJSDocTag, symbolDisplayPartsToString } from './../utils/jsDocUtils'
import { getPropertyValidators } from './../utils/validatorUtils'
import { throwUnless } from '../utils/flowUtils'
import { GenerateMetadataError, GenerateMetaDataWarning } from './exceptions'
import { getExtensions, getExtensionsFromJSDocComments } from './extension'
import { getInitializerValue } from './initializer-value'
import { MetadataGenerator } from './metadataGenerator'

import { PrimitiveTransformer } from './transformer/primitiveTransformer'
import { DateTransformer } from './transformer/dateTransformer'
import { EnumTransformer } from './transformer/enumTransformer'
import { PropertyTransformer } from './transformer/propertyTransformer'
import { ReferenceTransformer } from './transformer/referenceTransformer'

const localReferenceTypeCache: { [typeName: string]: Tsoa.ReferenceType } = {}
const inProgressTypes: { [typeName: string]: Array<(realType: Tsoa.ReferenceType) => void> } = {}

type UsableDeclaration = ts.InterfaceDeclaration | ts.ClassDeclaration | ts.PropertySignature | ts.TypeAliasDeclaration | ts.EnumMember
type UsableDeclarationWithoutPropertySignature = Exclude<UsableDeclaration, ts.PropertySignature>
interface Context {
  [name: string]: {
    type: ts.TypeNode
    name: string
  }
}

type DeclarationWithTypeParameters = ts.Declaration & {
  typeParameters?: ts.NodeArray<ts.TypeParameterDeclaration>
}
type IoTsUtilityType = 'TypeOf' | 'Branded' | 'Brand'
type DefaultStringDelimiter = '"' | "'" | '`'

interface DefaultFormattingState {
  formatted: string
  textStartCharacter?: DefaultStringDelimiter
}

const escapedDoubleQuote = String.raw`\"`
const backslash = '\\'

const hasInitializer = (declaration: ts.Declaration): declaration is ts.Declaration & { initializer: ts.Expression } => 'initializer' in declaration && declaration.initializer !== undefined
const objectHasOwn = Object.hasOwn as (value: object, key: PropertyKey) => boolean

const getSyntheticOrigin = (symbol: ts.Symbol): ts.Symbol | undefined => {
  const symbolWithLinks = symbol as ts.Symbol & { links?: { syntheticOrigin?: ts.Symbol } }
  return symbolWithLinks.links?.syntheticOrigin
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

  public static clearCache() {
    Object.keys(localReferenceTypeCache).forEach(key => {
      delete localReferenceTypeCache[key]
    })

    Object.keys(inProgressTypes).forEach(key => {
      delete inProgressTypes[key]
    })
  }

  public resolve(): Tsoa.Type {
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
    if (!ts.isArrayTypeNode(this.typeNode)) {
      return undefined
    }

    return {
      dataType: 'array',
      elementType: new TypeResolver(this.typeNode.elementType, this.current, this.parentNode, this.context).resolve(),
    }
  }

  private resolveRestTypeNode(): Tsoa.Type | undefined {
    if (!ts.isRestTypeNode(this.typeNode)) {
      return undefined
    }

    return new TypeResolver(this.typeNode.type, this.current, this.parentNode, this.context).resolve()
  }

  private resolveUnionTypeNode(): Tsoa.Type | undefined {
    if (!ts.isUnionTypeNode(this.typeNode)) {
      return undefined
    }

    return {
      dataType: 'union',
      types: this.typeNode.types.map(type => new TypeResolver(type, this.current, this.parentNode, this.context).resolve()),
    }
  }

  private resolveIntersectionTypeNode(): Tsoa.Type | undefined {
    if (!ts.isIntersectionTypeNode(this.typeNode)) {
      return undefined
    }

    return {
      dataType: 'intersection',
      types: this.typeNode.types.filter(type => !this.isIoTsBrandMarker(type, this.current.typeChecker)).map(type => new TypeResolver(type, this.current, this.parentNode, this.context).resolve()),
    }
  }

  private resolveTupleTypeNode(): Tsoa.Type | undefined {
    if (!ts.isTupleTypeNode(this.typeNode)) {
      return undefined
    }

    const elementTypes: Tsoa.Type[] = []
    let restType: Tsoa.Type | undefined

    for (const element of this.typeNode.elements) {
      if (ts.isRestTypeNode(element)) {
        restType = this.resolveTupleRestTypeNode(element)
        continue
      }

      const typeNode = ts.isNamedTupleMember(element) ? element.type : element
      elementTypes.push(new TypeResolver(typeNode, this.current, element, this.context).resolve())
    }

    return {
      dataType: 'tuple',
      types: elementTypes,
      ...(restType ? { restType } : {}),
    }
  }

  private resolveTupleRestTypeNode(element: ts.RestTypeNode): Tsoa.Type {
    const resolvedRest = new TypeResolver(element.type, this.current, element, this.context).resolve()
    return resolvedRest.dataType === 'array' ? resolvedRest.elementType : resolvedRest
  }

  private resolveAnyOrUnknownTypeNode(): Tsoa.Type | undefined {
    if (this.typeNode.kind !== ts.SyntaxKind.AnyKeyword && this.typeNode.kind !== ts.SyntaxKind.UnknownKeyword) {
      return undefined
    }

    return { dataType: 'any' }
  }

  private resolveLiteralTypeNode(): Tsoa.Type | undefined {
    if (!ts.isLiteralTypeNode(this.typeNode)) {
      return undefined
    }

    return {
      dataType: 'enum',
      enums: [this.getLiteralValue(this.typeNode)],
    }
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

    return this.resolveMappedType(this.getReferencer(), this.typeNode)
  }

  private getOriginalMappedDeclaration(prop: ts.Symbol): ts.Declaration | undefined {
    const declaration = prop.declarations?.[0]
    if (declaration) {
      return declaration
    }

    const syntheticOrigin = getSyntheticOrigin(prop)
    if (syntheticOrigin?.name === prop.name) {
      // Otherwise loses jsDoc like in intellisense.
      return syntheticOrigin.declarations?.[0]
    }

    return undefined
  }

  private isIgnoredMappedProperty(prop: ts.Symbol): boolean {
    const declaration = this.getOriginalMappedDeclaration(prop)
    if (!declaration) {
      return false
    }

    const ignoredTargets = !ts.isPropertyDeclaration(declaration) && !ts.isPropertySignature(declaration) && !ts.isParameter(declaration)
    return getJSDocTagNames(declaration).includes('ignore') || ignoredTargets
  }

  private resolveMappedType(type: ts.Type, mappedTypeNode: ts.MappedTypeNode): Tsoa.Type {
    if (this.hasFlag(type, ts.TypeFlags.Union)) {
      return {
        dataType: 'union',
        types: (type as ts.UnionType).types.map(unionType => this.resolveMappedType(unionType, mappedTypeNode)),
      }
    }

    if (this.hasFlag(type, ts.TypeFlags.Undefined)) {
      return { dataType: 'undefined' }
    }

    if (this.hasFlag(type, ts.TypeFlags.Null)) {
      return {
        dataType: 'enum',
        enums: [null],
      }
    }

    if (this.hasFlag(type, ts.TypeFlags.Object)) {
      return this.resolveMappedObjectType(type, mappedTypeNode)
    }

    // Known issues & easy to implement: Partial<string>, Partial<never>, ...
    throw new GenerateMetadataError(`Unhandled mapped type has found, flags: ${type.flags}`, this.typeNode)
  }

  private resolveMappedObjectType(type: ts.Type, mappedTypeNode: ts.MappedTypeNode): Tsoa.NestedObjectLiteralType {
    const properties = type
      .getProperties()
      .filter(property => !this.isIgnoredMappedProperty(property))
      .map(property => this.resolveMappedProperty(property))

    const objectLiteral: Tsoa.NestedObjectLiteralType = {
      dataType: 'nestedObjectLiteral',
      properties,
    }

    const indexTypes = this.resolveMappedIndexTypes(type, mappedTypeNode)
    if (indexTypes.length === 1) {
      objectLiteral.additionalProperties = indexTypes[0]
    } else if (indexTypes.length > 1) {
      objectLiteral.additionalProperties = {
        dataType: 'union',
        types: indexTypes,
      }
    }

    return objectLiteral
  }

  private resolveMappedProperty(property: ts.Symbol): Tsoa.Property {
    const propertyType = this.current.typeChecker.getTypeOfSymbolAtLocation(property, this.typeNode)
    const typeNode = this.current.typeChecker.typeToTypeNode(propertyType, undefined, ts.NodeBuilderFlags.NoTruncation)!
    const parent = this.getOriginalMappedDeclaration(property)
    const comments = property.getDocumentationComment(this.current.typeChecker)

    return {
      name: property.getName(),
      required: !this.hasFlag(property, ts.SymbolFlags.Optional),
      deprecated: this.isDeprecatedMappedProperty(parent),
      type: new TypeResolver(typeNode, this.current, parent, this.context, propertyType).resolve(),
      default: this.getMappedPropertyDefault(parent),
      validators: (parent ? getPropertyValidators(parent) : {}) || {},
      description: symbolDisplayPartsToString(comments),
      format: parent ? this.getNodeFormat(parent) : undefined,
      example: parent ? this.getNodeExample(parent) : undefined,
      extensions: parent ? this.getNodeExtension(parent) : undefined,
    }
  }

  private isDeprecatedMappedProperty(parent: ts.Declaration | undefined): boolean {
    if (!parent) {
      return false
    }

    return isExistJSDocTag(parent, tag => tag.tagName.text === 'deprecated') || isDecorator(parent, (_identifier, canonicalName) => canonicalName === 'Deprecated', this.current.typeChecker)
  }

  private getMappedPropertyDefault(parent: ts.Declaration | undefined): unknown {
    if (!parent) {
      return undefined
    }

    if (hasInitializer(parent)) {
      return getInitializerValue(parent.initializer, this.current.typeChecker)
    }

    return TypeResolver.getDefault(parent)
  }

  private resolveMappedIndexTypes(type: ts.Type, mappedTypeNode: ts.MappedTypeNode): Tsoa.Type[] {
    return this.current.typeChecker.getIndexInfosOfType(type).flatMap(indexInfo => {
      const typeNode = this.current.typeChecker.typeToTypeNode(indexInfo.type, undefined, ts.NodeBuilderFlags.NoTruncation)!
      if (typeNode.kind === ts.SyntaxKind.NeverKeyword) {
        return []
      }

      return [new TypeResolver(typeNode, this.current, mappedTypeNode, this.context, indexInfo.type).resolve()]
    })
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
    const type = typeChecker.getTypeFromTypeNode(typeNode)
    const indexedType = this.resolveKeyOfIndexType(type, typeNode, current, context, parentNode)
    if (indexedType) {
      return indexedType
    }

    if (type.isUnion()) {
      return this.resolveKeyOfUnionType(type, typeNode, typeChecker)
    }

    if (type.isLiteral()) {
      return this.resolveKeyOfLiteralType(type, typeNode, typeChecker)
    }

    return this.resolveFallbackKeyOfType(type, typeNode, typeChecker)
  }

  private resolveKeyOfIndexType(type: ts.Type, typeNode: ts.TypeOperatorNode, current: MetadataGenerator, context: Context, parentNode?: ts.Node): Tsoa.Type | undefined {
    if (!type.isIndexType()) {
      return undefined
    }

    const symbol = type.type.getSymbol()
    if (!symbol || (symbol.getFlags() & ts.TypeFlags.TypeParameter) === 0) {
      return undefined
    }

    const typeName = symbol.getEscapedName()
    throwUnless(typeof typeName === 'string', new GenerateMetadataError(`typeName is not string, but ${typeof typeName}`, typeNode))
    const contextualType = context[typeName]
    if (!contextualType) {
      return undefined
    }

    const subResult = new TypeResolver(contextualType.type, current, parentNode, context).resolve()
    if (subResult.dataType === 'any') {
      return this.createStringAndNumberUnion()
    }

    const properties = (subResult as Tsoa.RefObjectType).properties?.map(property => property.name)
    throwUnless(properties, new GenerateMetadataError(`TypeOperator 'keyof' on node which have no properties`, contextualType.type))

    return {
      dataType: 'enum',
      enums: properties,
    }
  }

  private resolveKeyOfUnionType(type: ts.UnionType, typeNode: ts.TypeOperatorNode, typeChecker: ts.TypeChecker): Tsoa.Type {
    const literals = type.types.filter((member): member is ts.LiteralType => member.isLiteral())
    if (!literals.length) {
      return this.resolveNonLiteralKeyOfUnionType(type, typeNode, typeChecker)
    }

    this.warnOnSkippedNonLiteralKeyTypes(type, typeNode, typeChecker)
    return this.createLiteralKeyOfUnionType(literals, typeNode, typeChecker)
  }

  private resolveNonLiteralKeyOfUnionType(type: ts.UnionType, typeNode: ts.TypeOperatorNode, typeChecker: ts.TypeChecker): Tsoa.Type {
    const typeFlags = new Set(type.types.map(member => member.flags))
    const includesString = typeFlags.has(ts.TypeFlags.String)
    const includesNumber = typeFlags.has(ts.TypeFlags.Number)
    const includesSymbol = typeFlags.has(ts.TypeFlags.ESSymbol)

    if (includesString && includesNumber && (type.types.length === 2 || (type.types.length === 3 && includesSymbol))) {
      return this.createStringAndNumberUnion()
    }

    this.warnOnSkippedNonLiteralKeyTypes(type, typeNode, typeChecker)
    return { dataType: 'enum', enums: [] }
  }

  private warnOnSkippedNonLiteralKeyTypes(type: ts.UnionType, typeNode: ts.TypeOperatorNode, typeChecker: ts.TypeChecker) {
    const nonLiteralTypes = type.types.filter(member => !member.isLiteral())
    if (!nonLiteralTypes.length) {
      return
    }

    const problems = nonLiteralTypes.map(member => typeChecker.typeToString(member))
    console.warn(new GenerateMetaDataWarning(`Skipped non-literal type(s) ${problems.join(', ')}`, typeNode).toString())
  }

  private createLiteralKeyOfUnionType(literals: ts.LiteralType[], typeNode: ts.TypeOperatorNode, typeChecker: ts.TypeChecker): Tsoa.Type {
    const literalValues = literals.map(literal => this.getKeyLiteralValue(literal, typeNode, typeChecker))
    const stringMembers = literalValues.filter((value): value is string => typeof value === 'string')
    const numberMembers = literalValues.filter((value): value is number => typeof value === 'number')

    if (stringMembers.length && numberMembers.length) {
      return {
        dataType: 'union',
        types: [
          { dataType: 'enum', enums: stringMembers },
          { dataType: 'enum', enums: numberMembers },
        ],
      }
    }

    return {
      dataType: 'enum',
      enums: literalValues,
    }
  }

  private getKeyLiteralValue(literal: ts.LiteralType, typeNode: ts.TypeOperatorNode, typeChecker: ts.TypeChecker): string | number {
    throwUnless(
      typeof literal.value === 'number' || typeof literal.value === 'string',
      new GenerateMetadataError(`Not handled key Type, maybe ts.PseudoBigInt ${typeChecker.typeToString(literal)}`, typeNode),
    )

    return literal.value
  }

  private resolveKeyOfLiteralType(type: ts.LiteralType, typeNode: ts.TypeOperatorNode, typeChecker: ts.TypeChecker): Tsoa.Type {
    throwUnless(typeof type.value === 'number' || typeof type.value === 'string', new GenerateMetadataError(`Not handled indexType, maybe ts.PseudoBigInt ${typeChecker.typeToString(type)}`, typeNode))

    return {
      dataType: 'enum',
      enums: [type.value],
    }
  }

  private resolveFallbackKeyOfType(type: ts.Type, typeNode: ts.TypeOperatorNode, typeChecker: ts.TypeChecker): Tsoa.Type {
    if (this.hasFlag(type, ts.TypeFlags.Never)) {
      throw new GenerateMetadataError(`TypeOperator 'keyof' on node produced a never type`, typeNode)
    }

    if (this.hasFlag(type, ts.TypeFlags.TemplateLiteral)) {
      console.warn(new GenerateMetaDataWarning(`Template literals are assumed as strings`, typeNode).toString())
      return { dataType: 'string' }
    }

    if (this.hasFlag(type, ts.TypeFlags.Number)) {
      return { dataType: 'double' }
    }

    const indexedTypeName = typeChecker.typeToString(typeChecker.getTypeFromTypeNode(typeNode.type))
    throw new GenerateMetadataError(`Could not determine the keys on ${indexedTypeName}`, typeNode)
  }

  private createStringAndNumberUnion(): Tsoa.UnionType {
    return {
      dataType: 'union',
      types: [{ dataType: 'string' }, { dataType: 'double' }],
    }
  }

  private resolveIndexedAccessTypeNode(typeNode: ts.IndexedAccessTypeNode, typeChecker: ts.TypeChecker, current: MetadataGenerator, context: Context): Tsoa.Type {
    const { indexType, objectType } = typeNode

    if ([ts.SyntaxKind.NumberKeyword, ts.SyntaxKind.StringKeyword].includes(indexType.kind)) {
      return this.resolveIndexedAccessKeywordType(typeNode, typeChecker, current, context, objectType, indexType)
    }

    if (ts.isLiteralTypeNode(indexType) && (ts.isStringLiteral(indexType.literal) || ts.isNumericLiteral(indexType.literal))) {
      return this.resolveIndexedAccessLiteralType(typeNode, typeChecker, current, context, objectType, indexType)
    }

    if (ts.isTypeOperatorNode(indexType) && indexType.operator === ts.SyntaxKind.KeyOfKeyword) {
      const keyedIndexedAccessType = this.resolveKeyedIndexedAccessType(typeNode, typeChecker, current, context, objectType, indexType)
      if (keyedIndexedAccessType) {
        return keyedIndexedAccessType
      }
    }

    throw new GenerateMetadataError(`Unknown type: ${ts.SyntaxKind[typeNode.kind]}`, typeNode)
  }

  private resolveIndexedAccessKeywordType(
    typeNode: ts.IndexedAccessTypeNode,
    typeChecker: ts.TypeChecker,
    current: MetadataGenerator,
    context: Context,
    objectType: ts.TypeNode,
    indexType: ts.TypeNode,
  ): Tsoa.Type {
    const isNumberIndexType = indexType.kind === ts.SyntaxKind.NumberKeyword
    const typeOfObjectType = typeChecker.getTypeFromTypeNode(objectType)
    const indexedType = isNumberIndexType ? typeOfObjectType.getNumberIndexType() : typeOfObjectType.getStringIndexType()
    throwUnless(indexedType, new GenerateMetadataError(`Could not determine ${isNumberIndexType ? 'number' : 'string'} index on ${typeChecker.typeToString(typeOfObjectType)}`, typeNode))

    return new TypeResolver(typeChecker.typeToTypeNode(indexedType, objectType, ts.NodeBuilderFlags.NoTruncation)!, current, typeNode, context).resolve()
  }

  private resolveIndexedAccessLiteralType(
    typeNode: ts.IndexedAccessTypeNode,
    typeChecker: ts.TypeChecker,
    current: MetadataGenerator,
    context: Context,
    objectType: ts.TypeNode,
    indexType: ts.LiteralTypeNode,
  ): Tsoa.Type {
    const propertyName = ts.isStringLiteral(indexType.literal) || ts.isNumericLiteral(indexType.literal) ? indexType.literal.text : indexType.literal.getText()
    const symbol = typeChecker.getPropertyOfType(typeChecker.getTypeFromTypeNode(objectType), propertyName)
    throwUnless(symbol, new GenerateMetadataError(`Could not determine the keys on ${typeChecker.typeToString(typeChecker.getTypeFromTypeNode(objectType))}`, typeNode))

    if (this.symbolHasTypeDeclaration(symbol.valueDeclaration)) {
      return new TypeResolver(symbol.valueDeclaration.type, current, typeNode, context).resolve()
    }

    const declarationType = typeChecker.getTypeOfSymbolAtLocation(symbol, objectType)
    try {
      return new TypeResolver(typeChecker.typeToTypeNode(declarationType, objectType, ts.NodeBuilderFlags.NoTruncation)!, current, typeNode, context).resolve()
    } catch {
      const typeNodeForError = typeChecker.typeToTypeNode(declarationType, undefined, ts.NodeBuilderFlags.NoTruncation)!
      const typeName = typeChecker.typeToString(typeChecker.getTypeFromTypeNode(typeNodeForError))
      throw new GenerateMetadataError(`Could not determine the keys on ${typeName}`, typeNode)
    }
  }

  private symbolHasTypeDeclaration(node: ts.Node | undefined): node is ts.HasType & { type: ts.TypeNode } {
    return node !== undefined && objectHasOwn(node, 'type') && (node as ts.HasType).type !== undefined
  }

  private resolveKeyedIndexedAccessType(
    typeNode: ts.IndexedAccessTypeNode,
    typeChecker: ts.TypeChecker,
    current: MetadataGenerator,
    context: Context,
    objectType: ts.TypeNode,
    indexType: ts.TypeOperatorNode,
  ): Tsoa.Type | undefined {
    const typeOfObjectType = ts.isParenthesizedTypeNode(objectType) ? objectType.type : objectType
    const typeOfIndexType = indexType.type
    const isSameTypeQuery = ts.isTypeQueryNode(typeOfObjectType) && ts.isTypeQueryNode(typeOfIndexType) && typeOfObjectType.exprName.getText() === typeOfIndexType.exprName.getText()
    const isSameTypeReference = ts.isTypeReferenceNode(typeOfObjectType) && ts.isTypeReferenceNode(typeOfIndexType) && typeOfObjectType.typeName.getText() === typeOfIndexType.typeName.getText()

    if (!isSameTypeQuery && !isSameTypeReference) {
      return undefined
    }

    const type = this.getReferencer()
    const node = typeChecker.typeToTypeNode(type, undefined, ts.NodeBuilderFlags.InTypeAlias | ts.NodeBuilderFlags.NoTruncation)!
    return new TypeResolver(node, current, typeNode, context, this.referencer).resolve()
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
      const decodedNode = current.typeChecker.typeToTypeNode(decodedType, undefined, ts.NodeBuilderFlags.InTypeAlias | ts.NodeBuilderFlags.NoTruncation)
      if (decodedNode) {
        return new TypeResolver(decodedNode, current, parentNode, context, decodedType).resolve()
      }
    }

    const resolvedType = current.typeChecker.getTypeFromTypeNode(typeNode)
    const resolvedNode = current.typeChecker.typeToTypeNode(resolvedType, undefined, ts.NodeBuilderFlags.InTypeAlias | ts.NodeBuilderFlags.NoTruncation)
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
          return new TypeResolver(typeArguments[0], current, parentNode, context).resolve()
        }
        return undefined
      case 'String':
        return { dataType: 'string' }
      default:
        if (context[typeName]) {
          return new TypeResolver(context[typeName].type, current, parentNode, context).resolve()
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

    visited.add(symbol)

    if ((symbol.flags & ts.SymbolFlags.Alias) !== 0) {
      const aliasedSymbol = typeChecker.getAliasedSymbol(symbol)
      const aliasedType = this.getIoTsUtilityTypeFromSymbol(aliasedSymbol, typeChecker, visited)
      if (aliasedType) {
        return aliasedType
      }
    }

    const symbolName = symbol.getName()
    if ((symbolName === 'TypeOf' || symbolName === 'Branded' || symbolName === 'Brand') && this.symbolComesFromModule(symbol, typeChecker, 'io-ts')) {
      return symbolName
    }

    return undefined
  }

  private symbolComesFromModule(symbol: ts.Symbol, typeChecker: ts.TypeChecker, moduleName: string, visited: Set<ts.Symbol> = new Set()): boolean {
    if (visited.has(symbol)) {
      return false
    }

    visited.add(symbol)

    const declarations = symbol.declarations || (symbol.valueDeclaration ? [symbol.valueDeclaration] : [])
    for (const declaration of declarations) {
      let current: ts.Node | undefined = declaration.parent
      while (current && !ts.isImportDeclaration(current)) {
        current = current.parent
      }

      if (current && ts.isImportDeclaration(current) && ts.isStringLiteral(current.moduleSpecifier) && current.moduleSpecifier.text === moduleName) {
        return true
      }

      const fileName = declaration.getSourceFile().fileName.replaceAll('\\', '/')
      if (fileName.includes(`/node_modules/${moduleName}/`)) {
        return true
      }
    }

    if ((symbol.flags & ts.SymbolFlags.Alias) !== 0) {
      const aliasedSymbol = typeChecker.getAliasedSymbol(symbol)
      if (aliasedSymbol !== symbol) {
        return this.symbolComesFromModule(aliasedSymbol, typeChecker, moduleName, visited)
      }
    }

    return false
  }

  private getLiteralValue(typeNode: ts.LiteralTypeNode): string | number | boolean | null {
    switch (typeNode.literal.kind) {
      case ts.SyntaxKind.TrueKeyword:
        return true
      case ts.SyntaxKind.FalseKeyword:
        return false
      case ts.SyntaxKind.StringLiteral:
        return typeNode.literal.text
      case ts.SyntaxKind.NumericLiteral:
        return Number.parseFloat(typeNode.literal.text)
      case ts.SyntaxKind.PrefixUnaryExpression:
        // make sure to only handle the MinusToken here
        throwUnless((typeNode.literal as ts.PrefixUnaryExpression).operator === ts.SyntaxKind.MinusToken, new GenerateMetadataError(`Couldn't resolve literal node: ${typeNode.literal.getText()}`))
        return Number.parseFloat(typeNode.literal.getText())
      case ts.SyntaxKind.NullKeyword:
        return null
      default:
        throwUnless(objectHasOwn(typeNode.literal, 'text'), new GenerateMetadataError(`Couldn't resolve literal node: ${typeNode.literal.getText()}`))
        return typeNode.literal.text
    }
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
    return typeName
      .replaceAll(/[^A-Za-z0-9]/g, '_')
      .replaceAll(/_+/g, '_')
      .replaceAll(/^_+|_+$/g, '')
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
    const isDeprecated = isExistJSDocTag(arg, tag => tag.tagName.text === 'deprecated') || isDecorator(arg, (_identifier, canonicalName) => canonicalName === 'Deprecated', this.current.typeChecker)

    const symbol = this.getSymbolAtLocation(arg.name as ts.Node)
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

    const literalValue = this.getLiteralValue(arg)
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
      const existingType = localReferenceTypeCache[name]
      if (existingType) {
        return existingType
      }

      if (inProgressTypes[name]) {
        return this.createCircularDependencyResolver(name, refTypeName)
      }

      inProgressTypes[name] = []

      const declarations = this.getModelTypeDeclarations(type)
      if (!declarations.length) {
        return this.resolveReferenceTypeFallback(node, name, refTypeName)
      }

      const referenceType = ReferenceTransformer.merge(declarations.map(declaration => this.resolveDeclarationReferenceType(declaration, node, refTypeName)))
      this.addToLocalReferenceTypeCache(name, referenceType)
      return referenceType
    } catch (error) {
      delete inProgressTypes[name]
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
    if (inProgressTypes[name]) {
      for (const fn of inProgressTypes[name]) {
        fn(refType)
      }
    }
    localReferenceTypeCache[name] = refType

    delete inProgressTypes[name]
  }

  private getModelReference(modelType: ts.InterfaceDeclaration | ts.ClassDeclaration, refTypeName: string) {
    const example = this.getNodeExample(modelType)
    const description = this.getNodeDescription(modelType)
    const deprecated =
      isExistJSDocTag(modelType, tag => tag.tagName.text === 'deprecated') || isDecorator(modelType, (_identifier, canonicalName) => canonicalName === 'Deprecated', this.current.typeChecker)
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
        nodeType = this.current.typeChecker.typeToTypeNode(implicitType, undefined, ts.NodeBuilderFlags.NoTruncation) as ts.TypeNode
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

    inProgressTypes[refName].push(realReferenceType => {
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
    let newContext: Context = {}

    // Inline object types don't contribute generic declarations, so they map to an empty context.
    if (!this.current.typeChecker) {
      return newContext
    }

    if (!ts.isIdentifier(targetEntity) && !ts.isQualifiedName(targetEntity)) {
      return newContext
    }

    const declarations = this.getModelTypeDeclarations(targetEntity)

    const firstDeclaration = declarations[0] as DeclarationWithTypeParameters | undefined
    const typeParameters = firstDeclaration?.typeParameters

    if (typeParameters) {
      for (let index = 0; index < typeParameters.length; index++) {
        const typeParameter = typeParameters[index]
        const typeArg = type.typeArguments?.[index]
        let resolvedType: ts.TypeNode
        let name: string | undefined
        // Argument may be a forward reference from context
        if (typeArg && ts.isTypeReferenceNode(typeArg) && ts.isIdentifier(typeArg.typeName) && this.context[typeArg.typeName.text]) {
          resolvedType = this.context[typeArg.typeName.text].type
          name = this.context[typeArg.typeName.text].name
        } else if (typeArg) {
          resolvedType = typeArg
        } else if (typeParameter.default) {
          resolvedType = typeParameter.default
        } else {
          throw new GenerateMetadataError(`Could not find a value for type parameter ${typeParameter.name.text}`, type)
        }

        newContext = {
          ...newContext,
          [typeParameter.name.text]: {
            type: resolvedType,
            name: name || this.calcTypeName(resolvedType),
          },
        }
      }
    }
    return newContext
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

    /**
     * Workaround for a TypeScript compiler quirk tracked for follow-up investigation.
     * See https://github.com/tsoa-next/tsoa-next/issues for related metadata parsing context.
     */
    if (node.kind === ts.SyntaxKind.Parameter) {
      // TypeScript won't parse jsdoc if the flag is 4, i.e. 'Property'
      symbol.flags = 0
    }

    const comments = symbol.getDocumentationComment(this.current.typeChecker)
    if (comments.length) {
      return symbolDisplayPartsToString(comments)
    }

    return undefined
  }

  public getNodeFormat(node: ts.Node) {
    return getJSDocComment(node, 'format')
  }

  public getNodeTitle(node: ts.Node) {
    return getJSDocComment(node, 'title')
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
    const exampleJSDoc = getJSDocComment(node, 'example')
    if (exampleJSDoc) {
      return safeFromJson(exampleJSDoc)
    }

    return getNodeFirstDecoratorValue(node, this.current.typeChecker, (_dec, canonicalName) => canonicalName === 'Example')
  }

  public getNodeExtension(node: ts.Node) {
    const decorators = this.getDecoratorsByIdentifier(node, 'Extension')
    const extensionDecorator = getExtensions(decorators, this.current)

    const extensionComments = getJSDocComments(node, 'extension')
    const extensionJSDoc = extensionComments ? getExtensionsFromJSDocComments(extensionComments) : []

    return extensionDecorator.concat(extensionJSDoc)
  }

  private getDecoratorsByIdentifier(node: ts.Node, id: string) {
    return getDecorators(node, (_identifier, canonicalName) => canonicalName === id, this.current.typeChecker)
  }

  public static getDefault(node: ts.Node): unknown {
    const defaultStr = getJSDocComment(node, 'default')
    if (typeof defaultStr !== 'string' || defaultStr === 'undefined') {
      return undefined
    }

    const formattedStr = this.formatDefaultString(defaultStr)
    try {
      return JSON.parse(formattedStr) as unknown
    } catch (error) {
      const message = error instanceof Error ? error.message : '-'
      throw new GenerateMetadataError(`JSON could not parse default str: "${defaultStr}", preformatted: "${formattedStr}"\nmessage: "${message}"`)
    }
  }

  private static formatDefaultString(defaultStr: string): string {
    const initialState: DefaultFormattingState = { formatted: '' }
    let state = initialState
    let index = 0

    while (index < defaultStr.length) {
      const formattedCharacter = this.formatDefaultCharacter(defaultStr, index, state)
      state = {
        formatted: formattedCharacter.formatted,
        textStartCharacter: formattedCharacter.textStartCharacter,
      }
      index = formattedCharacter.index + 1
    }

    return state.formatted
  }

  private static formatDefaultCharacter(defaultStr: string, index: number, state: DefaultFormattingState): DefaultFormattingState & { index: number } {
    const character = defaultStr[index]
    if (state.textStartCharacter !== undefined) {
      return this.formatDefaultStringCharacter(defaultStr, index, state, character)
    }

    return this.formatDefaultNonStringCharacter(defaultStr, index, state, character)
  }

  private static formatDefaultStringCharacter(defaultStr: string, index: number, state: DefaultFormattingState, character: string): DefaultFormattingState & { index: number } {
    if (character === state.textStartCharacter) {
      return {
        formatted: `${state.formatted}"`,
        index,
      }
    }

    if (character === '"') {
      return {
        ...state,
        formatted: `${state.formatted}${escapedDoubleQuote}`,
        index,
      }
    }

    if (character !== backslash) {
      return {
        ...state,
        formatted: `${state.formatted}${character}`,
        index,
      }
    }

    return this.formatEscapedDefaultCharacter(defaultStr, index, state)
  }

  private static formatEscapedDefaultCharacter(defaultStr: string, index: number, state: DefaultFormattingState): DefaultFormattingState & { index: number } {
    const nextIndex = index + 1
    if (nextIndex >= defaultStr.length) {
      return {
        ...state,
        formatted: `${state.formatted}${backslash}`,
        index,
      }
    }

    const nextCharacter = defaultStr[nextIndex]
    if (['n', 't', 'r', 'b', 'f', backslash, '"'].includes(nextCharacter)) {
      return {
        ...state,
        formatted: `${state.formatted}${backslash}${nextCharacter}`,
        index: nextIndex,
      }
    }

    if (!['v', '0'].includes(nextCharacter)) {
      return {
        ...state,
        formatted: `${state.formatted}${nextCharacter}`,
        index: nextIndex,
      }
    }

    return {
      ...state,
      index: nextIndex,
    }
  }

  private static formatDefaultNonStringCharacter(defaultStr: string, index: number, state: DefaultFormattingState, character: string): DefaultFormattingState & { index: number } {
    if (this.isDefaultStringDelimiter(character)) {
      return {
        formatted: `${state.formatted}"`,
        textStartCharacter: character,
        index,
      }
    }

    if (this.startsDefaultLineComment(defaultStr, index)) {
      return this.skipDefaultLineComment(defaultStr, index, state)
    }

    return {
      ...state,
      formatted: `${state.formatted}${character}`,
      index,
    }
  }

  private static isDefaultStringDelimiter(character: string): character is DefaultStringDelimiter {
    return character === '"' || character === "'" || character === '`'
  }

  private static startsDefaultLineComment(defaultStr: string, index: number): boolean {
    return defaultStr[index] === '/' && defaultStr[index + 1] === '/'
  }

  private static skipDefaultLineComment(defaultStr: string, index: number, state: DefaultFormattingState): DefaultFormattingState & { index: number } {
    let nextIndex = index + 2
    while (nextIndex < defaultStr.length && defaultStr[nextIndex] !== '\n') {
      nextIndex += 1
    }

    return {
      ...state,
      index: nextIndex,
    }
  }
}
