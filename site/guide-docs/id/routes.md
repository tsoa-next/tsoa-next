---
lastUpdated: 2026-04-17T20:53:42.041Z
---
# Mengkonsumsi rute yang dihasilkan

Referensi API Relevant: [`Config`](./reference/tsoa-next/interfaces/Config.md) dan [`@Route`](./reference/tsoa-next/functions/Route.md).

Anda memiliki dua pilihan untuk bagaimana memberitahu tsoa dimana dapat menemukan pengontrol yang akan digunakan untuk membuat auto- dihasilkan `routes.ts` file.

## Menggunakan automatic controller penemuan

Anda dapat memberitahu `tsoa-next` untuk menggunakan automatic controller penemuan dengan menyediakan satu atau lebih [minimatch globs](http://www.globtester.com/) di tingkat atas `controllerPathGlobs` bidang Anda [`Config`](./reference/tsoa-next/interfaces/Config.md) berkas (misalnya `tsoa.json`).

Pro:

- Pengembang baru dapat menambahkan pengontrol tanpa harus tahu bagaimana tsoa "Merangkak" untuk pengontrol. Selama pengendali mereka tertangkap oleh gumpalan yang Anda berikan, pengendali akan ditambahkan ke OpenAPI dokumentasi dan ke auto- dihasilkan `routes.ts` file.

Cons:

- Ini bisa sedikit lebih lambat dari pendekatan impor alternatif karena tsoa perlu memperluas dan memuat globs yang dikonfigurasi.

Seperti yang Anda lihat dari pola gumpalan pengontrol di bawah ini, Anda dapat menyediakan beberapa gumpalan dari berbagai pola:

```js
{
  "entryFile": "...",
  "controllerPathGlobs": [
    "./dir-with-controllers/*",
    "./recursive-dir/**/*",
    "./custom-filerecursive-dir/**/*.controller.ts"
  ],
  "routes": {
    "routesDir": "...",
    "middleware": "..."
  }
}
```

## Secara manual mengatakan tsoa pengontrol yang digunakan dalam berkas entri aplikasi

Jika Anda menghilangkannya `controllerPathGlobs`, tsoa dapat merangkak berkas masukan aplikasi dan mengikuti impor pengontrol yang memiliki `@Route` dekorator.

Pro:

- Generasi rute biasanya akan lebih cepat karena tsoa mengikuti impor eksplisit Anda bukan memperluas gumpalan.

Cons:

- Pengembang baru di tim Anda mungkin menambahkan pengontrol dan tidak mengerti mengapa pengendali baru tidak terkena router atau OpenAPI generasi. Jika itu adalah masalah bagi Anda, lebih suka `controllerPathGlobs`.

```typescript
import * as methodOverride from 'method-override'
import * as express from 'express'
import * as bodyParser from 'body-parser'
import { RegisterRoutes } from './routes'

// ########################################################################
// controllers need to be referenced in order to get crawled by the generator
import './users/usersController'
// ########################################################################

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(methodOverride())

RegisterRoutes(app)

app.listen(3000)
```
