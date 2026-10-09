import * as ts from 'typescript'
import { isExistJSDocTag } from '../utils/jsDocUtils'
import { throwUnless } from '../utils/flowUtils'
import { GenerateMetadataError } from './exceptions'

export type UsableDeclarationWithoutPropertySignature = ts.InterfaceDeclaration | ts.ClassDeclaration | ts.TypeAliasDeclaration | ts.EnumMember

export function isUsableDeclaration(node: ts.Node): node is UsableDeclarationWithoutPropertySignature {
  switch (node.kind) {
    case ts.SyntaxKind.InterfaceDeclaration:
    case ts.SyntaxKind.ClassDeclaration:
    case ts.SyntaxKind.TypeAliasDeclaration:
    case ts.SyntaxKind.EnumDeclaration:
    case ts.SyntaxKind.EnumMember:
      return true
    default:
      return false
  }
}

function getDesignatedModels<T extends ts.Node>(nodes: T[], typeName: string): T[] {
  /**
   * Model is marked with '@tsoaModel', indicating that it should be the 'canonical' model used
   */
  const designatedNodes = nodes.filter(enumNode => {
    return isExistJSDocTag(enumNode, tag => tag.tagName.text === 'tsoaModel')
  })
  if (designatedNodes.length === 0) {
    return nodes
  }

  throwUnless(designatedNodes.length === 1, new GenerateMetadataError(`Multiple models for ${typeName} marked with '@tsoaModel'; '@tsoaModel' should only be applied to one model.`))

  return designatedNodes
}

export function selectModelDeclarations(declarations: ts.Declaration[], typeName: string): UsableDeclarationWithoutPropertySignature[] {
  let modelTypes = declarations.filter((node): node is UsableDeclarationWithoutPropertySignature => {
    return isUsableDeclaration(node) && node.name?.getText() === typeName
  })

  // If no usable model types found, return empty array instead of throwing
  if (modelTypes.length === 0) {
    return []
  }

  if (modelTypes.length > 1) {
    // remove types that are from typescript e.g. 'Account'
    modelTypes = modelTypes.filter(modelType => {
      return modelType.getSourceFile().fileName.replaceAll('\\', '/').toLowerCase().indexOf('node_modules/typescript') <= -1
    })

    modelTypes = getDesignatedModels(modelTypes, typeName)
  }

  return modelTypes
}
