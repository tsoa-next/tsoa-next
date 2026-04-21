---
lastUpdated: 2026-04-20T21:59:41.340Z
---
[tsoa-next](../../packages.md) / [tsoa-next](../index.md) / Res

# 函数: Res ()

```ts
function Res(): ParameterDecorator;
```

定义如下: [packages/runtime/src/decorators/response.ts:38](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/response.ts#L38)

插入库-不可知响应器功能,可用于构造类型检查(通常是出错-)响应.

注释参数为 `TsoaResponse<Status, Data, Headers>` 这么说 tsoa 可以推断成文的答复。

## 回返

`ParameterDecorator`
