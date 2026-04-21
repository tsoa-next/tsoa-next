---
lastUpdated: 2026-04-20T21:59:41.307Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/cli](../index.md) / generateSpec

# Fonction: générerSpec()

```ts
function generateSpec(
   swaggerConfig, 
   compilerOptions?, 
   ignorePaths?, 
   metadata?, 
defaultNumberType?): Promise<Metadata>;
```

Définie dans : [cli/src/module/generate-spec.ts:22](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/module/generate-spec.ts#L22)

Génére une OpenAPI document sur disque et retourne les métadonnées utilisées pour le construire.

## Paramètres

### swaggerConfig

[`ExtendedSpecConfig`](../interfaces/ExtendedSpecConfig.md)

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
