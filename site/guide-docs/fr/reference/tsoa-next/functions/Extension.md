---
lastUpdated: 2026-04-20T21:59:41.338Z
---
[tsoa-next](../../packages.md) / [tsoa-next](../index.md) / Extension

# Fonction: Extension()

```ts
function Extension(name, value): PropertyDecorator;
```

Définie dans : [packages/runtime/src/decorators/extension.ts:7](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/extension.ts#L7)

Ajoute un OpenAPI extension de spécification à une propriété modèle.

## Paramètres

### name

`string`

La clé d'extension, généralement en commençant par `x-`.

### value

  \| [`ExtensionType`](../type-aliases/ExtensionType.md)
  \| [`ExtensionType`](../type-aliases/ExtensionType.md)[]

La valeur d'extension.

## Retourne

`PropertyDecorator`
