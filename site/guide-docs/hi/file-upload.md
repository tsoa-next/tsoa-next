---
lastUpdated: 2026-04-17T20:53:42.040Z
---
# फ़ाइलों को अपलोड करना

प्रासंगिक एपीआई संदर्भ: [`File`](./reference/tsoa-next/interfaces/File.md), [`@FormField`](./reference/tsoa-next/functions/FormField.md), [`@UploadedFile`](./reference/tsoa-next/functions/UploadedFile.md), और [`@UploadedFiles`](./reference/tsoa-next/functions/UploadedFiles.md)।

## रनटाइम अपलोड मिडलवेयर इंस्टॉल करें

के लिए Express:

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

के लिए Koa:

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

## उपयोग करना `@UploadedFile` / `@UploadedFiles` सजावट

अंतर्निहित अपलोड सजावटकर्ता उपयोग करते हैं tsoa-nextनिर्यात [`File`](./reference/tsoa-next/interfaces/File.md) इंटरफ़ेस।
उपयोग [`@FormField()`](./reference/tsoa-next/functions/FormField.md) गैर फ़ाइल multipart क्षेत्रों है कि अपलोड के साथ आने के लिए।

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

## डिफ़ॉल्ट भंडारण व्यवहार

उत्पन्न Express और Koa जब आप अपलोड सजावट का उपयोग करते हैं तो रूट डिफ़ॉल्ट मल्टर उदाहरण बनाते हैं।
डिफ़ॉल्ट रूप से यह है कि उदाहरण स्मृति में अपलोड फ़ाइलों को रखता है।

यदि आप एक कस्टम मल्टीटर कॉन्फ़िगरेशन द्वारा डिस्क या संभालना चाहते हैं, तो अपने स्वयं के मल्टीटर उदाहरण को पास करें `RegisterRoutes(...)`।

## कस्टम multer विन्यास

Express उदाहरण:

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

Koa उदाहरण:

```ts
import Router from '@koa/router'
import multer from '@koa/multer'
import { RegisterRoutes } from '../build/routes'

const router = new Router()

RegisterRoutes(router, {
  multer: multer({ dest: 'uploads/' }),
})
```

एक विरासत शीर्ष स्तर भी है `multerOpts` में विन्यास क्षेत्र `tsoa.json`लेकिन यह deprecated है।
एक ठोस multer उदाहरण पारित करने के लिए `RegisterRoutes(...)`।

## मैनुअल multipart हैंडलिंग

यदि आप बायपास करना चुनते हैं `@UploadedFile(...)` और अपने आप को एक नियंत्रक के अंदर बुलाओ `@Request()`, आप यह भी दस्तावेज करने के लिए जिम्मेदार हैं कि अनुरोध खुद को आकार दें।
उस मामले में, बहुपक्षीय अनुरोध विवरण को मर्ज करें `spec.spec` में `tsoa.json` इसलिए उत्पन्न OpenAPI दस्तावेज़ अभी भी सही ढंग से समापन बिंदु का वर्णन करता है।
