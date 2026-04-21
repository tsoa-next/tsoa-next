---
lastUpdated: 2026-04-20T21:59:41.326Z
---
[tsoa-next](../../../../../packages.md) / [@tsoa-next/runtime](../../../index.md) / [TsoaRoute](../index.md) / RefObjectModels

# 界面: 参考对象模型

定义如下: [packages/runtime/src/routeGeneration/tsoa-route.ts:26](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/tsoa-route.ts#L26)

这是一个方便类型, 这样您就可以检查记录中的项目的. 属性而不包含 TypeScript 丢弃编译器出错。 这是因为这个记录不能有 enums在里面。 如果你想要,那就使用基础接口

## 扩展

- [`Models`](Models.md)

## Indexable

```ts
[refNames: string]: RefObjectModelSchema
```
