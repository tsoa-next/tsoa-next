---
lastUpdated: 2026-04-20T21:59:41.364Z
---
[tsoa-next](../../../../packages.md) / [tsoa-next](../../../index.md) / [TsoaRoute](../index.md) / RefObjectModels

# Interface: RefObjectModèles

Définie dans : [packages/runtime/src/routeGeneration/tsoa-route.ts:26](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/tsoa-route.ts#L26)

Il s'agit d'un type de commodité afin que vous puissiez vérifier .properties sur les éléments du Record sans avoir TypeScript lancer une erreur de compilateur. C'est parce que ce Record ne peut pas avoir d'enums dedans. Si vous le voulez, utilisez l'interface de base

## Prolongation

- [`Models`](Models.md)

## Indexable

```ts
[refNames: string]: RefObjectModelSchema
```
