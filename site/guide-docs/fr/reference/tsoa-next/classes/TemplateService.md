---
lastUpdated: 2026-04-20T21:59:41.337Z
---
[tsoa-next](../../packages.md) / [tsoa-next](../index.md) / TemplateService

# Classe abstraite : TemplateService\<ApiHandlerParameters, ValidationArgsParameters, ReturnHandlerParameters\>

Définie dans : [packages/runtime/src/routeGeneration/templates/templateService.ts:9](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/templateService.ts#L9)

Classe de base partagée pour les services modèles spécifiques à l'exécution utilisés par les routes générées.

## Prorogé par

- [`ExpressTemplateService`](ExpressTemplateService.md)
- [`HapiTemplateService`](HapiTemplateService.md)
- [`KoaTemplateService`](KoaTemplateService.md)

## Paramètres de type

### ApiHandlerParameters

`ApiHandlerParameters`

### ValidationArgsParameters

`ValidationArgsParameters`

### ReturnHandlerParameters

`ReturnHandlerParameters`

## Constructeurs

### Constructeur

```ts
new TemplateService<ApiHandlerParameters, ValidationArgsParameters, ReturnHandlerParameters>(models, config): TemplateService<ApiHandlerParameters, ValidationArgsParameters, ReturnHandlerParameters>;
```

Définie dans : [packages/runtime/src/routeGeneration/templates/templateService.ts:12](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/templateService.ts#L12)

#### Paramètres

##### models

[`Models`](../namespaces/TsoaRoute/interfaces/Models.md)

##### config

[`AdditionalProps`](../interfaces/AdditionalProps.md)

#### Retourne

`TemplateService`\<`ApiHandlerParameters`, `ValidationArgsParameters`, `ReturnHandlerParameters`\>

## Propriétés

### config

```ts
protected readonly config: AdditionalProps;
```

Définie dans : [packages/runtime/src/routeGeneration/templates/templateService.ts:14](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/templateService.ts#L14)

***

### models

```ts
protected readonly models: Models;
```

Définie dans : [packages/runtime/src/routeGeneration/templates/templateService.ts:13](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/templateService.ts#L13)

***

### validationService

```ts
protected validationService: ValidationService;
```

Définie dans : [packages/runtime/src/routeGeneration/templates/templateService.ts:10](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/templateService.ts#L10)

## Méthodes

### apiHandler()

```ts
abstract apiHandler(params): Promise<unknown>;
```

Définie dans : [packages/runtime/src/routeGeneration/templates/templateService.ts:20](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/templateService.ts#L20)

Invoque l'action du contrôleur pour l'exécution active.

#### Paramètres

##### params

`ApiHandlerParameters`

#### Retourne

`Promise`\<`unknown`\>

***

### buildPromise()

```ts
protected buildPromise(
   methodName, 
   controller, 
validatedArgs): Promise<unknown>;
```

Définie dans : [packages/runtime/src/routeGeneration/templates/templateService.ts:77](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/templateService.ts#L77)

#### Paramètres

##### methodName

`string`

##### controller

`object` \| [`Controller`](Controller.md)

##### validatedArgs

`unknown`[]

#### Retourne

`Promise`\<`unknown`\>

***

### getBodyProperty()

```ts
protected getBodyProperty(
   body, 
   headers, 
   propertyName): unknown;
```

Définie dans : [packages/runtime/src/routeGeneration/templates/templateService.ts:62](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/templateService.ts#L62)

#### Paramètres

##### body

`unknown`

##### headers

`Record`\<`string`, `unknown`\>

##### propertyName

`string`

#### Retourne

`unknown`

***

### getValidatedArgs()

```ts
abstract getValidatedArgs(params): unknown[];
```

Définie dans : [packages/runtime/src/routeGeneration/templates/templateService.ts:23](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/templateService.ts#L23)

Valide et normalise les arguments de route extraits de la requête.

#### Paramètres

##### params

`ValidationArgsParameters`

#### Retourne

`unknown`[]

***

### isController()

```ts
protected isController(object): object is Controller;
```

Définie dans : [packages/runtime/src/routeGeneration/templates/templateService.ts:28](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/templateService.ts#L28)

#### Paramètres

##### object

`object` \| [`Controller`](Controller.md)

#### Retourne

`object is Controller`

***

### isRecord()

```ts
protected isRecord(value): value is Record<string, unknown>;
```

Définie dans : [packages/runtime/src/routeGeneration/templates/templateService.ts:73](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/templateService.ts#L73)

#### Paramètres

##### value

`unknown`

#### Retourne

`value is Record<string, unknown>`

***

### normalizeRequestBody()

```ts
protected normalizeRequestBody(body, headers): unknown;
```

Définie dans : [packages/runtime/src/routeGeneration/templates/templateService.ts:54](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/templateService.ts#L54)

#### Paramètres

##### body

`unknown`

##### headers

`Record`\<`string`, `unknown`\>

#### Retourne

`unknown`

***

### requestHasBody()

```ts
protected requestHasBody(headers): boolean;
```

Définie dans : [packages/runtime/src/routeGeneration/templates/templateService.ts:32](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/templateService.ts#L32)

#### Paramètres

##### headers

`Record`\<`string`, `unknown`\>

#### Retourne

`boolean`

***

### requestUsesTransferEncoding()

```ts
protected requestUsesTransferEncoding(headers): boolean;
```

Définie dans : [packages/runtime/src/routeGeneration/templates/templateService.ts:50](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/templateService.ts#L50)

#### Paramètres

##### headers

`Record`\<`string`, `unknown`\>

#### Retourne

`boolean`

***

### returnHandler()

```ts
abstract protected returnHandler(params): unknown;
```

Définie dans : [packages/runtime/src/routeGeneration/templates/templateService.ts:26](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/templateService.ts#L26)

Rédige le résultat du contrôleur à l'exécution active.

#### Paramètres

##### params

`ReturnHandlerParameters`

#### Retourne

`unknown`
