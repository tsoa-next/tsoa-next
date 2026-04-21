---
lastUpdated: 2026-04-20T21:59:41.307Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/cli](../index.md) / validateCompilerOptions

# Función: validarCompilerOptions()

Resolves opciones de compilador tsoa generación de un objeto de config completo o un objeto crudo `compilerOptions` mapa.

## Call Signature

```ts
function validateCompilerOptions(config, configBaseDir?): CompilerOptions;
```

Definido en: [cli/src/api.ts:364](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/api.ts#L364)

### Parámetros

#### config

[`Config`](../interfaces/Config.md)

#### configBaseDir?

`string`

### Devoluciones

`CompilerOptions`

## Call Signature

```ts
function validateCompilerOptions(compilerOptions?, configBaseDir?): CompilerOptions;
```

Definido en: [cli/src/api.ts:365](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/api.ts#L365)

### Parámetros

#### compilerOptions?

`Record`\<`string`, `unknown`\>

#### configBaseDir?

`string`

### Devoluciones

`CompilerOptions`
