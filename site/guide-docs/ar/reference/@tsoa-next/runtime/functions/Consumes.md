---
lastUpdated: 2026-04-20T21:59:41.309Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/runtime](../index.md) / Consumes

# المهمة: الاستهلاك

```ts
function Consumes(value): MethodDecorator;
```

محددة في: [packages/runtime/src/decorators/parameter.ts:109](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/parameter.ts#L109)

يتجاوز نوع وسائط الإعلام المستخدمة لتوثيق هيئة طلب لاتخاذ إجراء واحد.

## البارامترات

### value

`string`

نوع وسائل الإعلام المطلوبة، على سبيل المثال `application/json`.
انظر [Swagger request-body documentation](https://swagger.io/docs/specification/describing-request-body/).

## العودة

`MethodDecorator`
