---
title: Memuat ulang secara langsung
lang: id-ID
lastUpdated: 2026-04-20T00:28:55.919Z
---

# Memuat ulang secara langsung

::: warning CATATAN KOMPASI
Target pemandu ini [express](https://expressjs.com) dan mengasumsikan `tsoa-next`kebijakan dukungan saat ini: Node.js 22 atau lebih baru.
Kami memverifikasi dukungan di LTS sebelumnya, LTS saat ini, dan Node Selanjutnya dalam CI.
Contoh di bawah ini termasuk `npm`, `pnpm`, dan `yarn` varian di mana perintah berbeda.
Kami berasumsi setup Anda mirip dengan yang direkomendasikan untuk [getting started](/id/getting-started)
:::

Referensi API Relevant: [`@SpecPath`](./reference/tsoa-next/functions/SpecPath.md), [`SpecPathOptions`](./reference/tsoa-next/interfaces/SpecPathOptions.md), [`SpecRequestContext`](./reference/tsoa-next/interfaces/SpecRequestContext.md), dan [`SpecCacheHandler`](./reference/tsoa-next/interfaces/SpecCacheHandler.md).

::: tip
Kami akan menggunakan [nodemon](https://nodemon.io/) dan [ts-node](https://github.com/TypeStrong/ts-node) untuk memuat ulang secara langsung, tetapi semua alat yang memungkinkan kita untuk menghubungkan ke proses pemuatan ulang akan dilakukan. Alternatif mungkin, yaitu kombinasi dari `tsc -w` (Dan demi angin yang bertiup dengan kencang) yang bertiup sangat kencang. `tsoa spec-and-routes` memakai [`onchange`](https://www.npmjs.com/package/onchange).
:::

Apa yang akan kita bicarakan:

[[toc]]

## Kode Reloading

### Memasang nodemon dan ts- node

::: code-group

```bash [npm]
npm i -D nodemon ts-node concurrently
```

```bash [pnpm]
pnpm add -D nodemon ts-node concurrently
```

```bash [yarn]
yarn add -D nodemon ts-node concurrently
```

:::

### Membuat konfigurasi nodemon

Sekarang, mari kita buat `nodemon.json` di dalam folder root dari proyek kami yang terlihat seperti ini:

```json
{
  "exec": "ts-node src/server.ts",
  "watch": ["src"],
  "ext": "ts"
}
```

### Menambahkan skrip dev

Mari kita otomatis memulai pengaturan ini dengan manajer paket Anda `dev` skrip (`npm run dev`, `pnpm dev`, atau `yarn dev`), dan, sementara kita berada di itu, tambahkan `build` dan `start` perintah dalam kami `package.json`:

```diff
{
  "name": "starter",
  "version": "0.0.1",
+ "scripts": {
+   "dev": "concurrently \"nodemon\" \"nodemon -x tsoa spec-and-routes\"",
+   "build": "tsoa spec-and-routes && tsc",
+   "start": "node build/src/server.js"
+ },
  "dependencies": {
  // ...
}
```

## Supercharging pengalaman pengembang kami dengan `@SpecPath`

[`@SpecPath(...)`](./reference/tsoa-next/functions/SpecPath.md) membiarkan pengontrol mengekspos sebuah spesifikasi hidup atau doc titik akhir tanpa membaca `swagger.json` atau `openapi.yaml` dari disk pada waktu permintaan.
Yang membuatnya cocok untuk proses pembangunan dimana Anda ingin dokumentasi yang dihasilkan tetap selaras dengan metadata pengontrol yang sama yang telah Anda gunakan.

### Memasang peer UI dokter

Pilih target UI dokter yang ingin Anda gunakan:

- Express: `npm i swagger-ui-express` / `pnpm add swagger-ui-express` / `yarn add swagger-ui-express`- Koa: `npm i swagger-ui-koa` / `pnpm add swagger-ui-koa` / `yarn add swagger-ui-koa`- Hapi: `npm i hapi-swagger` / `pnpm add hapi-swagger` / `yarn add hapi-swagger`- Redoc: `npm i redoc` / `pnpm add redoc` / `yarn add redoc`- RapiDoc: `npm i rapidoc` / `pnpm add rapidoc` / `yarn add rapidoc`

### Menampilkan controller-scoped docs titik akhir

Lampirkan satu atau lebih `@SpecPath(...)` dekorator ke pengontrol yang ada:

```ts
import { Controller, Get, Route, SpecPath } from 'tsoa-next'

@Route('users')
@SpecPath()
@SpecPath('openapi.yaml', { target: 'yaml' })
@SpecPath('docs', { target: 'swagger' })
export class UsersController extends Controller {
  @Get()
  public list(): string[] {
    return []
  }
}
```

Ini memberi Anda:

- `GET /users/spec` untuk JSON
- `GET /users/openapi.yaml` untuk YAML
- `GET /users/docs` untuk Swagger UI

Karena titik akhir dokumen dihasilkan dari metadata runtime yang sama dengan rute Anda, itu tetap saat Anda mengedit controller dan re- run `tsoa spec-and-routes`.

### Menilik Dokumentasi

Sekarang, ketika kita menavigasi ke <a href="http://localhost:3000/users/docs" target="_blank" rel="noreferrer">localhost: 3000 / users / docs</a>, kita harus melihat refleksi saat ini dari API kami.

![SwaggerUI](/docs-images/SwaggerUI.png)

### Mengirim permintaan melalui Swagger UI

Kita dapat memilih titik akhir, klik tombol "Coba keluar" dan masukkan beberapa data dengan mengisi formulir.
Ketika kita menekan "Eksekusi", permintaan itu akan dikirim ke server kita dan respons akan ditampilkan di bawah bentuk.

![SwaggerUI Response](/docs-images/SwUi-Response.png)

### Bangunan lain dalam target

Jika Anda lebih suka UI yang berbeda, mengubah `target` pilihan:

- `@SpecPath('docs', { target: 'redoc' })`- `@SpecPath('docs', { target: 'rapidoc' })`

Bila Anda memerlukan jawaban ubahan penuh, kirim penangan masuk `target` sebagai gantinya. Anda juga dapat menambahkan `cache` dan `gate` dalam opsi yang sama objek.
