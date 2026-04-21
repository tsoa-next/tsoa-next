---
lastUpdated: 2026-04-20T21:59:41.341Z
---
[tsoa-next](../../packages.md) / [tsoa-next](../index.md) / Validate

# समारोह: मान्य ()

```ts
function Validate(...args): ParameterDecorator;
```

में परिभाषित: [packages/runtime/src/decorators/validate.ts:141](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/validate.ts#L141)

बाहरी स्कीमा सत्यापन मेटाडाटा को नियंत्रक पैरामीटर में संलग्न करता है।

समर्थित रूप हैं `@Validate(schema)`, `@Validate(kind, schema)`, और `@Validate({ kind, schema })`।

## पैरामीटर

### args

...`unknown`[]

## रिटर्न

`ParameterDecorator`
