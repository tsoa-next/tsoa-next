---
lastUpdated: 2026-04-20T21:59:41.308Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/runtime](../index.md) / ValidateError

# Clase: ValidateError

Definido en: [packages/runtime/src/routeGeneration/templateHelpers.ts:1369](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templateHelpers.ts#L1369)

Error lanzado cuando la validación de solicitud falla en las rutas generadas.

## Extensión

- `Error`

## Implements

- [`Exception`](../interfaces/Exception.md)

## Constructores

### Constructor

```ts
new ValidateError(fields, message): ValidateError;
```

Definido en: [packages/runtime/src/routeGeneration/templateHelpers.ts:1373](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templateHelpers.ts#L1373)

#### Parámetros

##### fields

[`FieldErrors`](../interfaces/FieldErrors.md)

##### message

`string`

#### Devoluciones

`ValidateError`

#### Anulaciones

```ts
Error.constructor
```

## Propiedades

### cause?

```ts
optional cause?: unknown;
```

Definido en: nodo\_modules/typescript/lib.es2022.error.d.ts:26

#### Aplicación de la Convención

[`Exception`](../interfaces/Exception.md).[`cause`](../interfaces/Exception.md#cause)

#### Inhered from

```ts
Error.cause
```

***

### fields

```ts
fields: FieldErrors;
```

Definido en: [packages/runtime/src/routeGeneration/templateHelpers.ts:1374](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templateHelpers.ts#L1374)

***

### message

```ts
message: string;
```

Definido en: [packages/runtime/src/routeGeneration/templateHelpers.ts:1375](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templateHelpers.ts#L1375)

#### Aplicación de la Convención

[`Exception`](../interfaces/Exception.md).[`message`](../interfaces/Exception.md#message)

#### Inhered from

```ts
Error.message
```

***

### name

```ts
name: string = 'ValidateError';
```

Definido en: [packages/runtime/src/routeGeneration/templateHelpers.ts:1371](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templateHelpers.ts#L1371)

#### Aplicación de la Convención

[`Exception`](../interfaces/Exception.md).[`name`](../interfaces/Exception.md#name)

#### Anulaciones

```ts
Error.name
```

***

### stack?

```ts
optional stack?: string;
```

Definido en: nodo\_modules/typescript/lib/lib.es5.d.ts:1078

#### Aplicación de la Convención

[`Exception`](../interfaces/Exception.md).[`stack`](../interfaces/Exception.md#stack)

#### Inhered from

```ts
Error.stack
```

***

### status

```ts
status: number = 400;
```

Definido en: [packages/runtime/src/routeGeneration/templateHelpers.ts:1370](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templateHelpers.ts#L1370)

#### Aplicación de la Convención

[`Exception`](../interfaces/Exception.md).[`status`](../interfaces/Exception.md#status)

***

### stackTraceLimit

```ts
static stackTraceLimit: number;
```

Definido en: nodo\_modules/@types/node/globals.d.ts:68

El `Error.stackTraceLimit` propiedad especifica el número de marcos de pila
recogido por un rastro de pila (ya sea generado por `new Error().stack` o
`Error.captureStackTrace(obj)`).

El valor predeterminado es `10` pero se puede configurar en cualquier número de JavaScript válido. Cambios
afectará cualquier rastro de pila capturado _after_ el valor ha sido cambiado.

Si se establece en un valor no-número, o se establece en un número negativo, los rastros serán
no capturar ningún marco.

#### Inhered from

```ts
Error.stackTraceLimit
```

## Métodos

### captureStackTrace()

```ts
static captureStackTrace(targetObject, constructorOpt?): void;
```

Definido en: nodo\_modules/@types/node/globals.d.ts:52

Crea un `.stack` bienes inmuebles `targetObject`, que cuando se accede a los retornos
una cadena que representa la ubicación en el código
`Error.captureStackTrace()` fue llamado.

```js
const myObject = {};
Error.captureStackTrace(myObject);
myObject.stack;  // Similar to `new Error().stack`
```

La primera línea del trazo será prefijada con
`${myObject.name}: ${myObject.message}`.

El opcional `constructorOpt` argumentación acepta una función. Si se da, todos los marcos
arriba `constructorOpt`, incluido `constructorOpt`, será omitido del
rastro de pila generada.

El `constructorOpt` argumento es útil para ocultar la aplicación
detalles de la generación de errores del usuario. Por ejemplo:

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

#### Parámetros

##### targetObject

`object`

##### constructorOpt?

`Function`

#### Devoluciones

`void`

#### Inhered from

```ts
Error.captureStackTrace
```

***

### isError()

```ts
static isError(error): error is Error;
```

Definido en: nodo\_modules/typescript/lib/lib.esnext.error.d.ts:23

Indica si el argumento proporcionado es una instancia de error integrada o no.

#### Parámetros

##### error

`unknown`

#### Devoluciones

`error is Error`

#### Inhered from

```ts
Error.isError
```

***

### prepareStackTrace()

```ts
static prepareStackTrace(err, stackTraces): any;
```

Definido en: nodo\_modules/@types/node/globals.d.ts:56

#### Parámetros

##### err

`Error`

##### stackTraces

`CallSite`[]

#### Devoluciones

`any`

#### See

https://v8.dev/docs/stack-trace-api#customizing-stack-traces

#### Inhered from

```ts
Error.prepareStackTrace
```
