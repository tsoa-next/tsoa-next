---
lastUpdated: 2026-04-20T21:59:41.306Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/cli](../index.md) / AbstractRouteGenerator

# Kelas Abstract: AbstractRouteGenerator\<Config\>

Didefinisikan dalam: [cli/src/routeGeneration/routeGenerator.ts:11](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/routeGeneration/routeGenerator.ts#L11)

Aplikasi dasar untuk generator rute yang mengubah metadata menjadi berkas rute framework- spesifik.

## Diperluas oleh

- [`DefaultRouteGenerator`](DefaultRouteGenerator.md)

## Parameter Tipe

### Config

`Config` ♪ extend ♪ [`ExtendedRoutesConfig`](../interfaces/ExtendedRoutesConfig.md)

## Konstruktor

### Konstruktor

```ts
new AbstractRouteGenerator<Config>(metadata, options): AbstractRouteGenerator<Config>;
```

Didefinisikan dalam: [cli/src/routeGeneration/routeGenerator.ts:12](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/routeGeneration/routeGenerator.ts#L12)

#### Parameter

##### metadata

`Metadata`

##### options

`Config`

#### Kembali

`AbstractRouteGenerator`\<`Config`\>

## Properti

### metadata

```ts
protected readonly metadata: Metadata;
```

Didefinisikan dalam: [cli/src/routeGeneration/routeGenerator.ts:13](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/routeGeneration/routeGenerator.ts#L13)

***

### options

```ts
protected readonly options: Config;
```

Didefinisikan dalam: [cli/src/routeGeneration/routeGenerator.ts:14](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/routeGeneration/routeGenerator.ts#L14)

## Metode

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

***

### buildModels()

```ts
buildModels(): Models;
```

Didefinisikan dalam: [cli/src/routeGeneration/routeGenerator.ts:23](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/routeGeneration/routeGenerator.ts#L23)

Membangun metadata model waktu-jalan yang dikonsumsi oleh penangan rute yang dihasilkan.

#### Kembali

`Models`

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

***

### GenerateCustomRoutes()

```ts
abstract GenerateCustomRoutes(): Promise<void>;
```

Didefinisikan dalam: [cli/src/routeGeneration/routeGenerator.ts:20](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/routeGeneration/routeGenerator.ts#L20)

Menghasilkan keluaran rute yang dikonfigurasi bagi kerangka kerja aktif atau templat gubahan.

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

***

### pathTransformer()

```ts
protected pathTransformer(path): string;
```

Didefinisikan dalam: [cli/src/routeGeneration/routeGenerator.ts:71](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/routeGeneration/routeGenerator.ts#L71)

#### Parameter

##### path

`string`

#### Kembali

`string`

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
