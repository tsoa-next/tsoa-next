---
lastUpdated: 2026-04-20T21:59:41.307Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/cli](../index.md) / generateRoutes

# Fungsi: generateRoutes ()

```ts
function generateRoutes<Config>(
   routesConfig, 
   compilerOptions?, 
   ignorePaths?, 
   metadata?, 
defaultNumberType?): Promise<Metadata>;
```

Didefinisikan dalam: [cli/src/module/generate-routes.ts:13](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/module/generate-routes.ts#L13)

Menghasilkan berkas rute pada disk dan mengembalikan metadata yang digunakan untuk membangunnya.

## Parameter Tipe

### Config

`Config` ♪ extend ♪ [`ExtendedRoutesConfig`](../interfaces/ExtendedRoutesConfig.md)

## Parameter

### routesConfig

`Config`

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
