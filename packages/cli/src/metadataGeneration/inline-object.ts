import { Tsoa } from '@tsoa-next/runtime'
import * as ts from 'typescript'
import type { MetadataGenerator } from './metadataGenerator'
import type { Context, TypeResolver } from './typeResolver'
import { GenerateMetadataError } from './exceptions'
import { throwUnless } from '../utils/flowUtils'
import { getPropertyValidators } from '../utils/validatorUtils'
import { isExistJSDocTag } from '../utils/jsDocUtils'

type InlineObjectHooks = Pick<TypeResolver, 'getNodeExample' | 'getNodeDescription' | 'getNodeFormat' | 'getPropertyName' | 'getNodeTitle' | 'getNodeExtension'>

export function resolveInlineObject(
  typeLiteralNode: ts.TypeLiteralNode,
  current: MetadataGenerator,
  parentNode: ts.Node | undefined,
  context: Context,
  hooks: InlineObjectHooks,
  Resolver: typeof TypeResolver,
): Tsoa.NestedObjectLiteralType {
  const properties = typeLiteralNode.members
    .filter(ts.isPropertySignature)
    .reduce<Tsoa.Property[]>((result, propertySignature) => [resolveTypeLiteralProperty(propertySignature, current, context, hooks, Resolver), ...result], [])

  return {
    additionalProperties: resolveTypeLiteralAdditionalProperties(typeLiteralNode, current, parentNode, context, Resolver),
    dataType: 'nestedObjectLiteral',
    properties,
  }
}

function resolveTypeLiteralProperty(propertySignature: ts.PropertySignature, current: MetadataGenerator, context: Context, hooks: InlineObjectHooks, Resolver: typeof TypeResolver): Tsoa.Property {
  return {
    example: hooks.getNodeExample(propertySignature),
    default: Resolver.getDefault(propertySignature),
    description: hooks.getNodeDescription(propertySignature),
    format: hooks.getNodeFormat(propertySignature),
    name: hooks.getPropertyName(propertySignature),
    required: !propertySignature.questionToken,
    type: new Resolver(propertySignature.type as ts.TypeNode, current, propertySignature, context).resolve(),
    validators: getPropertyValidators(propertySignature) || {},
    deprecated: isExistJSDocTag(propertySignature, tag => tag.tagName.text === 'deprecated'),
    title: hooks.getNodeTitle(propertySignature),
    extensions: hooks.getNodeExtension(propertySignature),
  }
}

function resolveTypeLiteralAdditionalProperties(
  typeLiteralNode: ts.TypeLiteralNode,
  current: MetadataGenerator,
  parentNode: ts.Node | undefined,
  context: Context,
  Resolver: typeof TypeResolver,
): Tsoa.Type | undefined {
  const indexMember = typeLiteralNode.members.find(member => ts.isIndexSignatureDeclaration(member))
  if (!indexMember) {
    return undefined
  }

  const indexType = new Resolver(indexMember.parameters[0].type as ts.TypeNode, current, parentNode, context).resolve()
  throwUnless(indexType.dataType === 'string', new GenerateMetadataError(`Only string indexers are supported.`, typeLiteralNode))

  return new Resolver(indexMember.type, current, parentNode, context).resolve()
}
