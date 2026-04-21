---
lastUpdated: 2026-04-20T21:59:41.312Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/runtime](../index.md) / isDefaultForAdditionalPropertiesAllowed

# Função: isDefaultForAdditionalPropertiesAllowed()

```ts
function isDefaultForAdditionalPropertiesAllowed(test): test is undefined;
```

Definido em: [packages/runtime/src/routeGeneration/tsoa-route.ts:6](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/tsoa-route.ts#L6)

Retorna `true` quando um esquema de modelo depende OpenAPIPredefinição `additionalProperties` comportamento.

## Parâmetros

### test

  \| `boolean`
  \| [`PropertySchema`](../namespaces/TsoaRoute/interfaces/PropertySchema.md)
  \| `undefined`

## Retorna

`test is undefined`
