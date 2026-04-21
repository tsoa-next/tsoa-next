---
lastUpdated: 2026-04-20T21:59:41.337Z
---
[tsoa-next](../../packages.md) / [tsoa-next](../index.md) / KoaTemplateService

# Kelas: Layanan KoaTeplateService

Didefinisikan dalam: [packages/runtime/src/routeGeneration/templates/koa/koaTemplateService.ts:39](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/koa/koaTemplateService.ts#L39)

Koa-specific implementasi dari kontrak layanan template rute yang dihasilkan.

## Extending

- [`TemplateService`](TemplateService.md)\<`KoaApiHandlerParameters`, `KoaValidationArgsParameters`, `KoaReturnHandlerParameters`\>

## Konstruktor

### Konstruktor

```ts
new KoaTemplateService(models, config): KoaTemplateService;
```

Didefinisikan dalam: [packages/runtime/src/routeGeneration/templates/templateService.ts:12](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/templateService.ts#L12)

#### Parameter

##### models

[`Models`](../namespaces/TsoaRoute/interfaces/Models.md)

##### config

[`AdditionalProps`](../interfaces/AdditionalProps.md)

#### Kembali

`KoaTemplateService`

#### Diwarisi dari

[`TemplateService`](TemplateService.md).[`constructor`](TemplateService.md#constructor)

## Properti

### config

```ts
protected readonly config: AdditionalProps;
```

Didefinisikan dalam: [packages/runtime/src/routeGeneration/templates/templateService.ts:14](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/templateService.ts#L14)

#### Diwarisi dari

[`TemplateService`](TemplateService.md).[`config`](TemplateService.md#config)

***

### models

```ts
protected readonly models: Models;
```

Didefinisikan dalam: [packages/runtime/src/routeGeneration/templates/templateService.ts:13](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/templateService.ts#L13)

#### Diwarisi dari

[`TemplateService`](TemplateService.md).[`models`](TemplateService.md#models)

***

### validationService

```ts
protected validationService: ValidationService;
```

Didefinisikan dalam: [packages/runtime/src/routeGeneration/templates/templateService.ts:10](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/templateService.ts#L10)

#### Diwarisi dari

[`TemplateService`](TemplateService.md).[`validationService`](TemplateService.md#validationservice)

## Metode

### apiHandler()

```ts
apiHandler(params): Promise<void | Context>;
```

Didefinisikan dalam: [packages/runtime/src/routeGeneration/templates/koa/koaTemplateService.ts:40](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/koa/koaTemplateService.ts#L40)

Panggil pengontrol tindakan untuk waktu-jalan aktif.

#### Parameter

##### params

`KoaApiHandlerParameters`

#### Kembali

`Promise`\<`void` \| `Context`\>

#### Timpa

[`TemplateService`](TemplateService.md).[`apiHandler`](TemplateService.md#apihandler)

***

### buildPromise()

```ts
protected buildPromise(
   methodName, 
   controller, 
validatedArgs): Promise<unknown>;
```

Didefinisikan dalam: [packages/runtime/src/routeGeneration/templates/templateService.ts:77](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/templateService.ts#L77)

#### Parameter

##### methodName

`string`

##### controller

`object` \| [`Controller`](Controller.md)

##### validatedArgs

`unknown`[]

#### Kembali

`Promise`\<`unknown`\>

#### Diwarisi dari

[`TemplateService`](TemplateService.md).[`buildPromise`](TemplateService.md#buildpromise)

***

### getBodyProperty()

```ts
protected getBodyProperty(
   body, 
   headers, 
   propertyName): unknown;
```

Didefinisikan dalam: [packages/runtime/src/routeGeneration/templates/templateService.ts:62](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/templateService.ts#L62)

#### Parameter

##### body

`unknown`

##### headers

`Record`\<`string`, `unknown`\>

##### propertyName

`string`

#### Kembali

`unknown`

#### Diwarisi dari

[`TemplateService`](TemplateService.md).[`getBodyProperty`](TemplateService.md#getbodyproperty)

***

### getValidatedArgs()

```ts
getValidatedArgs(params): unknown[];
```

Didefinisikan dalam: [packages/runtime/src/routeGeneration/templates/koa/koaTemplateService.ts:64](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/koa/koaTemplateService.ts#L64)

Validasi dan normalisasi argumen rute diekstrak dari permintaan.

#### Parameter

##### params

`KoaValidationArgsParameters`

#### Kembali

`unknown`[]

#### Timpa

[`TemplateService`](TemplateService.md).[`getValidatedArgs`](TemplateService.md#getvalidatedargs)

***

### isController()

```ts
protected isController(object): object is Controller;
```

Didefinisikan dalam: [packages/runtime/src/routeGeneration/templates/templateService.ts:28](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/templateService.ts#L28)

#### Parameter

##### object

`object` \| [`Controller`](Controller.md)

#### Kembali

`object is Controller`

#### Diwarisi dari

[`TemplateService`](TemplateService.md).[`isController`](TemplateService.md#iscontroller)

***

### isRecord()

```ts
protected isRecord(value): value is Record<string, unknown>;
```

Didefinisikan dalam: [packages/runtime/src/routeGeneration/templates/templateService.ts:73](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/templateService.ts#L73)

#### Parameter

##### value

`unknown`

#### Kembali

`value is Record<string, unknown>`

#### Diwarisi dari

[`TemplateService`](TemplateService.md).[`isRecord`](TemplateService.md#isrecord)

***

### normalizeRequestBody()

```ts
protected normalizeRequestBody(body, headers): unknown;
```

Didefinisikan dalam: [packages/runtime/src/routeGeneration/templates/templateService.ts:54](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/templateService.ts#L54)

#### Parameter

##### body

`unknown`

##### headers

`Record`\<`string`, `unknown`\>

#### Kembali

`unknown`

#### Diwarisi dari

[`TemplateService`](TemplateService.md).[`normalizeRequestBody`](TemplateService.md#normalizerequestbody)

***

### requestHasBody()

```ts
protected requestHasBody(headers): boolean;
```

Didefinisikan dalam: [packages/runtime/src/routeGeneration/templates/templateService.ts:32](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/templateService.ts#L32)

#### Parameter

##### headers

`Record`\<`string`, `unknown`\>

#### Kembali

`boolean`

#### Diwarisi dari

[`TemplateService`](TemplateService.md).[`requestHasBody`](TemplateService.md#requesthasbody)

***

### requestUsesTransferEncoding()

```ts
protected requestUsesTransferEncoding(headers): boolean;
```

Didefinisikan dalam: [packages/runtime/src/routeGeneration/templates/templateService.ts:50](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/templateService.ts#L50)

#### Parameter

##### headers

`Record`\<`string`, `unknown`\>

#### Kembali

`boolean`

#### Diwarisi dari

[`TemplateService`](TemplateService.md).[`requestUsesTransferEncoding`](TemplateService.md#requestusestransferencoding)

***

### returnHandler()

```ts
protected returnHandler(params): Promise<void> | Context | undefined;
```

Didefinisikan dalam: [packages/runtime/src/routeGeneration/templates/koa/koaTemplateService.ts:134](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/koa/koaTemplateService.ts#L134)

Menulis pengontrol hasil kembali ke waktu-jalan aktif.

#### Parameter

##### params

`KoaReturnHandlerParameters`

#### Kembali

`Promise`\<`void`\> \| `Context` \| `undefined`

#### Timpa

[`TemplateService`](TemplateService.md).[`returnHandler`](TemplateService.md#returnhandler)
