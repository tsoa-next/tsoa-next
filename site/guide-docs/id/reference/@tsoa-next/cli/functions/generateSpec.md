---
lastUpdated: 2026-04-20T21:59:41.307Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/cli](../index.md) / generateSpec

# Fungsi: generateSpec ()

```ts
function generateSpec(
   swaggerConfig, 
   compilerOptions?, 
   ignorePaths?, 
   metadata?, 
defaultNumberType?): Promise<Metadata>;
```

Didefinisikan dalam: [cli/src/module/generate-spec.ts:22](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/module/generate-spec.ts#L22)

Menghasilkan OpenAPI dokumen pada disk dan mengembalikan metadata yang digunakan untuk membangunnya.

## Parameter

### swaggerConfig

[`ExtendedSpecConfig`](../interfaces/ExtendedSpecConfig.md)

### compilerOptions?

`CompilerOptions`

### ignorePaths?

`string`[]

### metadata?

`Metadata`

lulus dalam metadata cached dikembalikan dalam langkah sebelumnya untuk mempercepat hal-hal up

### defaultNumberType?

`"double"` \| `"float"` \| `"integer"` \| `"long"`

## Kembali

`Promise`\<`Metadata`\>
