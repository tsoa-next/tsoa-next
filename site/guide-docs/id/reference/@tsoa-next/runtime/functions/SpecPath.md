---
lastUpdated: 2026-04-20T21:59:41.311Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/runtime](../index.md) / SpecPath

# Fungsi: SpecPath ()

```ts
function SpecPath(
   path?, 
   optionsOrTarget?, 
   cache?): ClassDecorator;
```

Didefinisikan dalam: [packages/runtime/src/decorators/specPath.ts:157](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/specPath.ts#L157)

Register a controller-local route yang melayani yang dihasilkan OpenAPI dokumen atau respon berdasarkan ubahan.

## Parameter

### path?

`string` = `'spec'`

Jalur rute relatif. Baku ke `spec`.

### optionsOrTarget?

  \| [`SpecPathTarget`](../type-aliases/SpecPathTarget.md)
  \| [`SpecPathOptions`](../interfaces/SpecPathOptions.md)

Entah `SpecPathOptions` objek atau argumen target warisan.

### cache?

[`SpecPathCache`](../type-aliases/SpecPathCache.md) = `'memory'`

Argumen strategi Warisan Cache. Default untuk caching memori in-.

## Kembali

`ClassDecorator`
