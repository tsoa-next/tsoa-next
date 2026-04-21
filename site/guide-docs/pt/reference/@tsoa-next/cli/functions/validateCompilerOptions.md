---
lastUpdated: 2026-04-20T21:59:41.307Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/cli](../index.md) / validateCompilerOptions

# Função: validateCompilerOptions()

Resolve as opções do compilador para tsoa geração de um objeto de configuração completo ou de um objeto em bruto `compilerOptions` mapa.

## Assinatura da chamada

```ts
function validateCompilerOptions(config, configBaseDir?): CompilerOptions;
```

Definido em: [cli/src/api.ts:364](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/api.ts#L364)

### Parâmetros

#### config

[`Config`](../interfaces/Config.md)

#### configBaseDir?

`string`

### Retorna

`CompilerOptions`

## Assinatura da chamada

```ts
function validateCompilerOptions(compilerOptions?, configBaseDir?): CompilerOptions;
```

Definido em: [cli/src/api.ts:365](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/api.ts#L365)

### Parâmetros

#### compilerOptions?

`Record`\<`string`, `unknown`\>

#### configBaseDir?

`string`

### Retorna

`CompilerOptions`
