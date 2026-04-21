---
lastUpdated: 2026-04-20T21:59:41.341Z
---
[tsoa-next](../../packages.md) / [tsoa-next](../index.md) / SpecPath

# ফাংশন: স্পেকট্রোন পাথ

```ts
function SpecPath(
   path?, 
   optionsOrTarget?, 
   cache?): ClassDecorator;
```

নির্ধারিত মান: [packages/runtime/src/decorators/specPath.ts:157](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/specPath.ts#L157)

এমন একটি কন্ট্রোলার-স্থানীয় পথ নিবন্ধন করে যা নির্মাতাকে সাহায্য করে OpenAPI ডকুমেন্ট অথবা স্বনির্ধারিত প্রতিক্রিয়া।

## পরামিতি

### path?

`string`

আপেক্ষিক রাস্তা। ডিফল্ট `spec`. .

### optionsOrTarget?

  \| [`SpecPathTarget`](../type-aliases/SpecPathTarget.md)
  \| [`SpecPathOptions`](../interfaces/SpecPathOptions.md)

হয় `SpecPathOptions` অবজেক্ট অথবা স্ট্রীং যুক্তি.

### cache?

[`SpecPathCache`](../type-aliases/SpecPathCache.md)

লিগ্যাসি ক্যাশে কৌশল আর্গুমেন্ট। 'মেমেমিং' এর জন্য তৈরি হও।

## প্রাপ্ত মান

`ClassDecorator`
