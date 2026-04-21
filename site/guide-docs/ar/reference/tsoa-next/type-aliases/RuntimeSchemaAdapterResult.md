---
lastUpdated: 2026-04-20T21:59:41.366Z
---
[tsoa-next](../../packages.md) / [tsoa-next](../index.md) / RuntimeSchemaAdapterResult

# نوع &quot; الياس &quot; :\<T\>

```ts
type RuntimeSchemaAdapterResult<T> = 
  | {
  ok: true;
  value: T;
}
  | {
  failure: ValidationFailure;
  ok: false;
};
```

محددة في: [packages/runtime/src/routeGeneration/externalValidation.ts:4](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/externalValidation.ts#L4)

Result returned by a runtime adapter for an external validation library.

## البارامترات النوعية

### T

`T` = `unknown`
