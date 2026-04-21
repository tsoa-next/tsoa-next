---
lastUpdated: 2026-04-20T21:59:41.308Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/runtime](../index.md) / ValidateError

# Classe : ValiderErreur

Définie dans : [packages/runtime/src/routeGeneration/templateHelpers.ts:1369](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templateHelpers.ts#L1369)

Erreur lorsque la validation de la requête échoue dans les itinéraires générés.

## Prolongation

- `Error`

## Implements

- [`Exception`](../interfaces/Exception.md)

## Constructeurs

### Constructeur

```ts
new ValidateError(fields, message): ValidateError;
```

Définie dans : [packages/runtime/src/routeGeneration/templateHelpers.ts:1373](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templateHelpers.ts#L1373)

#### Paramètres

##### fields

[`FieldErrors`](../interfaces/FieldErrors.md)

##### message

`string`

#### Retourne

`ValidateError`

#### Dépassements

```ts
Error.constructor
```

## Propriétés

### cause?

```ts
optional cause?: unknown;
```

Définie dans: node\_modules/typescript/lib/lib.es2022.error.d.ts:26

#### Mise en œuvre

[`Exception`](../interfaces/Exception.md).[`cause`](../interfaces/Exception.md#cause)

#### Hérité de

```ts
Error.cause
```

***

### fields

```ts
fields: FieldErrors;
```

Définie dans : [packages/runtime/src/routeGeneration/templateHelpers.ts:1374](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templateHelpers.ts#L1374)

***

### message

```ts
message: string;
```

Définie dans : [packages/runtime/src/routeGeneration/templateHelpers.ts:1375](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templateHelpers.ts#L1375)

#### Mise en œuvre

[`Exception`](../interfaces/Exception.md).[`message`](../interfaces/Exception.md#message)

#### Hérité de

```ts
Error.message
```

***

### name

```ts
name: string = 'ValidateError';
```

Définie dans : [packages/runtime/src/routeGeneration/templateHelpers.ts:1371](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templateHelpers.ts#L1371)

#### Mise en œuvre

[`Exception`](../interfaces/Exception.md).[`name`](../interfaces/Exception.md#name)

#### Dépassements

```ts
Error.name
```

***

### stack?

```ts
optional stack?: string;
```

Définie dans: node\_modules/typescript/lib/lib.es5.d.ts:1078

#### Mise en œuvre

[`Exception`](../interfaces/Exception.md).[`stack`](../interfaces/Exception.md#stack)

#### Hérité de

```ts
Error.stack
```

***

### status

```ts
status: number = 400;
```

Définie dans : [packages/runtime/src/routeGeneration/templateHelpers.ts:1370](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templateHelpers.ts#L1370)

#### Mise en œuvre

[`Exception`](../interfaces/Exception.md).[`status`](../interfaces/Exception.md#status)

***

### stackTraceLimit

```ts
static stackTraceLimit: number;
```

Définie dans: node\_modules/@types/node/globals.d.ts:68

Les `Error.stackTraceLimit` la propriété spécifie le nombre de cadres de pile
collecté par une trace de cheminée `new Error().stack` ou
`Error.captureStackTrace(obj)`).

La valeur par défaut est `10` mais peut être défini à n'importe quel numéro JavaScript valide. Changements
affectera n'importe quelle trace de pile capturée _après_ la valeur a été modifiée.

Si défini à une valeur non numérique, ou défini à un nombre négatif, les traces de la pile
ne capture aucun cadre.

#### Hérité de

```ts
Error.stackTraceLimit
```

## Méthodes

### captureStackTrace()

```ts
static captureStackTrace(targetObject, constructorOpt?): void;
```

Définie dans: node\_modules/@types/node/globals.d.ts:52

Crée un `.stack` biens `targetObject`, qui quand consulté retourne
une chaîne représentant l'emplacement dans le code auquel
`Error.captureStackTrace()` a été appelé.

```js
const myObject = {};
Error.captureStackTrace(myObject);
myObject.stack;  // Similar to `new Error().stack`
```

La première ligne de la trace sera préfixée avec
`${myObject.name}: ${myObject.message}`.

L'option `constructorOpt` argument accepte une fonction. Si donné, toutes les images
ci-dessus `constructorOpt`, y compris `constructorOpt`, sera omis de la
une trace de pile générée.

Les `constructorOpt` argument est utile pour cacher l'implémentation
détails de la génération d'erreurs de l'utilisateur. Par exemple:

```js
function a() {
  b();
}

function b() {
  c();
}

function c() {
  // Create an error without stack trace to avoid calculating the stack trace twice.
  const { stackTraceLimit } = Error;
  Error.stackTraceLimit = 0;
  const error = new Error();
  Error.stackTraceLimit = stackTraceLimit;

  // Capture the stack trace above function b
  Error.captureStackTrace(error, b); // Neither function c, nor b is included in the stack trace
  throw error;
}

a();
```

#### Paramètres

##### targetObject

`object`

##### constructorOpt?

`Function`

#### Retourne

`void`

#### Hérité de

```ts
Error.captureStackTrace
```

***

### isError()

```ts
static isError(error): error is Error;
```

Définie dans: node\_modules/typescript/lib/lib.esnext.error.d.ts:23

Indique si l'argument fourni est une instance d'erreur intégrée ou non.

#### Paramètres

##### error

`unknown`

#### Retourne

`error is Error`

#### Hérité de

```ts
Error.isError
```

***

### prepareStackTrace()

```ts
static prepareStackTrace(err, stackTraces): any;
```

Définie dans: node\_modules/@types/node/globals.d.ts:56

#### Paramètres

##### err

`Error`

##### stackTraces

`CallSite`[]

#### Retourne

`any`

#### See

https://v8.dev/docs/stack-trace-api#customizing-stack-traces

#### Hérité de

```ts
Error.prepareStackTrace
```
