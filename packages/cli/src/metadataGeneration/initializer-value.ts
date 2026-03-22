import * as ts from 'typescript'
import { Tsoa } from '@tsoa-next/runtime'

const hasInitializer = (node: ts.Node): node is ts.HasInitializer => Object.prototype.hasOwnProperty.call(node, 'initializer')
const extractInitializer = (decl?: ts.Declaration) => (decl && hasInitializer(decl) && (decl.initializer as ts.Expression)) || undefined
const extractImportSpecifier = (symbol?: ts.Symbol): ts.ImportSpecifier | undefined =>
  symbol?.declarations && symbol.declarations.length > 0 && ts.isImportSpecifier(symbol.declarations[0]) ? symbol.declarations[0] : undefined
const isIterable = (obj: unknown): obj is Iterable<unknown> => obj != null && typeof (obj as Iterable<unknown>)[Symbol.iterator] === 'function'
const toSpreadableObject = (value: InitializerValue | DefinedInitializerValue): InitializerObjectValue =>
  Object.entries(Object.assign({}, value)).reduce<InitializerObjectValue>((acc, [key, entryValue]) => {
    acc[key] = entryValue as DefinedInitializerValue
    return acc
  }, {})

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
    return
  }

  switch (initializer.kind) {
    case ts.SyntaxKind.ArrayLiteralExpression: {
      const arrayLiteral = initializer as ts.ArrayLiteralExpression
      return arrayLiteral.elements.reduce((acc, element) => {
        if (ts.isSpreadElement(element)) {
          const spreadValue = getInitializerValue(element.expression, typeChecker)
          if (spreadValue && isIterable(spreadValue)) {
            return acc.concat(...spreadValue)
          } else {
            throw new Error(`${typeof spreadValue} is not iterable`)
          }
        } else {
          acc.push(getInitializerValue(element, typeChecker))
        }
        return acc
      }, [] as InitializerValue[])
    }
    case ts.SyntaxKind.StringLiteral:
    case ts.SyntaxKind.NoSubstitutionTemplateLiteral:
      return (initializer as ts.StringLiteral).text
    case ts.SyntaxKind.TrueKeyword:
      return true
    case ts.SyntaxKind.FalseKeyword:
      return false
    case ts.SyntaxKind.PrefixUnaryExpression: {
      const prefixUnary = initializer as ts.PrefixUnaryExpression
      switch (prefixUnary.operator) {
        case ts.SyntaxKind.PlusToken:
          return Number((prefixUnary.operand as ts.NumericLiteral).text)
        case ts.SyntaxKind.MinusToken:
          return Number(`-${(prefixUnary.operand as ts.NumericLiteral).text}`)
        default:
          throw new Error(`Unsupport prefix operator token: ${prefixUnary.operator}`)
      }
    }
    case ts.SyntaxKind.NumberKeyword:
    case ts.SyntaxKind.FirstLiteralToken:
      return Number((initializer as ts.NumericLiteral).text)
    case ts.SyntaxKind.NewExpression: {
      const newExpression = initializer as ts.NewExpression
      const ident = newExpression.expression as ts.Identifier

        if (ident.text === 'Date') {
          let date = new Date()
          if (newExpression.arguments) {
          const newArguments = newExpression.arguments.filter(args => args.kind !== undefined)
          const argsValue = newArguments.map(args => getInitializerValue(args, typeChecker))
          if (argsValue.length > 0) {
            date = new Date(argsValue as unknown as ConstructorParameters<DateConstructor>[0])
          }
          }
        const dateString = date.toISOString()
        if (type && type.dataType === 'date') {
          return dateString.split('T')[0]
        }
        return dateString
      }
      return
    }
    case ts.SyntaxKind.NullKeyword:
      return null
    case ts.SyntaxKind.ObjectLiteralExpression: {
      const objectLiteral = initializer as ts.ObjectLiteralExpression
      const nestedObject: InitializerObjectValue = {}
      objectLiteral.properties.forEach(p => {
        if (ts.isSpreadAssignment(p)) {
          const spreadValue = getInitializerValue(p.expression, typeChecker)
          if (spreadValue) {
            Object.assign(nestedObject, toSpreadableObject(spreadValue))
          }
        } else if (ts.isPropertyAssignment(p)) {
          nestedObject[p.name.getText()] = getInitializerValue(p.initializer, typeChecker)
        } else if (ts.isShorthandPropertyAssignment(p)) {
          const shorthandSymbol = typeChecker.getShorthandAssignmentValueSymbol(p)
          nestedObject[p.name.getText()] = getInitializerValue(extractInitializer(shorthandSymbol?.valueDeclaration) || extractImportSpecifier(shorthandSymbol), typeChecker)
        } else {
          throw new Error(`Unsupported object literal property kind: ${ts.SyntaxKind[p.kind]}`)
        }
      })
      return nestedObject
    }
    case ts.SyntaxKind.ImportSpecifier: {
      const importSpecifier = initializer as ts.ImportSpecifier
      const importSymbol = typeChecker.getSymbolAtLocation(importSpecifier.name)
      if (!importSymbol) return
      const aliasedSymbol = typeChecker.getAliasedSymbol(importSymbol)
      const declarations = aliasedSymbol.getDeclarations()
      const declaration = declarations && declarations.length > 0 ? declarations[0] : undefined
      return getInitializerValue(extractInitializer(declaration), typeChecker)
    }
    default: {
      const symbol = typeChecker.getSymbolAtLocation(initializer)
      return getInitializerValue(extractInitializer(symbol?.valueDeclaration) || extractImportSpecifier(symbol), typeChecker)
    }
  }
}
