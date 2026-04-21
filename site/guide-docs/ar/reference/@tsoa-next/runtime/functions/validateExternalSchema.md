---
lastUpdated: 2026-04-20T21:59:41.312Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/runtime](../index.md) / validateExternalSchema

# المهمة: المصادقة على النظام

```ts
function validateExternalSchema(
   kind, 
   schema, 
   value, 
   context?): RuntimeSchemaAdapterResult;
```

محددة في: [packages/runtime/src/routeGeneration/externalValidation.ts:291](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/externalValidation.ts#L291)

يُقيّم قيمة مع مُكيّف وقت التشغيل لمكتبة الكيماويات الخارجية المختارة.

## البارامترات

### kind

[`ExternalValidatorKind`](../namespaces/Tsoa/type-aliases/ExternalValidatorKind.md)

### schema

`unknown`

### value

`unknown`

### context?

[`ValidationContext`](../namespaces/Tsoa/interfaces/ValidationContext.md) = `{}`

## العودة

[`RuntimeSchemaAdapterResult`](../type-aliases/RuntimeSchemaAdapterResult.md)
