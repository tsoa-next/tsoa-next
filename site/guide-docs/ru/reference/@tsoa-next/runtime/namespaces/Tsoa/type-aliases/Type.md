---
lastUpdated: 2026-04-20T21:59:41.325Z
---
[tsoa-next](../../../../../packages.md) / [@tsoa-next/runtime](../../../index.md) / [Tsoa](../index.md) / Type

# Тип Alias: Тип

```ts
type Type = 
  | PrimitiveType
  | ObjectsNoPropsType
  | EnumType
  | ArrayType
  | FileType
  | DateTimeType
  | DateType
  | BinaryType
  | BufferType
  | ByteType
  | AnyType
  | RefEnumType
  | RefObjectType
  | RefAliasType
  | NestedObjectLiteralType
  | UnionType
  | IntersectionType
  | TupleType;
```

Определено в: [packages/runtime/src/metadataGeneration/tsoa.ts:188](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/metadataGeneration/tsoa.ts#L188)

Это один из возможных объектов, который tsoa Создает, что помогает коду хранить информацию о типе, который он нашел в коде.
