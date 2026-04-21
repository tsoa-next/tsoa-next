---
lastUpdated: 2026-04-20T21:59:41.312Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/runtime](../index.md) / isDefaultForAdditionalPropertiesAllowed

# 函数: 是Default forAdditional properties Allowed ()

```ts
function isDefaultForAdditionalPropertiesAllowed(test): test is undefined;
```

定义如下: [packages/runtime/src/routeGeneration/tsoa-route.ts:6](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/tsoa-route.ts#L6)

回返 `true` 当模型计划依赖于 OpenAPI默认 `additionalProperties` 行为

## 参数

### test

  \| `boolean`
  \| [`PropertySchema`](../namespaces/TsoaRoute/interfaces/PropertySchema.md)
  \| `undefined`

## 回返

`test is undefined`
