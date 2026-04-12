# tsoa-next

## 8.0.5

### Patch Changes

- 2c0aa7c: Add CLI config discovery with `tsoa discover` and `--discover` support, lazy-load generation code for faster CLI startup, and make GitHub package publishing explicitly tag `tsoa-next` as `latest`.
- Updated dependencies [2c0aa7c]
  - @tsoa-next/cli@8.0.5
  - @tsoa-next/runtime@8.0.5

## 8.0.4

### Patch Changes

- 9fdb94a: Fixed inherited route detection for derived controllers whose base class imports `Controller` from `tsoa-next`.
- 464a0c7: Fixed metadata generation for inherited generic controller routes and `io-ts` request aliases used in real-world controller setups. Also reduced repeated CLI generation work while resolving inherited methods and imported validator types.
- Updated dependencies [9fdb94a]
- Updated dependencies [464a0c7]
  - @tsoa-next/cli@8.0.4
  - @tsoa-next/runtime@8.0.4

## 8.0.3

### Patch Changes

- Updated dependencies [4fd4531]
  - @tsoa-next/cli@8.0.3
  - @tsoa-next/runtime@8.0.3

## 8.0.2

### Patch Changes

- a051324: Remediate the remaining metadata resolver quality issues without changing the public API surface.

  This patch keeps the existing CLI contracts intact while reducing internal complexity, tightening default parsing behavior, and adding focused tests that lock in the non-breaking behavior.

- 63e57e3: Remediate the Sonar cleanup pass across the CLI and runtime without changing the public API surface.

  This patch keeps the existing exported contracts intact while reducing internal complexity, preserving legacy compatibility paths, and tightening integration and unit assertions around the affected behavior.

- Updated dependencies [a051324]
- Updated dependencies [63e57e3]
  - @tsoa-next/cli@8.0.2
  - @tsoa-next/runtime@8.0.2

## 8.0.1

### Patch Changes

- 61f5454: Stop defaulting generated OpenAPI specs to an MIT license when the consumer package does not declare a `license` field.
- Updated dependencies [61f5454]
  - @tsoa-next/cli@8.0.1
  - @tsoa-next/runtime@8.0.1

## 8.0.0

### Major Changes

- e942a31: Make `tsoa-next` root runtime-only and move programmatic generation exports to `tsoa-next/cli` so runtime imports do not eagerly load CLI dependencies.

### Patch Changes

- @tsoa-next/cli@8.0.0
- @tsoa-next/runtime@8.0.0

## 7.3.4

### Patch Changes

- b5a952b: Trigger a development publish from the main-branch dev build workflow so downstream projects can validate prerelease packages before the next public release.
- 0bd572e: Restore backward compatibility for nested module tsoa configs and route generation so downstream projects can validate the fixes in a dev build before the next public release.
- 8be0961: Fix backward-compatible metadata and schema generation for imported aliases, generic aliases, and inherited error models.
- Updated dependencies [b5a952b]
- Updated dependencies [0bd572e]
- Updated dependencies [8be0961]
  - @tsoa-next/cli@7.3.4
  - @tsoa-next/runtime@7.3.4

## 7.3.3

### Patch Changes

- 1eabe79: Fixes backward compatibility
- Updated dependencies [1eabe79]
  - @tsoa-next/cli@7.3.3
  - @tsoa-next/runtime@7.3.3

## 7.3.2

### Patch Changes

- Updated dependencies [0eea2bc]
  - @tsoa-next/cli@7.3.2
  - @tsoa-next/runtime@7.3.2

## 7.3.1

### Patch Changes

- 56c6b54: Refresh the release publish workflow to run on Node 24 so npm trusted publishing can authenticate with OIDC during npm publishes.
- Updated dependencies [56c6b54]
  - @tsoa-next/cli@7.3.1
  - @tsoa-next/runtime@7.3.1

## 7.3.0

### Minor Changes

- 028926a: Add opt-in external validator support for parameter validation with zod, joi, yup, superstruct, and io-ts, while preserving existing validation behavior for undecorated routes.

  Harden metadata, route generation, and OpenAPI handling so type aliases and non-interface named types work as first-class models, including `TypeOf<typeof Codec>`-style flows.

### Patch Changes

- Updated dependencies [028926a]
  - @tsoa-next/cli@7.3.0
  - @tsoa-next/runtime@7.3.0

## 7.2.1

### Patch Changes

- 255ffd4: Fixes reported security issues
- Updated dependencies [255ffd4]
  - @tsoa-next/cli@7.2.1
  - @tsoa-next/runtime@7.2.1

## 7.2.0

### Minor Changes

- f399866: Add support for aliased imported decorators and referenced model types during metadata generation.
- 2e82198: Add support for sourcing TypeScript compiler options from tsconfig.json in tsoa-next configuration.
- d4414a3: Add support for exclusiveMinimum and exclusiveMaximum in schema generation and runtime validation.

### Patch Changes

- 83eda34: Fix runtime handling of empty request bodies so absent bodies are treated as undefined.
- Updated dependencies [f399866]
- Updated dependencies [2e82198]
- Updated dependencies [d4414a3]
- Updated dependencies [83eda34]
  - @tsoa-next/cli@7.2.0
  - @tsoa-next/runtime@7.2.0

## 7.1.0

### Minor Changes

- 9ad742e: This is a forced release

### Patch Changes

- 46e88e2: Force release
- Updated dependencies [46e88e2]
- Updated dependencies [9ad742e]
  - @tsoa-next/cli@7.1.0
  - @tsoa-next/runtime@7.1.0

## 7.1.0

### Minor Changes

- 009f121: This was forked

### Patch Changes

- Updated dependencies [009f121]
  - @tsoa-next/cli@7.1.0
  - @tsoa-next/runtime@7.1.0
