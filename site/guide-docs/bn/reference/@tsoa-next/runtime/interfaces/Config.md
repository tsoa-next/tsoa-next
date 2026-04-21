---
lastUpdated: 2026-04-20T21:59:41.312Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/runtime](../index.md) / Config

# ইন্টারফেস: কনফিগ

নির্ধারিত মান: [packages/runtime/src/config.ts:5](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L5)

মূল tsoa-next কনফিগারেশন CLI আর প্রোগ্রাম জেনারেটর.

## বৈশিষ্ট্য

### compilerOptions?

```ts
optional compilerOptions?: Record<string, unknown>;
```

নির্ধারিত মান: [packages/runtime/src/config.ts:47](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L47)

TypeScript প্রজন্মের পর প্রজন্ম ধরে ব্যবহার করা হয়।
sconfig থেকে কম্পাইল করার অপশনগুলি সম্পূর্ণ করা হয় ।

***

### controllerPathGlobs?

```ts
optional controllerPathGlobs?: string[];
```

নির্ধারিত মান: [packages/runtime/src/config.ts:29](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L29)

আপনার রুট নিয়ন্ত্রণকারী হতে একটি পাথ নিরোব একটি অ্যারে tsoa অন্তর্ভুক্ত।

***

### defaultNumberType?

```ts
optional defaultNumberType?: "long" | "integer" | "float" | "double";
```

নির্ধারিত মান: [packages/runtime/src/config.ts:68](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L68)

OpenAPI ব্যবহারযোগ্য ধরন TypeScript `number` যখন কোন সংকীর্ণ রেখা উপস্থিত হয় না।

#### Default

```ts
double
```

***

### entryFile

```ts
entryFile: string;
```

নির্ধারিত মান: [packages/runtime/src/config.ts:24](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L24)

আপনার API দ্বারা উল্লিখিত এনট্রি

***

### ignore?

```ts
optional ignore?: string[];
```

নির্ধারিত মান: [packages/runtime/src/config.ts:19](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L19)

উল্লিখিত সময় উপেক্ষা করার উদ্দেশ্যে ডিরেক্টরি TypeScript মিটা-ডাটা স্ক্যান

***

### এটা কি সত্যি?

```ts
optional multerOpts?: Options;
```

নির্ধারিত মান: [packages/runtime/src/config.ts:62](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L62)

বিড়ম্বল বিকল্প তৈরি করা হয়েছিল মধ্যবন্দির মাধ্যমে।
এটা `storage` এই বিকল্পটি সমর্থিত নয়।

#### Example

```ts
{
   *   "dest": "/tmp"
   * } Allows multer to write files to disk instead of keeping them in memory.
```

#### Deprecated

v640 থেকে, `RegisterRoutes` পাওয়া যাবে `multerOptions` সরাসরি।
 এই কনফিগারেশন উইন্ডোটি ভবিষ্যতে একটি পূর্ণরূপে মুছে যাবে।
 (https://github.com/tsoa-next/tsoa-next/issues/1587#issuecomment-2391291433)
 (https://github.com/tsoa-next/tsoa-next/pull/1638)

***

### noImplicitAdditionalProperties?

```ts
optional noImplicitAdditionalProperties?: "ignore" | "throw-on-extras" | "silently-remove-extras";
```

নির্ধারিত মান: [packages/runtime/src/config.ts:34](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L34)

API-র মধ্যে উপস্থিত ইনপুট তথ্য প্রয়োগ করে, ইনপুট সংক্রান্ত কোনো সহায়ক। এটা তোমার সিদ্ধান্ত। আপনি আপনার রাস্তায় অতিরিক্ত বৈধকরণ চালু করবেন।

***

### routes

```ts
routes: RoutesConfig;
```

নির্ধারিত মান: [packages/runtime/src/config.ts:14](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L14)

রুট প্রজন্মের কনফিগারেশন।

***

### spec

```ts
spec: SpecConfig;
```

নির্ধারিত মান: [packages/runtime/src/config.ts:9](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L9)

OpenAPI প্রজন্মের কনফিগারেশন।

***

### tsconfig?

```ts
optional tsconfig?: string;
```

নির্ধারিত মান: [packages/runtime/src/config.ts:41](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L41)

stconfig- র জন্য sourcector নির্দিষ্ট করতে ব্যবহার করা হয় ।
যদি না পারো, tsoa-next লোড করা অবস্থানের জন্য sconfig.জেসন অনুসন্ধান করা হবে tsoa কনফিগারেশন সংরক্ষণের ডিরেক্টরি।
এক্সিকিউশন কম্পাইলার অপশন tsoa-next কনফিগারেশন এখনও rconfig- র মান গ্রহণ করা হয়নি ।
