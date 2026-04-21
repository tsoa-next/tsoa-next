---
lastUpdated: 2026-04-20T21:59:41.307Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/cli](../index.md) / generateRoutes

# Fonction: generateRoutes()

```ts
function generateRoutes<Config>(
   routesConfig, 
   compilerOptions?, 
   ignorePaths?, 
   metadata?, 
defaultNumberType?): Promise<Metadata>;
```

Définie dans : [cli/src/module/generate-routes.ts:13](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/module/generate-routes.ts#L13)

Génére des fichiers de route sur disque et renvoie les métadonnées utilisées pour les construire.

## Paramètres de type

### Config

`Config` *Extends* [`ExtendedRoutesConfig`](../interfaces/ExtendedRoutesConfig.md)

## Paramètres

### routesConfig

`Config`

### compilerOptions?

`CompilerOptions`

### ignorePaths?

`string`[]

### metadata?

`Metadata`

passer dans les métadonnées mises en cache retournées dans une étape précédente pour accélérer les choses

### defaultNumberType?

`"double"` \| `"float"` \| `"integer"` \| `"long"`

## Retourne

`Promise`\<`Metadata`\>
