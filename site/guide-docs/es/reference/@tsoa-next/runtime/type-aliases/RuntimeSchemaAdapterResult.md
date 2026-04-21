---
lastUpdated: 2026-04-20T21:59:41.327Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/runtime](../index.md) / RuntimeSchemaAdapterResult

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

Definido en: [packages/runtime/src/routeGeneration/externalValidation.ts:4](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/externalValidation.ts#L4)

Resultado devuelto por un adaptador de tiempo de ejecución para una biblioteca de validación externa.

## Parámetros tipo

### T

`T` = `unknown`
