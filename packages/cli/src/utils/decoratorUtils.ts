import * as ts from 'typescript'
import { Tsoa } from '@tsoa-next/runtime'
import { getInitializerValue, type InitializerValue } from '../metadataGeneration/initializer-value'

const TSOA_DECORATOR_MODULES = new Set(['@tsoa-next/runtime', 'tsoa-next'])
const TSOA_DECORATOR_NAMES = new Set([
  'Body',
  'BodyProp',
  'Consumes',
  'Delete',
  'Deprecated',
  'Example',
  'Extension',
  'FormField',
  'Get',
  'Head',
  'Header',
  'Hidden',
  'Inject',
  'Middlewares',
  'NoSecurity',
  'OperationId',
  'Options',
  'Patch',
  'Path',
  'Post',
  'Produces',
  'Put',
  'Queries',
  'Query',
  'Request',
  'RequestProp',
  'Res',
  'Response',
  'Route',
  'Security',
  'SuccessResponse',
  'Tags',
  'UploadedFile',
  'UploadedFiles',
])

function tsHasDecorators(tsNamespace: typeof ts): tsNamespace is typeof ts & {
  canHaveDecorators(node: ts.Node): boolean
  getDecorators(node: ts.Node): readonly ts.Decorator[] | undefined
} {
  return typeof tsNamespace.canHaveDecorators === 'function'
}

export function getDecorators(node: ts.Node, isMatching: (identifier: ts.Identifier, canonicalName?: string) => boolean, typeChecker?: ts.TypeChecker) {
  // beginning in ts4.8 node.decorator is undefined, use getDecorators instead.
  const decorators = tsHasDecorators(ts) && ts.canHaveDecorators(node) ? ts.getDecorators(node) : []

  if (!decorators || !decorators.length) {
    return []
  }

  return decorators
    .map(decorator => getDecoratorIdentifier(decorator))
    .filter((identifier): identifier is ts.Identifier => !!identifier)
    .filter(identifier => {
      const canonicalName = typeChecker ? getCanonicalDecoratorName(identifier, typeChecker) : undefined
      return isMatching(identifier, canonicalName)
    })
}

export function getNodeFirstDecoratorName(node: ts.Node, isMatching: (identifier: ts.Identifier, canonicalName?: string) => boolean, typeChecker?: ts.TypeChecker) {
  const decorators = getDecorators(node, isMatching, typeChecker)
  if (!decorators || !decorators.length) {
    return
  }

  return typeChecker ? getCanonicalDecoratorName(decorators[0], typeChecker) : decorators[0].text
}

export function getNodeFirstDecoratorValue(node: ts.Node, typeChecker: ts.TypeChecker, isMatching: (identifier: ts.Identifier, canonicalName?: string) => boolean) {
  const decorators = getDecorators(node, isMatching, typeChecker)
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

export function isDecorator(node: ts.Node, isMatching: (identifier: ts.Identifier, canonicalName?: string) => boolean, typeChecker?: ts.TypeChecker) {
  const decorators = getDecorators(node, isMatching, typeChecker)
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
  const producesDecorators = getDecorators(node, (_identifier, canonicalName) => canonicalName === 'Produces', typeChecker)

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

function getDecoratorIdentifier(decorator: ts.Decorator): ts.Identifier | undefined {
  let expression: ts.Expression = decorator.expression

  while (ts.isCallExpression(expression) || ts.isPropertyAccessExpression(expression) || ts.isElementAccessExpression(expression) || ts.isParenthesizedExpression(expression)) {
    expression = expression.expression
  }

  return ts.isIdentifier(expression) ? expression : undefined
}

export function getCanonicalDecoratorName(identifier: ts.Identifier, typeChecker: ts.TypeChecker): string | undefined {
  const symbol = typeChecker.getSymbolAtLocation(identifier)
  if (!symbol) {
    return undefined
  }

  const resolvedSymbol = resolveAliasedSymbol(symbol, typeChecker)
  const candidateName = resolvedSymbol.getName()
  if (!TSOA_DECORATOR_NAMES.has(candidateName)) {
    return undefined
  }

  if (!isRuntimeDecoratorSymbol(symbol) && !isRuntimeDecoratorSymbol(resolvedSymbol)) {
    return undefined
  }

  return candidateName
}

function resolveAliasedSymbol(symbol: ts.Symbol, typeChecker: ts.TypeChecker): ts.Symbol {
  const visited = new Set<ts.Symbol>()
  let current = symbol

  while ((current.flags & ts.SymbolFlags.Alias) !== 0 && !visited.has(current)) {
    visited.add(current)
    const aliased = typeChecker.getAliasedSymbol(current)
    if (!aliased || aliased === current) {
      break
    }
    current = aliased
  }

  return current
}

function isRuntimeDecoratorSymbol(symbol: ts.Symbol): boolean {
  const declarations = symbol.declarations || (symbol.valueDeclaration ? [symbol.valueDeclaration] : [])

  return declarations.some(declaration => {
    const moduleSpecifier = getModuleSpecifierText(declaration)
    if (moduleSpecifier && TSOA_DECORATOR_MODULES.has(moduleSpecifier)) {
      return true
    }

    const sourceFileName = declaration.getSourceFile().fileName.replace(/\\/g, '/').toLowerCase()
    return (
      sourceFileName.includes('/packages/runtime/src/decorators/') ||
      sourceFileName.includes('/packages/runtime/dist/decorators/') ||
      sourceFileName.includes('/packages/tsoa/src/') ||
      sourceFileName.includes('/node_modules/@tsoa-next/runtime/') ||
      sourceFileName.includes('/node_modules/tsoa-next/')
    )
  })
}

function getModuleSpecifierText(declaration: ts.Declaration): string | undefined {
  if (ts.isImportSpecifier(declaration)) {
    const importDeclaration = declaration.parent.parent.parent
    if (ts.isImportDeclaration(importDeclaration) && ts.isStringLiteral(importDeclaration.moduleSpecifier)) {
      return importDeclaration.moduleSpecifier.text
    }
  }

  if (ts.isExportSpecifier(declaration)) {
    const exportDeclaration = declaration.parent.parent
    if (ts.isExportDeclaration(exportDeclaration) && exportDeclaration.moduleSpecifier && ts.isStringLiteral(exportDeclaration.moduleSpecifier)) {
      return exportDeclaration.moduleSpecifier.text
    }
  }

  return undefined
}
