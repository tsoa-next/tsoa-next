---
lastUpdated: 2026-04-20T21:59:41.341Z
---
[tsoa-next](../../packages.md) / [tsoa-next](../index.md) / SpecPath

# Fonction: SpecPath()

```ts
function SpecPath(
   path?, 
   optionsOrTarget?, 
   cache?): ClassDecorator;
```

Définie dans : [packages/runtime/src/decorators/specPath.ts:157](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/specPath.ts#L157)

Enregistre un itinéraire local-contrôleur qui dessert le OpenAPI document ou une réponse dérivée personnalisée.

## Paramètres

### path?

`string`

Le parcours relatif. Par défaut à `spec`.

### optionsOrTarget?

  \| [`SpecPathTarget`](../type-aliases/SpecPathTarget.md)
  \| [`SpecPathOptions`](../interfaces/SpecPathOptions.md)

Soit `SpecPathOptions` objet ou l'argument de la cible.

### cache?

[`SpecPathCache`](../type-aliases/SpecPathCache.md)

Legacy cache stratégie argument. Par défaut, cache en mémoire.

## Retourne

`ClassDecorator`
