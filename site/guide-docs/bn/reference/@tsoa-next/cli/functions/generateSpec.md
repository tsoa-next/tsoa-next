---
lastUpdated: 2026-04-20T21:59:41.307Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/cli](../index.md) / generateSpec

# ফাংশন: sSpec()

```ts
function generateSpec(
   swaggerConfig, 
   compilerOptions?, 
   ignorePaths?, 
   metadata?, 
defaultNumberType?): Promise<Metadata>;
```

নির্ধারিত মান: [cli/src/module/generate-spec.ts:22](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/module/generate-spec.ts#L22)

একটি %s নির্মাণ করুন OpenAPI ডিস্কের মধ্যে উপস্থিত মিটাডাটা পরীক্ষা করা হবে।

## পরামিতি

### swaggerConfig

[`ExtendedSpecConfig`](../interfaces/ExtendedSpecConfig.md)

### compilerOptions?

`CompilerOptions`

### ignorePaths?

`string`[]

### metadata?

`Metadata`

ক্যাশে করা মিটা-ডাটাগুলি ব্যাক- আপ করার সময় পূর্ববর্তী ধাপ ফিরে যেতে হবে

### defaultNumberType?

`"double"` \| `"float"` \| `"integer"` \| `"long"`

## প্রাপ্ত মান

`Promise`\<`Metadata`\>
