---
lastUpdated: 2026-04-20T21:59:41.313Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/runtime](../index.md) / RoutesConfig

# Antarmuka: Konfig Ruutes@@

Didefinisikan dalam: [packages/runtime/src/config.ts:235](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L235)

## Properti

### authenticationModule?

```ts
optional authenticationModule?: string;
```

Didefinisikan dalam: [packages/runtime/src/config.ts:274](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L274)

Path modul otentikasi yang dipakai oleh rute yang dihasilkan.

***

### basePath?

```ts
optional basePath?: string;
```

Didefinisikan dalam: [packages/runtime/src/config.ts:254](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L254)

Path API dasar; mis. '/ v1' di https://myapi.com/v1

***

### bodyCoercion?

```ts
optional bodyCoercion?: boolean;
```

Didefinisikan dalam: [packages/runtime/src/config.ts:288](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L288)

Apakah secara implisit memaksa parameter tubuh menjadi tipe yang diterima.

#### Default

```ts
true
```

***

### esm?

```ts
optional esm?: boolean;
```

Didefinisikan dalam: [packages/runtime/src/config.ts:281](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L281)

Bila difungsikan, impor rute yang dihasilkan dipakai `.js` ekstensi untuk keluaran ESM.

#### Default

```ts
false
```

***

### iocModule?

```ts
optional iocModule?: string;
```

Didefinisikan dalam: [packages/runtime/src/config.ts:269](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L269)

Path modul IoC, misalnya `./inversify/ioc`.

***

### middleware?

```ts
optional middleware?: "express" | "hapi" | "koa";
```

Didefinisikan dalam: [packages/runtime/src/config.ts:259](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L259)

Penyedia Middleware.

***

### middlewareTemplate?

```ts
optional middlewareTemplate?: string;
```

Didefinisikan dalam: [packages/runtime/src/config.ts:264](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L264)

Gubahan Handlebars jalur template digunakan daripada built-in middleware template.

***

### noWriteIfUnchanged?

```ts
optional noWriteIfUnchanged?: boolean;
```

Didefinisikan dalam: [packages/runtime/src/config.ts:249](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L249)

Melewati penulisan berkas rute ketika isi yang dihasilkan cocok dengan berkas yang ada.

***

### rewriteRelativeImportExtensions?

```ts
optional rewriteRelativeImportExtensions?: boolean;
```

Didefinisikan dalam: [packages/runtime/src/config.ts:295](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L295)

Bila diaktifkan, impor rute yang dihasilkan disimpan `.ts` ekstensi untuk mendukung TypeScript 5.7 `rewriteRelativeImportExtensions`.

#### Default

```ts
false
```

***

### routesDir

```ts
routesDir: string;
```

Didefinisikan dalam: [packages/runtime/src/config.ts:239](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L239)

Direktori dimana berkas rute yang dihasilkan ditulis.

***

### routesFileName?

```ts
optional routesFileName?: string;
```

Didefinisikan dalam: [packages/runtime/src/config.ts:244](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L244)

Nama berkas untuk modul rute yang dihasilkan.
