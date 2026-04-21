---
lastUpdated: 2026-04-20T21:59:41.342Z
---
[tsoa-next](../../packages.md) / [tsoa-next](../index.md) / fetchMiddlewares

# 函数: 获取Middlewares ()

```ts
function fetchMiddlewares<T>(target): T[];
```

定义如下: [packages/runtime/src/decorators/middlewares.ts:55](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/middlewares.ts#L55)

返回先前所附的中间软件元数据 [Middlewares](Middlewares.md)。 。 。 。

## 类型参数

### T

`T` *增编* `object` \| `CallableFunction`

## 参数

### target

`MiddlewareTarget`

控制器类别或方法可以检查。

## 回返

`T`[]
