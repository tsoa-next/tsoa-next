---
lastUpdated: 2026-04-20T21:59:41.341Z
---
[tsoa-next](../../packages.md) / [tsoa-next](../index.md) / SuccessResponse

# Fonction: SuccessReponse()

```ts
function SuccessResponse<HeaderType>(
   name, 
   description?, 
   produces?): MethodDecorator;
```

Définie dans : [packages/runtime/src/decorators/response.ts:12](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/response.ts#L12)

Déclare le statut de réponse, la description et les types de médias pour une opération.

## Paramètres de type

### HeaderType

`HeaderType` *Extends* 
  \| `object`
  \| `"Header names must be of type string"`
  \| `"Header values must be string or string[]"` = `object`

## Paramètres

### name

`string` \| `number`

Le code d'état HTTP est retourné lorsque l'opération réussit.

### description?

`string`

La description de la réponse indiquée dans le produit OpenAPI document.

### produces?

`string` \| `string`[]

Type de médias de réponse ou types de médias.

## Retourne

`MethodDecorator`
