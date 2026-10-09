import { Tsoa } from '@tsoa-next/runtime'
import * as ts from 'typescript'
import type { MetadataGenerator } from './metadataGenerator'
import type { Context, TypeResolver } from './typeResolver'
import { GenerateMetadataError } from './exceptions'
import { throwUnless } from '../utils/flowUtils'

const objectHasOwn = (value: object, key: PropertyKey): boolean => Object.getOwnPropertyDescriptor(value, key) !== undefined

export function resolveIndexedAccessKeywordType(
  typeNode: ts.IndexedAccessTypeNode,
  typeChecker: ts.TypeChecker,
  current: MetadataGenerator,
  context: Context,
  objectType: ts.TypeNode,
  indexType: ts.TypeNode,
  Resolver: typeof TypeResolver,
): Tsoa.Type {
  const isNumberIndexType = indexType.kind === ts.SyntaxKind.NumberKeyword
  const typeOfObjectType = typeChecker.getTypeFromTypeNode(objectType)
  const indexedType = isNumberIndexType ? typeOfObjectType.getNumberIndexType() : typeOfObjectType.getStringIndexType()
  throwUnless(indexedType, new GenerateMetadataError(`Could not determine ${isNumberIndexType ? 'number' : 'string'} index on ${typeChecker.typeToString(typeOfObjectType)}`, typeNode))

  return new Resolver(typeChecker.typeToTypeNode(indexedType, objectType, ts.NodeBuilderFlags.NoTruncation)!, current, typeNode, context).resolve()
}

export function resolveIndexedAccessLiteralType(
  typeNode: ts.IndexedAccessTypeNode,
  typeChecker: ts.TypeChecker,
  current: MetadataGenerator,
  context: Context,
  objectType: ts.TypeNode,
  indexType: ts.LiteralTypeNode,
  Resolver: typeof TypeResolver,
): Tsoa.Type {
  const propertyName = ts.isStringLiteral(indexType.literal) || ts.isNumericLiteral(indexType.literal) ? indexType.literal.text : indexType.literal.getText()
  const { type: resolvedObjectType, typeNode: resolvedObjectTypeNode } = resolveContextualIndexedAccessObjectType(objectType, typeChecker, context)
  const symbol = typeChecker.getPropertyOfType(resolvedObjectType, propertyName)
  throwUnless(symbol, new GenerateMetadataError(`Could not determine the keys on ${typeChecker.typeToString(resolvedObjectType)}`, typeNode))

  if (symbolHasTypeDeclaration(symbol.valueDeclaration)) {
    return new Resolver(symbol.valueDeclaration.type, current, typeNode, context).resolve()
  }

  const declarationType = typeChecker.getTypeOfSymbolAtLocation(symbol, resolvedObjectTypeNode)
  try {
    return new Resolver(typeChecker.typeToTypeNode(declarationType, resolvedObjectTypeNode, ts.NodeBuilderFlags.NoTruncation)!, current, typeNode, context).resolve()
  } catch {
    const typeNodeForError = typeChecker.typeToTypeNode(declarationType, undefined, ts.NodeBuilderFlags.NoTruncation)!
    const typeName = typeChecker.typeToString(typeChecker.getTypeFromTypeNode(typeNodeForError))
    throw new GenerateMetadataError(`Could not determine the keys on ${typeName}`, typeNode)
  }
}

function resolveContextualIndexedAccessObjectType(objectType: ts.TypeNode, typeChecker: ts.TypeChecker, context: Context): { type: ts.Type; typeNode: ts.TypeNode } {
  const contextualTypeNode = getContextualIndexedAccessObjectTypeNode(objectType, context)
  const resolvedTypeNode = contextualTypeNode ?? objectType

  const contextualType = contextualTypeNode && ts.isTypeReferenceNode(objectType) && ts.isIdentifier(objectType.typeName) ? context[objectType.typeName.text] : undefined

  return {
    type: contextualType?.resolvedType ?? typeChecker.getTypeFromTypeNode(resolvedTypeNode),
    typeNode: resolvedTypeNode,
  }
}

function getContextualIndexedAccessObjectTypeNode(objectType: ts.TypeNode, context: Context): ts.TypeNode | undefined {
  if (ts.isParenthesizedTypeNode(objectType)) {
    return getContextualIndexedAccessObjectTypeNode(objectType.type, context)
  }

  if (!ts.isTypeReferenceNode(objectType) || !ts.isIdentifier(objectType.typeName)) {
    return undefined
  }

  return context[objectType.typeName.text]?.type
}

function symbolHasTypeDeclaration(node: ts.Node | undefined): node is ts.HasType & { type: ts.TypeNode } {
  return node !== undefined && objectHasOwn(node, 'type') && (node as ts.HasType).type !== undefined
}

export function matchesKeyedIndexedAccess(objectType: ts.TypeNode, indexType: ts.TypeOperatorNode): boolean {
  const typeOfObjectType = ts.isParenthesizedTypeNode(objectType) ? objectType.type : objectType
  const typeOfIndexType = indexType.type
  const isSameTypeQuery = ts.isTypeQueryNode(typeOfObjectType) && ts.isTypeQueryNode(typeOfIndexType) && typeOfObjectType.exprName.getText() === typeOfIndexType.exprName.getText()
  const isSameTypeReference = ts.isTypeReferenceNode(typeOfObjectType) && ts.isTypeReferenceNode(typeOfIndexType) && typeOfObjectType.typeName.getText() === typeOfIndexType.typeName.getText()

  return isSameTypeQuery || isSameTypeReference
}

export function resolveKeyedIndexedAccessType(
  type: ts.Type,
  typeChecker: ts.TypeChecker,
  current: MetadataGenerator,
  context: Context,
  typeNode: ts.IndexedAccessTypeNode,
  referencer: ts.Type | undefined,
  Resolver: typeof TypeResolver,
): Tsoa.Type {
  const node = typeChecker.typeToTypeNode(type, undefined, ts.NodeBuilderFlags.InTypeAlias | ts.NodeBuilderFlags.NoTruncation)!
  return new Resolver(node, current, typeNode, context, referencer).resolve()
}
