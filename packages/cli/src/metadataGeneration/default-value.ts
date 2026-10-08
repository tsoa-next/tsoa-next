import type { Node } from 'typescript'
import { getJSDocComment } from '../utils/jsDocUtils'
import { GenerateMetadataError } from './exceptions'

type DefaultStringDelimiter = '"' | "'" | '`'

interface DefaultFormattingState {
  formatted: string
  textStartCharacter?: DefaultStringDelimiter
}

const escapedDoubleQuote = String.raw`\"`
const backslash = '\\'

export function getDefaultValue(node: Node): unknown {
  const defaultStr = getJSDocComment(node, 'default')
  if (typeof defaultStr !== 'string' || defaultStr === 'undefined') {
    return undefined
  }

  const formattedStr = formatDefaultString(defaultStr)
  try {
    return JSON.parse(formattedStr) as unknown
  } catch (error) {
    const message = error instanceof Error ? error.message : '-'
    throw new GenerateMetadataError(`JSON could not parse default str: "${defaultStr}", preformatted: "${formattedStr}"\nmessage: "${message}"`)
  }
}

export function formatDefaultString(defaultStr: string): string {
  const initialState: DefaultFormattingState = { formatted: '' }
  let state = initialState
  let index = 0

  while (index < defaultStr.length) {
    const formattedCharacter = formatDefaultCharacter(defaultStr, index, state)
    state = {
      formatted: formattedCharacter.formatted,
      textStartCharacter: formattedCharacter.textStartCharacter,
    }
    index = formattedCharacter.index + 1
  }

  return state.formatted
}

function formatDefaultCharacter(defaultStr: string, index: number, state: DefaultFormattingState): DefaultFormattingState & { index: number } {
  const character = defaultStr[index]
  if (state.textStartCharacter !== undefined) {
    return formatDefaultStringCharacter(defaultStr, index, state, character)
  }

  return formatDefaultNonStringCharacter(defaultStr, index, state, character)
}

function formatDefaultStringCharacter(defaultStr: string, index: number, state: DefaultFormattingState, character: string): DefaultFormattingState & { index: number } {
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

  return formatEscapedDefaultCharacter(defaultStr, index, state)
}

function formatEscapedDefaultCharacter(defaultStr: string, index: number, state: DefaultFormattingState): DefaultFormattingState & { index: number } {
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

function formatDefaultNonStringCharacter(defaultStr: string, index: number, state: DefaultFormattingState, character: string): DefaultFormattingState & { index: number } {
  if (isDefaultStringDelimiter(character)) {
    return {
      formatted: `${state.formatted}"`,
      textStartCharacter: character,
      index,
    }
  }

  if (startsDefaultLineComment(defaultStr, index)) {
    return skipDefaultLineComment(defaultStr, index, state)
  }

  return {
    ...state,
    formatted: `${state.formatted}${character}`,
    index,
  }
}

function isDefaultStringDelimiter(character: string): character is DefaultStringDelimiter {
  return character === '"' || character === "'" || character === '`'
}

function startsDefaultLineComment(defaultStr: string, index: number): boolean {
  return defaultStr[index] === '/' && defaultStr[index + 1] === '/'
}

function skipDefaultLineComment(defaultStr: string, index: number, state: DefaultFormattingState): DefaultFormattingState & { index: number } {
  let nextIndex = index + 2
  while (nextIndex < defaultStr.length && defaultStr[nextIndex] !== '\n') {
    nextIndex += 1
  }

  return {
    ...state,
    index: nextIndex,
  }
}
