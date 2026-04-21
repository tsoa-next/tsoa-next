---
lastUpdated: 2026-04-20T21:59:41.324Z
---
[tsoa-next](../../../../../packages.md) / [@tsoa-next/runtime](../../../index.md) / [Tsoa](../index.md) / ValidationContext

# Interface: ValidationContext

Definido em: [packages/runtime/src/metadataGeneration/tsoa.ts:32](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/metadataGeneration/tsoa.ts#L32)

## Propriedades

### errorFormatter?

```ts
optional errorFormatter?: (failure) => ValidationFailure;
```

Definido em: [packages/runtime/src/metadataGeneration/tsoa.ts:35](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/metadataGeneration/tsoa.ts#L35)

#### Parâmetros

##### failure

[`ValidationFailure`](ValidationFailure.md)

#### Retorna

[`ValidationFailure`](ValidationFailure.md)

***

### locale?

```ts
optional locale?: string;
```

Definido em: [packages/runtime/src/metadataGeneration/tsoa.ts:33](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/metadataGeneration/tsoa.ts#L33)

***

### translate?

```ts
optional translate?: (key, params?) => string;
```

Definido em: [packages/runtime/src/metadataGeneration/tsoa.ts:34](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/metadataGeneration/tsoa.ts#L34)

#### Parâmetros

##### key

`string`

##### params?

`Record`\<`string`, `unknown`\>

#### Retorna

`string`
