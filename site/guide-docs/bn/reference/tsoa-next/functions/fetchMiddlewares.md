---
lastUpdated: 2026-04-20T21:59:41.342Z
---
[tsoa-next](../../packages.md) / [tsoa-next](../index.md) / fetchMiddlewares

# ফাংশন: markers প্রাপ্ত করতে ব্যর্থ

```ts
function fetchMiddlewares<T>(target): T[];
```

নির্ধারিত মান: [packages/runtime/src/decorators/middlewares.ts:55](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/middlewares.ts#L55)

ব্যাক- আপ মিটা-ডাটা সহ মধ্যবর্তী মেটাডাটা ফেরত দেওয়া হবে [Middlewares](Middlewares.md). .

## পরামিতির পরামিতি

### T

`T` * xends * `object` \ যত দূরে `CallableFunction`

## পরামিতি

### target

`MiddlewareTarget`

পরীক্ষা করে দেখার জন্য কন্ট্রোল ক্লাস বা পদ্ধতি পদ্ধতি ব্যবহার করে।

## প্রাপ্ত মান

`T`[]
