---
lastUpdated: 2026-04-17T20:53:42.039Z
---
# Dekorator

Harap dicatat bahwa bagian ini hanya mencakup dekorator yang tidak dijelaskan secara terpisah, seperti [`@Response`](./error-handling) atau inti parameter dekorator diperkenalkan di [Memulai](./getting-started).
Untuk gambaran penuh, silakan periksa [Referensi API](./reference/).
Referensi API Relevant: [`@Security`](./reference/tsoa-next/functions/Security.md), [`@NoSecurity`](./reference/tsoa-next/functions/NoSecurity.md), [`@Tags`](./reference/tsoa-next/functions/Tags.md), [`@OperationId`](./reference/tsoa-next/functions/OperationId.md), [`@Deprecated`](./reference/tsoa-next/functions/Deprecated.md), [`@Validate`](./reference/tsoa-next/functions/Validate.md), [`@SpecPath`](./reference/tsoa-next/functions/SpecPath.md), [`@Hidden`](./reference/tsoa-next/functions/Hidden.md), [`@Request`](./reference/tsoa-next/functions/Request.md), [`@RequestProp`](./reference/tsoa-next/functions/RequestProp.md), [`@Inject`](./reference/tsoa-next/functions/Inject.md), [`@Produces`](./reference/tsoa-next/functions/Produces.md), dan [`@Consumes`](./reference/tsoa-next/functions/Consumes.md).

## Keamanan

The [`@Security`](./reference/tsoa-next/functions/Security.md) dekorator dapat digunakan di atas metode pengontrol untuk menunjukkan bahwa harus ada otentikasi sebelum menjalankan metode tersebut. Seperti dijelaskan di atas, otentikasi dilakukan dalam berkas yang direferensikan tsoakonfigurasi. Nama skema telah ditentukan dan harus cocok dengan nama Anda OpenAPI konfigurasi keamanan dan modul otentikasi. Ketika menggunakan `@Security` dekorator, anda dapat memilih antara memiliki satu atau beberapa metode otentikasi. Jika Anda memilih untuk memiliki beberapa metode otentikasi, Anda dapat memilih antara harus melewati salah satu metode (OR):

```ts
@Security('jwt', ['write:pets', 'read:pets'])
@Security('api_key')
@Get('OauthOrAPIkey')
public async GetWithOrSecurity(@Request() request: express.Request): Promise<any> {
}
```

(Dan demi yang mendahului dengan kencang) yaitu malaikat-malaikat yang mendahului dengan kencang membawa arwah orang-orang yang beriman ke surga.

```ts
@Security({
  jwt: ['write:pets', 'read:pets'],
  api_key: [],
})
@Get('OauthAndAPIkey')
public async GetWithAndSecurity(@Request() request: express.Request): Promise<any> {
}
```

## Tanpa Keamanan

Gunakan [`@NoSecurity()`](./reference/tsoa-next/functions/NoSecurity.md) ketika pengontrol atau tindakan harus jelas diwarisi atau API- seluruh persyaratan keamanan.

```ts
import { Controller, Get, NoSecurity, Route, Security } from 'tsoa-next'

@Route('users')
@Security('api_key')
export class UsersController extends Controller {
  @Get('private')
  public async privateEndpoint(): Promise<string> {
    return 'private'
  }

  @Get('public')
  @NoSecurity()
  public async publicEndpoint(): Promise<string> {
    return 'public'
  }
}
```

## Tag

Tag didefinisikan dengan [`@Tags('tag1', 'tag2', ...)`](./reference/tsoa-next/functions/Tags.md) dekorator dalam controller dan / atau dalam metode seperti dalam contoh berikut.

```ts
import { Controller, Get, Request, Response, Route, Tags } from 'tsoa-next'

@Route('users')
@Tags('User')
export class UsersController extends Controller {
  @Get('UserInfo')
  @Tags('Info', 'Get')
  @Response<{ message: string }>('default', 'Unexpected error')
  public async userInfo(@Request() request: { user: { id: number; name: string } }): Promise<{ id: number; name: string }> {
    return Promise.resolve(request.user)
  }

  @Get('EditUser')
  @Tags('Edit')
  public async editUser(): Promise<string> {
    return 'ok'
  }
}
```

Bila Anda memiliki proyek yang memerlukan deskripsi dan / atau docs eksternal untuk tag, Anda dapat mengatur generator internal untuk memakai definisi tag yang benar dan dokumen eksternal dengan menyediakan properti tag untuk properti spesifikasi di tsoa.json.

```js
{
  "spec": {
    "tags":  [
      {
        "name": "User",
        "description": "Operations about users",
        "externalDocs": {
          "description": "Find out more about users",
          "url": "http://swagger.io"
        }
      }
    ],
    ...
  },
  "routes": {
    ...
  }
}
```

## Operasi Id

Set [`operationId`](./reference/tsoa-next/functions/OperationId.md) di bawah jalur operasi.
Berguna untuk digunakan dengan OpenAPI alat pembuatan kode sejak parameter ini digunakan untuk nama fungsi yang dihasilkan dalam klien SDK.

```ts
@Get()
@OperationId('findDomain')
public async find(): Promise<any> {

}
```

## Tak dipakai

OpenAPI memungkinkan Anda untuk deprecate [operations](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.2.md#user-content-operationdeprecated), [parameters](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.2.md#user-content-parameterdeprecated), dan [schemas](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.2.md#user-content-schemadeprecated). Hal ini memungkinkan Anda mengindikasikan bahwa titik akhir / format / et. seharusnya tidak lagi digunakan, sementara memungkinkan waktu klien untuk bermigrasi ke pendekatan baru.

Untuk menghapus bagian API Anda, Anda dapat melampirkan [`@Deprecated`](./reference/tsoa-next/functions/Deprecated.md) dekorator untuk sifat kelas, metode, dan parameter. Untuk konstruksi yang tidak mendukung dekorator (misalnya antarmuka dan tipe alias), Anda dapat menggunakan `@deprecated` JSDoc Kejengkelan. Beberapa contoh:

### Operasi

```ts
@Get()
@Deprecated()
public async find(): Promise<any> {

}
```

### Parameter (OpenAPI 3 + saja)

```ts
@Get("v2")
public async findV2(
  @Query() text: string,
  @Deprecated() @Query() dontUse?: string
): Promise<any> {

}
```

```ts
interface QueryParams {
  text: string;
  sort?: string;
  page?: number;
}

@Get("v2")
public async findV2(
  @Queries() queryParams: QueryParams
): Promise<any> {

}
```

### Skema (OpenAPI 3 + saja)

```ts
class CreateUserRequest {
  name: string;
  @Deprecated() firstName?: string;

  constructor(
    public emailAddress: string,
    @Deprecated() public icqHandle?: string
  ) {}
}

interface CreateUserResponse {
  /** @deprecated */ durationMs?: number;
  details: UserDetails;
}

type UserDetails = {
  name: string;
  /** @deprecated */ firstName?: string;
};
```

## Validasi

Dekorasi skema eksternal bernama [`@Validate(...)`](./reference/tsoa-next/functions/Validate.md).
Gunakan ini pada parameter metode pengontrol ketika Anda ingin sebuah pustaka skema eksternal yang didukung untuk menggantikan built-in validasi waktu-jalan untuk parameter subtree.

- Bentuk yang didukung: `@Validate(schema)`, `@Validate('zod', schema)`, `@Validate({ kind: 'zod', schema })`- Pustaka yang didukung: `zod`, `joi`, `yup`, `superstruct`, `io-ts`- Dekorator parameter yang didukung: `@Body`, `@BodyProp`, `@Query`, `@Queries`, `@Path`, `@Header`, `@FormField`, `@UploadedFile`, `@UploadedFiles`- OpenAPI generasi masih datang dari Anda TypeScript tipe; `@Validate(...)` hanya perubahan validasi waktu-jalan

```ts
import { Body, Controller, Post, Route, Validate } from 'tsoa-next'
import { z } from 'zod'

type CreateUser = {
  name: string
  tags: string[]
}

const CreateUserSchema = z.object({
  name: z.string().min(3),
  tags: z.array(z.string()).min(1),
})

@Route('users')
export class UsersController extends Controller {
  @Post()
  public create(@Body() @Validate(CreateUserSchema) payload: CreateUser): CreateUser {
    return payload
  }
}
```

Untuk catatan dan contoh setup lengkap untuk setiap pustaka validator yang didukung, lihat [External Validators](./external-validators).

## SpecPath

Gunakan [`@SpecPath(...)`](./reference/tsoa-next/functions/SpecPath.md) pada pengontrol ketika Anda ingin pengontrol untuk mengekspos titik akhir spesifikasi atau dokumentasi di waktu-jalan tanpa membaca berkas spesifikasi yang dihasilkan dari disk lokal.

- `@SpecPath()` baku ke titik akhir JSON di `/<controller-path>/spec`- Built- dalam target: `json`, `yaml`, `swagger`, `redoc`, `rapidoc`- Target built-in membutuhkan pembuatan rute untuk memiliki akses ke konfigurasi spesifikasi, seperti standar `tsoa spec-and-routes` alur kerja atau konfigurasi rute yang embed `runtimeSpecConfig`- Pengontrol dapat mendeklarasikan multiple `@SpecPath(...)` dekorator selama jalur diselesaikan tidak bertabrakan
- Built-in target dokumentasi lazy-load ketergantungan peer opsional:
  - `swagger-ui-express` untuk Express  - `swagger-ui-koa` untuk Koa  - `hapi-swagger` untuk Hapi  - `redoc` untuk Redoc  - `rapidoc` untuk RapiDoc- Penangan kustom dapat kembali baik `string` atau `Readable`- Gunakan `@SpecPath(path, options?)` untuk konfigurasi [`SpecPathOptions`](./reference/tsoa-next/interfaces/SpecPathOptions.md) seperti `target`, `cache`, dan opsional `gate`- `gate` dapat boolean atau fungsi yang menerima [`SpecRequestContext`](./reference/tsoa-next/interfaces/SpecRequestContext.md) dan kembali apakah spesifikasi mesti dilayani untuk permintaan tersebut
- Cache dapat dinonaktifkan dengan `'none'`, terus in- proses dengan `'memory'`, atau mendelegasikan ke gubahan [`SpecCacheHandler`](./reference/tsoa-next/interfaces/SpecCacheHandler.md)- `@SpecPath(...)` rute tambahan dan tidak ditambahkan ke yang dihasilkan OpenAPI dokumen

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

Dalam contoh ini:

- `GET /users/spec` melayani OpenAPI dokumen sebagai JSON
- `GET /users/openapi.yaml` melayani dokumen yang sama seperti YAML
- `GET /users/docs` melayani Swagger UI jika waktu-berjalan ketergantungan rekan spesifik terpasang

Anda juga dapat memberikan penanganan ubahan dan implementasi cache eksternal:

```ts
import { Readable } from 'node:stream'
import { Controller, Get, Route, SpecCacheHandler, SpecPath, SpecRequestContext } from 'tsoa-next'

const cacheStore = new Map<string, string>()

const cache: SpecCacheHandler = {
  async get(context) {
    return cacheStore.get(context.cacheKey)
  },
  async set(context, value) {
    cacheStore.set(context.cacheKey, value)
  },
}

async function customDocs(context: SpecRequestContext) {
  return Readable.from([await context.getSpecString('json')])
}

@Route('internal')
@SpecPath('spec.json', { target: customDocs, cache })
export class InternalController extends Controller {
  @Get('status')
  public status() {
    return { ok: true }
  }
}
```

Anda juga dapat gerbang rute spesifikasi:

```ts
@SpecPath('docs', {
  gate: context => {
    const headers = (context.request as { headers?: Record<string, string | string[] | undefined> } | undefined)?.headers
    return headers?.['x-allow-spec'] === 'true'
  },
  target: 'swagger',
})
```

Ketika caching diaktifkan dan penanganan gubahan mengembalikan suatu stream, `tsoa-next` buffer stream ke string sebelum menyimpannya melalui penangan cache.


## Tersembunyi

Gunakan [`@Hidden`](./reference/tsoa-next/functions/Hidden.md) pada metode untuk mengecualikan titik akhir dari yang dihasilkan OpenAPI Dokumen Spesifikasi.

```ts
@Get()
@Hidden()
public async find(): Promise<any> {
}
```

Gunakan [`@Hidden`](./reference/tsoa-next/functions/Hidden.md) di controller untuk mengecualikan semua titik akhir mereka dari yang dihasilkan OpenAPI Dokumen Spesifikasi.

```ts
import { Controller, Get, Hidden, Post, Route } from 'tsoa-next'

@Route('hidden')
@Hidden()
export class HiddenController extends Controller {
  @Get()
  public async find(): Promise<any> {}

  @Post()
  public async create(): Promise<any> {}
}
```

Pakai `@Query` parameter untuk mengecualikan param query dari yang dihasilkan OpenAPI Dokumen Spesifikasi. Parameter harus mengijinkan undefined atau memiliki nilai baku untuk disembunyikan.

```ts
  @Get()
  public async find(
    @Query() normalParam: string,
    @Query() @Hidden() defaultSecret = true,
    @Query() @Hidden() optionalSecret?: string
  ): Promise<any> {

  }
```

## Permintaan

Untuk mengakses obyek permintaan ekspres dalam metode pengontrol menggunakan [`@Request`](./reference/tsoa-next/functions/Request.md) dekorator:

```typescript
// src/users/usersController.ts

import * as express from 'express'
import { Controller, Get, Path, Request, Route } from 'tsoa-next'

@Route('users')
export class UsersController extends Controller {
  @Get('{userId}')
  public async getUser(
    @Path() userId: number,
    @Request() request: express.Request
  ): Promise<{ id: number; requestedBy?: string }> {
    // TODO: implement some code that uses the request as well
    return {
      id: userId,
      requestedBy: request.header('x-requested-by'),
    }
  }
}
```
Untuk mengakses Koaobjek permintaan (yang memiliki objek ctx) dalam sebuah metode pengontrol menggunakan [`@Request`](./reference/tsoa-next/functions/Request.md) dekorator:

```typescript
// src/users/usersController.ts

import * as koa from 'koa'
import { Controller, Get, Path, Request, Route } from 'tsoa-next'

@Route('users')
export class UsersController extends Controller {
  @Get('{userId}')
  public async getUser(
    @Path() userId: number,
    @Request() request: koa.Request
  ): Promise<{ id: number; path: string }> {
    const ctx = request.ctx;
    return {
      id: userId,
      path: ctx.path,
    }
  }
}
```

::: danger
Perhatikan bahwa parameter `request` tidak muncul dalam file OAS Anda.
Gunakan [`@RequestProp(...)`](./reference/tsoa-next/functions/RequestProp.md) ketika nilai sudah hidup pada dasar objek permintaan waktu-jalan.
Gunakan [`@Inject()`](./reference/tsoa-next/functions/Inject.md) ketika sebuah parameter diberikan sepenuhnya oleh template rute Anda sendiri atau kode wrapper dan harus diabaikan dari spec generasi.
:::

## RequestProp

[`@RequestProp(...)`](./reference/tsoa-next/functions/RequestProp.md) mengikat satu properti dari objek permintaan waktu-jalan yang mendasari.

```ts
import { Controller, Post, RequestProp, Route } from 'tsoa-next'

@Route('request-props')
export class RequestPropsController extends Controller {
  @Post('body')
  public async getBody(@RequestProp('body') body: { name: string }): Promise<{ name: string }> {
    return body
  }
}
```

## Produk

The [`@Produces`](./reference/tsoa-next/functions/Produces.md) dekorator digunakan untuk mendefinisikan tipe media gubahan untuk menanggapi metode pengontrol dalam OpenAPI Generator. Ini memungkinkan Anda untuk menentukan jenis media tertentu untuk setiap metode, tanpa menimpa Respon Kontent- Tipe baku.

Inilah contoh bagaimana menggunakan `@Produces` dekorator:

```typescript
@Route('MediaTypeTest')
@Produces('application/vnd.mycompany.myapp+json')
export class MediaTypeTestController extends Controller {
  @Get('users/{userId}')
  public async getDefaultProduces(@Path() userId: number): Promise<{ id: number; name: string }> {
    this.setHeader('Content-Type', 'application/vnd.mycompany.myapp+json')
    return Promise.resolve({
      id: userId,
      name: 'foo',
    })
  }
  @Get('custom/security.txt')
  @Produces('text/plain')
  public async getCustomProduces(): Promise<string> {
    const securityTxt = 'Contact: mailto: security@example.com\nExpires: 2012-12-12T12:37:00.000Z'
    this.setHeader('Content-Type', 'text/plain')
    return securityTxt
  }
}
```

::: danger
Harap dicatat bahwa menggunakan [`@Produces`](./reference/tsoa-next/functions/Produces.md) hanya mempengaruhi yang dihasilkan OpenAPI Spesifikasi. Anda juga harus memastikan bahwa Anda mengirim header yang benar menggunakan `this.setHeader('Content-Type', 'MEDIA_TYPE')` dalam metode pengendalianmu.
:::

## Konsumsi

Gunakan [`@Consumes(...)`](./reference/tsoa-next/functions/Consumes.md) ketika sebuah aksi menerima sebuah tipe media tubuh permintaan tidak baku.

```ts
import { Body, Consumes, Controller, Post, Response, Route, SuccessResponse } from 'tsoa-next'

@Route('MediaTypeTest')
export class MediaTypeTestController extends Controller {
  @Post('custom')
  @Consumes('application/vnd.mycompany.myapp.v2+json')
  @SuccessResponse('202', 'Accepted', 'application/vnd.mycompany.myapp.v2+json')
  @Response<{ message: string }>('400', 'Bad Request', undefined, 'application/problem+json')
  public async postCustomConsumes(@Body() body: { name: string }): Promise<{ id: number; name: string }> {
    this.setStatus(202)
    return {
      id: body.name.length,
      name: body.name,
    }
  }
}
```
