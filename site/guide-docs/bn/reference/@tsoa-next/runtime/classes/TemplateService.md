---
lastUpdated: 2026-04-20T21:59:41.308Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/runtime](../index.md) / TemplateService

# অ্যাবস্ট্র্যাক্টাল ক্লাস: টেমপ্লেট\<ApiHandlerParameters, ValidationArgsParameters, ReturnHandlerParameters\>

নির্ধারিত মান: [packages/runtime/src/routeGeneration/templates/templateService.ts:9](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/templateService.ts#L9)

বিভিন্ন রুটের মাধ্যমে ব্যবহার করা সুনির্দিষ্ট টেমপ্লেট সার্ভিসের জন্য শেয়ার বেস ক্লাস।

## এক্সটেন্ডেড

- [`ExpressTemplateService`](ExpressTemplateService.md)
- [`HapiTemplateService`](HapiTemplateService.md)
- [`KoaTemplateService`](KoaTemplateService.md)

## পরামিতির পরামিতি

### ApiHandlerParameters

`ApiHandlerParameters`

### ValidationArgsParameters

`ValidationArgsParameters`

### ReturnHandlerParameters

`ReturnHandlerParameters`

## কনস্ট্রাক্টর

### কনস্ট্রাক্টর

```ts
new TemplateService<ApiHandlerParameters, ValidationArgsParameters, ReturnHandlerParameters>(models, config): TemplateService<ApiHandlerParameters, ValidationArgsParameters, ReturnHandlerParameters>;
```

নির্ধারিত মান: [packages/runtime/src/routeGeneration/templates/templateService.ts:12](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/templateService.ts#L12)

#### পরামিতি

##### models

[`Models`](../namespaces/TsoaRoute/interfaces/Models.md)

##### config

[`AdditionalProps`](../interfaces/AdditionalProps.md)

#### প্রাপ্ত মান

`TemplateService`\<`ApiHandlerParameters`, `ValidationArgsParameters`, `ReturnHandlerParameters`\>

## বৈশিষ্ট্য

### config

```ts
protected readonly config: AdditionalProps;
```

নির্ধারিত মান: [packages/runtime/src/routeGeneration/templates/templateService.ts:14](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/templateService.ts#L14)

***

### models

```ts
protected readonly models: Models;
```

নির্ধারিত মান: [packages/runtime/src/routeGeneration/templates/templateService.ts:13](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/templateService.ts#L13)

***

### validationService

```ts
protected validationService: ValidationService;
```

নির্ধারিত মান: [packages/runtime/src/routeGeneration/templates/templateService.ts:10](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/templateService.ts#L10)

## পদ্ধতি

### apiHandler()

```ts
abstract apiHandler(params): Promise<unknown>;
```

নির্ধারিত মান: [packages/runtime/src/routeGeneration/templates/templateService.ts:20](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/templateService.ts#L20)

সক্রিয় অবস্থায় কন্ট্রোলার চালু করবে।

#### পরামিতি

##### params

`ApiHandlerParameters`

#### প্রাপ্ত মান

`Promise`\<`unknown`\>

***

### buildPromise()

```ts
protected buildPromise(
   methodName, 
   controller, 
validatedArgs): Promise<unknown>;
```

নির্ধারিত মান: [packages/runtime/src/routeGeneration/templates/templateService.ts:77](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/templateService.ts#L77)

#### পরামিতি

##### methodName

`string`

##### controller

`object` \| [`Controller`](Controller.md)

##### validatedArgs

`unknown`[]

#### প্রাপ্ত মান

`Promise`\<`unknown`\>

***

### getBodyProperty()

```ts
protected getBodyProperty(
   body, 
   headers, 
   propertyName): unknown;
```

নির্ধারিত মান: [packages/runtime/src/routeGeneration/templates/templateService.ts:62](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/templateService.ts#L62)

#### পরামিতি

##### body

`unknown`

##### headers

`Record`\<`string`, `unknown`\>

##### propertyName

`string`

#### প্রাপ্ত মান

`unknown`

***

### getValidatedArgs()

```ts
abstract getValidatedArgs(params): unknown[];
```

নির্ধারিত মান: [packages/runtime/src/routeGeneration/templates/templateService.ts:23](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/templateService.ts#L23)

অনুরোধ থেকে রুটের যুক্তিকে স্বাভাবিক ভাবে যাচাই করে দেখা।

#### পরামিতি

##### params

`ValidationArgsParameters`

#### প্রাপ্ত মান

`unknown`[]

***

### isController()

```ts
protected isController(object): object is Controller;
```

নির্ধারিত মান: [packages/runtime/src/routeGeneration/templates/templateService.ts:28](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/templateService.ts#L28)

#### পরামিতি

##### object

`object` \| [`Controller`](Controller.md)

#### প্রাপ্ত মান

`object is Controller`

***

### isRecord()

```ts
protected isRecord(value): value is Record<string, unknown>;
```

নির্ধারিত মান: [packages/runtime/src/routeGeneration/templates/templateService.ts:73](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/templateService.ts#L73)

#### পরামিতি

##### value

`unknown`

#### প্রাপ্ত মান

`value is Record<string, unknown>`

***

### normalizeRequestBody()

```ts
protected normalizeRequestBody(body, headers): unknown;
```

নির্ধারিত মান: [packages/runtime/src/routeGeneration/templates/templateService.ts:54](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/templateService.ts#L54)

#### পরামিতি

##### body

`unknown`

##### headers

`Record`\<`string`, `unknown`\>

#### প্রাপ্ত মান

`unknown`

***

### requestHasBody()

```ts
protected requestHasBody(headers): boolean;
```

নির্ধারিত মান: [packages/runtime/src/routeGeneration/templates/templateService.ts:32](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/templateService.ts#L32)

#### পরামিতি

##### headers

`Record`\<`string`, `unknown`\>

#### প্রাপ্ত মান

`boolean`

***

### requestUsesTransferEncoding()

```ts
protected requestUsesTransferEncoding(headers): boolean;
```

নির্ধারিত মান: [packages/runtime/src/routeGeneration/templates/templateService.ts:50](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/templateService.ts#L50)

#### পরামিতি

##### headers

`Record`\<`string`, `unknown`\>

#### প্রাপ্ত মান

`boolean`

***

### returnHandler()

```ts
abstract protected returnHandler(params): unknown;
```

নির্ধারিত মান: [packages/runtime/src/routeGeneration/templates/templateService.ts:26](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/templateService.ts#L26)

তারা সক্রিয় অবস্থায় ফিরে আসে।

#### পরামিতি

##### params

`ReturnHandlerParameters`

#### প্রাপ্ত মান

`unknown`
