---
lastUpdated: 2026-04-20T21:59:41.342Z
---
[tsoa-next](../../packages.md) / [tsoa-next](../index.md) / validateExternalSchema

# 函数: 校验外部Schema ()

```ts
function validateExternalSchema(
   kind, 
   schema, 
   value, 
   context?): RuntimeSchemaAdapterResult;
```

定义如下: [packages/runtime/src/routeGeneration/externalValidation.ts:291](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/externalValidation.ts#L291)

用运行时间适配器验证选定外部图库的值。

## 参数

### kind

[`ExternalValidatorKind`](../namespaces/Tsoa/type-aliases/ExternalValidatorKind.md)

### schema

`unknown`

### value

`unknown`

### context?

[`ValidationContext`](../namespaces/Tsoa/interfaces/ValidationContext.md)

## 回返

[`RuntimeSchemaAdapterResult`](../type-aliases/RuntimeSchemaAdapterResult.md)
