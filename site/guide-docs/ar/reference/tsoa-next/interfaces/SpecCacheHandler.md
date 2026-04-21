---
lastUpdated: 2026-04-20T21:59:41.345Z
---
[tsoa-next](../../packages.md) / [tsoa-next](../index.md) / SpecCacheHandler

# Interface: SpecCacheHandler

محددة في: [packages/runtime/src/decorators/specPath.ts:54](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/specPath.ts#L54)

Cache adapter used by [SpecPath](../functions/SpecPath.md) لتذكير الاستجابات المتولدة.

## الطرائق

### get()

```ts
get(context): 
  | SpecResponseValue
  | Promise<SpecResponseValue | undefined>
  | undefined;
```

محددة في: [packages/runtime/src/decorators/specPath.ts:55](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/specPath.ts#L55)

#### البارامترات

##### context

[`SpecCacheContext`](SpecCacheContext.md)

#### العودة

  \| [`SpecResponseValue`](../type-aliases/SpecResponseValue.md)
  \| `Promise`\<SpecResponseValue \| undefined\>
  \| `undefined`

***

### set()

```ts
set(context, value): void | Promise<void>;
```

محددة في: [packages/runtime/src/decorators/specPath.ts:56](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/specPath.ts#L56)

#### البارامترات

##### context

[`SpecCacheContext`](SpecCacheContext.md)

##### value

`string`

#### العودة

`void` \| `Promise`\<`void`\>
