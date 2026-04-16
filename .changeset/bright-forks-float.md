---
'@tsoa-next/cli': patch
'@tsoa-next/runtime': patch
'tsoa-next': patch
---

Fix live `@SpecPath(...)` serving for compiled deployments that do not ship controller source files.

Generated routes now embed the OpenAPI artifact and metadata needed for built-in spec endpoints, so live spec responses no longer depend on runtime controller glob resolution. This also keeps generated route imports aligned with embedded-spec usage and preserves normal spec-generation options when building embedded specs.

Additional follow-up fixes keep the runtime CLI loading path shared and lazy, which avoids unnecessary eager CLI dependency loading while preserving YAML fallback support.
