---
lastUpdated: 2026-04-20T21:59:41.309Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/runtime](../index.md) / Middlewares

# ফাংশন: মিডলs

```ts
function Middlewares<T>(...mws): ClassDecorator & MethodDecorator;
```

নির্ধারিত মান: [packages/runtime/src/decorators/middlewares.ts:41](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/middlewares.ts#L41)

একটি বা একাধিক ট্রেইনার কন্ট্রোলার যোগ করে বা কাজ করে।

## পরামিতির পরামিতি

### T

`T` * xends * `object` \ যত দূরে `CallableFunction`

## পরামিতি

### mws

...`T`[]

ইনস্টল করার জন্য মাঝখানের ফাংশন অথবা মধ্যবর্তী উপাদানের সংখ্যা ।

## প্রাপ্ত মান

`ClassDecorator` & `MethodDecorator`
