---
lastUpdated: 2026-04-20T21:59:41.311Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/runtime](../index.md) / SuccessResponse

# समारोह: उत्तरदायित्व

```ts
function SuccessResponse<HeaderType>(
   name, 
   description?, 
   produces?): MethodDecorator;
```

में परिभाषित: [packages/runtime/src/decorators/response.ts:12](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/response.ts#L12)

एक ऑपरेशन के लिए सफल प्रतिक्रिया स्थिति, विवरण और मीडिया प्रकार की घोषणा करता है।

## प्रकार पैरामीटर

### HeaderType

`HeaderType` * 
  \| `object`
  \| `"Header names must be of type string"`
  \| `"Header values must be string or string[]"` = `object`

## पैरामीटर

### name

`string` \| `number`

जब ऑपरेशन सफल होता है तो HTTP स्टेटस कोड वापस आ गया।

### description?

`string`

उत्पन्न प्रतिक्रिया विवरण OpenAPI दस्तावेज़

### produces?

`string` \| `string`[]

प्रतिक्रिया मीडिया प्रकार या मीडिया प्रकार।

## रिटर्न

`MethodDecorator`
