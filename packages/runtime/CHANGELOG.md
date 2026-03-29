# @tsoa-next/runtime

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
