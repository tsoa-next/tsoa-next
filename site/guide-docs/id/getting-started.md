---
title: Memulai
lang: id-ID
lastUpdated: 2026-04-17T20:53:42.041Z
---

# Memulai

Apa yang akan kita bicarakan:

[[toc]]

Referensi API Relevant: [`Controller`](./reference/tsoa-next/classes/Controller.md), [`@Route`](./reference/tsoa-next/functions/Route.md), [`@Get`](./reference/tsoa-next/functions/Get.md), [`@Path`](./reference/tsoa-next/functions/Path.md), [`@Query`](./reference/tsoa-next/functions/Query.md), [`@Post`](./reference/tsoa-next/functions/Post.md), [`@Body`](./reference/tsoa-next/functions/Body.md), dan [`@SuccessResponse`](./reference/tsoa-next/functions/SuccessResponse.md).

::: warning CATATAN KOMPASI
Target pemandu ini [express](https://expressjs.com) dan mengasumsikan `tsoa-next`kebijakan dukungan saat ini: Node.js 22 atau lebih baru.
Kami memverifikasi dukungan di LTS sebelumnya, LTS saat ini, dan Node Selanjutnya dalam CI.
Contoh di bawah ini termasuk `npm`, `pnpm`, dan `yarn` varian di mana perintah berbeda.
:::

## Menginisialisasi proyek kami

```shell
# Create a new folder for our project
mkdir tsoa-project
cd tsoa-project

# Initialize git
git init
```

Buat `package.json` dan `tsconfig.json` dengan pilihan manajer paket Anda:

::: code-group

```shell [npm]
npm init -y
npm exec tsc -- --init
```

```shell [pnpm]
pnpm init
pnpm exec tsc --init
```

```shell [yarn]
yarn init -y
yarn exec tsc --init
```

:::

Pasang aplikasi dan TypeScript Ketergantungan dengan manajer pilihan paket Anda:

::: code-group

```shell [npm]
npm i tsoa-next express
npm i -D typescript @types/node @types/express
```

```shell [pnpm]
pnpm add tsoa-next express
pnpm add -D typescript @types/node @types/express
```

```shell [yarn]
yarn add tsoa-next express
yarn add -D typescript @types/node @types/express
```

:::

Impor rute yang dihasilkan dari `tsoa-next`, sehingga paket instalasi aplikasi Anda juga paket yang digunakan oleh pengontrol dan dihasilkan `RegisterRoutes` file.
Anda juga dapat menemukan paket yang diterbitkan pada [npm](https://www.npmjs.com/package/tsoa-next).

## Mengatur tsoa dan typesment

```js
// tsoa.json
{
  "entryFile": "src/app.ts",
  "noImplicitAdditionalProperties": "throw-on-extras",
  "controllerPathGlobs": ["src/**/*Controller.ts"],
  "spec": {
    "outputDirectory": "build",
    "specVersion": 3
  },
  "routes": {
    "routesDir": "build"
  }
}
```

Mari kita lihat apa yang kita katakan tsoa di sini:
Pertama, kami menentukan di mana titik masuk ke aplikasi kami akan.
Kemungkinan besar, berkas ini akan dipanggil `index.ts` atau `app.ts`. Kami akan membuat file ini dalam hitungan detik.

Setelah itu, tingkat atas `controllerPathGlobs` tatanan memberitahu tsoa di mana dapat mencari controller jadi kita tidak harus mengimpornya secara manual.

Selanjutnya, kita katakan tsoa bagaimana pemeriksaan kelebihan properti yang ketat (untuk menggunakan TypeScript istilah) atau tambahan Memeriksa properti (untuk dipakai OpenAPI terminologi) seharusnya.
Kita dapat memilih untuk "mengabaikan" Properti tambahan ( OpenAPI baku), hapus mereka selama validasi ("silent-remove -extra"), atau lempar Error kembali ke Klien ("throw-on-extra").
Selanjutnya, kami mengatur direktori keluaran untuk keluar OpenAPI spesifikasi (OAS) dan kami `routes.ts` file, yang akan kita bicarakan nanti.

Kami menetapkan `specVersion` ke `3` jadi tsoa akan menghasilkan OpenAPI V3 spesifikasi.
Anda juga dapat menggunakan `3.1` ketika Anda ingin OpenAPI 3.1 keluaran.

Untuk daftar lengkap semua yang mungkin config, lihatlah [Referensi API](./reference/tsoa-next/interfaces/Config.md)

::: tip
Sementara standar ts config akan bekerja untuk panduan ini, tsconfig ditingkatkan. json akan terlihat seperti ini:
::: details

```jsonc
{
  "compilerOptions": {
    /* Basic Options */
    "incremental": true,
    "target": "es6",
    "module": "commonjs",
    "outDir": "build",

    /* Strict Type-Checking Options */
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    "noImplicitThis": true,
    "alwaysStrict": true,

    /* Additional Checks */
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,

    /* Module Resolution Options */
    "moduleResolution": "node",
    "baseUrl": ".",
    "esModuleInterop": true,

    /* Experimental Options */
    "experimentalDecorators": true,
    // emitDecoratorMetadata is not needed by tsoa-next itself

    /* Advanced Options */
    "forceConsistentCasingInFileNames": true,
  },
}
```

:::

## Mendefinisikan model pertama kita

Jika Anda sudah memiliki OpenAPI Spesifikasi, Anda dapat menggunakan ada OpenAPI Tooling untuk menghasilkan Model atau Antarmuka Anda.
Jika tidak, mari kita mendefinisikan `User` Antar muka `src/users/user.ts`.

```typescript
export interface User {
  id: number
  email: string
  name: string
  status?: 'Happy' | 'Sad'
  phoneNumbers: string[]
}
```

Sebelum kita mulai mendefinisikan Controller kami, biasanya ide yang baik untuk membuat Layanan yang menangani interaksi dengan Model kami bukannya mendorong semua logika ke dalam lapisan controler.

```ts
// src/users/usersService.ts
import { User } from './user'

// A post request should not contain an id.
export type UserCreationParams = Pick<User, 'email' | 'name' | 'phoneNumbers'>

export class UsersService {
  public get(id: number, name?: string): User {
    return {
      id,
      email: 'jane@doe.com',
      name: name ?? 'Jane Doe',
      status: 'Happy',
      phoneNumbers: [],
    }
  }

  public create(userCreationParams: UserCreationParams): User {
    return {
      id: Math.floor(Math.random() * 10000), // Random
      status: 'Happy',
      ...userCreationParams,
    }
  }
}
```

## Menentukan pengontrol sederhana

```typescript {15,17,19,20,25,26,28}
// src/users/usersController.ts
import { Body, Controller, Get, Path, Post, Query, Route, SuccessResponse } from 'tsoa-next'
import { User } from './user'
import { UsersService, UserCreationParams } from './usersService'

@Route('users')
export class UsersController extends Controller {
  @Get('{userId}')
  public async getUser(@Path() userId: number, @Query() name?: string): Promise<User> {
    return new UsersService().get(userId, name)
  }

  @SuccessResponse('201', 'Created') // Custom success response
  @Post()
  public async createUser(@Body() requestBody: UserCreationParams): Promise<void> {
    this.setStatus(201) // set return status 201
    new UsersService().create(requestBody)
    return
  }
}
```

Mari kita mundur dan berbicara tentang apa yang terjadi di sini.
Seperti yang mudah-mudahan sudah mengatakan, kita mendefinisikan `/users/` rute menggunakan [`@Route()`](./reference/tsoa-next/functions/Route.md) dekorator di atas kelas controller kami.

Selain itu, kita mendefinisikan 2 metode: `getUser` dan `createUser`.
The [`@Get()`](./reference/tsoa-next/functions/Get.md) dekorator dalam kombinasi dengan rute dasar kami `/users/` akan memberitahu tsoa untuk menjalankan metode ini untuk setiap _ GET _ permintaan untuk `/users/{{userId}}`, dimana pengguna _ {Id} _ adalah template.

::: tip Templat Path OpenAPI
Routing in tsoa adalah mirror erat OpenAPI's path templating for compatibility reasons.
Templat tapak mereferensikan penggunaan ekspresi template, ditambahi oleh kurung keriting ({}), untuk menandai bagian dari path URL sebagai dapat diganti menggunakan parameter tapak.
:::

Di bawah tudung, ini akan seperti mendefinisikan `app.get('users/:userId')`.
Sementara ekspres memungkinkan Anda untuk menggunakan definisi rute regex-ish, kami lebih suka membagi routing dan validasi lebih jelas.
Karena Anda meminta agar _ id _ menjadi _ nomor dengan menggunakan [`@Path()`](./reference/tsoa-next/functions/Path.md) dekorator dengan sebuah `userId` dari tipe nomor, tsoa akan menolak lulus yaitu a _ string _ here.
Serupa dengan itu, jika Anda ingin menerima _ string _ dengan pola tertentu, Anda dapat melakukannya menggunakan gangguan Skema JSON. Anda dapat belajar lebih banyak tentang itu [here](#what-s-next).

tsoa-next mendukung path biasa, query, header, dan dekorator tubuh, dan juga mendukung multipart dekorator format-data seperti [`@FormField()`](./reference/tsoa-next/functions/FormField.md), [`@UploadedFile()`](./reference/tsoa-next/functions/UploadedFile.md), dan [`@UploadedFiles()`](./reference/tsoa-next/functions/UploadedFiles.md), plus waktu berjalan -hanya parameter disuntikkan seperti [`@Request()`](./reference/tsoa-next/functions/Request.md) dan [`@Res()`](./reference/tsoa-next/functions/Res.md).

::: tip
Jika nama parameter sama dengan parameter pesan http, Anda dapat menghilangkan argumen ke dekorator, jika tidak Anda dapat memberikan sebuah argumen:

```ts
@Query('my-query') myQuery: string;
```

:::

Daftar lengkap dari semua dekorator dapat ditemukan [here](./decorators).

::: warning Caveat
Selalu gunakan suatu ekspor bernama (`export class C`) Pada kelas pengendali dalam rangka untuk tsoa untuk benar mengambilnya.
Ekspor bawaan (`export default class C`) saat ini tidak didukung.
:::

## Membuat server ekspres kami

Mari kita membuat `app.ts` dan `server.ts` berkas dalam direktori sumber kami seperti ini:

```ts
// src/app.ts
import express, { json, urlencoded } from 'express'
import { RegisterRoutes } from '../build/routes'

export const app = express()

// Use body parser to read sent json payloads
app.use(
  urlencoded({
    extended: true,
  }),
)
app.use(json())

RegisterRoutes(app)
```

```ts
// src/server.ts
import { app } from './app'

const port = process.env.PORT || 3000

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
```

## Membangun berkas yang dihasilkan

Pada titik ini Anda mungkin telah memperhatikan bahwa TypeScript tidak akan menemukan `RegisterRoutes` impor dari `build/routes`.
Itu karena kita belum bertanya tsoa untuk membuat berkas rute dan OpenAPI Spek belum.
Mari kita lakukan itu sekarang:

```shell
mkdir -p build # Create the build directory if it doesn't exist
```

::: code-group

```shell [npm]
npm exec tsoa -- spec-and-routes
```

```shell [pnpm]
pnpm exec tsoa spec-and-routes
```

```shell [yarn]
yarn exec tsoa spec-and-routes
```

:::

Sekarang berkas yang dihasilkan Anda seharusnya telah dibuat dan Anda dapat mengkompilasi TypeScript dan mulai server Anda:

::: code-group

```shell [npm]
npm exec tsc -- --outDir build --experimentalDecorators
```

```shell [pnpm]
pnpm exec tsc --outDir build --experimentalDecorators
```

```shell [yarn]
yarn exec tsc --outDir build --experimentalDecorators
```

:::

```shell
node build/src/server.js
```

::: tip

Anda mungkin ingin menambahkan skrip ini ke Anda `package.json` pada titik ini:

```js
"main": "build/src/server.js",
"scripts": {
  "build": "tsoa spec-and-routes && tsc",
  "start": "node build/src/server.js"
},
```

:::

## Apa selanjutnya?

- Mengucapkan secara manual `tsc` dan `tsoa routes` dalam pembangunan sangat tidak nyaman.
- Memeriksa pertama kami OpenAPI spesifikasi dan supercharging loop umpan balik kami dengan melayani versi up- to-date dari SwaggerUI selama pembangunan.

Kita dapat meningkatkan bahwa menggunakan [live reloading](./live-reloading).

- Meningkatkan respon kami untuk validasi error menggunakan tepat [error handling](./error-handling)- Menggunakan [Descriptions](./descriptions), [Contoh](./examples) dan [Annotations](./annotations) untuk validasi tingkat lanjut dan dokumentasi yang lebih baik
