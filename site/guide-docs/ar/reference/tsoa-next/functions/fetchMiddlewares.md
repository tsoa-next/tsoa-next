---
lastUpdated: 2026-04-20T21:59:41.342Z
---
[tsoa-next](../../packages.md) / [tsoa-next](../index.md) / fetchMiddlewares

# المهمة:

```ts
function fetchMiddlewares<T>(target): T[];
```

محددة في: [packages/runtime/src/decorators/middlewares.ts:55](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/middlewares.ts#L55)

Returns middleware metadata previously attached with [Middlewares](Middlewares.md).

## البارامترات النوعية

### T

`T` * النفقات* `object` ♪ `CallableFunction`

## البارامترات

### target

`MiddlewareTarget`

الطبقة أو طريقة التحكم تعمل للتفتيش

## العودة

`T`[]
