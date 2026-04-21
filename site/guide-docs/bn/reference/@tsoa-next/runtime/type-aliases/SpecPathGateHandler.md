---
lastUpdated: 2026-04-20T21:59:41.328Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/runtime](../index.md) / SpecPathGateHandler

# ধরন: Spechther

```ts
type SpecPathGateHandler = (context) => boolean | Promise<boolean>;
```

নির্ধারিত মান: [packages/runtime/src/decorators/specPath.ts:51](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/specPath.ts#L51)

গেট হ্যান্ডলার দ্বারা ব্যবহৃত [SpecPath](../functions/SpecPath.md) কোন অনুরোধের উত্তর পেতে পারে কিনা তা নির্ধারণ করুন।

## পরামিতি

### context

[`SpecRequestContext`](../interfaces/SpecRequestContext.md)

## প্রাপ্ত মান

`boolean` \| `Promise`\<`boolean`\>
