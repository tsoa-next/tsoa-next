---
lastUpdated: 2026-04-20T21:59:41.310Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/runtime](../index.md) / Response

# Fonction: Réponse()

```ts
function Response<ExampleType, HeaderType>(
   name, 
   description?, 
   example?, 
   produces?): MethodDecorator & ClassDecorator;
```

Définie dans : [packages/runtime/src/decorators/response.ts:24](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/response.ts#L24)

Ajoute une réponse documentée qui peut être attachée à une méthode ou à un contrôleur.

## Paramètres de type

### ExampleType

`ExampleType`

### HeaderType

`HeaderType` *Extends* 
  \| `object`
  \| `"Header names must be of type string"`
  \| `"Header values must be string or string[]"` = `object`

## Paramètres

### name

  \| `"400"`
  \| `"401"`
  \| `"402"`
  \| `"403"`
  \| `"404"`
  \| `"405"`
  \| `"406"`
  \| `"407"`
  \| `"408"`
  \| `"409"`
  \| `"410"`
  \| `"411"`
  \| `"412"`
  \| `"413"`
  \| `"414"`
  \| `"415"`
  \| `"416"`
  \| `"417"`
  \| `"418"`
  \| `"422"`
  \| `"423"`
  \| `"424"`
  \| `"425"`
  \| `"426"`
  \| `"428"`
  \| `"429"`
  \| `"431"`
  \| `"451"`
  \| `"500"`
  \| `"501"`
  \| `"502"`
  \| `"503"`
  \| `"504"`
  \| `"505"`
  \| `"506"`
  \| `"507"`
  \| `"508"`
  \| `"510"`
  \| `"511"`
  \| [`HttpStatusCodeLiteral`](../type-aliases/HttpStatusCodeLiteral.md)
  \| `"100"`
  \| `"200"`
  \| `"301"`
  \| `"302"`
  \| `"303"`
  \| `"307"`
  \| `"308"`
  \| `"101"`
  \| `"102"`
  \| `"201"`
  \| `"202"`
  \| `"203"`
  \| `"204"`
  \| `"205"`
  \| `"206"`
  \| `"207"`
  \| `"208"`
  \| `"226"`
  \| `"300"`
  \| `"304"`
  \| `"305"`
  \| [`OtherValidOpenApiHttpStatusCode`](../type-aliases/OtherValidOpenApiHttpStatusCode.md)

Le code de statut HTTP, OpenAPI plage de réponse, ou `default`.

### description?

`string`

La description de la réponse indiquée dans le produit OpenAPI document.

### example?

`ExampleType`

Un exemple de charge utile pour le schéma de réponse.

### produces?

`string` \| `string`[]

Type de médias de réponse ou types de médias.

## Retourne

`MethodDecorator` & `ClassDecorator`
