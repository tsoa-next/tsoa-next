---
lastUpdated: 2026-04-20T21:59:41.306Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/cli](../index.md) / DefaultRouteGenerator

# Разработчик: DefaultRouteGenerator

Определено в: [cli/src/routeGeneration/defaultRouteGenerator.ts:11](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/routeGeneration/defaultRouteGenerator.ts#L11)

Генератор маршрутов по умолчанию для встроенного Express, Koaи Hapi шаблоны.

## расширять

- [`AbstractRouteGenerator`](AbstractRouteGenerator.md)\<[`ExtendedRoutesConfig`](../interfaces/ExtendedRoutesConfig.md)\>

## конструкторы

### Конструктор

```ts
new DefaultRouteGenerator(metadata, options): DefaultRouteGenerator;
```

Определено в: [cli/src/routeGeneration/defaultRouteGenerator.ts:14](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/routeGeneration/defaultRouteGenerator.ts#L14)

#### Параметры

##### metadata

`Metadata`

##### options

[`ExtendedRoutesConfig`](../interfaces/ExtendedRoutesConfig.md)

#### Возвращение

`DefaultRouteGenerator`

#### переопределение

[`AbstractRouteGenerator`](AbstractRouteGenerator.md).[`constructor`](AbstractRouteGenerator.md#constructor)

## Свойства

### metadata

```ts
protected readonly metadata: Metadata;
```

Определено в: [cli/src/routeGeneration/routeGenerator.ts:13](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/routeGeneration/routeGenerator.ts#L13)

#### Унаследованный от

[`AbstractRouteGenerator`](AbstractRouteGenerator.md).[`metadata`](AbstractRouteGenerator.md#metadata)

***

### options

```ts
protected readonly options: ExtendedRoutesConfig;
```

Определено в: [cli/src/routeGeneration/routeGenerator.ts:14](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/routeGeneration/routeGenerator.ts#L14)

#### Унаследованный от

[`AbstractRouteGenerator`](AbstractRouteGenerator.md).[`options`](AbstractRouteGenerator.md#options)

***

### pathTransformerFn

```ts
pathTransformerFn: (path) => string;
```

Определено в: [cli/src/routeGeneration/defaultRouteGenerator.ts:12](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/routeGeneration/defaultRouteGenerator.ts#L12)

#### Параметры

##### path

`string`

#### Возвращение

`string`

***

### template

```ts
template: string;
```

Определено в: [cli/src/routeGeneration/defaultRouteGenerator.ts:13](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/routeGeneration/defaultRouteGenerator.ts#L13)

## Методы

### buildContent()

```ts
buildContent(middlewareTemplate): string;
```

Определено в: [cli/src/routeGeneration/defaultRouteGenerator.ts:69](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/routeGeneration/defaultRouteGenerator.ts#L69)

Отображает шаблон маршрута с текущим контекстом метаданных.

#### Параметры

##### middlewareTemplate

`string`

#### Возвращение

`string`

***

### buildContext()

```ts
protected buildContext(): object;
```

Определено в: [cli/src/routeGeneration/routeGenerator.ts:76](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/routeGeneration/routeGenerator.ts#L76)

Построить Handlebars контекст шаблона, используемый шаблонами маршрутов по умолчанию.

#### Возвращение

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

###### Исполнитель: SwaggerConfig.bodyCoercion

```ts
bodyCoercion: boolean;
```

###### МинимумSwaggerConfig.noНеявные дополнительные свойства

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

#### Унаследованный от

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

Определено в: [cli/src/routeGeneration/routeGenerator.ts:157](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/routeGeneration/routeGenerator.ts#L157)

#### Параметры

##### useSpecPaths

`boolean`

#### Возвращение

  \| \{
  `spec`: `Spec`;
  `yaml`: `string`;
\}
  \| `undefined`

#### Унаследованный от

[`AbstractRouteGenerator`](AbstractRouteGenerator.md).[`buildEmbeddedSpecGeneratorArtifacts`](AbstractRouteGenerator.md#buildembeddedspecgeneratorartifacts)

***

### buildModels()

```ts
buildModels(): Models;
```

Определено в: [cli/src/routeGeneration/routeGenerator.ts:23](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/routeGeneration/routeGenerator.ts#L23)

Создает метаданные модели выполнения, потребляемые генерируемыми обработчиками маршрутов.

#### Возвращение

`Models`

#### Унаследованный от

[`AbstractRouteGenerator`](AbstractRouteGenerator.md).[`buildModels`](AbstractRouteGenerator.md#buildmodels)

***

### buildParameterSchema()

```ts
protected buildParameterSchema(source): ParameterSchema;
```

Определено в: [cli/src/routeGeneration/routeGenerator.ts:199](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/routeGeneration/routeGenerator.ts#L199)

#### Параметры

##### source

`Parameter`

#### Возвращение

`ParameterSchema`

#### Унаследованный от

[`AbstractRouteGenerator`](AbstractRouteGenerator.md).[`buildParameterSchema`](AbstractRouteGenerator.md#buildparameterschema)

***

### buildProperty()

```ts
protected buildProperty(type): PropertySchema;
```

Определено в: [cli/src/routeGeneration/routeGenerator.ts:219](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/routeGeneration/routeGenerator.ts#L219)

#### Параметры

##### type

`Type`

#### Возвращение

`PropertySchema`

#### Унаследованный от

[`AbstractRouteGenerator`](AbstractRouteGenerator.md).[`buildProperty`](AbstractRouteGenerator.md#buildproperty)

***

### buildPropertySchema()

```ts
protected buildPropertySchema(source): PropertySchema;
```

Определено в: [cli/src/routeGeneration/routeGenerator.ts:188](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/routeGeneration/routeGenerator.ts#L188)

#### Параметры

##### source

`Property`

#### Возвращение

`PropertySchema`

#### Унаследованный от

[`AbstractRouteGenerator`](AbstractRouteGenerator.md).[`buildPropertySchema`](AbstractRouteGenerator.md#buildpropertyschema)

***

### GenerateCustomRoutes()

```ts
GenerateCustomRoutes(): Promise<void>;
```

Определено в: [cli/src/routeGeneration/defaultRouteGenerator.ts:37](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/routeGeneration/defaultRouteGenerator.ts#L37)

Загружает выбранный файл шаблона и генерирует выход маршрута.

#### Возвращение

`Promise`\<`void`\>

#### переопределение

[`AbstractRouteGenerator`](AbstractRouteGenerator.md).[`GenerateCustomRoutes`](AbstractRouteGenerator.md#generatecustomroutes)

***

### GenerateRoutes()

```ts
GenerateRoutes(middlewareTemplate): Promise<void>;
```

Определено в: [cli/src/routeGeneration/defaultRouteGenerator.ts:44](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/routeGeneration/defaultRouteGenerator.ts#L44)

Записывает сгенерированный файл маршрута на диск.

#### Параметры

##### middlewareTemplate

`string`

#### Возвращение

`Promise`\<`void`\>

***

### getRelativeImportPath()

```ts
protected getRelativeImportPath(fileLocation): string;
```

Определено в: [cli/src/routeGeneration/routeGenerator.ts:176](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/routeGeneration/routeGenerator.ts#L176)

#### Параметры

##### fileLocation

`string`

#### Возвращение

`string`

#### Унаследованный от

[`AbstractRouteGenerator`](AbstractRouteGenerator.md).[`getRelativeImportPath`](AbstractRouteGenerator.md#getrelativeimportpath)

***

### pathTransformer()

```ts
protected pathTransformer(path): string;
```

Определено в: [cli/src/routeGeneration/defaultRouteGenerator.ts:64](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/routeGeneration/defaultRouteGenerator.ts#L64)

#### Параметры

##### path

`string`

#### Возвращение

`string`

#### переопределение

[`AbstractRouteGenerator`](AbstractRouteGenerator.md).[`pathTransformer`](AbstractRouteGenerator.md#pathtransformer)

***

### shouldWriteFile()

```ts
protected shouldWriteFile(fileName, content): Promise<boolean>;
```

Определено в: [cli/src/routeGeneration/routeGenerator.ts:263](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/routeGeneration/routeGenerator.ts#L263)

#### Параметры

##### fileName

`string`

##### content

`string`

#### Возвращение

`Promise`\<`boolean`\>

#### Унаследованный от

[`AbstractRouteGenerator`](AbstractRouteGenerator.md).[`shouldWriteFile`](AbstractRouteGenerator.md#shouldwritefile)
