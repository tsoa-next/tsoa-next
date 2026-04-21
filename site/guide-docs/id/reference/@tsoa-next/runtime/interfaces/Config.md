---
lastUpdated: 2026-04-20T21:59:41.312Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/runtime](../index.md) / Config

# Antar muka: Konfigurasi

Didefinisikan dalam: [packages/runtime/src/config.ts:5](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L5)

Akar tsoa-next konfigurasi dikonsumsi oleh CLI dan generator programmatic.

## Properti

### compilerOptions?

```ts
optional compilerOptions?: Record<string, unknown>;
```

Didefinisikan dalam: [packages/runtime/src/config.ts:47](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L47)

TypeScript CompilerOptions yang akan digunakan selama generasi.
Ini digabung lebih dari opsi kompiler diselesaikan dari tsconfig.

***

### controllerPathGlobs?

```ts
optional controllerPathGlobs?: string[];
```

Didefinisikan dalam: [packages/runtime/src/config.ts:29](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L29)

Sebuah deretan globs jalur yang menunjuk ke kendali rute Anda bahwa Anda ingin memiliki tsoa Termasuk.

***

### defaultNumberType?

```ts
optional defaultNumberType?: "long" | "integer" | "float" | "double";
```

Didefinisikan dalam: [packages/runtime/src/config.ts:68](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L68)

OpenAPI tipe nomor yang digunakan untuk TypeScript `number` dan tiada (pula) pembicaraan antara jumlah yang sedikit,

#### Default

```ts
double
```

***

### entryFile

```ts
entryFile: string;
```

Didefinisikan dalam: [packages/runtime/src/config.ts:24](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L24)

Titik entri ke API Anda

***

### ignore?

```ts
optional ignore?: string[];
```

Didefinisikan dalam: [packages/runtime/src/config.ts:19](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L19)

Direktori untuk diabaikan selama TypeScript pemindaian metadata

***

### ¶ MulterOpts? ¶

```ts
optional multerOpts?: Options;
```

Didefinisikan dalam: [packages/runtime/src/config.ts:62](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L62)

Opsi multer Legacy diteruskan ke Middleware yang dihasilkan.
The `storage` pilihan tidak didukung.

#### Example

```ts
{
   *   "dest": "/tmp"
   * } Allows multer to write files to disk instead of keeping them in memory.
```

#### Deprecated

Sejak V6.4.0, `RegisterRoutes` dapat menerima `multerOptions` langsung.
 Pilihan level-konfigurasi ini akan dihapus dalam rilis masa depan.
 (https://github.com/tsoa-next/tsoa-next/issues/1587#issuecomment-2391291433)
 (https://github.com/tsoa-next/tsoa-next/pull/1638)

***

### noImplicitAdditionalProperties?

```ts
optional noImplicitAdditionalProperties?: "ignore" | "throw-on-extras" | "silently-remove-extras";
```

Didefinisikan dalam: [packages/runtime/src/config.ts:34](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L34)

Mode yang memungkinkan Anda mencegah data masukan dari memasuki API Anda. Ini akan mendokumentasikan keputusanmu. Ya dan itu akan menghidupkan validasi excess- properti (di waktu-jalan) dalam rute Anda.

***

### routes

```ts
routes: RoutesConfig;
```

Didefinisikan dalam: [packages/runtime/src/config.ts:14](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L14)

Konfigurasi pembuatan rute.

***

### spec

```ts
spec: SpecConfig;
```

Didefinisikan dalam: [packages/runtime/src/config.ts:9](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L9)

OpenAPI konfigurasi generasi.

***

### tsconfig?

```ts
optional tsconfig?: string;
```

Didefinisikan dalam: [packages/runtime/src/config.ts:41](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L41)

Path ke berkas tsconfig yang dipakai sebagai sumber masukan untuk opsi kompiler selama generasi.
Jika diabaikan, tsoa-next akan mencari tsconfig.json dimulai dari dimuat tsoa direktori konfigurasi.
Opsi kompiler eksplisit dalam tsoa-next config masih mengambil prioritas atas nilai tsconfig.
