---
sidebarDepth: 1
lastUpdated: 2026-04-17T20:53:42.041Z
---

# से उन्नयन tsoa 2.5

[Jump to the breaking changes](#breaking-changes)

> ऐतिहासिक नोट: इस गाइड में पुल अनुरोध लिंक जानबूझकर इंगित करने के लिए [`lukeautry/tsoa`](https://github.com/lukeautry/tsoa)जहां ये परिवर्तन मूल रूप से उतरे थे।

## नई सुविधाएँ

### प्रकार aliases के लिए समर्थन

यह रिलीज टाइप एलिया परिभाषाओं के लिए उचित समर्थन के साथ आता है।

वे सरल परिदृश्य से रेंज कर सकते हैं

```ts
/**
 * A Word shall be a non-empty string
 * @minLength 1
 */
type Word = string
```

अधिक जटिल परिदृश्यों जैसे संघों और विषमताओं के चौराहे

```ts
type IntersectionAlias = { value1: string; value2: string } & TypeAliasModel1

// or
type OneOrTwo = TypeAliasModel1 | TypeAliasModel2
```

या यहां तक कि सामान्य प्रकार के उपनाम:

```ts
type GenericAlias<T> = T | string
type ForwardGenericAlias<T, U> = GenericAlias<U> | T
```

कृपया ध्यान दें कि इसका मतलब यह है कि tsoa न केवल विनिर्देश उत्पन्न करता है ()OpenAPI v3 और Swagger2\*), लेकिन यह भी jsDoc annotations सहित प्रकार के खिलाफ इनपुट मान्य होगा।

* कुछ परिदृश्य हो सकते हैं जहां हम उत्पन्न नहीं कर सकते हैं Swagger 2 TypeScript, tsoa आप किसी भी मुद्दे के बारे में सूचित करने के लिए चेतावनी लॉग इन करेंगे।

### मानचित्रित प्रकारों के लिए समर्थन

> TypeScript 2.1 मैप्ड प्रकार पेश किया गया, टाइप सिस्टम के लिए एक शक्तिशाली जोड़। संक्षेप में, मैप किए गए प्रकार आपको संपत्ति के प्रकारों पर मैप करके मौजूदा लोगों से नए प्रकार बनाने की अनुमति देते हैं। मौजूदा प्रकार की प्रत्येक संपत्ति को एक नियम के अनुसार बदल दिया जाता है जिसे आप निर्दिष्ट करते हैं। तब रूपांतरित गुण नए प्रकार को बनाते हैं।
> \- Marius Schulz, https://mariusschulz.com/blog/mapped-types-in-typescript

tsoa अब मानचित्रित प्रकारों को हल करने के लिए ts टाइप चेकर के साथ काम करता है। हम सक्रिय रूप से सभी मामलों का समर्थन करने की कोशिश करेंगे, हालांकि अब के लिए परीक्षण सूट केवल उपयोगिता मैप्ड टाइपस्क्रिप्ट जहाजों को शामिल करता है, जैसे:

```ts
/**
 * Make all properties in T optional
 */
type Partial<T> = {
  [P in keyof T]?: T[P]
}

/**
 * Make all properties in T required
 */
type Required<T> = {
  [P in keyof T]-?: T[P]
}

/**
 * Make all properties in T readonly
 */
type Readonly<T> = {
  readonly [P in keyof T]: T[P]
}

/**
 * From T, pick a set of properties whose keys are in the union K
 */
type Pick<T, K extends keyof T> = {
  [P in K]: T[P]
}
```

### सशर्त प्रकार के लिए समर्थन

संस्करण 2.8 के रूप में TypeScript सशर्त प्रकार का समर्थन करता है। वाक्यविन्यास टर्नरी ऑपरेटर के बहुत करीब है और एक शर्त के आधार पर 2 (या अधिक) विभिन्न प्रकारों की अभिव्यक्ति को सक्षम बनाता है। कृपया देखें [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/advanced-types.html#conditional-types) विवरण के लिए।

```ts
type Diff<T, U> = T extends U ? never : T // Remove types from T that are assignable to U
```

tsoa अब ts टाइप चेकर के साथ मिलकर कंडीशनल प्रकारों को हल करने के लिए काम करता है। हम सक्रिय रूप से अधिकांश मामलों का समर्थन करने की कोशिश करेंगे, हालांकि अब के लिए परीक्षण सूट केवल उपयोगिता प्रकार के टाइपस्क्रिप्ट जहाजों को शामिल करता है, जैसे:

```ts
/**
 * Exclude from T those types that are assignable to U
 */
type Exclude<T, U> = T extends U ? never : T

/**
 * Extract from T those types that are assignable to U
 */
type Extract<T, U> = T extends U ? T : never

/**
 * Exclude null and undefined from T
 */
type NonNullable<T> = T extends null | undefined ? never : T
```

### संयोजन और उपयोगिता प्रकार के लिए समर्थन

मैप्ड और सशर्त प्रकारों का संयोजन शक्तिशाली उपयोगिता प्रकारों की तरह अनुमति देता है `Omit` प्रकार।

```
/**
 * Construct a type with the properties of T except for those in type K.
 */
type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
```

### समर्थन `Record<>` [\#662](https://github.com/lukeautry/tsoa/pull/662) (a)[Eywek](https://github.com/Eywek))

### एनम: देखें [\#594](https://github.com/lukeautry/tsoa/pull/594) कल्पना के लिए और [\#599](https://github.com/lukeautry/tsoa/pull/599) और [\#593](https://github.com/lukeautry/tsoa/pull/593)

### Null Keyword: देखें [\#601](https://github.com/lukeautry/tsoa/pull/601)

### पथ में कंगन के बजाय एक उपनिवेशक का उपयोग करने की क्षमता [\#602](https://github.com/lukeautry/tsoa/pull/602)(a)[itamarco](https://github.com/itamarco))

### मापदंडों / गुणों के लिए @example समर्थन जोड़ा गया [\#616](https://github.com/lukeautry/tsoa/pull/616) (a)[jfrconley](https://github.com/jfrconley))

### feat: वर्ग के तरीकों को अनदेखा [\#643](https://github.com/lukeautry/tsoa/pull/643) (a)[Eywek](https://github.com/Eywek))

### feat: संभाल enum सदस्यों [\#656](https://github.com/lukeautry/tsoa/pull/656) (a)[Eywek](https://github.com/Eywek))

### संभाल अनुक्रमित प्रकार [\#636](https://github.com/lukeautry/tsoa/pull/636) (a)[Eywek](https://github.com/Eywek))

### संभालना `typeof` [\#635](https://github.com/lukeautry/tsoa/pull/635) (a)[Eywek](https://github.com/Eywek))

### `@format` प्रकार aliases के लिए समर्थन [\#620](https://github.com/lukeautry/tsoa/pull/620) (a)[jfrconley](https://github.com/jfrconley))

## बग फिक्स

- सही ढंग से मान्य फ़ील्ड नाम का प्रचार करें आदर्श [@fantapop](https://github.com/fantapop)

- Aliased void एपीआई रिस्पांस प्रकार दस्तावेज़ 200 प्रतिक्रिया के बजाय 204 [\#629](https://github.com/lukeautry/tsoa/pull/629) (a)[WoH](https://github.com/WoH))

- मान्य त्रुटि को बढ़ाना चाहिए [\#661](https://github.com/lukeautry/tsoa/pull/661) (a)[aldenquimby](https://github.com/aldenquimby))

- @koa/router के लिए koa-router अपग्रेड करें, टाइप त्रुटियों को ठीक करें [\#646](https://github.com/lukeautry/tsoa/pull/646) (a)[michaelbeaumont](https://github.com/michaelbeaumont))
- ऑब्जेक्ट प्रकार निकालें [\#642](https://github.com/lukeautry/tsoa/pull/642) (a)[dimitor115](https://github.com/dimitor115))
- मॉडल परिभाषा के लिए स्थैतिक गुण जोड़ने को ठीक करें [\#639](https://github.com/lukeautry/tsoa/pull/639) (a)[dimitor115](https://github.com/dimitor115))

## ब्रेकिंग परिवर्तन

### Null बनाम अपरिभाषित

जब तक आप स्वीकार करने के लिए एक प्रकार की घोषणा नहीं करते `null`अब हम आपके वैकल्पिक गुणों को चिह्नित नहीं करेंगे `nullable: true` या `x-nullable: true`।
यह सत्यापन के लिए लागू होता है, इसलिए भेजने के दौरान `null` भेजने के बजाय `undefined` किसी वस्तु पर कोई गुण ठीक नहीं था, अब यह कोई और नहीं है।
भेजना `undefined` इसके बजाय, यानी `string | null` यह भी सत्यापन द्वारा अस्वीकार कर दिया गया है।

### नामकरण

प्रकार के उपनामों का समर्थन करने और नाम के संघर्ष से बचने के लिए, उत्पन्न घटक स्कीमा / परिभाषाओं के नाम बदल सकते हैं (सामान्य इंटरफेस ज्यादातर प्रभावित होते हैं)।
यदि आप घटक नामों पर भरोसा करते हैं तो इससे उत्पन्न होता है। tsoa, यह एक ब्रेकिंग बदलाव है।

क्योंकि tsoa अतीत में कुछ प्रकार के उपनामों का समर्थन किया और अब अलग-अलग परिभाषाएं उत्पन्न कीं, यह आपके कोड को तोड़ सकता है।
यदि आप पर भरोसा करते हैं tsoa मुद्दों से बचने के लिए टाइप ऐलिस का समर्थन नहीं करना, यह आपके कोड को तोड़ सकता है।
सावधानी और रिपोर्ट के मुद्दों के साथ आगे बढ़ें।

### घोंसले ऑब्जेक्ट सत्यापन में सुधार

देखें [\#574](https://github.com/lukeautry/tsoa/pull/574) और [\#575](https://github.com/lukeautry/tsoa/pull/575)।
ये नहीं टूटते बदलाव, लेकिन चूंकि यह मान्यता को प्रभावित करता है, इसलिए खेद से बेहतर सुरक्षित है।

### जब कोई मेजबान परिभाषित नहीं होता तो डिफ़ॉल्ट व्यवहार बदलें:

स्पष्ट रूप से अपने मेजबान को सेट करें यदि आप पूर्ण यूआरएल चाहते हैं। यह उन लोगों के लिए एक ब्रेकिंग बदलाव है जो उपयोग कर रहे थे OpenAPI 3, लेकिन यह वास्तव में लाता है tsoa हम कैसे संभाल रहे थे के साथ समानता में `host` संपत्ति Swagger 2. पहले OpenAPI 3 उपयोगकर्ताओं को गुजरने का परिणाम मिला `null` जिसे हम सब महसूस करते थे वह अजीब था। अब omitting `host` कारण tsoa माना जाता है कि यूआरएल सापेक्ष होना चाहिए।

### .. फ़ील्ड में निकालें

जब अवैध अतिरिक्त गुणों का पता लगाया जाता है (यदि आप उपयोग कर रहे हैं) tsoa सेटिंग `additionalProperties: 'throw-on-extras'`), त्रुटि पर कुंजी एक अतिरिक्त डॉट होगा।

```js
{
  "TestModel..additionalProp: : {
    ...
  }
}
```

यह अब तय है और कुंजी है `TestModel.additionalProp`।

### इसके बजाय spec का उपयोग करें Swagger (a)`tsoa swagger` अभी भी उपलब्ध है, लेकिन अंततः इसे हटा दिया जाएगा) [\#664](https://github.com/lukeautry/tsoa/pull/664) (a)[WoH](https://github.com/WoH))

```diff
Calling the tsoa command
- tsoa swagger
+ tsoa spec

- tsoa swagger-and-routes
+ tsoa spec-and-routes

Manually calling spec generation
- await generateSwaggerSpec(swaggerConfig, routesConfig, compilerOptions, config.ignore);
+ await generateSpec(openapiConfig, compilerOptions, config.ignore);
```

tsoa.json:

```js
{
  "swagger": {}
}
```

होना

```js
{
  "spec": {}
}
```

- शीर्ष स्तर पर साझा विन्यास ले जाएँ [\#628](https://github.com/lukeautry/tsoa/pull/628) (a)[WoH](https://github.com/WoH))

विन्यास को दोहराने और बहुत सारे किनारे मामलों को संभालने के बजाय, नया विन्यास बहुत सरल है।
विन्यास सेटिंग्स, कि दोनों मार्गों और कल्पना को प्रभावित अब विन्यास वस्तु के शीर्ष स्तर पर स्थित हैं।

```json
{
  "entryFile": "./tests/fixtures/express/server.ts",
  "noImplicitAdditionalProperties": "silently-remove-extras",
  "routes": {},
  "spec": {}
}
```

इसका मतलब यह है कि आपकी सेटिंग्स अलग हैं (उदाहरण के लिए प्रविष्टि फ़ाइल), आपको कॉल करना होगा `generateRoutes()` और `generateSpec()` खुद।
ध्यान दें कि इन तरीकों में अब एक सरल विन्यास है:

```diff
-    await generateSwaggerSpec(swaggerConfig, routesConfig, compilerOptions, config.ignore);
+    await generateSpec(openapiConfig, compilerOptions, config.ignore);
```

```diff
-    await generateRoutes(routesConfig, swaggerConfig, compilerOptions, config.ignore);
+    await generateRoutes(routesConfig, compilerOptions, config.ignore);
```

प्रवेशफल और noImplicitAdditional गुण अब swagger/routes पर सेट किया जा सकता है विन्यास

इसके अलावा, NoImplicitAdditionalProperties के लिए boolean सेटिंग्स को हटा दिया गया है: #503
वैध सेटिंग्स अब हैं: `'throw-on-extras' | 'silently-remove-extras' | 'ignore'`सब कुछ वापस आता है `'ignore'`।

** संदर्भ के लिए, पूरे विन्यास के टीएस इंटरफेस को देखें [here](./reference/tsoa-next/interfaces/Config.md)**

### TypeScript अब संघों को लागू किया गया है `anyOf` में OpenAPI [\#671](https://github.com/tsoa-next/tsoa-next/issues/671)
