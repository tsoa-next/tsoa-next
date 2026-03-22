import { getDecorators, getDecoratorValues, getProduces, getSecurites } from './../utils/decoratorUtils'
import { GenerateMetadataError } from './exceptions'
import { MetadataGenerator } from './metadataGenerator'
import { MethodGenerator } from './methodGenerator'
import { TypeResolver } from './typeResolver'
import { Tsoa } from '@tsoa-next/runtime'
import { getHeaderType } from '../utils/headerTypeHelpers'
import {
  SymbolFlags,
  SyntaxKind,
  isImportSpecifier,
  isClassDeclaration,
  isIdentifier,
  isMethodDeclaration,
  type ExpressionWithTypeArguments,
  type ClassDeclaration,
  type MethodDeclaration,
  type CallExpression,
  type StringLiteral,
  isStringLiteralLike,
} from 'typescript'

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

    return {
      location: sourceFile.fileName,
      methods: this.buildMethods(),
      name: this.node.name.text,
      path: this.path || '',
      produces: this.produces,
    }
  }

  private buildMethods() {
    return this.getMethodsWithInheritedMethods()
      .map(m => new MethodGenerator(m, this.current, this.commonResponses, this.path, this.tags, this.security, this.isHidden))
      .filter(generator => generator.IsValid())
      .map(generator => generator.Generate())
  }

  private getMethodsWithInheritedMethods(): MethodDeclaration[] {
    const inheritanceChain = this.getInheritanceChainForRoutes()
    if (inheritanceChain.length === 1) {
      return this.node.members.filter(isMethodDeclaration)
    }

    // Process from base to derived so derived classes can override inherited names.
    const methodsByName = new Map<string, MethodDeclaration>()
    inheritanceChain.reverse().forEach(classDeclaration => {
      classDeclaration.members.filter(isMethodDeclaration).forEach(method => {
        const key = this.getMethodKey(method)
        if (!key) {
          return
        }
        methodsByName.set(key, method)
      })
    })

    return [...methodsByName.values()]
  }

  private getInheritanceChainForRoutes(): ClassDeclaration[] {
    const chain: ClassDeclaration[] = [this.node]
    let hasRuntimeControllerBase = false
    let currentClass: ClassDeclaration | undefined = this.node

    while (currentClass) {
      const { baseClass, extendsRuntimeController } = this.getDirectBaseClassInfo(currentClass)
      if (extendsRuntimeController) {
        hasRuntimeControllerBase = true
        break
      }

      if (!baseClass) {
        break
      }

      chain.push(baseClass)
      currentClass = baseClass
    }

    return hasRuntimeControllerBase ? chain : [this.node]
  }

  private getDirectBaseClassInfo(classDeclaration: ClassDeclaration): { baseClass?: ClassDeclaration; extendsRuntimeController: boolean } {
    const extendsClause = classDeclaration.heritageClauses?.find(clause => clause.token === SyntaxKind.ExtendsKeyword)
    const extendsType = extendsClause?.types[0]
    if (!extendsType) {
      return { extendsRuntimeController: false }
    }

    if (this.extendsRuntimeController(extendsType)) {
      return { extendsRuntimeController: true }
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
        return { baseClass: classDeclarationNode, extendsRuntimeController: false }
      }
    }

    return { extendsRuntimeController: false }
  }

  private extendsRuntimeController(extendsType: ExpressionWithTypeArguments): boolean {
    const expression = extendsType.expression
    const symbol = this.current.typeChecker.getSymbolAtLocation(expression) || this.current.typeChecker.getTypeAtLocation(expression).getSymbol()
    if (!symbol) {
      return false
    }

    if (!(symbol.flags & SymbolFlags.Alias)) {
      return false
    }

    const aliasDeclarations = symbol.declarations || []
    return aliasDeclarations.some(declaration => {
      if (!isImportSpecifier(declaration)) {
        return false
      }

      const importedName = declaration.propertyName?.text || declaration.name.text
      if (importedName !== 'Controller') {
        return false
      }

      const moduleSpecifier = this.getImportModuleSpecifier(declaration)
      if (!moduleSpecifier) {
        return false
      }
      return moduleSpecifier.getText().replace(/['"]/g, '') === '@tsoa-next/runtime'
    })
  }

  private getMethodKey(method: MethodDeclaration): string | undefined {
    if (!method.name) {
      return undefined
    }
    return isIdentifier(method.name) ? method.name.text : method.name.getText()
  }

  private getImportModuleSpecifier(declaration: import('typescript').ImportSpecifier) {
    // ImportSpecifier -> NamedImports -> ImportClause -> ImportDeclaration
    const importDeclaration = declaration.parent.parent.parent
    return 'moduleSpecifier' in importDeclaration ? importDeclaration.moduleSpecifier : undefined
  }

  private getPath() {
    const decorators = getDecorators(this.node, (_identifier, canonicalName) => canonicalName === 'Route', this.current.typeChecker)
    if (!decorators || !decorators.length) {
      return
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
    if (!decorators || !decorators.length) {
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
    if (!decorators || !decorators.length) {
      return
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

    if (!securityDecorators || !securityDecorators.length) {
      return this.parentSecurity
    }

    return securityDecorators.map(d => getSecurites(d, this.current.typeChecker))
  }

  private getIsHidden(): boolean {
    const hiddenDecorators = getDecorators(this.node, (_identifier, canonicalName) => canonicalName === 'Hidden', this.current.typeChecker)
    if (!hiddenDecorators || !hiddenDecorators.length) {
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
}
