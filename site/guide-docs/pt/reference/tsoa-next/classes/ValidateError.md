---
lastUpdated: 2026-04-20T21:59:41.337Z
---
[tsoa-next](../../packages.md) / [tsoa-next](../index.md) / ValidateError

# Classe: ValidarError

Definido em: [packages/runtime/src/routeGeneration/templateHelpers.ts:1369](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templateHelpers.ts#L1369)

Erro quando a validação da requisição falha nas rotas geradas.

## Extensões

- `Error`

## Implements

- [`Exception`](../interfaces/Exception.md)

## Construtores

### Construtor

```ts
new ValidateError(fields, message): ValidateError;
```

Definido em: [packages/runtime/src/routeGeneration/templateHelpers.ts:1373](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templateHelpers.ts#L1373)

#### Parâmetros

##### fields

[`FieldErrors`](../interfaces/FieldErrors.md)

##### message

`string`

#### Retorna

`ValidateError`

#### Substituição

```ts
Error.constructor
```

## Propriedades

### cause?

```ts
optional cause?: unknown;
```

Definido em: nó\_módulos/typescript/lib/lib.es2022.error.d.ts:26

#### Execução

[`Exception`](../interfaces/Exception.md).[`cause`](../interfaces/Exception.md#cause)

#### Herdadas de

```ts
Error.cause
```

***

### fields

```ts
fields: FieldErrors;
```

Definido em: [packages/runtime/src/routeGeneration/templateHelpers.ts:1374](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templateHelpers.ts#L1374)

***

### message

```ts
message: string;
```

Definido em: [packages/runtime/src/routeGeneration/templateHelpers.ts:1375](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templateHelpers.ts#L1375)

#### Execução

[`Exception`](../interfaces/Exception.md).[`message`](../interfaces/Exception.md#message)

#### Substituição

```ts
Error.message
```

***

### name

```ts
name: string;
```

Definido em: [packages/runtime/src/routeGeneration/templateHelpers.ts:1371](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templateHelpers.ts#L1371)

#### Execução

[`Exception`](../interfaces/Exception.md).[`name`](../interfaces/Exception.md#name)

#### Substituição

```ts
Error.name
```

***

### stack?

```ts
optional stack?: string;
```

Definido em: nod\_modules/typescript/lib/lib.es5.d.ts:1078

#### Execução

[`Exception`](../interfaces/Exception.md).[`stack`](../interfaces/Exception.md#stack)

#### Herdadas de

```ts
Error.stack
```

***

### status

```ts
status: number;
```

Definido em: [packages/runtime/src/routeGeneration/templateHelpers.ts:1370](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templateHelpers.ts#L1370)

#### Execução

[`Exception`](../interfaces/Exception.md).[`status`](../interfaces/Exception.md#status)

***

### stackTraceLimit

```ts
static stackTraceLimit: number;
```

Definido em: nó\_módulos/@types/node/globals.d.ts:68

A `Error.stackTraceLimit` a propriedade especifica o número de quadros de pilha
coletado por um traço de pilha (se gerado por `new Error().stack` ou
`Error.captureStackTrace(obj)`).

O valor padrão é `10` mas pode ser definido como qualquer número JavaScript válido. Alterações
afetará qualquer traço de pilha capturado _after_ o valor foi alterado.

Se definido para um valor não- número, ou definido para um número negativo, stack traces will
não capturar quaisquer quadros.

#### Herdadas de

```ts
Error.stackTraceLimit
```

## Métodos

### captureStackTrace()

```ts
static captureStackTrace(targetObject, constructorOpt?): void;
```

Definido em: nó\_módulos/@types/node/globals.d.ts:52

Cria um `.stack` propriedade em `targetObject`, que quando acessado retorna
uma string representando a localização no código em que
`Error.captureStackTrace()` foi chamado.

```js
const myObject = {};
Error.captureStackTrace(myObject);
myObject.stack;  // Similar to `new Error().stack`
```

A primeira linha do traço será prefixada com
`${myObject.name}: ${myObject.message}`.

Opcional `constructorOpt` argumento aceita uma função. Se indicado, todos os quadros
acima `constructorOpt`, incluindo `constructorOpt`, será omitido do
traço de pilha gerado.

A `constructorOpt` argumento é útil para ocultar implementação
detalhes da geração de erros do usuário. Por exemplo:

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

#### Parâmetros

##### targetObject

`object`

##### constructorOpt?

`Function`

#### Retorna

`void`

#### Herdadas de

```ts
Error.captureStackTrace
```

***

### isError()

```ts
static isError(error): error is Error;
```

Definido em: nod\_modules/typescript/lib/lib.esnext.error.d.ts:23

Indica se o argumento fornecido é uma instância de erro incorporada ou não.

#### Parâmetros

##### error

`unknown`

#### Retorna

`error is Error`

#### Herdadas de

```ts
Error.isError
```

***

### prepareStackTrace()

```ts
static prepareStackTrace(err, stackTraces): any;
```

Definido em: nodo\_módulos/@types/node/globals.d.ts:56

#### Parâmetros

##### err

`Error`

##### stackTraces

`CallSite`[]

#### Retorna

`any`

#### See

https://v8.dev/docs/stack-trace-api#customizing-stack-traces

#### Herdadas de

```ts
Error.prepareStackTrace
```
