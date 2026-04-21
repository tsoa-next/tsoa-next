---
lastUpdated: 2026-04-20T21:59:41.308Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/runtime](../index.md) / ValidateError

# कक्षा: मान्य

में परिभाषित: [packages/runtime/src/routeGeneration/templateHelpers.ts:1369](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templateHelpers.ts#L1369)

जब अनुरोध सत्यापन उत्पन्न मार्गों में विफल रहता है तो त्रुटि फेंक दी गई।

## विस्तार

- `Error`

## Implements

- [`Exception`](../interfaces/Exception.md)

## कंस्ट्रक्टर

### रचनाकार

```ts
new ValidateError(fields, message): ValidateError;
```

में परिभाषित: [packages/runtime/src/routeGeneration/templateHelpers.ts:1373](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templateHelpers.ts#L1373)

#### पैरामीटर

##### fields

[`FieldErrors`](../interfaces/FieldErrors.md)

##### message

`string`

#### रिटर्न

`ValidateError`

#### ओवरराइड

```ts
Error.constructor
```

## गुण

### cause?

```ts
optional cause?: unknown;
```

में परिभाषित: नोड \_modules/typescript/lib/lib.es2022.error.d.ts:26

#### कार्यान्वयन

[`Exception`](../interfaces/Exception.md).[`cause`](../interfaces/Exception.md#cause)

#### से विरासत

```ts
Error.cause
```

***

### fields

```ts
fields: FieldErrors;
```

में परिभाषित: [packages/runtime/src/routeGeneration/templateHelpers.ts:1374](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templateHelpers.ts#L1374)

***

### message

```ts
message: string;
```

में परिभाषित: [packages/runtime/src/routeGeneration/templateHelpers.ts:1375](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templateHelpers.ts#L1375)

#### कार्यान्वयन

[`Exception`](../interfaces/Exception.md).[`message`](../interfaces/Exception.md#message)

#### से विरासत

```ts
Error.message
```

***

### name

```ts
name: string = 'ValidateError';
```

में परिभाषित: [packages/runtime/src/routeGeneration/templateHelpers.ts:1371](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templateHelpers.ts#L1371)

#### कार्यान्वयन

[`Exception`](../interfaces/Exception.md).[`name`](../interfaces/Exception.md#name)

#### ओवरराइड

```ts
Error.name
```

***

### stack?

```ts
optional stack?: string;
```

में परिभाषित: नोड \_modules/typescript/lib/lib.es5.d.ts:1078

#### कार्यान्वयन

[`Exception`](../interfaces/Exception.md).[`stack`](../interfaces/Exception.md#stack)

#### से विरासत

```ts
Error.stack
```

***

### status

```ts
status: number = 400;
```

में परिभाषित: [packages/runtime/src/routeGeneration/templateHelpers.ts:1370](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templateHelpers.ts#L1370)

#### कार्यान्वयन

[`Exception`](../interfaces/Exception.md).[`status`](../interfaces/Exception.md#status)

***

### stackTraceLimit

```ts
static stackTraceLimit: number;
```

में परिभाषित: नोड \_modules/@types/node/globals.d.ts:68

The `Error.stackTraceLimit` संपत्ति स्टैक फ्रेम की संख्या निर्दिष्ट करती है
एक स्टैक ट्रेस द्वारा एकत्र (चाहे पूरी तरह से द्वारा उत्पन्न) `new Error().stack` या
`Error.captureStackTrace(obj)`).

डिफ़ॉल्ट मान है `10` लेकिन किसी भी वैध जावास्क्रिप्ट नंबर पर सेट किया जा सकता है। परिवर्तन
किसी भी स्टैक ट्रेस पर कब्जा कर लिया _ बाद_ मूल्य बदल दिया गया है।

यदि एक गैर-नंबर मूल्य पर सेट किया जाता है, या एक नकारात्मक संख्या पर सेट किया जाता है, तो स्टैक ट्रेस होगा
किसी भी फ्रेम पर कब्जा नहीं है।

#### से विरासत

```ts
Error.stackTraceLimit
```

## विधि

### captureStackTrace()

```ts
static captureStackTrace(targetObject, constructorOpt?): void;
```

में परिभाषित: नोड \_modules/@types/node/globals.d.ts:52

बनाना `.stack` संपत्ति पर `targetObject`जब तक पहुँचे रिटर्न
एक स्ट्रिंग जिस पर कोड में स्थान का प्रतिनिधित्व करता है
`Error.captureStackTrace()` बुलाया गया था।

```js
const myObject = {};
Error.captureStackTrace(myObject);
myObject.stack;  // Similar to `new Error().stack`
```

निशान की पहली पंक्ति के साथ समाप्त हो जाएगा
`${myObject.name}: ${myObject.message}`.

वैकल्पिक `constructorOpt` तर्क एक समारोह को स्वीकार करता है। यदि दिए गए हैं, तो सभी फ्रेम
ऊपर `constructorOpt`सहित `constructorOpt`, से omitted किया जाएगा
उत्पन्न स्टैक ट्रेस।

The `constructorOpt` तर्क कार्यान्वयन को छिपाने के लिए उपयोगी है
उपयोगकर्ता से त्रुटि पीढ़ी का विवरण। उदाहरण के लिए:

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

#### पैरामीटर

##### targetObject

`object`

##### constructorOpt?

`Function`

#### रिटर्न

`void`

#### से विरासत

```ts
Error.captureStackTrace
```

***

### isError()

```ts
static isError(error): error is Error;
```

में परिभाषित: नोड \_modules/typescript/lib/lib.esnext.error.d.ts:23

यह इंगित करता है कि दिए गए तर्क एक अंतर्निहित त्रुटि उदाहरण है या नहीं।

#### पैरामीटर

##### error

`unknown`

#### रिटर्न

`error is Error`

#### से विरासत

```ts
Error.isError
```

***

### prepareStackTrace()

```ts
static prepareStackTrace(err, stackTraces): any;
```

में परिभाषित: नोड \_modules/@types/node/globals.d.ts:56

#### पैरामीटर

##### err

`Error`

##### stackTraces

`CallSite`[]

#### रिटर्न

`any`

#### See

https://v8.dev/docs/stack-trace-api#customizing-stack-traces

#### से विरासत

```ts
Error.prepareStackTrace
```
