---
lastUpdated: 2026-04-20T21:59:41.344Z
---
[tsoa-next](../../packages.md) / [tsoa-next](../index.md) / RuntimeSchemaAdapter

# Interface: RuntimeSchemaAdapter

Définie dans : [packages/runtime/src/routeGeneration/externalValidation.ts:15](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/externalValidation.ts#L15)

Contrat d'adaptateur utilisé pour exécuter la validation avec des bibliothèques de schémas externes à l'exécution.

## Propriétés

### kind

```ts
kind: ExternalValidatorKind;
```

Définie dans : [packages/runtime/src/routeGeneration/externalValidation.ts:16](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/externalValidation.ts#L16)

## Méthodes

### validate()

```ts
validate(
   value, 
   schema, 
   context): RuntimeSchemaAdapterResult;
```

Définie dans : [packages/runtime/src/routeGeneration/externalValidation.ts:17](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/externalValidation.ts#L17)

#### Paramètres

##### value

`unknown`

##### schema

`unknown`

##### context

[`ValidationContext`](../namespaces/Tsoa/interfaces/ValidationContext.md)

#### Retourne

[`RuntimeSchemaAdapterResult`](../type-aliases/RuntimeSchemaAdapterResult.md)
