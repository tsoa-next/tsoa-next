---
lastUpdated: 2026-04-20T21:59:41.307Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/cli](../index.md) / generateSpec

# Función: generateSpec()

```ts
function generateSpec(
   swaggerConfig, 
   compilerOptions?, 
   ignorePaths?, 
   metadata?, 
defaultNumberType?): Promise<Metadata>;
```

Definido en: [cli/src/module/generate-spec.ts:22](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/module/generate-spec.ts#L22)

Genera un OpenAPI documenta en disco y devuelve los metadatos utilizados para construirlo.

## Parámetros

### swaggerConfig

[`ExtendedSpecConfig`](../interfaces/ExtendedSpecConfig.md)

### compilerOptions?

`CompilerOptions`

### ignorePaths?

`string`[]

### metadata?

`Metadata`

pasar en metadatos caché devueltos en un paso previo para acelerar las cosas

### defaultNumberType?

`"double"` \| `"float"` \| `"integer"` \| `"long"`

## Devoluciones

`Promise`\<`Metadata`\>
