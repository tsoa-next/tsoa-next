---
lastUpdated: 2026-04-20T21:59:41.340Z
---
[tsoa-next](../../packages.md) / [tsoa-next](../index.md) / Response

# Fungsi: Respon ()

```ts
function Response<ExampleType, HeaderType>(
   name, 
   description?, 
   example?, 
   produces?): MethodDecorator & ClassDecorator;
```

Didefinisikan dalam: [packages/runtime/src/decorators/response.ts:24](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/response.ts#L24)

Tambahkan jawaban yang didokumentasikan yang dapat dihubungkan dengan metode atau pengendali.

## Parameter Tipe

### ExampleType

`ExampleType`

### HeaderType

`HeaderType` ♪ extend ♪ 
  \| `object`
  \| `"Header names must be of type string"`
  \| `"Header values must be string or string[]"` = `object`

## Parameter

### name

  \| `"400"`
  \| `"401"`
  \| `"402"`
  \| `"403"`
  \| `"404"`
  \| `"405"`
  \| `"406"`
  \| `"407"`
  \| `"408"`
  \| `"409"`
  \| `"410"`
  \| `"411"`
  \| `"412"`
  \| `"413"`
  \| `"414"`
  \| `"415"`
  \| `"416"`
  \| `"417"`
  \| `"418"`
  \| `"422"`
  \| `"423"`
  \| `"424"`
  \| `"425"`
  \| `"426"`
  \| `"428"`
  \| `"429"`
  \| `"431"`
  \| `"451"`
  \| `"500"`
  \| `"501"`
  \| `"502"`
  \| `"503"`
  \| `"504"`
  \| `"505"`
  \| `"506"`
  \| `"507"`
  \| `"508"`
  \| `"510"`
  \| `"511"`
  \| [`HttpStatusCodeLiteral`](../type-aliases/HttpStatusCodeLiteral.md)
  \| `"100"`
  \| `"200"`
  \| `"101"`
  \| `"102"`
  \| `"201"`
  \| `"202"`
  \| `"203"`
  \| `"204"`
  \| `"205"`
  \| `"206"`
  \| `"207"`
  \| `"208"`
  \| `"226"`
  \| `"300"`
  \| `"301"`
  \| `"302"`
  \| `"303"`
  \| `"304"`
  \| `"305"`
  \| `"307"`
  \| `"308"`
  \| [`OtherValidOpenApiHttpStatusCode`](../type-aliases/OtherValidOpenApiHttpStatusCode.md)

Kode status HTTP, OpenAPI jangkauan respon, atau `default`.

### description?

`string`

Deskripsi respon yang ditampilkan dalam pembuatan OpenAPI dokumen.

### example?

`ExampleType`

Suatu contoh payload untuk skema respon.

### produces?

`string` \| `string`[]

Tipe media respon atau jenis media.

## Kembali

`MethodDecorator` & `ClassDecorator`
