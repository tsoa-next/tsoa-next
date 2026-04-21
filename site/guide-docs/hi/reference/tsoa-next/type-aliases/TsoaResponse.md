---
lastUpdated: 2026-04-20T21:59:41.367Z
---
[tsoa-next](../../packages.md) / [tsoa-next](../index.md) / TsoaResponse

# प्रकार उपनाम: TsoaResponse\<T, BodyType, HeaderType, ReturnType\>

```ts
type TsoaResponse<T, BodyType, HeaderType, ReturnType> = (status, data, headers?) => ReturnType;
```

में परिभाषित: [packages/runtime/src/interfaces/response.ts:77](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/response.ts#L77)

उत्तरदाता समारोह आकार द्वारा इंजेक्ट [Res](../functions/Res.md)।

एक स्टेटस कोड, पेलोड और वैकल्पिक हेडर के साथ कार्य को शॉर्ट सर्किट करने के लिए कॉल करें और एक टाइप प्रतिक्रिया भेजें।

## प्रकार पैरामीटर

### T

`T` * [`HttpStatusCodeLiteral`](HttpStatusCodeLiteral.md)

### BodyType

`BodyType`

### HeaderType

`HeaderType` * `IsValidHeader`\<`HeaderType`\> = `object`

### ReturnType

`ReturnType` = `never`

## पैरामीटर

### status

`T`

### data

`BodyType`

### headers?

`HeaderType`

## रिटर्न

`ReturnType`
