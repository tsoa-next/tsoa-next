---
lastUpdated: 2026-04-20T21:59:41.328Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/runtime](../index.md) / SpecResponseHandler

# Type Alias: SpecResponseHandler

```ts
type SpecResponseHandler = (context) => 
  | SpecResponseValue
| Promise<SpecResponseValue>;
```

Définie dans : [packages/runtime/src/decorators/specPath.ts:49](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/specPath.ts#L49)

Gestionnaire personnalisé utilisé par [SpecPath](../functions/SpecPath.md) pour servir le contenu des spécifications.

## Paramètres

### context

[`SpecRequestContext`](../interfaces/SpecRequestContext.md)

## Retourne

  \| [`SpecResponseValue`](SpecResponseValue.md)
  \| `Promise`\<[`SpecResponseValue`](SpecResponseValue.md)\>
