---
lastUpdated: 2026-04-20T21:59:41.309Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/runtime](../index.md) / Extension

# ফাংশন: এক্সটেনশন

```ts
function Extension(name, value): PropertyDecorator;
```

নির্ধারিত মান: [packages/runtime/src/decorators/extension.ts:7](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/extension.ts#L7)

যোগ করুন OpenAPI একটি মডেল বৈশিষ্ট্যের মান প্রস্তুত করুন।

## পরামিতি

### name

`string`

কি, সাধারণত আরম্ভের ক্ষেত্রে প্রয়োগ করা হয় `x-`. .

### value

  \| [`ExtensionType`](../type-aliases/ExtensionType.md)
  \| [`ExtensionType`](../type-aliases/ExtensionType.md)[]

এক্সটেনশন ।

## প্রাপ্ত মান

`PropertyDecorator`
