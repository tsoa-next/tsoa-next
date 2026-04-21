---
lastUpdated: 2026-04-20T21:59:41.337Z
---
[tsoa-next](../../packages.md) / [tsoa-next](../index.md) / ExpressTemplateService

# कक्षा: एक्सप्रेसटेम्पलेट सर्विस

में परिभाषित: [packages/runtime/src/routeGeneration/templates/express/expressTemplateService.ts:37](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/express/expressTemplateService.ts#L37)

Expressउत्पन्न मार्ग टेम्पलेट सेवा अनुबंध के विशिष्ट कार्यान्वयन।

## विस्तार

- [`TemplateService`](TemplateService.md)\<`ExpressApiHandlerParameters`, `ExpressValidationArgsParameters`, `ExpressReturnHandlerParameters`\>

## कंस्ट्रक्टर

### रचनाकार

```ts
new ExpressTemplateService(models, config): ExpressTemplateService;
```

में परिभाषित: [packages/runtime/src/routeGeneration/templates/templateService.ts:12](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/templateService.ts#L12)

#### पैरामीटर

##### models

[`Models`](../namespaces/TsoaRoute/interfaces/Models.md)

##### config

[`AdditionalProps`](../interfaces/AdditionalProps.md)

#### रिटर्न

`ExpressTemplateService`

#### से विरासत

[`TemplateService`](TemplateService.md).[`constructor`](TemplateService.md#constructor)

## गुण

### config

```ts
protected readonly config: AdditionalProps;
```

में परिभाषित: [packages/runtime/src/routeGeneration/templates/templateService.ts:14](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/templateService.ts#L14)

#### से विरासत

[`TemplateService`](TemplateService.md).[`config`](TemplateService.md#config)

***

### models

```ts
protected readonly models: Models;
```

में परिभाषित: [packages/runtime/src/routeGeneration/templates/templateService.ts:13](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/templateService.ts#L13)

#### से विरासत

[`TemplateService`](TemplateService.md).[`models`](TemplateService.md#models)

***

### validationService

```ts
protected validationService: ValidationService;
```

में परिभाषित: [packages/runtime/src/routeGeneration/templates/templateService.ts:10](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/templateService.ts#L10)

#### से विरासत

[`TemplateService`](TemplateService.md).[`validationService`](TemplateService.md#validationservice)

## विधि

### apiHandler()

```ts
apiHandler(params): Promise<void>;
```

में परिभाषित: [packages/runtime/src/routeGeneration/templates/express/expressTemplateService.ts:38](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/express/expressTemplateService.ts#L38)

सक्रिय रनटाइम के लिए नियंत्रक कार्रवाई को आमंत्रित करता है।

#### पैरामीटर

##### params

`ExpressApiHandlerParameters`

#### रिटर्न

`Promise`\<`void`\>

#### ओवरराइड

[`TemplateService`](TemplateService.md).[`apiHandler`](TemplateService.md#apihandler)

***

### buildPromise()

```ts
protected buildPromise(
   methodName, 
   controller, 
validatedArgs): Promise<unknown>;
```

में परिभाषित: [packages/runtime/src/routeGeneration/templates/templateService.ts:77](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/templateService.ts#L77)

#### पैरामीटर

##### methodName

`string`

##### controller

`object` \| [`Controller`](Controller.md)

##### validatedArgs

`unknown`[]

#### रिटर्न

`Promise`\<`unknown`\>

#### से विरासत

[`TemplateService`](TemplateService.md).[`buildPromise`](TemplateService.md#buildpromise)

***

### getBodyProperty()

```ts
protected getBodyProperty(
   body, 
   headers, 
   propertyName): unknown;
```

में परिभाषित: [packages/runtime/src/routeGeneration/templates/templateService.ts:62](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/templateService.ts#L62)

#### पैरामीटर

##### body

`unknown`

##### headers

`Record`\<`string`, `unknown`\>

##### propertyName

`string`

#### रिटर्न

`unknown`

#### से विरासत

[`TemplateService`](TemplateService.md).[`getBodyProperty`](TemplateService.md#getbodyproperty)

***

### getValidatedArgs()

```ts
getValidatedArgs(params): unknown[];
```

में परिभाषित: [packages/runtime/src/routeGeneration/templates/express/expressTemplateService.ts:56](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/express/expressTemplateService.ts#L56)

अनुरोध से निकाले गए मार्ग तर्कों को मान्य और सामान्यीकृत करता है।

#### पैरामीटर

##### params

`ExpressValidationArgsParameters`

#### रिटर्न

`unknown`[]

#### ओवरराइड

[`TemplateService`](TemplateService.md).[`getValidatedArgs`](TemplateService.md#getvalidatedargs)

***

### isController()

```ts
protected isController(object): object is Controller;
```

में परिभाषित: [packages/runtime/src/routeGeneration/templates/templateService.ts:28](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/templateService.ts#L28)

#### पैरामीटर

##### object

`object` \| [`Controller`](Controller.md)

#### रिटर्न

`object is Controller`

#### से विरासत

[`TemplateService`](TemplateService.md).[`isController`](TemplateService.md#iscontroller)

***

### isRecord()

```ts
protected isRecord(value): value is Record<string, unknown>;
```

में परिभाषित: [packages/runtime/src/routeGeneration/templates/templateService.ts:73](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/templateService.ts#L73)

#### पैरामीटर

##### value

`unknown`

#### रिटर्न

`value is Record<string, unknown>`

#### से विरासत

[`TemplateService`](TemplateService.md).[`isRecord`](TemplateService.md#isrecord)

***

### normalizeRequestBody()

```ts
protected normalizeRequestBody(body, headers): unknown;
```

में परिभाषित: [packages/runtime/src/routeGeneration/templates/templateService.ts:54](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/templateService.ts#L54)

#### पैरामीटर

##### body

`unknown`

##### headers

`Record`\<`string`, `unknown`\>

#### रिटर्न

`unknown`

#### से विरासत

[`TemplateService`](TemplateService.md).[`normalizeRequestBody`](TemplateService.md#normalizerequestbody)

***

### requestHasBody()

```ts
protected requestHasBody(headers): boolean;
```

में परिभाषित: [packages/runtime/src/routeGeneration/templates/templateService.ts:32](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/templateService.ts#L32)

#### पैरामीटर

##### headers

`Record`\<`string`, `unknown`\>

#### रिटर्न

`boolean`

#### से विरासत

[`TemplateService`](TemplateService.md).[`requestHasBody`](TemplateService.md#requesthasbody)

***

### requestUsesTransferEncoding()

```ts
protected requestUsesTransferEncoding(headers): boolean;
```

में परिभाषित: [packages/runtime/src/routeGeneration/templates/templateService.ts:50](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/templateService.ts#L50)

#### पैरामीटर

##### headers

`Record`\<`string`, `unknown`\>

#### रिटर्न

`boolean`

#### से विरासत

[`TemplateService`](TemplateService.md).[`requestUsesTransferEncoding`](TemplateService.md#requestusestransferencoding)

***

### returnHandler()

```ts
protected returnHandler(params): void;
```

में परिभाषित: [packages/runtime/src/routeGeneration/templates/express/expressTemplateService.ts:126](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/express/expressTemplateService.ts#L126)

नियंत्रक को सक्रिय रनटाइम का परिणाम देता है।

#### पैरामीटर

##### params

`ExpressReturnHandlerParameters`

#### रिटर्न

`void`

#### ओवरराइड

[`TemplateService`](TemplateService.md).[`returnHandler`](TemplateService.md#returnhandler)
