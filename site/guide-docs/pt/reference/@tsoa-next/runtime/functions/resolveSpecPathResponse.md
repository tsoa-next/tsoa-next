---
lastUpdated: 2026-04-20T21:59:41.312Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/runtime](../index.md) / resolveSpecPathResponse

# Função: resolveSpecPathResponse()

```ts
function resolveSpecPathResponse(args): Promise<ResolvedSpecResponse>;
```

Definido em: [packages/runtime/src/routeGeneration/specPathSupport.ts:486](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/specPathSupport.ts#L486)

Resolve uma declaração [SpecPath](SpecPath.md) alvo em um corpo de resposta de concreto, aplicando o comportamento de renderização e cache embutidos.

## Parâmetros

### args

`SpecContextArgs`

## Retorna

`Promise`\<[`ResolvedSpecResponse`](../interfaces/ResolvedSpecResponse.md)\>
