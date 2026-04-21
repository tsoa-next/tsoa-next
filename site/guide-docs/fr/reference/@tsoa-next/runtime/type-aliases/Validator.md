---
lastUpdated: 2026-04-20T21:59:41.328Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/runtime](../index.md) / Validator

# Type Alias: Validateur

```ts
type Validator = 
  | IntegerValidator
  | FloatValidator
  | DateValidator
  | DateTimeValidator
  | StringValidator
  | BooleanValidator
  | ArrayValidator;
```

Définie dans : [packages/runtime/src/routeGeneration/templateHelpers.ts:1356](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templateHelpers.ts#L1356)

Union des groupes de règles de validation utilisés par les métadonnées de route générées.
