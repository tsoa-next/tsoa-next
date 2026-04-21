---
lastUpdated: 2026-04-20T21:59:41.340Z
---
[tsoa-next](../../packages.md) / [tsoa-next](../index.md) / Response

# ফাংশন: said()

```ts
function Response<ExampleType, HeaderType>(
   name, 
   description?, 
   example?, 
   produces?): MethodDecorator & ClassDecorator;
```

নির্ধারিত মান: [packages/runtime/src/decorators/response.ts:24](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/response.ts#L24)

বিভিন্ন রেকর্ডকৃত প্রতিক্রিয়া যোগ করে যা একটি পদ্ধতি বা নিয়ন্ত্রণকারীর সাথে যুক্ত করা যাবে।

## পরামিতির পরামিতি

### ExampleType

`ExampleType`

### HeaderType

`HeaderType` * xends * 
  \| `object`
  \| `"Header names must be of type string"`
  \| `"Header values must be string or string[]"` = `object`

## পরামিতি

### name

  \| `"400"`
  \| `"401"`
  \| `"402"`
  \| `"403"`
  \| `"404"`
  \| `"405"`
  \| `"406"`
  \| `"407"`
  \| `"408"`
  \| `"409"`
  \| `"410"`
  \| `"411"`
  \| `"412"`
  \| `"413"`
  \| `"414"`
  \| `"415"`
  \| `"416"`
  \| `"417"`
  \| `"418"`
  \| `"422"`
  \| `"423"`
  \| `"424"`
  \| `"425"`
  \| `"426"`
  \| `"428"`
  \| `"429"`
  \| `"431"`
  \| `"451"`
  \| `"500"`
  \| `"501"`
  \| `"502"`
  \| `"503"`
  \| `"504"`
  \| `"505"`
  \| `"506"`
  \| `"507"`
  \| `"508"`
  \| `"510"`
  \| `"511"`
  \| [`HttpStatusCodeLiteral`](../type-aliases/HttpStatusCodeLiteral.md)
  \| `"100"`
  \| `"200"`
  \| `"101"`
  \| `"102"`
  \| `"201"`
  \| `"202"`
  \| `"203"`
  \| `"204"`
  \| `"205"`
  \| `"206"`
  \| `"207"`
  \| `"208"`
  \| `"226"`
  \| `"300"`
  \| `"301"`
  \| `"302"`
  \| `"303"`
  \| `"304"`
  \| `"305"`
  \| `"307"`
  \| `"308"`
  \| [`OtherValidOpenApiHttpStatusCode`](../type-aliases/OtherValidOpenApiHttpStatusCode.md)

HTTP অবস্থাসূচক কোড, OpenAPI প্রত্যুত্তর অথবা সীমা `default`. .

### description?

`string`

প্রাপ্ত প্রতিক্রিয়া OpenAPI ডকুমেন্ট।

### example?

`ExampleType`

schema স্কিমার জন্য একটি উদাহরণ।

### produces?

`string` \| `string`[]

মিডিয়ার ধরন অথবা ধরন।

## প্রাপ্ত মান

`MethodDecorator` & `ClassDecorator`
