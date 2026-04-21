---
lastUpdated: 2026-04-20T21:59:41.307Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/cli](../index.md) / validateCompilerOptions

# Fungsi: validateCompilerOptions ()

Memecahkan opsi kompiler untuk tsoa generasi dari baik sebuah config lengkap objek atau mentah `compilerOptions` peta.

## Panggil Tandatangan

```ts
function validateCompilerOptions(config, configBaseDir?): CompilerOptions;
```

Didefinisikan dalam: [cli/src/api.ts:364](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/api.ts#L364)

### Parameter

#### config

[`Config`](../interfaces/Config.md)

#### configBaseDir?

`string`

### Kembali

`CompilerOptions`

## Panggil Tandatangan

```ts
function validateCompilerOptions(compilerOptions?, configBaseDir?): CompilerOptions;
```

Didefinisikan dalam: [cli/src/api.ts:365](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/api.ts#L365)

### Parameter

#### compilerOptions?

`Record`\<`string`, `unknown`\>

#### configBaseDir?

`string`

### Kembali

`CompilerOptions`
