---
lastUpdated: 2026-04-20T21:59:41.312Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/runtime](../index.md) / validateExternalSchema

# Função: validateExternalSchema ()

```ts
function validateExternalSchema(
   kind, 
   schema, 
   value, 
   context?): RuntimeSchemaAdapterResult;
```

Definido em: [packages/runtime/src/routeGeneration/externalValidation.ts:291](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/externalValidation.ts#L291)

Valida um valor com o adaptador de tempo de execução para a biblioteca de esquemas externa selecionada.

## Parâmetros

### kind

[`ExternalValidatorKind`](../namespaces/Tsoa/type-aliases/ExternalValidatorKind.md)

### schema

`unknown`

### value

`unknown`

### context?

[`ValidationContext`](../namespaces/Tsoa/interfaces/ValidationContext.md) = `{}`

## Retorna

[`RuntimeSchemaAdapterResult`](../type-aliases/RuntimeSchemaAdapterResult.md)
