---
lastUpdated: 2026-04-20T21:59:41.311Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/runtime](../index.md) / describeSpecPath

# Fonction: décrireSpecPath()

```ts
function describeSpecPath(specPath): object;
```

Définie dans : [packages/runtime/src/decorators/specPath.ts:192](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/specPath.ts#L192)

Produit un résumé lisible par l'homme d'une définition spec-path pour l'enregistrement et le diagnostic.

## Paramètres

### specPath

[`SpecPathDefinition`](../interfaces/SpecPathDefinition.md)

## Retourne

`object`

### cache

```ts
cache: string;
```

### path

```ts
path: string = specPath.path;
```

### target

```ts
target: string;
```
