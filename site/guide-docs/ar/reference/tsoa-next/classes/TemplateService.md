---
lastUpdated: 2026-04-20T21:59:41.337Z
---
[tsoa-next](../../packages.md) / [tsoa-next](../index.md) / TemplateService

# الرتبة المجردة: النموذج\<ApiHandlerParameters, ValidationArgsParameters, ReturnHandlerParameters\>

محددة في: [packages/runtime/src/routeGeneration/templates/templateService.ts:9](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/templateService.ts#L9)

حصة أساس متقاسمة لخدمات نموذجية محددة زمنياً تستخدمها طرق متولدة.

## Extended by

- [`ExpressTemplateService`](ExpressTemplateService.md)
- [`HapiTemplateService`](HapiTemplateService.md)
- [`KoaTemplateService`](KoaTemplateService.md)

## البارامترات النوعية

### ApiHandlerParameters

`ApiHandlerParameters`

### ValidationArgsParameters

`ValidationArgsParameters`

### ReturnHandlerParameters

`ReturnHandlerParameters`

## Constructors

### المؤسسة

```ts
new TemplateService<ApiHandlerParameters, ValidationArgsParameters, ReturnHandlerParameters>(models, config): TemplateService<ApiHandlerParameters, ValidationArgsParameters, ReturnHandlerParameters>;
```

محددة في: [packages/runtime/src/routeGeneration/templates/templateService.ts:12](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/templateService.ts#L12)

#### البارامترات

##### models

[`Models`](../namespaces/TsoaRoute/interfaces/Models.md)

##### config

[`AdditionalProps`](../interfaces/AdditionalProps.md)

#### العودة

`TemplateService`\<`ApiHandlerParameters`, `ValidationArgsParameters`, `ReturnHandlerParameters`\>

## الممتلكات

### config

```ts
protected readonly config: AdditionalProps;
```

محددة في: [packages/runtime/src/routeGeneration/templates/templateService.ts:14](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/templateService.ts#L14)

***

### models

```ts
protected readonly models: Models;
```

محددة في: [packages/runtime/src/routeGeneration/templates/templateService.ts:13](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/templateService.ts#L13)

***

### validationService

```ts
protected validationService: ValidationService;
```

محددة في: [packages/runtime/src/routeGeneration/templates/templateService.ts:10](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/templateService.ts#L10)

## الطرائق

### apiHandler()

```ts
abstract apiHandler(params): Promise<unknown>;
```

محددة في: [packages/runtime/src/routeGeneration/templates/templateService.ts:20](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/templateService.ts#L20)

يَدْفعُ عملَ المتحكمِ للظهورِ النشطِ.

#### البارامترات

##### params

`ApiHandlerParameters`

#### العودة

`Promise`\<`unknown`\>

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

***

### getValidatedArgs()

```ts
abstract getValidatedArgs(params): unknown[];
```

محددة في: [packages/runtime/src/routeGeneration/templates/templateService.ts:23](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/templateService.ts#L23)

ويقيم ويطبيع الحجج المستقاة من الطلب.

#### البارامترات

##### params

`ValidationArgsParameters`

#### العودة

`unknown`[]

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

***

### returnHandler()

```ts
abstract protected returnHandler(params): unknown;
```

محددة في: [packages/runtime/src/routeGeneration/templates/templateService.ts:26](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/templateService.ts#L26)

يكتب المتحكم يعود إلى العمل

#### البارامترات

##### params

`ReturnHandlerParameters`

#### العودة

`unknown`
