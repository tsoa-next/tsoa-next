import { Tsoa } from '@tsoa-next/runtime'
import * as ts from 'typescript'
import type { MetadataGenerator } from './metadataGenerator'
import type { Context, TypeResolver } from './typeResolver'
import { GenerateMetadataError, GenerateMetaDataWarning } from './exceptions'
import { throwUnless } from '../utils/flowUtils'

function hasFlag(type: ts.Type, flag: ts.TypeFlags) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison
  return (type.flags & flag) === flag
}

export function resolveKeyOfTypeOperator(
  typeNode: ts.TypeOperatorNode,
  typeChecker: ts.TypeChecker,
  current: MetadataGenerator,
  context: Context,
  parentNode: ts.Node | undefined,
  Resolver: typeof TypeResolver,
): Tsoa.Type {
  const type = typeChecker.getTypeFromTypeNode(typeNode)
  const indexedType = resolveKeyOfIndexType(type, typeNode, current, context, parentNode, Resolver)
  if (indexedType) {
    return indexedType
  }

  if (type.isUnion()) {
    return resolveKeyOfUnionType(type, typeNode, typeChecker)
  }

  if (type.isLiteral()) {
    return resolveKeyOfLiteralType(type, typeNode, typeChecker)
  }

  return resolveFallbackKeyOfType(type, typeNode, typeChecker)
}

export function resolveKeyOfIndexType(
  type: ts.Type,
  typeNode: ts.TypeOperatorNode,
  current: MetadataGenerator,
  context: Context,
  parentNode: ts.Node | undefined,
  Resolver: typeof TypeResolver,
): Tsoa.Type | undefined {
  if (!type.isIndexType()) {
    return undefined
  }

  const symbol = type.type.getSymbol()
  if (!symbol || !hasFlag(type.type, ts.TypeFlags.TypeParameter)) {
    return undefined
  }

  const typeName = symbol.getEscapedName()
  throwUnless(typeof typeName === 'string', new GenerateMetadataError(`typeName is not string, but ${typeof typeName}`, typeNode))
  const contextualType = context[typeName]
  if (!contextualType) {
    return undefined
  }

  const subResult = new Resolver(contextualType.type, current, parentNode, context, contextualType.resolvedType).resolve()
  if (subResult.dataType === 'any') {
    return createStringAndNumberUnion()
  }

  const properties = (subResult as Tsoa.RefObjectType).properties?.map(property => property.name)
  throwUnless(properties, new GenerateMetadataError(`TypeOperator 'keyof' on node which have no properties`, contextualType.type))

  return {
    dataType: 'enum',
    enums: properties,
  }
}

function resolveKeyOfUnionType(type: ts.UnionType, typeNode: ts.TypeOperatorNode, typeChecker: ts.TypeChecker): Tsoa.Type {
  const literals = type.types.filter((member): member is ts.LiteralType => member.isLiteral())
  if (!literals.length) {
    return resolveNonLiteralKeyOfUnionType(type, typeNode, typeChecker)
  }

  warnOnSkippedNonLiteralKeyTypes(type, typeNode, typeChecker)
  return createLiteralKeyOfUnionType(literals, typeNode, typeChecker)
}

function resolveNonLiteralKeyOfUnionType(type: ts.UnionType, typeNode: ts.TypeOperatorNode, typeChecker: ts.TypeChecker): Tsoa.Type {
  const typeFlags = new Set(type.types.map(member => member.flags))
  const includesString = typeFlags.has(ts.TypeFlags.String)
  const includesNumber = typeFlags.has(ts.TypeFlags.Number)
  const includesSymbol = typeFlags.has(ts.TypeFlags.ESSymbol)

  if (includesString && includesNumber && (type.types.length === 2 || (type.types.length === 3 && includesSymbol))) {
    return createStringAndNumberUnion()
  }

  warnOnSkippedNonLiteralKeyTypes(type, typeNode, typeChecker)
  return { dataType: 'enum', enums: [] }
}

function warnOnSkippedNonLiteralKeyTypes(type: ts.UnionType, typeNode: ts.TypeOperatorNode, typeChecker: ts.TypeChecker) {
  const nonLiteralTypes = type.types.filter(member => !member.isLiteral())
  if (!nonLiteralTypes.length) {
    return
  }

  const problems = nonLiteralTypes.map(member => typeChecker.typeToString(member))
  console.warn(new GenerateMetaDataWarning(`Skipped non-literal type(s) ${problems.join(', ')}`, typeNode).toString())
}

function createLiteralKeyOfUnionType(literals: ts.LiteralType[], typeNode: ts.TypeOperatorNode, typeChecker: ts.TypeChecker): Tsoa.Type {
  const literalValues = literals.map(literal => getKeyLiteralValue(literal, typeNode, typeChecker))
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

function getKeyLiteralValue(literal: ts.LiteralType, typeNode: ts.TypeOperatorNode, typeChecker: ts.TypeChecker): string | number {
  throwUnless(
    typeof literal.value === 'number' || typeof literal.value === 'string',
    new GenerateMetadataError(`Not handled key Type, maybe ts.PseudoBigInt ${typeChecker.typeToString(literal)}`, typeNode),
  )

  return literal.value
}

function resolveKeyOfLiteralType(type: ts.LiteralType, typeNode: ts.TypeOperatorNode, typeChecker: ts.TypeChecker): Tsoa.Type {
  throwUnless(typeof type.value === 'number' || typeof type.value === 'string', new GenerateMetadataError(`Not handled indexType, maybe ts.PseudoBigInt ${typeChecker.typeToString(type)}`, typeNode))

  return {
    dataType: 'enum',
    enums: [type.value],
  }
}

export function resolveFallbackKeyOfType(type: ts.Type, typeNode: ts.TypeOperatorNode, typeChecker: ts.TypeChecker): Tsoa.Type {
  if (hasFlag(type, ts.TypeFlags.Never)) {
    throw new GenerateMetadataError(`TypeOperator 'keyof' on node produced a never type`, typeNode)
  }

  if (hasFlag(type, ts.TypeFlags.TemplateLiteral)) {
    console.warn(new GenerateMetaDataWarning(`Template literals are assumed as strings`, typeNode).toString())
    return { dataType: 'string' }
  }

  if (hasFlag(type, ts.TypeFlags.Number)) {
    return { dataType: 'double' }
  }

  const indexedTypeName = typeChecker.typeToString(typeChecker.getTypeFromTypeNode(typeNode.type))
  throw new GenerateMetadataError(`Could not determine the keys on ${indexedTypeName}`, typeNode)
}

function createStringAndNumberUnion(): Tsoa.UnionType {
  return {
    dataType: 'union',
    types: [{ dataType: 'string' }, { dataType: 'double' }],
  }
}
