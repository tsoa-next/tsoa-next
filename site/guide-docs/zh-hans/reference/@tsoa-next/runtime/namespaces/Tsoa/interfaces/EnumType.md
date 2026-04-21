---
lastUpdated: 2026-04-20T21:59:41.321Z
---
[tsoa-next](../../../../../packages.md) / [@tsoa-next/runtime](../../../index.md) / [Tsoa](../index.md) / EnumType

# 接口: Enum 类型

定义如下: [packages/runtime/src/metadataGeneration/tsoa.ts:242](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/metadataGeneration/tsoa.ts#L242)

不要和他们混淆 `RefEnumType` 它是一个可重复使用的enum,它有一个$ref名称产生。 然而,这是一个内在的内涵。

## 扩展

- [`TypeBase`](TypeBase.md)

## 属性

### dataType

```ts
dataType: "enum";
```

定义如下: [packages/runtime/src/metadataGeneration/tsoa.ts:243](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/metadataGeneration/tsoa.ts#L243)

#### 覆盖

[`TypeBase`](TypeBase.md).[`dataType`](TypeBase.md#datatype)

***

### enums

```ts
enums: (string | number | boolean | null)[];
```

定义如下: [packages/runtime/src/metadataGeneration/tsoa.ts:244](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/metadataGeneration/tsoa.ts#L244)
