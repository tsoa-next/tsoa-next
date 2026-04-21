---
lastUpdated: 2026-04-20T21:59:41.309Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/runtime](../index.md) / Example

# 函数: 示例( )

```ts
function Example<T>(exampleModel, exampleLabel?): PropertyDecorator;
```

定义如下: [packages/runtime/src/decorators/example.ts:7](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/example.ts#L7)

将示例值附加到模型属性上。

## 类型参数

### T

`T`

## 参数

### exampleModel

`T`

在生成的 schema 元数据中包含的示例值 。

### exampleLabel?

`string`

多个实例出现时使用的可选标签 。

## 回返

`PropertyDecorator`
