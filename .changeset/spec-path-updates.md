---
'@tsoa-next/cli': minor
'@tsoa-next/runtime': minor
'tsoa-next': minor
---

Improve `@SpecPath(...)` support by adding the `@SpecPath(path, options?)` signature with `target`, `cache`, and request-aware `gate` controls.

Generated Express, Koa, and Hapi routes now omit `SpecPath` support when no controller uses the decorator, and statically gated spec routes are skipped during registration.
