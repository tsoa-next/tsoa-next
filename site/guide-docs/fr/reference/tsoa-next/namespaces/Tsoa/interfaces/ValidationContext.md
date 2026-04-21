---
lastUpdated: 2026-04-20T21:59:41.360Z
---
[tsoa-next](../../../../packages.md) / [tsoa-next](../../../index.md) / [Tsoa](../index.md) / ValidationContext

# Interface: ValidationContext

Définie dans : [packages/runtime/src/metadataGeneration/tsoa.ts:32](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/metadataGeneration/tsoa.ts#L32)

## Propriétés

### errorFormatter?

```ts
optional errorFormatter?: (failure) => ValidationFailure;
```

Définie dans : [packages/runtime/src/metadataGeneration/tsoa.ts:35](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/metadataGeneration/tsoa.ts#L35)

#### Paramètres

##### failure

[`ValidationFailure`](ValidationFailure.md)

#### Retourne

[`ValidationFailure`](ValidationFailure.md)

***

### locale?

```ts
optional locale?: string;
```

Définie dans : [packages/runtime/src/metadataGeneration/tsoa.ts:33](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/metadataGeneration/tsoa.ts#L33)

***

### translate?

```ts
optional translate?: (key, params?) => string;
```

Définie dans : [packages/runtime/src/metadataGeneration/tsoa.ts:34](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/metadataGeneration/tsoa.ts#L34)

#### Paramètres

##### key

`string`

##### params?

`Record`\<`string`, `unknown`\>

#### Retourne

`string`
