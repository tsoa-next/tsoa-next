---
lastUpdated: 2026-04-20T21:59:41.367Z
---
[tsoa-next](../../packages.md) / [tsoa-next](../index.md) / TsoaResponse

# 类型别名: TsoaResponse\<T, BodyType, HeaderType, ReturnType\>

```ts
type TsoaResponse<T, BodyType, HeaderType, ReturnType> = (status, data, headers?) => ReturnType;
```

定义如下: [packages/runtime/src/interfaces/response.ts:77](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/response.ts#L77)

响应函数形状 [Res](../functions/Res.md)。 。 。 。

使用状态代码、有效载荷和可选头调用函数来短路操作并发送打出的答复。

## 类型参数

### T

`T` *增编* [`HttpStatusCodeLiteral`](HttpStatusCodeLiteral.md)

### BodyType

`BodyType`

### HeaderType

`HeaderType` *增编* `IsValidHeader`\<`HeaderType`\> =: `object`

### ReturnType

`ReturnType` = `never`

## 参数

### status

`T`

### data

`BodyType`

### headers?

`HeaderType`

## 回返

`ReturnType`
