---
lastUpdated: 2026-04-20T21:59:41.328Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/runtime](../index.md) / SpecPathGateHandler

# प्रकार उपनाम: SpecPathGateHandler

```ts
type SpecPathGateHandler = (context) => boolean | Promise<boolean>;
```

में परिभाषित: [packages/runtime/src/decorators/specPath.ts:51](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/specPath.ts#L51)

गेट हैंडलर द्वारा इस्तेमाल किया [SpecPath](../functions/SpecPath.md) यह तय करने के लिए कि क्या कोई अनुरोध कल्पना प्रतिक्रिया प्राप्त कर सकता है।

## पैरामीटर

### context

[`SpecRequestContext`](../interfaces/SpecRequestContext.md)

## रिटर्न

`boolean` \| `Promise`\<`boolean`\>
