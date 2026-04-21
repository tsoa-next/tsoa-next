---
lastUpdated: 2026-04-20T21:59:41.330Z
---
[tsoa-next](../../packages.md) / [tsoa-next](../index.md) / createEmbeddedSpecGenerator

# ফাংশন: Impecgen() নির্মাণ করুন

```ts
function createEmbeddedSpecGenerator(artifacts): SpecGenerator;
```

নির্ধারিত মান: [packages/tsoa/src/spec.ts:21](https://github.com/tsoa-next/tsoa-next/blob/main/packages/tsoa/src/spec.ts#L21)

প্রিলোড করার আগে থেকে একটি স্ক্রীন রিডার নির্মাণ করুন OpenAPI জাহাজ তৈরি হয়েছিল রুট কোড.
এটা নির্মিত হয়েছে `SpecPath` উৎস ফাইল থেকে দূরে ফাইলগুলি লক্ষ্য করুন TypeScript অনুরোধের সময় বিশ্লেষণ করুন।

## পরামিতি

### artifacts

[`EmbeddedSpecGeneratorArtifacts`](../interfaces/EmbeddedSpecGeneratorArtifacts.md)

## প্রাপ্ত মান

[`SpecGenerator`](../interfaces/SpecGenerator.md)
