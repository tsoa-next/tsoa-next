---
lastUpdated: 2026-04-20T21:59:41.313Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/runtime](../index.md) / SpecCacheHandler

# Antarmuka: SpecCacheHandler

Didefinisikan dalam: [packages/runtime/src/decorators/specPath.ts:54](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/specPath.ts#L54)

Adaptor cache yang dipakai oleh [SpecPath](../functions/SpecPath.md) untuk memoize tanggapan yang dihasilkan.

## Metode

### get()

```ts
get(context): 
  | SpecResponseValue
  | Promise<SpecResponseValue | undefined>
  | undefined;
```

Didefinisikan dalam: [packages/runtime/src/decorators/specPath.ts:55](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/specPath.ts#L55)

#### Parameter

##### context

[`SpecCacheContext`](SpecCacheContext.md)

#### Kembali

  \| [`SpecResponseValue`](../type-aliases/SpecResponseValue.md)
  \| `Promise`\<SpecResponseValue \| undefined\>
  \| `undefined`

***

### set()

```ts
set(context, value): void | Promise<void>;
```

Didefinisikan dalam: [packages/runtime/src/decorators/specPath.ts:56](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/specPath.ts#L56)

#### Parameter

##### context

[`SpecCacheContext`](SpecCacheContext.md)

##### value

`string`

#### Kembali

`void` \| `Promise`\<`void`\>
