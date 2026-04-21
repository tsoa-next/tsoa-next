---
lastUpdated: 2026-04-20T21:59:41.307Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/cli](../index.md) / generateRoutes

# Função: genereRoutes ()

```ts
function generateRoutes<Config>(
   routesConfig, 
   compilerOptions?, 
   ignorePaths?, 
   metadata?, 
defaultNumberType?): Promise<Metadata>;
```

Definido em: [cli/src/module/generate-routes.ts:13](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/module/generate-routes.ts#L13)

Gera arquivos de rota no disco e retorna os metadados usados para compilá- los.

## Parâmetros do tipo

### Config

`Config` *extensões* [`ExtendedRoutesConfig`](../interfaces/ExtendedRoutesConfig.md)

## Parâmetros

### routesConfig

`Config`

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
