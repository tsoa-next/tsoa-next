---
lastUpdated: 2026-04-20T21:59:41.337Z
---
[tsoa-next](../../packages.md) / [tsoa-next](../index.md) / HapiTemplateService

# শ্রেণী

নির্ধারিত মান: [packages/runtime/src/routeGeneration/templates/hapi/hapiTemplateService.ts:45](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/hapi/hapiTemplateService.ts#L45)

Hapi- স্থাপিত রুট সার্ভিস চুক্তির সুনির্দিষ্ট বাস্তবায়ন।

## সফল

- [`TemplateService`](TemplateService.md)\<`HapiApiHandlerParameters`, `HapiValidationArgsParameters`, `HapiReturnHandlerParameters`\>

## কনস্ট্রাক্টর

### কনস্ট্রাক্টর

```ts
new HapiTemplateService(
   models, 
   config, 
   hapi): HapiTemplateService;
```

নির্ধারিত মান: [packages/runtime/src/routeGeneration/templates/hapi/hapiTemplateService.ts:46](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/hapi/hapiTemplateService.ts#L46)

#### পরামিতি

##### models

[`Models`](../namespaces/TsoaRoute/interfaces/Models.md)

##### config

[`AdditionalProps`](../interfaces/AdditionalProps.md)

##### hapi

###### boomify

###### isBoom

#### প্রাপ্ত মান

`HapiTemplateService`

#### উপেক্ষা করা হবে

[`TemplateService`](TemplateService.md).[`constructor`](TemplateService.md#constructor)

## বৈশিষ্ট্য

### config

```ts
protected readonly config: AdditionalProps;
```

নির্ধারিত মান: [packages/runtime/src/routeGeneration/templates/hapi/hapiTemplateService.ts:48](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/hapi/hapiTemplateService.ts#L48)

#### উপেক্ষা করা হবে

[`TemplateService`](TemplateService.md).[`config`](TemplateService.md#config)

***

### models

```ts
protected readonly models: Models;
```

নির্ধারিত মান: [packages/runtime/src/routeGeneration/templates/hapi/hapiTemplateService.ts:47](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/hapi/hapiTemplateService.ts#L47)

#### উপেক্ষা করা হবে

[`TemplateService`](TemplateService.md).[`models`](TemplateService.md#models)

***

### validationService

```ts
protected validationService: ValidationService;
```

নির্ধারিত মান: [packages/runtime/src/routeGeneration/templates/templateService.ts:10](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/templateService.ts#L10)

#### প্রথমে যে ফন্টটি ব্যবহৃত হবে; যেমন: 'Serif 27'

[`TemplateService`](TemplateService.md).[`validationService`](TemplateService.md#validationservice)

## পদ্ধতি

### apiHandler()

```ts
apiHandler(params): Promise<unknown>;
```

নির্ধারিত মান: [packages/runtime/src/routeGeneration/templates/hapi/hapiTemplateService.ts:57](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/hapi/hapiTemplateService.ts#L57)

সক্রিয় অবস্থায় কন্ট্রোলার চালু করবে।

#### পরামিতি

##### params

`HapiApiHandlerParameters`

#### প্রাপ্ত মান

`Promise`\<`unknown`\>

#### উপেক্ষা করা হবে

[`TemplateService`](TemplateService.md).[`apiHandler`](TemplateService.md#apihandler)

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

#### প্রথমে যে ফন্টটি ব্যবহৃত হবে; যেমন: 'Serif 27'

[`TemplateService`](TemplateService.md).[`buildPromise`](TemplateService.md#buildpromise)

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

#### প্রথমে যে ফন্টটি ব্যবহৃত হবে; যেমন: 'Serif 27'

[`TemplateService`](TemplateService.md).[`getBodyProperty`](TemplateService.md#getbodyproperty)

***

### getValidatedArgs()

```ts
getValidatedArgs(params): unknown[];
```

নির্ধারিত মান: [packages/runtime/src/routeGeneration/templates/hapi/hapiTemplateService.ts:88](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/hapi/hapiTemplateService.ts#L88)

অনুরোধ থেকে রুটের যুক্তিকে স্বাভাবিক ভাবে যাচাই করে দেখা।

#### পরামিতি

##### params

`HapiValidationArgsParameters`

#### প্রাপ্ত মান

`unknown`[]

#### উপেক্ষা করা হবে

[`TemplateService`](TemplateService.md).[`getValidatedArgs`](TemplateService.md#getvalidatedargs)

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

#### প্রথমে যে ফন্টটি ব্যবহৃত হবে; যেমন: 'Serif 27'

[`TemplateService`](TemplateService.md).[`isController`](TemplateService.md#iscontroller)

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

#### প্রথমে যে ফন্টটি ব্যবহৃত হবে; যেমন: 'Serif 27'

[`TemplateService`](TemplateService.md).[`isRecord`](TemplateService.md#isrecord)

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

#### প্রথমে যে ফন্টটি ব্যবহৃত হবে; যেমন: 'Serif 27'

[`TemplateService`](TemplateService.md).[`normalizeRequestBody`](TemplateService.md#normalizerequestbody)

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

#### প্রথমে যে ফন্টটি ব্যবহৃত হবে; যেমন: 'Serif 27'

[`TemplateService`](TemplateService.md).[`requestHasBody`](TemplateService.md#requesthasbody)

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

#### প্রথমে যে ফন্টটি ব্যবহৃত হবে; যেমন: 'Serif 27'

[`TemplateService`](TemplateService.md).[`requestUsesTransferEncoding`](TemplateService.md#requestusestransferencoding)

***

### returnHandler()

```ts
protected returnHandler(params): unknown;
```

নির্ধারিত মান: [packages/runtime/src/routeGeneration/templates/hapi/hapiTemplateService.ts:148](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/hapi/hapiTemplateService.ts#L148)

তারা সক্রিয় অবস্থায় ফিরে আসে।

#### পরামিতি

##### params

`HapiReturnHandlerParameters`

#### প্রাপ্ত মান

`unknown`

#### উপেক্ষা করা হবে

[`TemplateService`](TemplateService.md).[`returnHandler`](TemplateService.md#returnhandler)
