---
title: Validator Eksternal
lang: id-ID
lastUpdated: 2026-04-17T20:53:42.040Z
---

# validator eksternal dengan `@Validate`

Dekorator skema eksternal baru adalah [`@Validate(...)`](./reference/tsoa-next/functions/Validate.md).
Jika Anda mencari `@Validator`, nama dekorator di `tsoa-next` adalah `@Validate`.
Referensi API Relevant: [`@Validate`](./reference/tsoa-next/functions/Validate.md), [`@Body`](./reference/tsoa-next/functions/Body.md), [`@BodyProp`](./reference/tsoa-next/functions/BodyProp.md), [`@Query`](./reference/tsoa-next/functions/Query.md), [`@Queries`](./reference/tsoa-next/functions/Queries.md), [`@Path`](./reference/tsoa-next/functions/Path.md), [`@Header`](./reference/tsoa-next/functions/Header.md), [`@FormField`](./reference/tsoa-next/functions/FormField.md), [`@UploadedFile`](./reference/tsoa-next/functions/UploadedFile.md), [`@UploadedFiles`](./reference/tsoa-next/functions/UploadedFiles.md), dan [`File`](./reference/tsoa-next/interfaces/File.md).

[[toc]]

## Apa `@Validate` perubahan

[`@Validate(...)`](./reference/tsoa-next/functions/Validate.md) membuat skema eksternal sumber waktu-jalan kebenaran untuk satu parameter dihiasi.

- TypeScript tipe masih drive OpenAPI generasi
- Skema eksternal menggantikan pembangunan-dalam validasi waktu-jalan untuk subtree parameter dihiasi
- Routes yang tidak menggunakan `@Validate(...)` menjaga perilaku validasi mereka yang ada

## Target yang didukung

Dalam rilis ini, `@Validate(...)` didukung pada parameter metode pengontrol yang digunakan:

- [`@Body()`](./reference/tsoa-next/functions/Body.md)- [`@BodyProp()`](./reference/tsoa-next/functions/BodyProp.md)- [`@Query()`](./reference/tsoa-next/functions/Query.md)- [`@Queries()`](./reference/tsoa-next/functions/Queries.md)- [`@Path()`](./reference/tsoa-next/functions/Path.md)- [`@Header()`](./reference/tsoa-next/functions/Header.md)- [`@FormField()`](./reference/tsoa-next/functions/FormField.md)- [`@UploadedFile()`](./reference/tsoa-next/functions/UploadedFile.md)- [`@UploadedFiles()`](./reference/tsoa-next/functions/UploadedFiles.md)

## Pustaka yang didukung

- `zod`- `joi`- `yup`- `superstruct`- `io-ts`

Pasang hanya perpustakaan validator yang digunakan aplikasi Anda.

::: code-group

```bash [npm]
npm install zod
npm install joi
npm install yup
npm install superstruct
npm install io-ts fp-ts io-ts-types
```

```bash [pnpm]
pnpm add zod
pnpm add joi
pnpm add yup
pnpm add superstruct
pnpm add io-ts fp-ts io-ts-types
```

```bash [yarn]
yarn add zod
yarn add joi
yarn add yup
yarn add superstruct
yarn add io-ts fp-ts io-ts-types
```

:::

## Bentuk dekorator didukung

Semua pustaka validator yang didukung dapat digunakan dengan bentuk-bentuk ini:

```ts
@Validate(schema)
@Validate('zod', schema)
@Validate({ kind: 'zod', schema })
```

Ketika Anda lulus hanya skema, `tsoa-next` akan mencoba untuk menyimpulkan jenis validator dari objek skema dan sumber impor.
Jika kesimpulan ambigu, gunakan eksplisit `kind` bentuk.

## Model contoh umum

Contoh di bawah ini dipakai bersama TypeScript bentuk sehingga Anda dapat melihat apa yang tetap sama sementara waktu berjalan validasi perubahan.

```ts
type ExternalLiteralUnion = 'active' | 'disabled'

type ExternalObject = {
  name: string
  status: ExternalLiteralUnion
  tags: string[]
}
```

## Zod

Zod bekerja dengan baik dengan bentuk yang disukai:

```ts
import { Body, Controller, Post, Route, Validate } from 'tsoa-next'
import { z } from 'zod'

type ExternalLiteralUnion = 'active' | 'disabled'

type ExternalObject = {
  name: string
  status: ExternalLiteralUnion
  tags: string[]
}

const ZodBodySchema = z.object({
  name: z.string().min(3, 'validation.external.zod.name.min'),
  status: z.enum(['active', 'disabled']),
  tags: z.array(z.string()).min(1, 'validation.external.zod.tags.min'),
})

@Route('external-validation')
export class ExternalValidationController extends Controller {
  @Post('zod')
  public zod(@Body() @Validate(ZodBodySchema) payload: ExternalObject): ExternalObject {
    return payload
  }
}
```

## Joi

Joi dapat digunakan dengan jenis validator eksplisit:

```ts
import * as Joi from 'joi'
import { Body, Controller, Post, Route, Validate } from 'tsoa-next'

type ExternalLiteralUnion = 'active' | 'disabled'

type ExternalObject = {
  name: string
  status: ExternalLiteralUnion
  tags: string[]
}

const JoiBodySchema = Joi.object({
  name: Joi.string().min(3).required(),
  status: Joi.string().valid('active', 'disabled').required(),
  tags: Joi.array().items(Joi.string()).min(1).required(),
})

@Route('external-validation')
export class ExternalValidationController extends Controller {
  @Post('joi')
  public joi(@Body() @Validate('joi', JoiBodySchema) payload: ExternalObject): ExternalObject {
    return payload
  }
}
```

Joi juga berguna untuk bidang multipart dan berkas yang diunggah:

```ts
import * as Joi from 'joi'
import { Controller, File, Post, Route, UploadedFile, Validate } from 'tsoa-next'

@Route('assets')
export class AssetsController extends Controller {
  @Post('upload')
  public upload(@UploadedFile('asset') @Validate('joi', Joi.any()) asset: File): File {
    return asset
  }
}
```

Untuk lebih detail upload, lihat [Uploading files](./file-upload).

## Yup

Yup bekerja dengan bentuk objek:

```ts
import * as yup from 'yup'
import { Body, Controller, Post, Route, Validate } from 'tsoa-next'

type ExternalLiteralUnion = 'active' | 'disabled'

type ExternalObject = {
  name: string
  status: ExternalLiteralUnion
  tags: string[]
}

const schema = yup
  .object({
    name: yup.string().required().min(3),
    status: yup.mixed<ExternalLiteralUnion>().oneOf(['active', 'disabled']).required(),
    tags: yup.array(yup.string().required()).min(1).required(),
  })
  .required()

@Route('external-validation')
export class ExternalValidationController extends Controller {
  @Post('yup')
  public yupBody(@Body() @Validate({ kind: 'yup', schema }) payload: ExternalObject): ExternalObject {
    return payload
  }
}
```

## Superstruct

Superstruct bekerja dengan bentuk eksplisit:

```ts
import { array, object, size, string } from 'superstruct'
import { Body, Controller, Post, Route, Validate } from 'tsoa-next'

type ExternalLiteralUnion = 'active' | 'disabled'

type ExternalObject = {
  name: string
  status: ExternalLiteralUnion
  tags: string[]
}

const SuperstructBodySchema = object({
  name: size(string(), 3, 50),
  status: string(),
  tags: size(array(string()), 1, 10),
})

@Route('external-validation')
export class ExternalValidationController extends Controller {
  @Post('superstruct')
  public superstruct(@Body() @Validate('superstruct', SuperstructBodySchema) payload: ExternalObject): ExternalObject {
    return payload
  }
}
```

## io- ts

`io-ts` bekerja dengan baik ketika Anda ingin codec untuk menjadi otoritatif pada waktu berjalan sementara mempertahankan kelas pertama- TypeScript alias melalui `TypeOf`.

```ts
import * as t from 'io-ts'
import { withMessage } from 'io-ts-types'
import { Body, Controller, Post, Route, Validate } from 'tsoa-next'

interface PositiveFloatBrand {
  readonly PositiveFloat: unique symbol
}

const PositiveFloat = withMessage(
  t.brand(
    t.number,
    (n): n is t.Branded<number, PositiveFloatBrand> => Number.isFinite(n) && n > 0,
    'PositiveFloat',
  ),
  () => 'validation.wager.amount.mustBePositiveFloat',
)

const WagerCodec = t.type({
  amount: PositiveFloat,
  outcome: t.Int,
})

type Wager = t.TypeOf<typeof WagerCodec>

@Route('wagers')
export class WagersController extends Controller {
  @Post()
  public createWager(@Body() @Validate({ kind: 'io-ts', schema: WagerCodec }) wager: Wager): Wager {
    return wager
  }
}
```

## Pengait validasi

Dihasilkan `RegisterRoutes(...)` fungsi menerima sebuah konteks validasi opsional.
Ini berguna ketika Anda ingin pesan validator eksternal diterjemahkan atau diformat ulang sebelum mereka dikembalikan ke klien.

```ts
RegisterRoutes(app, {
  validation: {
    translate: (key, params) => translateMessage(key, params),
    errorFormatter: failure => failure,
  },
})
```

## Panduan praktis

- Jauhkan Anda TypeScript tipe dan skema eksternal selaras. OpenAPI mengikuti TypeScript tipe, tetapi validasi waktu-jalan mengikuti skema eksternal.
- Pastikan modul pengontrol impor aplikasi sebelum `RegisterRoutes(...)` jalankan, jadi metadata dekorator tersedia pada waktu berjalan.
- Jika Anda menggunakan template rute kustom, tetap validasi waktu berjalan pipa metadata utuh sehingga kelas controller, nama metode, dan indeks parameter masih tersedia selama validasi.
- Gunakan bentuk yang diinginkan ketika jelas, dan beralih ke bentuk eksplisit ketika Anda ingin kejelasan dokumentasi atau jenis skema tidak mudah untuk menyimpulkan.
