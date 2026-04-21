---
lastUpdated: 2026-04-20T21:59:41.367Z
---
[tsoa-next](../../packages.md) / [tsoa-next](../index.md) / SpecResponseHandler

# 类型别名: SpecResponse Handler

```ts
type SpecResponseHandler = (context) => 
  | SpecResponseValue
| Promise<SpecResponseValue>;
```

定义如下: [packages/runtime/src/decorators/specPath.ts:49](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/specPath.ts#L49)

自定义处理器 [SpecPath](../functions/SpecPath.md) 以服务光谱内容。

## 参数

### context

[`SpecRequestContext`](../interfaces/SpecRequestContext.md)

## 回返

  \| [`SpecResponseValue`](SpecResponseValue.md)
  \| `Promise`\<[`SpecResponseValue`](SpecResponseValue.md)\>
