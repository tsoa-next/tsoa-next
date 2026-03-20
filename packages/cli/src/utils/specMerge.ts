import { UnspecifiedObject } from './unspecifiedObject'

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

export function recursiveMerge(target: UnspecifiedObject, source: UnspecifiedObject): UnspecifiedObject {
  const result: UnspecifiedObject = { ...target }

  for (const [key, sourceValue] of Object.entries(source)) {
    const targetValue = result[key]

    if (isPlainObject(targetValue) && isPlainObject(sourceValue)) {
      result[key] = recursiveMerge(targetValue as UnspecifiedObject, sourceValue as UnspecifiedObject)
      continue
    }

    result[key] = sourceValue
  }

  return result
}
