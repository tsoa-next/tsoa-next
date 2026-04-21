---
lastUpdated: 2026-04-20T21:59:41.306Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/cli](../index.md) / AbstractRouteGenerator

# Оригинальное название: AbstractRouteGenerator\<Config\>

Определено в: [cli/src/routeGeneration/routeGenerator.ts:11](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/routeGeneration/routeGenerator.ts#L11)

Реализация базы для генераторов маршрутов, которые преобразуют метаданные в файлы маршрутов, специфичные для фреймворков.

## расширенный

- [`DefaultRouteGenerator`](DefaultRouteGenerator.md)

## Параметры типа

### Config

`Config` *расширяется* [`ExtendedRoutesConfig`](../interfaces/ExtendedRoutesConfig.md)

## конструкторы

### Конструктор

```ts
new AbstractRouteGenerator<Config>(metadata, options): AbstractRouteGenerator<Config>;
```

Определено в: [cli/src/routeGeneration/routeGenerator.ts:12](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/routeGeneration/routeGenerator.ts#L12)

#### Параметры

##### metadata

`Metadata`

##### options

`Config`

#### Возвращение

`AbstractRouteGenerator`\<`Config`\>

## Свойства

### metadata

```ts
protected readonly metadata: Metadata;
```

Определено в: [cli/src/routeGeneration/routeGenerator.ts:13](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/routeGeneration/routeGenerator.ts#L13)

***

### options

```ts
protected readonly options: Config;
```

Определено в: [cli/src/routeGeneration/routeGenerator.ts:14](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/routeGeneration/routeGenerator.ts#L14)

## Методы

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

***

### buildModels()

```ts
buildModels(): Models;
```

Определено в: [cli/src/routeGeneration/routeGenerator.ts:23](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/routeGeneration/routeGenerator.ts#L23)

Создает метаданные модели выполнения, потребляемые генерируемыми обработчиками маршрутов.

#### Возвращение

`Models`

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

***

### GenerateCustomRoutes()

```ts
abstract GenerateCustomRoutes(): Promise<void>;
```

Определено в: [cli/src/routeGeneration/routeGenerator.ts:20](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/routeGeneration/routeGenerator.ts#L20)

Генерирует настроенный вывод маршрута для активной структуры или пользовательского шаблона.

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

***

### pathTransformer()

```ts
protected pathTransformer(path): string;
```

Определено в: [cli/src/routeGeneration/routeGenerator.ts:71](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/routeGeneration/routeGenerator.ts#L71)

#### Параметры

##### path

`string`

#### Возвращение

`string`

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
