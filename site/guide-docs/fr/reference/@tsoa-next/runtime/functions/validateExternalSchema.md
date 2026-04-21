---
lastUpdated: 2026-04-20T21:59:41.312Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/runtime](../index.md) / validateExternalSchema

# Fonction: validerSchema externe()

```ts
function validateExternalSchema(
   kind, 
   schema, 
   value, 
   context?): RuntimeSchemaAdapterResult;
```

Définie dans : [packages/runtime/src/routeGeneration/externalValidation.ts:291](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/externalValidation.ts#L291)

Valide une valeur avec l'adaptateur d'exécution pour la bibliothèque de schéma externe sélectionnée.

## Paramètres

### kind

[`ExternalValidatorKind`](../namespaces/Tsoa/type-aliases/ExternalValidatorKind.md)

### schema

`unknown`

### value

`unknown`

### context?

[`ValidationContext`](../namespaces/Tsoa/interfaces/ValidationContext.md) = `{}`

## Retourne

[`RuntimeSchemaAdapterResult`](../type-aliases/RuntimeSchemaAdapterResult.md)
