---
lastUpdated: 2026-04-20T21:59:41.368Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/cli](../index.md) / Config

# इंटरफ़ेस: विन्यास

में परिभाषित: [packages/runtime/src/config.ts:5](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L5)

रूट tsoa-next द्वारा खपत विन्यास CLI और प्रोग्रामेटिक जनरेटर।

## गुण

### compilerOptions?

```ts
optional compilerOptions?: Record<string, unknown>;
```

में परिभाषित: [packages/runtime/src/config.ts:47](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L47)

TypeScript CompilerOptions का उपयोग पीढ़ी के दौरान किया जाना है।
ये tsconfig से हल करने वाले कम्पाइलर विकल्पों पर विलय कर रहे हैं।

***

### controllerPathGlobs?

```ts
optional controllerPathGlobs?: string[];
```

में परिभाषित: [packages/runtime/src/config.ts:29](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L29)

पथ ग्लॉब की एक सरणी जो आपके मार्ग नियंत्रकों को इंगित करती है कि आप चाहते हैं tsoa शामिल हैं।

***

### defaultNumberType?

```ts
optional defaultNumberType?: "double" | "float" | "integer" | "long";
```

में परिभाषित: [packages/runtime/src/config.ts:68](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L68)

OpenAPI उपयोग करने के लिए संख्या प्रकार TypeScript `number` जब कोई संकुचन नहीं होता है।

#### Default

```ts
double
```

***

### entryFile

```ts
entryFile: string;
```

में परिभाषित: [packages/runtime/src/config.ts:24](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L24)

अपने API में प्रवेश बिंदु

***

### ignore?

```ts
optional ignore?: string[];
```

में परिभाषित: [packages/runtime/src/config.ts:19](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L19)

निदेशकों के दौरान अनदेखी करने के लिए TypeScript मेटाडाटा स्कैन

***

### ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

```ts
optional multerOpts?: Options;
```

में परिभाषित: [packages/runtime/src/config.ts:62](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L62)

विरासत multer विकल्प उत्पन्न मध्यवेयर में अग्रेषित।
The `storage` विकल्प समर्थित नहीं है।

#### Example

```ts
{
     *   "dest": "/tmp"
     * } Allows multer to write files to disk instead of keeping them in memory.
```

#### Deprecated

V6.4.0 के बाद से `RegisterRoutes` प्राप्त कर सकते हैं `multerOptions` सीधे।
 यह विन्यास-स्तर विकल्प भविष्य में रिलीज में हटा दिया जाएगा।
 (https://github.com/tsoa-next/tsoa-next/issues/1587#issuecomment-2391291433)
 (https://github.com/tsoa-next/tsoa-next/pull/1638)

***

### noImplicitAdditionalProperties?

```ts
optional noImplicitAdditionalProperties?: "ignore" | "throw-on-extras" | "silently-remove-extras";
```

में परिभाषित: [packages/runtime/src/config.ts:34](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L34)

मोड जो आपको अपने एपीआई में प्रवेश करने से इनपुट डेटा को रोकने की अनुमति देते हैं। यह आपके निर्णय को स्वैगर में देगा। यामला और यह आपके मार्गों में अतिरिक्त-property सत्यापन ( रनटाइम पर) को बदल देगा।

***

### routes

```ts
routes: RoutesConfig;
```

में परिभाषित: [packages/runtime/src/config.ts:14](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L14)

रूट जनरेशन कॉन्फ़िगरेशन।

***

### spec

```ts
spec: SpecConfig;
```

में परिभाषित: [packages/runtime/src/config.ts:9](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L9)

OpenAPI उत्पादन विन्यास।

***

### tsconfig?

```ts
optional tsconfig?: string;
```

में परिभाषित: [packages/runtime/src/config.ts:41](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L41)

उत्पादन के दौरान कम्पाइलर विकल्पों के लिए एक इनपुट स्रोत के रूप में इस्तेमाल एक tsconfig फ़ाइल के लिए पथ।
यदि omitted, tsoa-next tsconfig.json लोड से शुरू करने के लिए देखेंगे tsoa निर्देशिका को कॉन्फ़िगर करें।
में स्पष्ट compilerOptions tsoa-next अभी भी tsconfig मूल्यों पर प्राथमिकता लेते हैं।
