---
lastUpdated: 2026-04-20T21:59:41.309Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/runtime](../index.md) / Extension

# 函数: 扩展()

```ts
function Extension(name, value): PropertyDecorator;
```

定义如下: [packages/runtime/src/decorators/extension.ts:7](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/extension.ts#L7)

添加一个 OpenAPI 规格扩展到模型属性。

## 参数

### name

`string`

扩展密钥, 通常从 `x-`。 。 。 。

### value

  \| [`ExtensionType`](../type-aliases/ExtensionType.md)
  \| [`ExtensionType`](../type-aliases/ExtensionType.md)[]

扩展值 。

## 回返

`PropertyDecorator`
