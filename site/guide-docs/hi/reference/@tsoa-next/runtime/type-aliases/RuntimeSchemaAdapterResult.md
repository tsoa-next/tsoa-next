---
lastUpdated: 2026-04-20T21:59:41.327Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/runtime](../index.md) / RuntimeSchemaAdapterResult

# प्रकार उपनाम: RuntimeSchemaAdapterResult\<T\>

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

में परिभाषित: [packages/runtime/src/routeGeneration/externalValidation.ts:4](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/externalValidation.ts#L4)

परिणाम एक बाहरी सत्यापन पुस्तकालय के लिए एक रनटाइम एडाप्टर द्वारा लौटे।

## प्रकार पैरामीटर

### T

`T` = `unknown`
