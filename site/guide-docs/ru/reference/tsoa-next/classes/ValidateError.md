---
lastUpdated: 2026-04-20T21:59:41.337Z
---
[tsoa-next](../../packages.md) / [tsoa-next](../index.md) / ValidateError

# Класс: ValidateError

Определено в: [packages/runtime/src/routeGeneration/templateHelpers.ts:1369](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templateHelpers.ts#L1369)

Ошибка, возникающая при сбое проверки запроса в сгенерированных маршрутах.

## расширять

- `Error`

## Implements

- [`Exception`](../interfaces/Exception.md)

## конструкторы

### Конструктор

```ts
new ValidateError(fields, message): ValidateError;
```

Определено в: [packages/runtime/src/routeGeneration/templateHelpers.ts:1373](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templateHelpers.ts#L1373)

#### Параметры

##### fields

[`FieldErrors`](../interfaces/FieldErrors.md)

##### message

`string`

#### Возвращение

`ValidateError`

#### переопределение

```ts
Error.constructor
```

## Свойства

### cause?

```ts
optional cause?: unknown;
```

Определено в: node\_modules/typescript/lib/lib.es2022.error.d.ts:26

#### Осуществление

[`Exception`](../interfaces/Exception.md).[`cause`](../interfaces/Exception.md#cause)

#### Унаследованный от

```ts
Error.cause
```

***

### fields

```ts
fields: FieldErrors;
```

Определено в: [packages/runtime/src/routeGeneration/templateHelpers.ts:1374](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templateHelpers.ts#L1374)

***

### message

```ts
message: string;
```

Определено в: [packages/runtime/src/routeGeneration/templateHelpers.ts:1375](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templateHelpers.ts#L1375)

#### Осуществление

[`Exception`](../interfaces/Exception.md).[`message`](../interfaces/Exception.md#message)

#### переопределение

```ts
Error.message
```

***

### name

```ts
name: string;
```

Определено в: [packages/runtime/src/routeGeneration/templateHelpers.ts:1371](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templateHelpers.ts#L1371)

#### Осуществление

[`Exception`](../interfaces/Exception.md).[`name`](../interfaces/Exception.md#name)

#### переопределение

```ts
Error.name
```

***

### stack?

```ts
optional stack?: string;
```

Определено в: node\_modules/typescript/lib/lib.es5.d.ts:1078

#### Осуществление

[`Exception`](../interfaces/Exception.md).[`stack`](../interfaces/Exception.md#stack)

#### Унаследованный от

```ts
Error.stack
```

***

### status

```ts
status: number;
```

Определено в: [packages/runtime/src/routeGeneration/templateHelpers.ts:1370](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templateHelpers.ts#L1370)

#### Осуществление

[`Exception`](../interfaces/Exception.md).[`status`](../interfaces/Exception.md#status)

***

### stackTraceLimit

```ts
static stackTraceLimit: number;
```

Определено в: node\_modules/@types/node/globals.d.ts:68

The `Error.stackTraceLimit` свойство определяет количество кадров стека
собранный следом стека (сгенерированный `new Error().stack` или
`Error.captureStackTrace(obj)`).

Значение по умолчанию является `10` Он может быть установлен на любой действительный номер JavaScript. Изменения
Это повлияет на любой след стека, захваченный после изменения значения.

Если установить не числовое значение или установить отрицательное число, следы стека будут
Не захватывать никаких кадров.

#### Унаследованный от

```ts
Error.stackTraceLimit
```

## Методы

### captureStackTrace()

```ts
static captureStackTrace(targetObject, constructorOpt?): void;
```

Определено в: node\_modules/@types/node/globals.d.ts:52

создает `.stack` собственность на `targetObject`Когда доступ возвращается
строка, представляющая местоположение в коде, в котором
`Error.captureStackTrace()` Звонили.

```js
const myObject = {};
Error.captureStackTrace(myObject);
myObject.stack;  // Similar to `new Error().stack`
```

Первая строка следа будет префиксирована
`${myObject.name}: ${myObject.message}`.

факультативный `constructorOpt` Аргумент принимает функцию. Если дано, все кадры
выше `constructorOpt`в том числе `constructorOpt`будут исключены из
Сгенерированный след стека.

The `constructorOpt` Аргумент полезен для сокрытия реализации
Детали генерации ошибок от пользователя. Например:

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

#### Параметры

##### targetObject

`object`

##### constructorOpt?

`Function`

#### Возвращение

`void`

#### Унаследованный от

```ts
Error.captureStackTrace
```

***

### isError()

```ts
static isError(error): error is Error;
```

Определено в: node\_modules/typescript/lib/lib.esnext.error.d.ts:23

Указывает, является ли приведенный аргумент встроенным примером ошибки или нет.

#### Параметры

##### error

`unknown`

#### Возвращение

`error is Error`

#### Унаследованный от

```ts
Error.isError
```

***

### prepareStackTrace()

```ts
static prepareStackTrace(err, stackTraces): any;
```

Определено в: node\_modules/@types/node/globals.d.ts:56

#### Параметры

##### err

`Error`

##### stackTraces

`CallSite`[]

#### Возвращение

`any`

#### See

https://v8.dev/docs/stack-trace-api#customizing-stack-traces

#### Унаследованный от

```ts
Error.prepareStackTrace
```
