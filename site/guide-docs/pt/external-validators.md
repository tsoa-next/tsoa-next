---
title: Validadores Externos
lang: pt-BR
lastUpdated: 2026-04-17T20:53:42.040Z
---

# Validadores externos com `@Validate`

O novo decorador de esquema externo é [`@Validate(...)`](./reference/tsoa-next/functions/Validate.md).
Se você estiver procurando `@Validator`, o nome do decorador em `tsoa-next` é `@Validate`.
Referência da API relevante: [`@Validate`](./reference/tsoa-next/functions/Validate.md), [`@Body`](./reference/tsoa-next/functions/Body.md), [`@BodyProp`](./reference/tsoa-next/functions/BodyProp.md), [`@Query`](./reference/tsoa-next/functions/Query.md), [`@Queries`](./reference/tsoa-next/functions/Queries.md), [`@Path`](./reference/tsoa-next/functions/Path.md), [`@Header`](./reference/tsoa-next/functions/Header.md), [`@FormField`](./reference/tsoa-next/functions/FormField.md), [`@UploadedFile`](./reference/tsoa-next/functions/UploadedFile.md), [`@UploadedFiles`](./reference/tsoa-next/functions/UploadedFiles.md), e [`File`](./reference/tsoa-next/interfaces/File.md).

[[toc]]

## O quê? `@Validate` alterações

[`@Validate(...)`](./reference/tsoa-next/functions/Validate.md) torna um esquema externo a fonte de verdade em tempo de execução para um parâmetro decorado.

- TypeScript tipos de unidade ainda OpenAPI geração
- O esquema externo substitui a validação em tempo de execução para a sub- árvore de parâmetros decorados
- Rotas que não utilizam `@Validate(...)` manter o seu comportamento de validação existente

## Objectivos apoiados

Nesta versão, `@Validate(...)` é suportado nos parâmetros do método do controlador que usam:

- [`@Body()`](./reference/tsoa-next/functions/Body.md)- [`@BodyProp()`](./reference/tsoa-next/functions/BodyProp.md)- [`@Query()`](./reference/tsoa-next/functions/Query.md)- [`@Queries()`](./reference/tsoa-next/functions/Queries.md)- [`@Path()`](./reference/tsoa-next/functions/Path.md)- [`@Header()`](./reference/tsoa-next/functions/Header.md)- [`@FormField()`](./reference/tsoa-next/functions/FormField.md)- [`@UploadedFile()`](./reference/tsoa-next/functions/UploadedFile.md)- [`@UploadedFiles()`](./reference/tsoa-next/functions/UploadedFiles.md)

## Bibliotecas suportadas

- `zod`- `joi`- `yup`- `superstruct`- `io-ts`

Instale apenas a biblioteca do validador que o seu aplicativo usa.

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

## Formulários de decorador suportados

Todas as bibliotecas de validadores suportadas podem ser usadas com qualquer um destes formulários:

```ts
@Validate(schema)
@Validate('zod', schema)
@Validate({ kind: 'zod', schema })
```

Quando passar apenas o esquema, `tsoa-next` irá tentar inferir o tipo de validador do objeto de esquema e sua fonte de importação.
Se a inferência for ambígua, use o `kind` formulários.

## Modelo de exemplo comum

Os exemplos abaixo usam um compartilhado TypeScript forma para que você possa ver o que permanece o mesmo enquanto a validação em tempo de execução muda.

```ts
type ExternalLiteralUnion = 'active' | 'disabled'

type ExternalObject = {
  name: string
  status: ExternalLiteralUnion
  tags: string[]
}
```

## Zod

Zod funciona bem com a forma inferida:

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

Joi pode ser usado com um tipo de validador explícito:

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

Joi também é útil para campos multipartes e arquivos carregados:

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

Para mais detalhes de upload, consulte [Uploading files](./file-upload).

## Sim.

Yup funciona com o formulário do objeto:

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

## Superestrutura

Superstruct funciona com o tipo explícito:

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

`io-ts` funciona bem quando você quer um codec para ser autoritário em tempo de execução, preservando uma primeira classe TypeScript alias através de `TypeOf`.

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

## Ganchos de validação

Gerado `RegisterRoutes(...)` as funções aceitam um contexto opcional de validação.
Isto é útil quando você deseja mensagens de validação externas traduzidas ou reformatadas antes de serem devolvidas aos clientes.

```ts
RegisterRoutes(app, {
  validation: {
    translate: (key, params) => translateMessage(key, params),
    errorFormatter: failure => failure,
  },
})
```

## Orientação prática

- Mantenha o seu TypeScript tipos e esquemas externos alinhados. OpenAPI a seguir TypeScript tipo, mas validação em tempo de execução segue o esquema externo.
- Certifique-se de que o aplicativo importa módulos de controle antes `RegisterRoutes(...)` corre, então os metadados decoradores estão disponíveis em tempo de execução.
- Se você usar modelos de rota personalizados, mantenha os metadados de validação em tempo de execução encanamento intactos para que classe do controlador, nome do método e índice de parâmetros ainda estejam disponíveis durante a validação.
- Use o formulário inferido quando for óbvio, e mude para os formulários explícitos quando você quiser clareza de documentação ou o tipo de esquema não é fácil de inferir.
