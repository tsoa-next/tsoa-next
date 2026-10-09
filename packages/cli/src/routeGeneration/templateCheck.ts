import * as handlebars from 'handlebars'
import * as ts from 'typescript'
import { fsReadFile } from '../utils/fs'

/** Reads and parses the selected template before its rendering context is prepared. */
export async function readRouteTemplate(templatePath: string): Promise<string> {
  try {
    const template = (await fsReadFile(templatePath)).toString()
    handlebars.parse(template)
    return template
  } catch (cause) {
    throw new Error(`Cannot read or parse route template ${templatePath}: ${cause instanceof Error ? cause.message : String(cause)}`, { cause })
  }
}

/** Checks only syntax of the rendered virtual file; no application imports or output writes. */
export function checkRenderedTemplateSyntax(content: string, templatePath: string, outputPath: string): void {
  const options: ts.CompilerOptions = { noEmit: true, noLib: true, noResolve: true, types: [], target: ts.ScriptTarget.ESNext }
  const virtualPath = outputPath.replaceAll('\\', '/')
  const source = ts.createSourceFile(virtualPath, content, ts.ScriptTarget.ESNext, true, ts.ScriptKind.TS)
  const host = ts.createCompilerHost(options)
  host.getSourceFile = fileName => (fileName === virtualPath ? source : undefined)
  host.fileExists = fileName => fileName === virtualPath
  host.readFile = fileName => (fileName === virtualPath ? content : undefined)
  host.writeFile = () => undefined
  const program = ts.createProgram([virtualPath], options, host)
  const diagnostics = program.getSyntacticDiagnostics(source)
  if (diagnostics.length > 0) {
    const reasons = diagnostics.map(diagnostic => {
      const position = source.getLineAndCharacterOfPosition(diagnostic.start ?? 0)
      return `Generated output ${outputPath}:${position.line + 1}:${position.character + 1}: ${ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n')}`
    })
    throw new Error(`Route template ${templatePath} produced invalid TypeScript syntax:\n${reasons.join('\n')}\nCorrect the template and rerun tsoa template-check.`)
  }
}
