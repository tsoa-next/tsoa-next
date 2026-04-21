---
lastUpdated: 2026-04-20T21:59:41.327Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/runtime](../index.md) / RuntimeSchemaAdapterResult

# ধরন: রানটাইমসক্রিপটরেশন\<T\>

```ts
type RuntimeSchemaAdapterResult<T> = 
  | {
  ok: true;
  value: T;
}
  | {
  failure: ValidationFailure;
  ok: false;
};
```

নির্ধারিত মান: [packages/runtime/src/routeGeneration/externalValidation.ts:4](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/externalValidation.ts#L4)

বহিস্থিত কনটেন্ট লাইব্রেরীর জন্য একটি shert অ্যাডাপ্টার ফেরত দেয় ।

## পরামিতির পরামিতি

### T

`T` = `unknown`
