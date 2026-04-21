---
lastUpdated: 2026-04-17T20:53:42.040Z
---
# تحميل الملفات

المرجع ذو الصلة بالطلب: [`File`](./reference/tsoa-next/interfaces/File.md).. [`@FormField`](./reference/tsoa-next/functions/FormField.md).. [`@UploadedFile`](./reference/tsoa-next/functions/UploadedFile.md)و [`@UploadedFiles`](./reference/tsoa-next/functions/UploadedFiles.md).

## جهزوا العجلات المتوسطة

For Express:

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

For Koa:

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

## استخدام `@UploadedFile` / `@UploadedFiles` مصممو الديكور

مصممات التحميل تستخدم tsoa-nextتم تصديرها [`File`](./reference/tsoa-next/interfaces/File.md) واجهة
الاستخدام [`@FormField()`](./reference/tsoa-next/functions/FormField.md) للمجالات المتعددة الأطراف غير المتحركة التي تصل إلى جانب الحمولة.

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

## سلوك التخزين الافتراضي

المولدات Express و Koa الطرق تخلق حالة ملجأ غير مقصودة عندما تستخدم مصممات تحميل
عن طريق التقصير تلك الحالة تبقي الملفات المحملة في الذاكرة.

إذا كنت تريد تحميل مكتوبة لتقرير أو التعامل مع من قبل تشكيلة الملجأ العرفي، `RegisterRoutes(...)`.

## تشكيلة المذيبات العرفية

Express على سبيل المثال:

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

Koa على سبيل المثال:

```ts
import Router from '@koa/router'
import multer from '@koa/multer'
import { RegisterRoutes } from '../build/routes'

const router = new Router()

RegisterRoutes(router, {
  multer: multer({ dest: 'uploads/' }),
})
```

وهناك أيضا تراث على مستوى القمة `multerOpts` حقل الثقة `tsoa.json`لكنه مستهلك
تفضّل تمرير ملجأ خرساني `RegisterRoutes(...)`.

## المناولة المتعددة الجوانب

إذا اخترت التجاوز `@UploadedFile(...)` واتّصلي بالبائع داخل المتحكم `@Request()`أنت أيضاً مسؤولة عن توثيق ذلك الطلب
وفي هذه الحالة، دمج تفاصيل الطلبات المتعددة الأطراف في `spec.spec` في `tsoa.json` حتى تولد OpenAPI ولا تزال الوثيقة تصف النقطة النهائية بدقة.
