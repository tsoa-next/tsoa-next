---
title: बाहरी वैलिडेटर
lang: hi-IN
lastUpdated: 2026-04-17T20:53:42.040Z
---

# बाहरी सत्यापनकर्ता `@Validate`

नए बाहरी स्कीमा सजावटकर्ता है [`@Validate(...)`](./reference/tsoa-next/functions/Validate.md)।
यदि आप देख रहे हैं `@Validator`सजावट नाम `tsoa-next` है `@Validate`।
प्रासंगिक एपीआई संदर्भ: [`@Validate`](./reference/tsoa-next/functions/Validate.md), [`@Body`](./reference/tsoa-next/functions/Body.md), [`@BodyProp`](./reference/tsoa-next/functions/BodyProp.md), [`@Query`](./reference/tsoa-next/functions/Query.md), [`@Queries`](./reference/tsoa-next/functions/Queries.md), [`@Path`](./reference/tsoa-next/functions/Path.md), [`@Header`](./reference/tsoa-next/functions/Header.md), [`@FormField`](./reference/tsoa-next/functions/FormField.md), [`@UploadedFile`](./reference/tsoa-next/functions/UploadedFile.md), [`@UploadedFiles`](./reference/tsoa-next/functions/UploadedFiles.md), और [`File`](./reference/tsoa-next/interfaces/File.md)।

[[toc]]

## क्या `@Validate` परिवर्तन

[`@Validate(...)`](./reference/tsoa-next/functions/Validate.md) एक बाहरी स्कीमा को एक सजाया पैरामीटर के लिए सच्चाई का रनटाइम स्रोत बनाता है।

- TypeScript प्रकार अभी भी ड्राइव OpenAPI उत्पादन
- बाहरी स्कीमा सजाया पैरामीटर subtree के लिए अंतर्निहित रनटाइम सत्यापन की जगह लेता है
- रूट जो उपयोग नहीं करते हैं `@Validate(...)` अपने मौजूदा सत्यापन व्यवहार को बनाए रखें

## समर्थित लक्ष्य

इस रिलीज में, `@Validate(...)` नियंत्रक विधि मापदंडों पर समर्थित है जो उपयोग करते हैं:

- [`@Body()`](./reference/tsoa-next/functions/Body.md)- [`@BodyProp()`](./reference/tsoa-next/functions/BodyProp.md)- [`@Query()`](./reference/tsoa-next/functions/Query.md)- [`@Queries()`](./reference/tsoa-next/functions/Queries.md)- [`@Path()`](./reference/tsoa-next/functions/Path.md)- [`@Header()`](./reference/tsoa-next/functions/Header.md)- [`@FormField()`](./reference/tsoa-next/functions/FormField.md)- [`@UploadedFile()`](./reference/tsoa-next/functions/UploadedFile.md)- [`@UploadedFiles()`](./reference/tsoa-next/functions/UploadedFiles.md)

## समर्थित पुस्तकालय

- `zod`- `joi`- `yup`- `superstruct`- `io-ts`

केवल अपने आवेदन का उपयोग करने वाले सत्यापनकर्ता पुस्तकालय को स्थापित करें।

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

## सहायक उपकरण

इन सभी रूपों में से किसी के साथ सभी समर्थित सत्यापनकर्ता पुस्तकालयों का उपयोग किया जा सकता है:

```ts
@Validate(schema)
@Validate('zod', schema)
@Validate({ kind: 'zod', schema })
```

जब आप केवल स्कीमा पास करते हैं, `tsoa-next` स्कीमा ऑब्जेक्ट और इसके आयात स्रोत से सत्यापनकर्ता प्रकार को शामिल करने का प्रयास करेगा।
यदि inference अस्पष्ट है, तो स्पष्टता का उपयोग करें `kind` प्रपत्र

## सामान्य उदाहरण मॉडल

नीचे दिए गए उदाहरण साझा किए गए हैं TypeScript इसलिए आप देख सकते हैं कि रनटाइम सत्यापन में बदलाव के साथ क्या रहना है।

```ts
type ExternalLiteralUnion = 'active' | 'disabled'

type ExternalObject = {
  name: string
  status: ExternalLiteralUnion
  tags: string[]
}
```

## चिड़ियाघर

ज़ॉड इन्फ़र्टेड फॉर्म के साथ अच्छी तरह से काम करता है:

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

## जोई

Joi एक स्पष्ट सत्यापनकर्ता प्रकार के साथ इस्तेमाल किया जा सकता है:

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

जोई बहुभागीय क्षेत्रों और अपलोड की गई फ़ाइलों के लिए भी उपयोगी है:

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

अधिक अपलोड विवरण के लिए, देखें [Uploading files](./file-upload)।

## यूप

योप ऑब्जेक्ट फॉर्म के साथ काम करता है:

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

## सुपर

स्पष्ट प्रकार के रूप में सुपरस्ट्रेक्ट काम करता है:

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

## io-t

`io-ts` अच्छी तरह से काम करता है जब आप चाहते हैं कि कोडेक को पहली श्रेणी में संरक्षित करते समय रनटाइम पर आधिकारिक होने के लिए अधिकृत किया जाए TypeScript के माध्यम से `TypeOf`।

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

## सत्यापन हुक

उत्पन्न `RegisterRoutes(...)` कार्य एक वैकल्पिक सत्यापन संदर्भ स्वीकार करते हैं।
यह तब उपयोगी होता है जब आप चाहते हैं कि बाहरी सत्यापनकर्ता संदेशों का अनुवाद या सुधार करने से पहले वे ग्राहकों को वापस आ जाएं।

```ts
RegisterRoutes(app, {
  validation: {
    translate: (key, params) => translateMessage(key, params),
    errorFormatter: failure => failure,
  },
})
```

## व्यावहारिक मार्गदर्शन

- अपना रखें TypeScript प्रकार और बाहरी स्कीमा संरेखित। OpenAPI निम्नानुसार TypeScript प्रकार, लेकिन रनटाइम सत्यापन बाहरी स्कीमा का अनुसरण करता है।
- पहले एप्लिकेशन आयात नियंत्रक मॉड्यूल सुनिश्चित करें `RegisterRoutes(...)` रनटाइम में तो डेकोरेटर मेटाडाटा उपलब्ध है।
- यदि आप कस्टम रूट टेम्प्लेट का उपयोग करते हैं, तो रनटाइम सत्यापन मेटाडाटा प्लंबिंग को निष्क्रिय रखें ताकि नियंत्रक वर्ग, विधि नाम और पैरामीटर इंडेक्स अभी भी सत्यापन के दौरान उपलब्ध हैं।
- जब यह स्पष्ट होता है, तब इसका प्रयोग स्पष्ट रूप से किया जाता है, और जब आप प्रलेखन स्पष्टता चाहते हैं या स्कीमा की तरह का प्रयोग करना आसान नहीं है, तब स्पष्ट रूप से बदल जाता है।
