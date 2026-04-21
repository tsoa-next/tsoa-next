---
lastUpdated: 2026-04-20T21:59:41.325Z
---
[tsoa-next](../../../../../packages.md) / [@tsoa-next/runtime](../../../index.md) / [Tsoa](../index.md) / Type

# ধরন: ধরন

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

নির্ধারিত মান: [packages/runtime/src/metadataGeneration/tsoa.ts:188](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/metadataGeneration/tsoa.ts#L188)

এটি একটি সম্ভাব্য বস্তু tsoa কোডের ধরণ অনুযায়ী কোড সংরক্ষণ করতে ব্যবহৃত হয় ।
