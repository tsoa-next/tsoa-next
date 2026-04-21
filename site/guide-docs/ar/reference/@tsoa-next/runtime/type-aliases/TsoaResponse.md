---
lastUpdated: 2026-04-20T21:59:41.328Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/runtime](../index.md) / TsoaResponse

# نوع الياس: تسوا ريبنس\<T, BodyType, HeaderType, ReturnType\>

```ts
type TsoaResponse<T, BodyType, HeaderType, ReturnType> = (status, data, headers?) => ReturnType;
```

محددة في: [packages/runtime/src/interfaces/response.ts:77](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/response.ts#L77)

وظيفة المستجيب تم حقنها [Res](../functions/Res.md).

اتصل بالوظيفة برمز مركزي، حمولة، ورؤساء اختياريين للدائرة القصيرة، وإرسال رد من نوع ما.

## البارامترات النوعية

### T

`T` * النفقات* [`HttpStatusCodeLiteral`](HttpStatusCodeLiteral.md)

### BodyType

`BodyType`

### HeaderType

`HeaderType` * النفقات* `IsValidHeader`\<`HeaderType`\> = `object`

### ReturnType

`ReturnType` = `never`

## البارامترات

### status

`T`

### data

`BodyType`

### headers?

`HeaderType`

## العودة

`ReturnType`
