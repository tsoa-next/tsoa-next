---
lastUpdated: 2026-04-20T21:59:41.308Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/runtime](../index.md) / TemplateService

# Classe abstrata: TemplateService\<ApiHandlerParameters, ValidationArgsParameters, ReturnHandlerParameters\>

Definido em: [packages/runtime/src/routeGeneration/templates/templateService.ts:9](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/templateService.ts#L9)

Classe base compartilhada para serviços de modelo específicos para execução utilizados por rotas geradas.

## Estendido por

- [`ExpressTemplateService`](ExpressTemplateService.md)
- [`HapiTemplateService`](HapiTemplateService.md)
- [`KoaTemplateService`](KoaTemplateService.md)

## Parâmetros do tipo

### ApiHandlerParameters

`ApiHandlerParameters`

### ValidationArgsParameters

`ValidationArgsParameters`

### ReturnHandlerParameters

`ReturnHandlerParameters`

## Construtores

### Construtor

```ts
new TemplateService<ApiHandlerParameters, ValidationArgsParameters, ReturnHandlerParameters>(models, config): TemplateService<ApiHandlerParameters, ValidationArgsParameters, ReturnHandlerParameters>;
```

Definido em: [packages/runtime/src/routeGeneration/templates/templateService.ts:12](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/templateService.ts#L12)

#### Parâmetros

##### models

[`Models`](../namespaces/TsoaRoute/interfaces/Models.md)

##### config

[`AdditionalProps`](../interfaces/AdditionalProps.md)

#### Retorna

`TemplateService`\<`ApiHandlerParameters`, `ValidationArgsParameters`, `ReturnHandlerParameters`\>

## Propriedades

### config

```ts
protected readonly config: AdditionalProps;
```

Definido em: [packages/runtime/src/routeGeneration/templates/templateService.ts:14](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/templateService.ts#L14)

***

### models

```ts
protected readonly models: Models;
```

Definido em: [packages/runtime/src/routeGeneration/templates/templateService.ts:13](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/templateService.ts#L13)

***

### validationService

```ts
protected validationService: ValidationService;
```

Definido em: [packages/runtime/src/routeGeneration/templates/templateService.ts:10](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/templateService.ts#L10)

## Métodos

### apiHandler()

```ts
abstract apiHandler(params): Promise<unknown>;
```

Definido em: [packages/runtime/src/routeGeneration/templates/templateService.ts:20](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/templateService.ts#L20)

Invoca a ação do controlador para o tempo de execução ativo.

#### Parâmetros

##### params

`ApiHandlerParameters`

#### Retorna

`Promise`\<`unknown`\>

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

***

### getValidatedArgs()

```ts
abstract getValidatedArgs(params): unknown[];
```

Definido em: [packages/runtime/src/routeGeneration/templates/templateService.ts:23](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/templateService.ts#L23)

Valida e normaliza os argumentos de rota extraídos da requisição.

#### Parâmetros

##### params

`ValidationArgsParameters`

#### Retorna

`unknown`[]

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

***

### returnHandler()

```ts
abstract protected returnHandler(params): unknown;
```

Definido em: [packages/runtime/src/routeGeneration/templates/templateService.ts:26](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/templateService.ts#L26)

Grava o resultado do controlador de volta ao tempo de execução ativo.

#### Parâmetros

##### params

`ReturnHandlerParameters`

#### Retorna

`unknown`
