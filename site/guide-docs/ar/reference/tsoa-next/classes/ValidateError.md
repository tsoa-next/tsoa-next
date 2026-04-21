---
lastUpdated: 2026-04-20T21:59:41.337Z
---
[tsoa-next](../../packages.md) / [tsoa-next](../index.md) / ValidateError

# الرتبة:

محددة في: [packages/runtime/src/routeGeneration/templateHelpers.ts:1369](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templateHelpers.ts#L1369)

يُلقى الخطأ عندما يفشل الطلب في طرق متولدة.

## التذييلات

- `Error`

## Implements

- [`Exception`](../interfaces/Exception.md)

## Constructors

### المؤسسة

```ts
new ValidateError(fields, message): ValidateError;
```

محددة في: [packages/runtime/src/routeGeneration/templateHelpers.ts:1373](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templateHelpers.ts#L1373)

#### البارامترات

##### fields

[`FieldErrors`](../interfaces/FieldErrors.md)

##### message

`string`

#### العودة

`ValidateError`

#### تجاوزات

```ts
Error.constructor
```

## الممتلكات

### cause?

```ts
optional cause?: unknown;
```

محدد في: Node/_modules/typescript/lib/lib.es2022.error.d.ts:26

#### تنفيذ

[`Exception`](../interfaces/Exception.md).[`cause`](../interfaces/Exception.md#cause)

#### Inherited from

```ts
Error.cause
```

***

### fields

```ts
fields: FieldErrors;
```

محددة في: [packages/runtime/src/routeGeneration/templateHelpers.ts:1374](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templateHelpers.ts#L1374)

***

### message

```ts
message: string;
```

محددة في: [packages/runtime/src/routeGeneration/templateHelpers.ts:1375](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templateHelpers.ts#L1375)

#### تنفيذ

[`Exception`](../interfaces/Exception.md).[`message`](../interfaces/Exception.md#message)

#### تجاوزات

```ts
Error.message
```

***

### name

```ts
name: string;
```

محددة في: [packages/runtime/src/routeGeneration/templateHelpers.ts:1371](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templateHelpers.ts#L1371)

#### تنفيذ

[`Exception`](../interfaces/Exception.md).[`name`](../interfaces/Exception.md#name)

#### تجاوزات

```ts
Error.name
```

***

### stack?

```ts
optional stack?: string;
```

محددة في: Node/_modules/typescript/lib/lib.es5.ds:1078

#### تنفيذ

[`Exception`](../interfaces/Exception.md).[`stack`](../interfaces/Exception.md#stack)

#### Inherited from

```ts
Error.stack
```

***

### status

```ts
status: number;
```

محددة في: [packages/runtime/src/routeGeneration/templateHelpers.ts:1370](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templateHelpers.ts#L1370)

#### تنفيذ

[`Exception`](../interfaces/Exception.md).[`status`](../interfaces/Exception.md#status)

***

### stackTraceLimit

```ts
static stackTraceLimit: number;
```

محدد في: node/_modules/@types/node/globals.d.ts:68

The `Error.stackTraceLimit` تحدد الممتلكات عدد الأطر الساكنة
تم جمعها بواسطة أثر كوميدي (سواء تم توليدها من قبل) `new Error().stack` أو
`Error.captureStackTrace(obj)`).

القيمة الافتراضية هي `10` ولكن يمكن تحديد أي رقم ساري المفعول في جافاسكريبت. التغييرات
سيؤثر على أي أثر حزمي تم القبض عليه بعد تغير القيمة

إذا حُدِّدت إلى قيمة غير عددية، أو حُدِّدت إلى رقم سلبي، ستُحدَّد آثار الحزمة
لا تلتقط أي إطارات

#### Inherited from

```ts
Error.stackTraceLimit
```

## الطرائق

### captureStackTrace()

```ts
static captureStackTrace(targetObject, constructorOpt?): void;
```

محدد في: node/_modules/@types/node/globals.d.ts:52

يخلق `.stack` الممتلكات `targetObject`الذي عند العودة
سلسلة تمثل الموقع في الرمز الذي
`Error.captureStackTrace()` تم استدعائه

```js
const myObject = {};
Error.captureStackTrace(myObject);
myObject.stack;  // Similar to `new Error().stack`
```

الخط الأول من التعقب سيتم تحديده مسبقاً
`${myObject.name}: ${myObject.message}`.

الاختياري `constructorOpt` الحجة تقبل وظيفة إذا أعطيت، كل الإطارات
أعلاه `constructorOpt`بما في ذلك `constructorOpt`سيتم إغفاله من
وُجّلَ أثراً مكوّناً.

The `constructorOpt` حجة مفيدة لإخفاء التنفيذ
تفاصيل الخطأ من المستعمل على سبيل المثال:

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

#### البارامترات

##### targetObject

`object`

##### constructorOpt?

`Function`

#### العودة

`void`

#### Inherited from

```ts
Error.captureStackTrace
```

***

### isError()

```ts
static isError(error): error is Error;
```

محددة في: Node/_modules/typescript/lib/lib.esnext.error.ts:23

يبيّن ما إذا كانت الحجّة المقدّمة هي قضية مبنيّة في الإرور أم لا.

#### البارامترات

##### error

`unknown`

#### العودة

`error is Error`

#### Inherited from

```ts
Error.isError
```

***

### prepareStackTrace()

```ts
static prepareStackTrace(err, stackTraces): any;
```

محدد في: node/_modules/@types/node/globals.d.ts:56

#### البارامترات

##### err

`Error`

##### stackTraces

`CallSite`[]

#### العودة

`any`

#### See

https://v8.dev/docs/stack-trace-api#customizing-stack-traces

#### Inherited from

```ts
Error.prepareStackTrace
```
