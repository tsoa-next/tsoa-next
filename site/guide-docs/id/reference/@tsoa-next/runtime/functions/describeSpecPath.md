---
lastUpdated: 2026-04-20T21:59:41.311Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/runtime](../index.md) / describeSpecPath

# Fungsi: deskripbeSpecPath ()

```ts
function describeSpecPath(specPath): object;
```

Didefinisikan dalam: [packages/runtime/src/decorators/specPath.ts:192](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/specPath.ts#L192)

Memproduksi ringkasan yang bisa dibaca manusia dari definisi spektpath untuk log dan diagnostik.

## Parameter

### specPath

[`SpecPathDefinition`](../interfaces/SpecPathDefinition.md)

## Kembali

`object`

### cache

```ts
cache: string;
```

### path

```ts
path: string = specPath.path;
```

### target

```ts
target: string;
```
