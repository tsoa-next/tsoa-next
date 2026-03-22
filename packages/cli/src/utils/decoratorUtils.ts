import * as ts from 'typescript'
import { Tsoa } from '@tsoa-next/runtime'
import { getInitializerValue, type InitializerValue } from '../metadataGeneration/initializer-value'

function tsHasDecorators(tsNamespace: typeof ts): tsNamespace is typeof ts & {
  canHaveDecorators(node: ts.Node): boolean
  getDecorators(node: ts.Node): readonly ts.Decorator[] | undefined
} {
  return typeof tsNamespace.canHaveDecorators === 'function'
}

function unwrapDecoratorIdentifier(decorator: ts.Decorator): ts.Identifier | undefined {
  let current: ts.Expression = decorator.expression

  while (ts.isCallExpression(current) || ts.isPropertyAccessExpression(current) || ts.isElementAccessExpression(current) || ts.isParenthesizedExpression(current)) {
    current = current.expression
  }

  return ts.isIdentifier(current) ? current : undefined
}

export function getDecorators(node: ts.Node, isMatching: (identifier: ts.Identifier) => boolean): ts.Identifier[] {
  // beginning in ts4.8 node.decorator is undefined, use getDecorators instead.
  const decorators = tsHasDecorators(ts) && ts.canHaveDecorators(node) ? ts.getDecorators(node) : []

  if (!decorators || !decorators.length) {
    return []
  }

  return decorators
    .map(unwrapDecoratorIdentifier)
    .filter((identifier): identifier is ts.Identifier => identifier !== undefined)
    .filter(isMatching)
}

export function getNodeFirstDecoratorName(node: ts.Node, isMatching: (identifier: ts.Identifier) => boolean) {
  const decorators = getDecorators(node, isMatching)
  if (!decorators || !decorators.length) {
    return
  }

  return decorators[0].text
}

export function getNodeFirstDecoratorValue(node: ts.Node, typeChecker: ts.TypeChecker, isMatching: (identifier: ts.Identifier) => boolean) {
  const decorators = getDecorators(node, isMatching)
  if (!decorators || !decorators.length) {
    return
  }
  const values = getDecoratorValues(decorators[0], typeChecker)
  return values && values[0]
}

export function getDecoratorValues(decorator: ts.Identifier, typeChecker: ts.TypeChecker): InitializerValue[] {
  if (!ts.isCallExpression(decorator.parent)) {
    return []
  }

  const expArguments = decorator.parent.arguments
  if (!expArguments || !expArguments.length) {
    return []
  }
  return expArguments.map(a => getInitializerValue(a, typeChecker))
}

export function getSecurites(decorator: ts.Identifier, typeChecker: ts.TypeChecker) {
  const [first, second] = getDecoratorValues(decorator, typeChecker)
  if (isObject(first)) {
    return toSecurity(first)
  }
  const securityName = typeof first === 'string' ? first : ''
  const scopes = Array.isArray(second) ? second.filter((scope): scope is string => typeof scope === 'string') : []
  return { [securityName]: scopes }
}

export function isDecorator(node: ts.Node, isMatching: (identifier: ts.Identifier) => boolean) {
  const decorators = getDecorators(node, isMatching)
  if (!decorators || !decorators.length) {
    return false
  }
  return true
}

function isObject(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null
}

export function getPath(decorator: ts.Identifier, typeChecker: ts.TypeChecker): string {
  const [path] = getDecoratorValues(decorator, typeChecker)

  if (typeof path !== 'string') {
    return ''
  }

  return path
}

export function getProduces(node: ts.Node, typeChecker: ts.TypeChecker): string[] {
  const producesDecorators = getDecorators(node, identifier => identifier.text === 'Produces')

  if (!producesDecorators || !producesDecorators.length) {
    return []
  }

  return producesDecorators
    .map(decorator => getDecoratorValues(decorator, typeChecker)[0])
    .filter((value): value is string => typeof value === 'string')
}

function toSecurity(value: Record<string, unknown>): Tsoa.Security {
  return Object.fromEntries(
    Object.entries(value).map(([key, scopes]) => [key, Array.isArray(scopes) ? scopes.filter((scope): scope is string => typeof scope === 'string') : []]),
  )
}
