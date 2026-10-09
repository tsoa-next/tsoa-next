import type { Tsoa } from '@tsoa-next/runtime'
import * as ts from 'typescript'
import { throwUnless } from '../utils/flowUtils'
import { GenerateMetadataError } from './exceptions'
import type { MetadataGenerator } from './metadataGenerator'

export function resolveToJSONReturnType(modelType: ts.InterfaceDeclaration | ts.ClassDeclaration, current: MetadataGenerator, refTypeName: string): ts.TypeNode | undefined {
  throwUnless(modelType.name, new GenerateMetadataError("Can't get Symbol from anonymous class", modelType))

  const type = current.typeChecker.getTypeAtLocation(modelType.name)
  const toJSONDeclaration = current.typeChecker.getPropertyOfType(type, 'toJSON')?.valueDeclaration
  if (toJSONDeclaration && (ts.isMethodDeclaration(toJSONDeclaration) || ts.isMethodSignature(toJSONDeclaration))) {
    let nodeType = toJSONDeclaration.type
    if (!nodeType) {
      const signature = current.typeChecker.getSignatureFromDeclaration(toJSONDeclaration)
      const implicitType = current.typeChecker.getReturnTypeOfSignature(signature!)
      nodeType = current.typeChecker.typeToTypeNode(implicitType, undefined, ts.NodeBuilderFlags.NoTruncation)
    }
    if (!nodeType) {
      throw new GenerateMetadataError(`Could not resolve the return type for ${refTypeName}.`, toJSONDeclaration)
    }
    return nodeType
  }
  return undefined
}

export function withDefinedReferenceMetadata<TReferenceType extends Tsoa.ReferenceType>(referenceType: TReferenceType, metadata: { example: unknown; title: string | undefined }): TReferenceType {
  if (metadata.example !== undefined) {
    referenceType.example = metadata.example
  }

  if (metadata.title !== undefined) {
    referenceType.title = metadata.title
  }

  return referenceType
}
