---
lastUpdated: 2026-04-20T21:59:41.366Z
---
[tsoa-next](../../packages.md) / [tsoa-next](../index.md) / Newable

# 类型别名: 可更新\<T, TArgs\>

```ts
type Newable<T, TArgs> = (...args) => T;
```

定义如下: [packages/runtime/src/interfaces/iocModule.ts:2](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/iocModule.ts#L2)

用于IoC容器检查的构造器类型 。

## 类型参数

### T

`T` = `unknown`

### TArgs

`TArgs` *增编* `unknown`[]= `unknown`[

## 参数

### args

...`TArgs`

## 回返

`T`
