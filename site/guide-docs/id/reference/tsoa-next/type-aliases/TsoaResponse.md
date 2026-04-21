---
lastUpdated: 2026-04-20T21:59:41.367Z
---
[tsoa-next](../../packages.md) / [tsoa-next](../index.md) / TsoaResponse

# Tipe Alias: Trenh Respon\<T, BodyType, HeaderType, ReturnType\>

```ts
type TsoaResponse<T, BodyType, HeaderType, ReturnType> = (status, data, headers?) => ReturnType;
```

Didefinisikan dalam: [packages/runtime/src/interfaces/response.ts:77](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/response.ts#L77)

Ubah bentuk fungsi yang disuntikkan [Res](../functions/Res.md).

Panggil fungsi dengan kode status, muatan, dan header opsional untuk mempersingkat aksi dan mengirim respon yang diketik.

## Parameter Tipe

### T

`T` ♪ extend ♪ [`HttpStatusCodeLiteral`](HttpStatusCodeLiteral.md)

### BodyType

`BodyType`

### HeaderType

`HeaderType` ♪ extend ♪ `IsValidHeader`\<`HeaderType`\> = `object`

### ReturnType

`ReturnType` = `never`

## Parameter

### status

`T`

### data

`BodyType`

### headers?

`HeaderType`

## Kembali

`ReturnType`
