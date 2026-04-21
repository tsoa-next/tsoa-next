---
lastUpdated: 2026-04-20T21:59:41.341Z
---
[tsoa-next](../../packages.md) / [tsoa-next](../index.md) / UploadedFile

# Fonction: TéléchargerFichier()

```ts
function UploadedFile(name?): ParameterDecorator;
```

Définie dans : [packages/runtime/src/decorators/parameter.ts:81](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/parameter.ts#L81)

Reliure un seul fichier téléchargé à partir d'une requête multipart/form-data.

## Paramètres

### name?

`string`

Le nom de champ multipart. Par défaut au nom du paramètre.

## Retourne

`ParameterDecorator`
