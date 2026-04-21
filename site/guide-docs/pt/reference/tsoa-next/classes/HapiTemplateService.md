---
lastUpdated: 2026-04-20T21:59:41.337Z
---
[tsoa-next](../../packages.md) / [tsoa-next](../index.md) / HapiTemplateService

# Classe: HapiTemplateService

Definido em: [packages/runtime/src/routeGeneration/templates/hapi/hapiTemplateService.ts:45](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/hapi/hapiTemplateService.ts#L45)

Hapi- implementação específica do contrato de serviço de modelo de rota gerado.

## Extensões

- [`TemplateService`](TemplateService.md)\<`HapiApiHandlerParameters`, `HapiValidationArgsParameters`, `HapiReturnHandlerParameters`\>

## Construtores

### Construtor

```ts
new HapiTemplateService(
   models, 
   config, 
   hapi): HapiTemplateService;
```

Definido em: [packages/runtime/src/routeGeneration/templates/hapi/hapiTemplateService.ts:46](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/hapi/hapiTemplateService.ts#L46)

#### Parâmetros

##### models

[`Models`](../namespaces/TsoaRoute/interfaces/Models.md)

##### config

[`AdditionalProps`](../interfaces/AdditionalProps.md)

##### hapi

###### boomify

###### isBoom

#### Retorna

`HapiTemplateService`

#### Substituição

[`TemplateService`](TemplateService.md).[`constructor`](TemplateService.md#constructor)

## Propriedades

### config

```ts
protected readonly config: AdditionalProps;
```

Definido em: [packages/runtime/src/routeGeneration/templates/hapi/hapiTemplateService.ts:48](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/hapi/hapiTemplateService.ts#L48)

#### Substituição

[`TemplateService`](TemplateService.md).[`config`](TemplateService.md#config)

***

### models

```ts
protected readonly models: Models;
```

Definido em: [packages/runtime/src/routeGeneration/templates/hapi/hapiTemplateService.ts:47](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/hapi/hapiTemplateService.ts#L47)

#### Substituição

[`TemplateService`](TemplateService.md).[`models`](TemplateService.md#models)

***

### validationService

```ts
protected validationService: ValidationService;
```

Definido em: [packages/runtime/src/routeGeneration/templates/templateService.ts:10](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/templateService.ts#L10)

#### Herdadas de

[`TemplateService`](TemplateService.md).[`validationService`](TemplateService.md#validationservice)

## Métodos

### apiHandler()

```ts
apiHandler(params): Promise<unknown>;
```

Definido em: [packages/runtime/src/routeGeneration/templates/hapi/hapiTemplateService.ts:57](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/hapi/hapiTemplateService.ts#L57)

Invoca a ação do controlador para o tempo de execução ativo.

#### Parâmetros

##### params

`HapiApiHandlerParameters`

#### Retorna

`Promise`\<`unknown`\>

#### Substituição

[`TemplateService`](TemplateService.md).[`apiHandler`](TemplateService.md#apihandler)

***

### buildPromise()

```ts
protected buildPromise(
   methodName, 
   controller, 
validatedArgs): Promise<unknown>;
```

Definido em: [packages/runtime/src/routeGeneration/templates/templateService.ts:77](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/templateService.ts#L77)

#### Parâmetros

##### methodName

`string`

##### controller

`object` \| [`Controller`](Controller.md)

##### validatedArgs

`unknown`[]

#### Retorna

`Promise`\<`unknown`\>

#### Herdadas de

[`TemplateService`](TemplateService.md).[`buildPromise`](TemplateService.md#buildpromise)

***

### getBodyProperty()

```ts
protected getBodyProperty(
   body, 
   headers, 
   propertyName): unknown;
```

Definido em: [packages/runtime/src/routeGeneration/templates/templateService.ts:62](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/templateService.ts#L62)

#### Parâmetros

##### body

`unknown`

##### headers

`Record`\<`string`, `unknown`\>

##### propertyName

`string`

#### Retorna

`unknown`

#### Herdadas de

[`TemplateService`](TemplateService.md).[`getBodyProperty`](TemplateService.md#getbodyproperty)

***

### getValidatedArgs()

```ts
getValidatedArgs(params): unknown[];
```

Definido em: [packages/runtime/src/routeGeneration/templates/hapi/hapiTemplateService.ts:88](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/hapi/hapiTemplateService.ts#L88)

Valida e normaliza os argumentos de rota extraídos da requisição.

#### Parâmetros

##### params

`HapiValidationArgsParameters`

#### Retorna

`unknown`[]

#### Substituição

[`TemplateService`](TemplateService.md).[`getValidatedArgs`](TemplateService.md#getvalidatedargs)

***

### isController()

```ts
protected isController(object): object is Controller;
```

Definido em: [packages/runtime/src/routeGeneration/templates/templateService.ts:28](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/templateService.ts#L28)

#### Parâmetros

##### object

`object` \| [`Controller`](Controller.md)

#### Retorna

`object is Controller`

#### Herdadas de

[`TemplateService`](TemplateService.md).[`isController`](TemplateService.md#iscontroller)

***

### isRecord()

```ts
protected isRecord(value): value is Record<string, unknown>;
```

Definido em: [packages/runtime/src/routeGeneration/templates/templateService.ts:73](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/templateService.ts#L73)

#### Parâmetros

##### value

`unknown`

#### Retorna

`value is Record<string, unknown>`

#### Herdadas de

[`TemplateService`](TemplateService.md).[`isRecord`](TemplateService.md#isrecord)

***

### normalizeRequestBody()

```ts
protected normalizeRequestBody(body, headers): unknown;
```

Definido em: [packages/runtime/src/routeGeneration/templates/templateService.ts:54](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/templateService.ts#L54)

#### Parâmetros

##### body

`unknown`

##### headers

`Record`\<`string`, `unknown`\>

#### Retorna

`unknown`

#### Herdadas de

[`TemplateService`](TemplateService.md).[`normalizeRequestBody`](TemplateService.md#normalizerequestbody)

***

### requestHasBody()

```ts
protected requestHasBody(headers): boolean;
```

Definido em: [packages/runtime/src/routeGeneration/templates/templateService.ts:32](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/templateService.ts#L32)

#### Parâmetros

##### headers

`Record`\<`string`, `unknown`\>

#### Retorna

`boolean`

#### Herdadas de

[`TemplateService`](TemplateService.md).[`requestHasBody`](TemplateService.md#requesthasbody)

***

### requestUsesTransferEncoding()

```ts
protected requestUsesTransferEncoding(headers): boolean;
```

Definido em: [packages/runtime/src/routeGeneration/templates/templateService.ts:50](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/templateService.ts#L50)

#### Parâmetros

##### headers

`Record`\<`string`, `unknown`\>

#### Retorna

`boolean`

#### Herdadas de

[`TemplateService`](TemplateService.md).[`requestUsesTransferEncoding`](TemplateService.md#requestusestransferencoding)

***

### returnHandler()

```ts
protected returnHandler(params): unknown;
```

Definido em: [packages/runtime/src/routeGeneration/templates/hapi/hapiTemplateService.ts:148](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/hapi/hapiTemplateService.ts#L148)

Grava o resultado do controlador de volta ao tempo de execução ativo.

#### Parâmetros

##### params

`HapiReturnHandlerParameters`

#### Retorna

`unknown`

#### Substituição

[`TemplateService`](TemplateService.md).[`returnHandler`](TemplateService.md#returnhandler)
