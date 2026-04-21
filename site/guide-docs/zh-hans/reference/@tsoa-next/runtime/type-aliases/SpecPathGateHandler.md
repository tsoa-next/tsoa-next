---
lastUpdated: 2026-04-20T21:59:41.328Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/runtime](../index.md) / SpecPathGateHandler

# 类型别名: SpecPathGateHandler

```ts
type SpecPathGateHandler = (context) => boolean | Promise<boolean>;
```

定义如下: [packages/runtime/src/decorators/specPath.ts:51](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/specPath.ts#L51)

使用的门处理器 [SpecPath](../functions/SpecPath.md) 以决定一项请求是否可以收到具体答复。

## 参数

### context

[`SpecRequestContext`](../interfaces/SpecRequestContext.md)

## 回返

`boolean` \| `Promise`\<`boolean`\>
