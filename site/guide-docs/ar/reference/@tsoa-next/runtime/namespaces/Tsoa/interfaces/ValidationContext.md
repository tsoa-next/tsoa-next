---
lastUpdated: 2026-04-20T21:59:41.324Z
---
[tsoa-next](../../../../../packages.md) / [@tsoa-next/runtime](../../../index.md) / [Tsoa](../index.md) / ValidationContext

# Interface: ValidationContext

محددة في: [packages/runtime/src/metadataGeneration/tsoa.ts:32](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/metadataGeneration/tsoa.ts#L32)

## الممتلكات

### errorFormatter?

```ts
optional errorFormatter?: (failure) => ValidationFailure;
```

محددة في: [packages/runtime/src/metadataGeneration/tsoa.ts:35](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/metadataGeneration/tsoa.ts#L35)

#### البارامترات

##### failure

[`ValidationFailure`](ValidationFailure.md)

#### العودة

[`ValidationFailure`](ValidationFailure.md)

***

### locale?

```ts
optional locale?: string;
```

محددة في: [packages/runtime/src/metadataGeneration/tsoa.ts:33](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/metadataGeneration/tsoa.ts#L33)

***

### translate?

```ts
optional translate?: (key, params?) => string;
```

محددة في: [packages/runtime/src/metadataGeneration/tsoa.ts:34](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/metadataGeneration/tsoa.ts#L34)

#### البارامترات

##### key

`string`

##### params?

`Record`\<`string`, `unknown`\>

#### العودة

`string`
