---
lastUpdated: 2026-04-20T21:59:41.341Z
---
[tsoa-next](../../packages.md) / [tsoa-next](../index.md) / SpecPath

# समारोह: SpecPath()

```ts
function SpecPath(
   path?, 
   optionsOrTarget?, 
   cache?): ClassDecorator;
```

में परिभाषित: [packages/runtime/src/decorators/specPath.ts:157](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/specPath.ts#L157)

एक नियंत्रक स्थानीय मार्ग है कि उत्पन्न सेवा करता है रजिस्टर OpenAPI दस्तावेज़ या एक कस्टम व्युत्पन्न प्रतिक्रिया।

## पैरामीटर

### path?

`string`

सापेक्ष मार्ग पथ। डिफ़ॉल्ट करने के लिए `spec`।

### optionsOrTarget?

  \| [`SpecPathTarget`](../type-aliases/SpecPathTarget.md)
  \| [`SpecPathOptions`](../interfaces/SpecPathOptions.md)

न तो `SpecPathOptions` वस्तु या विरासत लक्ष्य तर्क।

### cache?

[`SpecPathCache`](../type-aliases/SpecPathCache.md)

लीगेसी कैश रणनीति तर्क। इन-मेमोरी कैशिंग के लिए डिफ़ॉल्ट।

## रिटर्न

`ClassDecorator`
