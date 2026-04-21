---
lastUpdated: 2026-04-20T21:59:41.309Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/runtime](../index.md) / Middlewares

# Fonction: Middlewares()

```ts
function Middlewares<T>(...mws): ClassDecorator & MethodDecorator;
```

Définie dans : [packages/runtime/src/decorators/middlewares.ts:41](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/middlewares.ts#L41)

Attache un ou plusieurs gestionnaires d'intergiciels d'exécution à un contrôleur ou à une action.

## Paramètres de type

### T

`T` *Extends* `object` Autres `CallableFunction`

## Paramètres

### mws

...`T`[]

Les fonctions middleware ou les objets middleware à installer.

## Retourne

`ClassDecorator` & `MethodDecorator`
