---
lastUpdated: 2026-04-20T21:59:41.312Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/runtime](../index.md) / resolveSpecPathResponse

# Fonction: resolutionSpecPathResponse()

```ts
function resolveSpecPathResponse(args): Promise<ResolvedSpecResponse>;
```

Définie dans : [packages/runtime/src/routeGeneration/specPathSupport.ts:486](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/specPathSupport.ts#L486)

Décide que [SpecPath](SpecPath.md) cible dans un corps de réponse concret, en appliquant le rendu intégré et le comportement de cache.

## Paramètres

### args

`SpecContextArgs`

## Retourne

`Promise`\<[`ResolvedSpecResponse`](../interfaces/ResolvedSpecResponse.md)\>
