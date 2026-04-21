---
lastUpdated: 2026-04-20T21:59:41.313Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/runtime](../index.md) / RuntimeSchemaAdapter

# Interface: RuntimeSchemaAdapter

محددة في: [packages/runtime/src/routeGeneration/externalValidation.ts:15](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/externalValidation.ts#L15)

اعتاد عقد التكييف على تنفيذ المصادقة مع مكتبات الكيماويات الخارجية في الوقت الحاضر.

## الممتلكات

### kind

```ts
kind: ExternalValidatorKind;
```

محددة في: [packages/runtime/src/routeGeneration/externalValidation.ts:16](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/externalValidation.ts#L16)

## الطرائق

### validate()

```ts
validate(
   value, 
   schema, 
   context): RuntimeSchemaAdapterResult;
```

محددة في: [packages/runtime/src/routeGeneration/externalValidation.ts:17](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/externalValidation.ts#L17)

#### البارامترات

##### value

`unknown`

##### schema

`unknown`

##### context

[`ValidationContext`](../namespaces/Tsoa/interfaces/ValidationContext.md)

#### العودة

[`RuntimeSchemaAdapterResult`](../type-aliases/RuntimeSchemaAdapterResult.md)
