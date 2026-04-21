---
lastUpdated: 2026-04-20T21:59:41.325Z
---
[tsoa-next](../../../../../packages.md) / [@tsoa-next/runtime](../../../index.md) / [Tsoa](../index.md) / SchemaValidatorKey

# 类型别名: SchemaValidator 键

```ts
type SchemaValidatorKey = Exclude<ValidatorKey, `is${string}` | "minDate" | "maxDate">;
```

定义如下: [packages/runtime/src/metadataGeneration/tsoa.ts:111](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/metadataGeneration/tsoa.ts#L111)
