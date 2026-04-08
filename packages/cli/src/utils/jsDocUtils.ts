import * as ts from 'typescript'
import { GenerateMetadataError } from '../metadataGeneration/exceptions'

type NodeWithJsDoc = ts.Node & { jsDoc?: ts.JSDoc[] }
type JSDocLinkNode = ts.JSDocLink | ts.JSDocLinkCode | ts.JSDocLinkPlain

function getJsDocs(node: ts.Node): ts.JSDoc[] {
  return (node as NodeWithJsDoc).jsDoc ?? []
}

function isJSDocLinkNode(node: ts.JSDocComment): node is JSDocLinkNode {
  return ts.isJSDocLink(node) || ts.isJSDocLinkCode(node) || ts.isJSDocLinkPlain(node)
}

function getJSDocLinkTagName(node: JSDocLinkNode): 'link' | 'linkcode' | 'linkplain' {
  switch (node.kind) {
    case ts.SyntaxKind.JSDocLink:
      return 'link'
    case ts.SyntaxKind.JSDocLinkCode:
      return 'linkcode'
    case ts.SyntaxKind.JSDocLinkPlain:
      return 'linkplain'
    default:
      return 'link'
  }
}

function jsDocCommentNodeToString(node: ts.JSDocComment): string {
  if (!isJSDocLinkNode(node)) {
    return node.text
  }

  const content = [node.name?.getText(), node.text].filter(Boolean).join(' ')
  return content ? `{@${getJSDocLinkTagName(node)} ${content}}` : `{@${getJSDocLinkTagName(node)}}`
}

export function getJSDocDescription(node: ts.Node) {
  const jsDocs = getJsDocs(node)
  if (jsDocs.length === 0) {
    return undefined
  }

  return commentToString(jsDocs[0].comment) || undefined
}

export function getJSDocComment(node: ts.Node, tagName: string) {
  const comments = getJSDocComments(node, tagName)
  return comments?.[0]
}

export function getJSDocComments(node: ts.Node, tagName: string) {
  const tags = getJSDocTags(node, tag => tag.tagName.text === tagName || (tag.tagName.escapedText as string) === tagName)
  if (tags.length === 0) {
    return undefined
  }
  const comments: string[] = []
  tags.forEach(tag => {
    const comment = commentToString(tag.comment)
    if (comment) comments.push(comment)
  })
  return comments
}

export function getJSDocTagNames(node: ts.Node, requireTagName = false) {
  let tags: ts.JSDocTag[]
  if (ts.isParameter(node) && ts.isIdentifier(node.name)) {
    const parameterName = node.name.text
    tags = getJSDocTags(node.parent, tag => {
      if (ts.isJSDocParameterTag(tag)) {
        return false
      } else if (tag.comment === undefined) {
        throw new GenerateMetadataError(`Orphan tag: @${String(tag.tagName.text || tag.tagName.escapedText)} should have a parameter name follows with.`)
      }

      return commentToString(tag.comment)?.startsWith(parameterName) || false
    })
  } else {
    tags = getJSDocTags(node, tag => {
      return requireTagName ? tag.comment !== undefined : true
    })
  }
  return tags.map(tag => {
    return tag.tagName.text
  })
}

export function getJSDocTags(node: ts.Node, isMatching: (tag: ts.JSDocTag) => boolean) {
  const jsDocs = getJsDocs(node)
  if (!jsDocs || jsDocs.length === 0) {
    return []
  }

  const jsDoc = jsDocs[0]
  if (!jsDoc.tags) {
    return []
  }

  return jsDoc.tags.filter(isMatching)
}

export function isExistJSDocTag(node: ts.Node, isMatching: (tag: ts.JSDocTag) => boolean) {
  return getJSDocTags(node, isMatching).length > 0
}

export function commentToString(comment?: string | ts.NodeArray<ts.JSDocComment>): string | undefined {
  if (typeof comment === 'string') {
    return comment
  } else if (comment) {
    return comment.map(jsDocCommentNodeToString).join('')
  }

  return undefined
}

export function symbolDisplayPartsToString(parts: ts.SymbolDisplayPart[]): string | undefined {
  if (parts.length === 0) {
    return undefined
  }

  let formatted = ''
  let previousKind: string | undefined

  for (const part of parts) {
    if (part.kind === 'linkText' && previousKind === 'linkName' && !formatted.endsWith(' ')) {
      formatted += ' '
    }

    formatted += part.text
    previousKind = part.kind
  }

  return formatted
}
