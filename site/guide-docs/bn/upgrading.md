---
sidebarDepth: 1
lastUpdated: 2026-04-17T20:53:42.041Z
---

# উন্নীত করা হচ্ছে tsoa ২.৫

[Jump to the breaking changes](#breaking-changes)

> ঐতিহাসিক নোট: এই গাইডের লিংক ইচ্ছে করে নির্দেশ করে [`lukeautry/tsoa`](https://github.com/lukeautry/tsoa)যেখানে এই পরিবর্তন মূলত অবতরণ।

## নতুন বৈশিষ্ট্য

### অ্যালায়েসের সমর্থন

এই মুক্তির ক্ষেত্রে ছদ্মনামের ধরনের মতামতের যথাযথ সমর্থন রয়েছে।

তারা সহজ দৃশ্য হতে পারে

```ts
/**
 * A Word shall be a non-empty string
 * @minLength 1
 */
type Word = string
```

ইউনিয়নের মত জটিল দৃশ্য এবং বস্তুর মোড়ক

```ts
type IntersectionAlias = { value1: string; value2: string } & TypeAliasModel1

// or
type OneOrTwo = TypeAliasModel1 | TypeAliasModel2
```

এমনকি সাধারণ ডাকনাম:

```ts
type GenericAlias<T> = T | string
type ForwardGenericAlias<T, U> = GenericAlias<U> | T
```

এটা জেনে রাখুন যে, এর মানে হচ্ছে tsoa শুধুমাত্র সুনির্দিষ্ট বৈশিষ্ট্য নির্মাণ করা হবে নাOpenAPI v3 ও Swager2\ কিন্তু JsDoc পাদটীকা সহ এই ধরনের ইনপুটটি বৈধ হবে।

বঙ্গানুবাদে এমন কোনো দৃশ্য থাকতে পারে, যেখানে আমরা থাকতে পারব না Swagger ২ আপনার কাছ থেকে TypeScript'%s' tsoa কোন বিষয় সম্পর্কে আপনাকে সচেতন থাকতে হবে।

### ম্যাপ ধরনের জন্য সমর্থন

> TypeScript ২. ১ (g০১ ১০ / ৮) মূল উপাদান, মানচিত্রের ধরন, সম্পত্তির ধরনের ম্যাপিং দ্বারা নতুন ধরনের ধরন তৈরি করার সুযোগ দেয় । আপনি যে নিয়ম- এ উল্লেখ করেছেন, বর্তমান ধরনটির প্রত্যেক অংশ একটি নিয়মে রূপান্তর করা হয় । টি রূপান্তর জন্য নির্বাচিত বৈশিষ্ট্যাবলী তারপর টি নতুন ধরন.
> - ম্যারিয়াস শজ, https://mariusschulz.com/blog/mapped-types-in-typescript

tsoa এখন টাইপ টাইপ টাইপ চেকার টাইপ এর সাথে কাজ করছে. আমরা সক্রিয়ভাবে সকল মামলাকে সমর্থন করার চেষ্টা করব, তবে এখন পরীক্ষা স্যুইটটি কেবল সেই সমস্ত উপাদানের সাহায্যে প্রকাশ করা হবে, যেমন:

```ts
/**
 * Make all properties in T optional
 */
type Partial<T> = {
  [P in keyof T]?: T[P]
}

/**
 * Make all properties in T required
 */
type Required<T> = {
  [P in keyof T]-?: T[P]
}

/**
 * Make all properties in T readonly
 */
type Readonly<T> = {
  readonly [P in keyof T]: T[P]
}

/**
 * From T, pick a set of properties whose keys are in the union K
 */
type Pick<T, K extends keyof T> = {
  [P in K]: T[P]
}
```

### অবস্থা অনুযায়ী ক্রমবিন্যাসের সমর্থন

২.৮ এর মতো, TypeScript অবস্থাসূচক ধরন সমর্থন করে । বাক্যরীতির খুব কাছে এবং একটি শর্তে ২ (অথবা অধিক) অভিব্যক্তি সক্রিয় করা হয়। অনুগ্রহ করে এটি উল্লেখ করুন [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/advanced-types.html#conditional-types) বিস্তারিত জানার জন্য।

```ts
type Diff<T, U> = T extends U ? never : T // Remove types from T that are assignable to U
```

tsoa এখন পরিসংখ্যানগত অবস্থা ঠিক করার জন্য টি- টাইপ টাইপ- এর সঙ্গে কাজ করছে। আমরা সক্রিয়ভাবে বেশীরভাগ ক্ষেত্রে সমর্থন করার চেষ্টা করব, তবে এখন পরীক্ষা স্যুইটটি শুধু এ ধরনের ধরণগত জাহাজকে তুলে ধরে যেমন:

```ts
/**
 * Exclude from T those types that are assignable to U
 */
type Exclude<T, U> = T extends U ? never : T

/**
 * Extract from T those types that are assignable to U
 */
type Extract<T, U> = T extends U ? T : never

/**
 * Exclude null and undefined from T
 */
type NonNullable<T> = T extends null | undefined ? never : T
```

### সমন্বয় ও হ্যন্ডের সমর্থন

শক্তিশালী ইউটিলিটির ধরনের জন্য ম্যাপ করা ও স্ট্যাটাসের সংকলন `Omit` টাইপ।

```
/**
 * Construct a type with the properties of T except for those in type K.
 */
type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
```

### Hula সহায়তা `Record<>` [\#662](https://github.com/lukeautry/tsoa/pull/662) ( চিহ্ন)[Eywek](https://github.com/Eywek)আপনি কি মনে করতে পারেন?

### নাম: [\#594](https://github.com/lukeautry/tsoa/pull/594) Spec এবং Spec এর জন্য [\#599](https://github.com/lukeautry/tsoa/pull/599) এবং [\#593](https://github.com/lukeautry/tsoa/pull/593)

### Control নির্দেশক শব্দ: দেখুন [\#601](https://github.com/lukeautry/tsoa/pull/601)

### পাথের বদলে কোলোন চিহ্ন সহযোগে কোলোন চিহ্ন প্রয়োগ করুন [\#602](https://github.com/lukeautry/tsoa/pull/602)( চিহ্ন)[itamarco](https://github.com/itamarco)আপনি কি মনে করতে পারেন?

### পরামিতির / বৈশিষ্ট্যের জন্য@example.com সমর্থন যোগ করুন [\#616](https://github.com/lukeautry/tsoa/pull/616) ( চিহ্ন)[jfrconley](https://github.com/jfrconley)আপনি কি মনে করতে পারেন?

### প্রদর্শন সংক্রান্ত বৈশিষ্ট্য [\#643](https://github.com/lukeautry/tsoa/pull/643) ( চিহ্ন)[Eywek](https://github.com/Eywek)আপনি কি মনে করতে পারেন?

### কাজ: ই-মেইল সদস্য [\#656](https://github.com/lukeautry/tsoa/pull/656) ( চিহ্ন)[Eywek](https://github.com/Eywek)আপনি কি মনে করতে পারেন?

### হাতলের ধরন [\#636](https://github.com/lukeautry/tsoa/pull/636) ( চিহ্ন)[Eywek](https://github.com/Eywek)আপনি কি মনে করতে পারেন?

### হ্যান্ডেল `typeof` [\#635](https://github.com/lukeautry/tsoa/pull/635) ( চিহ্ন)[Eywek](https://github.com/Eywek)আপনি কি মনে করতে পারেন?

### `@format` অ্যালায়েসের সমর্থন [\#620](https://github.com/lukeautry/tsoa/pull/620) ( চিহ্ন)[jfrconley](https://github.com/jfrconley)আপনি কি মনে করতে পারেন?

## বাগ সংশোধন

- সঠিক নাম ধারণ করে ক্ষেত্রের নাম সঠিক নয় মডেল [@fantapop](https://github.com/fantapop)

- AppAP এর অনুরূপ উত্তর ২০৪ এর পরিবর্তে নিস প্রতিক্রিয়া প্রদর্শন করুন [\#629](https://github.com/lukeautry/tsoa/pull/629) ( চিহ্ন)[WoH](https://github.com/WoH)আপনি কি মনে করতে পারেন?

- বৈধতা যাচাই ফাইল-সিস্টেমের মধ্যে সমস্যা [\#661](https://github.com/lukeautry/tsoa/pull/661) ( চিহ্ন)[aldenquimby](https://github.com/aldenquimby)আপনি কি মনে করতে পারেন?

- Coa-ra- র উপর আপগ্রেড করুন [\#646](https://github.com/lukeautry/tsoa/pull/646) ( চিহ্ন)[michaelbeaumont](https://github.com/michaelbeaumont)আপনি কি মনে করতে পারেন?
- বস্তুর ধরন মুছে ফেলুন [\#642](https://github.com/lukeautry/tsoa/pull/642) ( চিহ্ন)[dimitor115](https://github.com/dimitor115)আপনি কি মনে করতে পারেন?
- মডেল সংজ্ঞার জন্য স্থায়ী বৈশিষ্ট্য যোগ করুন [\#639](https://github.com/lukeautry/tsoa/pull/639) ( চিহ্ন)[dimitor115](https://github.com/dimitor115)আপনি কি মনে করতে পারেন?

## শেষ পরিবর্তন

### Null v.0 দ্বারা নির্ধারিত নয়

যদি না আপনি একটি ধরন স্বীকার না করেন `null`''আর সুতরাং তোমাদের উপরে আমাদের কোনো আধিপত্য থাকবে না, `nullable: true` অথবা `x-nullable: true`. .
এটি কার্যকর করার জন্য প্রয়োগ করা হয়, ফলে পাঠানোর সময়ে চিহ্নিত করা হবে `null` পরিবর্তে প্রেরিত `undefined` - কোন বস্তুর উপর কোন বৈশিষ্ট্য ঠিক ছিল না, এখন এটা আর নয়।
ছোট থেকে বড় `undefined` তার পরিবর্তে, আই. `string | null` একই সাথে এই বৈধতা অস্বীকার করা হয়েছে।

### নামপুলা

ধরনের ধরনের সনাক্তকরণ ও সংঘর্ষ এড়িয়ে চলার জন্য, নির্মিত কম্পোনেন্টগুলো হয়তো পরিবর্তিত হতে পারে (জেনিক ইন্টারফেসের অধিকাংশই আক্রান্ত)।
যদি আপনি কম্পোনেন্ট থেকে নাম উত্‍পাদন করেন tsoa- এটা ভাঙ্গা পরিবর্তন।

কারণ tsoa অতীতে কোন ধরনের অ্যালায়েস সমর্থন করে এবং বর্তমানে ভিন্ন সংজ্ঞা তৈরি করা হয়েছে, এটি হয়তো আপনার কোড ভেঙ্গে ফেলতে পারে।
যদি তুমি উপর নির্ভর কর tsoa কী (Key) অবস্থা!
সতর্কতা এবং প্রতিবেদনের মাধ্যমে এগিয়ে যান।

### উন্নত ঘর:

দেখুন [\#574](https://github.com/lukeautry/tsoa/pull/574) এবং [\#575](https://github.com/lukeautry/tsoa/pull/575). .
এই এস- এস- এল পরিবর্তন না করতে পারার ফলে, কিন্তু এটি কার্যকরকরণ, দুঃখিতর চেয়ে নিরাপদ

### কোনো হোস্ট নির্ধারিত না হলে ডিফল্ট আচরণ পরিবর্তন করুন:

খুব দ্রুত আপনার হোস্ট সেট করুন যদি আপনি একেবারে সঠিক url চান । যারা ব্যবহার করছিল তাদের জন্য এটি একটি ভাঙ্গা পরিবর্তন। OpenAPI ৩, কিন্তু এটা আসলে আনা tsoa ব্যবস্থাপনার উদ্দেশ্যে চিহ্নিত প্যারিটিসহ স্ট্রাইপড `host` বৈশিষ্ট্য Swagger ২) পূর্ববর্তীভাবে OpenAPI ৩ জন ব্যবহারকারী এর ফলে চলে গেছে `null` যেটা আমরা সবাই অনুভব করেছিলাম অদ্ভুত. এখন বাদ দাও `host` বিষয় tsoa url- র আপেক্ষিক হওয়া উচিত।

### প্রদর্শন তালিকায় যোগ করো...

অতিরিক্ত বৈশিষ্ট্য সনাক্ত হলে নিষ্ক্রিয় করা হবে (আপনি যদি ব্যবহার করেন) tsoa বৈশিষ্ট্য `additionalProperties: 'throw-on-extras'`না ।

```js
{
  "TestModel..additionalProp: : {
    ...
  }
}
```

এটি এখন ঠিক এবং কী `TestModel.additionalProp`. .

### স্পেকট্রাম ব্যবহার করো Swagger ( চিহ্ন)`tsoa swagger` বর্তমানে উপলব্ধ রয়েছে, কিন্তু অবশেষে মুছে ফেলা হবে [\#664](https://github.com/lukeautry/tsoa/pull/664) ( চিহ্ন)[WoH](https://github.com/WoH)আপনি কি মনে করতে পারেন?

```diff
Calling the tsoa command
- tsoa swagger
+ tsoa spec

- tsoa swagger-and-routes
+ tsoa spec-and-routes

Manually calling spec generation
- await generateSwaggerSpec(swaggerConfig, routesConfig, compilerOptions, config.ignore);
+ await generateSpec(openapiConfig, compilerOptions, config.ignore);
```

tsoa"জসন:

```js
{
  "swagger": {}
}
```

অতিক্রান্ত

```js
{
  "spec": {}
}
```

- উপরের স্তরের উপরে শেয়ার করা [\#628](https://github.com/lukeautry/tsoa/pull/628) ( চিহ্ন)[WoH](https://github.com/WoH)আপনি কি মনে করতে পারেন?

কনফিগকে বিরক্ত করা এবং অনেক কিছু পরিচালনা করার পরিবর্তে নতুন কনফিগারেশন অনেক সহজ।
কনফিগ সেটিংস, যে সর্বোচ্চ স্তরের ওপর কনফিগ বস্তুর অবস্থান এবং নমুনা উভয় স্থানে অবস্থিত ।

```json
{
  "entryFile": "./tests/fixtures/express/server.ts",
  "noImplicitAdditionalProperties": "silently-remove-extras",
  "routes": {},
  "spec": {}
}
```

এর মানে হল যদি আপনার মানসমূহ আলাদা হয় (যেমন, অন্তর্ভুক্তির জন্য আপনাকে কল করতে হবে) `generateRoutes()` এবং `generateSpec()` নিজে।
লক্ষ্য করুন যে এই পদ্ধতি এখন একটি সহজ কনফিগারেশন আছে:

```diff
-    await generateSwaggerSpec(swaggerConfig, routesConfig, compilerOptions, config.ignore);
+    await generateSpec(openapiConfig, compilerOptions, config.ignore);
```

```diff
-    await generateRoutes(routesConfig, swaggerConfig, compilerOptions, config.ignore);
+    await generateRoutes(routesConfig, compilerOptions, config.ignore);
```

এন্ট্রি এবং যোগ করুন এখন বৈশিষ্ট্য নির্ধারণ করা যাবে কনফিগ.

এছাড়াও, শিক্ষা সংক্রান্ত বিবিধ বৈশিষ্ট্য সরিয়ে ফেলা হয়েছে: #৫০৩
চিহ্নিত বৈশিষ্ট্য বৈধ নয়: `'throw-on-extras' | 'silently-remove-extras' | 'ignore'`এবং সবকিছু ফিরে আসে `'ignore'`. .

** রেফারেন্সের জন্য, সমস্ত কনফিগের TS ইন্টারফেস দেখুন [here](./reference/tsoa-next/interfaces/Config.md)**

### TypeScript ইউনিয়ন এখন বাস্তবায়িত হচ্ছে `anyOf` চিহ্নিত স্থানে OpenAPI [\#671](https://github.com/tsoa-next/tsoa-next/issues/671)
