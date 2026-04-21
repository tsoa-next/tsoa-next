---
lastUpdated: 2026-04-20T21:59:41.367Z
---
[tsoa-next](../../packages.md) / [tsoa-next](../index.md) / SpecPathGateHandler

# Tipo Alias: SpecPathGateHandler

```ts
type SpecPathGateHandler = (context) => boolean | Promise<boolean>;
```

Definido en: [packages/runtime/src/decorators/specPath.ts:51](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/specPath.ts#L51)

Manejador de puerta utilizado por [SpecPath](../functions/SpecPath.md) to decide whether a request may receive the spec response.

## Parámetros

### context

[`SpecRequestContext`](../interfaces/SpecRequestContext.md)

## Devoluciones

`boolean` \| `Promise`\<`boolean`\>
