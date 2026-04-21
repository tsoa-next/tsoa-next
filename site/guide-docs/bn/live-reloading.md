---
title: পুনরায় লোড করা হচ্ছে
lang: bn-BD
lastUpdated: 2026-04-20T00:28:55.919Z
---

# পুনরায় লোড করা হচ্ছে

::: warning বিকল্প... (_O)
এই গাইডের লক্ষ্য [express](https://expressjs.com) এবং অনুমান `tsoa-next`বর্তমান সমর্থন নীতি: Node.js ২২ বা নতুন।
আমরা পূর্ববর্তী এলটিএস, বর্তমান এলটিএস এবং এর সমর্থন পরীক্ষা Node CI তে পরবর্তী বনাম
নীচে উদাহরণ `npm`'%s' `pnpm`এবং `yarn` যেখানে কমান্ডটা আলাদা।
আমরা ধরে নিচ্ছি, আপনার ব্যবস্থাপনা একই রকম [getting started](/bn/getting-started)
:::

রিলেভেন্ট API উল্লেখ করেছে: [`@SpecPath`](./reference/tsoa-next/functions/SpecPath.md)'%s' [`SpecPathOptions`](./reference/tsoa-next/interfaces/SpecPathOptions.md)'%s' [`SpecRequestContext`](./reference/tsoa-next/interfaces/SpecRequestContext.md)এবং [`SpecCacheHandler`](./reference/tsoa-next/interfaces/SpecCacheHandler.md). .

::: tip
আমরা ব্যবহার করব [nodemon](https://nodemon.io/) এবং [ts-node](https://github.com/TypeStrong/ts-node) সরাসরি পুনরায় লোড করার জন্য, কিন্তু যে কোন যন্ত্র আমাদের পুনরায় লোড প্রক্রিয়া করতে দেয়। বিকল্প, যেমন... `tsc -w` এবং ট্রিগার `tsoa spec-and-routes` ব্যবহার [`onchange`](https://www.npmjs.com/package/onchange). .
:::

** আমরা কি বলবো:

[[toc]]

## কোড পুনরায় লোড করুন

### নোডমন ইন্সটল করা হচ্ছে এবং st-dy

::: code-group

```bash [npm]
npm i -D nodemon ts-node concurrently
```

```bash [pnpm]
pnpm add -D nodemon ts-node concurrently
```

```bash [yarn]
yarn add -D nodemon ts-node concurrently
```

:::

### একটি নোডের কনফিগারেশন তৈরি করুন

এখন, চলো শুরু করি `nodemon.json` আমাদের প্রকল্পের মূল ফোল্ডার যা এভাবে দেখা যায়:

```json
{
  "exec": "ts-node src/server.ts",
  "watch": ["src"],
  "ext": "ts"
}
```

### একটি স্ক্রিপ্ট যোগ করা হচ্ছে

প্যাকেজ পরিচালন ব্যবস্থার সাহায্যে স্বয়ংক্রিয়রূপে এই বৈশিষ্ট্য আরম্ভ করা যাবে `dev` স্ক্রিপ্ট`npm run dev`'%s' `pnpm dev`অথবা `yarn dev`এবং, এবং, যখন আমরা এটি মধ্যে, যোগ, `build` এবং `start` আমাদের মধ্যে কমান্ড `package.json`:

```diff
{
  "name": "starter",
  "version": "0.0.1",
+ "scripts": {
+   "dev": "concurrently \"nodemon\" \"nodemon -x tsoa spec-and-routes\"",
+   "build": "tsoa spec-and-routes && tsc",
+   "start": "node build/src/server.js"
+ },
  "dependencies": {
  // ...
}
```

## [ অধ্যয়ন প্রশ্নাবলি] `@SpecPath`

[`@SpecPath(...)`](./reference/tsoa-next/functions/SpecPath.md) ধ্রুব পাঠের ব্যবস্থা না করে সরাসরি পর্যবেক্ষণ করুন `swagger.json` অথবা `openapi.yaml` অনুরোধের সময় থেকে ডিস্কের অবস্থা।
এতে উন্নয়নশীল কাজের প্রবাহের জন্য এটি ভালো হবে, যেখানে আপনি চান আপনি একই যন্ত্র দ্বারা আপনার মিটা রুটের সাথে যোগাযোগ করুন।

### একটি ডক ডিরেক্টরি ইনস্টল করা হচ্ছে

চলমান UI লক্ষ্য নির্বাচন করুন:

- Express: `npm i swagger-ui-express` / `pnpm add swagger-ui-express` / `yarn add swagger-ui-express`- Koa: `npm i swagger-ui-koa` / `pnpm add swagger-ui-koa` / `yarn add swagger-ui-koa`- Hapi: `npm i hapi-swagger` / `pnpm add hapi-swagger` / `yarn add hapi-swagger`- Redoc: `npm i redoc` / `pnpm add redoc` / `yarn add redoc`- RapiDoc: `npm i rapidoc` / `pnpm add rapidoc` / `yarn add rapidoc`

### stpers নিয়ন্ত্রণ কেন্দ্র

এক অথবা অধিক ক্লিক করুন `@SpecPath(...)` বর্তমানে উপস্থিত কন্ট্রোলার- এর সংস্কারকারী:

```ts
import { Controller, Get, Route, SpecPath } from 'tsoa-next'

@Route('users')
@SpecPath()
@SpecPath('openapi.yaml', { target: 'yaml' })
@SpecPath('docs', { target: 'swagger' })
export class UsersController extends Controller {
  @Get()
  public list(): string[] {
    return []
  }
}
```

এটা আপনাকে দিচ্ছে:

- `GET /users/spec` JSON এর জন্য
- `GET /users/openapi.yaml` YAM এর জন্য
- `GET /users/docs` উল্লিখিত সময় অবধি Swagger UI

কারণ ডকের সমাপ্তির ব্যবস্থা হয় একই রান থেকে, আপনার রুট হিসেবে, এটা বর্তমান সময় ধরে থাকবে আপনি সম্পাদনকারী এবং পুনরায় চালু `tsoa spec-and-routes`. .

### নথিপত্র পড়ুন

এখন, যখন আমরা যেতে যাব <a href="http://localhost:3000/users/docs" target="_blank" rel="noreferrer">স্থানীয় হোস্ট: ৩০: ০০/user/ users</a>( ১ করি.

![SwaggerUI](/docs-images/SwaggerUI.png)

### তথ্যে পাঠানো হচ্ছে Swagger UI

আমরা শেষ উপায় নির্বাচন করতে পারি, "এটা" বাটন ক্লিক করে ফর্মটি পূরণ করে কিছু তথ্য জমা দিতে পারি।
যখন আমরা "বাতিল" আঘাত করি তখন আমাদের সার্ভারে পাঠানো হবে এবং নীচে প্রদর্শিত ফর্মের প্রত্যুত্তর প্রদর্শন করা হবে।

![SwaggerUI Response](/docs-images/SwUi-Response.png)

### নির্মিত ইন-লাইন টার্গেট

ভিন্ন UI পছন্দ হলে, পরিবর্তন `target` বিকল্প:

- `@SpecPath('docs', { target: 'redoc' })`- `@SpecPath('docs', { target: 'rapidoc' })`

যদি আপনার পূর্ণ স্বনির্বাচিত সাড়া প্রয়োজন, তাহলে একটি হ্যান্ডলার পাস করুন `target` এর পরিবর্তে। এছাড়াও আপনি যোগ করতে পারেন `cache` এবং `gate` একই অবজেক্টের সাহায্যে ।
