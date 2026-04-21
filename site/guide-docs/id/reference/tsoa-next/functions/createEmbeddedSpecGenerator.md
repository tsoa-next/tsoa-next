---
lastUpdated: 2026-04-20T21:59:41.330Z
---
[tsoa-next](../../packages.md) / [tsoa-next](../index.md) / createEmbeddedSpecGenerator

# Fungsi: createEbeddedSpecGenerator ()

```ts
function createEmbeddedSpecGenerator(artifacts): SpecGenerator;
```

Didefinisikan dalam: [packages/tsoa/src/spec.ts:21](https://github.com/tsoa-next/tsoa-next/blob/main/packages/tsoa/src/spec.ts#L21)

Creates a runtime spec generator from a prebuilt OpenAPI artefak tertanam ke kode rute yang dihasilkan.
Ini terus membangun-in `SpecPath` target independen dari berkas sumber dan TypeScript analisis pada waktu permintaan.

## Parameter

### artifacts

[`EmbeddedSpecGeneratorArtifacts`](../interfaces/EmbeddedSpecGeneratorArtifacts.md)

## Kembali

[`SpecGenerator`](../interfaces/SpecGenerator.md)
