---
lastUpdated: 2026-04-20T21:59:41.345Z
---
[tsoa-next](../../packages.md) / [tsoa-next](../index.md) / SpecConfig

# इंटरफ़ेस: SpecConfig

में परिभाषित: [packages/runtime/src/config.ts:79](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L79)

OpenAPI उत्पादन सेटिंग्स।

## गुण

### basePath?

```ts
optional basePath?: string;
```

में परिभाषित: [packages/runtime/src/config.ts:163](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L163)

बेस एपीआई पथ; उदाहरण के लिए 'v1' में https://myapi.com/v1

***

### contact?

```ts
optional contact?: object;
```

में परिभाषित: [packages/runtime/src/config.ts:135](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L135)

प्रकाशित एपीआई के लिए संपर्क जानकारी।

#### email?

```ts
optional email?: string;
```

संपर्क व्यक्ति/संगठन का ईमेल पता।

##### Default

```ts
npm package author email
```

#### name?

```ts
optional name?: string;
```

संपर्क व्यक्ति / संगठन के नाम की पहचान करना।

##### Default

```ts
npm package author
```

#### url?

```ts
optional url?: string;
```

यूआरएल संपर्क जानकारी को इंगित करता है।

##### Default

```ts
npm package author url
```

***

### description?

```ts
optional description?: string;
```

में परिभाषित: [packages/runtime/src/config.ts:124](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L124)

एपीआई विवरण; डिफ़ॉल्ट करने के लिए npm पैकेज विवरण

***

### disableBasePathPrefixSlash?

```ts
optional disableBasePathPrefixSlash?: boolean;
```

में परिभाषित: [packages/runtime/src/config.ts:170](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L170)

नियंत्रण `basePath` के साथ prefixed है `/` जब रचना OpenAPI 3 सर्वर यूआरएल।

केवल कल्पना संस्करण 3 या 3.1 के साथ उपलब्ध है।

***

### host?

```ts
optional host?: string;
```

में परिभाषित: [packages/runtime/src/config.ts:88](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L88)

एपीआई होस्ट का नाम Swagger उदाहरण के लिए, 2 आउटपुट `localhost:3000`।

***

### license?

```ts
optional license?: string;
```

में परिभाषित: [packages/runtime/src/config.ts:158](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L158)

एपीआई लाइसेंस; डिफ़ॉल्ट to npm प्रस्तुत करते समय पैकेज लाइसेंस

***

### name?

```ts
optional name?: string;
```

में परिभाषित: [packages/runtime/src/config.ts:119](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L119)

एपीआई नाम; डिफ़ॉल्ट करने के लिए npm पैकेज का नाम

***

### operationIdTemplate?

```ts
optional operationIdTemplate?: string;
```

में परिभाषित: [packages/runtime/src/config.ts:197](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L197)

संचालन आईडी उत्पन्न करने के लिए टेम्पलेट स्ट्रिंग।
यह एक वैध हैंडलबार टेम्पलेट होना चाहिए और प्रदान किया जाता है
निम्नलिखित संदर्भ के साथ:
  - नियंत्रक नाम' - नियंत्रक वर्ग का स्ट्रिंग नाम।
  - 'method' - Tsoa। विधि वस्तु।

#### Default

```ts
'{{titleCase method.name}}'
```

***

### outputDirectory

```ts
outputDirectory: string;
```

में परिभाषित: [packages/runtime/src/config.ts:83](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L83)

निर्देशिका जहां उत्पन्न कल्पना फ़ाइल लिखा जाना चाहिए।

***

### rootSecurity?

```ts
optional rootSecurity?: Security[];
```

में परिभाषित: [packages/runtime/src/config.ts:232](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L232)

पूरे एपीआई को डिफ़ॉल्ट सुरक्षा प्रदान करता है।
ओवरराइड किया जा सकता है `@Security(...)` या `@NoSecurity()` नियंत्रकों या विधियों पर सजावटकर्ता।

***

### schemes?

```ts
optional schemes?: Protocol[];
```

में परिभाषित: [packages/runtime/src/config.ts:215](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L215)

समर्थित प्रोटोकॉल Swagger 2 आउटपुट।

***

### securityDefinitions?

```ts
optional securityDefinitions?: object;
```

में परिभाषित: [packages/runtime/src/config.ts:202](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L202)

विनिर्देशन के लिए घोषित सुरक्षा योजनाएं।

#### सूचकांक हस्ताक्षर

```ts
[name: string]: SecuritySchemes
```

***

### servers?

```ts
optional servers?: string[];
```

में परिभाषित: [packages/runtime/src/config.ts:95](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L95)

सर्वर यूआरएल के लिए OpenAPI 3 आउटपुट।

केवल कल्पना संस्करण 3 या 3.1 के साथ उपलब्ध है।

***

### spec?

```ts
optional spec?: unknown;
```

में परिभाषित: [packages/runtime/src/config.ts:176](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L176)

ऑब्जेक्ट उत्पन्न स्पेक में विलय हो गया।
उत्पन्न गुण हमेशा यहां दिए गए मूल्यों पर प्राथमिकता लेते हैं।

***

### specFileBaseName?

```ts
optional specFileBaseName?: string;
```

में परिभाषित: [packages/runtime/src/config.ts:102](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L102)

स्वैगर का आधार नाम। जेसन या स्वैगर। yaml.

@default: "swagger"

***

### specMerging?

```ts
optional specMerging?: "recursive" | "immediate" | "deepmerge";
```

में परिभाषित: [packages/runtime/src/config.ts:186](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L186)

कैसे नियंत्रित करें `spec` उत्पन्न दस्तावेज़ में विलय हो जाता है।
संभव मान:
 - 'immediate' केवल शीर्ष स्तर तत्वों को ओवरराइड करता है।
 - 'recursive' एक गहरी विलय का उपयोग करता है `merge`।
 - 'deepmerge' एक गहरी विलय का उपयोग करता है `ts-deepmerge`, सरणी सहित।

#### Default

```ts
'immediate'
```

***

### specVersion?

```ts
optional specVersion?: SupportedSpecMajorVersion;
```

में परिभाषित: [packages/runtime/src/config.ts:114](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L114)

प्रमुख OpenAPI उत्पन्न करने के लिए संस्करण; जब निर्दिष्ट नहीं किया गया तो संस्करण 2 में डिफ़ॉल्ट
संभव मान:
 - 2: उत्पन्न करना OpenAPI संस्करण 2.
 - 3: उत्पन्न OpenAPI संस्करण 3.
 - 3.1: उत्पन्न OpenAPI संस्करण 3.1.

***

### tags?

```ts
optional tags?: Tag[];
```

में परिभाषित: [packages/runtime/src/config.ts:209](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L209)

उत्पन्न विनिर्देश के लिए शीर्ष स्तर के टैग मेटाडाटा।

***

### termsOfService?

```ts
optional termsOfService?: string;
```

में परिभाषित: [packages/runtime/src/config.ts:130](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L130)

उस पृष्ठ से लिंक करें जो सेवा की शर्तों का वर्णन करता है।
यूआरएल प्रारूप में होना चाहिए।

***

### useTitleTagsForInlineObjects?

```ts
optional useTitleTagsForInlineObjects?: boolean;
```

में परिभाषित: [packages/runtime/src/config.ts:226](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L226)

क्लाइंट जनरेशन में सुधार के लिए इनलाइन प्रतिक्रिया और अनुरोध-बॉडी ऑब्जेक्ट स्कीमा के लिए शीर्षक जोड़ता है।

***

### version?

```ts
optional version?: string;
```

में परिभाषित: [packages/runtime/src/config.ts:105](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L105)

एपीआई संस्करण संख्या; पैकेज संस्करण के लिए डिफ़ॉल्ट।

***

### xEnumVarnames?

```ts
optional xEnumVarnames?: boolean;
```

में परिभाषित: [packages/runtime/src/config.ts:221](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L221)

X-enum-varname समर्थन सक्षम करें

#### Default

```ts
false
```

***

### yaml?

```ts
optional yaml?: boolean;
```

में परिभाषित: [packages/runtime/src/config.ts:212](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L212)

JSON के बजाय YAML के रूप में उत्पन्न ऐनक को लिखते हैं।
