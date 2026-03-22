/**
 * Removes all '/', '\', and spaces from the beginning and end of the path
 * Replaces all '/', '\', and spaces between sections of the path
 * Adds prefix and suffix if supplied
 * Replace ':pathParam' with '{pathParam}'
 */
export function normalisePath(path: string, withPrefix?: string, withSuffix?: string, skipPrefixAndSuffixIfEmpty = true) {
  if ((!path || path === '/') && skipPrefixAndSuffixIfEmpty) {
    return ''
  }
  if (!path || typeof path !== 'string') {
    path = '' + path
  }

  let normalised = trimPathDelimiters(path)
  normalised = withPrefix ? withPrefix + normalised : normalised
  normalised = withSuffix ? normalised + withSuffix : normalised

  return collapsePathDelimiters(normalised)
}

export function convertColonPathParams(path: string) {
  if (!path || typeof path !== 'string') {
    return path
  }

  const normalised = path.replace(/:([^/]+)/g, '{$1}')
  return normalised
}

export function convertBracesPathParams(path: string) {
  return path.replace(/{(\w*)}/g, ':$1')
}

function trimPathDelimiters(path: string) {
  let start = 0
  let end = path.length

  while (start < end && isPathDelimiter(path[start])) {
    start++
  }

  while (end > start && isPathDelimiter(path[end - 1])) {
    end--
  }

  return path.slice(start, end)
}

function collapsePathDelimiters(path: string) {
  const normalisedChars: string[] = []
  let previousWasDelimiter = false

  for (const character of path) {
    if (isPathDelimiter(character)) {
      if (!previousWasDelimiter) {
        normalisedChars.push('/')
        previousWasDelimiter = true
      }
      continue
    }

    normalisedChars.push(character)
    previousWasDelimiter = false
  }

  return normalisedChars.join('')
}

function isPathDelimiter(character: string) {
  return character === '/' || character === '\\' || character.trim() === ''
}
