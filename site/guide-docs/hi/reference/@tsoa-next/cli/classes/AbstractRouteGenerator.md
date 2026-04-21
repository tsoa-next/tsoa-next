---
lastUpdated: 2026-04-20T21:59:41.306Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/cli](../index.md) / AbstractRouteGenerator

# सार क्लास: सारमार्गमार्ग जनरेटर\<Config\>

में परिभाषित: [cli/src/routeGeneration/routeGenerator.ts:11](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/routeGeneration/routeGenerator.ts#L11)

मार्ग जनरेटर के लिए बेस कार्यान्वयन जो मेटाडाटा को फ्रेमवर्क-विशिष्ट मार्ग फ़ाइलों में बदल देता है।

## द्वारा विस्तारित

- [`DefaultRouteGenerator`](DefaultRouteGenerator.md)

## प्रकार पैरामीटर

### Config

`Config` * [`ExtendedRoutesConfig`](../interfaces/ExtendedRoutesConfig.md)

## कंस्ट्रक्टर

### रचनाकार

```ts
new AbstractRouteGenerator<Config>(metadata, options): AbstractRouteGenerator<Config>;
```

में परिभाषित: [cli/src/routeGeneration/routeGenerator.ts:12](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/routeGeneration/routeGenerator.ts#L12)

#### पैरामीटर

##### metadata

`Metadata`

##### options

`Config`

#### रिटर्न

`AbstractRouteGenerator`\<`Config`\>

## गुण

### metadata

```ts
protected readonly metadata: Metadata;
```

में परिभाषित: [cli/src/routeGeneration/routeGenerator.ts:13](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/routeGeneration/routeGenerator.ts#L13)

***

### options

```ts
protected readonly options: Config;
```

में परिभाषित: [cli/src/routeGeneration/routeGenerator.ts:14](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/routeGeneration/routeGenerator.ts#L14)

## विधि

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
multerOpts: Config["multerOpts"];
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

***

### buildModels()

```ts
buildModels(): Models;
```

में परिभाषित: [cli/src/routeGeneration/routeGenerator.ts:23](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/routeGeneration/routeGenerator.ts#L23)

उत्पन्न रूट हैंडलर्स द्वारा खपत रनटाइम मॉडल मेटाडाटा बनाता है।

#### रिटर्न

`Models`

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

***

### GenerateCustomRoutes()

```ts
abstract GenerateCustomRoutes(): Promise<void>;
```

में परिभाषित: [cli/src/routeGeneration/routeGenerator.ts:20](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/routeGeneration/routeGenerator.ts#L20)

सक्रिय ढांचे या कस्टम टेम्पलेट के लिए कॉन्फ़िगर रूट आउटपुट उत्पन्न करता है।

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

***

### pathTransformer()

```ts
protected pathTransformer(path): string;
```

में परिभाषित: [cli/src/routeGeneration/routeGenerator.ts:71](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/routeGeneration/routeGenerator.ts#L71)

#### पैरामीटर

##### path

`string`

#### रिटर्न

`string`

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
