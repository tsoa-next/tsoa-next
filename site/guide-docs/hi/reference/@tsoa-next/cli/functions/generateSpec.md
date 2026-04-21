---
lastUpdated: 2026-04-20T21:59:41.307Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/cli](../index.md) / generateSpec

# समारोह: जनरेटस्पेस ()

```ts
function generateSpec(
   swaggerConfig, 
   compilerOptions?, 
   ignorePaths?, 
   metadata?, 
defaultNumberType?): Promise<Metadata>;
```

में परिभाषित: [cli/src/module/generate-spec.ts:22](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/module/generate-spec.ts#L22)

उत्पन्न करना OpenAPI डिस्क पर दस्तावेज़ और इसे बनाने के लिए उपयोग किए जाने वाले मेटाडाटा को लौटा देता है।

## पैरामीटर

### swaggerConfig

[`ExtendedSpecConfig`](../interfaces/ExtendedSpecConfig.md)

### compilerOptions?

`CompilerOptions`

### ignorePaths?

`string`[]

### metadata?

`Metadata`

कैश्ड मेटाडाटा में पास करने के लिए चीजों को गति देने के लिए पिछले कदम में लौटे

### defaultNumberType?

`"double"` \| `"float"` \| `"integer"` \| `"long"`

## रिटर्न

`Promise`\<`Metadata`\>
