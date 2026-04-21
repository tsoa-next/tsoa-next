---
lastUpdated: 2026-04-20T21:59:41.308Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/runtime](../index.md) / ValidateError

# Kelas: ValidateError

Didefinisikan dalam: [packages/runtime/src/routeGeneration/templateHelpers.ts:1369](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templateHelpers.ts#L1369)

Galat dilemparkan ketika permintaan validasi gagal dalam rute yang dihasilkan.

## Extending

- `Error`

## Implements

- [`Exception`](../interfaces/Exception.md)

## Konstruktor

### Konstruktor

```ts
new ValidateError(fields, message): ValidateError;
```

Didefinisikan dalam: [packages/runtime/src/routeGeneration/templateHelpers.ts:1373](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templateHelpers.ts#L1373)

#### Parameter

##### fields

[`FieldErrors`](../interfaces/FieldErrors.md)

##### message

`string`

#### Kembali

`ValidateError`

#### Timpa

```ts
Error.constructor
```

## Properti

### cause?

```ts
optional cause?: unknown;
```

Ditdefinisikan dalam: node\ _ module / typesyde / lib / lib.es2022.error.dts: 26

#### Implementasi

[`Exception`](../interfaces/Exception.md).[`cause`](../interfaces/Exception.md#cause)

#### Diwarisi dari

```ts
Error.cause
```

***

### fields

```ts
fields: FieldErrors;
```

Didefinisikan dalam: [packages/runtime/src/routeGeneration/templateHelpers.ts:1374](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templateHelpers.ts#L1374)

***

### message

```ts
message: string;
```

Didefinisikan dalam: [packages/runtime/src/routeGeneration/templateHelpers.ts:1375](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templateHelpers.ts#L1375)

#### Implementasi

[`Exception`](../interfaces/Exception.md).[`message`](../interfaces/Exception.md#message)

#### Diwarisi dari

```ts
Error.message
```

***

### name

```ts
name: string = 'ValidateError';
```

Didefinisikan dalam: [packages/runtime/src/routeGeneration/templateHelpers.ts:1371](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templateHelpers.ts#L1371)

#### Implementasi

[`Exception`](../interfaces/Exception.md).[`name`](../interfaces/Exception.md#name)

#### Timpa

```ts
Error.name
```

***

### stack?

```ts
optional stack?: string;
```

Didefinisikan dalam: node\ _ module / typesyrense / lib / lib.es5.d.ts: 1078

#### Implementasi

[`Exception`](../interfaces/Exception.md).[`stack`](../interfaces/Exception.md#stack)

#### Diwarisi dari

```ts
Error.stack
```

***

### status

```ts
status: number = 400;
```

Didefinisikan dalam: [packages/runtime/src/routeGeneration/templateHelpers.ts:1370](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templateHelpers.ts#L1370)

#### Implementasi

[`Exception`](../interfaces/Exception.md).[`status`](../interfaces/Exception.md#status)

***

### stackTraceLimit

```ts
static stackTraceLimit: number;
```

Definisi dalam: node\ _ modules / @ types / node / globals.d.ts: 68

The `Error.stackTraceLimit` properti menentukan jumlah dari stack frames
dikumpulkan oleh jejak stack (apakah dihasilkan oleh `new Error().stack` atau
`Error.captureStackTrace(obj)`).

Nilai baku adalah `10` tetapi mungkin ditetapkan ke nomor JavaScript yang valid. Perubahan
akan mempengaruhi jejak stack yang ditangkap _ after _ the nilai telah diubah.

Jika diset ke nilai bukan-nomor, atau set ke sebuah nomor negatif, jejak stack akan
tidak menangkap frame apapun.

#### Diwarisi dari

```ts
Error.stackTraceLimit
```

## Metode

### captureStackTrace()

```ts
static captureStackTrace(targetObject, constructorOpt?): void;
```

Definisi dalam: node\ _ modules / @ types / node / globals.d.ts: 52

Membuat `.stack` properti pada `targetObject`, yang ketika diakses kembali
string mewakili lokasi dalam kode di mana
`Error.captureStackTrace()` dipanggil.

```js
const myObject = {};
Error.captureStackTrace(myObject);
myObject.stack;  // Similar to `new Error().stack`
```

Garis pertama dari jejak akan di prefixed dengan
`${myObject.name}: ${myObject.message}`.

Pilihan `constructorOpt` argumen menerima fungsi. Jika diberikan, semua frame
di atas `constructorOpt`, termasuk `constructorOpt`, akan dihilangkan dari
menghasilkan jejak stack.

The `constructorOpt` argumen berguna untuk menyembunyikan implementasi
rincian dari pembuatan galat dari pengguna. Misalnya:

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

#### Parameter

##### targetObject

`object`

##### constructorOpt?

`Function`

#### Kembali

`void`

#### Diwarisi dari

```ts
Error.captureStackTrace
```

***

### isError()

```ts
static isError(error): error is Error;
```

Ditdefinisikan dalam: node\ _ modules / typesyde / lib / lib.esnext.eror.dts: 23

Menandakan apakah argumen yang diberikan adalah built-in Galat instansi atau tidak.

#### Parameter

##### error

`unknown`

#### Kembali

`error is Error`

#### Diwarisi dari

```ts
Error.isError
```

***

### prepareStackTrace()

```ts
static prepareStackTrace(err, stackTraces): any;
```

Definisi dalam: node\ _ module / @ types / node / globals.d.ts: 56

#### Parameter

##### err

`Error`

##### stackTraces

`CallSite`[]

#### Kembali

`any`

#### See

https://v8.dev/docs/stack-trace-api#customizing-stack-traces

#### Diwarisi dari

```ts
Error.prepareStackTrace
```
