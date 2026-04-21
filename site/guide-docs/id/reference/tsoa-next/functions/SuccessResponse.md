---
lastUpdated: 2026-04-20T21:59:41.341Z
---
[tsoa-next](../../packages.md) / [tsoa-next](../index.md) / SuccessResponse

# Fungsi: Respon Sukses ()

```ts
function SuccessResponse<HeaderType>(
   name, 
   description?, 
   produces?): MethodDecorator;
```

Didefinisikan dalam: [packages/runtime/src/decorators/response.ts:12](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/response.ts#L12)

Menyatakan status respon yang sukses, deskripsi, dan tipe media untuk suatu operasi.

## Parameter Tipe

### HeaderType

`HeaderType` ♪ extend ♪ 
  \| `object`
  \| `"Header names must be of type string"`
  \| `"Header values must be string or string[]"` = `object`

## Parameter

### name

`string` \| `number`

Kode status HTTP dikembalikan ketika operasi sukses.

### description?

`string`

Deskripsi respon yang ditampilkan dalam pembuatan OpenAPI dokumen.

### produces?

`string` \| `string`[]

Tipe media respon atau jenis media.

## Kembali

`MethodDecorator`
