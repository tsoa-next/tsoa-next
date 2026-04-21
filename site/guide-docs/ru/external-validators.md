---
title: Внешние валидаторы
lang: ru-RU
lastUpdated: 2026-04-17T20:53:42.040Z
---

# Внешние валидаторы с `@Validate`

Новый внешний декоратор схемы [`@Validate(...)`](./reference/tsoa-next/functions/Validate.md).
Если вы ищете `@Validator`Название декоратора в `tsoa-next` это `@Validate`.
Соответствующая ссылка API: [`@Validate`](./reference/tsoa-next/functions/Validate.md), [`@Body`](./reference/tsoa-next/functions/Body.md), [`@BodyProp`](./reference/tsoa-next/functions/BodyProp.md), [`@Query`](./reference/tsoa-next/functions/Query.md), [`@Queries`](./reference/tsoa-next/functions/Queries.md), [`@Path`](./reference/tsoa-next/functions/Path.md), [`@Header`](./reference/tsoa-next/functions/Header.md), [`@FormField`](./reference/tsoa-next/functions/FormField.md), [`@UploadedFile`](./reference/tsoa-next/functions/UploadedFile.md), [`@UploadedFiles`](./reference/tsoa-next/functions/UploadedFiles.md)и [`File`](./reference/tsoa-next/interfaces/File.md).

[[toc]]

## Что? `@Validate` изменения

[`@Validate(...)`](./reference/tsoa-next/functions/Validate.md) делает внешнюю схему источником истины для одного декорированного параметра.

- TypeScript Водители продолжают ездить OpenAPI поколение
- Внешняя схема заменяет встроенную проверку времени выполнения для декорированного поддеревья параметров
- Маршруты, которые не используются `@Validate(...)` сохранить существующее поведение проверки

## Поддерживаемые цели

В этом выпуске, `@Validate(...)` Поддерживаются параметры метода контроллера, которые используют:

- [`@Body()`](./reference/tsoa-next/functions/Body.md)- [`@BodyProp()`](./reference/tsoa-next/functions/BodyProp.md)- [`@Query()`](./reference/tsoa-next/functions/Query.md)- [`@Queries()`](./reference/tsoa-next/functions/Queries.md)- [`@Path()`](./reference/tsoa-next/functions/Path.md)- [`@Header()`](./reference/tsoa-next/functions/Header.md)- [`@FormField()`](./reference/tsoa-next/functions/FormField.md)- [`@UploadedFile()`](./reference/tsoa-next/functions/UploadedFile.md)- [`@UploadedFiles()`](./reference/tsoa-next/functions/UploadedFiles.md)

## Поддерживаемые библиотеки

- `zod`- `joi`- `yup`- `superstruct`- `io-ts`

Установите только библиотеку валидаторов, которую использует ваше приложение.

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

## Поддерживаемые формы декоратора

Все поддерживаемые библиотеки валидаторов могут быть использованы в любой из этих форм:

```ts
@Validate(schema)
@Validate('zod', schema)
@Validate({ kind: 'zod', schema })
```

Когда вы проходите только схему, `tsoa-next` будет пытаться вывести тип валидатора из объекта схемы и его источника импорта.
Если вывод неоднозначный, используйте явный `kind` формы.

## Общая модель примера

Приведенные ниже примеры используют общий TypeScript Форма, чтобы вы могли видеть, что остается неизменным, в то время как валидация времени выполнения изменяется.

```ts
type ExternalLiteralUnion = 'active' | 'disabled'

type ExternalObject = {
  name: string
  status: ExternalLiteralUnion
  tags: string[]
}
```

## Зойд

Зод хорошо работает с предполагаемой формой:

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

## Джой

Joi может использоваться с явным типом валидатора:

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

Joi также полезен для многочастных полей и загруженных файлов:

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

Для более подробной загрузки, см. [Uploading files](./file-upload).

## Ага.

Yup работает с формой объекта:

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

## сверхструктура

Superstruct работает с явной формой вида:

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

`io-ts` хорошо работает, когда вы хотите, чтобы кодек был авторитетным во время выполнения, сохраняя первоклассный TypeScript псевдоним через `TypeOf`.

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

## Крючки для проверки

сгенерированный `RegisterRoutes(...)` Функции принимают дополнительный контекст проверки.
Это полезно, когда вы хотите, чтобы внешние сообщения валидатора были переведены или переформатированы до их возврата клиентам.

```ts
RegisterRoutes(app, {
  validation: {
    translate: (key, params) => translateMessage(key, params),
    errorFormatter: failure => failure,
  },
})
```

## Практические рекомендации

- Держите TypeScript Типы и внешние схемы выровнены. OpenAPI Далее следует TypeScript тип, но проверка времени выполнения следует внешней схеме.
- Убедитесь, что приложение импортирует модули контроллера перед `RegisterRoutes(...)` работает, поэтому метаданные декоратора доступны во время выполнения.
- Если вы используете пользовательские шаблоны маршрутов, сохраняйте валидацию метаданных во время выполнения неповрежденной, поэтому класс контроллера, название метода и индекс параметров все еще доступны во время проверки.
- Используйте предполагаемую форму, когда она очевидна, и переключайтесь на явные формы, когда вам нужна ясность документации или вид схемы.
