---
lastUpdated: 2026-04-20T21:59:41.306Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/cli](../index.md) / DefaultRouteGenerator

# Clase: DefaultRouteGenerator

Definido en: [cli/src/routeGeneration/defaultRouteGenerator.ts:11](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/routeGeneration/defaultRouteGenerator.ts#L11)

Generador de ruta predeterminado para el Express, Koa, y Hapi plantillas.

## Extensión

- [`AbstractRouteGenerator`](AbstractRouteGenerator.md)\<[`ExtendedRoutesConfig`](../interfaces/ExtendedRoutesConfig.md)\>

## Constructores

### Constructor

```ts
new DefaultRouteGenerator(metadata, options): DefaultRouteGenerator;
```

Definido en: [cli/src/routeGeneration/defaultRouteGenerator.ts:14](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/routeGeneration/defaultRouteGenerator.ts#L14)

#### Parámetros

##### metadata

`Metadata`

##### options

[`ExtendedRoutesConfig`](../interfaces/ExtendedRoutesConfig.md)

#### Devoluciones

`DefaultRouteGenerator`

#### Anulaciones

[`AbstractRouteGenerator`](AbstractRouteGenerator.md).[`constructor`](AbstractRouteGenerator.md#constructor)

## Propiedades

### metadata

```ts
protected readonly metadata: Metadata;
```

Definido en: [cli/src/routeGeneration/routeGenerator.ts:13](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/routeGeneration/routeGenerator.ts#L13)

#### Inhered from

[`AbstractRouteGenerator`](AbstractRouteGenerator.md).[`metadata`](AbstractRouteGenerator.md#metadata)

***

### options

```ts
protected readonly options: ExtendedRoutesConfig;
```

Definido en: [cli/src/routeGeneration/routeGenerator.ts:14](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/routeGeneration/routeGenerator.ts#L14)

#### Inhered from

[`AbstractRouteGenerator`](AbstractRouteGenerator.md).[`options`](AbstractRouteGenerator.md#options)

***

### pathTransformerFn

```ts
pathTransformerFn: (path) => string;
```

Definido en: [cli/src/routeGeneration/defaultRouteGenerator.ts:12](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/routeGeneration/defaultRouteGenerator.ts#L12)

#### Parámetros

##### path

`string`

#### Devoluciones

`string`

***

### template

```ts
template: string;
```

Definido en: [cli/src/routeGeneration/defaultRouteGenerator.ts:13](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/routeGeneration/defaultRouteGenerator.ts#L13)

## Métodos

### buildContent()

```ts
buildContent(middlewareTemplate): string;
```

Definido en: [cli/src/routeGeneration/defaultRouteGenerator.ts:69](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/routeGeneration/defaultRouteGenerator.ts#L69)

Renders the route template with the current metadata context.

#### Parámetros

##### middlewareTemplate

`string`

#### Devoluciones

`string`

***

### buildContext()

```ts
protected buildContext(): object;
```

Definido en: [cli/src/routeGeneration/routeGenerator.ts:76](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/routeGeneration/routeGenerator.ts#L76)

Construye los Handlebars contexto de plantilla utilizado por las plantillas de ruta predeterminadas.

#### Devoluciones

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

###### minimalSwaggerConfig.bodyCoercion

```ts
bodyCoercion: boolean;
```

###### minimalSwaggerConfig.noImplicit

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

#### Inhered from

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

Definido en: [cli/src/routeGeneration/routeGenerator.ts:157](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/routeGeneration/routeGenerator.ts#L157)

#### Parámetros

##### useSpecPaths

`boolean`

#### Devoluciones

  \| \{
  `spec`: `Spec`;
  `yaml`: `string`;
\}
  \| `undefined`

#### Inhered from

[`AbstractRouteGenerator`](AbstractRouteGenerator.md).[`buildEmbeddedSpecGeneratorArtifacts`](AbstractRouteGenerator.md#buildembeddedspecgeneratorartifacts)

***

### buildModels()

```ts
buildModels(): Models;
```

Definido en: [cli/src/routeGeneration/routeGenerator.ts:23](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/routeGeneration/routeGenerator.ts#L23)

Construye los metadatos modelo de tiempo de ejecución consumidos por los manipuladores de rutas generados.

#### Devoluciones

`Models`

#### Inhered from

[`AbstractRouteGenerator`](AbstractRouteGenerator.md).[`buildModels`](AbstractRouteGenerator.md#buildmodels)

***

### buildParameterSchema()

```ts
protected buildParameterSchema(source): ParameterSchema;
```

Definido en: [cli/src/routeGeneration/routeGenerator.ts:199](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/routeGeneration/routeGenerator.ts#L199)

#### Parámetros

##### source

`Parameter`

#### Devoluciones

`ParameterSchema`

#### Inhered from

[`AbstractRouteGenerator`](AbstractRouteGenerator.md).[`buildParameterSchema`](AbstractRouteGenerator.md#buildparameterschema)

***

### buildProperty()

```ts
protected buildProperty(type): PropertySchema;
```

Definido en: [cli/src/routeGeneration/routeGenerator.ts:219](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/routeGeneration/routeGenerator.ts#L219)

#### Parámetros

##### type

`Type`

#### Devoluciones

`PropertySchema`

#### Inhered from

[`AbstractRouteGenerator`](AbstractRouteGenerator.md).[`buildProperty`](AbstractRouteGenerator.md#buildproperty)

***

### buildPropertySchema()

```ts
protected buildPropertySchema(source): PropertySchema;
```

Definido en: [cli/src/routeGeneration/routeGenerator.ts:188](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/routeGeneration/routeGenerator.ts#L188)

#### Parámetros

##### source

`Property`

#### Devoluciones

`PropertySchema`

#### Inhered from

[`AbstractRouteGenerator`](AbstractRouteGenerator.md).[`buildPropertySchema`](AbstractRouteGenerator.md#buildpropertyschema)

***

### GenerateCustomRoutes()

```ts
GenerateCustomRoutes(): Promise<void>;
```

Definido en: [cli/src/routeGeneration/defaultRouteGenerator.ts:37](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/routeGeneration/defaultRouteGenerator.ts#L37)

Carga el archivo de plantilla seleccionado y genera la salida de la ruta.

#### Devoluciones

`Promise`\<`void`\>

#### Anulaciones

[`AbstractRouteGenerator`](AbstractRouteGenerator.md).[`GenerateCustomRoutes`](AbstractRouteGenerator.md#generatecustomroutes)

***

### GenerateRoutes()

```ts
GenerateRoutes(middlewareTemplate): Promise<void>;
```

Definido en: [cli/src/routeGeneration/defaultRouteGenerator.ts:44](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/routeGeneration/defaultRouteGenerator.ts#L44)

Escribe el archivo de ruta generado al disco.

#### Parámetros

##### middlewareTemplate

`string`

#### Devoluciones

`Promise`\<`void`\>

***

### getRelativeImportPath()

```ts
protected getRelativeImportPath(fileLocation): string;
```

Definido en: [cli/src/routeGeneration/routeGenerator.ts:176](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/routeGeneration/routeGenerator.ts#L176)

#### Parámetros

##### fileLocation

`string`

#### Devoluciones

`string`

#### Inhered from

[`AbstractRouteGenerator`](AbstractRouteGenerator.md).[`getRelativeImportPath`](AbstractRouteGenerator.md#getrelativeimportpath)

***

### pathTransformer()

```ts
protected pathTransformer(path): string;
```

Definido en: [cli/src/routeGeneration/defaultRouteGenerator.ts:64](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/routeGeneration/defaultRouteGenerator.ts#L64)

#### Parámetros

##### path

`string`

#### Devoluciones

`string`

#### Anulaciones

[`AbstractRouteGenerator`](AbstractRouteGenerator.md).[`pathTransformer`](AbstractRouteGenerator.md#pathtransformer)

***

### shouldWriteFile()

```ts
protected shouldWriteFile(fileName, content): Promise<boolean>;
```

Definido en: [cli/src/routeGeneration/routeGenerator.ts:263](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/routeGeneration/routeGenerator.ts#L263)

#### Parámetros

##### fileName

`string`

##### content

`string`

#### Devoluciones

`Promise`\<`boolean`\>

#### Inhered from

[`AbstractRouteGenerator`](AbstractRouteGenerator.md).[`shouldWriteFile`](AbstractRouteGenerator.md#shouldwritefile)
