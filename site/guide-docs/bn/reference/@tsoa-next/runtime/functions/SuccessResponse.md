---
lastUpdated: 2026-04-20T21:59:41.311Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/runtime](../index.md) / SuccessResponse

# ফাংশন: সাফল্য ()

```ts
function SuccessResponse<HeaderType>(
   name, 
   description?, 
   produces?): MethodDecorator;
```

নির্ধারিত মান: [packages/runtime/src/decorators/response.ts:12](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/response.ts#L12)

কর্ম সঞ্চালনের জন্য সফল প্রতিক্রিয়া, বর্ণনা ও মিডিয়ার ধরন উল্লেখ করুন।

## পরামিতির পরামিতি

### HeaderType

`HeaderType` * xends * 
  \| `object`
  \| `"Header names must be of type string"`
  \| `"Header values must be string or string[]"` = `object`

## পরামিতি

### name

`string` \| `number`

অপারেশনের সময় HTTP অবস্থাসূচক কোড প্রাপ্ত হয়েছে।

### description?

`string`

প্রাপ্ত প্রতিক্রিয়া OpenAPI ডকুমেন্ট।

### produces?

`string` \| `string`[]

মিডিয়ার ধরন অথবা ধরন।

## প্রাপ্ত মান

`MethodDecorator`
