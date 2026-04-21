---
lastUpdated: 2026-04-20T21:59:41.340Z
---
[tsoa-next](../../packages.md) / [tsoa-next](../index.md) / Response

# 函数: 响应( )

```ts
function Response<ExampleType, HeaderType>(
   name, 
   description?, 
   example?, 
   produces?): MethodDecorator & ClassDecorator;
```

定义如下: [packages/runtime/src/decorators/response.ts:24](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/response.ts#L24)

添加可以附加在方法或控制器上的有文件的响应.

## 类型参数

### ExampleType

`ExampleType`

### HeaderType

`HeaderType` *增编* 
  \| `object`
  \| `"Header names must be of type string"`
  \| `"Header values must be string or string[]"` = `object`

## 参数

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

HTTP 状态代码, OpenAPI 响应范围,或 `default`。 。 。 。

### description?

`string`

生成的响应描述 OpenAPI 文档。

### example?

`ExampleType`

反应计划的有效载荷。

### produces?

`string` \| `string`[]

反应媒体类型或媒体类型.

## 回返

`MethodDecorator` & `ClassDecorator`
