---
lastUpdated: 2026-04-20T21:59:41.338Z
---
[tsoa-next](../../packages.md) / [tsoa-next](../index.md) / Consumes

# Fungsi: Konsumsi ()

```ts
function Consumes(value): MethodDecorator;
```

Didefinisikan dalam: [packages/runtime/src/decorators/parameter.ts:109](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/parameter.ts#L109)

Menimpa tipe media yang dipakai untuk mendokumentasikan suatu tubuh permintaan untuk satu aksi.

## Parameter

### value

`string`

Tipe media tubuh permintaan, misalnya `application/json`.
Lihat [Swagger request-body documentation](https://swagger.io/docs/specification/describing-request-body/).

## Kembali

`MethodDecorator`
