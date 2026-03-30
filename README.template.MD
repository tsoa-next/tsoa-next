<div align="center">
  <a href="https://tsoa-next.dev/" target="_blank" rel="noreferrer">
    <h1>
      <span style="display: inline-flex; align-items: center; gap: 0.35em; white-space: nowrap;">
        <img src="{{LOGO_PATH}}" alt="tsoa-next logo" height="40" style="height: 1em; width: auto;" />
        <span>tsoa-next</span>
      </span>
    </h1>
  </a>
Pronounced so·uh

OpenAPI-compliant REST APIs using TypeScript and Node

[![build status](https://github.com/tsoa-next/tsoa-next/actions/workflows/runTestsOnPush.yml/badge.svg)](https://github.com/tsoa-next/tsoa-next/actions/workflows/runTestsOnPush.yml)
[![npm version](https://img.shields.io/npm/v/tsoa-next/latest)](https://www.npmjs.com/package/tsoa-next)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=tsoa-next_tsoa-next&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=tsoa-next_tsoa-next)

</div>

## Project Lineage

`tsoa-next` continues the original [`tsoa`](https://github.com/lukeautry/tsoa) project.
The original repository and its contributors established the stable TypeScript-first and OpenAPI-first foundation this work builds on.
Where historical release notes or migration references still point upstream, they are kept intentionally for provenance.

## Goal

- TypeScript controllers and models as the single source of truth for your API
- A valid OpenAPI (formerly Swagger) spec (2.0 or 3.0 if you choose 😍) is generated from your controllers and models, including:
  - Paths (e.g. GET /users)
  - Definitions based on TypeScript interfaces (models)
  - Parameters/model properties marked as required or optional based on TypeScript (e.g. myProperty?: string is optional in the OpenAPI spec)
  - jsDoc supported for object descriptions (most other metadata can be inferred from TypeScript types)
- Routes are generated for middleware of choice
  - Express, Hapi, and Koa currently supported, other middleware can be supported using a simple handlebars template
  - Validate request payloads

## Philosophy

- Rely on TypeScript type annotations to generate API metadata if possible
- If regular type annotations aren't an appropriate way to express metadata, use decorators
- Use jsdoc for pure text metadata (e.g. endpoint descriptions)
- Minimize boilerplate
- Models are best represented by interfaces (pure data structures), but can also be represented by classes
- Runtime validation of tsoa-next should behave as closely as possible to the specifications that the generated OpenAPI 2/3 schema describes. Any differences in validation logic are clarified by logging warnings during the generation of the OpenAPI Specification (OAS) and/or the routes.
  - Please note that by enabling OpenAPI 3 you minimize the chances of divergent validation logic since OpenAPI 3 has a more expressive schema syntax.

## External Validators

`@Validate(...)` adds opt-in runtime authority for external schemas on supported controller method parameters.

- Supported forms: `@Validate(schema)`, `@Validate('zod', schema)`, `@Validate({ kind: 'zod', schema })`
- Supported libraries: `zod`, `joi`, `yup`, `superstruct`, `io-ts`
- `io-ts` installs: add `fp-ts`, and add `io-ts-types` as well if you rely on helpers like `withMessage`
- Supported parameter decorators: `@Body`, `@BodyProp`, `@Query`, `@Queries`, `@Path`, `@Header`, and `@FormField` / uploaded file params
- Behavior: TypeScript metadata still drives OpenAPI generation, while the external schema replaces built-in runtime validation for the decorated parameter subtree
- Compatibility: routes without `@Validate(...)` keep their current behavior

Generated `RegisterRoutes(...)` functions also accept an optional validation context so applications can provide translation or failure-formatting hooks:

```ts
RegisterRoutes(app, {
  validation: {
    translate: (key, params) => translateMessage(key, params),
    errorFormatter: failure => failure,
  },
})
```

```ts
import * as t from 'io-ts'
import { withMessage } from 'io-ts-types'
import { Body, Controller, Post, Route, Validate } from 'tsoa-next'

interface PositiveFloatBrand {
  readonly PositiveFloat: unique symbol
}

const PositiveFloat = withMessage(
  t.brand(t.number, (n): n is t.Branded<number, PositiveFloatBrand> => Number.isFinite(n) && n > 0, 'PositiveFloat'),
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
  public createWager(
    @Body()
    @Validate('io-ts', WagerCodec)
    wager: Wager,
  ): Wager {
    return wager
  }
}
```

## Migration Note

This feature is fully opt-in. If you do not use `@Validate(...)`, existing interface/class models, generated routes, validation behavior, and error responses are unchanged.

## Getting Started

- Requirements:
  - Node.js 22 or newer
  - npm 10 or newer
  - We verify support across the previous LTS, current LTS, and Node vNext in CI
- [Documentation](https://tsoa-next.dev/)
- [API Reference](https://tsoa-next.dev/reference/)
- [Getting started guide](https://tsoa-next.dev/getting-started)

## Examples

Check out the [guides](https://tsoa-next.dev/)

See example controllers in [the tests](https://github.com/tsoa-next/tsoa-next/tree/main/tests/fixtures/controllers)

See example models in [the tests](https://github.com/tsoa-next/tsoa-next/blob/main/tests/fixtures/testModel.ts)

## Help wanted

### Contributing code

To contribute (via a PR), please first see the [Contributing Guide](https://github.com/tsoa-next/tsoa-next/blob/main/docs/CONTRIBUTING.md)
