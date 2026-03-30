# tsoa-next

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
