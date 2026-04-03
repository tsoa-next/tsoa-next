import * as ts from 'typescript'
import { Tsoa } from '@tsoa-next/runtime'

const objectHasOwn = Object.hasOwn as (object: object, property: PropertyKey) => boolean
const hasInitializer = (node: ts.Node): node is ts.HasInitializer => objectHasOwn(node, 'initializer')
const extractInitializer = (decl?: ts.Declaration) => (decl && hasInitializer(decl) ? (decl.initializer as ts.Expression) : undefined)
const extractImportSpecifier = (symbol?: ts.Symbol): ts.ImportSpecifier | undefined => {
  const declaration = symbol?.declarations?.[0]
  return declaration && ts.isImportSpecifier(declaration) ? declaration : undefined
}
const isIterable = (obj: unknown): obj is Iterable<unknown> => obj != null && typeof (obj as Iterable<unknown>)[Symbol.iterator] === 'function'
const toSpreadableObject = (value: InitializerValue | DefinedInitializerValue): InitializerObjectValue => {
  const spreadableValue = Object(value) as Record<string, DefinedInitializerValue>
  return { ...spreadableValue } as InitializerObjectValue
}

export type InitializerObjectValue = { [key: string]: InitializerValue }
export type DefinedInitializerObjectValue = { [key: string]: DefinedInitializerValue }
export type InitializerValue = string | number | boolean | undefined | null | Date | InitializerValue[] | InitializerObjectValue
export type DefinedInitializerValue = string | number | boolean | null | Date | DefinedInitializerValue[] | DefinedInitializerObjectValue
export function isNonUndefinedInitializerValue(value: InitializerValue): value is DefinedInitializerValue {
  if (Array.isArray(value)) {
    return value.every(isNonUndefinedInitializerValue)
  } else if (value instanceof Date) {
    return true
  } else {
    return value !== undefined
  }
}

export function getInitializerValue(initializer?: ts.Expression | ts.ImportSpecifier, typeChecker?: ts.TypeChecker, type?: Tsoa.Type): InitializerValue | DefinedInitializerValue {
  if (!initializer || !typeChecker) {
    return undefined
  }

  switch (initializer.kind) {
    case ts.SyntaxKind.ArrayLiteralExpression: {
      return getArrayLiteralValue(initializer as ts.ArrayLiteralExpression, typeChecker)
    }
    case ts.SyntaxKind.StringLiteral:
    case ts.SyntaxKind.NoSubstitutionTemplateLiteral:
      return (initializer as ts.StringLiteral).text
    case ts.SyntaxKind.TrueKeyword:
      return true
    case ts.SyntaxKind.FalseKeyword:
      return false
    case ts.SyntaxKind.PrefixUnaryExpression: {
      return getPrefixUnaryValue(initializer as ts.PrefixUnaryExpression)
    }
    case ts.SyntaxKind.NumberKeyword:
    case ts.SyntaxKind.FirstLiteralToken:
      return Number((initializer as ts.NumericLiteral).text)
    case ts.SyntaxKind.NewExpression: {
      return getNewExpressionValue(initializer as ts.NewExpression, typeChecker, type)
    }
    case ts.SyntaxKind.NullKeyword:
      return null
    case ts.SyntaxKind.ObjectLiteralExpression: {
      return getObjectLiteralValue(initializer as ts.ObjectLiteralExpression, typeChecker)
    }
    case ts.SyntaxKind.ImportSpecifier: {
      return getImportSpecifierValue(initializer as ts.ImportSpecifier, typeChecker)
    }
    default: {
      const symbol = typeChecker.getSymbolAtLocation(initializer)
      return getInitializerValue(extractInitializer(symbol?.valueDeclaration) || extractImportSpecifier(symbol), typeChecker)
    }
  }
}

function getArrayLiteralValue(arrayLiteral: ts.ArrayLiteralExpression, typeChecker: ts.TypeChecker): InitializerValue[] {
  return arrayLiteral.elements.reduce((acc, element) => {
    if (ts.isSpreadElement(element)) {
      const spreadValue = getInitializerValue(element.expression, typeChecker)
      if (spreadValue && isIterable(spreadValue)) {
        return acc.concat(...spreadValue)
      }

      throw new Error(`${typeof spreadValue} is not iterable`)
    }

    acc.push(getInitializerValue(element, typeChecker))
    return acc
  }, [] as InitializerValue[])
}

function getPrefixUnaryValue(prefixUnary: ts.PrefixUnaryExpression): number {
  switch (prefixUnary.operator) {
    case ts.SyntaxKind.PlusToken:
      return Number((prefixUnary.operand as ts.NumericLiteral).text)
    case ts.SyntaxKind.MinusToken:
      return Number(`-${(prefixUnary.operand as ts.NumericLiteral).text}`)
    default:
      throw new Error(`Unsupport prefix operator token: ${prefixUnary.operator}`)
  }
}

function getNewExpressionValue(newExpression: ts.NewExpression, typeChecker: ts.TypeChecker, type?: Tsoa.Type): InitializerValue | DefinedInitializerValue {
  const ident = newExpression.expression as ts.Identifier
  if (ident.text !== 'Date') {
    return undefined
  }

  let date = new Date()
  if (newExpression.arguments) {
    const argsValue = newExpression.arguments.filter(args => args.kind !== undefined).map(args => getInitializerValue(args, typeChecker))
    if (argsValue.length > 0) {
      date = new Date(argsValue as unknown as ConstructorParameters<DateConstructor>[0])
    }
  }

  const dateString = date.toISOString()
  if (type?.dataType === 'date') {
    return dateString.split('T')[0]
  }

  return dateString
}

function getObjectLiteralValue(objectLiteral: ts.ObjectLiteralExpression, typeChecker: ts.TypeChecker): InitializerObjectValue {
  const nestedObject: InitializerObjectValue = {}
  objectLiteral.properties.forEach(property => {
    if (ts.isSpreadAssignment(property)) {
      const spreadValue = getInitializerValue(property.expression, typeChecker)
      if (spreadValue) {
        Object.assign(nestedObject, toSpreadableObject(spreadValue))
      }
      return
    }

    if (ts.isPropertyAssignment(property)) {
      nestedObject[property.name.getText()] = getInitializerValue(property.initializer, typeChecker)
      return
    }

    if (ts.isShorthandPropertyAssignment(property)) {
      const shorthandSymbol = typeChecker.getShorthandAssignmentValueSymbol(property)
      nestedObject[property.name.getText()] = getInitializerValue(extractInitializer(shorthandSymbol?.valueDeclaration) || extractImportSpecifier(shorthandSymbol), typeChecker)
      return
    }

    throw new Error(`Unsupported object literal property kind: ${ts.SyntaxKind[property.kind]}`)
  })

  return nestedObject
}

function getImportSpecifierValue(importSpecifier: ts.ImportSpecifier, typeChecker: ts.TypeChecker): InitializerValue | DefinedInitializerValue {
  const importSymbol = typeChecker.getSymbolAtLocation(importSpecifier.name)
  if (!importSymbol) {
    return undefined
  }

  const aliasedSymbol = typeChecker.getAliasedSymbol(importSymbol)
  const declaration = aliasedSymbol.getDeclarations()?.[0]
  return getInitializerValue(extractInitializer(declaration), typeChecker)
}
