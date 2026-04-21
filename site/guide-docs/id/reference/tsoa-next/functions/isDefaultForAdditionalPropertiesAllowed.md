---
lastUpdated: 2026-04-20T21:59:41.342Z
---
[tsoa-next](../../packages.md) / [tsoa-next](../index.md) / isDefaultForAdditionalPropertiesAllowed

# Fungsi: Apakah DefaultForAdditionalProperities Diijinkan ()

```ts
function isDefaultForAdditionalPropertiesAllowed(test): test is undefined;
```

Didefinisikan dalam: [packages/runtime/src/routeGeneration/tsoa-route.ts:6](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/tsoa-route.ts#L6)

Kembali `true` ketika skema model mengandalkan OpenAPIbaku `additionalProperties` perilaku.

## Parameter

### test

  \| `boolean`
  \| [`PropertySchema`](../namespaces/TsoaRoute/interfaces/PropertySchema.md)
  \| `undefined`

## Kembali

`test is undefined`
