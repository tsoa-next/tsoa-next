import { assertNever, type Tsoa } from '@tsoa-next/runtime'

function getReferenceAliasProperties(referenceType: Tsoa.RefAliasType): Tsoa.Property[] {
  let type: Tsoa.Type = referenceType
  while (type.dataType === 'refAlias') {
    type = type.type
  }

  if (type.dataType === 'refObject' || type.dataType === 'nestedObjectLiteral') {
    return type.properties
  }

  return []
}

export function appendInheritedProperties(properties: Tsoa.Property[], referenceType: Tsoa.ReferenceType | undefined): Tsoa.Property[] {
  if (!referenceType || referenceType.dataType === 'refEnum') {
    return properties
  }

  if (referenceType.dataType === 'refAlias') {
    return [...properties, ...getReferenceAliasProperties(referenceType)]
  }

  if (referenceType.dataType === 'refObject') {
    return [...properties, ...(referenceType.properties ?? [])]
  }

  return assertNever(referenceType)
}
