---
lastUpdated: 2026-04-20T21:59:41.310Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/runtime](../index.md) / Res

# Fungsi: Res ()

```ts
function Res(): ParameterDecorator;
```

Didefinisikan dalam: [packages/runtime/src/decorators/response.ts:38](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/response.ts#L38)

Suntikkan fungsi responder library-agnostik yang dapat dipakai untuk membuat tipe-tercentang (biasanya error-) respon.

Annotasikan parameter sebagai `TsoaResponse<Status, Data, Headers>` jadi tsoa dapat menyimpulkan respon terdokumentasi.

## Kembali

`ParameterDecorator`
