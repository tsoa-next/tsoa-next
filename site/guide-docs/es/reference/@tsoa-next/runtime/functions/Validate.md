---
lastUpdated: 2026-04-20T21:59:41.311Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/runtime](../index.md) / Validate

# Función: Validato()

```ts
function Validate(...args): ParameterDecorator;
```

Definido en: [packages/runtime/src/decorators/validate.ts:141](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/validate.ts#L141)

Adjunta metadatos de validación de esquemas externos a un parámetro controlador.

Los formularios de apoyo son `@Validate(schema)`, `@Validate(kind, schema)`, y `@Validate({ kind, schema })`.

## Parámetros

### args

...`unknown`[]

## Devoluciones

`ParameterDecorator`
