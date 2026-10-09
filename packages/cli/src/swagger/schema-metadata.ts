import type { Tsoa } from '@tsoa-next/runtime'

export function shouldIncludeValidatorInSchema(key: string): key is Tsoa.SchemaValidatorKey {
  return !key.startsWith('is') && key !== 'minDate' && key !== 'maxDate'
}

export function getPropertySchemaType(type: Tsoa.Type): Tsoa.Type {
  const unwrapBrandedAlias = (current: Tsoa.Type): Tsoa.Type => {
    if (current.dataType === 'refAlias') {
      const next = current.type
      if (next.dataType === 'intersection' && next.types.length === 1) {
        return unwrapBrandedAlias(next.types[0])
      }
      return current
    }

    if (current.dataType === 'intersection' && current.types.length === 1) {
      return unwrapBrandedAlias(current.types[0])
    }

    return current
  }

  return unwrapBrandedAlias(type)
}

export function hasUndefined(property: Tsoa.Property): boolean {
  return property.type.dataType === 'undefined' || (property.type.dataType === 'union' && property.type.types.some(type => type.dataType === 'undefined'))
}

export function isRequiredWithoutDefault(prop: Tsoa.Property | Tsoa.Parameter): boolean | undefined {
  return prop.required && prop.default == null
}

export function projectSchemaValidators(validators: Tsoa.Validators): Partial<Record<Tsoa.SchemaValidatorKey, unknown>> {
  return Object.keys(validators)
    .filter(shouldIncludeValidatorInSchema)
    .reduce(
      (acc, key) => {
        acc[key] = validators[key]!.value
        return acc
      },
      {} as Partial<Record<Tsoa.SchemaValidatorKey, unknown>>,
    )
}
