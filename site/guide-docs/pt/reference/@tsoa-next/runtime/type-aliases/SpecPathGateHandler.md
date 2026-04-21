---
lastUpdated: 2026-04-20T21:59:41.328Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/runtime](../index.md) / SpecPathGateHandler

# Tipo Alias: SpecPathGateHandler

```ts
type SpecPathGateHandler = (context) => boolean | Promise<boolean>;
```

Definido em: [packages/runtime/src/decorators/specPath.ts:51](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/specPath.ts#L51)

Manipulador de portas utilizado por [SpecPath](../functions/SpecPath.md) decidir se um pedido pode receber a resposta específica.

## Parâmetros

### context

[`SpecRequestContext`](../interfaces/SpecRequestContext.md)

## Retorna

`boolean` \| `Promise`\<`boolean`\>
