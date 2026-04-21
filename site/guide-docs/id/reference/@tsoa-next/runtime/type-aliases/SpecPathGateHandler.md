---
lastUpdated: 2026-04-20T21:59:41.328Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/runtime](../index.md) / SpecPathGateHandler

# Tipe Alias: SpecPathGateHandler

```ts
type SpecPathGateHandler = (context) => boolean | Promise<boolean>;
```

Didefinisikan dalam: [packages/runtime/src/decorators/specPath.ts:51](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/specPath.ts#L51)

Penangan gerbang yang dipakai [SpecPath](../functions/SpecPath.md) untuk memutuskan apakah suatu permintaan dapat menerima jawaban spesifikasi.

## Parameter

### context

[`SpecRequestContext`](../interfaces/SpecRequestContext.md)

## Kembali

`boolean` \| `Promise`\<`boolean`\>
