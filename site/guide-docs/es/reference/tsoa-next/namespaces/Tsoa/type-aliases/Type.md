---
lastUpdated: 2026-04-20T21:59:41.362Z
---
[tsoa-next](../../../../packages.md) / [tsoa-next](../../../index.md) / [Tsoa](../index.md) / Type

# Tipo Alias: Tipo

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

Definido en: [packages/runtime/src/metadataGeneration/tsoa.ts:188](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/metadataGeneration/tsoa.ts#L188)

Este es uno de los objetos posibles tsoa crea que ayuda a almacenar información sobre el tipo que se encuentra en el código.
