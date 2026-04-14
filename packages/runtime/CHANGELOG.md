# @tsoa-next/runtime

## 8.2.0

### Minor Changes

- 8a8ff5b: Improve `@SpecPath(...)` support by adding the `@SpecPath(path, options?)` signature with `target`, `cache`, and request-aware `gate` controls.

  Generated Express, Koa, and Hapi routes now omit `SpecPath` support when no controller uses the decorator, and statically gated spec routes are skipped during registration.

## 8.1.0

### Minor Changes

- 84bb4a6: Add repeatable `@SpecPath(...)` controller decorators for serving OpenAPI documents and documentation UIs directly from generated routes without reading a local spec file at request time.

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

### Patch Changes

- 3748c49: Refresh public JSDocs across the decorator surface and exported runtime and CLI helpers so generated declarations and editor hovers better describe supported parameters and behavior.

## 8.0.5

### Patch Changes

- 2c0aa7c: Add CLI config discovery with `tsoa discover` and `--discover` support, lazy-load generation code for faster CLI startup, and make GitHub package publishing explicitly tag `tsoa-next` as `latest`.

## 8.0.4

## 8.0.3

## 8.0.2

### Patch Changes

- 63e57e3: Remediate the Sonar cleanup pass across the CLI and runtime without changing the public API surface.

  This patch keeps the existing exported contracts intact while reducing internal complexity, preserving legacy compatibility paths, and tightening integration and unit assertions around the affected behavior.

## 8.0.1

### Patch Changes

- 61f5454: Stop defaulting generated OpenAPI specs to an MIT license when the consumer package does not declare a `license` field.

## 8.0.0

## 7.3.4

### Patch Changes

- b5a952b: Trigger a development publish from the main-branch dev build workflow so downstream projects can validate prerelease packages before the next public release.
- 0bd572e: Restore backward compatibility for nested module tsoa configs and route generation so downstream projects can validate the fixes in a dev build before the next public release.
- 8be0961: Fix backward-compatible metadata and schema generation for imported aliases, generic aliases, and inherited error models.

## 7.3.3

## 7.3.2

## 7.3.1

### Patch Changes

- 56c6b54: Refresh the release publish workflow to run on Node 24 so npm trusted publishing can authenticate with OIDC during npm publishes.

## 7.3.0

### Minor Changes

- 028926a: Add opt-in external validator support for parameter validation with zod, joi, yup, superstruct, and io-ts, while preserving existing validation behavior for undecorated routes.

  Harden metadata, route generation, and OpenAPI handling so type aliases and non-interface named types work as first-class models, including `TypeOf<typeof Codec>`-style flows.

## 7.2.1

### Patch Changes

- 255ffd4: Fixes reported security issues

## 7.2.0

### Minor Changes

- f399866: Add support for aliased imported decorators and referenced model types during metadata generation.
- 2e82198: Add support for sourcing TypeScript compiler options from tsconfig.json in tsoa-next configuration.
- d4414a3: Add support for exclusiveMinimum and exclusiveMaximum in schema generation and runtime validation.

### Patch Changes

- 83eda34: Fix runtime handling of empty request bodies so absent bodies are treated as undefined.

## 7.1.0

### Minor Changes

- 9ad742e: This is a forced release

### Patch Changes

- 46e88e2: Force release

## 7.1.0

### Minor Changes

- 009f121: This was forked
