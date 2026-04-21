---
lastUpdated: 2026-04-20T21:59:41.366Z
---
[tsoa-next](../../packages.md) / [tsoa-next](../index.md) / RuntimeSchemaAdapterResult

# Ketik Alias: SchedumaAdapterResult\<T\>

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

Didefinisikan dalam: [packages/runtime/src/routeGeneration/externalValidation.ts:4](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/externalValidation.ts#L4)

Hasil yang dikembalikan oleh adaptor waktu-jalan untuk perpustakaan validasi eksternal.

## Parameter Tipe

### T

`T` = `unknown`
