---
lastUpdated: 2026-04-20T21:59:41.312Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/runtime](../index.md) / isDefaultForAdditionalPropertiesAllowed

# Función: isDefaultForAdditionalPropertiesAllowed()

```ts
function isDefaultForAdditionalPropertiesAllowed(test): test is undefined;
```

Definido en: [packages/runtime/src/routeGeneration/tsoa-route.ts:6](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/tsoa-route.ts#L6)

Devoluciones `true` cuando un esquema modelo se basa en OpenAPI's default `additionalProperties` comportamiento.

## Parámetros

### test

  \| `boolean`
  \| [`PropertySchema`](../namespaces/TsoaRoute/interfaces/PropertySchema.md)
  \| `undefined`

## Devoluciones

`test is undefined`
