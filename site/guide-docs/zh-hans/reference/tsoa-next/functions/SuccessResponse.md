---
lastUpdated: 2026-04-20T21:59:41.341Z
---
[tsoa-next](../../packages.md) / [tsoa-next](../index.md) / SuccessResponse

# 函数: 成功响应 ()

```ts
function SuccessResponse<HeaderType>(
   name, 
   description?, 
   produces?): MethodDecorator;
```

定义如下: [packages/runtime/src/decorators/response.ts:12](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/response.ts#L12)

宣布一项行动的成功响应状态、描述和媒体类型。

## 类型参数

### HeaderType

`HeaderType` *增编* 
  \| `object`
  \| `"Header names must be of type string"`
  \| `"Header values must be string or string[]"` = `object`

## 参数

### name

`string` \| `number`

操作成功后, HTTP 状态代码返回 。

### description?

`string`

生成的响应描述 OpenAPI 文档。

### produces?

`string` \| `string`[]

反应媒体类型或媒体类型.

## 回返

`MethodDecorator`
