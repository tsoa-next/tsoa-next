---
lastUpdated: 2026-04-20T21:59:41.328Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/runtime](../index.md) / SpecResponseHandler

# Tipe Alias: SpecResponseHandler

```ts
type SpecResponseHandler = (context) => 
  | SpecResponseValue
| Promise<SpecResponseValue>;
```

Didefinisikan dalam: [packages/runtime/src/decorators/specPath.ts:49](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/specPath.ts#L49)

Penangan gubahan yang dipakai oleh [SpecPath](../functions/SpecPath.md) untuk melayani isi spesifikasi.

## Parameter

### context

[`SpecRequestContext`](../interfaces/SpecRequestContext.md)

## Kembali

  \| [`SpecResponseValue`](SpecResponseValue.md)
  \| `Promise`\<[`SpecResponseValue`](SpecResponseValue.md)\>
