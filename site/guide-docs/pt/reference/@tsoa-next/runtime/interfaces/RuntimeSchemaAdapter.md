---
lastUpdated: 2026-04-20T21:59:41.313Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/runtime](../index.md) / RuntimeSchemaAdapter

# Interface: Tempo de execuçãoSchemaAdapter

Definido em: [packages/runtime/src/routeGeneration/externalValidation.ts:15](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/externalValidation.ts#L15)

Contrato adaptador usado para executar validação com bibliotecas de esquema externas em tempo de execução.

## Propriedades

### kind

```ts
kind: ExternalValidatorKind;
```

Definido em: [packages/runtime/src/routeGeneration/externalValidation.ts:16](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/externalValidation.ts#L16)

## Métodos

### validate()

```ts
validate(
   value, 
   schema, 
   context): RuntimeSchemaAdapterResult;
```

Definido em: [packages/runtime/src/routeGeneration/externalValidation.ts:17](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/externalValidation.ts#L17)

#### Parâmetros

##### value

`unknown`

##### schema

`unknown`

##### context

[`ValidationContext`](../namespaces/Tsoa/interfaces/ValidationContext.md)

#### Retorna

[`RuntimeSchemaAdapterResult`](../type-aliases/RuntimeSchemaAdapterResult.md)
