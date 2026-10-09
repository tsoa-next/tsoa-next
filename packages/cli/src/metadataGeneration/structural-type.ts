import { Tsoa } from '@tsoa-next/runtime'
import * as ts from 'typescript'
import type { MetadataGenerator } from './metadataGenerator'
import type { Context, TypeResolver } from './typeResolver'
import { GenerateMetadataError } from './exceptions'
import { throwUnless } from '../utils/flowUtils'

const objectHasOwn = (value: object, key: PropertyKey): boolean => Object.getOwnPropertyDescriptor(value, key) !== undefined

export function resolveArrayTypeNode(typeNode: ts.TypeNode, current: MetadataGenerator, parentNode: ts.Node | undefined, context: Context, Resolver: typeof TypeResolver): Tsoa.Type | undefined {
  if (!ts.isArrayTypeNode(typeNode)) {
    return undefined
  }

  return {
    dataType: 'array',
    elementType: new Resolver(typeNode.elementType, current, parentNode, context).resolve(),
  }
}

export function resolveRestTypeNode(typeNode: ts.TypeNode, current: MetadataGenerator, parentNode: ts.Node | undefined, context: Context, Resolver: typeof TypeResolver): Tsoa.Type | undefined {
  if (!ts.isRestTypeNode(typeNode)) {
    return undefined
  }

  return new Resolver(typeNode.type, current, parentNode, context).resolve()
}

export function resolveUnionTypeNode(typeNode: ts.TypeNode, current: MetadataGenerator, parentNode: ts.Node | undefined, context: Context, Resolver: typeof TypeResolver): Tsoa.Type | undefined {
  if (!ts.isUnionTypeNode(typeNode)) {
    return undefined
  }

  return {
    dataType: 'union',
    types: typeNode.types.map(type => new Resolver(type, current, parentNode, context).resolve()),
  }
}

export function resolveTupleTypeNode(typeNode: ts.TypeNode, current: MetadataGenerator, context: Context, Resolver: typeof TypeResolver): Tsoa.Type | undefined {
  if (!ts.isTupleTypeNode(typeNode)) {
    return undefined
  }

  const elementTypes: Tsoa.Type[] = []
  let restType: Tsoa.Type | undefined

  for (const element of typeNode.elements) {
    if (ts.isRestTypeNode(element)) {
      restType = resolveTupleRestTypeNode(element, current, context, Resolver)
      continue
    }

    const typeNode = ts.isNamedTupleMember(element) ? element.type : element
    elementTypes.push(new Resolver(typeNode, current, element, context).resolve())
  }

  return {
    dataType: 'tuple',
    types: elementTypes,
    ...(restType ? { restType } : {}),
  }
}

function resolveTupleRestTypeNode(element: ts.RestTypeNode, current: MetadataGenerator, context: Context, Resolver: typeof TypeResolver): Tsoa.Type {
  const resolvedRest = new Resolver(element.type, current, element, context).resolve()
  return resolvedRest.dataType === 'array' ? resolvedRest.elementType : resolvedRest
}

export function resolveLiteralTypeNode(typeNode: ts.TypeNode): Tsoa.Type | undefined {
  if (!ts.isLiteralTypeNode(typeNode)) {
    return undefined
  }

  return {
    dataType: 'enum',
    enums: [getLiteralValue(typeNode)],
  }
}

export function getLiteralValue(typeNode: ts.LiteralTypeNode): string | number | boolean | null {
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

export function resolveIntersectionTypes(types: ts.TypeNode[], current: MetadataGenerator, parentNode: ts.Node | undefined, context: Context, Resolver: typeof TypeResolver): Tsoa.Type[] {
  return types.map(type => new Resolver(type, current, parentNode, context).resolve())
}
