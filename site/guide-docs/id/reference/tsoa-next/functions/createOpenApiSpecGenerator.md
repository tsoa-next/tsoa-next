---
lastUpdated: 2026-04-20T21:59:41.330Z
---
[tsoa-next](../../packages.md) / [tsoa-next](../index.md) / createOpenApiSpecGenerator

# Fungsi: createOpenApiSpecGenerator ()

```ts
function createOpenApiSpecGenerator(config?): SpecGenerator;
```

Didefinisikan dalam: [packages/tsoa/src/spec.ts:63](https://github.com/tsoa-next/tsoa-next/blob/main/packages/tsoa/src/spec.ts#L63)

Membuat generator spec waktu-jalan yang lazily membangun OpenAPI dokumen sekali per generator instansi menggunakan `@tsoa-next/cli`,
lalu caches yang dihasilkan spesifikasi objek dan serialisasi string untuk pembacaan berikutnya.

## Parameter

### config?

[`RuntimeSpecConfigSnapshot`](../interfaces/RuntimeSpecConfigSnapshot.md)

## Kembali

[`SpecGenerator`](../interfaces/SpecGenerator.md)
