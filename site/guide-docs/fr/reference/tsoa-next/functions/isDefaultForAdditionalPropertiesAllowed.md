---
lastUpdated: 2026-04-20T21:59:41.342Z
---
[tsoa-next](../../packages.md) / [tsoa-next](../index.md) / isDefaultForAdditionalPropertiesAllowed

# Fonction: isDefaultForAdditionalPropertiesAllowed()

```ts
function isDefaultForAdditionalPropertiesAllowed(test): test is undefined;
```

Définie dans : [packages/runtime/src/routeGeneration/tsoa-route.ts:6](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/tsoa-route.ts#L6)

Retourne `true` quand un schéma de modèle s'appuie sur OpenAPIPar défaut `additionalProperties` comportement.

## Paramètres

### test

  \| `boolean`
  \| [`PropertySchema`](../namespaces/TsoaRoute/interfaces/PropertySchema.md)
  \| `undefined`

## Retourne

`test is undefined`
