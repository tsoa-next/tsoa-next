---
lastUpdated: 2026-04-20T21:59:41.308Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/runtime](../index.md) / KoaTemplateService

# الفئة: KoaTemplateService

محددة في: [packages/runtime/src/routeGeneration/templates/koa/koaTemplateService.ts:39](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/koa/koaTemplateService.ts#L39)

Koa- التنفيذ المحدد لعقد خدمات نموذج المسار المولد.

## التذييلات

- [`TemplateService`](TemplateService.md)\<`KoaApiHandlerParameters`, `KoaValidationArgsParameters`, `KoaReturnHandlerParameters`\>

## Constructors

### المؤسسة

```ts
new KoaTemplateService(models, config): KoaTemplateService;
```

محددة في: [packages/runtime/src/routeGeneration/templates/templateService.ts:12](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/templateService.ts#L12)

#### البارامترات

##### models

[`Models`](../namespaces/TsoaRoute/interfaces/Models.md)

##### config

[`AdditionalProps`](../interfaces/AdditionalProps.md)

#### العودة

`KoaTemplateService`

#### Inherited from

[`TemplateService`](TemplateService.md).[`constructor`](TemplateService.md#constructor)

## الممتلكات

### config

```ts
protected readonly config: AdditionalProps;
```

محددة في: [packages/runtime/src/routeGeneration/templates/templateService.ts:14](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/templateService.ts#L14)

#### Inherited from

[`TemplateService`](TemplateService.md).[`config`](TemplateService.md#config)

***

### models

```ts
protected readonly models: Models;
```

محددة في: [packages/runtime/src/routeGeneration/templates/templateService.ts:13](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/templateService.ts#L13)

#### Inherited from

[`TemplateService`](TemplateService.md).[`models`](TemplateService.md#models)

***

### validationService

```ts
protected validationService: ValidationService;
```

محددة في: [packages/runtime/src/routeGeneration/templates/templateService.ts:10](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/templateService.ts#L10)

#### Inherited from

[`TemplateService`](TemplateService.md).[`validationService`](TemplateService.md#validationservice)

## الطرائق

### apiHandler()

```ts
apiHandler(params): Promise<void | Context>;
```

محددة في: [packages/runtime/src/routeGeneration/templates/koa/koaTemplateService.ts:40](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/koa/koaTemplateService.ts#L40)

يَدْفعُ عملَ المتحكمِ للظهورِ النشطِ.

#### البارامترات

##### params

`KoaApiHandlerParameters`

#### العودة

`Promise`\<`void` \| `Context`\>

#### تجاوزات

[`TemplateService`](TemplateService.md).[`apiHandler`](TemplateService.md#apihandler)

***

### buildPromise()

```ts
protected buildPromise(
   methodName, 
   controller, 
validatedArgs): Promise<unknown>;
```

محددة في: [packages/runtime/src/routeGeneration/templates/templateService.ts:77](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/templateService.ts#L77)

#### البارامترات

##### methodName

`string`

##### controller

`object` \| [`Controller`](Controller.md)

##### validatedArgs

`unknown`[]

#### العودة

`Promise`\<`unknown`\>

#### Inherited from

[`TemplateService`](TemplateService.md).[`buildPromise`](TemplateService.md#buildpromise)

***

### getBodyProperty()

```ts
protected getBodyProperty(
   body, 
   headers, 
   propertyName): unknown;
```

محددة في: [packages/runtime/src/routeGeneration/templates/templateService.ts:62](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/templateService.ts#L62)

#### البارامترات

##### body

`unknown`

##### headers

`Record`\<`string`, `unknown`\>

##### propertyName

`string`

#### العودة

`unknown`

#### Inherited from

[`TemplateService`](TemplateService.md).[`getBodyProperty`](TemplateService.md#getbodyproperty)

***

### getValidatedArgs()

```ts
getValidatedArgs(params): unknown[];
```

محددة في: [packages/runtime/src/routeGeneration/templates/koa/koaTemplateService.ts:64](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/koa/koaTemplateService.ts#L64)

ويقيم ويطبيع الحجج المستقاة من الطلب.

#### البارامترات

##### params

`KoaValidationArgsParameters`

#### العودة

`unknown`[]

#### تجاوزات

[`TemplateService`](TemplateService.md).[`getValidatedArgs`](TemplateService.md#getvalidatedargs)

***

### isController()

```ts
protected isController(object): object is Controller;
```

محددة في: [packages/runtime/src/routeGeneration/templates/templateService.ts:28](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/templateService.ts#L28)

#### البارامترات

##### object

`object` \| [`Controller`](Controller.md)

#### العودة

`object is Controller`

#### Inherited from

[`TemplateService`](TemplateService.md).[`isController`](TemplateService.md#iscontroller)

***

### isRecord()

```ts
protected isRecord(value): value is Record<string, unknown>;
```

محددة في: [packages/runtime/src/routeGeneration/templates/templateService.ts:73](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/templateService.ts#L73)

#### البارامترات

##### value

`unknown`

#### العودة

`value is Record<string, unknown>`

#### Inherited from

[`TemplateService`](TemplateService.md).[`isRecord`](TemplateService.md#isrecord)

***

### normalizeRequestBody()

```ts
protected normalizeRequestBody(body, headers): unknown;
```

محددة في: [packages/runtime/src/routeGeneration/templates/templateService.ts:54](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/templateService.ts#L54)

#### البارامترات

##### body

`unknown`

##### headers

`Record`\<`string`, `unknown`\>

#### العودة

`unknown`

#### Inherited from

[`TemplateService`](TemplateService.md).[`normalizeRequestBody`](TemplateService.md#normalizerequestbody)

***

### requestHasBody()

```ts
protected requestHasBody(headers): boolean;
```

محددة في: [packages/runtime/src/routeGeneration/templates/templateService.ts:32](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/templateService.ts#L32)

#### البارامترات

##### headers

`Record`\<`string`, `unknown`\>

#### العودة

`boolean`

#### Inherited from

[`TemplateService`](TemplateService.md).[`requestHasBody`](TemplateService.md#requesthasbody)

***

### requestUsesTransferEncoding()

```ts
protected requestUsesTransferEncoding(headers): boolean;
```

محددة في: [packages/runtime/src/routeGeneration/templates/templateService.ts:50](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/templateService.ts#L50)

#### البارامترات

##### headers

`Record`\<`string`, `unknown`\>

#### العودة

`boolean`

#### Inherited from

[`TemplateService`](TemplateService.md).[`requestUsesTransferEncoding`](TemplateService.md#requestusestransferencoding)

***

### returnHandler()

```ts
protected returnHandler(params): Promise<void> | Context | undefined;
```

محددة في: [packages/runtime/src/routeGeneration/templates/koa/koaTemplateService.ts:134](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/koa/koaTemplateService.ts#L134)

يكتب المتحكم يعود إلى العمل

#### البارامترات

##### params

`KoaReturnHandlerParameters`

#### العودة

`Promise`\<`void`\> \| `Context` \| `undefined`

#### تجاوزات

[`TemplateService`](TemplateService.md).[`returnHandler`](TemplateService.md#returnhandler)
