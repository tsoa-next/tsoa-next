---
lastUpdated: 2026-04-20T21:59:41.313Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/runtime](../index.md) / SpecCacheHandler

# ইন্টারফেস: স্পেকসিচেন্ডার

নির্ধারিত মান: [packages/runtime/src/decorators/specPath.ts:54](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/specPath.ts#L54)

ক্যাশে অ্যাডাপ্টার দ্বারা ব্যবহৃত [SpecPath](../functions/SpecPath.md) তার প্রতিক্রিয়া জানানোর জন্য _BAR_

## পদ্ধতি

### get()

```ts
get(context): 
  | SpecResponseValue
  | Promise<SpecResponseValue | undefined>
  | undefined;
```

নির্ধারিত মান: [packages/runtime/src/decorators/specPath.ts:55](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/specPath.ts#L55)

#### পরামিতি

##### context

[`SpecCacheContext`](SpecCacheContext.md)

#### প্রাপ্ত মান

  \| [`SpecResponseValue`](../type-aliases/SpecResponseValue.md)
  \| `Promise`\<SpecResponseValue \| undefined\>
  \| `undefined`

***

### set()

```ts
set(context, value): void | Promise<void>;
```

নির্ধারিত মান: [packages/runtime/src/decorators/specPath.ts:56](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/specPath.ts#L56)

#### পরামিতি

##### context

[`SpecCacheContext`](SpecCacheContext.md)

##### value

`string`

#### প্রাপ্ত মান

`void` \| `Promise`\<`void`\>
