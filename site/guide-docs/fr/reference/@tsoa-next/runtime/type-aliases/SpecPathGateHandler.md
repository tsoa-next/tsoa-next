---
lastUpdated: 2026-04-20T21:59:41.328Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/runtime](../index.md) / SpecPathGateHandler

# Type Alias: SpecPathGateHandler

```ts
type SpecPathGateHandler = (context) => boolean | Promise<boolean>;
```

Définie dans : [packages/runtime/src/decorators/specPath.ts:51](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/specPath.ts#L51)

Gestionnaire de porte utilisé par [SpecPath](../functions/SpecPath.md) décider si une demande peut recevoir la réponse des spécifications.

## Paramètres

### context

[`SpecRequestContext`](../interfaces/SpecRequestContext.md)

## Retourne

`boolean` \| `Promise`\<`boolean`\>
