---
lastUpdated: 2026-04-20T21:59:41.310Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/runtime](../index.md) / Response

# समारोह: प्रतिक्रिया ()

```ts
function Response<ExampleType, HeaderType>(
   name, 
   description?, 
   example?, 
   produces?): MethodDecorator & ClassDecorator;
```

में परिभाषित: [packages/runtime/src/decorators/response.ts:24](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/response.ts#L24)

एक दस्तावेजी प्रतिक्रिया जोड़ें जिसे किसी विधि या नियंत्रक से जोड़ा जा सकता है।

## प्रकार पैरामीटर

### ExampleType

`ExampleType`

### HeaderType

`HeaderType` * 
  \| `object`
  \| `"Header names must be of type string"`
  \| `"Header values must be string or string[]"` = `object`

## पैरामीटर

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
  \| `"301"`
  \| `"302"`
  \| `"303"`
  \| `"307"`
  \| `"308"`
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
  \| `"304"`
  \| `"305"`
  \| [`OtherValidOpenApiHttpStatusCode`](../type-aliases/OtherValidOpenApiHttpStatusCode.md)

HTTP स्टेटस कोड OpenAPI प्रतिक्रिया सीमा, या `default`।

### description?

`string`

उत्पन्न प्रतिक्रिया विवरण OpenAPI दस्तावेज़

### example?

`ExampleType`

प्रतिक्रिया स्कीमा के लिए एक उदाहरण पेलोड।

### produces?

`string` \| `string`[]

प्रतिक्रिया मीडिया प्रकार या मीडिया प्रकार।

## रिटर्न

`MethodDecorator` & `ClassDecorator`
