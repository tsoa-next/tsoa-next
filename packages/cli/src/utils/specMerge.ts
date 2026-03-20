import { UnspecifiedObject } from './unspecifiedObject'

const unsafeKeys = new Set(['__proto__', 'constructor', 'prototype'])

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function cloneMergeValue(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map(item => cloneMergeValue(item))
  }

  if (isPlainObject(value)) {
    return recursiveMerge({}, value as UnspecifiedObject)
  }

  return value
}

export function recursiveMerge(target: UnspecifiedObject, source: UnspecifiedObject): UnspecifiedObject {
  const result: UnspecifiedObject = { ...target }

  for (const [key, sourceValue] of Object.entries(source)) {
    if (unsafeKeys.has(key)) {
      continue
    }

    const targetValue = result[key]

    if (Array.isArray(targetValue) && Array.isArray(sourceValue)) {
      result[key] = [...targetValue.map(item => cloneMergeValue(item)), ...sourceValue.map(item => cloneMergeValue(item))]
      continue
    }

    if (isPlainObject(targetValue) && isPlainObject(sourceValue)) {
      result[key] = recursiveMerge(targetValue as UnspecifiedObject, sourceValue as UnspecifiedObject)
      continue
    }

    result[key] = cloneMergeValue(sourceValue)
  }

  return result
}
