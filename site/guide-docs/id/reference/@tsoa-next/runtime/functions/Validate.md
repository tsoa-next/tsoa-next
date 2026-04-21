---
lastUpdated: 2026-04-20T21:59:41.311Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/runtime](../index.md) / Validate

# Fungsi: Validate ()

```ts
function Validate(...args): ParameterDecorator;
```

Didefinisikan dalam: [packages/runtime/src/decorators/validate.ts:141](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/validate.ts#L141)

Lampiran externall-schema validasi metadata ke parameter controller.

Bentuk yang didukung adalah `@Validate(schema)`, `@Validate(kind, schema)`, dan `@Validate({ kind, schema })`.

## Parameter

### args

...`unknown`[]

## Kembali

`ParameterDecorator`
