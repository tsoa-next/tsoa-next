---
title: 外部验证器
lang: zh-CN
lastUpdated: 2026-04-17T20:53:42.040Z
---

# 外部验证符 `@Validate`

新的外部设计师是 [`@Validate(...)`](./reference/tsoa-next/functions/Validate.md)。 。 。 。
如果你在寻找 `@Validator`,在 `tsoa-next` 实值 `@Validate`。 。 。 。
相关API参考: [`@Validate`](./reference/tsoa-next/functions/Validate.md), (中文(简体) ). [`@Body`](./reference/tsoa-next/functions/Body.md), (中文(简体) ). [`@BodyProp`](./reference/tsoa-next/functions/BodyProp.md), (中文(简体) ). [`@Query`](./reference/tsoa-next/functions/Query.md), (中文(简体) ). [`@Queries`](./reference/tsoa-next/functions/Queries.md), (中文(简体) ). [`@Path`](./reference/tsoa-next/functions/Path.md), (中文(简体) ). [`@Header`](./reference/tsoa-next/functions/Header.md), (中文(简体) ). [`@FormField`](./reference/tsoa-next/functions/FormField.md), (中文(简体) ). [`@UploadedFile`](./reference/tsoa-next/functions/UploadedFile.md), (中文(简体) ). [`@UploadedFiles`](./reference/tsoa-next/functions/UploadedFiles.md),以及 [`File`](./reference/tsoa-next/interfaces/File.md)。 。 。 。

[[toc]]

## 什麽? `@Validate` 变动

[`@Validate(...)`](./reference/tsoa-next/functions/Validate.md) 使一个外部计划成为一个被装饰的参数的运行时间真实源.

- TypeScript 类型仍然驱动 OpenAPI 生成
- 外部 schema 取代已装饰参数子树的内置运行时验证
- 不使用的路由 `@Validate(...)` 保留他们现有的验证行为

## 支助目标

在这个发行中, `@Validate(...)` 以使用下列控制器方法参数支持:

- [`@Body()`](./reference/tsoa-next/functions/Body.md)- [`@BodyProp()`](./reference/tsoa-next/functions/BodyProp.md)- [`@Query()`](./reference/tsoa-next/functions/Query.md)- [`@Queries()`](./reference/tsoa-next/functions/Queries.md)- [`@Path()`](./reference/tsoa-next/functions/Path.md)- [`@Header()`](./reference/tsoa-next/functions/Header.md)- [`@FormField()`](./reference/tsoa-next/functions/FormField.md)- [`@UploadedFile()`](./reference/tsoa-next/functions/UploadedFile.md)- [`@UploadedFiles()`](./reference/tsoa-next/functions/UploadedFiles.md)

## 支助图书馆

- `zod`- `joi`- `yup`- `superstruct`- `io-ts`

只安装您应用程序使用的验证库 。

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

## 支持的装饰表

所有支持的验证库都可以使用其中任何一种形式:

```ts
@Validate(schema)
@Validate('zod', schema)
@Validate({ kind: 'zod', schema })
```

当你只通过计划, `tsoa-next` 将尝试从 schema 对象及其导入源中推断验证符类型。
如果推论模棱两可,请使用明确的 `kind` 表单。

## 通用实例模型

以下示例使用共享 TypeScript 形状,这样您就可以在运行时间验证改变时看到什么保持不变。

```ts
type ExternalLiteralUnion = 'active' | 'disabled'

type ExternalObject = {
  name: string
  status: ExternalLiteralUnion
  tags: string[]
}
```

## 佐德语Name

Zod与推断的表格有很好的作用:

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

## 乔

Joi可以使用一个明确的验证器类型:

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

Joi对多段字段和上传文件也有用:

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

更多上传详情请见 [Uploading files](./file-upload)。 。 。 。

## 对

YUP与对象形式配合:

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

## 超级结构

Superstruct工作有明显的类型形式:

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

## io-ts(双胞胎)

`io-ts` 当你想要解码器在运行时具有权威,同时保留一等电脑时,效果良好 TypeScript 化名通过 `TypeOf`。 。 。 。

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

## 验证钩

已生成 `RegisterRoutes(...)` 函数接受可选的验证上下文。
如果您想要在外部验证器消息返回客户端之前对其进行翻译或重新编排, 这一点将很有用 。

```ts
RegisterRoutes(app, {
  validation: {
    translate: (key, params) => translateMessage(key, params),
    errorFormatter: failure => failure,
  },
})
```

## 实用指导

- 留着吧 TypeScript 类型和外部计划对齐。 OpenAPI 沿着 TypeScript 类型,但运行时验证遵循外部计划。
- 在程序导入控制器模块之前确定 `RegisterRoutes(...)` 运行,所以在运行时可以获得装饰元数据.
- 如果您使用自定义的路由模板, 请保持运行时验证元数据管道完好无损, 因此在验证期间仍然有控制器类, 方法名, 和参数索引 。
- 显而易见时使用推断出的形式,在需要文档清晰度或计划类型时切换到显式不易推断出.
