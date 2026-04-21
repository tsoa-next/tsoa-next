---
lastUpdated: 2026-04-17T20:53:42.040Z
---
# Enviando arquivos

Referência da API relevante: [`File`](./reference/tsoa-next/interfaces/File.md), [`@FormField`](./reference/tsoa-next/functions/FormField.md), [`@UploadedFile`](./reference/tsoa-next/functions/UploadedFile.md), e [`@UploadedFiles`](./reference/tsoa-next/functions/UploadedFiles.md).

## Instalar o middleware de envio em tempo de execução

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

## Utilizar o `@UploadedFile` / `@UploadedFiles` Decoradores

Os decoradores incorporados usam tsoa-nexté exportado [`File`](./reference/tsoa-next/interfaces/File.md) interface.
Utilização [`@FormField()`](./reference/tsoa-next/functions/FormField.md) para os campos não-file multipart que chegam ao lado do upload.

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

## Comportamento padrão de armazenamento

Gerado Express e Koa as rotas criam uma instância multifacetada padrão quando você usa decoradores de upload.
Por padrão, essa instância mantém os arquivos carregados na memória.

Se você quiser envios escritos no disco ou manipulados por uma configuração de multer personalizada, passe sua própria instância de multer para `RegisterRoutes(...)`.

## Configuração personalizada do multer

Express exemplo:

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

Koa exemplo:

```ts
import Router from '@koa/router'
import multer from '@koa/multer'
import { RegisterRoutes } from '../build/routes'

const router = new Router()

RegisterRoutes(router, {
  multer: multer({ dest: 'uploads/' }),
})
```

Há também um legado de nível superior `multerOpts` campo de configuração em `tsoa.json`, mas está desactualizado.
Prefere passar uma instância de concreto para `RegisterRoutes(...)`.

## Manipulação manual de várias partes

Se optar por ignorar `@UploadedFile(...)` e chamar multer você mesmo dentro de um controlador usando `@Request()`, você também é responsável por documentar esse pedido moldar-se.
Nesse caso, funde os detalhes da solicitação multiparte em `spec.spec` em `tsoa.json` assim o gerado OpenAPI o documento ainda descreve o ponto final com precisão.
