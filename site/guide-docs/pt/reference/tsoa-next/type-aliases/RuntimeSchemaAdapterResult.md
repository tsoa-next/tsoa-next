---
lastUpdated: 2026-04-20T21:59:41.366Z
---
[tsoa-next](../../packages.md) / [tsoa-next](../index.md) / RuntimeSchemaAdapterResult

# Tipo Alias: RuntimeSchemaAdapterResult\<T\>

```ts
type RuntimeSchemaAdapterResult<T> = 
  | {
  ok: true;
  value: T;
}
  | {
  failure: ValidationFailure;
  ok: false;
};
```

Definido em: [packages/runtime/src/routeGeneration/externalValidation.ts:4](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/externalValidation.ts#L4)

Resultado retornado por um adaptador de tempo de execução para uma biblioteca de validação externa.

## Parâmetros do tipo

### T

`T` = `unknown`
