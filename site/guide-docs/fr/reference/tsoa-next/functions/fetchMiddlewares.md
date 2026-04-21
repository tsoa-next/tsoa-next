---
lastUpdated: 2026-04-20T21:59:41.342Z
---
[tsoa-next](../../packages.md) / [tsoa-next](../index.md) / fetchMiddlewares

# Fonction: fetchMiddlewares()

```ts
function fetchMiddlewares<T>(target): T[];
```

Définie dans : [packages/runtime/src/decorators/middlewares.ts:55](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/middlewares.ts#L55)

Retourne les métadonnées intergiciels précédemment jointes avec [Middlewares](Middlewares.md).

## Paramètres de type

### T

`T` *Extends* `object` Autres `CallableFunction`

## Paramètres

### target

`MiddlewareTarget`

La classe de contrôleur ou la fonction de méthode à inspecter.

## Retourne

`T`[]
