---
lastUpdated: 2026-04-20T21:59:41.308Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/runtime](../index.md) / TemplateService

# Kelas Abstract: TemplateService\<ApiHandlerParameters, ValidationArgsParameters, ReturnHandlerParameters\>

Didefinisikan dalam: [packages/runtime/src/routeGeneration/templates/templateService.ts:9](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/templateService.ts#L9)

Kelas dasar bersama bagi layanan template runtime- spesifik yang digunakan oleh rute yang dihasilkan.

## Diperluas oleh

- [`ExpressTemplateService`](ExpressTemplateService.md)
- [`HapiTemplateService`](HapiTemplateService.md)
- [`KoaTemplateService`](KoaTemplateService.md)

## Parameter Tipe

### ApiHandlerParameters

`ApiHandlerParameters`

### ValidationArgsParameters

`ValidationArgsParameters`

### ReturnHandlerParameters

`ReturnHandlerParameters`

## Konstruktor

### Konstruktor

```ts
new TemplateService<ApiHandlerParameters, ValidationArgsParameters, ReturnHandlerParameters>(models, config): TemplateService<ApiHandlerParameters, ValidationArgsParameters, ReturnHandlerParameters>;
```

Didefinisikan dalam: [packages/runtime/src/routeGeneration/templates/templateService.ts:12](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/templateService.ts#L12)

#### Parameter

##### models

[`Models`](../namespaces/TsoaRoute/interfaces/Models.md)

##### config

[`AdditionalProps`](../interfaces/AdditionalProps.md)

#### Kembali

`TemplateService`\<`ApiHandlerParameters`, `ValidationArgsParameters`, `ReturnHandlerParameters`\>

## Properti

### config

```ts
protected readonly config: AdditionalProps;
```

Didefinisikan dalam: [packages/runtime/src/routeGeneration/templates/templateService.ts:14](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/templateService.ts#L14)

***

### models

```ts
protected readonly models: Models;
```

Didefinisikan dalam: [packages/runtime/src/routeGeneration/templates/templateService.ts:13](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/templateService.ts#L13)

***

### validationService

```ts
protected validationService: ValidationService;
```

Didefinisikan dalam: [packages/runtime/src/routeGeneration/templates/templateService.ts:10](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/templateService.ts#L10)

## Metode

### apiHandler()

```ts
abstract apiHandler(params): Promise<unknown>;
```

Didefinisikan dalam: [packages/runtime/src/routeGeneration/templates/templateService.ts:20](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/templateService.ts#L20)

Panggil pengontrol tindakan untuk waktu-jalan aktif.

#### Parameter

##### params

`ApiHandlerParameters`

#### Kembali

`Promise`\<`unknown`\>

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

***

### getValidatedArgs()

```ts
abstract getValidatedArgs(params): unknown[];
```

Didefinisikan dalam: [packages/runtime/src/routeGeneration/templates/templateService.ts:23](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/templateService.ts#L23)

Validasi dan normalisasi argumen rute diekstrak dari permintaan.

#### Parameter

##### params

`ValidationArgsParameters`

#### Kembali

`unknown`[]

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

***

### returnHandler()

```ts
abstract protected returnHandler(params): unknown;
```

Didefinisikan dalam: [packages/runtime/src/routeGeneration/templates/templateService.ts:26](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/templateService.ts#L26)

Menulis pengontrol hasil kembali ke waktu-jalan aktif.

#### Parameter

##### params

`ReturnHandlerParameters`

#### Kembali

`unknown`
