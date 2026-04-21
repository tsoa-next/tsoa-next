---
lastUpdated: 2026-04-17T20:53:42.040Z
---
# Chargement des fichiers

Référence IPA pertinente: [`File`](./reference/tsoa-next/interfaces/File.md), [`@FormField`](./reference/tsoa-next/functions/FormField.md), [`@UploadedFile`](./reference/tsoa-next/functions/UploadedFile.md)et [`@UploadedFiles`](./reference/tsoa-next/functions/UploadedFiles.md).

## Installez le middleware de téléchargement d'exécution

Pour Express:

::: code-group

```bash [npm]
npm install multer
npm install -D @types/multer
```

```bash [pnpm]
pnpm add multer
pnpm add -D @types/multer
```

```bash [yarn]
yarn add multer
yarn add -D @types/multer
```

:::

Pour Koa:

::: code-group

```bash [npm]
npm install @koa/multer
```

```bash [pnpm]
pnpm add @koa/multer
```

```bash [yarn]
yarn add @koa/multer
```

:::

## Utilisation `@UploadedFile` / `@UploadedFiles` décorateurs

Les décorateurs de téléchargement intégrés utilisent tsoa-nextExportations [`File`](./reference/tsoa-next/interfaces/File.md) interface.
Utilisation [`@FormField()`](./reference/tsoa-next/functions/FormField.md) pour les champs multiparties non-fichier qui arrivent à côté du téléchargement.

```ts
import { Controller, File, FormField, Post, Route, UploadedFile, UploadedFiles } from 'tsoa-next'

@Route('files')
export class FilesController extends Controller {
  @Post('single')
  public async uploadSingle(@FormField() title: string, @UploadedFile('asset') asset: File): Promise<{ title: string; originalName: string }> {
    return {
      title,
      originalName: asset.originalname,
    }
  }

  @Post('many')
  public async uploadMany(@UploadedFiles('assets') assets: File[]): Promise<{ count: number }> {
    return {
      count: assets.length,
    }
  }
}
```

## Comportement de stockage par défaut

Générés Express et Koa les itinéraires créent une instance multer par défaut lorsque vous utilisez des décorateurs de téléchargement.
Par défaut, cette instance conserve les fichiers téléchargés en mémoire.

Si vous voulez des téléchargements écrits sur le disque ou gérés par une configuration multer personnalisée, passez votre propre instance multer dans `RegisterRoutes(...)`.

## Configuration de multer personnalisée

Express exemple:

```ts
import express, { json, urlencoded } from 'express'
import multer from 'multer'
import { RegisterRoutes } from '../build/routes'

const app = express()

app.use(urlencoded({ extended: true }))
app.use(json())

RegisterRoutes(app, {
  multer: multer({ dest: 'uploads/' }),
})
```

Koa exemple:

```ts
import Router from '@koa/router'
import multer from '@koa/multer'
import { RegisterRoutes } from '../build/routes'

const router = new Router()

RegisterRoutes(router, {
  multer: multer({ dest: 'uploads/' }),
})
```

Il y a aussi un legs de haut niveau `multerOpts` champ de configuration dans `tsoa.json`, mais il est déprécié.
Préférez passer une instance de multer en béton dans `RegisterRoutes(...)`.

## Manipulation manuelle en plusieurs parties

Si vous choisissez de contourner `@UploadedFile(...)` et appelez multer vous-même dans un contrôleur en utilisant `@Request()`, vous êtes également responsable de documenter vous-même cette demande.
Dans ce cas, fusionner les détails de la requête en plusieurs parties `spec.spec` dans `tsoa.json` donc le produit OpenAPI document décrit toujours avec précision le paramètre.
