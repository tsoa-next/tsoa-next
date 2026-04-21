---
lastUpdated: 2026-04-20T21:59:41.345Z
---
[tsoa-next](../../packages.md) / [tsoa-next](../index.md) / SpecGenerator

# ইন্টারফেস: SpeGen অপারেটর

নির্ধারিত মান: [packages/runtime/src/decorators/specPath.ts:24](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/specPath.ts#L24)

[ ৬ পৃষ্ঠার ব্লার্ব] OpenAPI দাবির ব্যাপারে নথিবদ্ধ।

## পদ্ধতি

### getSpecObject()

```ts
getSpecObject(): Promise<Spec>;
```

নির্ধারিত মান: [packages/runtime/src/decorators/specPath.ts:25](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/specPath.ts#L25)

#### প্রাপ্ত মান

`Promise`\<[`Spec`](../namespaces/Swagger/interfaces/Spec.md)\>

***

### getSpecString()

```ts
getSpecString(format): Promise<string>;
```

নির্ধারিত মান: [packages/runtime/src/decorators/specPath.ts:26](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/specPath.ts#L26)

#### পরামিতি

##### format

[`SpecDocumentFormat`](../type-aliases/SpecDocumentFormat.md)

#### প্রাপ্ত মান

`Promise`\<`string`\>
