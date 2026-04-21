---
title: বহিস্থিত পরিবর্তন
lang: bn-BD
lastUpdated: 2026-04-17T20:53:42.040Z
---

# বহিস্থিত সম্পাদক `@Validate`

নতুন বহিস্থিত স্কিমার রূপ হল [`@Validate(...)`](./reference/tsoa-next/functions/Validate.md). .
আপনি খুঁজছেন যদি `@Validator`নিঃসন ্ দেহ এটি সুমীমাংসাকারী বক ্ তব ্ য , `tsoa-next` এবং `@Validate`. .
রিলেভেন্ট API উল্লেখ করেছে: [`@Validate`](./reference/tsoa-next/functions/Validate.md)'%s' [`@Body`](./reference/tsoa-next/functions/Body.md)'%s' [`@BodyProp`](./reference/tsoa-next/functions/BodyProp.md)'%s' [`@Query`](./reference/tsoa-next/functions/Query.md)'%s' [`@Queries`](./reference/tsoa-next/functions/Queries.md)'%s' [`@Path`](./reference/tsoa-next/functions/Path.md)'%s' [`@Header`](./reference/tsoa-next/functions/Header.md)'%s' [`@FormField`](./reference/tsoa-next/functions/FormField.md)'%s' [`@UploadedFile`](./reference/tsoa-next/functions/UploadedFile.md)'%s' [`@UploadedFiles`](./reference/tsoa-next/functions/UploadedFiles.md)এবং [`File`](./reference/tsoa-next/interfaces/File.md). .

[[toc]]

## কি? `@Validate` পরিবর্তন

[`@Validate(...)`](./reference/tsoa-next/functions/Validate.md) একটি সুনির্দিষ্ট পরামিতির জন্য URI-র পাথের সংক্ষিপ্ত সোর্স তৈরি করে।

- TypeScript প্রকৃত ড্রাইভ OpenAPI প্রজন্ম
- প্রি- কমান্ডের সাহায্যে ব্রাউজ করার উদ্দেশ্যে চিহ্নিত বহিস্থিত স্কিমার সাহায্যে নির্মাণ করা হয়েছে
- যে রুট ব্যবহার করা হবে না `@Validate(...)` উপস্থিত তাদের আচরণ অপরিবর্তিত রাখা হবে

## সমর্থিত টার্গেট

এই মুক্তিতে, `@Validate(...)` অপারেটিং সিস্টেমের মধ্যে দ্বারা যে বৈশিষ্ট্য সমর্থিত হয়:

- [`@Body()`](./reference/tsoa-next/functions/Body.md)- [`@BodyProp()`](./reference/tsoa-next/functions/BodyProp.md)- [`@Query()`](./reference/tsoa-next/functions/Query.md)- [`@Queries()`](./reference/tsoa-next/functions/Queries.md)- [`@Path()`](./reference/tsoa-next/functions/Path.md)- [`@Header()`](./reference/tsoa-next/functions/Header.md)- [`@FormField()`](./reference/tsoa-next/functions/FormField.md)- [`@UploadedFile()`](./reference/tsoa-next/functions/UploadedFile.md)- [`@UploadedFiles()`](./reference/tsoa-next/functions/UploadedFiles.md)

## সমর্থিত লাইব্রেরি

- `zod`- `joi`- `yup`- `superstruct`- `io-ts`

আপনার অ্যাপ্লিকেশনের শুধুমাত্র বৈধতা যাচাই করুন।

::: code-group

```bash [npm]
npm install zod
npm install joi
npm install yup
npm install superstruct
npm install io-ts fp-ts io-ts-types
```

```bash [pnpm]
pnpm add zod
pnpm add joi
pnpm add yup
pnpm add superstruct
pnpm add io-ts fp-ts io-ts-types
```

```bash [yarn]
yarn add zod
yarn add joi
yarn add yup
yarn add superstruct
yarn add io-ts fp-ts io-ts-types
```

:::

## সমর্থিত সংস্কারক রূপ

এই ধরনের সকল সমর্থিত লাইব্রেরিগুলিও ব্যবহার করা যাবে:

```ts
@Validate(schema)
@Validate('zod', schema)
@Validate({ kind: 'zod', schema })
```

যখন আপনি শুধুমাত্র স্কীমা পাস, `tsoa-next` স্কিমার অবজেক্ট এবং এর উৎস থেকে কার্যকর হওয়ার চেষ্টা করবে।
যদি পরিধি অস্পষ্ট হয়ে থাকে, তাহলে স্পষ্টভাবে ব্যবহার করুন `kind` ফর্ম।

## সাধারণ উদাহরণ

নীচে প্রদর্শিত উদাহরণ TypeScript আকৃতি অনুযায়ী আপনি দেখতে পাবেন কত সময় অতিবাহিত হতে পারে।

```ts
type ExternalLiteralUnion = 'active' | 'disabled'

type ExternalObject = {
  name: string
  status: ExternalLiteralUnion
  tags: string[]
}
```

## জোডে

জোদ চরম কাঠামোর সাথে ভালভাবে কাজ করেন:

```ts
import { Body, Controller, Post, Route, Validate } from 'tsoa-next'
import { z } from 'zod'

type ExternalLiteralUnion = 'active' | 'disabled'

type ExternalObject = {
  name: string
  status: ExternalLiteralUnion
  tags: string[]
}

const ZodBodySchema = z.object({
  name: z.string().min(3, 'validation.external.zod.name.min'),
  status: z.enum(['active', 'disabled']),
  tags: z.array(z.string()).min(1, 'validation.external.zod.tags.min'),
})

@Route('external-validation')
export class ExternalValidationController extends Controller {
  @Post('zod')
  public zod(@Body() @Validate(ZodBodySchema) payload: ExternalObject): ExternalObject {
    return payload
  }
}
```

## জি

জোয়িকে পরিষ্কার ভাবে ব্যবহার করা যেতে পারে:

```ts
import * as Joi from 'joi'
import { Body, Controller, Post, Route, Validate } from 'tsoa-next'

type ExternalLiteralUnion = 'active' | 'disabled'

type ExternalObject = {
  name: string
  status: ExternalLiteralUnion
  tags: string[]
}

const JoiBodySchema = Joi.object({
  name: Joi.string().min(3).required(),
  status: Joi.string().valid('active', 'disabled').required(),
  tags: Joi.array().items(Joi.string()).min(1).required(),
})

@Route('external-validation')
export class ExternalValidationController extends Controller {
  @Post('joi')
  public joi(@Body() @Validate('joi', JoiBodySchema) payload: ExternalObject): ExternalObject {
    return payload
  }
}
```

একই সাথে জোই দূরের ক্ষেতের জন্যও প্রয়োজনীয় এবং আপলোড করা হয়:

```ts
import * as Joi from 'joi'
import { Controller, File, Post, Route, UploadedFile, Validate } from 'tsoa-next'

@Route('assets')
export class AssetsController extends Controller {
  @Post('upload')
  public upload(@UploadedFile('asset') @Validate('joi', Joi.any()) asset: File): File {
    return asset
  }
}
```

আরো বিস্তারিত বিবরণ জানতে দেখুন [Uploading files](./file-upload). .

## ওয়াইউ

Yup অবজেক্ট ফর্মের সঙ্গে কাজ করে :

```ts
import * as yup from 'yup'
import { Body, Controller, Post, Route, Validate } from 'tsoa-next'

type ExternalLiteralUnion = 'active' | 'disabled'

type ExternalObject = {
  name: string
  status: ExternalLiteralUnion
  tags: string[]
}

const schema = yup
  .object({
    name: yup.string().required().min(3),
    status: yup.mixed<ExternalLiteralUnion>().oneOf(['active', 'disabled']).required(),
    tags: yup.array(yup.string().required()).min(1).required(),
  })
  .required()

@Route('external-validation')
export class ExternalValidationController extends Controller {
  @Post('yup')
  public yupBody(@Body() @Validate({ kind: 'yup', schema }) payload: ExternalObject): ExternalObject {
    return payload
  }
}
```

## boardtrict

স্পষ্ট ধরনের কুসংস্কারের সঙ্গে কাজ করুন:

```ts
import { array, object, size, string } from 'superstruct'
import { Body, Controller, Post, Route, Validate } from 'tsoa-next'

type ExternalLiteralUnion = 'active' | 'disabled'

type ExternalObject = {
  name: string
  status: ExternalLiteralUnion
  tags: string[]
}

const SuperstructBodySchema = object({
  name: size(string(), 3, 50),
  status: string(),
  tags: size(array(string()), 1, 10),
})

@Route('external-validation')
export class ExternalValidationController extends Controller {
  @Post('superstruct')
  public superstruct(@Body() @Validate('superstruct', SuperstructBodySchema) payload: ExternalObject): ExternalObject {
    return payload
  }
}
```

## আয়ো-টস

`io-ts` যখন আপনি একটি প্রথম শ্রেণীর মধ্যে কর্তৃত্ব বজায় রাখার সময় একটি স্বাতন্ত্র্য হতে চান তখন ভাল কাজ করেন TypeScript অ্যালায়েসের মাধ্যমে `TypeOf`. .

```ts
import * as t from 'io-ts'
import { withMessage } from 'io-ts-types'
import { Body, Controller, Post, Route, Validate } from 'tsoa-next'

interface PositiveFloatBrand {
  readonly PositiveFloat: unique symbol
}

const PositiveFloat = withMessage(
  t.brand(
    t.number,
    (n): n is t.Branded<number, PositiveFloatBrand> => Number.isFinite(n) && n > 0,
    'PositiveFloat',
  ),
  () => 'validation.wager.amount.mustBePositiveFloat',
)

const WagerCodec = t.type({
  amount: PositiveFloat,
  outcome: t.Int,
})

type Wager = t.TypeOf<typeof WagerCodec>

@Route('wagers')
export class WagersController extends Controller {
  @Post()
  public createWager(@Body() @Validate({ kind: 'io-ts', schema: WagerCodec }) wager: Wager): Wager {
    return wager
  }
}
```

## ফাঁদ

গঠিত `RegisterRoutes(...)` ঐচ্ছিক ঐচ্ছিক প্রসঙ্গ গ্রহণ করুন ।
এটি কার্যকর যখন আপনি স্বয়ংক্রীয়ভাবে প্রবেশ করা শুরু করেছিলেন নয় অথবা ক্লায়েন্ট পুনরায় চালু করার আগে চালু করেছিলেন ।

```ts
RegisterRoutes(app, {
  validation: {
    translate: (key, params) => translateMessage(key, params),
    errorFormatter: failure => failure,
  },
})
```

## ব্যবহারিক নির্দেশনা

- রেখে দাও TypeScript বহিস্থ স্কীমার সাথে সংযুক্ত। OpenAPI অনুসরণ করুন TypeScript ধরন, কিন্তু বহিস্থ স্কীমার অনুসরণ বৈধ নয়।
- নিশ্চিত হয়ে নিন যে অ্যাপ্লিকেশন ইমপোর্ট করা যাবে কিনা `RegisterRoutes(...)` দৌড়া, তাই ক্রিটারের মিটা-টাই ব্যবহার করতে হবে।
- যদি আপনি স্বনির্বাচিত পাথ ব্যবহার করেন, তাহলে ওয়াশিং- আপাইলিং- এ ব্যবহৃত মিটা- টাইমিং শ্রেণী, পদ্ধতি এবং পরামিতির ইন্ডেক্স এখনও বৈধ নয় ।
- আপনি যখন এই ধরনের কাপড়ের ব্যবহার করেন, তখন স্পষ্ট ও স্পষ্ট ফর্ম ব্যবহার করুন ।
