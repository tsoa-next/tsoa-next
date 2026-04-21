---
lastUpdated: 2026-04-20T21:59:41.308Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/runtime](../index.md) / ExpressTemplateService

# Classe : ExpressTemplateService

Définie dans : [packages/runtime/src/routeGeneration/templates/express/expressTemplateService.ts:37](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/express/expressTemplateService.ts#L37)

Express- mise en œuvre spécifique du contrat de service de modèle de route généré.

## Prolongation

- [`TemplateService`](TemplateService.md)\<`ExpressApiHandlerParameters`, `ExpressValidationArgsParameters`, `ExpressReturnHandlerParameters`\>

## Constructeurs

### Constructeur

```ts
new ExpressTemplateService(models, config): ExpressTemplateService;
```

Définie dans : [packages/runtime/src/routeGeneration/templates/templateService.ts:12](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/templateService.ts#L12)

#### Paramètres

##### models

[`Models`](../namespaces/TsoaRoute/interfaces/Models.md)

##### config

[`AdditionalProps`](../interfaces/AdditionalProps.md)

#### Retourne

`ExpressTemplateService`

#### Hérité de

[`TemplateService`](TemplateService.md).[`constructor`](TemplateService.md#constructor)

## Propriétés

### config

```ts
protected readonly config: AdditionalProps;
```

Définie dans : [packages/runtime/src/routeGeneration/templates/templateService.ts:14](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/templateService.ts#L14)

#### Hérité de

[`TemplateService`](TemplateService.md).[`config`](TemplateService.md#config)

***

### models

```ts
protected readonly models: Models;
```

Définie dans : [packages/runtime/src/routeGeneration/templates/templateService.ts:13](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/templateService.ts#L13)

#### Hérité de

[`TemplateService`](TemplateService.md).[`models`](TemplateService.md#models)

***

### validationService

```ts
protected validationService: ValidationService;
```

Définie dans : [packages/runtime/src/routeGeneration/templates/templateService.ts:10](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/templateService.ts#L10)

#### Hérité de

[`TemplateService`](TemplateService.md).[`validationService`](TemplateService.md#validationservice)

## Méthodes

### apiHandler()

```ts
apiHandler(params): Promise<void>;
```

Définie dans : [packages/runtime/src/routeGeneration/templates/express/expressTemplateService.ts:38](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/express/expressTemplateService.ts#L38)

Invoque l'action du contrôleur pour l'exécution active.

#### Paramètres

##### params

`ExpressApiHandlerParameters`

#### Retourne

`Promise`\<`void`\>

#### Dépassements

[`TemplateService`](TemplateService.md).[`apiHandler`](TemplateService.md#apihandler)

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

#### Hérité de

[`TemplateService`](TemplateService.md).[`buildPromise`](TemplateService.md#buildpromise)

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

#### Hérité de

[`TemplateService`](TemplateService.md).[`getBodyProperty`](TemplateService.md#getbodyproperty)

***

### getValidatedArgs()

```ts
getValidatedArgs(params): unknown[];
```

Définie dans : [packages/runtime/src/routeGeneration/templates/express/expressTemplateService.ts:56](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/express/expressTemplateService.ts#L56)

Valide et normalise les arguments de route extraits de la requête.

#### Paramètres

##### params

`ExpressValidationArgsParameters`

#### Retourne

`unknown`[]

#### Dépassements

[`TemplateService`](TemplateService.md).[`getValidatedArgs`](TemplateService.md#getvalidatedargs)

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

#### Hérité de

[`TemplateService`](TemplateService.md).[`isController`](TemplateService.md#iscontroller)

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

#### Hérité de

[`TemplateService`](TemplateService.md).[`isRecord`](TemplateService.md#isrecord)

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

#### Hérité de

[`TemplateService`](TemplateService.md).[`normalizeRequestBody`](TemplateService.md#normalizerequestbody)

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

#### Hérité de

[`TemplateService`](TemplateService.md).[`requestHasBody`](TemplateService.md#requesthasbody)

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

#### Hérité de

[`TemplateService`](TemplateService.md).[`requestUsesTransferEncoding`](TemplateService.md#requestusestransferencoding)

***

### returnHandler()

```ts
protected returnHandler(params): void;
```

Définie dans : [packages/runtime/src/routeGeneration/templates/express/expressTemplateService.ts:126](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templates/express/expressTemplateService.ts#L126)

Rédige le résultat du contrôleur à l'exécution active.

#### Paramètres

##### params

`ExpressReturnHandlerParameters`

#### Retourne

`void`

#### Dépassements

[`TemplateService`](TemplateService.md).[`returnHandler`](TemplateService.md#returnhandler)
