---
lastUpdated: 2026-04-20T21:59:41.360Z
---
[tsoa-next](../../../../packages.md) / [tsoa-next](../../../index.md) / [Tsoa](../index.md) / ValidationContext

# Antarmuka: ValidationContext

Didefinisikan dalam: [packages/runtime/src/metadataGeneration/tsoa.ts:32](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/metadataGeneration/tsoa.ts#L32)

## Properti

### errorFormatter?

```ts
optional errorFormatter?: (failure) => ValidationFailure;
```

Didefinisikan dalam: [packages/runtime/src/metadataGeneration/tsoa.ts:35](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/metadataGeneration/tsoa.ts#L35)

#### Parameter

##### failure

[`ValidationFailure`](ValidationFailure.md)

#### Kembali

[`ValidationFailure`](ValidationFailure.md)

***

### locale?

```ts
optional locale?: string;
```

Didefinisikan dalam: [packages/runtime/src/metadataGeneration/tsoa.ts:33](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/metadataGeneration/tsoa.ts#L33)

***

### translate?

```ts
optional translate?: (key, params?) => string;
```

Didefinisikan dalam: [packages/runtime/src/metadataGeneration/tsoa.ts:34](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/metadataGeneration/tsoa.ts#L34)

#### Parameter

##### key

`string`

##### params?

`Record`\<`string`, `unknown`\>

#### Kembali

`string`
