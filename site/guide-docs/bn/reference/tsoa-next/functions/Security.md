---
lastUpdated: 2026-04-20T21:59:41.341Z
---
[tsoa-next](../../packages.md) / [tsoa-next](../index.md) / Security

# ফাংশন: নিরাপত্তা ()

```ts
function Security(name, scopes?): ClassDecorator & MethodDecorator;
```

নির্ধারিত মান: [packages/runtime/src/decorators/security.ts:16](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/security.ts#L16)

একজন নিয়ন্ত্রক বা কাজের জন্য নিরাপত্তার চাহিদা ঘোষণা করে।

## পরামিতি

### name

  \| `string`
  \| \{
\[`name`: `string`\]: `string`[];
\}

নিরাপত্তা বিষয়ক স্কীমের নাম, অথবা একটি পূর্ণ নিরাপত্তা বস্তু ।

### scopes?

`string`[]

স্কিম দ্বারা নির্মিত ক্ষেত্র `name` একটি পংক্তি।

## প্রাপ্ত মান

`ClassDecorator` & `MethodDecorator`
