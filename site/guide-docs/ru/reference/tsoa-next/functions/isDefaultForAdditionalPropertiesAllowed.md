---
lastUpdated: 2026-04-20T21:59:41.342Z
---
[tsoa-next](../../packages.md) / [tsoa-next](../index.md) / isDefaultForAdditionalPropertiesAllowed

# Функция: isDefaultForAdditionalPropertiesAllowed()

```ts
function isDefaultForAdditionalPropertiesAllowed(test): test is undefined;
```

Определено в: [packages/runtime/src/routeGeneration/tsoa-route.ts:6](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/tsoa-route.ts#L6)

Возвращение `true` когда модельная схема опирается на OpenAPIдефолт `additionalProperties` поведение.

## Параметры

### test

  \| `boolean`
  \| [`PropertySchema`](../namespaces/TsoaRoute/interfaces/PropertySchema.md)
  \| `undefined`

## Возвращение

`test is undefined`
