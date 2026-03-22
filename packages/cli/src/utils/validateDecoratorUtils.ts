import * as ts from 'typescript'
import { Tsoa } from '@tsoa-next/runtime'
import { getDecorators } from './decoratorUtils'
import { GenerateMetadataError } from '../metadataGeneration/exceptions'

const SUPPORTED_VALIDATE_TARGETS = new Set<Tsoa.Parameter['in']>(['body', 'body-prop', 'query', 'queries', 'path', 'header', 'formData'])
const VALIDATOR_MODULE_KIND_MAP: Record<string, Tsoa.ExternalValidatorKind> = {
  'io-ts': 'io-ts',
  'io-ts-types': 'io-ts',
  joi: 'joi',
  superstruct: 'superstruct',
  yup: 'yup',
  zod: 'zod',
}

type ValidateDecoratorParseResult = {
  validationStrategy: Tsoa.ValidationStrategy
  externalValidator: Tsoa.ExternalValidatorDescriptor
}

function isExternalValidatorKind(value: unknown): value is Tsoa.ExternalValidatorKind {
  return value === 'zod' || value === 'joi' || value === 'yup' || value === 'superstruct' || value === 'io-ts'
}

function getValidateDecorator(parameter: ts.ParameterDeclaration, typeChecker: ts.TypeChecker): ts.Decorator | undefined {
  const decorators = getDecorators(parameter, (_identifier, canonicalName) => canonicalName === 'Validate', typeChecker)
  if (decorators.length > 1) {
    throw new GenerateMetadataError('Only one @Validate decorator is allowed per parameter.', parameter)
  }

  const decoratorIdentifier = decorators[0]
  if (!decoratorIdentifier) {
    return undefined
  }

  let current: ts.Node | undefined = decoratorIdentifier
  while (current && !ts.isDecorator(current)) {
    current = current.parent
  }

  return current
}

function getModuleKindFromImportDeclaration(declaration: ts.Declaration): Tsoa.ExternalValidatorKind | undefined {
  if (ts.isImportSpecifier(declaration)) {
    const importDeclaration = declaration.parent.parent.parent
    if (ts.isImportDeclaration(importDeclaration) && ts.isStringLiteral(importDeclaration.moduleSpecifier)) {
      return VALIDATOR_MODULE_KIND_MAP[importDeclaration.moduleSpecifier.text]
    }
  }

  if (ts.isNamespaceImport(declaration) || ts.isImportClause(declaration)) {
    const importDeclaration = declaration.parent.parent
    if (ts.isImportDeclaration(importDeclaration) && ts.isStringLiteral(importDeclaration.moduleSpecifier)) {
      return VALIDATOR_MODULE_KIND_MAP[importDeclaration.moduleSpecifier.text]
    }
  }

  return undefined
}

function inferValidatorKindFromSymbol(symbol: ts.Symbol | undefined, typeChecker: ts.TypeChecker, visited: Set<ts.Symbol>): Tsoa.ExternalValidatorKind | undefined {
  if (!symbol || visited.has(symbol)) {
    return undefined
  }

  visited.add(symbol)

  const symbolDeclarations = symbol.declarations || (symbol.valueDeclaration ? [symbol.valueDeclaration] : [])
  for (const declaration of symbolDeclarations) {
    const fromImport = getModuleKindFromImportDeclaration(declaration)
    if (fromImport) {
      return fromImport
    }
  }

  const resolvedSymbol = (symbol.flags & ts.SymbolFlags.Alias) !== 0 ? typeChecker.getAliasedSymbol(symbol) : symbol
  if (resolvedSymbol !== symbol) {
    const direct = inferValidatorKindFromSymbol(resolvedSymbol, typeChecker, visited)
    if (direct) {
      return direct
    }
  }

  const declarations = resolvedSymbol.declarations || (resolvedSymbol.valueDeclaration ? [resolvedSymbol.valueDeclaration] : [])
  for (const declaration of declarations) {
    const fromImport = getModuleKindFromImportDeclaration(declaration)
    if (fromImport) {
      return fromImport
    }

    if (ts.isVariableDeclaration(declaration) && declaration.initializer) {
      const fromInitializer = inferValidatorKindFromExpression(declaration.initializer, typeChecker, visited)
      if (fromInitializer) {
        return fromInitializer
      }
    }

    if ((ts.isPropertyAssignment(declaration) || ts.isBindingElement(declaration)) && declaration.initializer) {
      const fromInitializer = inferValidatorKindFromExpression(declaration.initializer, typeChecker, visited)
      if (fromInitializer) {
        return fromInitializer
      }
    }

    if (ts.isParameter(declaration) && declaration.initializer) {
      const fromInitializer = inferValidatorKindFromExpression(declaration.initializer, typeChecker, visited)
      if (fromInitializer) {
        return fromInitializer
      }
    }
  }

  return undefined
}

function inferValidatorKindFromExpression(expression: ts.Expression, typeChecker: ts.TypeChecker, visited: Set<ts.Symbol> = new Set()): Tsoa.ExternalValidatorKind | undefined {
  if (ts.isParenthesizedExpression(expression) || ts.isAsExpression(expression) || ts.isTypeAssertionExpression(expression) || ts.isNonNullExpression(expression)) {
    return inferValidatorKindFromExpression(expression.expression, typeChecker, visited)
  }

  if (ts.isPropertyAccessExpression(expression)) {
    const propertySymbol = typeChecker.getSymbolAtLocation(expression.name)
    const fromProperty = inferValidatorKindFromSymbol(propertySymbol, typeChecker, visited)
    if (fromProperty) {
      return fromProperty
    }

    return inferValidatorKindFromExpression(expression.expression, typeChecker, visited)
  }

  if (ts.isElementAccessExpression(expression)) {
    return inferValidatorKindFromExpression(expression.expression, typeChecker, visited)
  }

  if (ts.isCallExpression(expression) || ts.isNewExpression(expression)) {
    return inferValidatorKindFromExpression(expression.expression, typeChecker, visited)
  }

  if (ts.isIdentifier(expression)) {
    return inferValidatorKindFromSymbol(typeChecker.getSymbolAtLocation(expression), typeChecker, visited)
  }

  return undefined
}

function parseValidateKindAndSchemaArgument(
  expression: ts.CallExpression,
  parameter: ts.ParameterDeclaration,
  typeChecker: ts.TypeChecker,
): Tsoa.ExternalValidatorDescriptor {
  const args = [...expression.arguments]
  if (args.length === 0) {
    throw new GenerateMetadataError('@Validate requires a schema argument.', parameter)
  }

  if (args.length === 1) {
    const [arg] = args
    if (ts.isObjectLiteralExpression(arg)) {
      const kindProperty = arg.properties.find(
        property => ts.isPropertyAssignment(property) && ts.isIdentifier(property.name) && property.name.text === 'kind',
      ) as ts.PropertyAssignment | undefined
      const schemaProperty = arg.properties.find(
        property => ts.isPropertyAssignment(property) && ts.isIdentifier(property.name) && property.name.text === 'schema',
      ) as ts.PropertyAssignment | undefined

      if (!kindProperty || !schemaProperty || !ts.isStringLiteral(kindProperty.initializer) || !isExternalValidatorKind(kindProperty.initializer.text)) {
        throw new GenerateMetadataError('@Validate({ kind, schema }) requires a supported string kind and a schema property.', arg)
      }

      return {
        kind: kindProperty.initializer.text,
        strategy: 'external',
      }
    }

    if (ts.isStringLiteral(arg) && isExternalValidatorKind(arg.text)) {
      throw new GenerateMetadataError(`@Validate('${arg.text}', schema) requires a schema argument.`, arg)
    }

    const inferredKind = inferValidatorKindFromExpression(arg, typeChecker)
    if (!inferredKind) {
      throw new GenerateMetadataError('@Validate(schema) could not infer the validator kind. Use @Validate(kind, schema) instead.', arg)
    }

    return {
      kind: inferredKind,
      strategy: 'external',
    }
  }

  if (args.length === 2) {
    const [kindArg, schemaArg] = args
    if (!ts.isStringLiteral(kindArg) || !isExternalValidatorKind(kindArg.text) || !schemaArg) {
      throw new GenerateMetadataError('@Validate(kind, schema) requires a supported string kind and schema argument.', expression)
    }

    return {
      kind: kindArg.text,
      strategy: 'external',
    }
  }

  throw new GenerateMetadataError('@Validate accepts only (schema), (kind, schema), or ({ kind, schema }).', expression)
}

export function getParameterExternalValidator(
  parameter: ts.ParameterDeclaration,
  parameterIn: Tsoa.Parameter['in'],
  typeChecker: ts.TypeChecker,
): ValidateDecoratorParseResult | undefined {
  const decorator = getValidateDecorator(parameter, typeChecker)
  if (!decorator) {
    return undefined
  }

  if (!SUPPORTED_VALIDATE_TARGETS.has(parameterIn)) {
    throw new GenerateMetadataError(`@Validate is not supported on '${parameterIn}' parameters in this release.`, parameter)
  }

  if (!ts.isCallExpression(decorator.expression)) {
    throw new GenerateMetadataError('@Validate must be called as a decorator function.', decorator)
  }

  return {
    validationStrategy: 'external',
    externalValidator: parseValidateKindAndSchemaArgument(decorator.expression, parameter, typeChecker),
  }
}

export function assertValidateDecoratorTargets(program: ts.Program, typeChecker: ts.TypeChecker) {
  const visit = (node: ts.Node) => {
    const validateDecorators = getDecorators(node, (_identifier, canonicalName) => canonicalName === 'Validate', typeChecker)

    if (validateDecorators.length > 0) {
      if (!ts.isParameter(node)) {
        throw new GenerateMetadataError('@Validate is currently supported only on controller method parameters.', node)
      }

      if (!ts.isMethodDeclaration(node.parent)) {
        throw new GenerateMetadataError('@Validate is currently supported only on method parameters.', node)
      }
    }

    ts.forEachChild(node, visit)
  }

  program.getSourceFiles().forEach(sourceFile => visit(sourceFile))
}
