---
lastUpdated: 2026-04-20T21:59:41.364Z
---
[tsoa-next](../../../../packages.md) / [tsoa-next](../../../index.md) / [TsoaRoute](../index.md) / RefObjectModels

# Antarmuka: RefObjectModel

Didefinisikan dalam: [packages/runtime/src/routeGeneration/tsoa-route.ts:26](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/tsoa-route.ts#L26)

Ini adalah tipe kenyamanan sehingga Anda dapat memeriksa .properties pada item dalam Record tanpa memiliki TypeScript melemparkan kesalahan kompiler. Itu karena Rekor ini tidak dapat memiliki enums di dalamnya. Jika Anda ingin itu, maka hanya menggunakan antarmuka dasar

## Extending

- [`Models`](Models.md)

## Indexable

```ts
[refNames: string]: RefObjectModelSchema
```
