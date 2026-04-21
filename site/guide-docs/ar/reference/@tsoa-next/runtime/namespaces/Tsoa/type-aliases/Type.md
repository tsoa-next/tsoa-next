---
lastUpdated: 2026-04-20T21:59:41.325Z
---
[tsoa-next](../../../../../packages.md) / [@tsoa-next/runtime](../../../index.md) / [Tsoa](../index.md) / Type

# نوع الياس: نوع

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

محددة في: [packages/runtime/src/metadataGeneration/tsoa.ts:188](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/metadataGeneration/tsoa.ts#L188)

هذه واحدة من الأشياء المحتملة tsoa يخلق ذلك يساعد في تخزين المعلومات عن النوع الذي وجد في الشفرة
