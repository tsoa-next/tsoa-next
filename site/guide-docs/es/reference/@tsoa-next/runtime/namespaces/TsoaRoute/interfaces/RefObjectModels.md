---
lastUpdated: 2026-04-20T21:59:41.326Z
---
[tsoa-next](../../../../../packages.md) / [@tsoa-next/runtime](../../../index.md) / [TsoaRoute](../index.md) / RefObjectModels

# Interfaz: RefObjectModels

Definido en: [packages/runtime/src/routeGeneration/tsoa-route.ts:26](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/tsoa-route.ts#L26)

Este es un tipo de comodidad para que pueda comprobar .properties en los artículos del Registro sin tener que TypeScript lanzar un error de compilador. Eso es porque este Registro no puede tener enums en él. Si quieres eso, entonces usa la interfaz base

## Extensión

- [`Models`](Models.md)

## Indexable

```ts
[refNames: string]: RefObjectModelSchema
```
