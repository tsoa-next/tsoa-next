---
lastUpdated: 2026-04-20T21:59:41.339Z
---
[tsoa-next](../../packages.md) / [tsoa-next](../index.md) / Middlewares

# 函数: 中件( )

```ts
function Middlewares<T>(...mws): ClassDecorator & MethodDecorator;
```

定义如下: [packages/runtime/src/decorators/middlewares.ts:41](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/middlewares.ts#L41)

将一个或多个运行时中件处理器附加到控制器或动作上.

## 类型参数

### T

`T` *增编* `object` \| `CallableFunction`

## 参数

### mws

...`T`[]

要安装的中间软件功能或中间软件对象.

## 回返

`ClassDecorator` & `MethodDecorator`
