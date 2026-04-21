---
lastUpdated: 2026-04-20T21:59:41.368Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/cli](../index.md) / ExtendedSpecConfig

# ইন্টারফেস: এক্সটেন্ডেডSpecConfig

নির্ধারিত মান: [cli/src/api.ts:387](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/api.ts#L387)

কনফিগারেশনের উৎস পরিবর্তিত হয়েছে [validateSpecConfig](../functions/validateSpecConfig.md). .

## সফল

- `SpecConfig`

## বৈশিষ্ট্য

### basePath?

```ts
optional basePath?: string;
```

নির্ধারিত মান: [packages/runtime/src/config.ts:163](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L163)

বেস API পাথ; উদাহরণস্বরূপ, 'v1' - এ https://myapi.com/v1

#### প্রথমে যে ফন্টটি ব্যবহৃত হবে; যেমন: 'Serif 27'

```ts
SpecConfig.basePath
```

***

### contact?

```ts
optional contact?: object;
```

নির্ধারিত মান: [packages/runtime/src/config.ts:135](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L135)

প্রকাশিত API-র সাথে তথ্য যোগাযোগ করুন।

#### email?

```ts
optional email?: string;
```

পরিচিতির ই-মেইল ঠিকানা।

##### Default

```ts
npm package author email
```

#### name?

```ts
optional name?: string;
```

পরিচিতি যোগ করা যায়নি।

##### Default

```ts
npm package author
```

#### url?

```ts
optional url?: string;
```

পরিচিতির তথ্য উল্লেখ করার জন্য URL।

##### Default

```ts
npm package author url
```

#### প্রথমে যে ফন্টটি ব্যবহৃত হবে; যেমন: 'Serif 27'

```ts
SpecConfig.contact
```

***

### controllerPathGlobs?

```ts
optional controllerPathGlobs?: string[];
```

নির্ধারিত মান: [cli/src/api.ts:390](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/api.ts#L390)

***

### description?

```ts
optional description?: string;
```

নির্ধারিত মান: [packages/runtime/src/config.ts:124](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L124)

API-র বিবরণ; ডিফল্ট মান অগ্রাহ্য করা হবে npm প্যাকেজের বিবরণ

#### প্রথমে যে ফন্টটি ব্যবহৃত হবে; যেমন: 'Serif 27'

```ts
SpecConfig.description
```

***

### disableBasePathPrefixSlash?

```ts
optional disableBasePathPrefixSlash?: boolean;
```

নির্ধারিত মান: [packages/runtime/src/config.ts:170](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L170)

নিয়ন্ত্রণ `basePath` সেটি সংযুক্ত রয়েছে `/` লেখার সময় OpenAPI ৩ সার্ভার URL।

শুধু উপলব্ধ সংস্করণ 3 বা 3. 1.1- র সাথে উপলব্ধ ।

#### প্রথমে যে ফন্টটি ব্যবহৃত হবে; যেমন: 'Serif 27'

```ts
SpecConfig.disableBasePathPrefixSlash
```

***

### entryFile

```ts
entryFile: string;
```

নির্ধারিত মান: [cli/src/api.ts:388](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/api.ts#L388)

***

### host?

```ts
optional host?: string;
```

নির্ধারিত মান: [packages/runtime/src/config.ts:88](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L88)

মধ্যমের জন্য API হোস্ট-নেম Swagger উদাহরণ স্বরূপ ২- টি আউটপুট `localhost:3000`. .

#### প্রথমে যে ফন্টটি ব্যবহৃত হবে; যেমন: 'Serif 27'

```ts
SpecConfig.host
```

***

### license?

```ts
optional license?: string;
```

নির্ধারিত মান: [packages/runtime/src/config.ts:158](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L158)

API লাইসেন্স; ডিফল্ট মান হল npm কোনো প্যাকেজ উপস্থিত নেই

#### প্রথমে যে ফন্টটি ব্যবহৃত হবে; যেমন: 'Serif 27'

```ts
SpecConfig.license
```

***

### name?

```ts
optional name?: string;
```

নির্ধারিত মান: [packages/runtime/src/config.ts:119](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L119)

API নাম; ডিফল্ট মান ধার্য করা হবে npm প্যাকেজের নাম

#### প্রথমে যে ফন্টটি ব্যবহৃত হবে; যেমন: 'Serif 27'

```ts
SpecConfig.name
```

***

### noImplicitAdditionalProperties

```ts
noImplicitAdditionalProperties: "ignore" | "throw-on-extras" | "silently-remove-extras";
```

নির্ধারিত মান: [cli/src/api.ts:389](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/api.ts#L389)

***

### operationIdTemplate?

```ts
optional operationIdTemplate?: string;
```

নির্ধারিত মান: [packages/runtime/src/config.ts:197](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L197)

অপারেশনের জন্য টেমপ্লেট স্ট্রিং ।
এটি একটি কার্যকর হ্যান্ডেলের টেমপ্লেট এবং সরবরাহ করা উচিত
নিম্নলিখিত কনটেক্সট সহ:
  - 'ইসারলার' - কন্ট্রোল ক্লাসের স্ট্রিং নাম।
  - - টাসো। পদ্ধতি অবজেক্ট

#### Default

```ts
'{{titleCase method.name}}'
```

#### প্রথমে যে ফন্টটি ব্যবহৃত হবে; যেমন: 'Serif 27'

```ts
SpecConfig.operationIdTemplate
```

***

### outputDirectory

```ts
outputDirectory: string;
```

নির্ধারিত মান: [packages/runtime/src/config.ts:83](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L83)

ফাইলের বিস্তারিত বর্ণনাসূচক ডিরেক্টরি ।

#### প্রথমে যে ফন্টটি ব্যবহৃত হবে; যেমন: 'Serif 27'

```ts
SpecConfig.outputDirectory
```

***

### rootSecurity?

```ts
optional rootSecurity?: Security[];
```

নির্ধারিত মান: [packages/runtime/src/config.ts:232](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L232)

সকল API-র মধ্যে উপস্থিত ডিফল্ট নিরাপত্তাগুলির সাথে সংযোগ স্থাপন করা হবে।
তার সঙ্গে প্রতারণা করা যেতে পারে `@Security(...)` অথবা `@NoSecurity()` কন্ট্রোলার বা পদ্ধতিবিদ।

#### প্রথমে যে ফন্টটি ব্যবহৃত হবে; যেমন: 'Serif 27'

```ts
SpecConfig.rootSecurity
```

***

### schemes?

```ts
optional schemes?: Protocol[];
```

নির্ধারিত মান: [packages/runtime/src/config.ts:215](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L215)

সমর্থিত প্রোটোকল Swagger ২ আউটপুট।

#### প্রথমে যে ফন্টটি ব্যবহৃত হবে; যেমন: 'Serif 27'

```ts
SpecConfig.schemes
```

***

### securityDefinitions?

```ts
optional securityDefinitions?: object;
```

নির্ধারিত মান: [packages/runtime/src/config.ts:202](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L202)

নিরাপত্তা পরিকল্পনা ঘোষণা করা হয়েছে.

#### ইন্ডেক্স স্বাক্ষর

```ts
[name: string]: SecuritySchemes
```

#### প্রথমে যে ফন্টটি ব্যবহৃত হবে; যেমন: 'Serif 27'

```ts
SpecConfig.securityDefinitions
```

***

### servers?

```ts
optional servers?: string[];
```

নির্ধারিত মান: [packages/runtime/src/config.ts:95](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L95)

সার্ভারের URL OpenAPI ৩ আউটপুট।

শুধু উপলব্ধ সংস্করণ 3 বা 3. 1.1- র সাথে উপলব্ধ ।

#### প্রথমে যে ফন্টটি ব্যবহৃত হবে; যেমন: 'Serif 27'

```ts
SpecConfig.servers
```

***

### spec?

```ts
optional spec?: unknown;
```

নির্ধারিত মান: [packages/runtime/src/config.ts:176](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L176)

বস্তু উত্‍পাদনে পরিপূর্ণ।
যে সমস্ত বৈশিষ্ট্য এখানে প্রদান করা হয়েছে, তার বৈশিষ্ট্যের উপর নির্ভর করে ।

#### প্রথমে যে ফন্টটি ব্যবহৃত হবে; যেমন: 'Serif 27'

```ts
SpecConfig.spec
```

***

### specFileBaseName?

```ts
optional specFileBaseName?: string;
```

নির্ধারিত মান: [packages/runtime/src/config.ts:102](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L102)

আসল নাম. জসন অথবা পাস্তার. হুম।

@ডিফল্ট: “সাজিটার”

#### প্রথমে যে ফন্টটি ব্যবহৃত হবে; যেমন: 'Serif 27'

```ts
SpecConfig.specFileBaseName
```

***

### specMerging?

```ts
optional specMerging?: "immediate" | "recursive" | "deepmerge";
```

নির্ধারিত মান: [packages/runtime/src/config.ts:186](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L186)

নিয়ন্ত্রণ `spec` এই ডকুমেন্টটি তৈরি করা হয়েছে।
সম্ভাব্য মান:
 - শুধুমাত্র উপরের স্তরের উপাদানের উপর ভিত্তি করে।
 - 'আধুনিক' ব্যবহার করে একটি গভীর সারাংশ প্রদর্শন করা হয় `merge`. .
 - 'মরগে' একটি গভীর রূপ ধারণ করে `ts-deepmerge`যার মধ্যে অ্যারেও আছে।

#### Default

```ts
'immediate'
```

#### প্রথমে যে ফন্টটি ব্যবহৃত হবে; যেমন: 'Serif 27'

```ts
SpecConfig.specMerging
```

***

### specVersion?

```ts
optional specVersion?: SupportedSpecMajorVersion;
```

নির্ধারিত মান: [packages/runtime/src/config.ts:114](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L114)

মেজর OpenAPI সংস্করণ তৈরি করতে সংস্করণ; এর পরিবর্তে দু'টি সংস্করণ উল্লেখ করা আবশ্যক
সম্ভাব্য মান:
 - ব্যাক-স্পেস: OpenAPI সংস্করণ ২.
 - লক্ষ্য: OpenAPI সংস্করণ ৩.
 - ৩.১: উৎ‌পন্ন হয় OpenAPI সংস্করণ ৩.১।

#### প্রথমে যে ফন্টটি ব্যবহৃত হবে; যেমন: 'Serif 27'

```ts
SpecConfig.specVersion
```

***

### tags?

```ts
optional tags?: Tag[];
```

নির্ধারিত মান: [packages/runtime/src/config.ts:209](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L209)

বিবিধ বৈশিষ্ট্য সহ ঊর্ধ্বস্থ প্লাগ-ইন

#### প্রথমে যে ফন্টটি ব্যবহৃত হবে; যেমন: 'Serif 27'

```ts
SpecConfig.tags
```

***

### termsOfService?

```ts
optional termsOfService?: string;
```

নির্ধারিত মান: [packages/runtime/src/config.ts:130](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L130)

এই পাতাটির লিঙ্ক যা সার্ভিস এর শর্ত বর্ণনা করে।
URL বিন্যাসে উপস্থিত থাকা আবশ্যক।

#### প্রথমে যে ফন্টটি ব্যবহৃত হবে; যেমন: 'Serif 27'

```ts
SpecConfig.termsOfService
```

***

### useTitleTagsForInlineObjects?

```ts
optional useTitleTagsForInlineObjects?: boolean;
```

নির্ধারিত মান: [packages/runtime/src/config.ts:226](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L226)

ক্লায়েন্ট উত্‍পাদনের জন্য তথ্য ও অনুরোধকৃত বস্তুর মধ্যে প্রভেদ অন্তর্ভুক্ত করুন।

#### প্রথমে যে ফন্টটি ব্যবহৃত হবে; যেমন: 'Serif 27'

```ts
SpecConfig.useTitleTagsForInlineObjects
```

***

### version?

```ts
optional version?: string;
```

নির্ধারিত মান: [packages/runtime/src/config.ts:105](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L105)

API সংস্করণ সংখ্যা; ডিফল্ট মান version অবস্থায় রয়েছে।

#### প্রথমে যে ফন্টটি ব্যবহৃত হবে; যেমন: 'Serif 27'

```ts
SpecConfig.version
```

***

### xEnumVarnames?

```ts
optional xEnumVarnames?: boolean;
```

নির্ধারিত মান: [packages/runtime/src/config.ts:221](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L221)

x-y- arch সমর্থন সক্রিয় করুন

#### Default

```ts
false
```

#### প্রথমে যে ফন্টটি ব্যবহৃত হবে; যেমন: 'Serif 27'

```ts
SpecConfig.xEnumVarnames
```

***

### yaml?

```ts
optional yaml?: boolean;
```

নির্ধারিত মান: [packages/runtime/src/config.ts:212](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L212)

JSON এর পরিবর্তে YAML এর বর্ণনার লিখুন ।

#### প্রথমে যে ফন্টটি ব্যবহৃত হবে; যেমন: 'Serif 27'

```ts
SpecConfig.yaml
```
