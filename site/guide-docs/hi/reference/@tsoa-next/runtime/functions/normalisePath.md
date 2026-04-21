---
lastUpdated: 2026-04-20T21:59:41.312Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/runtime](../index.md) / normalisePath

# समारोह: NormalisePath()

```ts
function normalisePath(
   path, 
   withPrefix?, 
   withSuffix?, 
   skipPrefixAndSuffixIfEmpty?): string;
```

में परिभाषित: [packages/runtime/src/utils/pathUtils.ts:43](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/utils/pathUtils.ts#L43)

एक मार्ग पथ में स्लैश उपयोग को सामान्यीकृत करता है और वैकल्पिक रूप से एक उपसर्ग और प्रत्यय लागू करता है।

## पैरामीटर

### path

`string`

### withPrefix?

`string`

### withSuffix?

`string`

### skipPrefixAndSuffixIfEmpty?

`boolean` = `true`

## रिटर्न

`string`
