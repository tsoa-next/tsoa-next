---
lastUpdated: 2026-04-20T21:59:41.337Z
---
[tsoa-next](../../packages.md) / [tsoa-next](../index.md) / HapiTemplateService

# Clase: HapiTemplateService

Definido en: [packages/runtime/src/routeGeneration/templates/hapi/hapiTemplateService.ts:45](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/hapi/hapiTemplateService.ts#L45)

Hapi- Aplicación específica del contrato de servicio de plantilla de ruta generada.

## Extensión

- [`TemplateService`](TemplateService.md)\<`HapiApiHandlerParameters`, `HapiValidationArgsParameters`, `HapiReturnHandlerParameters`\>

## Constructores

### Constructor

```ts
new HapiTemplateService(
   models, 
   config, 
   hapi): HapiTemplateService;
```

Definido en: [packages/runtime/src/routeGeneration/templates/hapi/hapiTemplateService.ts:46](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/hapi/hapiTemplateService.ts#L46)

#### Parámetros

##### models

[`Models`](../namespaces/TsoaRoute/interfaces/Models.md)

##### config

[`AdditionalProps`](../interfaces/AdditionalProps.md)

##### hapi

###### boomify

###### isBoom

#### Devoluciones

`HapiTemplateService`

#### Anulaciones

[`TemplateService`](TemplateService.md).[`constructor`](TemplateService.md#constructor)

## Propiedades

### config

```ts
protected readonly config: AdditionalProps;
```

Definido en: [packages/runtime/src/routeGeneration/templates/hapi/hapiTemplateService.ts:48](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/hapi/hapiTemplateService.ts#L48)

#### Anulaciones

[`TemplateService`](TemplateService.md).[`config`](TemplateService.md#config)

***

### models

```ts
protected readonly models: Models;
```

Definido en: [packages/runtime/src/routeGeneration/templates/hapi/hapiTemplateService.ts:47](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/hapi/hapiTemplateService.ts#L47)

#### Anulaciones

[`TemplateService`](TemplateService.md).[`models`](TemplateService.md#models)

***

### validationService

```ts
protected validationService: ValidationService;
```

Definido en: [packages/runtime/src/routeGeneration/templates/templateService.ts:10](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/templateService.ts#L10)

#### Inhered from

[`TemplateService`](TemplateService.md).[`validationService`](TemplateService.md#validationservice)

## Métodos

### apiHandler()

```ts
apiHandler(params): Promise<unknown>;
```

Definido en: [packages/runtime/src/routeGeneration/templates/hapi/hapiTemplateService.ts:57](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/hapi/hapiTemplateService.ts#L57)

Invoca la acción del controlador para el tiempo de funcionamiento activo.

#### Parámetros

##### params

`HapiApiHandlerParameters`

#### Devoluciones

`Promise`\<`unknown`\>

#### Anulaciones

[`TemplateService`](TemplateService.md).[`apiHandler`](TemplateService.md#apihandler)

***

### buildPromise()

```ts
protected buildPromise(
   methodName, 
   controller, 
validatedArgs): Promise<unknown>;
```

Definido en: [packages/runtime/src/routeGeneration/templates/templateService.ts:77](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/templateService.ts#L77)

#### Parámetros

##### methodName

`string`

##### controller

`object` \| [`Controller`](Controller.md)

##### validatedArgs

`unknown`[]

#### Devoluciones

`Promise`\<`unknown`\>

#### Inhered from

[`TemplateService`](TemplateService.md).[`buildPromise`](TemplateService.md#buildpromise)

***

### getBodyProperty()

```ts
protected getBodyProperty(
   body, 
   headers, 
   propertyName): unknown;
```

Definido en: [packages/runtime/src/routeGeneration/templates/templateService.ts:62](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/templateService.ts#L62)

#### Parámetros

##### body

`unknown`

##### headers

`Record`\<`string`, `unknown`\>

##### propertyName

`string`

#### Devoluciones

`unknown`

#### Inhered from

[`TemplateService`](TemplateService.md).[`getBodyProperty`](TemplateService.md#getbodyproperty)

***

### getValidatedArgs()

```ts
getValidatedArgs(params): unknown[];
```

Definido en: [packages/runtime/src/routeGeneration/templates/hapi/hapiTemplateService.ts:88](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/hapi/hapiTemplateService.ts#L88)

Valida y normaliza los argumentos de la ruta extraídos de la solicitud.

#### Parámetros

##### params

`HapiValidationArgsParameters`

#### Devoluciones

`unknown`[]

#### Anulaciones

[`TemplateService`](TemplateService.md).[`getValidatedArgs`](TemplateService.md#getvalidatedargs)

***

### isController()

```ts
protected isController(object): object is Controller;
```

Definido en: [packages/runtime/src/routeGeneration/templates/templateService.ts:28](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/templateService.ts#L28)

#### Parámetros

##### object

`object` \| [`Controller`](Controller.md)

#### Devoluciones

`object is Controller`

#### Inhered from

[`TemplateService`](TemplateService.md).[`isController`](TemplateService.md#iscontroller)

***

### isRecord()

```ts
protected isRecord(value): value is Record<string, unknown>;
```

Definido en: [packages/runtime/src/routeGeneration/templates/templateService.ts:73](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/templateService.ts#L73)

#### Parámetros

##### value

`unknown`

#### Devoluciones

`value is Record<string, unknown>`

#### Inhered from

[`TemplateService`](TemplateService.md).[`isRecord`](TemplateService.md#isrecord)

***

### normalizeRequestBody()

```ts
protected normalizeRequestBody(body, headers): unknown;
```

Definido en: [packages/runtime/src/routeGeneration/templates/templateService.ts:54](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/templateService.ts#L54)

#### Parámetros

##### body

`unknown`

##### headers

`Record`\<`string`, `unknown`\>

#### Devoluciones

`unknown`

#### Inhered from

[`TemplateService`](TemplateService.md).[`normalizeRequestBody`](TemplateService.md#normalizerequestbody)

***

### requestHasBody()

```ts
protected requestHasBody(headers): boolean;
```

Definido en: [packages/runtime/src/routeGeneration/templates/templateService.ts:32](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/templateService.ts#L32)

#### Parámetros

##### headers

`Record`\<`string`, `unknown`\>

#### Devoluciones

`boolean`

#### Inhered from

[`TemplateService`](TemplateService.md).[`requestHasBody`](TemplateService.md#requesthasbody)

***

### requestUsesTransferEncoding()

```ts
protected requestUsesTransferEncoding(headers): boolean;
```

Definido en: [packages/runtime/src/routeGeneration/templates/templateService.ts:50](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/templateService.ts#L50)

#### Parámetros

##### headers

`Record`\<`string`, `unknown`\>

#### Devoluciones

`boolean`

#### Inhered from

[`TemplateService`](TemplateService.md).[`requestUsesTransferEncoding`](TemplateService.md#requestusestransferencoding)

***

### returnHandler()

```ts
protected returnHandler(params): unknown;
```

Definido en: [packages/runtime/src/routeGeneration/templates/hapi/hapiTemplateService.ts:148](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/hapi/hapiTemplateService.ts#L148)

Escribe el resultado del controlador de vuelta al tiempo de funcionamiento activo.

#### Parámetros

##### params

`HapiReturnHandlerParameters`

#### Devoluciones

`unknown`

#### Anulaciones

[`TemplateService`](TemplateService.md).[`returnHandler`](TemplateService.md#returnhandler)
