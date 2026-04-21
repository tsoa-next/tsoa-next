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

Definido em: [packages/runtime/src/metadataGeneration/tsoa.ts:188](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/metadataGeneration/tsoa.ts#L188)

Este é um dos objetos possíveis que tsoa cria que ajuda o código armazenar informações sobre o tipo encontrado no código.
