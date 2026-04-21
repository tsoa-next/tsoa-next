---
lastUpdated: 2026-04-20T21:59:41.328Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/runtime](../index.md) / TsoaResponse

# Type Alias: TsoaRéponse\<T, BodyType, HeaderType, ReturnType\>

```ts
type TsoaResponse<T, BodyType, HeaderType, ReturnType> = (status, data, headers?) => ReturnType;
```

Définie dans : [packages/runtime/src/interfaces/response.ts:77](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/response.ts#L77)

Forme de la fonction réceptrice injectée par [Res](../functions/Res.md).

Appelez la fonction avec un code d'état, une charge utile et des en-têtes optionnels pour court-circuiter l'action et envoyer une réponse tapée.

## Paramètres de type

### T

`T` *Extends* [`HttpStatusCodeLiteral`](HttpStatusCodeLiteral.md)

### BodyType

`BodyType`

### HeaderType

`HeaderType` *Extends* `IsValidHeader`\<`HeaderType`\> = `object`

### ReturnType

`ReturnType` = `never`

## Paramètres

### status

`T`

### data

`BodyType`

### headers?

`HeaderType`

## Retourne

`ReturnType`
