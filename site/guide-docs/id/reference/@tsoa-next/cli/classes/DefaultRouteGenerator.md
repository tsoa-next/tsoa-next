---
lastUpdated: 2026-04-20T21:59:41.306Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/cli](../index.md) / DefaultRouteGenerator

# Kelas: DefaultRouteGenerator

Didefinisikan dalam: [cli/src/routeGeneration/defaultRouteGenerator.ts:11](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/routeGeneration/defaultRouteGenerator.ts#L11)

Generator rute baku untuk built-in Express, Koa, dan Hapi templat.

## Extending

- [`AbstractRouteGenerator`](AbstractRouteGenerator.md)\<[`ExtendedRoutesConfig`](../interfaces/ExtendedRoutesConfig.md)\>

## Konstruktor

### Konstruktor

```ts
new DefaultRouteGenerator(metadata, options): DefaultRouteGenerator;
```

Didefinisikan dalam: [cli/src/routeGeneration/defaultRouteGenerator.ts:14](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/routeGeneration/defaultRouteGenerator.ts#L14)

#### Parameter

##### metadata

`Metadata`

##### options

[`ExtendedRoutesConfig`](../interfaces/ExtendedRoutesConfig.md)

#### Kembali

`DefaultRouteGenerator`

#### Timpa

[`AbstractRouteGenerator`](AbstractRouteGenerator.md).[`constructor`](AbstractRouteGenerator.md#constructor)

## Properti

### metadata

```ts
protected readonly metadata: Metadata;
```

Didefinisikan dalam: [cli/src/routeGeneration/routeGenerator.ts:13](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/routeGeneration/routeGenerator.ts#L13)

#### Diwarisi dari

[`AbstractRouteGenerator`](AbstractRouteGenerator.md).[`metadata`](AbstractRouteGenerator.md#metadata)

***

### options

```ts
protected readonly options: ExtendedRoutesConfig;
```

Didefinisikan dalam: [cli/src/routeGeneration/routeGenerator.ts:14](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/routeGeneration/routeGenerator.ts#L14)

#### Diwarisi dari

[`AbstractRouteGenerator`](AbstractRouteGenerator.md).[`options`](AbstractRouteGenerator.md#options)

***

### pathTransformerFn

```ts
pathTransformerFn: (path) => string;
```

Didefinisikan dalam: [cli/src/routeGeneration/defaultRouteGenerator.ts:12](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/routeGeneration/defaultRouteGenerator.ts#L12)

#### Parameter

##### path

`string`

#### Kembali

`string`

***

### template

```ts
template: string;
```

Didefinisikan dalam: [cli/src/routeGeneration/defaultRouteGenerator.ts:13](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/routeGeneration/defaultRouteGenerator.ts#L13)

## Metode

### buildContent()

```ts
buildContent(middlewareTemplate): string;
```

Didefinisikan dalam: [cli/src/routeGeneration/defaultRouteGenerator.ts:69](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/routeGeneration/defaultRouteGenerator.ts#L69)

Menyewa template rute dengan konteks metadata kini.

#### Parameter

##### middlewareTemplate

`string`

#### Kembali

`string`

***

### buildContext()

```ts
protected buildContext(): object;
```

Didefinisikan dalam: [cli/src/routeGeneration/routeGenerator.ts:76](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/routeGeneration/routeGenerator.ts#L76)

Membangun Handlebars teks teks teks yang digunakan oleh template default.

#### Kembali

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

###### MinimalSwaggerConfig.Body Coereron

```ts
bodyCoercion: boolean;
```

###### minimalSwaggerConfig.noImpitionalProperties

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

#### Diwarisi dari

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

Didefinisikan dalam: [cli/src/routeGeneration/routeGenerator.ts:157](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/routeGeneration/routeGenerator.ts#L157)

#### Parameter

##### useSpecPaths

`boolean`

#### Kembali

  \| \{
  `spec`: `Spec`;
  `yaml`: `string`;
\}
  \| `undefined`

#### Diwarisi dari

[`AbstractRouteGenerator`](AbstractRouteGenerator.md).[`buildEmbeddedSpecGeneratorArtifacts`](AbstractRouteGenerator.md#buildembeddedspecgeneratorartifacts)

***

### buildModels()

```ts
buildModels(): Models;
```

Didefinisikan dalam: [cli/src/routeGeneration/routeGenerator.ts:23](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/routeGeneration/routeGenerator.ts#L23)

Membangun metadata model waktu-jalan yang dikonsumsi oleh penangan rute yang dihasilkan.

#### Kembali

`Models`

#### Diwarisi dari

[`AbstractRouteGenerator`](AbstractRouteGenerator.md).[`buildModels`](AbstractRouteGenerator.md#buildmodels)

***

### buildParameterSchema()

```ts
protected buildParameterSchema(source): ParameterSchema;
```

Didefinisikan dalam: [cli/src/routeGeneration/routeGenerator.ts:199](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/routeGeneration/routeGenerator.ts#L199)

#### Parameter

##### source

`Parameter`

#### Kembali

`ParameterSchema`

#### Diwarisi dari

[`AbstractRouteGenerator`](AbstractRouteGenerator.md).[`buildParameterSchema`](AbstractRouteGenerator.md#buildparameterschema)

***

### buildProperty()

```ts
protected buildProperty(type): PropertySchema;
```

Didefinisikan dalam: [cli/src/routeGeneration/routeGenerator.ts:219](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/routeGeneration/routeGenerator.ts#L219)

#### Parameter

##### type

`Type`

#### Kembali

`PropertySchema`

#### Diwarisi dari

[`AbstractRouteGenerator`](AbstractRouteGenerator.md).[`buildProperty`](AbstractRouteGenerator.md#buildproperty)

***

### buildPropertySchema()

```ts
protected buildPropertySchema(source): PropertySchema;
```

Didefinisikan dalam: [cli/src/routeGeneration/routeGenerator.ts:188](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/routeGeneration/routeGenerator.ts#L188)

#### Parameter

##### source

`Property`

#### Kembali

`PropertySchema`

#### Diwarisi dari

[`AbstractRouteGenerator`](AbstractRouteGenerator.md).[`buildPropertySchema`](AbstractRouteGenerator.md#buildpropertyschema)

***

### GenerateCustomRoutes()

```ts
GenerateCustomRoutes(): Promise<void>;
```

Didefinisikan dalam: [cli/src/routeGeneration/defaultRouteGenerator.ts:37](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/routeGeneration/defaultRouteGenerator.ts#L37)

Loads berkas template yang dipilih dan menghasilkan keluaran rute.

#### Kembali

`Promise`\<`void`\>

#### Timpa

[`AbstractRouteGenerator`](AbstractRouteGenerator.md).[`GenerateCustomRoutes`](AbstractRouteGenerator.md#generatecustomroutes)

***

### GenerateRoutes()

```ts
GenerateRoutes(middlewareTemplate): Promise<void>;
```

Didefinisikan dalam: [cli/src/routeGeneration/defaultRouteGenerator.ts:44](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/routeGeneration/defaultRouteGenerator.ts#L44)

Menulis berkas rute yang dihasilkan ke disk.

#### Parameter

##### middlewareTemplate

`string`

#### Kembali

`Promise`\<`void`\>

***

### getRelativeImportPath()

```ts
protected getRelativeImportPath(fileLocation): string;
```

Didefinisikan dalam: [cli/src/routeGeneration/routeGenerator.ts:176](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/routeGeneration/routeGenerator.ts#L176)

#### Parameter

##### fileLocation

`string`

#### Kembali

`string`

#### Diwarisi dari

[`AbstractRouteGenerator`](AbstractRouteGenerator.md).[`getRelativeImportPath`](AbstractRouteGenerator.md#getrelativeimportpath)

***

### pathTransformer()

```ts
protected pathTransformer(path): string;
```

Didefinisikan dalam: [cli/src/routeGeneration/defaultRouteGenerator.ts:64](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/routeGeneration/defaultRouteGenerator.ts#L64)

#### Parameter

##### path

`string`

#### Kembali

`string`

#### Timpa

[`AbstractRouteGenerator`](AbstractRouteGenerator.md).[`pathTransformer`](AbstractRouteGenerator.md#pathtransformer)

***

### shouldWriteFile()

```ts
protected shouldWriteFile(fileName, content): Promise<boolean>;
```

Didefinisikan dalam: [cli/src/routeGeneration/routeGenerator.ts:263](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/routeGeneration/routeGenerator.ts#L263)

#### Parameter

##### fileName

`string`

##### content

`string`

#### Kembali

`Promise`\<`boolean`\>

#### Diwarisi dari

[`AbstractRouteGenerator`](AbstractRouteGenerator.md).[`shouldWriteFile`](AbstractRouteGenerator.md#shouldwritefile)
