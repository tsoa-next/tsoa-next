---
lastUpdated: 2026-04-20T21:59:41.307Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/cli](../index.md) / generateRoutes

# ফাংশন: rROR()

```ts
function generateRoutes<Config>(
   routesConfig, 
   compilerOptions?, 
   ignorePaths?, 
   metadata?, 
defaultNumberType?): Promise<Metadata>;
```

নির্ধারিত মান: [cli/src/module/generate-routes.ts:13](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/module/generate-routes.ts#L13)

ডিস্কের মধ্যে ফাইল নির্মাণ করতে ব্যবহৃত হয়

## পরামিতির পরামিতি

### Config

`Config` * xends * [`ExtendedRoutesConfig`](../interfaces/ExtendedRoutesConfig.md)

## পরামিতি

### routesConfig

`Config`

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
