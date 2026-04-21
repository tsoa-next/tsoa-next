---
lastUpdated: 2026-04-17T20:53:42.041Z
---
# রুট এবং OAS হতে তৈরি করা হচ্ছে

রিলেভেন্ট API উল্লেখ করেছে: [`Config`](./reference/tsoa-next/interfaces/Config.md)'%s' [`generateRoutes`](./reference/@tsoa-next/cli/functions/generateRoutes.md)'%s' [`generateSpec`](./reference/@tsoa-next/cli/functions/generateSpec.md)'%s' [`generateSpecAndRoutes`](./reference/@tsoa-next/cli/functions/generateSpecAndRoutes.md)'%s' [`ExtendedRoutesConfig`](./reference/@tsoa-next/cli/interfaces/ExtendedRoutesConfig.md)এবং [`ExtendedSpecConfig`](./reference/@tsoa-next/cli/interfaces/ExtendedSpecConfig.md). .

## ব্যবহার করা হচ্ছে CLI

### সাধারণ কমান্ড

```bash
# generate OAS
tsoa spec

# generate routes
tsoa routes

# discover config files beneath the current directory
tsoa discover

# discover config files beneath a path or glob
tsoa discover "packages/*"
```

### অপশন

#### OpenAPI মাতা (ওএস) প্রজন্ম

```
Usage: tsoa spec [options]

Options:
   --configuration, -c  tsoa configuration file; default is tsoa.json in the working directory  [string]
   --discover  discover tsoa config files using a path or glob before running the command       [string]
   --host  API host                                                                             [string]
   --basePath  Base API path                                                                    [string]
```

#### রুট জেনারেশন

```
Usage: tsoa routes [options]

Options:
  --configuration, -c  tsoa configuration file; default is tsoa.json in the working directory   [string]
  --discover  discover tsoa config files using a path or glob before running the command        [string]
  --basePath  Base API path                                                                     [string]
```

#### কনফিগ অনুসন্ধান

```
Usage: tsoa discover [pathOrGlob]
```

- `discover` প্রদত্ত পাথ অথবা বর্তমান কর্ম ডিরেক্টরীতে অনুসন্ধান করা হয়, যখন কোনো প্রেরিত তথ্য প্রদান করা হয় না ।
- Blob ইনপুট সমর্থিত, যেমন কমান্ড `tsoa discover "packages/*"` অথবা `tsoa spec --discover "services/*"` প্রথমে শিকড় বৃদ্ধি করা হবে।
- ডিসকভার এই সম্মেলনের কনফিগারেশন ফাইলের নাম সনাক্ত করেছে:
  - `tsoa.json`  - `tsoa.yaml`  - `tsoa.yml`  - `tsoa.config.js`  - `tsoa.config.cjs`- `spec`'%s' `routes`এবং `spec-and-routes` সকল আবিষ্কারকৃত কনফিগের মধ্য দিয়ে তার ভক্ত পাঠাতে পারেন:

```bash
tsoa spec --discover "packages/*"
tsoa routes --discover "./services"
tsoa spec-and-routes --discover .
```

আপনি রেফারেন্স খুঁজে পেতে পারেন tsoa কনফিগারেশন ফাইল [here](./reference/tsoa-next/interfaces/Config.md)

কনফিগারেশন অবজেক্টের জন্য তথ্যName`tsoa.json`* আপনি হয়ত আগ্রহী:

[`Config` interface reference](./reference/tsoa-next/interfaces/Config.md)

[Configuration sample](https://github.com/tsoa-next/tsoa-next/blob/main/tests/tsoa.json)

## গণিতName

প্রসেস থেকে চলমান প্রোগ্রামগুলি ইম্পোর্ট করুন `tsoa-next/cli`. . মূল `tsoa-next` এন্ট্রি পয়েন্ট হলো শুধু দোভাষীদের আর স্লিপারদের জন্য ব্যবহার করা উচিত।

```typescript
import { generateRoutes, generateSpec, generateSpecAndRoutes, ExtendedRoutesConfig, ExtendedSpecConfig } from 'tsoa-next/cli'

;(async () => {
  const specOptions: ExtendedSpecConfig = {
    basePath: '/api',
    entryFile: './api/server.ts',
    specVersion: 3,
    outputDirectory: './api/dist',
    controllerPathGlobs: ['./routeControllers/**/*Controller.ts'],
  }

  const routeOptions: ExtendedRoutesConfig = {
    basePath: '/api',
    entryFile: './api/server.ts',
    routesDir: './api',
  }

  await generateSpec(specOptions)

  await generateRoutes(routeOptions)

  // Or generate both outputs from one shared metadata pass:
  await generateSpecAndRoutes({
    configuration: {
      entryFile: './api/server.ts',
      controllerPathGlobs: ['./routeControllers/**/*Controller.ts'],
      spec: {
        outputDirectory: './api/dist',
        specVersion: 3.1,
      },
      routes: {
        routesDir: './api',
      },
    },
  })
})()
```

**শূণ্য ব্যবহার করা হলে: ** tsoa প্রোগ্রামসমূহ, দয়া করে জেনে রাখুন tsoaএই পদ্ধতি ছোট আকারের পরিবর্তন এবং প্যাচ মুক্ত করে। কিন্তু আপনি যদি ব্যবহার করেন tsoa একটি ফাইলে, তারপর TypeScript আপনি কোনো পরিবর্তন বাতিল করতে পারবেন। আমরা আমাদের অভ্যন্তরীণ পদ্ধতি পরিবর্তন করতে এই অধিকার সংরক্ষণ করেছি যাতে আমরা সংখ্যাগরিষ্ঠ ব্যবহারকারীদের জন্য ক্রমবর্ধমান মূল্য প্রদান করতে পারি (আমাদের) CLI ব্যবহারকারী। এটা CLI তবে শুধুমাত্র একটি প্রধান মুক্তির সময়ে পরিবর্তনগুলি ভাঙ্গা যাবে।
