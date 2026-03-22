import { normalize } from 'path'
import { Node, TypeNode, isIdentifier } from 'typescript'

export class GenerateMetadataError extends Error {
  constructor(message?: string, node?: Node | TypeNode, onlyCurrent = false) {
    super(message)
    if (node) {
      this.message = `${message!}\n${prettyLocationOfNode(node)}\n${prettyTroubleCause(node, onlyCurrent)}`
    }
  }
}

export class GenerateMetaDataWarning {
  constructor(
    private message: string,
    private node: Node | TypeNode,
    private onlyCurrent = false,
  ) {}

  toString() {
    return `Warning: ${this.message}\n${prettyLocationOfNode(this.node)}\n${prettyTroubleCause(this.node, this.onlyCurrent)}`
  }
}

export function prettyLocationOfNode(node: Node | TypeNode) {
  const sourceFile = node.getSourceFile()
  if (sourceFile) {
    const token = node.getFirstToken() || node.parent.getFirstToken()
    const start = token ? `:${sourceFile.getLineAndCharacterOfPosition(token.getStart()).line + 1}` : ''
    const end = token ? `:${sourceFile.getLineAndCharacterOfPosition(token.getEnd()).line + 1}` : ''
    const normalizedPath = normalize(`${sourceFile.fileName}${start}${end}`)
    return `At: ${normalizedPath}.`
  } else {
    return `At unknown position...`
  }
}

export function prettyTroubleCause(node: Node | TypeNode, onlyCurrent = false) {
  let name: string
  if (onlyCurrent || !node.parent) {
    name = node.pos !== -1 && node.parent ? node.getText() : getNamedNodeText(node) || '<unknown name>'
  } else {
    name = node.parent.pos !== -1 ? node.parent.getText() : getNamedNodeText(node.parent) || '<unknown name>'
  }
  return `This was caused by '${name}'`
}

function getNamedNodeText(node: Node | TypeNode): string | undefined {
  const maybeNamedNode = node as Node & { name?: Node }
  const nameNode = maybeNamedNode.name
  return nameNode && isIdentifier(nameNode) ? nameNode.text : undefined
}
