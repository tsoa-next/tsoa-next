---
lastUpdated: 2026-04-20T21:59:41.360Z
---
[tsoa-next](../../../../packages.md) / [tsoa-next](../../../index.md) / [Tsoa](../index.md) / ValidationContext

# ইন্টারফেস:Auttext

নির্ধারিত মান: [packages/runtime/src/metadataGeneration/tsoa.ts:32](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/metadataGeneration/tsoa.ts#L32)

## বৈশিষ্ট্য

### errorFormatter?

```ts
optional errorFormatter?: (failure) => ValidationFailure;
```

নির্ধারিত মান: [packages/runtime/src/metadataGeneration/tsoa.ts:35](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/metadataGeneration/tsoa.ts#L35)

#### পরামিতি

##### failure

[`ValidationFailure`](ValidationFailure.md)

#### প্রাপ্ত মান

[`ValidationFailure`](ValidationFailure.md)

***

### locale?

```ts
optional locale?: string;
```

নির্ধারিত মান: [packages/runtime/src/metadataGeneration/tsoa.ts:33](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/metadataGeneration/tsoa.ts#L33)

***

### translate?

```ts
optional translate?: (key, params?) => string;
```

নির্ধারিত মান: [packages/runtime/src/metadataGeneration/tsoa.ts:34](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/metadataGeneration/tsoa.ts#L34)

#### পরামিতি

##### key

`string`

##### params?

`Record`\<`string`, `unknown`\>

#### প্রাপ্ত মান

`string`
