---
lastUpdated: 2026-04-20T21:59:41.362Z
---
[tsoa-next](../../../../packages.md) / [tsoa-next](../../../index.md) / [Tsoa](../index.md) / SchemaValidatorKey

# Tipo Alias: SchemaValidator Clave

```ts
type SchemaValidatorKey = Exclude<ValidatorKey, `is${string}` | "minDate" | "maxDate">;
```

Definido en: [packages/runtime/src/metadataGeneration/tsoa.ts:111](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/metadataGeneration/tsoa.ts#L111)
