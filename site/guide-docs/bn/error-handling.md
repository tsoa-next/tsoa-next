---
title: '%s পড়তে ব্যর্থ'
lang: bn-BD
lastUpdated: 2026-04-20T00:28:55.924Z
---

# %s পড়তে ব্যর্থ

::: warning বিকল্প... (_O)
এই গাইডের লক্ষ্য [express](https://expressjs.com) এবং অনুমান `tsoa-next`বর্তমান সমর্থন নীতি: Node.js ২২ বা নতুন।
আমরা পূর্ববর্তী এলটিএস, বর্তমান এলটিএস এবং এর সমর্থন পরীক্ষা Node CI তে পরবর্তী বনাম
লিংকযোগ্য গাইডের উদাহরণ `npm`'%s' `pnpm`এবং `yarn` যেখানে কমান্ডটা আলাদা।
এই গাইড ধরে নিয়েছেন আপনি [getting started guide](./getting-started) কিংবা একই বৈশিষ্ট্য সহ।
:::

রিলেভেন্ট API উল্লেখ করেছে: [`ValidateError`](./reference/tsoa-next/classes/ValidateError.md)'%s' [`@Response`](./reference/tsoa-next/functions/Response.md)'%s' [`@Res`](./reference/tsoa-next/functions/Res.md)'%s' [`TsoaResponse`](./reference/tsoa-next/type-aliases/TsoaResponse.md)এবং [`Controller`](./reference/tsoa-next/classes/Controller.md). .

আপনি হয়তো বিভিন্ন ধাপ অনুসরণ করার পর লক্ষ করেছেন [getting started guide](./getting-started)আমাদের সার্ভার অবৈধ পরামিতির অনুমোদন দেয় না, কিন্তু সাড়া এখনো ঠিক হয় নি।

![Current Error Response](/docs-images/errors-server.png)

ক্লায়েন্টের জন্য, এটাকে এরকম মনে হচ্ছে:

![Client Error Response](/docs-images/errors-client.png)

## পরিচালনা সংক্রান্ত বৈশিষ্ট্য নির্ধারণ করতে ত্রুটি

### বৈধতা সংক্রান্ত ত্রুটি

প্রথমে নিশ্চিত করা যাক, যখনই ক্লায়েন্ট একটা কৃত্রিম ত্রুটি বের করে, অটোগ্রাফ চিহ্ন প্রিন্ট করার পরিবর্তে, আমরা একটি সঠিক জেসন সাড়া প্রদর্শন করি।

আমাদের শেষে `app.ts`কল ্ যাণের পরে যখন তারা একে অপরকে ডাকে `RegisterRoutes(app)`আমরা একটি বৈশ্বিক প্রকাশ ত্রুটি হ্যান্ডলার যোগ করবো:

```ts
import express, { Response as ExResponse, Request as ExRequest, NextFunction } from 'express'
import { ValidateError } from 'tsoa-next'
// ...

app.use(function errorHandler(err: unknown, req: ExRequest, res: ExResponse, next: NextFunction): ExResponse | void {
  if (err instanceof ValidateError) {
    console.warn(`Caught Validation Error for ${req.path}:`, err.fields)
    return res.status(422).json({
      message: 'Validation Failed',
      details: err?.fields,
    })
  }
  if (err instanceof Error) {
    return res.status(500).json({
      message: 'Internal Server Error',
    })
  }

  next()
})
```

এখন, একই অনুরোধের উত্তর এই রকম:

![Client Error with handler](/docs-images/errors-json-client.png)

এছাড়াও, আমাদের কনসোল দেখাবে:

![Server Error with handler](/docs-images/errors-json-server.png)

### অনুপস্থিত রুট

অনুপস্থিত url'র দ্বারা আরো ধীর গতিতে পরিচালনার জন্য আমরা একটি "kecall" রুট যোগ করতে পারি:

```ts
// app.ts
import express, { Response as ExResponse, Request as ExRequest, NextFunction } from 'express'

// ...

RegisterRoutes(app)

app.use(function notFoundHandler(_req, res: ExResponse) {
  res.status(404).send({
    message: 'Not Found',
  })
})

app.use(function errorHandler(
// ...
```

## সমাধানের জন্য একটি ধরন উল্লেখ করুন OpenAPI

নথিপত্রের সমাপ্তি লক্ষ্য হলে, আপনি লক্ষ্য করবেন যে আমাদের সমস্যার কোনো নথিপত্র নেই।
প্রারম্ভকাল TypeScript ত্রুটি দেখা যাচ্ছে না, tsoa এই ধরনের প্রতিক্রিয়া আমরা এই ক্ষেত্রে পাঠানো হয় না.

::: warning
ব্যবহার করুন `@Response` এক্সপোর্টকারীর এক্সপোর্ট ব্যবস্থা `tsoa-next`না Express`%s' `Response` টাইপ।
উপনাম: tsoa-next ইম্পোর্ট করা ঠিক আছে, কিন্তু এখনো এটির সমাধান করতে হবে tsoa-next পরিষ্কারকারী.
:::

তবে, আমরা আপনার জন্য স্বয়ং এই বিষয়টি উল্লেখ করতে পারি:

```ts
import { Body, Controller, Post, Route, Response, SuccessResponse } from 'tsoa-next'
import { User } from './user'
import { UsersService, UserCreationParams } from './usersService'

interface ValidateErrorJSON {
  message: string
  details: { [name: string]: unknown }
}

@Route('users')
export class UsersController extends Controller {
  // more code here

  @Response<ValidateErrorJSON>(422, 'Validation Failed')
  @SuccessResponse('201', 'Created') // Custom success response
  @Post()
  public async createUser(@Body() requestBody: UserCreationParams): Promise<void> {
    this.setStatus(201) // set return status 201
    new UsersService().create(requestBody)
    return
  }
}
```

এই বিষয়টি আমাদের ডকার্সকে এমন কিছু দেখাচ্ছে:

![SwaggerUI showing our 422 Response](/docs-images/err-422-swui.png)

::: tip
OpenAPI '20' অথবা 'ডিফল্ট' ব্যবহার করে স্ট্যাটাস কোড মেলানোর অনুমতি প্রদান করা হবে। tsoa এটা সমর্থন করবে:

```ts
@Response<ErrorResponse>('default', 'Unexpected error')
@Get('Response')
public async getResponse(): Promise<TestModel> {
  return new ModelService().getModel()
}
```

:::

## টাইপ পরীক্ষিত উত্তর

সাম্প্রতিক সংস্করণে tsoaআমাদের একটি কাঠামো-নজৈনিক ফাংশনের জন্য আমাদের একটা সুযোগ আছে যা আমরা আমাদের কন্ট্রোল পদ্ধতির কোড এবং হেডার (যা সাফল্যের জন্য ব্যবহৃত) এর মাধ্যমে সাড়া দিতে পারি না।
বিশেষ করে ভুল বোঝাবুঝির ঝুঁকি না নিয়ে ভুল উত্তর দিয়ে ভুল উত্তর দিয়ে সাড়া দেওয়ায় এটি কার্যকর হয় ।
এক/মোর্সিং এ প্রবেশের জন্য আমরা ব্যবহার করতে পারি `@Res()` ক্লীব:

```ts
import { Route, Controller, Get, Query, Res, TsoaResponse } from 'tsoa-next'

@Route('/greeting')
export class GreetingsController extends Controller {
  /**
   * @param notFoundResponse The responder function for a not found response
   */
  @Get('/')
  public async greet(@Query() name?: string, @Res() notFoundResponse: TsoaResponse<404, { reason: string }>): Promise<string> {
    if (!name) {
      return notFoundResponse(404, { reason: 'We don\'t know you yet. Please provide a name' })
    }

    return `Hello, ${name}`
  }
}
```
