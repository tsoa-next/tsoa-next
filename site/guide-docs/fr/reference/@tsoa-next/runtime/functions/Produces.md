---
lastUpdated: 2026-04-20T21:59:41.310Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/runtime](../index.md) / Produces

# Fonction: Produit()

```ts
function Produces(value): MethodDecorator & ClassDecorator;
```

Définie dans : [packages/runtime/src/decorators/response.ts:48](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/response.ts#L48)

Surpasse le type de support de réponse sur un contrôleur ou une seule action.

## Paramètres

### value

`string`

Le type de média de réponse, par exemple `application/json`.
Voir [Swagger media-type documentation](https://swagger.io/docs/specification/media-types/).

## Retourne

`MethodDecorator` & `ClassDecorator`
