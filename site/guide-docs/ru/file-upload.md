---
lastUpdated: 2026-04-17T20:53:42.040Z
---
# Загрузка файлов

Соответствующая ссылка API: [`File`](./reference/tsoa-next/interfaces/File.md), [`@FormField`](./reference/tsoa-next/functions/FormField.md), [`@UploadedFile`](./reference/tsoa-next/functions/UploadedFile.md)и [`@UploadedFiles`](./reference/tsoa-next/functions/UploadedFiles.md).

## Установить runtime upload middleware

Для Express:

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

Для Koa:

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

## Используя `@UploadedFile` / `@UploadedFiles` декораторы

Встроенные декораторы загрузки используют tsoa-nextэкспортируемый [`File`](./reference/tsoa-next/interfaces/File.md) интерфейс.
Использовать [`@FormField()`](./reference/tsoa-next/functions/FormField.md) для нефайловых многочастных полей, которые прибывают вместе с загрузкой.

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

## Поведение хранения по умолчанию

сгенерированный Express и Koa Маршруты создают экземпляр мультера по умолчанию, когда вы используете декораторы загрузки.
По умолчанию этот экземпляр сохраняет загруженные файлы в памяти.

Если вы хотите, чтобы загрузки записывались на диск или обрабатывались пользовательской конфигурацией мультера, передайте свой собственный экземпляр мультера в `RegisterRoutes(...)`.

## Конфигурация Custom Multer

Express Пример:

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

Koa Пример:

```ts
import Router from '@koa/router'
import multer from '@koa/multer'
import { RegisterRoutes } from '../build/routes'

const router = new Router()

RegisterRoutes(router, {
  multer: multer({ dest: 'uploads/' }),
})
```

Есть также наследие высшего уровня. `multerOpts` поле конфигурирования в `tsoa.json`Но это обесценивается.
Предпочитаете передавать экземпляр бетонного мультера в `RegisterRoutes(...)`.

## Ручная многокомпонентная обработка

Если вы решили обойти `@UploadedFile(...)` Позвоните Multer в контроллер, используя `@Request()`Вы также несете ответственность за документирование этого запроса.
В этом случае объедините детали многочастного запроса в `spec.spec` в `tsoa.json` Таким образом, генерируемый OpenAPI Документ по-прежнему точно описывает конечную точку.
