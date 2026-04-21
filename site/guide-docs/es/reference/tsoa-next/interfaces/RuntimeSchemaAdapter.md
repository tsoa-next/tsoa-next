---
lastUpdated: 2026-04-20T21:59:41.344Z
---
[tsoa-next](../../packages.md) / [tsoa-next](../index.md) / RuntimeSchemaAdapter

# Interfaz: RuntimeSchemaAdapter

Definido en: [packages/runtime/src/routeGeneration/externalValidation.ts:15](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/externalValidation.ts#L15)

Contrato de adaptador utilizado para ejecutar validación con bibliotecas de esquema externas en tiempo de ejecución.

## Propiedades

### kind

```ts
kind: ExternalValidatorKind;
```

Definido en: [packages/runtime/src/routeGeneration/externalValidation.ts:16](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/externalValidation.ts#L16)

## Métodos

### validate()

```ts
validate(
   value, 
   schema, 
   context): RuntimeSchemaAdapterResult;
```

Definido en: [packages/runtime/src/routeGeneration/externalValidation.ts:17](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/externalValidation.ts#L17)

#### Parámetros

##### value

`unknown`

##### schema

`unknown`

##### context

[`ValidationContext`](../namespaces/Tsoa/interfaces/ValidationContext.md)

#### Devoluciones

[`RuntimeSchemaAdapterResult`](../type-aliases/RuntimeSchemaAdapterResult.md)
