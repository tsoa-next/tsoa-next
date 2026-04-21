---
title: Galat Penanganan
lang: id-ID
lastUpdated: 2026-04-20T00:28:55.924Z
---

# Galat Penanganan

::: warning CATATAN KOMPASI
Target pemandu ini [express](https://expressjs.com) dan mengasumsikan `tsoa-next`kebijakan dukungan saat ini: Node.js 22 atau lebih baru.
Kami memverifikasi dukungan di LTS sebelumnya, LTS saat ini, dan Node Selanjutnya dalam CI.
Contoh dalam panduan setup terkait termasuk `npm`, `pnpm`, dan `yarn` varian di mana perintah berbeda.
Panduan ini mengasumsikan Anda mengikuti [getting started guide](./getting-started) atau memiliki setup yang sama.
:::

Referensi API Relevant: [`ValidateError`](./reference/tsoa-next/classes/ValidateError.md), [`@Response`](./reference/tsoa-next/functions/Response.md), [`@Res`](./reference/tsoa-next/functions/Res.md), [`TsoaResponse`](./reference/tsoa-next/type-aliases/TsoaResponse.md), dan [`Controller`](./reference/tsoa-next/classes/Controller.md).

Seperti yang telah Anda perhatikan setelah mengikuti semua langkah dari [getting started guide](./getting-started), server kami tidak mengijinkan parameter yang tidak valid, tetapi respons belum sangat ideal.

![Current Error Response](/docs-images/errors-server.png)

Untuk klien, terlihat seperti ini:

![Client Error Response](/docs-images/errors-client.png)

## Menata penanganan galat

### Galat Validasi Penanganan

Let 's first make sure that, whenever the Client trigger a Validation Error, instead of printing the stack trace, instead we show a proctly format json response.

Pada akhir kami `app.ts`, setelah panggilan ke `RegisterRoutes(app)`, kita akan menambahkan penanganan galat global:

```ts
import express, { Response as ExResponse, Request as ExRequest, NextFunction } from 'express'
import { ValidateError } from 'tsoa-next'
// ...

app.use(function errorHandler(err: unknown, req: ExRequest, res: ExResponse, next: NextFunction): ExResponse | void {
  if (err instanceof ValidateError) {
    console.warn(`Caught Validation Error for ${req.path}:`, err.fields)
    return res.status(422).json({
      message: 'Validation Failed',
      details: err?.fields,
    })
  }
  if (err instanceof Error) {
    return res.status(500).json({
      message: 'Internal Server Error',
    })
  }

  next()
})
```

Sekarang, permintaan yang sama akan merespon seperti ini:

![Client Error with handler](/docs-images/errors-json-client.png)

Selain itu, konsol kami akan menunjukkan:

![Server Error with handler](/docs-images/errors-json-server.png)

### Menangani rute yang hilang

Dalam rangka untuk menangani urls hilang lebih anggun, kita dapat menambahkan "catch-all" penangan rute:

```ts
// app.ts
import express, { Response as ExResponse, Request as ExRequest, NextFunction } from 'express'

// ...

RegisterRoutes(app)

app.use(function notFoundHandler(_req, res: ExResponse) {
  res.status(404).send({
    message: 'Not Found',
  })
})

app.use(function errorHandler(
// ...
```

## Menspesifikasikan tipe respon kesalahan untuk OpenAPI

Jika Anda memeriksa titik akhir dokumentasi, Anda akan melihat bahwa kita tidak memiliki dokumentasi untuk Error kami belum.
Sejak TypeScript tidak memeriksa missing Error, tsoa tidak dapat menyimpulkan jenis respon kami mengirimkan dalam kasus ini.

::: warning
Gunakan `@Response` dekorator diekspor oleh `tsoa-next`, tidak Express' `Response` tipe.
Aliasi tsoa-next impor baik-baik saja, tetapi masih perlu untuk menyelesaikan ke tsoa-next dekorator.
:::

Namun, kami memiliki cara untuk Anda secara manual menentukan kembali ini:

```ts
import { Body, Controller, Post, Route, Response, SuccessResponse } from 'tsoa-next'
import { User } from './user'
import { UsersService, UserCreationParams } from './usersService'

interface ValidateErrorJSON {
  message: string
  details: { [name: string]: unknown }
}

@Route('users')
export class UsersController extends Controller {
  // more code here

  @Response<ValidateErrorJSON>(422, 'Validation Failed')
  @SuccessResponse('201', 'Created') // Custom success response
  @Post()
  public async createUser(@Body() requestBody: UserCreationParams): Promise<void> {
    this.setStatus(201) // set return status 201
    new UsersService().create(requestBody)
    return
  }
}
```

Ini harus membuat dokter kami menunjukkan sesuatu seperti ini:

![SwaggerUI showing our 422 Response](/docs-images/err-422-swui.png)

::: tip
OpenAPI memungkinkan kode status yang cocok seperti '2xx' atau pencocokan semua kode menggunakan 'default'. tsoa akan mendukung ini:

```ts
@Response<ErrorResponse>('default', 'Unexpected error')
@Get('Response')
public async getResponse(): Promise<TestModel> {
  return new ModelService().getModel()
}
```

:::

## Tipechecked alternatif respon

Dalam versi terbaru dari tsoa, kita memiliki pilihan untuk menyuntikkan sebuah framework- agnostic fungsi responder ke fungsi kita yang kita dapat memanggil untuk merumuskan sebuah respon yang tidak mematuhi dengan tipe kembali kode metode / status pengontrol kita (yang digunakan untuk respon sukses).
Hal ini terutama berguna untuk menjawab dengan balasan kesalahan tanpa risiko kesalahan tipe yang terkait dengan kesalahan melempar.
Dalam rangka untuk menyuntikkan satu / lebih responden, kita dapat menggunakan `@Res()` dekorator:

```ts
import { Route, Controller, Get, Query, Res, TsoaResponse } from 'tsoa-next'

@Route('/greeting')
export class GreetingsController extends Controller {
  /**
   * @param notFoundResponse The responder function for a not found response
   */
  @Get('/')
  public async greet(@Query() name?: string, @Res() notFoundResponse: TsoaResponse<404, { reason: string }>): Promise<string> {
    if (!name) {
      return notFoundResponse(404, { reason: 'We don\'t know you yet. Please provide a name' })
    }

    return `Hello, ${name}`
  }
}
```
