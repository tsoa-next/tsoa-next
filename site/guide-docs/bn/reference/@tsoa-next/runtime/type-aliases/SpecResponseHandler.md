---
lastUpdated: 2026-04-20T21:59:41.328Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/runtime](../index.md) / SpecResponseHandler

# ধরন: Specsonferার

```ts
type SpecResponseHandler = (context) => 
  | SpecResponseValue
| Promise<SpecResponseValue>;
```

নির্ধারিত মান: [packages/runtime/src/decorators/specPath.ts:49](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/specPath.ts#L49)

হ্যান্ডলার দ্বারা ব্যবহৃত স্বনির্ধারিত হ্যান্ডলার [SpecPath](../functions/SpecPath.md) তথ্যের জন্য.

## পরামিতি

### context

[`SpecRequestContext`](../interfaces/SpecRequestContext.md)

## প্রাপ্ত মান

  \| [`SpecResponseValue`](SpecResponseValue.md)
  \| `Promise`\<[`SpecResponseValue`](SpecResponseValue.md)\>
