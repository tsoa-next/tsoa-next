---
lastUpdated: 2026-04-20T21:59:41.310Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/runtime](../index.md) / Produces

# المهمة: إنتاج

```ts
function Produces(value): MethodDecorator & ClassDecorator;
```

محددة في: [packages/runtime/src/decorators/response.ts:48](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/response.ts#L48)

يتجاوز نوع وسائل الاستجابة على متحكم أو عمل واحد.

## البارامترات

### value

`string`

نوع وسائط الاستجابة، على سبيل المثال `application/json`.
انظر [Swagger media-type documentation](https://swagger.io/docs/specification/media-types/).

## العودة

`MethodDecorator` & `ClassDecorator`
