---
lastUpdated: 2026-04-20T21:59:41.325Z
---
[tsoa-next](../../../../../packages.md) / [@tsoa-next/runtime](../../../index.md) / [Tsoa](../index.md) / PrimitiveTypeLiteral

# प्रकार उपनाम: PrimitiveTypeLiteral

```ts
type PrimitiveTypeLiteral = Exclude<TypeStringLiteral, 
  | RefTypeLiteral
  | "enum"
  | "array"
  | "void"
  | "undefined"
  | "nestedObjectLiteral"
  | "union"
  | "intersection"
| "tuple">;
```

में परिभाषित: [packages/runtime/src/metadataGeneration/tsoa.ts:177](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/metadataGeneration/tsoa.ts#L177)
