---
lastUpdated: 2026-04-20T21:59:41.340Z
---
[tsoa-next](../../packages.md) / [tsoa-next](../index.md) / Produces

# 函数: 生产( )

```ts
function Produces(value): MethodDecorator & ClassDecorator;
```

定义如下: [packages/runtime/src/decorators/response.ts:48](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/response.ts#L48)

覆盖控制器或单个动作上的响应介质类型。

## 参数

### value

`string`

例如反应媒体类型 `application/json`。 。 。 。
见 [Swagger media-type documentation](https://swagger.io/docs/specification/media-types/)。 。 。 。

## 回返

`MethodDecorator` & `ClassDecorator`
