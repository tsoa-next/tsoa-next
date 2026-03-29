---
title: External Validators
lang: en-US
---

# External validators with `@Validate`

The new external schema decorator is `@Validate(...)`.
If you are looking for `@Validator`, the decorator name in `tsoa-next` is `@Validate`.

[[toc]]

## What `@Validate` changes

`@Validate(...)` makes an external schema the runtime source of truth for one decorated parameter.

- TypeScript types still drive OpenAPI generation
- The external schema replaces built-in runtime validation for the decorated parameter subtree
- Routes that do not use `@Validate(...)` keep their existing validation behavior

## Supported targets

In this release, `@Validate(...)` is supported on controller method parameters that use:

- `@Body()`
- `@BodyProp()`
- `@Query()`
- `@Queries()`
- `@Path()`
- `@Header()`
- `@FormField()`
- `@UploadedFile()`
- `@UploadedFiles()`

## Supported libraries

- `zod`
- `joi`
- `yup`
- `superstruct`
- `io-ts`

Install only the validator library your application uses.

```bash
npm install zod
npm install joi
npm install yup
npm install superstruct
npm install io-ts fp-ts io-ts-types
```

## Supported decorator forms

All supported validator libraries can be used with any of these forms:

```ts
@Validate(schema)
@Validate('zod', schema)
@Validate({ kind: 'zod', schema })
```

When you pass only the schema, `tsoa-next` will try to infer the validator kind from the schema object and its import source.
If inference is ambiguous, use the explicit `kind` forms.

## Common example model

The examples below use a shared TypeScript shape so you can see what stays the same while runtime validation changes.

```ts
type ExternalLiteralUnion = 'active' | 'disabled'

type ExternalObject = {
  name: string
  status: ExternalLiteralUnion
  tags: string[]
}
```

## Zod

Zod works well with the inferred form:

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

## Joi

Joi can be used with an explicit validator kind:

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

Joi is also useful for multipart fields and uploaded files:

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

For more upload details, see [Uploading files](./file-upload).

## Yup

Yup works with the object form:

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

## Superstruct

Superstruct works with the explicit kind form:

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

`io-ts` works well when you want a codec to be authoritative at runtime while preserving a first-class TypeScript alias through `TypeOf`.

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

## Validation hooks

Generated `RegisterRoutes(...)` functions accept an optional validation context.
This is useful when you want external validator messages translated or reformatted before they are returned to clients.

```ts
RegisterRoutes(app, {
  validation: {
    translate: (key, params) => translateMessage(key, params),
    errorFormatter: failure => failure,
  },
})
```

## Practical guidance

- Keep your TypeScript types and external schemas aligned. OpenAPI follows the TypeScript type, but runtime validation follows the external schema.
- Make sure the application imports controller modules before `RegisterRoutes(...)` runs, so decorator metadata is available at runtime.
- If you use custom route templates, keep the runtime validation metadata plumbing intact so controller class, method name, and parameter index are still available during validation.
- Use the inferred form when it is obvious, and switch to the explicit forms when you want documentation clarity or the schema kind is not easy to infer.
