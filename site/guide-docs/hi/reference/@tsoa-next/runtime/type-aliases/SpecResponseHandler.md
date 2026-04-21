---
lastUpdated: 2026-04-20T21:59:41.328Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/runtime](../index.md) / SpecResponseHandler

# प्रकार उपनाम: SpecResponseHandler

```ts
type SpecResponseHandler = (context) => 
  | SpecResponseValue
| Promise<SpecResponseValue>;
```

में परिभाषित: [packages/runtime/src/decorators/specPath.ts:49](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/specPath.ts#L49)

कस्टम हैंडलर द्वारा इस्तेमाल किया [SpecPath](../functions/SpecPath.md) कल्पना सामग्री की सेवा करने के लिए।

## पैरामीटर

### context

[`SpecRequestContext`](../interfaces/SpecRequestContext.md)

## रिटर्न

  \| [`SpecResponseValue`](SpecResponseValue.md)
  \| `Promise`\<[`SpecResponseValue`](SpecResponseValue.md)\>
