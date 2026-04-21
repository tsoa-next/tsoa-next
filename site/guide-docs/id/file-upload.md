---
lastUpdated: 2026-04-17T20:53:42.040Z
---
# Mengunggah berkas

Referensi API Relevant: [`File`](./reference/tsoa-next/interfaces/File.md), [`@FormField`](./reference/tsoa-next/functions/FormField.md), [`@UploadedFile`](./reference/tsoa-next/functions/UploadedFile.md), dan [`@UploadedFiles`](./reference/tsoa-next/functions/UploadedFiles.md).

## Instal waktu-jalan upload middleware

Untuk Express:

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

Untuk Koa:

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

## Menggunakan `@UploadedFile` / `@UploadedFiles` dekorator

Pemasok built-in upload dekorator gunakan tsoa-nextDiekspor [`File`](./reference/tsoa-next/interfaces/File.md) antarmuka.
Gunakan [`@FormField()`](./reference/tsoa-next/functions/FormField.md) untuk daerah multipart non- file yang tiba di samping upload.

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

## Perilaku penyimpanan bawaan

Dihasilkan Express dan Koa rute membuat sebuah contoh multer baku ketika Anda menggunakan upload dekorator.
Secara baku bahwa instansi terus diunggah file dalam memori.

Bila Anda ingin unggah yang ditulis ke disk atau ditangani oleh konfigurasi pengap ubahan, lulus instansi multer Anda sendiri ke `RegisterRoutes(...)`.

## Konfigurasi multer gubahan

Express contoh:

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

Koa contoh:

```ts
import Router from '@koa/router'
import multer from '@koa/multer'
import { RegisterRoutes } from '../build/routes'

const router = new Router()

RegisterRoutes(router, {
  multer: multer({ dest: 'uploads/' }),
})
```

Ada juga legacy top-level `multerOpts` bidang konfigurasi dalam `tsoa.json`, tapi itu sudah ditinggalkan.
Lebih suka memberikan contoh multer beton ke `RegisterRoutes(...)`.

## Penanganan multibagian manual

Jika Anda memilih untuk bypass `@UploadedFile(...)` dan memanggil multer sendiri di dalam controller menggunakan `@Request()`, Anda juga bertanggung jawab untuk mendokumentasikan bentuk permintaan itu sendiri.
Dalam hal ini, gabungkan rincian permintaan multipart ke `spec.spec` in `tsoa.json` sehingga dihasilkan OpenAPI dokumen masih menggambarkan titik akhir secara akurat.
