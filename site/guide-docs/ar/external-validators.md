---
title: المرشحون الخارجيون
lang: ar
lastUpdated: 2026-04-17T20:53:42.040Z
---

# المصادقون الخارجيون `@Validate`

ديكور شيما الخارجي الجديد [`@Validate(...)`](./reference/tsoa-next/functions/Validate.md).
إذا كنت تبحث عن `@Validator`اسم الديكور `tsoa-next` هو `@Validate`.
المرجع ذو الصلة بالطلب: [`@Validate`](./reference/tsoa-next/functions/Validate.md).. [`@Body`](./reference/tsoa-next/functions/Body.md).. [`@BodyProp`](./reference/tsoa-next/functions/BodyProp.md).. [`@Query`](./reference/tsoa-next/functions/Query.md).. [`@Queries`](./reference/tsoa-next/functions/Queries.md).. [`@Path`](./reference/tsoa-next/functions/Path.md).. [`@Header`](./reference/tsoa-next/functions/Header.md).. [`@FormField`](./reference/tsoa-next/functions/FormField.md).. [`@UploadedFile`](./reference/tsoa-next/functions/UploadedFile.md).. [`@UploadedFiles`](./reference/tsoa-next/functions/UploadedFiles.md)و [`File`](./reference/tsoa-next/interfaces/File.md).

[[toc]]

## ماذا؟ `@Validate` التغييرات

[`@Validate(...)`](./reference/tsoa-next/functions/Validate.md) يجعل الشيمة الخارجية مصدر الحقيقة المتكرر لمقياس واحد مزين

- TypeScript أنواع لا تزال OpenAPI جيل
- الكيميائي الخارجي يحل محل المصادقة في الوقت الجاري على البارامترات المزينة
- الطرق التي لا تستخدم `@Validate(...)` الحفاظ على سلوك التحقق القائم

## الأهداف الداعمة

في هذا الإفراج `@Validate(...)` يُدعم في معايير طريقة التحكم التي تستخدم:

- [`@Body()`](./reference/tsoa-next/functions/Body.md)- [`@BodyProp()`](./reference/tsoa-next/functions/BodyProp.md)- [`@Query()`](./reference/tsoa-next/functions/Query.md)- [`@Queries()`](./reference/tsoa-next/functions/Queries.md)- [`@Path()`](./reference/tsoa-next/functions/Path.md)- [`@Header()`](./reference/tsoa-next/functions/Header.md)- [`@FormField()`](./reference/tsoa-next/functions/FormField.md)- [`@UploadedFile()`](./reference/tsoa-next/functions/UploadedFile.md)- [`@UploadedFiles()`](./reference/tsoa-next/functions/UploadedFiles.md)

## المكتبات المدعومة

- `zod`- `joi`- `yup`- `superstruct`- `io-ts`

ضع فقط مكتبة المصادقة تستخدم تطبيقك

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

## استمارات مصممة خصيصاً

ويمكن استخدام جميع مكتبات المصادقة المدعومة بأي من هذه الأشكال:

```ts
@Validate(schema)
@Validate('zod', schema)
@Validate({ kind: 'zod', schema })
```

عندما تمرر فقط الشيمة، `tsoa-next` سيحاول أن يستنتج المصدّق من نوع الكيميائي ومصدر استيراده.
إذا كان الاختبار غامضاً، إستعملْه بشكل صريح `kind` استمارات

## نموذج نموذجي مشترك

الأمثلة الواردة أدناه: TypeScript لترى ما يبقى على حاله بينما يتغيّر التحقّق

```ts
type ExternalLiteralUnion = 'active' | 'disabled'

type ExternalObject = {
  name: string
  status: ExternalLiteralUnion
  tags: string[]
}
```

## Zod

(زود) يعمل بشكل جيد مع النموذج المُستدل:

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

## جوي

(جوي) يمكن أن يُستخدم بنوع واضح من المصادقة:

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

(جوي) مفيدة أيضاً في الميادين المتعددة الجوانب والملفات المحملة:

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

للمزيد من التفاصيل [Uploading files](./file-upload).

## نعم

نعم يعمل مع شكل الجسم:

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

## سوبر ستريت

تعمل المؤسسة بشكل واضح:

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

## io-ts

`io-ts` تعمل بشكل جيد عندما تريد أن يكون الشفرة ذات حجية في وقت الهروب بينما تحافظ على الدرجة الأولى TypeScript من خلال `TypeOf`.

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

## خطاف التقييم

المولدات `RegisterRoutes(...)` وتقبل الوظائف سياقا اختياريا للتحقق.
وهذا مفيد عندما تريد ترجمة رسائل المصادقة الخارجية أو إعادة صياغتها قبل إعادتها إلى العملاء.

```ts
RegisterRoutes(app, {
  validation: {
    translate: (key, params) => translateMessage(key, params),
    errorFormatter: failure => failure,
  },
})
```

## التوجيه العملي

- أبقِ نفسك TypeScript تم مواءمة الأنواع والكيميائيات الخارجية OpenAPI فيما يلي: TypeScript النوع، ولكن التثبت من التأجيل يُتبع الكيميائي الخارجي.
- التأكد من وحدات مراقبة الواردات من التطبيقات قبل `RegisterRoutes(...)` تشغيل، لذلك الديوتا المصممة للديكور متاحة في الوقت الحاضر.
- إذا كنت تستخدم نماذج المسارات العرفية، تبقي السباكة الفوقية المثبتة في الوقت الحاضر سليمة حتى درجة المتحكمين، واسم الطريقة، ومؤشر البارامترات لا يزال متاحا أثناء التصديق.
- استخدمي الشكل المُستحل عندما يكون واضحاً، والتحول إلى الأشكال الواضحة عندما تريدين وضوح الوثائق أو نوع الكيماوي ليس من السهل استنتاجه.
