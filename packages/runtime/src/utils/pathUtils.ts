function isPathDelimiter(character: string) {
  return character === '/' || character === '\\' || character.trim() === ''
}

function trimPathDelimiters(path: string) {
  let start = 0
  let end = path.length

  while (start < end && isPathDelimiter(path[start])) {
    start += 1
  }

  while (end > start && isPathDelimiter(path[end - 1])) {
    end -= 1
  }

  return path.slice(start, end)
}

function collapsePathDelimiters(path: string) {
  const normalizedChars: string[] = []
  let previousWasDelimiter = false

  for (const character of path) {
    if (isPathDelimiter(character)) {
      if (!previousWasDelimiter) {
        normalizedChars.push('/')
        previousWasDelimiter = true
      }
      continue
    }

    normalizedChars.push(character)
    previousWasDelimiter = false
  }

  return normalizedChars.join('')
}

/**
 * Normalizes slash usage in a route path and optionally applies a prefix and suffix.
 */
export function normalisePath(path: string, withPrefix?: string, withSuffix?: string, skipPrefixAndSuffixIfEmpty = true) {
  if ((!path || path === '/') && skipPrefixAndSuffixIfEmpty) {
    return ''
  }

  if (!path || typeof path !== 'string') {
    path = '' + path
  }

  let normalized = trimPathDelimiters(path)
  normalized = withPrefix ? withPrefix + normalized : normalized
  normalized = withSuffix ? normalized + withSuffix : normalized

  return collapsePathDelimiters(normalized)
}
