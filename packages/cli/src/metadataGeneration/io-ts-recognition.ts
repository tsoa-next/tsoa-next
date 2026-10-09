import * as ts from 'typescript'

export type IoTsUtilityType = 'TypeOf' | 'Branded' | 'Brand'

const symbolModuleOriginCache = new WeakMap<ts.TypeChecker, WeakMap<ts.Symbol, Map<string, boolean>>>()
const ioTsUtilityTypeCache = new WeakMap<ts.TypeChecker, WeakMap<ts.Symbol, IoTsUtilityType | false>>()

const getSymbolModuleOriginCache = (typeChecker: ts.TypeChecker): WeakMap<ts.Symbol, Map<string, boolean>> => {
  let cache = symbolModuleOriginCache.get(typeChecker)
  if (!cache) {
    cache = new WeakMap<ts.Symbol, Map<string, boolean>>()
    symbolModuleOriginCache.set(typeChecker, cache)
  }

  return cache
}

const getIoTsUtilityTypeCache = (typeChecker: ts.TypeChecker): WeakMap<ts.Symbol, IoTsUtilityType | false> => {
  let cache = ioTsUtilityTypeCache.get(typeChecker)
  if (!cache) {
    cache = new WeakMap<ts.Symbol, IoTsUtilityType | false>()
    ioTsUtilityTypeCache.set(typeChecker, cache)
  }

  return cache
}

export function isIoTsBrandMarker(typeNode: ts.TypeNode, typeChecker: ts.TypeChecker): boolean {
  return ts.isTypeReferenceNode(typeNode) && getIoTsUtilityType(typeNode.typeName, typeChecker) === 'Brand'
}

export function getIoTsUtilityType(typeName: ts.EntityName, typeChecker: ts.TypeChecker): IoTsUtilityType | undefined {
  const symbolNode = ts.isQualifiedName(typeName) ? typeName.right : typeName
  const symbolName = symbolNode.text
  if (symbolName !== 'TypeOf' && symbolName !== 'Branded' && symbolName !== 'Brand') {
    return undefined
  }

  if (ts.isQualifiedName(typeName) && entityNameComesFromModule(typeName.left, typeChecker, 'io-ts')) {
    return symbolName
  }

  const symbol = typeChecker.getSymbolAtLocation(symbolNode)
  if (!symbol) {
    return undefined
  }

  return getIoTsUtilityTypeFromSymbol(symbol, typeChecker)
}

function entityNameComesFromModule(entityName: ts.EntityName, typeChecker: ts.TypeChecker, moduleName: string): boolean {
  const symbolNode = ts.isQualifiedName(entityName) ? entityName.right : entityName
  const symbol = typeChecker.getSymbolAtLocation(symbolNode)
  return !!symbol && symbolComesFromModule(symbol, typeChecker, moduleName)
}

export function getIoTsUtilityTypeFromSymbol(symbol: ts.Symbol | undefined, typeChecker: ts.TypeChecker, visited: Set<ts.Symbol> = new Set()): IoTsUtilityType | undefined {
  if (!symbol || visited.has(symbol)) {
    return undefined
  }

  const cache = getIoTsUtilityTypeCache(typeChecker)
  if (cache.has(symbol)) {
    const cachedType = cache.get(symbol)
    return cachedType || undefined
  }

  visited.add(symbol)

  if ((symbol.flags & ts.SymbolFlags.Alias) !== 0) {
    const aliasedSymbol = typeChecker.getAliasedSymbol(symbol)
    const aliasedType = getIoTsUtilityTypeFromSymbol(aliasedSymbol, typeChecker, visited)
    if (aliasedType) {
      cache.set(symbol, aliasedType)
      return aliasedType
    }
  }

  const symbolName = symbol.getName()
  if ((symbolName === 'TypeOf' || symbolName === 'Branded' || symbolName === 'Brand') && symbolComesFromModule(symbol, typeChecker, 'io-ts')) {
    cache.set(symbol, symbolName)
    return symbolName
  }

  cache.set(symbol, false)
  return undefined
}

export function symbolComesFromModule(symbol: ts.Symbol, typeChecker: ts.TypeChecker, moduleName: string, visited: Set<ts.Symbol> = new Set()): boolean {
  if (visited.has(symbol)) {
    return false
  }

  const moduleCache = getSymbolModuleOriginCache(typeChecker)
  const cachedByModule = moduleCache.get(symbol)
  const cachedResult = cachedByModule?.get(moduleName)
  if (cachedResult !== undefined) {
    return cachedResult
  }

  visited.add(symbol)

  const comesFromModule = symbolDeclarationsComeFromModule(symbol, moduleName) || aliasedSymbolComesFromModule(symbol, typeChecker, moduleName, visited)
  if (cachedByModule) {
    cachedByModule.set(moduleName, comesFromModule)
  } else {
    moduleCache.set(symbol, new Map([[moduleName, comesFromModule]]))
  }

  return comesFromModule
}

function symbolDeclarationsComeFromModule(symbol: ts.Symbol, moduleName: string): boolean {
  const declarations = symbol.declarations || (symbol.valueDeclaration ? [symbol.valueDeclaration] : [])
  return declarations.some(declaration => declarationComesFromModule(declaration, moduleName))
}

function declarationComesFromModule(declaration: ts.Declaration, moduleName: string): boolean {
  const containingImportModuleSpecifier = getContainingImportModuleSpecifier(declaration)
  if (containingImportModuleSpecifier === moduleName) {
    return true
  }

  const fileName = declaration.getSourceFile().fileName.replaceAll('\\', '/')
  return fileName.includes(`/node_modules/${moduleName}/`)
}

function getContainingImportModuleSpecifier(node: ts.Node): string | undefined {
  let current: ts.Node | undefined = node.parent
  while (current && !ts.isImportDeclaration(current)) {
    current = current.parent
  }

  return current && ts.isStringLiteral(current.moduleSpecifier) ? current.moduleSpecifier.text : undefined
}

function aliasedSymbolComesFromModule(symbol: ts.Symbol, typeChecker: ts.TypeChecker, moduleName: string, visited: Set<ts.Symbol>): boolean {
  if ((symbol.flags & ts.SymbolFlags.Alias) === 0) {
    return false
  }

  const aliasedSymbol = typeChecker.getAliasedSymbol(symbol)
  return aliasedSymbol !== symbol && symbolComesFromModule(aliasedSymbol, typeChecker, moduleName, visited)
}
