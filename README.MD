<!-- This file is generated from README.template.MD by `npm run sync:readmes`. Do not edit directly. -->

<div align="center">
  <a href="https://tsoa-next.dev/" target="_blank" rel="noreferrer">
    <h1>
      <span style="display: inline-flex; align-items: center; gap: 0.35em; white-space: nowrap;">
        <img src="./assets/tsoa-next-logo-590.png" alt="tsoa-next logo" height="40" style="height: 1em; width: auto;" />
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

## Feature List

- Generate OpenAPI 2.0, 3.0, or 3.1 documents directly from your TypeScript controllers, models, and JSDoc comments.
- Treat TypeScript controllers and models as the source of truth for paths, parameters, schemas, examples, tags, and security metadata.
- Generate framework-specific route handlers for Express, Koa, and Hapi, or supply your own Handlebars templates for custom runtimes.
- Validate request input at runtime with configurable coercion and additional-property handling that stays aligned with the generated schema.
- Expose controller-local spec endpoints with `@SpecPath(...)` without reading a generated spec file from local disk at request time.
- Serve built-in `json`, `yaml`, `swagger`, `redoc`, and `rapidoc` spec targets, with docs UI packages loaded lazily as optional peers when available.
- Attach multiple `@SpecPath(...)` decorators to the same controller as long as their resolved paths are unique.
- Cache built-in or custom spec responses with `'none'`, in-process `'memory'`, or a custom cache handler that can read from strings or streams.
- Return either `string` or `Readable` responses from custom `@SpecPath(...)` handlers for bespoke documentation or downstream integrations.
- Use `@Validate(...)` to delegate runtime validation to supported external schema libraries such as `zod`, `joi`, `yup`, `superstruct`, or `io-ts`.
- Customize validation translation and failure formatting through the optional validation context accepted by generated `RegisterRoutes(...)` functions.
- Support authentication hooks, dependency injection, typed alternate responders, file uploads, custom middleware, and custom validation workflows.
- Use the `tsoa` CLI for spec and route generation, or call the programmatic APIs from `tsoa-next/cli`.
- Target modern Node.js releases with the support policy verified in CI across the previous LTS, current LTS, and Node vNext.

## Getting Started

- Requirements:
  - Node.js 22 or newer
  - npm 10 or newer
  - We verify support across the previous LTS, current LTS, and Node vNext in CI
- [Documentation](https://tsoa-next.dev/)
- [API Reference](https://tsoa-next.dev/reference/)
- [Getting started guide](https://tsoa-next.dev/getting-started)

## Package Surface

- Import decorators, runtime helpers, and generated route support from `tsoa-next`
- Import programmatic generation APIs from `tsoa-next/cli`
- Use the `tsoa` binary for CLI generation commands

## Examples

Check out the [guides](https://tsoa-next.dev/)

Use the companion [playground repository](https://github.com/tsoa-next/playground) for runnable example apps and server-focused scenarios.

See example controllers in [the tests](https://github.com/tsoa-next/tsoa-next/tree/main/tests/fixtures/controllers)

See example models in [the tests](https://github.com/tsoa-next/tsoa-next/blob/main/tests/fixtures/testModel.ts)

## Help wanted

### Contributing code

To contribute (via a PR), please first see the [Contributing Guide](https://github.com/tsoa-next/tsoa-next/blob/main/docs/CONTRIBUTING.md)
