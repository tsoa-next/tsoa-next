---
lastUpdated: 2026-04-20T21:59:41.342Z
---
[tsoa-next](../../packages.md) / [tsoa-next](../index.md) / isDefaultForAdditionalPropertiesAllowed

# Function: isDefaultForAdditionalProperties allowed

```ts
function isDefaultForAdditionalPropertiesAllowed(test): test is undefined;
```

محددة في: [packages/runtime/src/routeGeneration/tsoa-route.ts:6](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/tsoa-route.ts#L6)

العودة `true` عندما يعتمد شيما نموذجي على OpenAPIالتخلف `additionalProperties` سلوك

## البارامترات

### test

  \| `boolean`
  \| [`PropertySchema`](../namespaces/TsoaRoute/interfaces/PropertySchema.md)
  \| `undefined`

## العودة

`test is undefined`
