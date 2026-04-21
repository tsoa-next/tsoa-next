---
lastUpdated: 2026-04-20T21:59:41.308Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/runtime](../index.md) / KoaTemplateService

# Класс: KoaTemplateService

Определено в: [packages/runtime/src/routeGeneration/templates/koa/koaTemplateService.ts:39](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/koa/koaTemplateService.ts#L39)

Koa-конкретная реализация сгенерированного контракта на обслуживание шаблонов маршрутов.

## расширять

- [`TemplateService`](TemplateService.md)\<`KoaApiHandlerParameters`, `KoaValidationArgsParameters`, `KoaReturnHandlerParameters`\>

## конструкторы

### Конструктор

```ts
new KoaTemplateService(models, config): KoaTemplateService;
```

Определено в: [packages/runtime/src/routeGeneration/templates/templateService.ts:12](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/templateService.ts#L12)

#### Параметры

##### models

[`Models`](../namespaces/TsoaRoute/interfaces/Models.md)

##### config

[`AdditionalProps`](../interfaces/AdditionalProps.md)

#### Возвращение

`KoaTemplateService`

#### Унаследованный от

[`TemplateService`](TemplateService.md).[`constructor`](TemplateService.md#constructor)

## Свойства

### config

```ts
protected readonly config: AdditionalProps;
```

Определено в: [packages/runtime/src/routeGeneration/templates/templateService.ts:14](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/templateService.ts#L14)

#### Унаследованный от

[`TemplateService`](TemplateService.md).[`config`](TemplateService.md#config)

***

### models

```ts
protected readonly models: Models;
```

Определено в: [packages/runtime/src/routeGeneration/templates/templateService.ts:13](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/templateService.ts#L13)

#### Унаследованный от

[`TemplateService`](TemplateService.md).[`models`](TemplateService.md#models)

***

### validationService

```ts
protected validationService: ValidationService;
```

Определено в: [packages/runtime/src/routeGeneration/templates/templateService.ts:10](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/templateService.ts#L10)

#### Унаследованный от

[`TemplateService`](TemplateService.md).[`validationService`](TemplateService.md#validationservice)

## Методы

### apiHandler()

```ts
apiHandler(params): Promise<void | Context>;
```

Определено в: [packages/runtime/src/routeGeneration/templates/koa/koaTemplateService.ts:40](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/koa/koaTemplateService.ts#L40)

Вызывает действие контроллера для активного времени выполнения.

#### Параметры

##### params

`KoaApiHandlerParameters`

#### Возвращение

`Promise`\<`void` \| `Context`\>

#### переопределение

[`TemplateService`](TemplateService.md).[`apiHandler`](TemplateService.md#apihandler)

***

### buildPromise()

```ts
protected buildPromise(
   methodName, 
   controller, 
validatedArgs): Promise<unknown>;
```

Определено в: [packages/runtime/src/routeGeneration/templates/templateService.ts:77](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/templateService.ts#L77)

#### Параметры

##### methodName

`string`

##### controller

`object` \| [`Controller`](Controller.md)

##### validatedArgs

`unknown`[]

#### Возвращение

`Promise`\<`unknown`\>

#### Унаследованный от

[`TemplateService`](TemplateService.md).[`buildPromise`](TemplateService.md#buildpromise)

***

### getBodyProperty()

```ts
protected getBodyProperty(
   body, 
   headers, 
   propertyName): unknown;
```

Определено в: [packages/runtime/src/routeGeneration/templates/templateService.ts:62](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/templateService.ts#L62)

#### Параметры

##### body

`unknown`

##### headers

`Record`\<`string`, `unknown`\>

##### propertyName

`string`

#### Возвращение

`unknown`

#### Унаследованный от

[`TemplateService`](TemplateService.md).[`getBodyProperty`](TemplateService.md#getbodyproperty)

***

### getValidatedArgs()

```ts
getValidatedArgs(params): unknown[];
```

Определено в: [packages/runtime/src/routeGeneration/templates/koa/koaTemplateService.ts:64](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/koa/koaTemplateService.ts#L64)

Проверяет и нормализует аргументы маршрута, извлеченные из запроса.

#### Параметры

##### params

`KoaValidationArgsParameters`

#### Возвращение

`unknown`[]

#### переопределение

[`TemplateService`](TemplateService.md).[`getValidatedArgs`](TemplateService.md#getvalidatedargs)

***

### isController()

```ts
protected isController(object): object is Controller;
```

Определено в: [packages/runtime/src/routeGeneration/templates/templateService.ts:28](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/templateService.ts#L28)

#### Параметры

##### object

`object` \| [`Controller`](Controller.md)

#### Возвращение

`object is Controller`

#### Унаследованный от

[`TemplateService`](TemplateService.md).[`isController`](TemplateService.md#iscontroller)

***

### isRecord()

```ts
protected isRecord(value): value is Record<string, unknown>;
```

Определено в: [packages/runtime/src/routeGeneration/templates/templateService.ts:73](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/templateService.ts#L73)

#### Параметры

##### value

`unknown`

#### Возвращение

`value is Record<string, unknown>`

#### Унаследованный от

[`TemplateService`](TemplateService.md).[`isRecord`](TemplateService.md#isrecord)

***

### normalizeRequestBody()

```ts
protected normalizeRequestBody(body, headers): unknown;
```

Определено в: [packages/runtime/src/routeGeneration/templates/templateService.ts:54](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/templateService.ts#L54)

#### Параметры

##### body

`unknown`

##### headers

`Record`\<`string`, `unknown`\>

#### Возвращение

`unknown`

#### Унаследованный от

[`TemplateService`](TemplateService.md).[`normalizeRequestBody`](TemplateService.md#normalizerequestbody)

***

### requestHasBody()

```ts
protected requestHasBody(headers): boolean;
```

Определено в: [packages/runtime/src/routeGeneration/templates/templateService.ts:32](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/templateService.ts#L32)

#### Параметры

##### headers

`Record`\<`string`, `unknown`\>

#### Возвращение

`boolean`

#### Унаследованный от

[`TemplateService`](TemplateService.md).[`requestHasBody`](TemplateService.md#requesthasbody)

***

### requestUsesTransferEncoding()

```ts
protected requestUsesTransferEncoding(headers): boolean;
```

Определено в: [packages/runtime/src/routeGeneration/templates/templateService.ts:50](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/templateService.ts#L50)

#### Параметры

##### headers

`Record`\<`string`, `unknown`\>

#### Возвращение

`boolean`

#### Унаследованный от

[`TemplateService`](TemplateService.md).[`requestUsesTransferEncoding`](TemplateService.md#requestusestransferencoding)

***

### returnHandler()

```ts
protected returnHandler(params): Promise<void> | Context | undefined;
```

Определено в: [packages/runtime/src/routeGeneration/templates/koa/koaTemplateService.ts:134](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/koa/koaTemplateService.ts#L134)

Записывает результат контроллера обратно в активное время выполнения.

#### Параметры

##### params

`KoaReturnHandlerParameters`

#### Возвращение

`Promise`\<`void`\> \| `Context` \| `undefined`

#### переопределение

[`TemplateService`](TemplateService.md).[`returnHandler`](TemplateService.md#returnhandler)
