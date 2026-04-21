---
lastUpdated: 2026-04-20T21:59:41.367Z
---
[tsoa-next](../../packages.md) / [tsoa-next](../index.md) / TsoaResponse

# ধরন: TasoRepson\<T, BodyType, HeaderType, ReturnType\>

```ts
type TsoaResponse<T, BodyType, HeaderType, ReturnType> = (status, data, headers?) => ReturnType;
```

নির্ধারিত মান: [packages/runtime/src/interfaces/response.ts:77](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/response.ts#L77)

প্রতিক্রিয়া দ্বারা গঠিত ফাংশন [Res](../functions/Res.md). .

অবস্থাসূচক কোডসহ ফাংশানকে কল করতে হবে। শর্ট-কাট পাঠানো হলে কাজটির জন্য অথবা ভুল উত্তর পাঠাতে হবে।

## পরামিতির পরামিতি

### T

`T` * xends * [`HttpStatusCodeLiteral`](HttpStatusCodeLiteral.md)

### BodyType

`BodyType`

### HeaderType

`HeaderType` * xends * `IsValidHeader`\<`HeaderType`\> = `object`

### ReturnType

`ReturnType` = `never`

## পরামিতি

### status

`T`

### data

`BodyType`

### headers?

`HeaderType`

## প্রাপ্ত মান

`ReturnType`
