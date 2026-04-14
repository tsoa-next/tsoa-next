import { getDecorators, getDecoratorValues, getProduces, getSecurites } from './../utils/decoratorUtils'
import { GenerateMetadataError } from './exceptions'
import { MetadataGenerator } from './metadataGenerator'
import { MethodGenerator } from './methodGenerator'
import { Context, TypeResolver } from './typeResolver'
import { Tsoa } from '@tsoa-next/runtime'
import { getHeaderType } from '../utils/headerTypeHelpers'
import {
  SymbolFlags,
  SyntaxKind,
  isComputedPropertyName,
  isImportSpecifier,
  isClassDeclaration,
  isIdentifier,
  isMethodDeclaration,
  isNumericLiteral,
  isPrefixUnaryExpression,
  isTypeReferenceNode,
  type ExpressionWithTypeArguments,
  type ClassDeclaration,
  type MethodDeclaration,
  type CallExpression,
  type StringLiteral,
  type Type,
  isStringLiteralLike,
} from 'typescript'

type InheritedMethod = {
  context: Context
  method: MethodDeclaration
  resolvedMethodType?: Type
}

type InheritedClass = {
  classDeclaration: ClassDeclaration
  context: Context
  resolvedType?: Type
}

export class ControllerGenerator {
  private readonly path?: string
  private readonly tags?: string[]
  private readonly security?: Tsoa.Security[]
  private readonly isHidden?: boolean
  private readonly commonResponses: Tsoa.Response[]
  private readonly produces?: string[]

  constructor(
    private readonly node: ClassDeclaration,
    private readonly current: MetadataGenerator,
    private readonly parentSecurity: Tsoa.Security[] = [],
  ) {
    this.path = this.getPath()
    this.tags = this.getTags()
    this.security = this.getSecurity()
    this.isHidden = this.getIsHidden()
    this.commonResponses = this.getCommonResponses()
    this.produces = this.getProduces()
  }

  public IsValid() {
    return !!this.path || this.path === ''
  }

  public Generate(): Tsoa.Controller {
    if (!this.node.parent) {
      throw new GenerateMetadataError("Controller node doesn't have a valid parent source file.")
    }
    if (!this.node.name) {
      throw new GenerateMetadataError("Controller node doesn't have a valid name.")
    }

    const sourceFile = this.node.parent.getSourceFile()
    const hasSpecPaths = this.hasSpecPaths()

    return {
      ...(hasSpecPaths ? { hasSpecPaths: true } : {}),
      location: sourceFile.fileName,
      methods: this.buildMethods(),
      name: this.node.name.text,
      path: this.path || '',
      produces: this.produces,
    }
  }

  private buildMethods() {
    return this.getMethodsWithInheritedMethods()
      .map(
        ({ method, context, resolvedMethodType }) => new MethodGenerator(method, this.current, this.commonResponses, this.path, this.tags, this.security, this.isHidden, context, resolvedMethodType),
      )
      .filter(generator => generator.IsValid())
      .map(generator => generator.Generate())
  }

  private getMethodsWithInheritedMethods(): InheritedMethod[] {
    const inheritanceChain = this.getInheritanceChainForRoutes()
    if (inheritanceChain.length === 1) {
      return this.node.members.filter(isMethodDeclaration).map(method => ({ context: {}, method }))
    }

    // Process from base to derived so derived classes can override inherited names.
    const methodsByName = new Map<string, InheritedMethod>()
    ;[...inheritanceChain].reverse().forEach(({ classDeclaration, context, resolvedType }) => {
      classDeclaration.members.filter(isMethodDeclaration).forEach(method => {
        const key = this.getMethodKey(method)
        if (!key) {
          return
        }
        methodsByName.set(key, {
          context,
          method,
          resolvedMethodType: classDeclaration === this.node ? undefined : this.getResolvedMethodType(resolvedType, method),
        })
      })
    })

    return [...methodsByName.values()]
  }

  private getInheritanceChainForRoutes(): InheritedClass[] {
    const chain: InheritedClass[] = [
      {
        classDeclaration: this.node,
        context: {},
        resolvedType: this.node.name ? this.current.typeChecker.getTypeAtLocation(this.node.name) : undefined,
      },
    ]
    let hasRuntimeControllerBase = false
    let currentClass: InheritedClass | undefined = chain[0]

    while (currentClass) {
      const { baseClass, baseContext, baseResolvedType, extendsRuntimeController } = this.getDirectBaseClassInfo(currentClass.classDeclaration, currentClass.context)
      if (extendsRuntimeController) {
        hasRuntimeControllerBase = true
        break
      }

      if (!baseClass) {
        break
      }

      currentClass = {
        classDeclaration: baseClass,
        context: baseContext,
        resolvedType: baseResolvedType,
      }
      chain.push(currentClass)
    }

    return hasRuntimeControllerBase ? chain : [chain[0]]
  }

  private getDirectBaseClassInfo(
    classDeclaration: ClassDeclaration,
    context: Context,
  ): { baseClass?: ClassDeclaration; baseContext: Context; baseResolvedType?: Type; extendsRuntimeController: boolean } {
    const extendsClause = classDeclaration.heritageClauses?.find(clause => clause.token === SyntaxKind.ExtendsKeyword)
    const extendsType = extendsClause?.types[0]
    if (!extendsType) {
      return { baseContext: context, extendsRuntimeController: false }
    }

    if (this.extendsRuntimeController(extendsType)) {
      return { baseContext: context, extendsRuntimeController: true }
    }

    const expression = extendsType.expression
    const symbols = [this.current.typeChecker.getSymbolAtLocation(expression), this.current.typeChecker.getTypeAtLocation(expression).getSymbol()].filter(
      (symbol): symbol is NonNullable<typeof symbol> => !!symbol,
    )

    const symbolsToSearch = new Set(symbols)
    symbols.forEach(symbol => {
      if (symbol.flags & SymbolFlags.Alias) {
        symbolsToSearch.add(this.current.typeChecker.getAliasedSymbol(symbol))
      }
    })

    for (const symbol of symbolsToSearch) {
      const declarations = symbol.declarations || (symbol.valueDeclaration ? [symbol.valueDeclaration] : [])
      const classDeclarationNode = declarations.find(isClassDeclaration)
      if (classDeclarationNode) {
        return {
          baseClass: classDeclarationNode,
          baseContext: this.getInheritedClassContext(extendsType, classDeclarationNode, context),
          baseResolvedType: this.current.typeChecker.getTypeAtLocation(extendsType),
          extendsRuntimeController: false,
        }
      }
    }

    return { baseContext: context, extendsRuntimeController: false }
  }

  private getInheritedClassContext(extendsType: ExpressionWithTypeArguments, baseClass: ClassDeclaration, context: Context): Context {
    let nextContext: Context = { ...context }
    const typeParameters = baseClass.typeParameters
    if (!typeParameters?.length) {
      return nextContext
    }

    for (let index = 0; index < typeParameters.length; index += 1) {
      const typeParameter = typeParameters[index]
      const typeArgument = extendsType.typeArguments?.[index]
      let resolvedType: import('typescript').TypeNode
      let name: string | undefined
      let resolvedTsType: Type | undefined

      if (typeArgument && isTypeReferenceNode(typeArgument) && isIdentifier(typeArgument.typeName) && context[typeArgument.typeName.text]) {
        const contextualType = context[typeArgument.typeName.text]
        resolvedType = contextualType.type
        name = contextualType.name
        resolvedTsType = contextualType.resolvedType
      } else if (typeArgument) {
        resolvedType = typeArgument
        resolvedTsType = this.current.typeChecker.getTypeFromTypeNode(resolvedType)
      } else if (typeParameter.default) {
        resolvedType = typeParameter.default
        resolvedTsType = this.current.typeChecker.getTypeFromTypeNode(resolvedType)
      } else {
        throw new GenerateMetadataError(`Could not find a value for type parameter ${typeParameter.name.text}`, extendsType)
      }

      nextContext = {
        ...nextContext,
        [typeParameter.name.text]: {
          name: name || this.current.typeChecker.typeToString(this.current.typeChecker.getTypeFromTypeNode(resolvedType)),
          resolvedType: resolvedTsType,
          type: resolvedType,
        },
      }
    }

    return nextContext
  }

  private getResolvedMethodType(type: Type | undefined, method: MethodDeclaration): Type | undefined {
    if (!type) {
      return undefined
    }

    const key = this.getMethodKey(method)
    if (!key) {
      return undefined
    }

    const symbol = type.getProperty(key)
    if (!symbol) {
      return undefined
    }

    return this.current.typeChecker.getTypeOfSymbolAtLocation(symbol, method)
  }

  private extendsRuntimeController(extendsType: ExpressionWithTypeArguments): boolean {
    const expression = extendsType.expression
    const symbol = this.current.typeChecker.getSymbolAtLocation(expression) || this.current.typeChecker.getTypeAtLocation(expression).getSymbol()
    if (!symbol) {
      return false
    }

    const symbolsToSearch = new Set([symbol])
    let currentSymbol = symbol

    while (currentSymbol.flags & SymbolFlags.Alias) {
      const aliasedSymbol = this.current.typeChecker.getAliasedSymbol(currentSymbol)
      if (!aliasedSymbol || aliasedSymbol === currentSymbol) {
        break
      }

      symbolsToSearch.add(aliasedSymbol)
      currentSymbol = aliasedSymbol
    }

    return [...symbolsToSearch].some(candidateSymbol => {
      const declarations = candidateSymbol.declarations || (candidateSymbol.valueDeclaration ? [candidateSymbol.valueDeclaration] : [])
      return declarations.some(declaration => {
        const sourceFileName = declaration.getSourceFile().fileName.replaceAll('\\', '/').toLowerCase()
        if (
          sourceFileName.endsWith('/packages/runtime/src/interfaces/controller.ts') ||
          sourceFileName.endsWith('/packages/runtime/dist/interfaces/controller.d.ts') ||
          sourceFileName.endsWith('/packages/runtime/dist/interfaces/controller.js') ||
          sourceFileName.endsWith('/node_modules/@tsoa-next/runtime/dist/interfaces/controller.d.ts') ||
          sourceFileName.endsWith('/node_modules/@tsoa-next/runtime/dist/interfaces/controller.js')
        ) {
          return true
        }

        if (!isImportSpecifier(declaration)) {
          return false
        }

        const importedName = declaration.propertyName?.text || declaration.name.text
        if (importedName !== 'Controller') {
          return false
        }

        const moduleSpecifier = this.getImportModuleSpecifier(declaration)
        return moduleSpecifier === '@tsoa-next/runtime' || moduleSpecifier === 'tsoa-next'
      })
    })
  }

  private getMethodKey(method: MethodDeclaration): string | undefined {
    if (!method.name) {
      return undefined
    }

    if (isIdentifier(method.name) || isStringLiteralLike(method.name) || isNumericLiteral(method.name)) {
      return method.name.text
    }

    if (isComputedPropertyName(method.name)) {
      const expression = method.name.expression
      if (isStringLiteralLike(expression) || isNumericLiteral(expression)) {
        return expression.text
      }

      if (isPrefixUnaryExpression(expression) && expression.operator === SyntaxKind.MinusToken && isNumericLiteral(expression.operand)) {
        return `-${expression.operand.text}`
      }
    }

    return method.name.getText()
  }

  private getImportModuleSpecifier(declaration: import('typescript').ImportSpecifier) {
    // ImportSpecifier -> NamedImports -> ImportClause -> ImportDeclaration
    const importDeclaration = declaration.parent.parent.parent
    return 'moduleSpecifier' in importDeclaration && isStringLiteralLike(importDeclaration.moduleSpecifier) ? importDeclaration.moduleSpecifier.text : undefined
  }

  private getPath() {
    const decorators = getDecorators(this.node, (_identifier, canonicalName) => canonicalName === 'Route', this.current.typeChecker)
    if (!decorators?.length) {
      return undefined
    }
    if (decorators.length > 1) {
      throw new GenerateMetadataError(`Only one Route decorator allowed in '${this.node.name!.text}' class.`)
    }

    const decorator = decorators[0]
    const expression = decorator.parent as CallExpression
    const decoratorArgument = expression.arguments[0] as StringLiteral
    return decoratorArgument ? `${decoratorArgument.text}` : ''
  }

  private getCommonResponses(): Tsoa.Response[] {
    const decorators = getDecorators(this.node, (_identifier, canonicalName) => canonicalName === 'Response', this.current.typeChecker)
    if (!decorators?.length) {
      return []
    }

    return decorators.map(decorator => {
      const expression = decorator.parent as CallExpression

      const [name, description, example] = getDecoratorValues(decorator, this.current.typeChecker)
      if (!name) {
        throw new GenerateMetadataError(`Controller's responses should have an explicit name.`)
      }

      return {
        description: description || '',
        examples: example === undefined ? undefined : [example],
        name,
        schema: expression.typeArguments && expression.typeArguments.length > 0 && !this.isHidden ? new TypeResolver(expression.typeArguments[0], this.current).resolve() : undefined,
        headers: getHeaderType(expression.typeArguments, 1, this.current),
      } as Tsoa.Response
    })
  }

  private getTags() {
    const decorators = getDecorators(this.node, (_identifier, canonicalName) => canonicalName === 'Tags', this.current.typeChecker)
    if (!decorators?.length) {
      return undefined
    }
    if (decorators.length > 1) {
      throw new GenerateMetadataError(`Only one Tags decorator allowed in '${this.node.name!.text}' class.`)
    }

    const decorator = decorators[0]
    const expression = decorator.parent as CallExpression

    return expression.arguments.filter(isStringLiteralLike).map(argument => argument.text)
  }

  private getSecurity(): Tsoa.Security[] {
    const noSecurityDecorators = getDecorators(this.node, (_identifier, canonicalName) => canonicalName === 'NoSecurity', this.current.typeChecker)
    const securityDecorators = getDecorators(this.node, (_identifier, canonicalName) => canonicalName === 'Security', this.current.typeChecker)

    if (noSecurityDecorators?.length && securityDecorators?.length) {
      throw new GenerateMetadataError(`NoSecurity decorator cannot be used in conjunction with Security decorator in '${this.node.name!.text}' class.`)
    }

    if (noSecurityDecorators?.length) {
      return []
    }

    if (!securityDecorators?.length) {
      return this.parentSecurity
    }

    return securityDecorators.map(d => getSecurites(d, this.current.typeChecker))
  }

  private getIsHidden(): boolean {
    const hiddenDecorators = getDecorators(this.node, (_identifier, canonicalName) => canonicalName === 'Hidden', this.current.typeChecker)
    if (!hiddenDecorators?.length) {
      return false
    }
    if (hiddenDecorators.length > 1) {
      throw new GenerateMetadataError(`Only one Hidden decorator allowed in '${this.node.name!.text}' class.`)
    }

    return true
  }

  private getProduces(): string[] | undefined {
    const produces = getProduces(this.node, this.current.typeChecker)
    return produces.length ? produces : undefined
  }

  private hasSpecPaths(): boolean {
    let currentClass: ClassDeclaration | undefined = this.node

    while (currentClass) {
      if (getDecorators(currentClass, (_identifier, canonicalName) => canonicalName === 'SpecPath', this.current.typeChecker).length > 0) {
        return true
      }

      currentClass = this.getDirectBaseClassInfo(currentClass, {}).baseClass
    }

    return false
  }
}
