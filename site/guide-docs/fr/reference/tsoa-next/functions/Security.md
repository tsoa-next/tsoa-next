---
lastUpdated: 2026-04-20T21:59:41.341Z
---
[tsoa-next](../../packages.md) / [tsoa-next](../index.md) / Security

# Fonction: Sécurité()

```ts
function Security(name, scopes?): ClassDecorator & MethodDecorator;
```

Définie dans : [packages/runtime/src/decorators/security.ts:16](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/security.ts#L16)

Déclare l'exigence de sécurité pour un contrôleur ou une action.

## Paramètres

### name

  \| `string`
  \| \{
\[`name`: `string`\]: `string`[];
\}

Le nom du système de sécurité, ou un objet de sécurité complet.

### scopes?

`string`[]

Couvertures requises par le régime `name` est une corde.

## Retourne

`ClassDecorator` & `MethodDecorator`
