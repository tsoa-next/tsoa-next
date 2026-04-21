---
lastUpdated: 2026-04-20T21:59:41.313Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/runtime](../index.md) / RoutesConfig

# इंटरफ़ेस: RoutesConfig

में परिभाषित: [packages/runtime/src/config.ts:235](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L235)

## गुण

### authenticationModule?

```ts
optional authenticationModule?: string;
```

में परिभाषित: [packages/runtime/src/config.ts:274](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L274)

प्रमाणीकरण मॉड्यूल पथ उत्पन्न मार्गों द्वारा इस्तेमाल किया।

***

### basePath?

```ts
optional basePath?: string;
```

में परिभाषित: [packages/runtime/src/config.ts:254](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L254)

बेस एपीआई पथ; उदाहरण के लिए '/ v1' में https://myapi.com/v1

***

### bodyCoercion?

```ts
optional bodyCoercion?: boolean;
```

में परिभाषित: [packages/runtime/src/config.ts:288](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L288)

क्या वास्तव में एक स्वीकृत प्रकार में शरीर के मापदंडों को एकजुट करना है।

#### Default

```ts
true
```

***

### esm?

```ts
optional esm?: boolean;
```

में परिभाषित: [packages/runtime/src/config.ts:281](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L281)

जब सक्षम, उत्पन्न रूट आयात उपयोग `.js` ESM आउटपुट के लिए एक्सटेंशन।

#### Default

```ts
false
```

***

### iocModule?

```ts
optional iocModule?: string;
```

में परिभाषित: [packages/runtime/src/config.ts:269](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L269)

उदाहरण के लिए, IoC मॉड्यूल पथ `./inversify/ioc`।

***

### middleware?

```ts
optional middleware?: "express" | "hapi" | "koa";
```

में परिभाषित: [packages/runtime/src/config.ts:259](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L259)

मिडलवेयर प्रदाता।

***

### middlewareTemplate?

```ts
optional middlewareTemplate?: string;
```

में परिभाषित: [packages/runtime/src/config.ts:264](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L264)

कस्टम Handlebars टेम्पलेट पथ का उपयोग अंतर्निहित मिडलवेयर टेम्पलेट के बजाय किया जाता है।

***

### noWriteIfUnchanged?

```ts
optional noWriteIfUnchanged?: boolean;
```

में परिभाषित: [packages/runtime/src/config.ts:249](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L249)

जब उत्पन्न हुई सामग्री मौजूदा फ़ाइल से मेल खाती है तो रूट फ़ाइल लिखने के लिए छोड़ देता है।

***

### rewriteRelativeImportExtensions?

```ts
optional rewriteRelativeImportExtensions?: boolean;
```

में परिभाषित: [packages/runtime/src/config.ts:295](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L295)

जब सक्षम हो जाता है, तो रूट आयात जारी रहता है `.ts` समर्थन करने के लिए एक्सटेंशन TypeScript 5.75 `rewriteRelativeImportExtensions`।

#### Default

```ts
false
```

***

### routesDir

```ts
routesDir: string;
```

में परिभाषित: [packages/runtime/src/config.ts:239](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L239)

निर्देशिका जहां उत्पन्न रूट फ़ाइलों को लिखा जाता है।

***

### routesFileName?

```ts
optional routesFileName?: string;
```

में परिभाषित: [packages/runtime/src/config.ts:244](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L244)

उत्पन्न रूट मॉड्यूल के लिए फ़ाइल नाम।
