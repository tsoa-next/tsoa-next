---
lastUpdated: 2026-04-20T21:59:41.341Z
---
[tsoa-next](../../packages.md) / [tsoa-next](../index.md) / Security

# Fungsi: Keamanan ()

```ts
function Security(name, scopes?): ClassDecorator & MethodDecorator;
```

Didefinisikan dalam: [packages/runtime/src/decorators/security.ts:16](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/security.ts#L16)

Mengungkapkan persyaratan keamanan untuk pengendali atau tindakan.

## Parameter

### name

  \| `string`
  \| \{
\[`name`: `string`\]: `string`[];
\}

Nama skema keamanan, atau persyaratan keamanan penuh objek.

### scopes?

`string`[]

Scope OAuth diperlukan oleh skema ketika `name` adalah string.

## Kembali

`ClassDecorator` & `MethodDecorator`
