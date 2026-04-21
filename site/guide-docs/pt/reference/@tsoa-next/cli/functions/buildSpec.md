---
lastUpdated: 2026-04-20T21:59:41.307Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/cli](../index.md) / buildSpec

# Função: buildSpec ()

```ts
function buildSpec(
   swaggerConfig, 
   compilerOptions?, 
   ignorePaths?, 
   metadata?, 
   defaultNumberType?): Spec;
```

Definido em: [cli/src/module/generate-spec.ts:47](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/module/generate-spec.ts#L47)

Compila um OpenAPI documento na memória sem escrevê-lo no disco.

## Parâmetros

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

## Retorna

`Spec`
