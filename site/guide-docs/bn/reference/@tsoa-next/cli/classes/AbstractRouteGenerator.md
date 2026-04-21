---
lastUpdated: 2026-04-20T21:59:41.306Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/cli](../index.md) / AbstractRouteGenerator

# অ্যাবস্ট্র্যাক্টাল ক্লাস: অ্যাবস্ট্র্যাক্টরফ্টroganer\<Config\>

নির্ধারিত মান: [cli/src/routeGeneration/routeGenerator.ts:11](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/routeGeneration/routeGenerator.ts#L11)

রুট জেনারেটরের জন্য বেস বাস্তবায়ন যা মিটা-নির্দিষ্ট রুট ফাইলকে রূপান্তরিত করে।

## এক্সটেন্ডেড

- [`DefaultRouteGenerator`](DefaultRouteGenerator.md)

## পরামিতির পরামিতি

### Config

`Config` * xends * [`ExtendedRoutesConfig`](../interfaces/ExtendedRoutesConfig.md)

## কনস্ট্রাক্টর

### কনস্ট্রাক্টর

```ts
new AbstractRouteGenerator<Config>(metadata, options): AbstractRouteGenerator<Config>;
```

নির্ধারিত মান: [cli/src/routeGeneration/routeGenerator.ts:12](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/routeGeneration/routeGenerator.ts#L12)

#### পরামিতি

##### metadata

`Metadata`

##### options

`Config`

#### প্রাপ্ত মান

`AbstractRouteGenerator`\<`Config`\>

## বৈশিষ্ট্য

### metadata

```ts
protected readonly metadata: Metadata;
```

নির্ধারিত মান: [cli/src/routeGeneration/routeGenerator.ts:13](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/routeGeneration/routeGenerator.ts#L13)

***

### options

```ts
protected readonly options: Config;
```

নির্ধারিত মান: [cli/src/routeGeneration/routeGenerator.ts:14](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/routeGeneration/routeGenerator.ts#L14)

## পদ্ধতি

### buildContext()

```ts
protected buildContext(): object;
```

নির্ধারিত মান: [cli/src/routeGeneration/routeGenerator.ts:76](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/routeGeneration/routeGenerator.ts#L76)

বিল্ড Handlebars ডিফল্ট পাথ হিসেবে ব্যবহৃত টেমপ্লেট ব্যবহার করে।

#### প্রাপ্ত মান

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

###### অতি ক্ষুদ্রSawager.drogion

```ts
bodyCoercion: boolean;
```

###### অতি সাধারণ Sawager.markspsion Infinity

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

নির্ধারিত মান: [cli/src/routeGeneration/routeGenerator.ts:157](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/routeGeneration/routeGenerator.ts#L157)

#### পরামিতি

##### useSpecPaths

`boolean`

#### প্রাপ্ত মান

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

নির্ধারিত মান: [cli/src/routeGeneration/routeGenerator.ts:23](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/routeGeneration/routeGenerator.ts#L23)

রুট হ্যান্ডলার দ্বারা নির্মিত ল্যাপটপ মডেল মিটা- ডাটা নির্মাণ করা হয়।

#### প্রাপ্ত মান

`Models`

***

### buildParameterSchema()

```ts
protected buildParameterSchema(source): ParameterSchema;
```

নির্ধারিত মান: [cli/src/routeGeneration/routeGenerator.ts:199](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/routeGeneration/routeGenerator.ts#L199)

#### পরামিতি

##### source

`Parameter`

#### প্রাপ্ত মান

`ParameterSchema`

***

### buildProperty()

```ts
protected buildProperty(type): PropertySchema;
```

নির্ধারিত মান: [cli/src/routeGeneration/routeGenerator.ts:219](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/routeGeneration/routeGenerator.ts#L219)

#### পরামিতি

##### type

`Type`

#### প্রাপ্ত মান

`PropertySchema`

***

### buildPropertySchema()

```ts
protected buildPropertySchema(source): PropertySchema;
```

নির্ধারিত মান: [cli/src/routeGeneration/routeGenerator.ts:188](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/routeGeneration/routeGenerator.ts#L188)

#### পরামিতি

##### source

`Property`

#### প্রাপ্ত মান

`PropertySchema`

***

### GenerateCustomRoutes()

```ts
abstract GenerateCustomRoutes(): Promise<void>;
```

নির্ধারিত মান: [cli/src/routeGeneration/routeGenerator.ts:20](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/routeGeneration/routeGenerator.ts#L20)

সক্রিয় পরিকাঠামো অথবা স্বনির্ধারিত টেমপ্লেটের জন্য কনফিগার করা পাথ উল্লেখ করে ।

#### প্রাপ্ত মান

`Promise`\<`void`\>

***

### getRelativeImportPath()

```ts
protected getRelativeImportPath(fileLocation): string;
```

নির্ধারিত মান: [cli/src/routeGeneration/routeGenerator.ts:176](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/routeGeneration/routeGenerator.ts#L176)

#### পরামিতি

##### fileLocation

`string`

#### প্রাপ্ত মান

`string`

***

### pathTransformer()

```ts
protected pathTransformer(path): string;
```

নির্ধারিত মান: [cli/src/routeGeneration/routeGenerator.ts:71](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/routeGeneration/routeGenerator.ts#L71)

#### পরামিতি

##### path

`string`

#### প্রাপ্ত মান

`string`

***

### shouldWriteFile()

```ts
protected shouldWriteFile(fileName, content): Promise<boolean>;
```

নির্ধারিত মান: [cli/src/routeGeneration/routeGenerator.ts:263](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/routeGeneration/routeGenerator.ts#L263)

#### পরামিতি

##### fileName

`string`

##### content

`string`

#### প্রাপ্ত মান

`Promise`\<`boolean`\>
