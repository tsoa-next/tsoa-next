---
lastUpdated: 2026-04-20T21:59:41.307Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/cli](../index.md) / buildSpec

# ফাংশন: sSpec()

```ts
function buildSpec(
   swaggerConfig, 
   compilerOptions?, 
   ignorePaths?, 
   metadata?, 
   defaultNumberType?): Spec;
```

নির্ধারিত মান: [cli/src/module/generate-spec.ts:47](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/module/generate-spec.ts#L47)

বিল্ড OpenAPI ডিস্কের মধ্যে লেখার উদ্দেশ্যে মেমরি লিখুন।

## পরামিতি

### swaggerConfig

[`ExtendedSpecConfig`](../interfaces/ExtendedSpecConfig.md)

### compilerOptions?

`CompilerOptions`

### ignorePaths?

`string`[]

### metadata?

`Metadata`

### defaultNumberType?

`"double"` \| `"float"` \| `"integer"` \| `"long"`

## প্রাপ্ত মান

`Spec`
