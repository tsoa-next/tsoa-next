---
lastUpdated: 2026-04-20T21:59:41.341Z
---
[tsoa-next](../../packages.md) / [tsoa-next](../index.md) / Validate

# Fonction: Valider()

```ts
function Validate(...args): ParameterDecorator;
```

Définie dans : [packages/runtime/src/decorators/validate.ts:141](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/validate.ts#L141)

Joindre des métadonnées de validation externe au paramètre contrôleur.

Les formulaires `@Validate(schema)`, `@Validate(kind, schema)`et `@Validate({ kind, schema })`.

## Paramètres

### args

...`unknown`[]

## Retourne

`ParameterDecorator`
