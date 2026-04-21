---
lastUpdated: 2026-04-20T21:59:41.342Z
---
[tsoa-next](../../packages.md) / [tsoa-next](../index.md) / fetchMiddlewares

# Fungsi: fetchMiddlewares ()

```ts
function fetchMiddlewares<T>(target): T[];
```

Didefinisikan dalam: [packages/runtime/src/decorators/middlewares.ts:55](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/middlewares.ts#L55)

Mengembalikan metadata Middleware sebelumnya yang terpasang [Middlewares](Middlewares.md).

## Parameter Tipe

### T

`T` ♪ extend ♪ `object` 124; `CallableFunction`

## Parameter

### target

`MiddlewareTarget`

Fungsi pengendali atau metode untuk memeriksa.

## Kembali

`T`[]
