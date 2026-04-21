---
lastUpdated: 2026-04-17T20:53:42.040Z
---
# Carga de archivos

Referencia pertinente de API: [`File`](./reference/tsoa-next/interfaces/File.md), [`@FormField`](./reference/tsoa-next/functions/FormField.md), [`@UploadedFile`](./reference/tsoa-next/functions/UploadedFile.md), y [`@UploadedFiles`](./reference/tsoa-next/functions/UploadedFiles.md).

## Instalar el middleware de carga de tiempo de ejecución

Para Express:

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

Para Koa:

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

## Usando el `@UploadedFile` / `@UploadedFiles` decoradores

Los decoradores de carga incorporados utilizan tsoa-nextexportado [`File`](./reference/tsoa-next/interfaces/File.md) Interfaz.
Uso [`@FormField()`](./reference/tsoa-next/functions/FormField.md) para los campos multiparto sin fichero que llegan al lado de la carga.

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

## Comportamiento de almacenamiento predeterminado

Generado Express y Koa las rutas crean una instancia multer predeterminada cuando utiliza decoradores de carga.
Por defecto esa instancia mantiene archivos cargados en memoria.

Si desea subidas escritas en disco o manejadas por una configuración de multer personalizado, pase su propia instancia de multer en `RegisterRoutes(...)`.

## Configuración manual

Express ejemplo:

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

Koa ejemplo:

```ts
import Router from '@koa/router'
import multer from '@koa/multer'
import { RegisterRoutes } from '../build/routes'

const router = new Router()

RegisterRoutes(router, {
  multer: multer({ dest: 'uploads/' }),
})
```

También hay un legado de alto nivel `multerOpts` campo de config en `tsoa.json`, pero está deprecatado.
Preferir pasar una instancia de multer de concreto en `RegisterRoutes(...)`.

## Manejo manual multipart

Si eliges pasar por alto `@UploadedFile(...)` y llame a multer usted dentro de un controlador `@Request()`, usted también es responsable de documentar esa solicitud forma usted mismo.
En ese caso, fusionar los detalles de la solicitud multiparte en `spec.spec` dentro `tsoa.json` así como el generado OpenAPI document still describes the endpoint accurately.
