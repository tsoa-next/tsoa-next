---
lastUpdated: 2026-04-20T21:59:41.306Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/cli](../index.md) / DefaultRouteGenerator

# الرتبة: مصمم طرق

محددة في: [cli/src/routeGeneration/defaultRouteGenerator.ts:11](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/routeGeneration/defaultRouteGenerator.ts#L11)

المولد الافتراضي للطريق Express.. Koaو Hapi نماذج

## التذييلات

- [`AbstractRouteGenerator`](AbstractRouteGenerator.md)\<[`ExtendedRoutesConfig`](../interfaces/ExtendedRoutesConfig.md)\>

## Constructors

### المؤسسة

```ts
new DefaultRouteGenerator(metadata, options): DefaultRouteGenerator;
```

محددة في: [cli/src/routeGeneration/defaultRouteGenerator.ts:14](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/routeGeneration/defaultRouteGenerator.ts#L14)

#### البارامترات

##### metadata

`Metadata`

##### options

[`ExtendedRoutesConfig`](../interfaces/ExtendedRoutesConfig.md)

#### العودة

`DefaultRouteGenerator`

#### تجاوزات

[`AbstractRouteGenerator`](AbstractRouteGenerator.md).[`constructor`](AbstractRouteGenerator.md#constructor)

## الممتلكات

### metadata

```ts
protected readonly metadata: Metadata;
```

محددة في: [cli/src/routeGeneration/routeGenerator.ts:13](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/routeGeneration/routeGenerator.ts#L13)

#### Inherited from

[`AbstractRouteGenerator`](AbstractRouteGenerator.md).[`metadata`](AbstractRouteGenerator.md#metadata)

***

### options

```ts
protected readonly options: ExtendedRoutesConfig;
```

محددة في: [cli/src/routeGeneration/routeGenerator.ts:14](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/routeGeneration/routeGenerator.ts#L14)

#### Inherited from

[`AbstractRouteGenerator`](AbstractRouteGenerator.md).[`options`](AbstractRouteGenerator.md#options)

***

### pathTransformerFn

```ts
pathTransformerFn: (path) => string;
```

محددة في: [cli/src/routeGeneration/defaultRouteGenerator.ts:12](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/routeGeneration/defaultRouteGenerator.ts#L12)

#### البارامترات

##### path

`string`

#### العودة

`string`

***

### template

```ts
template: string;
```

محددة في: [cli/src/routeGeneration/defaultRouteGenerator.ts:13](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/routeGeneration/defaultRouteGenerator.ts#L13)

## الطرائق

### buildContent()

```ts
buildContent(middlewareTemplate): string;
```

محددة في: [cli/src/routeGeneration/defaultRouteGenerator.ts:69](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/routeGeneration/defaultRouteGenerator.ts#L69)

يستأجر نموذج الطريق مع سياق البيانات الوصفية الحالي.

#### البارامترات

##### middlewareTemplate

`string`

#### العودة

`string`

***

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

#### Inherited from

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

#### Inherited from

[`AbstractRouteGenerator`](AbstractRouteGenerator.md).[`buildEmbeddedSpecGeneratorArtifacts`](AbstractRouteGenerator.md#buildembeddedspecgeneratorartifacts)

***

### buildModels()

```ts
buildModels(): Models;
```

محددة في: [cli/src/routeGeneration/routeGenerator.ts:23](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/routeGeneration/routeGenerator.ts#L23)

يبني نموذج البيانات الفوقية التي يستهلكها معالجو الطرق المولدون.

#### العودة

`Models`

#### Inherited from

[`AbstractRouteGenerator`](AbstractRouteGenerator.md).[`buildModels`](AbstractRouteGenerator.md#buildmodels)

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

#### Inherited from

[`AbstractRouteGenerator`](AbstractRouteGenerator.md).[`buildParameterSchema`](AbstractRouteGenerator.md#buildparameterschema)

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

#### Inherited from

[`AbstractRouteGenerator`](AbstractRouteGenerator.md).[`buildProperty`](AbstractRouteGenerator.md#buildproperty)

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

#### Inherited from

[`AbstractRouteGenerator`](AbstractRouteGenerator.md).[`buildPropertySchema`](AbstractRouteGenerator.md#buildpropertyschema)

***

### GenerateCustomRoutes()

```ts
GenerateCustomRoutes(): Promise<void>;
```

محددة في: [cli/src/routeGeneration/defaultRouteGenerator.ts:37](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/routeGeneration/defaultRouteGenerator.ts#L37)

ويضع ملف النموذج المختار ويولد ناتج الطريق.

#### العودة

`Promise`\<`void`\>

#### تجاوزات

[`AbstractRouteGenerator`](AbstractRouteGenerator.md).[`GenerateCustomRoutes`](AbstractRouteGenerator.md#generatecustomroutes)

***

### GenerateRoutes()

```ts
GenerateRoutes(middlewareTemplate): Promise<void>;
```

محددة في: [cli/src/routeGeneration/defaultRouteGenerator.ts:44](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/routeGeneration/defaultRouteGenerator.ts#L44)

يكتب ملف الطريق المولد إلى القرص

#### البارامترات

##### middlewareTemplate

`string`

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

#### Inherited from

[`AbstractRouteGenerator`](AbstractRouteGenerator.md).[`getRelativeImportPath`](AbstractRouteGenerator.md#getrelativeimportpath)

***

### pathTransformer()

```ts
protected pathTransformer(path): string;
```

محددة في: [cli/src/routeGeneration/defaultRouteGenerator.ts:64](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/routeGeneration/defaultRouteGenerator.ts#L64)

#### البارامترات

##### path

`string`

#### العودة

`string`

#### تجاوزات

[`AbstractRouteGenerator`](AbstractRouteGenerator.md).[`pathTransformer`](AbstractRouteGenerator.md#pathtransformer)

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

#### Inherited from

[`AbstractRouteGenerator`](AbstractRouteGenerator.md).[`shouldWriteFile`](AbstractRouteGenerator.md#shouldwritefile)
