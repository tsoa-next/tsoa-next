---
'@tsoa-next/cli': minor
'@tsoa-next/runtime': minor
'tsoa-next': minor
---

Add repeatable `@SpecPath(...)` controller decorators for serving OpenAPI documents and documentation UIs directly from generated routes without reading a local spec file at request time.

This release adds:

- Built-in `json`, `yaml`, `swagger`, `redoc`, and `rapidoc` `@SpecPath(...)` targets
- Lazy in-memory spec generation for built-in spec routes through `createOpenApiSpecGenerator(...)`
- Support for multiple `@SpecPath(...)` decorators on the same controller with duplicate-path validation
- In-process `'memory'` caching, cache bypass with `'none'`, and custom cache handlers that can read strings or streams
- Support for custom `@SpecPath(...)` handlers that return either `string` or `Readable`
- Route template support for Express, Koa, and Hapi so spec routes are registered automatically from controller metadata
- Optional peer dependencies for Swagger UI, Redoc, and RapiDoc that are only required when those built-in targets are used
- Public CLI helpers for building and serializing specs in memory without writing them to disk

`@SpecPath(...)` routes are auxiliary runtime endpoints and are not added to the generated OpenAPI document.
