---
lastUpdated: 2026-04-20T21:59:41.328Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/runtime](../index.md) / SpecResponseHandler

# Tipo Alias: SpecResponseHandler

```ts
type SpecResponseHandler = (context) => 
  | SpecResponseValue
| Promise<SpecResponseValue>;
```

Definido em: [packages/runtime/src/decorators/specPath.ts:49](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/specPath.ts#L49)

Manipulador personalizado usado por [SpecPath](../functions/SpecPath.md) para servir conteúdo específico.

## Parâmetros

### context

[`SpecRequestContext`](../interfaces/SpecRequestContext.md)

## Retorna

  \| [`SpecResponseValue`](SpecResponseValue.md)
  \| `Promise`\<[`SpecResponseValue`](SpecResponseValue.md)\>
