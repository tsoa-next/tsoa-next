---
lastUpdated: 2026-04-20T21:59:41.311Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/runtime](../index.md) / Tags

# Fonction: Étiquettes()

```ts
function Tags(...values): ClassDecorator & MethodDecorator;
```

Définie dans : [packages/runtime/src/decorators/tags.ts:6](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/tags.ts#L6)

Ajouter OpenAPI tags vers un contrôleur ou une action.

## Paramètres

### values

...`string`[]

Un ou plusieurs noms d'étiquette à joindre.

## Retourne

`ClassDecorator` & `MethodDecorator`
