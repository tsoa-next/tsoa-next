---
lastUpdated: 2026-04-20T21:59:41.313Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/runtime](../index.md) / IocContainer

# ইন্টারফেস:

নির্ধারিত মান: [packages/runtime/src/interfaces/iocModule.ts:8](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/iocModule.ts#L8)

হরলিন কন্টেইনার কনফিগারেশন কন্ট্রোল প্যাকের জন্য ব্যবহৃত হয়।

## পদ্ধতি

### get()

#### কল স্বাক্ষর

```ts
get<T>(controller): T;
```

নির্ধারিত মান: [packages/runtime/src/interfaces/iocModule.ts:9](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/iocModule.ts#L9)

##### পরামিতির পরামিতি

###### T

`T`

##### পরামিতি

###### controller

[`ServiceIdentifier`](../type-aliases/ServiceIdentifier.md)\<`T`\>

##### প্রাপ্ত মান

`T`

#### কল স্বাক্ষর

```ts
get<T>(controller): Promise<T>;
```

নির্ধারিত মান: [packages/runtime/src/interfaces/iocModule.ts:10](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/iocModule.ts#L10)

##### পরামিতির পরামিতি

###### T

`T`

##### পরামিতি

###### controller

[`ServiceIdentifier`](../type-aliases/ServiceIdentifier.md)\<`T`\>

##### প্রাপ্ত মান

`Promise`\<`T`\>
