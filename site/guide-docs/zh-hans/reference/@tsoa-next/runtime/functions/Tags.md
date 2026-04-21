---
lastUpdated: 2026-04-20T21:59:41.311Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/runtime](../index.md) / Tags

# 函数: 标记( )

```ts
function Tags(...values): ClassDecorator & MethodDecorator;
```

定义如下: [packages/runtime/src/decorators/tags.ts:6](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/tags.ts#L6)

添加数 OpenAPI 标记到控制器或动作。

## 参数

### values

...`string`[]

要附加一个或多个标签名称 。

## 回返

`ClassDecorator` & `MethodDecorator`
