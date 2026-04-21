---
lastUpdated: 2026-04-20T21:59:41.345Z
---
[tsoa-next](../../packages.md) / [tsoa-next](../index.md) / SpecGenerator

# Antar muka: SpecGenerator

Didefinisikan dalam: [packages/runtime/src/decorators/specPath.ts:24](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/specPath.ts#L24)

Menggambarkan kontrak waktu-jalan yang dibutuhkan untuk membangun kembali OpenAPI dokumen sesuai permintaan.

## Metode

### getSpecObject()

```ts
getSpecObject(): Promise<Spec>;
```

Didefinisikan dalam: [packages/runtime/src/decorators/specPath.ts:25](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/specPath.ts#L25)

#### Kembali

`Promise`\<[`Spec`](../namespaces/Swagger/interfaces/Spec.md)\>

***

### getSpecString()

```ts
getSpecString(format): Promise<string>;
```

Didefinisikan dalam: [packages/runtime/src/decorators/specPath.ts:26](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/specPath.ts#L26)

#### Parameter

##### format

[`SpecDocumentFormat`](../type-aliases/SpecDocumentFormat.md)

#### Kembali

`Promise`\<`string`\>
