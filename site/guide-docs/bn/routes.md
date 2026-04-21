---
lastUpdated: 2026-04-17T20:53:42.041Z
---
# আহরণের পথ

রিলেভেন্ট API উল্লেখ করেছে: [`Config`](./reference/tsoa-next/interfaces/Config.md) এবং [`@Route`](./reference/tsoa-next/functions/Route.md). .

বলার মত দুটো উপায় আছে tsoa যেখানে কন্ট্রোলার খুঁজে পায় যে স্বয়ংক্রিয় স্বয়ংক্রিয়ভাবে কি-রিং তৈরি করতে এটি ব্যবহার করা হবে `routes.ts` ফাইল.

## বার্তা নিয়ন্ত্রণ

আপনি বলতে পারেন `tsoa-next` একবার অথবা অধিক সংখ্যক ব্যক্তির প্রদান করার ফলে স্বয়ংক্রিয়রূপে নিয়ন্ত্রণ ব্যবস্থা প্রয়োগ করা হবে [minimatch globs](http://www.globtester.com/) উপরের স্তরের উপরে `controllerPathGlobs` তোমার ক্ষেত্রের ক্ষেত্র [`Config`](./reference/tsoa-next/interfaces/Config.md) (যেমন ফাইল) `tsoa.json`- হ্যা.

প্রো:

- নতুন ডেভেলপাররা কিভাবে জানে না তা না জেনেই নিয়ন্ত্রক যোগ করতে পারে tsoa কন্ট্রোলার থেকে "ট্রেল" যতক্ষণ না তাদের নিয়ন্ত্রককে ধরা হয়... ...তখন কন্ট্রোলার এর সাথে যুক্ত হবে OpenAPI স্বয়ংক্রিয়ভাবে উৎপন্ন করার উদ্দেশ্যে চিহ্নিত নথিপত্র `routes.ts` ফাইল.

কনস:

- এটা বিকল্প সুসিত্বের পদক্ষেপের চেয়ে একটু ধীর হতে পারে tsoa কনফিগার এবং লোড করার জন্য চেক করুন।

এখানে আপনি কন্ট্রোলার এর বিন্যাস দেখতে পারেন, আপনি বিভিন্ন বিন্যাসের বেশ কিছু নমুনা প্রদান করতে পারেন:

```js
{
  "entryFile": "...",
  "controllerPathGlobs": [
    "./dir-with-controllers/*",
    "./recursive-dir/**/*",
    "./custom-filerecursive-dir/**/*.controller.ts"
  ],
  "routes": {
    "routesDir": "...",
    "middleware": "..."
  }
}
```

## ব্যবহারকারী দ্বারা tsoa অ্যাপ্লিকেশন এন্ট্রিতে যে নিয়ন্ত্রণ ব্যবস্থাটি ব্যবহৃত হয়

যদি তুমি দূরে যাও `controllerPathGlobs`'%s' tsoa অ্যাপ্লিকেশন এন্ট্রি এবং অনুসরণ করতে সক্ষম ফাইল ইম্পোর্ট করা যাবে `@Route` পরিষ্কারকারী.

প্রো:

- রুট প্রজন্ম সাধারণত দ্রুত হতে পারে tsoa গ্লোলোর বদলে আপনার স্পষ্ট আমদানির অনুসরণ করুন।

কনস:

- আপনার দলের নতুন ডেভেলপাররা হয়তো একটি কন্ট্রোলার যোগ করতে পারেন এবং বুঝতে না পারে না কেন নতুন কন্ট্রোল নিয়ন্ত্রক রাউটার বা নতুন কন্ট্রোলার কেন উন্মুক্ত করা হয়নি। OpenAPI প্রজন্ম। যদি তোমার সমস্যা হয়, তাহলে `controllerPathGlobs`. .

```typescript
import * as methodOverride from 'method-override'
import * as express from 'express'
import * as bodyParser from 'body-parser'
import { RegisterRoutes } from './routes'

// ########################################################################
// controllers need to be referenced in order to get crawled by the generator
import './users/usersController'
// ########################################################################

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(methodOverride())

RegisterRoutes(app)

app.listen(3000)
```
