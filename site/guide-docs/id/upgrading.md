---
sidebarDepth: 1
lastUpdated: 2026-04-17T20:53:42.041Z
---

# Meningkatkan dari tsoa 2.5

[Jump to the breaking changes](#breaking-changes)

> Catatan historis: permintaan tarik link dalam panduan ini sengaja menunjuk ke [`lukeautry/tsoa`](https://github.com/lukeautry/tsoa), di mana perubahan ini awalnya mendarat.

## Fitur Baru

### Dukungan bagi alias tipe

Rilis ini dilengkapi dengan dukungan yang tepat untuk tipe definisi alias.

Mereka dapat berkisar dari skenario sederhana

```ts
/**
 * A Word shall be a non-empty string
 * @minLength 1
 */
type Word = string
```

untuk skenario lebih kompleks seperti serikat dan persimpangan alias

```ts
type IntersectionAlias = { value1: string; value2: string } & TypeAliasModel1

// or
type OneOrTwo = TypeAliasModel1 | TypeAliasModel2
```

atau bahkan tipe alias generik:

```ts
type GenericAlias<T> = T | string
type ForwardGenericAlias<T, U> = GenericAlias<U> | T
```

Harap dicatat bahwa ini berarti bahwa tsoa tidak hanya menghasilkan spesifikasi (OpenAPI v3 dan Swagger2\ *), tetapi juga akan memvalidasi masukan terhadap tipe termasuk gangguan jsDoc.

\ * Mungkin ada skenario tertentu di mana kita mungkin tidak dapat menghasilkan Swagger 2 dari Anda TypeScript, tsoa akan log peringatan untuk menginformasikan Anda tentang setiap masalah yang kita sadari.

### Dukungan bagi tipe yang dipetakan

> TypeScript 2,1 diperkenalkan dipetakan jenis, tambahan kuat ke tipe sistem. Pada dasarnya, tipe yang dipetakan memungkinkan Anda untuk membuat tipe baru dari yang sudah ada dengan pemetaan atas tipe properti. Setiap properti dari jenis yang ada berubah sesuai dengan aturan yang Anda spesifikasikan. Properti berubah kemudian membuat jenis baru.
> Marius Schulz, https://mariusschulz.com/blog/mapped-types-in-typescript

tsoa sekarang bekerja dengan jenis tes T untuk menyelesaikan jenis yang dipetakan. Kami akan secara aktif mencoba untuk mendukung semua kasus, namun suite tes untuk saat ini hanya mencakup utilitas dipetakan jenis typeships dengan, seperti:

```ts
/**
 * Make all properties in T optional
 */
type Partial<T> = {
  [P in keyof T]?: T[P]
}

/**
 * Make all properties in T required
 */
type Required<T> = {
  [P in keyof T]-?: T[P]
}

/**
 * Make all properties in T readonly
 */
type Readonly<T> = {
  readonly [P in keyof T]: T[P]
}

/**
 * From T, pick a set of properties whose keys are in the union K
 */
type Pick<T, K extends keyof T> = {
  [P in K]: T[P]
}
```

### Dukungan bagi tipe kondisional

Seperti versi 2.8, TypeScript mendukung tipe kondisional. Sintaks ini sangat dekat dengan operator ternary dan memungkinkan ekspresi dari 2 (atau lebih) tipe berbeda berdasarkan kondisi. Silakan merujuk ke [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/advanced-types.html#conditional-types) untuk rincian.

```ts
type Diff<T, U> = T extends U ? never : T // Remove types from T that are assignable to U
```

tsoa sekarang bekerja dengan t jenis checker untuk menyelesaikan tipe kondisional. Kami akan secara aktif mencoba untuk mendukung kebanyakan kasus, namun suite tes untuk saat ini hanya mencakup utilitas jenis typeships dengan, seperti:

```ts
/**
 * Exclude from T those types that are assignable to U
 */
type Exclude<T, U> = T extends U ? never : T

/**
 * Extract from T those types that are assignable to U
 */
type Extract<T, U> = T extends U ? T : never

/**
 * Exclude null and undefined from T
 */
type NonNullable<T> = T extends null | undefined ? never : T
```

### Dukungan untuk kombinasi dan tipe utilitas

Kombinasi tipe yang dipetakan dan kondisional memungkinkan untuk tipe utilitas yang kuat seperti `Omit` tipe.

```
/**
 * Construct a type with the properties of T except for those in type K.
 */
type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
```

### Dukungan bagi `Record<>` [\#662](https://github.com/lukeautry/tsoa/pull/662) ([Eywek](https://github.com/Eywek))

### Enums: [\#594](https://github.com/lukeautry/tsoa/pull/594) untuk Spec dan [\#599](https://github.com/lukeautry/tsoa/pull/599) dan [\#593](https://github.com/lukeautry/tsoa/pull/593)

### Kata Kunci Nuklir: Lihat [\#601](https://github.com/lukeautry/tsoa/pull/601)

### Kemampuan untuk menggunakan pembatas usus besar daripada gelang di jalur [\#602](https://github.com/lukeautry/tsoa/pull/602)([itamarco](https://github.com/itamarco))

### menambahkan dukungan @ example untuk parameter / properti [\#616](https://github.com/lukeautry/tsoa/pull/616) ([jfrconley](https://github.com/jfrconley))

### feat: abaikan metode kelas [\#643](https://github.com/lukeautry/tsoa/pull/643) ([Eywek](https://github.com/Eywek))

### feat: handle enum members [\#656](https://github.com/lukeautry/tsoa/pull/656) ([Eywek](https://github.com/Eywek))

### Menangani tipe indeks [\#636](https://github.com/lukeautry/tsoa/pull/636) ([Eywek](https://github.com/Eywek))

### handel `typeof` [\#635](https://github.com/lukeautry/tsoa/pull/635) ([Eywek](https://github.com/Eywek))

### `@format` dukungan untuk tipe alias [\#620](https://github.com/lukeautry/tsoa/pull/620) ([jfrconley](https://github.com/jfrconley))

## Perbaikan Bug

- mempropagandakan nama ruas secara benar dalam validate Model [@fantapop](https://github.com/fantapop)

- Dokumen Tipe Respon Api tidak ada versi asli 200 respon daripada 204 [\#629](https://github.com/lukeautry/tsoa/pull/629) ([WoH](https://github.com/WoH))

- Validasi Galat mesti memperpanjang Galat [\#661](https://github.com/lukeautry/tsoa/pull/661) ([aldenquimby](https://github.com/aldenquimby))

- Upgrade koa- router ke @ koa / router, kesalahan tipe fix [\#646](https://github.com/lukeautry/tsoa/pull/646) ([michaelbeaumont](https://github.com/michaelbeaumont))
- Hapus tipe obyek [\#642](https://github.com/lukeautry/tsoa/pull/642) ([dimitor115](https://github.com/dimitor115))
- Perbaiki penambahan properti statis ke definisi model [\#639](https://github.com/lukeautry/tsoa/pull/639) ([dimitor115](https://github.com/dimitor115))

## Breaking perubahan

### Null vs undefined

Kecuali Anda menyatakan sebuah tipe untuk menerima `null`, kita tidak akan lagi menandai sifat opsional Anda sebagai `nullable: true` atau `x-nullable: true`.
Hal ini berlaku untuk validasi juga, sehingga ketika mengirim `null` daripada mengirim `undefined` / tidak ada properti pada objek baik-baik saja, sekarang tidak lagi.
Mengirim `undefined` bukan, yaitu `string | null` Juga ditolak oleh validasi.

### Nama

Dalam rangka untuk mendukung tipe alias dan menghindari bentrokan nama, nama untuk skema / definisi komponen yang dihasilkan mungkin telah berubah (antarmuka umum yang terpengaruh sebagian besar).
Jika Anda mengandalkan nama komponen yang dihasilkan dari tsoa, ini adalah perubahan yang melanggar.

Karena tsoa didukung beberapa tipe alias di masa lalu dan sekarang dihasilkan definisi berbeda, ini mungkin melanggar kode Anda.
Jika Anda mengandalkan tsoa tidak mendukung tipe alias yang benar untuk menghindari masalah, ini dapat memecahkan kode Anda.
Lanjutkan dengan hati-hati dan laporan masalah.

### Impreve nested objek validasi

Lihat [\#574](https://github.com/lukeautry/tsoa/pull/574) dan [\#575](https://github.com/lukeautry/tsoa/pull/575).
Ini seharusnya tidak melanggar perubahan, tapi karena itu mempengaruhi validasi, lebih baik aman daripada menyesal.

### Ubah perilaku baku ketika tidak ada host didefinisikan:

Secara eksplisit mengatur host Anda dalam kasus Anda ingin memiliki urls mutlak. Ini adalah perubahan bagi mereka yang menggunakan OpenAPI 3, tapi sebenarnya membawa tsoa ke parity dengan bagaimana kami menangani `host` properti di Swagger Sebelumnya OpenAPI 3 pengguna harus menghasilkan lewat `null` yang kita semua merasa aneh. Sekarang abaikan `host` akan menyebabkan tsoa untuk menganggap url harus relatif.

### Hapus.. dalam fieldErrors

Ketika mendeteksi properti tambahan ilegal (bila Anda memakai tsoa pengaturan `additionalProperties: 'throw-on-extras'`), kunci pada galat akan memuat sebuah titik tambahan.

```js
{
  "TestModel..additionalProp: : {
    ...
  }
}
```

Ini sekarang tetap dan kuncinya adalah `TestModel.additionalProp`.

### Gunakan Spec daripada Swagger (`tsoa swagger` masih tersedia untuk saat ini, tetapi akan dihapus akhirnya) [\#664](https://github.com/lukeautry/tsoa/pull/664) ([WoH](https://github.com/WoH))

```diff
Calling the tsoa command
- tsoa swagger
+ tsoa spec

- tsoa swagger-and-routes
+ tsoa spec-and-routes

Manually calling spec generation
- await generateSwaggerSpec(swaggerConfig, routesConfig, compilerOptions, config.ignore);
+ await generateSpec(openapiConfig, compilerOptions, config.ignore);
```

tsoa.json:

```js
{
  "swagger": {}
}
```

menjadi

```js
{
  "spec": {}
}
```

- Pindahkan konfigurasi bersama ke tingkat atas [\#628](https://github.com/lukeautry/tsoa/pull/628) ([WoH](https://github.com/WoH))

Alih-alih menduplikasi config dan menangani banyak kasus tepi, config baru jauh lebih sederhana.
Pengaturan konfigurasi, bahwa dampak baik rute dan spesifikasi sekarang terletak pada tingkat atas objek konfigurasi.

```json
{
  "entryFile": "./tests/fixtures/express/server.ts",
  "noImplicitAdditionalProperties": "silently-remove-extras",
  "routes": {},
  "spec": {}
}
```

Ini berarti jika pengaturan Anda berbeda (misalnya berkas entri), Anda harus memanggil `generateRoutes()` dan `generateSpec()` sendiri.
Perhatikan bahwa metode ini sekarang memiliki config aswell sederhana:

```diff
-    await generateSwaggerSpec(swaggerConfig, routesConfig, compilerOptions, config.ignore);
+    await generateSpec(openapiConfig, compilerOptions, config.ignore);
```

```diff
-    await generateRoutes(routesConfig, swaggerConfig, compilerOptions, config.ignore);
+    await generateRoutes(routesConfig, compilerOptions, config.ignore);
```

Berkas Masuk dan Tambahan Implan Properti kini dapat ditata pada swagger / rute Config.

Juga, pengaturan boolean bagi noImplan AdditionalProperties telah dihapus: # 503
Pengaturan yang valid kini: `'throw-on-extras' | 'silently-remove-extras' | 'ignore'`, segala sesuatu yang lain jatuh kembali ke `'ignore'`.

* * Untuk referensi, lihat antarmuka TS dari seluruh konfigurasi [here](./reference/tsoa-next/interfaces/Config.md)* *

### TypeScript Serikat sekarang diimplementasikan sebagai `anyOf` in OpenAPI [\#671](https://github.com/tsoa-next/tsoa-next/issues/671)
