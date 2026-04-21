---
title: Validateurs externes
lang: fr-FR
lastUpdated: 2026-04-17T20:53:42.040Z
---

# Validateurs externes avec `@Validate`

Le nouveau décorateur de schéma externe est [`@Validate(...)`](./reference/tsoa-next/functions/Validate.md).
Si vous cherchez `@Validator`, le nom du décorateur dans `tsoa-next` est `@Validate`.
Référence IPA pertinente: [`@Validate`](./reference/tsoa-next/functions/Validate.md), [`@Body`](./reference/tsoa-next/functions/Body.md), [`@BodyProp`](./reference/tsoa-next/functions/BodyProp.md), [`@Query`](./reference/tsoa-next/functions/Query.md), [`@Queries`](./reference/tsoa-next/functions/Queries.md), [`@Path`](./reference/tsoa-next/functions/Path.md), [`@Header`](./reference/tsoa-next/functions/Header.md), [`@FormField`](./reference/tsoa-next/functions/FormField.md), [`@UploadedFile`](./reference/tsoa-next/functions/UploadedFile.md), [`@UploadedFiles`](./reference/tsoa-next/functions/UploadedFiles.md)et [`File`](./reference/tsoa-next/interfaces/File.md).

[[toc]]

## Quoi `@Validate` changements

[`@Validate(...)`](./reference/tsoa-next/functions/Validate.md) fait d'un schéma externe la source de vérité d'un paramètre décoré.

- TypeScript types toujours conduire OpenAPI génération
- Le schéma externe remplace la validation d'exécution intégrée pour le sous-arbre des paramètres décorés
- Routes qui n'utilisent pas `@Validate(...)` garder leur comportement de validation existant

## Objectifs soutenus

Dans cette version, `@Validate(...)` est supporté sur les paramètres de la méthode de contrôleur qui utilisent:

- [`@Body()`](./reference/tsoa-next/functions/Body.md)- [`@BodyProp()`](./reference/tsoa-next/functions/BodyProp.md)- [`@Query()`](./reference/tsoa-next/functions/Query.md)- [`@Queries()`](./reference/tsoa-next/functions/Queries.md)- [`@Path()`](./reference/tsoa-next/functions/Path.md)- [`@Header()`](./reference/tsoa-next/functions/Header.md)- [`@FormField()`](./reference/tsoa-next/functions/FormField.md)- [`@UploadedFile()`](./reference/tsoa-next/functions/UploadedFile.md)- [`@UploadedFiles()`](./reference/tsoa-next/functions/UploadedFiles.md)

## Bibliothèques prises en charge

- `zod`- `joi`- `yup`- `superstruct`- `io-ts`

Installez seulement la bibliothèque de validation que votre application utilise.

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

## Formes de décorateur supportées

Toutes les bibliothèques de validation supportées peuvent être utilisées avec n'importe lequel de ces formulaires :

```ts
@Validate(schema)
@Validate('zod', schema)
@Validate({ kind: 'zod', schema })
```

Lorsque vous passez seulement le schéma, `tsoa-next` tentera d'inférer le type de validateur à partir de l'objet schéma et de sa source d'importation.
Si l'inférence est ambiguë, utilisez le `kind` les formulaires.

## Modèle d'exemple commun

Les exemples ci-dessous utilisent un partage TypeScript forme de sorte que vous pouvez voir ce qui reste le même pendant que la validation d'exécution change.

```ts
type ExternalLiteralUnion = 'active' | 'disabled'

type ExternalObject = {
  name: string
  status: ExternalLiteralUnion
  tags: string[]
}
```

## Zod

Zod fonctionne bien avec la forme inférée:

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

Joi peut être utilisé avec un validateur explicite:

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

Joi est également utile pour les champs multiparties et les fichiers téléchargés:

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

Pour plus de détails, voir [Uploading files](./file-upload).

## Oui

Yup fonctionne avec le formulaire objet:

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

## Superstructure

Superstruct fonctionne avec la forme de nature explicite:

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

## Autres

`io-ts` fonctionne bien quand vous voulez qu'un codec fasse autorité à l'exécution tout en préservant une première classe TypeScript alias par `TypeOf`.

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

## Crochets de validation

Générés `RegisterRoutes(...)` fonctions acceptent un contexte de validation optionnel.
Ceci est utile lorsque vous voulez des messages de validation externes traduits ou reformatés avant qu'ils ne soient retournés aux clients.

```ts
RegisterRoutes(app, {
  validation: {
    translate: (key, params) => translateMessage(key, params),
    errorFormatter: failure => failure,
  },
})
```

## Orientations pratiques

- Gardez votre TypeScript types et schémas externes alignés. OpenAPI suit TypeScript type, mais la validation d'exécution suit le schéma externe.
- Assurez-vous que l'application importe des modules de contrôleur avant `RegisterRoutes(...)` Les métadonnées de décorateur sont donc disponibles à l'exécution.
- Si vous utilisez des modèles de route personnalisés, gardez les métadonnées de validation d'exécution intactes afin que la classe de contrôleur, le nom de méthode et l'index des paramètres soient toujours disponibles pendant la validation.
- Utilisez le formulaire inféré quand il est évident, et passez aux formulaires explicites lorsque vous voulez la clarté de la documentation ou le type de schéma n'est pas facile à déduire.
