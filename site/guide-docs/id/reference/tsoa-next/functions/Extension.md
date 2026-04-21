---
lastUpdated: 2026-04-20T21:59:41.338Z
---
[tsoa-next](../../packages.md) / [tsoa-next](../index.md) / Extension

# Fungsi: Ekstensi ()

```ts
function Extension(name, value): PropertyDecorator;
```

Didefinisikan dalam: [packages/runtime/src/decorators/extension.ts:7](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/extension.ts#L7)

Tambahkan OpenAPI ekstensi spesifikasi ke sebuah properti model.

## Parameter

### name

`string`

Kunci ekstensi, biasanya dimulai dengan `x-`.

### value

  \| [`ExtensionType`](../type-aliases/ExtensionType.md)
  \| [`ExtensionType`](../type-aliases/ExtensionType.md)[]

Nilai ekstensi.

## Kembali

`PropertyDecorator`
