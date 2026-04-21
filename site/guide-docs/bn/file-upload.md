---
lastUpdated: 2026-04-17T20:53:42.040Z
---
# ফাইল আপলোড করা হচ্ছে

রিলেভেন্ট API উল্লেখ করেছে: [`File`](./reference/tsoa-next/interfaces/File.md)'%s' [`@FormField`](./reference/tsoa-next/functions/FormField.md)'%s' [`@UploadedFile`](./reference/tsoa-next/functions/UploadedFile.md)এবং [`@UploadedFiles`](./reference/tsoa-next/functions/UploadedFiles.md). .

## স্লিপার সিস্টেমের আপগ্রেড করুন

উল্লিখিত সময় অবধি Express:

::: code-group

```bash [npm]
npm install multer
npm install -D @types/multer
```

```bash [pnpm]
pnpm add multer
pnpm add -D @types/multer
```

```bash [yarn]
yarn add multer
yarn add -D @types/multer
```

:::

উল্লিখিত সময় অবধি Koa:

::: code-group

```bash [npm]
npm install @koa/multer
```

```bash [pnpm]
pnpm add @koa/multer
```

```bash [yarn]
yarn add @koa/multer
```

:::

## ব্যবহারের প্রণালী `@UploadedFile` / `@UploadedFiles` শব্দভাণ্ডার সমৃদ্ধকারী

নির্মিত স্থাপত্যের ব্যবহার tsoa-nextএক্সপোর্ট করা হয়েছে [`File`](./reference/tsoa-next/interfaces/File.md) ইন্টারফেস।
ব্যবহার [`@FormField()`](./reference/tsoa-next/functions/FormField.md) আপলোড করার জন্য ভিন্ন ফাইলটিকে অন্তর্ভুক্ত না করা হলে, উদ্দিষ্ট ক্ষেত্রের জন্য চিহ্নিত করুন।

```ts
import { Controller, File, FormField, Post, Route, UploadedFile, UploadedFiles } from 'tsoa-next'

@Route('files')
export class FilesController extends Controller {
  @Post('single')
  public async uploadSingle(@FormField() title: string, @UploadedFile('asset') asset: File): Promise<{ title: string; originalName: string }> {
    return {
      title,
      originalName: asset.originalname,
    }
  }

  @Post('many')
  public async uploadMany(@UploadedFiles('assets') assets: File[]): Promise<{ count: number }> {
    return {
      count: assets.length,
    }
  }
}
```

## ডিফল্ট সাক্ষাৎ‌কার আচরণ

গঠিত Express এবং Koa শব্দভাণ্ডার আপলোড করার সময় একটি ডিফল্ট Metorer ইনস্ট্যান্স তৈরি করা হবে ।
ডিফল্ট হিসাবে, মেমরিতে আপলোড করার সময় ফাইল আপলোড করা হয় ।

যদি আপনি ডিস্ক আপলোড করতে চান অথবা একটি স্বনির্ধারিত Muratters কনফিগারেশন দ্বারা আপনার নিজের Mitererer ইনস্ট্যান্সে প্রবেশ করান, তাহলে `RegisterRoutes(...)`. .

## স্বনির্ধারিত কনফিগারেশন

Express উদাহরণ:

```ts
import express, { json, urlencoded } from 'express'
import multer from 'multer'
import { RegisterRoutes } from '../build/routes'

const app = express()

app.use(urlencoded({ extended: true }))
app.use(json())

RegisterRoutes(app, {
  multer: multer({ dest: 'uploads/' }),
})
```

Koa উদাহরণ:

```ts
import Router from '@koa/router'
import multer from '@koa/multer'
import { RegisterRoutes } from '../build/routes'

const router = new Router()

RegisterRoutes(router, {
  multer: multer({ dest: 'uploads/' }),
})
```

আরো একটা বড় স্তর আছে `multerOpts` কনফিগ ক্ষেত্র `tsoa.json`- কিন্তু তা হয়নি।
মৃগী বাবিলের পতন `RegisterRoutes(...)`. .

## ম্যানুয়ালি ব্যবস্থাপনা

যদি আপনি বাইপাস করতে চান `@UploadedFile(...)` ♪ আর নিজেকে কন্ট্রোলার নামে ডাকে ♪ `@Request()`আপনি নিজেই নিজেকে গঠন করার জন্য দায়ী।
এ ক্ষেত্রে, পূর্ববর্তী অনুরোধের বিস্তারিত বর্ণনা একত্রিত করুন `spec.spec` চিহ্নিত স্থানে `tsoa.json` তাই, OpenAPI ডকুমেন্টটি এখনো সঠিক ভাবে শেষ করার বিষয়টি বর্ণনা করছে।
