---
lastUpdated: 2026-04-20T21:59:41.311Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/runtime](../index.md) / Validate

# المهمة: موثوقية

```ts
function Validate(...args): ParameterDecorator;
```

محددة في: [packages/runtime/src/decorators/validate.ts:141](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/validate.ts#L141)

Attaches external-schema validation metadata to a controller parameter.

أشكال الدعم `@Validate(schema)`.. `@Validate(kind, schema)`و `@Validate({ kind, schema })`.

## البارامترات

### args

...`unknown`[]

## العودة

`ParameterDecorator`
