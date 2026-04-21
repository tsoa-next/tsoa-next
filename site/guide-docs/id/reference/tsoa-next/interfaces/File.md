---
lastUpdated: 2026-04-20T21:59:41.344Z
---
[tsoa-next](../../packages.md) / [tsoa-next](../index.md) / File

# Antar muka: Berkas

Didefinisikan dalam: [packages/runtime/src/interfaces/file.ts:4](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/file.ts#L4)

Objek yang memuat metadata berkas dan informasi akses.

## Properti

### buffer

```ts
buffer: Buffer;
```

Didefinisikan dalam: [packages/runtime/src/interfaces/file.ts:31](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/file.ts#L31)

`MemoryStorage` hanya: Buffer berisi seluruh berkas.

***

### destination

```ts
destination: string;
```

Didefinisikan dalam: [packages/runtime/src/interfaces/file.ts:25](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/file.ts#L25)

`DiskStorage` hanya: Direktori yang file ini telah diunggah.

***

### ¶ encoding ¶

```ts
encoding: string;
```

Didefinisikan dalam: [packages/runtime/src/interfaces/file.ts:14](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/file.ts#L14)

Nilai dari `Content-Transfer-Encoding` tajuk untuk berkas ini.

#### Deprecated

sejak Juli 2015

#### See

RFC 7578, Bagian 4.7

***

### fieldname

```ts
fieldname: string;
```

Didefinisikan dalam: [packages/runtime/src/interfaces/file.ts:6](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/file.ts#L6)

Nama ruas formulir yang terkait dengan berkas ini.

***

### filename

```ts
filename: string;
```

Didefinisikan dalam: [packages/runtime/src/interfaces/file.ts:27](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/file.ts#L27)

`DiskStorage` hanya: Nama berkas ini dalam `destination`.

***

### mimetype

```ts
mimetype: string;
```

Didefinisikan dalam: [packages/runtime/src/interfaces/file.ts:16](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/file.ts#L16)

Nilai dari `Content-Type` tajuk untuk berkas ini.

***

### originalname

```ts
originalname: string;
```

Didefinisikan dalam: [packages/runtime/src/interfaces/file.ts:8](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/file.ts#L8)

Nama berkas pada komputer uploader.

***

### path

```ts
path: string;
```

Didefinisikan dalam: [packages/runtime/src/interfaces/file.ts:29](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/file.ts#L29)

`DiskStorage` hanya: Jalur penuh ke file yang diunggah.

***

### size

```ts
size: number;
```

Didefinisikan dalam: [packages/runtime/src/interfaces/file.ts:18](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/file.ts#L18)

Ukuran berkas dalam bita.

***

### stream

```ts
stream: Readable;
```

Didefinisikan dalam: [packages/runtime/src/interfaces/file.ts:23](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/file.ts#L23)

Arus yang dapat dibaca dari berkas ini. Hanya tersedia untuk `_handleFile`
callback untuk gubahan `StorageEngine`s.
