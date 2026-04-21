---
lastUpdated: 2026-04-20T21:59:41.337Z
---
[tsoa-next](../../packages.md) / [tsoa-next](../index.md) / HapiTemplateService

# الفئة: HapiTemplateService

محددة في: [packages/runtime/src/routeGeneration/templates/hapi/hapiTemplateService.ts:45](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/hapi/hapiTemplateService.ts#L45)

Hapi- التنفيذ المحدد لعقد خدمات نموذج المسار المولد.

## التذييلات

- [`TemplateService`](TemplateService.md)\<`HapiApiHandlerParameters`, `HapiValidationArgsParameters`, `HapiReturnHandlerParameters`\>

## Constructors

### المؤسسة

```ts
new HapiTemplateService(
   models, 
   config, 
   hapi): HapiTemplateService;
```

محددة في: [packages/runtime/src/routeGeneration/templates/hapi/hapiTemplateService.ts:46](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/hapi/hapiTemplateService.ts#L46)

#### البارامترات

##### models

[`Models`](../namespaces/TsoaRoute/interfaces/Models.md)

##### config

[`AdditionalProps`](../interfaces/AdditionalProps.md)

##### hapi

###### boomify

###### isBoom

#### العودة

`HapiTemplateService`

#### تجاوزات

[`TemplateService`](TemplateService.md).[`constructor`](TemplateService.md#constructor)

## الممتلكات

### config

```ts
protected readonly config: AdditionalProps;
```

محددة في: [packages/runtime/src/routeGeneration/templates/hapi/hapiTemplateService.ts:48](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/hapi/hapiTemplateService.ts#L48)

#### تجاوزات

[`TemplateService`](TemplateService.md).[`config`](TemplateService.md#config)

***

### models

```ts
protected readonly models: Models;
```

محددة في: [packages/runtime/src/routeGeneration/templates/hapi/hapiTemplateService.ts:47](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/hapi/hapiTemplateService.ts#L47)

#### تجاوزات

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
apiHandler(params): Promise<unknown>;
```

محددة في: [packages/runtime/src/routeGeneration/templates/hapi/hapiTemplateService.ts:57](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/hapi/hapiTemplateService.ts#L57)

يَدْفعُ عملَ المتحكمِ للظهورِ النشطِ.

#### البارامترات

##### params

`HapiApiHandlerParameters`

#### العودة

`Promise`\<`unknown`\>

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

محددة في: [packages/runtime/src/routeGeneration/templates/hapi/hapiTemplateService.ts:88](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/hapi/hapiTemplateService.ts#L88)

ويقيم ويطبيع الحجج المستقاة من الطلب.

#### البارامترات

##### params

`HapiValidationArgsParameters`

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
protected returnHandler(params): unknown;
```

محددة في: [packages/runtime/src/routeGeneration/templates/hapi/hapiTemplateService.ts:148](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/hapi/hapiTemplateService.ts#L148)

يكتب المتحكم يعود إلى العمل

#### البارامترات

##### params

`HapiReturnHandlerParameters`

#### العودة

`unknown`

#### تجاوزات

[`TemplateService`](TemplateService.md).[`returnHandler`](TemplateService.md#returnhandler)
