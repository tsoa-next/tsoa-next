---
lastUpdated: 2026-04-20T21:59:41.340Z
---
[tsoa-next](../../packages.md) / [tsoa-next](../index.md) / Res

# المهمة: إعادة النظر

```ts
function Res(): ParameterDecorator;
```

محددة في: [packages/runtime/src/decorators/response.ts:38](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/response.ts#L38)

Inject a library-agnostic responder function that can be used to construct type- checked (usually mistake-) responses.

شطب البارامترات `TsoaResponse<Status, Data, Headers>` هكذا tsoa يمكن أن يستدل من الرد الموثق.

## العودة

`ParameterDecorator`
