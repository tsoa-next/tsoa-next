---
lastUpdated: 2026-04-20T21:59:41.339Z
---
[tsoa-next](../../packages.md) / [tsoa-next](../index.md) / Middlewares

# Fungsi: Middlewares ()

```ts
function Middlewares<T>(...mws): ClassDecorator & MethodDecorator;
```

Didefinisikan dalam: [packages/runtime/src/decorators/middlewares.ts:41](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/middlewares.ts#L41)

Lampirkan satu atau lebih waktu-waktu-berjalan penanganan menengah ke pengontrol atau tindakan.

## Parameter Tipe

### T

`T` ♪ extend ♪ `object` 124; `CallableFunction`

## Parameter

### mws

...`T`[]

Fungsi Middleware atau benda Middleware untuk dipasang.

## Kembali

`ClassDecorator` & `MethodDecorator`
