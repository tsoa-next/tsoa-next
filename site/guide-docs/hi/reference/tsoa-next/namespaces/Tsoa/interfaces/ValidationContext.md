---
lastUpdated: 2026-04-20T21:59:41.360Z
---
[tsoa-next](../../../../packages.md) / [tsoa-next](../../../index.md) / [Tsoa](../index.md) / ValidationContext

# इंटरफ़ेस: सत्यापनContext

में परिभाषित: [packages/runtime/src/metadataGeneration/tsoa.ts:32](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/metadataGeneration/tsoa.ts#L32)

## गुण

### errorFormatter?

```ts
optional errorFormatter?: (failure) => ValidationFailure;
```

में परिभाषित: [packages/runtime/src/metadataGeneration/tsoa.ts:35](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/metadataGeneration/tsoa.ts#L35)

#### पैरामीटर

##### failure

[`ValidationFailure`](ValidationFailure.md)

#### रिटर्न

[`ValidationFailure`](ValidationFailure.md)

***

### locale?

```ts
optional locale?: string;
```

में परिभाषित: [packages/runtime/src/metadataGeneration/tsoa.ts:33](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/metadataGeneration/tsoa.ts#L33)

***

### translate?

```ts
optional translate?: (key, params?) => string;
```

में परिभाषित: [packages/runtime/src/metadataGeneration/tsoa.ts:34](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/metadataGeneration/tsoa.ts#L34)

#### पैरामीटर

##### key

`string`

##### params?

`Record`\<`string`, `unknown`\>

#### रिटर्न

`string`
