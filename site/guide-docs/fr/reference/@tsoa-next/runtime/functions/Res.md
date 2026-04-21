---
lastUpdated: 2026-04-20T21:59:41.310Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/runtime](../index.md) / Res

# Fonction: Res()

```ts
function Res(): ParameterDecorator;
```

Définie dans : [packages/runtime/src/decorators/response.ts:38](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/response.ts#L38)

Injectez une fonction de répondeur agnostique-bibliothèque qui peut être utilisée pour construire des réponses vérifiées par type (généralement par erreur).

Annoter le paramètre comme `TsoaResponse<Status, Data, Headers>` donc tsoa peut déduire la réponse documentée.

## Retourne

`ParameterDecorator`
