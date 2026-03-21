# Introduction

`tsoa-next` is the continuation of the original [`tsoa`](https://github.com/lukeautry/tsoa) project, building on the stable foundation established there by Luke Autry and contributors.
It is a framework with an integrated OpenAPI compiler to build Node.js server-side applications using TypeScript.
It can target express, hapi, koa and more frameworks at runtime.
`tsoa-next` applications are type-safe by default and handle runtime validation seamlessly.

In the guides below, `tsoa` usually refers to the CLI command and underlying architecture that `tsoa-next` continues.

## Goal

- TypeScript controllers and models as the single source of truth for your API
- A valid OpenAPI (formerly Swagger) spec (2.0 or 3.0) is generated from your controllers and models, including:
  - Paths (e.g. GET /Users)
  - Definitions based on TypeScript interfaces (models)
  - Parameters/model properties marked as required or optional based on TypeScript (e.g. myProperty?: string is optional in the OpenAPI spec)
  - jsDoc supported for object descriptions (most other metadata can be inferred from TypeScript types)
- Routes are generated for middleware of choice
  - Express, Hapi, and Koa currently supported, other middleware can be supported using a simple handlebars template
  - Seamless runtime validation

## Philosophy

- Rely on TypeScript type annotations to generate API metadata if possible
- If regular type annotations aren't an appropriate way to express metadata, use decorators
- Use jsdoc for pure text metadata (e.g. endpoint descriptions)
- Minimize boilerplate
- Models are best represented by interfaces (pure data structures), but can also be represented by classes
- Runtime validation of `tsoa-next` should behave as closely as possible to the specifications that the generated OpenAPI 2/3 schema describes. Any differences in validation logic are clarified by logging warnings during the generation of the OpenAPI Specification (OAS) and/or the routes.
  - Please note that by enabling OpenAPI 3 you minimize the chances of divergent validation logic since OpenAPI 3 has a more expressive schema syntax.
