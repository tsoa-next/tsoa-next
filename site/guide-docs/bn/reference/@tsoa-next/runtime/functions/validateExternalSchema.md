---
lastUpdated: 2026-04-20T21:59:41.312Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/runtime](../index.md) / validateExternalSchema

# ফাংশন: statasch ()

```ts
function validateExternalSchema(
   kind, 
   schema, 
   value, 
   context?): RuntimeSchemaAdapterResult;
```

নির্ধারিত মান: [packages/runtime/src/routeGeneration/externalValidation.ts:291](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/externalValidation.ts#L291)

নির্বাচিত বার্তা ক্লিপবোর্ডের জন্য কোনো সুনির্দিষ্ট স্কিমা লাইব্রেরিতে সংযোজন করুন।

## পরামিতি

### kind

[`ExternalValidatorKind`](../namespaces/Tsoa/type-aliases/ExternalValidatorKind.md)

### schema

`unknown`

### value

`unknown`

### context?

[`ValidationContext`](../namespaces/Tsoa/interfaces/ValidationContext.md) = `{}`

## প্রাপ্ত মান

[`RuntimeSchemaAdapterResult`](../type-aliases/RuntimeSchemaAdapterResult.md)
