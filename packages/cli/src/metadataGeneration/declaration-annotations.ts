import * as ts from 'typescript'
import type { MetadataGenerator } from './metadataGenerator'
import { safeFromJson } from '../utils/jsonUtils'
import { getNodeFirstDecoratorValue } from '../utils/decoratorUtils'
import { getJSDocComment, getJSDocComments, symbolDisplayPartsToString } from '../utils/jsDocUtils'
import { getExtensions, getExtensionsFromJSDocComments } from './extension'

export function getNodeDescription(node: ts.Node, symbol: ts.Symbol, current: MetadataGenerator) {
  /**
   * Workaround for a TypeScript compiler quirk tracked for follow-up investigation.
   * See https://github.com/tsoa-next/tsoa-next/issues for related metadata parsing context.
   */
  if (node.kind === ts.SyntaxKind.Parameter) {
    // TypeScript won't parse jsdoc if the flag is 4, i.e. 'Property'
    symbol.flags = 0
  }

  const comments = symbol.getDocumentationComment(current.typeChecker)
  if (comments.length) {
    return symbolDisplayPartsToString(comments)
  }

  return undefined
}

export function getNodeFormat(node: ts.Node) {
  return getJSDocComment(node, 'format')
}

export function getNodeTitle(node: ts.Node) {
  return getJSDocComment(node, 'title')
}

export function getNodeExample(node: ts.Node, current: MetadataGenerator) {
  const exampleJSDoc = getJSDocComment(node, 'example')
  if (exampleJSDoc) {
    return safeFromJson(exampleJSDoc)
  }

  return getNodeFirstDecoratorValue(node, current.typeChecker, (dec, canonicalName) => canonicalName === 'Example')
}

export function getNodeExtension(node: ts.Node, decorators: ts.Identifier[], current: MetadataGenerator) {
  const extensionDecorator = getExtensions(decorators, current)

  const extensionComments = getJSDocComments(node, 'extension')
  const extensionJSDoc = extensionComments ? getExtensionsFromJSDocComments(extensionComments) : []

  return extensionDecorator.concat(extensionJSDoc)
}
