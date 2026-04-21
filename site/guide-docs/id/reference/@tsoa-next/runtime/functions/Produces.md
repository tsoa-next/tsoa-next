---
lastUpdated: 2026-04-20T21:59:41.310Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/runtime](../index.md) / Produces

# Fungsi: Produk ()

```ts
function Produces(value): MethodDecorator & ClassDecorator;
```

Didefinisikan dalam: [packages/runtime/src/decorators/response.ts:48](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/response.ts#L48)

Menimpa tipe media balasan pada pengendali atau satu aksi.

## Parameter

### value

`string`

Tipe media respon, misalnya `application/json`.
Lihat [Swagger media-type documentation](https://swagger.io/docs/specification/media-types/).

## Kembali

`MethodDecorator` & `ClassDecorator`
