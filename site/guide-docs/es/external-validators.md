---
title: Validadores externos
lang: es-ES
lastUpdated: 2026-04-17T20:53:42.040Z
---

# Valparadores externos con `@Validate`

El nuevo decorador de esquemas externos es [`@Validate(...)`](./reference/tsoa-next/functions/Validate.md).
Si estás buscando `@Validator`, el nombre del decorador en `tsoa-next` es `@Validate`.
Referencia pertinente de API: [`@Validate`](./reference/tsoa-next/functions/Validate.md), [`@Body`](./reference/tsoa-next/functions/Body.md), [`@BodyProp`](./reference/tsoa-next/functions/BodyProp.md), [`@Query`](./reference/tsoa-next/functions/Query.md), [`@Queries`](./reference/tsoa-next/functions/Queries.md), [`@Path`](./reference/tsoa-next/functions/Path.md), [`@Header`](./reference/tsoa-next/functions/Header.md), [`@FormField`](./reference/tsoa-next/functions/FormField.md), [`@UploadedFile`](./reference/tsoa-next/functions/UploadedFile.md), [`@UploadedFiles`](./reference/tsoa-next/functions/UploadedFiles.md), y [`File`](./reference/tsoa-next/interfaces/File.md).

[[toc]]

## ¿Qué? `@Validate` cambios

[`@Validate(...)`](./reference/tsoa-next/functions/Validate.md) hace un esquema externo la fuente de la verdad del tiempo de ejecución para un parámetro decorado.

- TypeScript tipos de unidad todavía OpenAPI generación
- El esquema externo reemplaza la validación de tiempo de ejecución incorporada para el subárbol de parámetro decorado
- Rutas que no utilizan `@Validate(...)` mantener su comportamiento de validación existente

## Objetivos de apoyo

En esta liberación, `@Validate(...)` es compatible con los parámetros del método del controlador que usan:

- [`@Body()`](./reference/tsoa-next/functions/Body.md)- [`@BodyProp()`](./reference/tsoa-next/functions/BodyProp.md)- [`@Query()`](./reference/tsoa-next/functions/Query.md)- [`@Queries()`](./reference/tsoa-next/functions/Queries.md)- [`@Path()`](./reference/tsoa-next/functions/Path.md)- [`@Header()`](./reference/tsoa-next/functions/Header.md)- [`@FormField()`](./reference/tsoa-next/functions/FormField.md)- [`@UploadedFile()`](./reference/tsoa-next/functions/UploadedFile.md)- [`@UploadedFiles()`](./reference/tsoa-next/functions/UploadedFiles.md)

## Bibliotecas de apoyo

- `zod`- `joi`- `yup`- `superstruct`- `io-ts`

Instala sólo la biblioteca validadora que utiliza su aplicación.

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

## Formularios de decoración compatibles

Todas las bibliotecas validadoras soportadas se pueden utilizar con cualquiera de estas formas:

```ts
@Validate(schema)
@Validate('zod', schema)
@Validate({ kind: 'zod', schema })
```

Cuando pasas sólo el esquema, `tsoa-next` tratará de inferir el tipo de validador del objeto de esquema y su fuente de importación.
Si la inferencia es ambigua, utilice el explícito `kind` formas.

## Modelo de ejemplo común

Los ejemplos que figuran a continuación utilizan un TypeScript forma para que pueda ver lo que permanece igual mientras que la validación de tiempo de ejecución cambia.

```ts
type ExternalLiteralUnion = 'active' | 'disabled'

type ExternalObject = {
  name: string
  status: ExternalLiteralUnion
  tags: string[]
}
```

## Zod

Zod trabaja bien con la forma inferida:

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

Joi se puede utilizar con un tipo de validador explícito:

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

Joi también es útil para campos multipart y archivos cargados:

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

Para más detalles de carga, vea [Uploading files](./file-upload).

## Yup

Yup trabaja con la forma objeto:

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

## Superestructura

Superestructura trabaja con la forma explícita:

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

`io-ts` funciona bien cuando desea que un codec sea autorizado en el tiempo de ejecución mientras preserva una primera clase TypeScript alias through `TypeOf`.

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

## Ganchos de validación

Generado `RegisterRoutes(...)` las funciones aceptan un contexto de validación opcional.
Esto es útil cuando desea que los mensajes de validador externo sean traducidos o reformados antes de que sean devueltos a los clientes.

```ts
RegisterRoutes(app, {
  validation: {
    translate: (key, params) => translateMessage(key, params),
    errorFormatter: failure => failure,
  },
})
```

## Orientación práctica

- Mantén tu TypeScript tipos y esquemas externos alineados. OpenAPI a continuación TypeScript tipo, pero la validación de tiempo de ejecución sigue el esquema externo.
- Asegúrese de que la aplicación importa módulos controlador antes `RegisterRoutes(...)` corre, así que los metadatos de decorador están disponibles en tiempo de ejecución.
- Si utiliza plantillas de ruta personalizadas, mantenga intacta la validación de plazos de ejecución de metadatos para que la clase de controlador, el nombre de método y el índice de parámetro estén disponibles durante la validación.
- Utilice la forma inferida cuando es obvia, y cambiar a las formas explícitas cuando desea la claridad de la documentación o el tipo de esquema no es fácil de inferir.
