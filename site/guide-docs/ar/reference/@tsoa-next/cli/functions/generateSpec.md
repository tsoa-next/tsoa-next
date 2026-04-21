---
lastUpdated: 2026-04-21T02:17:31.081Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/cli](../index.md) / generateSpec

# Function: generateSpec()

```ts
function generateSpec(
   swaggerConfig, 
   compilerOptions?, 
   ignorePaths?, 
   metadata?, 
defaultNumberType?): Promise<Metadata>;
```

Defined in: [cli/src/module/generate-spec.ts:22](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/module/generate-spec.ts#L22)

جينات OpenAPI وثيقة على الأقراص وتعيد البيانات الوصفية المستخدمة لبناءها.

## البارامترات

### swaggerConfig

[`ExtendedSpecConfig`](../interfaces/ExtendedSpecConfig.md)

### compilerOptions?

`CompilerOptions`

### ignorePaths?

`string`[]

### metadata?

`Metadata`

تمرير في البيانات الفوقية المتحركة عادت في خطوة سابقة لتسريع الأمور

### defaultNumberType?

`"double"` \| `"float"` \| `"integer"` \| `"long"`

## العودة

`Promise`\<`Metadata`\>
