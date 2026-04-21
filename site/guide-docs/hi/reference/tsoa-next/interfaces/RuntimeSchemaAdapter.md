---
lastUpdated: 2026-04-20T21:59:41.344Z
---
[tsoa-next](../../packages.md) / [tsoa-next](../index.md) / RuntimeSchemaAdapter

# इंटरफ़ेस: RuntimeSchemaAdapter

में परिभाषित: [packages/runtime/src/routeGeneration/externalValidation.ts:15](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/externalValidation.ts#L15)

एडाप्टर अनुबंध रनटाइम पर बाहरी स्कीमा पुस्तकालयों के साथ सत्यापन को निष्पादित करने के लिए उपयोग किया जाता है।

## गुण

### kind

```ts
kind: ExternalValidatorKind;
```

में परिभाषित: [packages/runtime/src/routeGeneration/externalValidation.ts:16](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/externalValidation.ts#L16)

## विधि

### validate()

```ts
validate(
   value, 
   schema, 
   context): RuntimeSchemaAdapterResult;
```

में परिभाषित: [packages/runtime/src/routeGeneration/externalValidation.ts:17](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/externalValidation.ts#L17)

#### पैरामीटर

##### value

`unknown`

##### schema

`unknown`

##### context

[`ValidationContext`](../namespaces/Tsoa/interfaces/ValidationContext.md)

#### रिटर्न

[`RuntimeSchemaAdapterResult`](../type-aliases/RuntimeSchemaAdapterResult.md)
