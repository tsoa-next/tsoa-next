---
lastUpdated: 2026-04-20T21:59:41.324Z
---
[tsoa-next](../../../../../packages.md) / [@tsoa-next/runtime](../../../index.md) / [Tsoa](../index.md) / ValidationContext

# Interfaz: ValidaciónContext

Definido en: [packages/runtime/src/metadataGeneration/tsoa.ts:32](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/metadataGeneration/tsoa.ts#L32)

## Propiedades

### errorFormatter?

```ts
optional errorFormatter?: (failure) => ValidationFailure;
```

Definido en: [packages/runtime/src/metadataGeneration/tsoa.ts:35](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/metadataGeneration/tsoa.ts#L35)

#### Parámetros

##### failure

[`ValidationFailure`](ValidationFailure.md)

#### Devoluciones

[`ValidationFailure`](ValidationFailure.md)

***

### locale?

```ts
optional locale?: string;
```

Definido en: [packages/runtime/src/metadataGeneration/tsoa.ts:33](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/metadataGeneration/tsoa.ts#L33)

***

### translate?

```ts
optional translate?: (key, params?) => string;
```

Definido en: [packages/runtime/src/metadataGeneration/tsoa.ts:34](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/metadataGeneration/tsoa.ts#L34)

#### Parámetros

##### key

`string`

##### params?

`Record`\<`string`, `unknown`\>

#### Devoluciones

`string`
