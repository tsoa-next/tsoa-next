---
lastUpdated: 2026-04-20T21:59:41.344Z
---
[tsoa-next](../../packages.md) / [tsoa-next](../index.md) / RuntimeSchemaAdapter

# ইন্টারফেস: রানটাইম সেমাAdapter

নির্ধারিত মান: [packages/runtime/src/routeGeneration/externalValidation.ts:15](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/externalValidation.ts#L15)

কমপ্লুটেনশন চুক্তিটি ব্যবহৃত হয় ঢালের সময় বহিস্থিত স্কীমা লাইব্রেরীর সাথে কার্যকরীকরণের জন্য।

## বৈশিষ্ট্য

### kind

```ts
kind: ExternalValidatorKind;
```

নির্ধারিত মান: [packages/runtime/src/routeGeneration/externalValidation.ts:16](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/externalValidation.ts#L16)

## পদ্ধতি

### validate()

```ts
validate(
   value, 
   schema, 
   context): RuntimeSchemaAdapterResult;
```

নির্ধারিত মান: [packages/runtime/src/routeGeneration/externalValidation.ts:17](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/externalValidation.ts#L17)

#### পরামিতি

##### value

`unknown`

##### schema

`unknown`

##### context

[`ValidationContext`](../namespaces/Tsoa/interfaces/ValidationContext.md)

#### প্রাপ্ত মান

[`RuntimeSchemaAdapterResult`](../type-aliases/RuntimeSchemaAdapterResult.md)
