---
lastUpdated: 2026-04-20T21:59:41.309Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/runtime](../index.md) / Middlewares

# المهمة: وسط الحرب

```ts
function Middlewares<T>(...mws): ClassDecorator & MethodDecorator;
```

محددة في: [packages/runtime/src/decorators/middlewares.ts:41](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/middlewares.ts#L41)

يقوم بمراقب أو عمل

## البارامترات النوعية

### T

`T` * النفقات* `object` ♪ `CallableFunction`

## البارامترات

### mws

...`T`[]

وظائف الإطارات المتوسطة أو البرمجيات المتوسطة

## العودة

`ClassDecorator` & `MethodDecorator`
