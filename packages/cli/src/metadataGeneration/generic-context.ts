import * as ts from 'typescript'
import type { MetadataGenerator } from './metadataGenerator'
import type { Context } from './typeResolver'
import { GenerateMetadataError } from './exceptions'

type DeclarationWithTypeParameters = ts.Declaration & {
  typeParameters?: ts.NodeArray<ts.TypeParameterDeclaration>
}
type ResolvedContextualTypeArgument = {
  type: ts.TypeNode
  name?: string
  resolvedType?: ts.Type
}

export function getDeclarationTypeParameters(declaration: DeclarationWithTypeParameters | undefined): ts.NodeArray<ts.TypeParameterDeclaration> | undefined {
  return declaration?.typeParameters
}

export function resolveContextualTypeArgument(
  type: ts.TypeReferenceNode | ts.ExpressionWithTypeArguments,
  typeParameter: ts.TypeParameterDeclaration,
  index: number,
  context: Context,
  current: MetadataGenerator,
  referencer: ts.Type | undefined,
): ResolvedContextualTypeArgument {
  const typeArgument = type.typeArguments?.[index]
  const contextualType = getForwardReferencedContextType(typeArgument, context)
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
    resolvedType: getResolvedTypeForContextTypeArgument(resolvedType, index, current, referencer),
  }
}

function getForwardReferencedContextType(typeArgument: ts.TypeNode | undefined, context: Context): Context[string] | undefined {
  if (!typeArgument || !ts.isTypeReferenceNode(typeArgument) || !ts.isIdentifier(typeArgument.typeName)) {
    return undefined
  }

  return context[typeArgument.typeName.text]
}

function getResolvedTypeForContextTypeArgument(typeNode: ts.TypeNode, index: number, current: MetadataGenerator, referencer: ts.Type | undefined): ts.Type | undefined {
  if (typeNode.pos === -1) {
    return getReferencerTypeArgument(referencer, index)
  }

  return current.typeChecker.getTypeFromTypeNode(typeNode)
}

function getReferencerTypeArgument(currentReferencer: ts.Type | undefined, index: number): ts.Type | undefined {
  const referencer = currentReferencer as ts.Type & {
    aliasTypeArguments?: readonly ts.Type[]
    typeArguments?: readonly ts.Type[]
  }

  return referencer?.aliasTypeArguments?.[index] ?? referencer?.typeArguments?.[index]
}

export function normalizeTypeNodeFromBuilder(node: ts.Node | undefined): ts.TypeNode | undefined {
  if (!node) {
    return undefined
  }

  if (ts.isIdentifier(node) || ts.isQualifiedName(node)) {
    return ts.factory.createTypeReferenceNode(node, undefined)
  }

  return node as ts.TypeNode
}
