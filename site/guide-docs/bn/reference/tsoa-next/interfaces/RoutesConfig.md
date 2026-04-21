---
lastUpdated: 2026-04-20T21:59:41.344Z
---
[tsoa-next](../../packages.md) / [tsoa-next](../index.md) / RoutesConfig

# ইন্টারফেস: রুট কনফিগ

নির্ধারিত মান: [packages/runtime/src/config.ts:235](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L235)

## বৈশিষ্ট্য

### authenticationModule?

```ts
optional authenticationModule?: string;
```

নির্ধারিত মান: [packages/runtime/src/config.ts:274](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L274)

প্রাপ্ত রুট দ্বারা ব্যবহৃত অনুমোদনের পাথ।

***

### basePath?

```ts
optional basePath?: string;
```

নির্ধারিত মান: [packages/runtime/src/config.ts:254](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L254)

বেস API পাথ; উদাহরণস্বরূপ, 'vi' - এ https://myapi.com/v1

***

### bodyCoercion?

```ts
optional bodyCoercion?: boolean;
```

নির্ধারিত মান: [packages/runtime/src/config.ts:288](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L288)

অনুরোধ করা দেহকে সম্পূর্ণভাবে গ্রহণ করার পরামিতি প্রযোজ্য কি না।

#### Default

```ts
true
```

***

### esm?

```ts
optional esm?: boolean;
```

নির্ধারিত মান: [packages/runtime/src/config.ts:281](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L281)

সক্রিয় করা হলে, রুট ইম্পোর্ট ব্যবস্থা নিষ্ক্রিয় করা হবে `.js` ESM আউটপুটের জন্য এক্সটেনশন।

#### Default

```ts
false
```

***

### iocModule?

```ts
optional iocModule?: string;
```

নির্ধারিত মান: [packages/runtime/src/config.ts:269](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L269)

উদাহরণস্বরূপ, আইওসি মডিউলের পাথ `./inversify/ioc`. .

***

### middleware?

```ts
optional middleware?: "express" | "hapi" | "koa";
```

নির্ধারিত মান: [packages/runtime/src/config.ts:259](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L259)

মিডলওয়্যার উপলব্ধকারী।

***

### middlewareTemplate?

```ts
optional middlewareTemplate?: string;
```

নির্ধারিত মান: [packages/runtime/src/config.ts:264](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L264)

স্বনির্ধারিত Handlebars & বদলাও

***

### noWriteIfUnchanged?

```ts
optional noWriteIfUnchanged?: boolean;
```

নির্ধারিত মান: [packages/runtime/src/config.ts:249](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L249)

ফাইলটি উপস্থিত থাকলে, নির্মিত ফাইল মুছে ফেলো

***

### rewriteRelativeImportExtensions?

```ts
optional rewriteRelativeImportExtensions?: boolean;
```

নির্ধারিত মান: [packages/runtime/src/config.ts:295](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L295)

সক্রিয় করা হলে, রুট ইম্পোর্ট করা হলে `.ts` সমর্থনের জন্য চিহ্নিত এক্সটেনশন TypeScript ৫.৭ `rewriteRelativeImportExtensions`. .

#### Default

```ts
false
```

***

### routesDir

```ts
routesDir: string;
```

নির্ধারিত মান: [packages/runtime/src/config.ts:239](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L239)

ফাইল নির্মাণের উদ্দেশ্যে চিহ্নিত পাথ।

***

### routesFileName?

```ts
optional routesFileName?: string;
```

নির্ধারিত মান: [packages/runtime/src/config.ts:244](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L244)

নির্মাণের উদ্দেশ্যে চিহ্নিত পাথ।
