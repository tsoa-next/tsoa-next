---
lastUpdated: 2026-04-20T21:59:41.308Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/runtime](../index.md) / ValidateError

# শ্রেণী:

নির্ধারিত মান: [packages/runtime/src/routeGeneration/templateHelpers.ts:1369](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templateHelpers.ts#L1369)

সমস্যাযুক্ত রুটে ত্রুটি দেখা দিয়েছে ।

## সফল

- `Error`

## Implements

- [`Exception`](../interfaces/Exception.md)

## কনস্ট্রাক্টর

### কনস্ট্রাক্টর

```ts
new ValidateError(fields, message): ValidateError;
```

নির্ধারিত মান: [packages/runtime/src/routeGeneration/templateHelpers.ts:1373](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templateHelpers.ts#L1373)

#### পরামিতি

##### fields

[`FieldErrors`](../interfaces/FieldErrors.md)

##### message

`string`

#### প্রাপ্ত মান

`ValidateError`

#### উপেক্ষা করা হবে

```ts
Error.constructor
```

## বৈশিষ্ট্য

### cause?

```ts
optional cause?: unknown;
```

dotd: নোড <module_module_types/mbilib/2022.Aber.

#### প্রভাব

[`Exception`](../interfaces/Exception.md).[`cause`](../interfaces/Exception.md#cause)

#### প্রথমে যে ফন্টটি ব্যবহৃত হবে; যেমন: 'Serif 27'

```ts
Error.cause
```

***

### fields

```ts
fields: FieldErrors;
```

নির্ধারিত মান: [packages/runtime/src/routeGeneration/templateHelpers.ts:1374](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templateHelpers.ts#L1374)

***

### message

```ts
message: string;
```

নির্ধারিত মান: [packages/runtime/src/routeGeneration/templateHelpers.ts:1375](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templateHelpers.ts#L1375)

#### প্রভাব

[`Exception`](../interfaces/Exception.md).[`message`](../interfaces/Exception.md#message)

#### প্রথমে যে ফন্টটি ব্যবহৃত হবে; যেমন: 'Serif 27'

```ts
Error.message
```

***

### name

```ts
name: string = 'ValidateError';
```

নির্ধারিত মান: [packages/runtime/src/routeGeneration/templateHelpers.ts:1371](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templateHelpers.ts#L1371)

#### প্রভাব

[`Exception`](../interfaces/Exception.md).[`name`](../interfaces/Exception.md#name)

#### উপেক্ষা করা হবে

```ts
Error.name
```

***

### stack?

```ts
optional stack?: string;
```

: নোডের মধ্যে ব্যাখ্যা করা হয়: <module_module_types/ 30.5.d.d

#### প্রভাব

[`Exception`](../interfaces/Exception.md).[`stack`](../interfaces/Exception.md#stack)

#### প্রথমে যে ফন্টটি ব্যবহৃত হবে; যেমন: 'Serif 27'

```ts
Error.stack
```

***

### status

```ts
status: number = 400;
```

নির্ধারিত মান: [packages/runtime/src/routeGeneration/templateHelpers.ts:1370](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templateHelpers.ts#L1370)

#### প্রভাব

[`Exception`](../interfaces/Exception.md).[`status`](../interfaces/Exception.md#status)

***

### stackTraceLimit

```ts
static stackTraceLimit: number;
```

সংজ্ঞায়িত করো: নোডে\_module_BAR_/types/https.ds.d.d

এটা `Error.stackTraceLimit` %s ফ্রেমের সংখ্যা
তৈরি করেছেন একটি স্ট্যাক চিহ্ন (ইতি দ্বারা নির্মিত) `new Error().stack` অথবা
`Error.captureStackTrace(obj)`).

ডিফল্ট মান `10` কিন্তু যেকোন বৈধ জাভাস্ক্রিপ্ট নম্বর সেট করতে পারে । পরিবর্তন
পরে কোনো স্ট্যাক চিহ্ন সনাক্ত করা হলে সেগুলিকে প্রভাবিত হবে (_a)

একটি শূণ্য ভিন্ন মান নির্ধারণ করা হলে মানটি শূণ্য হিসাবে গণনা করা হয় অথবা কোন সংখ্যা, স্ট্যাক চিহ্ন প্রদর্শন করা হবে
কোনো ফ্রেম রেকর্ড করা হয়নি।

#### প্রথমে যে ফন্টটি ব্যবহৃত হবে; যেমন: 'Serif 27'

```ts
Error.stackTraceLimit
```

## পদ্ধতি

### captureStackTrace()

```ts
static captureStackTrace(targetObject, constructorOpt?): void;
```

ব্যাখ্যা: নোডের মধ্যে _BAR_module_names/indvd/global.dvd/global.d.d/:৫২.

একটি %s নির্মাণ করুন `.stack` বৈশিষ্ট্য `targetObject`আর যখন পৃষ ্ ঠাগুলো খুলে ধরা হবে ,
কোডকে যে অবস্থানে প্রতিনিধিত্ব করে একটি পংক্তি
`Error.captureStackTrace()` বলা হত।

```js
const myObject = {};
Error.captureStackTrace(myObject);
myObject.stack;  // Similar to `new Error().stack`
```

চিহ্নের প্রথম লাইন ধারণ করে
`${myObject.name}: ${myObject.message}`.

ঐচ্ছিক `constructorOpt` আর্গুমেন্ট ফাংশন গ্রহণ করুন । প্রতি ফ্রেম
উপরে `constructorOpt`এবং সেসব বিষয়ে `constructorOpt`এ থেকে দূরে রাখা হবে খোদাভীরু ব ্ যক ্ তিকে ,
স্ট্যাক ট্রেস।

এটা `constructorOpt` প্রয়োগের জন্য আর্গুমেন্টটি কার্যকরী
ব্যবহারকারী থেকে ত্রুটির বিবরণ যেমন:

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

#### পরামিতি

##### targetObject

`object`

##### constructorOpt?

`Function`

#### প্রাপ্ত মান

`void`

#### প্রথমে যে ফন্টটি ব্যবহৃত হবে; যেমন: 'Serif 27'

```ts
Error.captureStackTrace
```

***

### isError()

```ts
static isError(error): error is Error;
```

: নোডের মধ্যে ব্যাখ্যা করা হয়: module_module_type/optional/mb://itit.s.

আর্গুমেন্ট পার্স করতে ব্যবহৃত হয় কিনা তা উল্লেখ করে।

#### পরামিতি

##### error

`unknown`

#### প্রাপ্ত মান

`error is Error`

#### প্রথমে যে ফন্টটি ব্যবহৃত হবে; যেমন: 'Serif 27'

```ts
Error.isError
```

***

### prepareStackTrace()

```ts
static prepareStackTrace(err, stackTraces): any;
```

dvde_module_names/interface/global_tdvid/global.s.dvd.6: ৫৬

#### পরামিতি

##### err

`Error`

##### stackTraces

`CallSite`[]

#### প্রাপ্ত মান

`any`

#### See

https://v8.dev/docs/stack-trace-api#customizing-stack-traces

#### প্রথমে যে ফন্টটি ব্যবহৃত হবে; যেমন: 'Serif 27'

```ts
Error.prepareStackTrace
```
