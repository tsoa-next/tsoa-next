---
lastUpdated: 2026-04-20T21:59:41.366Z
---
[tsoa-next](../../packages.md) / [tsoa-next](../index.md) / RuntimeSchemaAdapterResult

# 别名类型: 运行时SchemaAdapter结果\<T\>

```ts
type RuntimeSchemaAdapterResult<T> = 
  | {
  ok: true;
  value: T;
}
  | {
  failure: ValidationFailure;
  ok: false;
};
```

定义如下: [packages/runtime/src/routeGeneration/externalValidation.ts:4](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/externalValidation.ts#L4)

结果由运行时间适配器返回到外部验证库.

## 类型参数

### T

`T` = `unknown`
