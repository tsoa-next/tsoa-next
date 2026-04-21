---
lastUpdated: 2026-04-20T21:59:41.361Z
---
[tsoa-next](../../../../packages.md) / [tsoa-next](../../../index.md) / [Tsoa](../index.md) / PrimitiveTypeLiteral

# Тип Alias: PrimitiveType

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

Определено в: [packages/runtime/src/metadataGeneration/tsoa.ts:177](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/metadataGeneration/tsoa.ts#L177)
