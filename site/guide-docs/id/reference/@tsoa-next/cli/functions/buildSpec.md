---
lastUpdated: 2026-04-20T21:59:41.307Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/cli](../index.md) / buildSpec

# Fungsi: buildSpec ()

```ts
function buildSpec(
   swaggerConfig, 
   compilerOptions?, 
   ignorePaths?, 
   metadata?, 
   defaultNumberType?): Spec;
```

Didefinisikan dalam: [cli/src/module/generate-spec.ts:47](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/module/generate-spec.ts#L47)

Membangun OpenAPI dokumen dalam memori tanpa menulis ke disk.

## Parameter

### swaggerConfig

[`ExtendedSpecConfig`](../interfaces/ExtendedSpecConfig.md)

### compilerOptions?

`CompilerOptions`

### ignorePaths?

`string`[]

### metadata?

`Metadata`

### defaultNumberType?

`"double"` \| `"float"` \| `"integer"` \| `"long"`

## Kembali

`Spec`
