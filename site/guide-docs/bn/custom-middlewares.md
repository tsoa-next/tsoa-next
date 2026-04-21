---
lastUpdated: 2026-04-17T20:53:42.039Z
---
# স্বনির্বাচিত মিডলস

এটা `@Middlewares` আপনার বর্তমান প্রিন্টারের সমাপ্তির জন্য সহায়িকা প্রয়োগ করা হয়েছে TypeScript কোড। এই কার্সার ব্যবহার করে শেষ প্রান্তে পৌঁছে যাওয়ার পূর্বে HTTP অনুরোধ জানায় । অতিরিক্ত কাজ অাবার পূর্বে সেটিকে কাজ করতে বলুন । এর সমর্থনের জন্য Express'%s' Koaএবং Hapi শাওয়ার.
রিলেভেন্ট API উল্লেখ করেছে: [`@Middlewares`](./reference/tsoa-next/functions/Middlewares.md)'%s' [`@Request`](./reference/tsoa-next/functions/Request.md)'%s' [`Controller`](./reference/tsoa-next/classes/Controller.md)'%s' [`@Route`](./reference/tsoa-next/functions/Route.md)এবং [`@Get`](./reference/tsoa-next/functions/Get.md). .

## উদাহরণ

```ts
import type { NextFunction, Request, Response } from 'express'
import { Controller, Get, Middlewares, Request as TsoaRequest, Route } from 'tsoa-next'

async function customMiddleware(req: Request, _res: Response, next: NextFunction) {
  req.headers['x-middleware-hit'] = 'true'
  next()
}

@Route('examples')
export class ExampleController extends Controller {
  @Get('custom-middleware')
  @Middlewares(customMiddleware)
  public async exampleGetEndpoint(@TsoaRequest() req: Request): Promise<{ middlewareHit: boolean }> {
    return {
      middlewareHit: req.header('x-middleware-hit') === 'true',
    }
  }
}
```

## ফ্লো ফ্লো ফ্লো

যখন একটি HTTP অনুরোধ করা হয় শেষ করার সময় সমাপ্তির পরে প্রস্থান করা হবে `@Middlewares`এই মৃত্যুদণ্ড কার্যকর করা হয়েছে:

অনুরোধ প্রথমে আপনাকে একটি স্বনির্ধারিত অব্যবহৃত ফাংশন উল্লেখ করে `@Middlewares` পরিষ্কারকারী.
অপারেটিং ফাংশনের মধ্যে, কোনো প্রয়োজনীয় কাজ করতে হলে অথবা অনুরোধের বস্তু পরিবর্তন করতে পারবেন।

গড়ন যুক্তি শেষ করার পর, আপনাকে কল করতে হবে `next()` পরবর্তী মাঝখানের ট্যাবলেট পাস করতে অনুরোধ করা হয়... ...অথবা শেষটা নিজেই শেষ করতে।

সবশেষে, এই অনুরোধটি উদাহরণ হিসেবে পাওয়া যাবে।

একাধিক মধ্যবর্তী প্যাকেজ নির্ধারণ করা হলে, সঞ্চালনযোগ্য কর্ম সঞ্চালন করা হয় `@Middlewares(...)`. .

## TypeScript আবশ্যক মান

স্বনির্ধারিত শেয়ার ব্যবস্থা ব্যবহার করা হলে, কনফিগারেশনের বস্তুগুলি সক্রিয় করা আবশ্যক TypeScript:

```jsonc
{
  "compilerOptions": {
    // ...
    "experimentalDecorators": true,
    // ...
  }
}
```

`emitDecoratorMetadata` এই ক্ষেত্রে আবশ্যক নয় `tsoa-next` উল্লিখিত সময় অবধি `@Middlewares(...)`. .
শুধু এটা সক্রিয় করা হয় যখন আপনার নিজেরওয়্যার, ডিআই কন্টেইনার, অথবা বৈধ স্ট্যাক ডিজাইনের মিটা-ডাটার উপর নির্ভর করে।
