import { expect } from 'chai'
import 'mocha'
import * as ts from 'typescript'
import { commentToString, symbolDisplayPartsToString } from '@tsoa-next/cli/utils/jsDocUtils'

type NodeWithJsDoc = ts.Node & { jsDoc?: ts.JSDoc[] }

function createProgramFromSource(fileName: string, sourceText: string) {
  const options: ts.CompilerOptions = {
    module: ts.ModuleKind.CommonJS,
    target: ts.ScriptTarget.ESNext,
  }
  const host = ts.createCompilerHost(options)
  const originalGetSourceFile = host.getSourceFile.bind(host)
  const originalReadFile = host.readFile.bind(host)
  const originalFileExists = host.fileExists.bind(host)

  host.getSourceFile = (sourceFileName, languageVersion, onError, shouldCreateNewSourceFile) => {
    if (sourceFileName === fileName) {
      return ts.createSourceFile(sourceFileName, sourceText, languageVersion, true, ts.ScriptKind.TS)
    }

    return originalGetSourceFile(sourceFileName, languageVersion, onError, shouldCreateNewSourceFile)
  }
  host.readFile = sourceFileName => {
    if (sourceFileName === fileName) {
      return sourceText
    }

    return originalReadFile(sourceFileName)
  }
  host.fileExists = sourceFileName => {
    if (sourceFileName === fileName) {
      return true
    }

    return originalFileExists(sourceFileName)
  }

  return ts.createProgram([fileName], options, host)
}

describe('jsDocUtils', () => {
  it('preserves spaces between jsdoc link targets and link text in raw comments', () => {
    const sourceFile = ts.createSourceFile(
      'raw-comment.ts',
      ['class Example {', '  /** The {@link ErrorLevel log level}. */', '  method(): void {}', '}'].join('\n'),
      ts.ScriptTarget.Latest,
      true,
      ts.ScriptKind.TS,
    )
    const classDeclaration = sourceFile.statements[0]
    if (!ts.isClassDeclaration(classDeclaration)) {
      throw new Error('Expected a class declaration.')
    }

    const method = classDeclaration.members[0]
    if (!ts.isMethodDeclaration(method)) {
      throw new Error('Expected a method declaration.')
    }

    const comment = (method as NodeWithJsDoc).jsDoc?.[0]?.comment
    if (!comment || typeof comment === 'string') {
      throw new Error('Expected a parsed JSDoc node array.')
    }

    expect(commentToString(comment)).to.equal('The {@link ErrorLevel log level}.')
  })

  it('preserves spaces between link names and link text in symbol display parts', () => {
    const fileName = 'display-parts.ts'
    const program = createProgramFromSource(fileName, ["enum ErrorLevel { Info = 'info' }", 'interface Example {', '  /** The {@link ErrorLevel log level}. */', '  value: string', '}'].join('\n'))
    const checker = program.getTypeChecker()
    const sourceFile = program.getSourceFile(fileName)
    if (!sourceFile) {
      throw new Error('Expected a source file.')
    }

    const interfaceDeclaration = sourceFile.statements.find(ts.isInterfaceDeclaration)
    if (!interfaceDeclaration) {
      throw new Error('Expected an interface declaration.')
    }

    const property = interfaceDeclaration.members[0]
    if (!ts.isPropertySignature(property)) {
      throw new Error('Expected a property signature.')
    }

    const symbol = checker.getSymbolAtLocation(property.name)
    if (!symbol) {
      throw new Error('Expected a property symbol.')
    }

    expect(symbolDisplayPartsToString(symbol.getDocumentationComment(checker))).to.equal('The {@link ErrorLevel log level}.')
  })
})
