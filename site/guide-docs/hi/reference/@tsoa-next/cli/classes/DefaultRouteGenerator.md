---
lastUpdated: 2026-04-20T21:59:41.306Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/cli](../index.md) / DefaultRouteGenerator

# वर्ग: डिफ़ॉल्टरूटजेनरेटर

में परिभाषित: [cli/src/routeGeneration/defaultRouteGenerator.ts:11](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/routeGeneration/defaultRouteGenerator.ts#L11)

अंतर्निहित के लिए डिफ़ॉल्ट मार्ग जनरेटर Express, Koa, और Hapi टेम्पलेट्स।

## विस्तार

- [`AbstractRouteGenerator`](AbstractRouteGenerator.md)\<[`ExtendedRoutesConfig`](../interfaces/ExtendedRoutesConfig.md)\>

## कंस्ट्रक्टर

### रचनाकार

```ts
new DefaultRouteGenerator(metadata, options): DefaultRouteGenerator;
```

में परिभाषित: [cli/src/routeGeneration/defaultRouteGenerator.ts:14](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/routeGeneration/defaultRouteGenerator.ts#L14)

#### पैरामीटर

##### metadata

`Metadata`

##### options

[`ExtendedRoutesConfig`](../interfaces/ExtendedRoutesConfig.md)

#### रिटर्न

`DefaultRouteGenerator`

#### ओवरराइड

[`AbstractRouteGenerator`](AbstractRouteGenerator.md).[`constructor`](AbstractRouteGenerator.md#constructor)

## गुण

### metadata

```ts
protected readonly metadata: Metadata;
```

में परिभाषित: [cli/src/routeGeneration/routeGenerator.ts:13](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/routeGeneration/routeGenerator.ts#L13)

#### से विरासत

[`AbstractRouteGenerator`](AbstractRouteGenerator.md).[`metadata`](AbstractRouteGenerator.md#metadata)

***

### options

```ts
protected readonly options: ExtendedRoutesConfig;
```

में परिभाषित: [cli/src/routeGeneration/routeGenerator.ts:14](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/routeGeneration/routeGenerator.ts#L14)

#### से विरासत

[`AbstractRouteGenerator`](AbstractRouteGenerator.md).[`options`](AbstractRouteGenerator.md#options)

***

### pathTransformerFn

```ts
pathTransformerFn: (path) => string;
```

में परिभाषित: [cli/src/routeGeneration/defaultRouteGenerator.ts:12](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/routeGeneration/defaultRouteGenerator.ts#L12)

#### पैरामीटर

##### path

`string`

#### रिटर्न

`string`

***

### template

```ts
template: string;
```

में परिभाषित: [cli/src/routeGeneration/defaultRouteGenerator.ts:13](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/routeGeneration/defaultRouteGenerator.ts#L13)

## विधि

### buildContent()

```ts
buildContent(middlewareTemplate): string;
```

में परिभाषित: [cli/src/routeGeneration/defaultRouteGenerator.ts:69](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/routeGeneration/defaultRouteGenerator.ts#L69)

वर्तमान मेटाडाटा संदर्भ के साथ मार्ग टेम्पलेट प्रस्तुत करता है।

#### पैरामीटर

##### middlewareTemplate

`string`

#### रिटर्न

`string`

***

### buildContext()

```ts
protected buildContext(): object;
```

में परिभाषित: [cli/src/routeGeneration/routeGenerator.ts:76](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/routeGeneration/routeGenerator.ts#L76)

बनाता है Handlebars डिफ़ॉल्ट मार्ग टेम्पलेट्स द्वारा उपयोग किए जाने वाले टेम्पलेट संदर्भ।

#### रिटर्न

`object`

##### authenticationModule

```ts
authenticationModule: string | undefined;
```

##### basePath

```ts
basePath: string = normalisedBasePath;
```

##### canImportByAlias

```ts
canImportByAlias: boolean;
```

##### controllers

```ts
controllers: object[];
```

##### embeddedSpecGeneratorArtifacts

```ts
embeddedSpecGeneratorArtifacts: 
  | {
  spec: Spec;
  yaml: string;
}
  | undefined;
```

##### environment

```ts
environment: ProcessEnv = process.env;
```

##### esm

```ts
esm: boolean | undefined;
```

##### existingGetPaths

```ts
existingGetPaths: string[];
```

##### iocModule

```ts
iocModule: string | undefined;
```

##### minimalSwaggerConfig

```ts
minimalSwaggerConfig: object;
```

###### न्यूनतमSwaggerConfig.bodyCoercion

```ts
bodyCoercion: boolean;
```

###### न्यूनतमSwaggerConfig.noImplicitAdditionalProperties

```ts
noImplicitAdditionalProperties: "ignore" | "throw-on-extras" | "silently-remove-extras";
```

##### models

```ts
models: Models;
```

##### multerOpts

```ts
multerOpts: Options | undefined;
```

##### runtimeSpecConfig

```ts
runtimeSpecConfig: 
  | {
  compilerOptions?: Record<string, unknown>;
  defaultNumberType?: "double" | "float" | "integer" | "long";
  ignore?: string[];
  metadata: Metadata;
  spec: SpecConfig & object;
}
  | undefined;
```

##### useFileUploads

```ts
useFileUploads: boolean;
```

##### useSecurity

```ts
useSecurity: boolean;
```

##### useSpecPaths

```ts
useSpecPaths: boolean;
```

#### से विरासत

[`AbstractRouteGenerator`](AbstractRouteGenerator.md).[`buildContext`](AbstractRouteGenerator.md#buildcontext)

***

### buildEmbeddedSpecGeneratorArtifacts()

```ts
protected buildEmbeddedSpecGeneratorArtifacts(useSpecPaths): 
  | {
  spec: Spec;
  yaml: string;
}
  | undefined;
```

में परिभाषित: [cli/src/routeGeneration/routeGenerator.ts:157](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/routeGeneration/routeGenerator.ts#L157)

#### पैरामीटर

##### useSpecPaths

`boolean`

#### रिटर्न

  \| \{
  `spec`: `Spec`;
  `yaml`: `string`;
\}
  \| `undefined`

#### से विरासत

[`AbstractRouteGenerator`](AbstractRouteGenerator.md).[`buildEmbeddedSpecGeneratorArtifacts`](AbstractRouteGenerator.md#buildembeddedspecgeneratorartifacts)

***

### buildModels()

```ts
buildModels(): Models;
```

में परिभाषित: [cli/src/routeGeneration/routeGenerator.ts:23](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/routeGeneration/routeGenerator.ts#L23)

उत्पन्न रूट हैंडलर्स द्वारा खपत रनटाइम मॉडल मेटाडाटा बनाता है।

#### रिटर्न

`Models`

#### से विरासत

[`AbstractRouteGenerator`](AbstractRouteGenerator.md).[`buildModels`](AbstractRouteGenerator.md#buildmodels)

***

### buildParameterSchema()

```ts
protected buildParameterSchema(source): ParameterSchema;
```

में परिभाषित: [cli/src/routeGeneration/routeGenerator.ts:199](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/routeGeneration/routeGenerator.ts#L199)

#### पैरामीटर

##### source

`Parameter`

#### रिटर्न

`ParameterSchema`

#### से विरासत

[`AbstractRouteGenerator`](AbstractRouteGenerator.md).[`buildParameterSchema`](AbstractRouteGenerator.md#buildparameterschema)

***

### buildProperty()

```ts
protected buildProperty(type): PropertySchema;
```

में परिभाषित: [cli/src/routeGeneration/routeGenerator.ts:219](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/routeGeneration/routeGenerator.ts#L219)

#### पैरामीटर

##### type

`Type`

#### रिटर्न

`PropertySchema`

#### से विरासत

[`AbstractRouteGenerator`](AbstractRouteGenerator.md).[`buildProperty`](AbstractRouteGenerator.md#buildproperty)

***

### buildPropertySchema()

```ts
protected buildPropertySchema(source): PropertySchema;
```

में परिभाषित: [cli/src/routeGeneration/routeGenerator.ts:188](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/routeGeneration/routeGenerator.ts#L188)

#### पैरामीटर

##### source

`Property`

#### रिटर्न

`PropertySchema`

#### से विरासत

[`AbstractRouteGenerator`](AbstractRouteGenerator.md).[`buildPropertySchema`](AbstractRouteGenerator.md#buildpropertyschema)

***

### GenerateCustomRoutes()

```ts
GenerateCustomRoutes(): Promise<void>;
```

में परिभाषित: [cli/src/routeGeneration/defaultRouteGenerator.ts:37](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/routeGeneration/defaultRouteGenerator.ts#L37)

चयनित टेम्पलेट फ़ाइल को लोड करता है और रूट आउटपुट उत्पन्न करता है।

#### रिटर्न

`Promise`\<`void`\>

#### ओवरराइड

[`AbstractRouteGenerator`](AbstractRouteGenerator.md).[`GenerateCustomRoutes`](AbstractRouteGenerator.md#generatecustomroutes)

***

### GenerateRoutes()

```ts
GenerateRoutes(middlewareTemplate): Promise<void>;
```

में परिभाषित: [cli/src/routeGeneration/defaultRouteGenerator.ts:44](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/routeGeneration/defaultRouteGenerator.ts#L44)

उत्पन्न रूट फ़ाइल को डिस्क में लिखते हैं।

#### पैरामीटर

##### middlewareTemplate

`string`

#### रिटर्न

`Promise`\<`void`\>

***

### getRelativeImportPath()

```ts
protected getRelativeImportPath(fileLocation): string;
```

में परिभाषित: [cli/src/routeGeneration/routeGenerator.ts:176](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/routeGeneration/routeGenerator.ts#L176)

#### पैरामीटर

##### fileLocation

`string`

#### रिटर्न

`string`

#### से विरासत

[`AbstractRouteGenerator`](AbstractRouteGenerator.md).[`getRelativeImportPath`](AbstractRouteGenerator.md#getrelativeimportpath)

***

### pathTransformer()

```ts
protected pathTransformer(path): string;
```

में परिभाषित: [cli/src/routeGeneration/defaultRouteGenerator.ts:64](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/routeGeneration/defaultRouteGenerator.ts#L64)

#### पैरामीटर

##### path

`string`

#### रिटर्न

`string`

#### ओवरराइड

[`AbstractRouteGenerator`](AbstractRouteGenerator.md).[`pathTransformer`](AbstractRouteGenerator.md#pathtransformer)

***

### shouldWriteFile()

```ts
protected shouldWriteFile(fileName, content): Promise<boolean>;
```

में परिभाषित: [cli/src/routeGeneration/routeGenerator.ts:263](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/routeGeneration/routeGenerator.ts#L263)

#### पैरामीटर

##### fileName

`string`

##### content

`string`

#### रिटर्न

`Promise`\<`boolean`\>

#### से विरासत

[`AbstractRouteGenerator`](AbstractRouteGenerator.md).[`shouldWriteFile`](AbstractRouteGenerator.md#shouldwritefile)
