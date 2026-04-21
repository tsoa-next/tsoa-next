---
lastUpdated: 2026-04-20T21:59:41.306Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/cli](../index.md) / AbstractRouteGenerator

# الرتبة المجردة: مطروحة\<Config\>

محددة في: [cli/src/routeGeneration/routeGenerator.ts:11](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/routeGeneration/routeGenerator.ts#L11)

تنفيذ القاعدة لمولدات الدروب التي تحول البيانات الفوقية إلى ملفات طرق محددة إطاريا.

## Extended by

- [`DefaultRouteGenerator`](DefaultRouteGenerator.md)

## البارامترات النوعية

### Config

`Config` * النفقات* [`ExtendedRoutesConfig`](../interfaces/ExtendedRoutesConfig.md)

## Constructors

### المؤسسة

```ts
new AbstractRouteGenerator<Config>(metadata, options): AbstractRouteGenerator<Config>;
```

محددة في: [cli/src/routeGeneration/routeGenerator.ts:12](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/routeGeneration/routeGenerator.ts#L12)

#### البارامترات

##### metadata

`Metadata`

##### options

`Config`

#### العودة

`AbstractRouteGenerator`\<`Config`\>

## الممتلكات

### metadata

```ts
protected readonly metadata: Metadata;
```

محددة في: [cli/src/routeGeneration/routeGenerator.ts:13](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/routeGeneration/routeGenerator.ts#L13)

***

### options

```ts
protected readonly options: Config;
```

محددة في: [cli/src/routeGeneration/routeGenerator.ts:14](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/routeGeneration/routeGenerator.ts#L14)

## الطرائق

### buildContext()

```ts
protected buildContext(): object;
```

محددة في: [cli/src/routeGeneration/routeGenerator.ts:76](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/routeGeneration/routeGenerator.ts#L76)

بناء Handlebars (ب) السياق النموذجي الذي تستخدمه نماذج الطرق غير المباشرة.

#### العودة

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

###### الحد الأدنى من المصارعة

```ts
bodyCoercion: boolean;
```

###### الحد الأدنى من المواد الكيميائية

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

محددة في: [cli/src/routeGeneration/routeGenerator.ts:157](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/routeGeneration/routeGenerator.ts#L157)

#### البارامترات

##### useSpecPaths

`boolean`

#### العودة

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

محددة في: [cli/src/routeGeneration/routeGenerator.ts:23](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/routeGeneration/routeGenerator.ts#L23)

يبني نموذج البيانات الفوقية التي يستهلكها معالجو الطرق المولدون.

#### العودة

`Models`

***

### buildParameterSchema()

```ts
protected buildParameterSchema(source): ParameterSchema;
```

محددة في: [cli/src/routeGeneration/routeGenerator.ts:199](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/routeGeneration/routeGenerator.ts#L199)

#### البارامترات

##### source

`Parameter`

#### العودة

`ParameterSchema`

***

### buildProperty()

```ts
protected buildProperty(type): PropertySchema;
```

محددة في: [cli/src/routeGeneration/routeGenerator.ts:219](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/routeGeneration/routeGenerator.ts#L219)

#### البارامترات

##### type

`Type`

#### العودة

`PropertySchema`

***

### buildPropertySchema()

```ts
protected buildPropertySchema(source): PropertySchema;
```

محددة في: [cli/src/routeGeneration/routeGenerator.ts:188](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/routeGeneration/routeGenerator.ts#L188)

#### البارامترات

##### source

`Property`

#### العودة

`PropertySchema`

***

### GenerateCustomRoutes()

```ts
abstract GenerateCustomRoutes(): Promise<void>;
```

محددة في: [cli/src/routeGeneration/routeGenerator.ts:20](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/routeGeneration/routeGenerator.ts#L20)

يولّد ناتج المسار المهيكل للإطار النشط أو نموذج العرف.

#### العودة

`Promise`\<`void`\>

***

### getRelativeImportPath()

```ts
protected getRelativeImportPath(fileLocation): string;
```

محددة في: [cli/src/routeGeneration/routeGenerator.ts:176](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/routeGeneration/routeGenerator.ts#L176)

#### البارامترات

##### fileLocation

`string`

#### العودة

`string`

***

### pathTransformer()

```ts
protected pathTransformer(path): string;
```

محددة في: [cli/src/routeGeneration/routeGenerator.ts:71](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/routeGeneration/routeGenerator.ts#L71)

#### البارامترات

##### path

`string`

#### العودة

`string`

***

### shouldWriteFile()

```ts
protected shouldWriteFile(fileName, content): Promise<boolean>;
```

محددة في: [cli/src/routeGeneration/routeGenerator.ts:263](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/routeGeneration/routeGenerator.ts#L263)

#### البارامترات

##### fileName

`string`

##### content

`string`

#### العودة

`Promise`\<`boolean`\>
