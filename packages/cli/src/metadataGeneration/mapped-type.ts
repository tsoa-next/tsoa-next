import { Tsoa } from '@tsoa-next/runtime'
import * as ts from 'typescript'
import type { MetadataGenerator } from './metadataGenerator'
import type { Context, TypeResolver } from './typeResolver'
import { GenerateMetadataError } from './exceptions'
import { getInitializerValue } from './initializer-value'
import { isDecorator } from '../utils/decoratorUtils'
import { getJSDocTagNames, isExistJSDocTag, symbolDisplayPartsToString } from '../utils/jsDocUtils'
import { getPropertyValidators } from '../utils/validatorUtils'

type MappedAnnotations = Pick<TypeResolver, 'getNodeFormat' | 'getNodeExample' | 'getNodeExtension'>

function hasFlag(type: ts.Type | ts.Symbol, flag: ts.TypeFlags | ts.SymbolFlags) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison
  return (type.flags & flag) === flag
}

const hasInitializer = (declaration: ts.Declaration): declaration is ts.Declaration & { initializer: ts.Expression } => 'initializer' in declaration && declaration.initializer !== undefined

const getSyntheticOrigin = (symbol: ts.Symbol): ts.Symbol | undefined => {
  const symbolWithLinks = symbol as ts.Symbol & { links?: { syntheticOrigin?: ts.Symbol } }
  return symbolWithLinks.links?.syntheticOrigin
}

function getOriginalMappedDeclaration(prop: ts.Symbol): ts.Declaration | undefined {
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

function isIgnoredMappedProperty(prop: ts.Symbol): boolean {
  const declaration = getOriginalMappedDeclaration(prop)
  if (!declaration) {
    return false
  }

  const ignoredTargets = !ts.isPropertyDeclaration(declaration) && !ts.isPropertySignature(declaration) && !ts.isParameter(declaration)
  return getJSDocTagNames(declaration).includes('ignore') || ignoredTargets
}

export function resolveMappedType(
  type: ts.Type,
  mappedTypeNode: ts.MappedTypeNode,
  typeNode: ts.TypeNode,
  current: MetadataGenerator,
  context: Context,
  annotations: MappedAnnotations,
  Resolver: typeof TypeResolver,
): Tsoa.Type {
  if (hasFlag(type, ts.TypeFlags.Union)) {
    return {
      dataType: 'union',
      types: (type as ts.UnionType).types.map(unionType => resolveMappedType(unionType, mappedTypeNode, typeNode, current, context, annotations, Resolver)),
    }
  }

  if (hasFlag(type, ts.TypeFlags.Undefined)) {
    return { dataType: 'undefined' }
  }

  if (hasFlag(type, ts.TypeFlags.Null)) {
    return {
      dataType: 'enum',
      enums: [null],
    }
  }

  if (hasFlag(type, ts.TypeFlags.Object)) {
    return resolveMappedObjectType(type, mappedTypeNode, typeNode, current, context, annotations, Resolver)
  }

  // Known issues & easy to implement: Partial<string>, Partial<never>, ...
  throw new GenerateMetadataError(`Unhandled mapped type has found, flags: ${type.flags}`, typeNode)
}

function resolveMappedObjectType(
  type: ts.Type,
  mappedTypeNode: ts.MappedTypeNode,
  typeNode: ts.TypeNode,
  current: MetadataGenerator,
  context: Context,
  annotations: MappedAnnotations,
  Resolver: typeof TypeResolver,
): Tsoa.NestedObjectLiteralType {
  const properties = type
    .getProperties()
    .filter(property => !isIgnoredMappedProperty(property))
    .map(property => resolveMappedProperty(property, typeNode, current, context, annotations, Resolver))

  const objectLiteral: Tsoa.NestedObjectLiteralType = {
    dataType: 'nestedObjectLiteral',
    properties,
  }

  const indexTypes = resolveMappedIndexTypes(type, mappedTypeNode, current, context, Resolver)
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

function resolveMappedProperty(property: ts.Symbol, typeNode: ts.TypeNode, current: MetadataGenerator, context: Context, annotations: MappedAnnotations, Resolver: typeof TypeResolver): Tsoa.Property {
  const propertyType = current.typeChecker.getTypeOfSymbolAtLocation(property, typeNode)
  const propertyTypeNode = current.typeChecker.typeToTypeNode(propertyType, undefined, ts.NodeBuilderFlags.NoTruncation)!
  const parent = getOriginalMappedDeclaration(property)
  const comments = property.getDocumentationComment(current.typeChecker)

  return {
    name: property.getName(),
    required: !hasFlag(property, ts.SymbolFlags.Optional),
    deprecated: isDeprecatedMappedProperty(parent, current),
    type: new Resolver(propertyTypeNode, current, parent, context, propertyType).resolve(),
    default: getMappedPropertyDefault(parent, current, Resolver),
    validators: (parent ? getPropertyValidators(parent) : {}) || {},
    description: symbolDisplayPartsToString(comments),
    format: parent ? annotations.getNodeFormat(parent) : undefined,
    example: parent ? annotations.getNodeExample(parent) : undefined,
    extensions: parent ? annotations.getNodeExtension(parent) : undefined,
  }
}

function isDeprecatedMappedProperty(parent: ts.Declaration | undefined, current: MetadataGenerator): boolean {
  if (!parent) {
    return false
  }

  return isExistJSDocTag(parent, tag => tag.tagName.text === 'deprecated') || isDecorator(parent, (identifier, canonicalName) => canonicalName === 'Deprecated', current.typeChecker)
}

function getMappedPropertyDefault(parent: ts.Declaration | undefined, current: MetadataGenerator, Resolver: typeof TypeResolver): unknown {
  if (!parent) {
    return undefined
  }

  if (hasInitializer(parent)) {
    return getInitializerValue(parent.initializer, current.typeChecker)
  }

  return Resolver.getDefault(parent)
}

function resolveMappedIndexTypes(type: ts.Type, mappedTypeNode: ts.MappedTypeNode, current: MetadataGenerator, context: Context, Resolver: typeof TypeResolver): Tsoa.Type[] {
  return current.typeChecker.getIndexInfosOfType(type).flatMap(indexInfo => {
    const typeNode = current.typeChecker.typeToTypeNode(indexInfo.type, undefined, ts.NodeBuilderFlags.NoTruncation)!
    if (typeNode.kind === ts.SyntaxKind.NeverKeyword) {
      return []
    }

    return [new Resolver(typeNode, current, mappedTypeNode, context, indexInfo.type).resolve()]
  })
}
