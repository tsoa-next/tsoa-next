import * as ts from 'typescript'
import { GenerateMetadataError } from './exceptions'
import { throwUnless } from '../utils/flowUtils'

type NamedDeclaration = ts.InterfaceDeclaration | ts.ClassDeclaration | ts.TypeAliasDeclaration | ts.EnumMember

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

export function getEntityNameText(type: ts.EntityName): string {
  if (ts.isIdentifier(type)) {
    return type.text
  }

  return `${getEntityNameText(type.left)}.${type.right.text}`
}

export function getFallbackReferenceName(type: ts.EntityName): string | undefined {
  return ts.isIdentifier(type) ? type.text : undefined
}

export function sanitizeInlineTypeName(typeName: string): string {
  const normalizedName = typeName.replaceAll(/[^A-Za-z0-9]/g, '_').replaceAll(/_+/g, '_')
  const withoutLeadingUnderscore = normalizedName.startsWith('_') ? normalizedName.slice(1) : normalizedName
  return withoutLeadingUnderscore.endsWith('_') ? withoutLeadingUnderscore.slice(0, -1) : withoutLeadingUnderscore
}

export function getDeclarationBasedRefTypeName(type: ts.EntityName, declarations: NamedDeclaration[]): string {
  const declaration = declarations[0]
  let name = getDeclarationRefTypeName(declaration, getEntityNameText(type))
  let currentNode = declaration.parent
  let isFirst = true

  while (!ts.isSourceFile(currentNode)) {
    if (ts.isBlock(currentNode)) {
      break
    }

    if (shouldPrefixDeclarationNamespace(currentNode, isFirst)) {
      throwUnless(ts.isModuleDeclaration(currentNode), new GenerateMetadataError(`This node kind is unknown: ${currentNode.kind}`, type))
      if (!isGlobalDeclaration(currentNode)) {
        name = `${currentNode.name.text}.${name}`
      }
    }

    isFirst = false
    currentNode = currentNode.parent
  }

  return name
}

function getDeclarationRefTypeName(declaration: NamedDeclaration, fallbackName: string): string {
  if (ts.isEnumMember(declaration)) {
    return `${declaration.parent.name.getText()}.${declaration.name.getText()}`
  }

  return declaration.name?.getText() ?? fallbackName
}

function shouldPrefixDeclarationNamespace(node: ts.Node, isFirst: boolean): boolean {
  return !(isFirst && ts.isEnumDeclaration(node)) && !ts.isModuleBlock(node)
}

function isGlobalDeclaration(node: ts.ModuleDeclaration): boolean {
  return node.name.kind === ts.SyntaxKind.Identifier && node.name.text === 'global'
}

export function normalizeReferenceName(name: string): string {
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
