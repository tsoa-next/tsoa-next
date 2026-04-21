---
lastUpdated: 2026-04-20T21:59:41.369Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/cli](../index.md) / ExtendedRoutesConfig

# इंटरफ़ेस: विस्तारित रूट्सकॉनफिग

में परिभाषित: [cli/src/api.ts:416](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/api.ts#L416)

सामान्यीकृत मार्ग-पीढ़ी विन्यास द्वारा वापस लौटे [validateRoutesConfig](../functions/validateRoutesConfig.md)।

## विस्तार

- `RoutesConfig`

## गुण

### authenticationModule?

```ts
optional authenticationModule?: string;
```

में परिभाषित: [packages/runtime/src/config.ts:274](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L274)

प्रमाणीकरण मॉड्यूल पथ उत्पन्न मार्गों द्वारा इस्तेमाल किया।

#### से विरासत

```ts
RoutesConfig.authenticationModule
```

***

### basePath?

```ts
optional basePath?: string;
```

में परिभाषित: [packages/runtime/src/config.ts:254](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L254)

बेस एपीआई पथ; उदाहरण के लिए '/ v1' में https://myapi.com/v1

#### से विरासत

```ts
RoutesConfig.basePath
```

***

### bodyCoercion

```ts
bodyCoercion: boolean;
```

में परिभाषित: [cli/src/api.ts:419](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/api.ts#L419)

क्या वास्तव में एक स्वीकृत प्रकार में शरीर के मापदंडों को एकजुट करना है।

#### Default

```ts
true
```

#### ओवरराइड

```ts
RoutesConfig.bodyCoercion
```

***

### controllerPathGlobs?

```ts
optional controllerPathGlobs?: string[];
```

में परिभाषित: [cli/src/api.ts:420](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/api.ts#L420)

***

### entryFile

```ts
entryFile: string;
```

में परिभाषित: [cli/src/api.ts:417](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/api.ts#L417)

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

#### से विरासत

```ts
RoutesConfig.esm
```

***

### iocModule?

```ts
optional iocModule?: string;
```

में परिभाषित: [packages/runtime/src/config.ts:269](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L269)

उदाहरण के लिए, IoC मॉड्यूल पथ `./inversify/ioc`।

#### से विरासत

```ts
RoutesConfig.iocModule
```

***

### middleware?

```ts
optional middleware?: "express" | "hapi" | "koa";
```

में परिभाषित: [packages/runtime/src/config.ts:259](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L259)

मिडलवेयर प्रदाता।

#### से विरासत

```ts
RoutesConfig.middleware
```

***

### middlewareTemplate?

```ts
optional middlewareTemplate?: string;
```

में परिभाषित: [packages/runtime/src/config.ts:264](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L264)

कस्टम Handlebars टेम्पलेट पथ का उपयोग अंतर्निहित मिडलवेयर टेम्पलेट के बजाय किया जाता है।

#### से विरासत

```ts
RoutesConfig.middlewareTemplate
```

***

### multerOpts?

```ts
optional multerOpts?: Options;
```

में परिभाषित: [cli/src/api.ts:421](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/api.ts#L421)

***

### noImplicitAdditionalProperties

```ts
noImplicitAdditionalProperties: "ignore" | "throw-on-extras" | "silently-remove-extras";
```

में परिभाषित: [cli/src/api.ts:418](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/api.ts#L418)

***

### noWriteIfUnchanged?

```ts
optional noWriteIfUnchanged?: boolean;
```

में परिभाषित: [packages/runtime/src/config.ts:249](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L249)

जब उत्पन्न हुई सामग्री मौजूदा फ़ाइल से मेल खाती है तो रूट फ़ाइल लिखने के लिए छोड़ देता है।

#### से विरासत

```ts
RoutesConfig.noWriteIfUnchanged
```

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

#### से विरासत

```ts
RoutesConfig.rewriteRelativeImportExtensions
```

***

### rootSecurity?

```ts
optional rootSecurity?: Security[];
```

में परिभाषित: [cli/src/api.ts:422](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/api.ts#L422)

***

### routeGenerator?

```ts
optional routeGenerator?: 
  | string
  | ((metadata, options) => AbstractRouteGenerator<ExtendedRoutesConfig>);
```

में परिभाषित: [cli/src/api.ts:424](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/api.ts#L424)

***

### routesDir

```ts
routesDir: string;
```

में परिभाषित: [packages/runtime/src/config.ts:239](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L239)

निर्देशिका जहां उत्पन्न रूट फ़ाइलों को लिखा जाता है।

#### से विरासत

```ts
RoutesConfig.routesDir
```

***

### routesFileName?

```ts
optional routesFileName?: string;
```

में परिभाषित: [packages/runtime/src/config.ts:244](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L244)

उत्पन्न रूट मॉड्यूल के लिए फ़ाइल नाम।

#### से विरासत

```ts
RoutesConfig.routesFileName
```

***

### runtimeSpecConfig?

```ts
optional runtimeSpecConfig?: RuntimeSpecConfigSnapshot;
```

में परिभाषित: [cli/src/api.ts:423](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/api.ts#L423)
