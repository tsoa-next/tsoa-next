---
lastUpdated: 2026-04-20T21:59:41.307Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/cli](../index.md) / generateSpec

# Função: genereSpec ()

```ts
function generateSpec(
   swaggerConfig, 
   compilerOptions?, 
   ignorePaths?, 
   metadata?, 
defaultNumberType?): Promise<Metadata>;
```

Definido em: [cli/src/module/generate-spec.ts:22](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/module/generate-spec.ts#L22)

Gera um OpenAPI documento no disco e retorna os metadados usados para compilar.

## Parâmetros

### swaggerConfig

[`ExtendedSpecConfig`](../interfaces/ExtendedSpecConfig.md)

### compilerOptions?

`CompilerOptions`

### ignorePaths?

`string`[]

### metadata?

`Metadata`

passar em metadados em cache retornados em um passo anterior para acelerar as coisas

### defaultNumberType?

`"double"` \| `"float"` \| `"integer"` \| `"long"`

## Retorna

`Promise`\<`Metadata`\>
