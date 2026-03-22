import * as ts from 'typescript'
import { getInitializerValue, isNonUndefinedInitializerValue } from './initializer-value'
import { MetadataGenerator } from './metadataGenerator'
import { Tsoa } from '@tsoa-next/runtime'
import { safeFromJson } from '../utils/jsonUtils'

export function getExtensions(decorators: ts.Identifier[], metadataGenerator: MetadataGenerator): Tsoa.Extension[] {
  const extensions: Tsoa.Extension[] = decorators.map(extensionDecorator => {
    if (!ts.isCallExpression(extensionDecorator.parent)) {
      throw new Error('The parent of the @Extension is not a CallExpression. Are you using it in the right place?')
    }

    const [decoratorKeyArg, decoratorValueArg] = extensionDecorator.parent.arguments

    if (!ts.isStringLiteral(decoratorKeyArg) && !ts.isIdentifier(decoratorKeyArg)) {
      throw new Error('The first argument of @Extension must be a string')
    }

    const attributeKey = ts.isIdentifier(decoratorKeyArg) ? getInitializerValue(decoratorKeyArg, metadataGenerator.typeChecker) : decoratorKeyArg.text

    if (typeof attributeKey !== 'string') {
      throw new Error('The first argument of @Extension must be a string')
    }

    if (!decoratorValueArg) {
      throw new Error(`Extension '${attributeKey}' must contain a value`)
    }

    assertValidExtensionKey(attributeKey)

    const attributeValue = getInitializerValue(decoratorValueArg, metadataGenerator.typeChecker)
    if (!isNonUndefinedInitializerValue(attributeValue)) {
      throw new Error(`Extension '${attributeKey}' cannot have an undefined initializer value`)
    }
    if (!isExtensionValue(attributeValue)) {
      throw new Error(`Extension '${attributeKey}' must resolve to a valid OpenAPI extension value`)
    }
    return { key: attributeKey, value: attributeValue }
  })

  return extensions
}

export function getExtensionsFromJSDocComments(comments: string[]): Tsoa.Extension[] {
  const extensions: Tsoa.Extension[] = []
  comments.forEach(comment => {
    const extensionData = safeFromJson(comment)
    if (isExtensionRecord(extensionData)) {
      const keys = Object.keys(extensionData)
      keys.forEach(key => {
        assertValidExtensionKey(key)
        extensions.push({ key: key, value: extensionData[key] })
      })
    }
  })

  return extensions
}

function isExtensionRecord(value: unknown): value is Record<string, Tsoa.Extension['value']> {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    return false
  }

  return Object.values(value).every(isExtensionValue)
}

function isExtensionValue(value: unknown): value is Tsoa.Extension['value'] {
  if (value === null) {
    return true
  }

  if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
    return true
  }

  if (Array.isArray(value)) {
    return value.every(isExtensionValue)
  }

  if (typeof value === 'object') {
    return Object.values(value).every(isExtensionValue)
  }

  return false
}

function assertValidExtensionKey(key: string): asserts key is `x-${string}` {
  if (!key.startsWith('x-')) {
    throw new Error('Extensions must begin with "x-" to be valid. Please see the following link for more information: https://swagger.io/docs/specification/openapi-extensions/')
  }
}
