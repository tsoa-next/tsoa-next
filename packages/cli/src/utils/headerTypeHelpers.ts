import { Tsoa } from '@tsoa-next/runtime'
import { NodeArray, TypeNode } from 'typescript'
import { GenerateMetadataError } from '../metadataGeneration/exceptions'
import { MetadataGenerator } from '../metadataGeneration/metadataGenerator'
import { Context, TypeResolver } from '../metadataGeneration/typeResolver'

export function getHeaderType(typeArgumentNodes: NodeArray<TypeNode> | undefined, index: number, metadataGenerator: MetadataGenerator, context: Context = {}): Tsoa.HeaderType | undefined {
  if (!typeArgumentNodes?.[index]) {
    return undefined
  }

  const candidate = new TypeResolver(typeArgumentNodes[index], metadataGenerator, undefined, context).resolve()

  if (candidate && isSupportedHeaderDataType(candidate)) {
    return candidate
  } else if (candidate) {
    throw new GenerateMetadataError(`Unable to parse Header Type ${typeArgumentNodes[index].getText()}`, typeArgumentNodes[index])
  }

  return undefined
}

export function isSupportedHeaderDataType(parameterType: Tsoa.Type): parameterType is Tsoa.HeaderType {
  const supportedPathDataTypes: Tsoa.TypeStringLiteral[] = ['nestedObjectLiteral', 'refObject']
  return supportedPathDataTypes.includes(parameterType.dataType)
}
