---
lastUpdated: 2026-04-20T21:59:41.307Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/cli](../index.md) / generateRoutes

# Función: GeneraRoutes()

```ts
function generateRoutes<Config>(
   routesConfig, 
   compilerOptions?, 
   ignorePaths?, 
   metadata?, 
defaultNumberType?): Promise<Metadata>;
```

Definido en: [cli/src/module/generate-routes.ts:13](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/module/generate-routes.ts#L13)

Genera archivos de ruta en disco y devuelve los metadatos utilizados para construirlos.

## Parámetros tipo

### Config

`Config` *Existe* [`ExtendedRoutesConfig`](../interfaces/ExtendedRoutesConfig.md)

## Parámetros

### routesConfig

`Config`

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
