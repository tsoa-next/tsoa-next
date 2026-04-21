---
lastUpdated: 2026-04-17T20:53:42.039Z
---
# Custom Middlewares

The `@Middlewares` dekorator digunakan untuk menerapkan middleware gubahan ke titik akhir dalam anda TypeScript kode. Perangkat menengah ini mencegat permintaan HTTP yang masuk sebelum mencapai titik akhir dan memungkinkan Anda untuk melakukan operasi tambahan atau modifikasi. Ini menyediakan dukungan untuk Express, Koa, dan Hapi perantara.
Referensi API Relevant: [`@Middlewares`](./reference/tsoa-next/functions/Middlewares.md), [`@Request`](./reference/tsoa-next/functions/Request.md), [`Controller`](./reference/tsoa-next/classes/Controller.md), [`@Route`](./reference/tsoa-next/functions/Route.md), dan [`@Get`](./reference/tsoa-next/functions/Get.md).

## Contoh

```ts
import type { NextFunction, Request, Response } from 'express'
import { Controller, Get, Middlewares, Request as TsoaRequest, Route } from 'tsoa-next'

async function customMiddleware(req: Request, _res: Response, next: NextFunction) {
  req.headers['x-middleware-hit'] = 'true'
  next()
}

@Route('examples')
export class ExampleController extends Controller {
  @Get('custom-middleware')
  @Middlewares(customMiddleware)
  public async exampleGetEndpoint(@TsoaRequest() req: Request): Promise<{ middlewareHit: boolean }> {
    return {
      middlewareHit: req.header('x-middleware-hit') === 'true',
    }
  }
}
```

## Flow Eksekusi

Ketika permintaan HTTP dibuat ke titik akhir dihiasi dengan `@Middlewares`, aliran eksekusi sebagai berikut:

Permintaan pertama melalui fungsi middleware gubahan dispesifikasikan dalam `@Middlewares` dekorator.
Di dalam fungsi Middleware, Anda dapat melakukan operasi yang diperlukan atau modifikasi pada objek permintaan atau respon.

Setelah menyelesaikan logika middleware, Anda harus memanggil `next()` fungsi untuk lulus permintaan ke middleware berikutnya atau titik akhir itu sendiri.

Akhirnya, permintaan mencapai metode exampleGetEndpoint, di mana Anda dapat menangani permintaan dan memberikan respon yang sesuai.

Jika beberapa middlewares dispesifikasikan, mereka dieksekusi dalam urutan mereka lulus ke `@Middlewares(...)`.

## TypeScript Permintaan

Menggunakan middleware gubahan memerlukan dekorator untuk diaktifkan TypeScript:

```jsonc
{
  "compilerOptions": {
    // ...
    "experimentalDecorators": true,
    // ...
  }
}
```

`emitDecoratorMetadata` tidak dibutuhkan oleh `tsoa-next` untuk `@Middlewares(...)`.
Hanya mengaktifkannya ketika Anda sendiri middleware, DI kontainer, atau validasi stack tergantung pada menunjuk metadata waktu.
