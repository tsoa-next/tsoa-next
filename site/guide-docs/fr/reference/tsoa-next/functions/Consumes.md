---
lastUpdated: 2026-04-20T21:59:41.338Z
---
[tsoa-next](../../packages.md) / [tsoa-next](../index.md) / Consumes

# Fonction: Consommes()

```ts
function Consumes(value): MethodDecorator;
```

Définie dans : [packages/runtime/src/decorators/parameter.ts:109](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/parameter.ts#L109)

Surpasse le type de média utilisé pour documenter un organisme de demande pour une seule action.

## Paramètres

### value

`string`

Le type de support du corps de la demande, par exemple `application/json`.
Voir [Swagger request-body documentation](https://swagger.io/docs/specification/describing-request-body/).

## Retourne

`MethodDecorator`
