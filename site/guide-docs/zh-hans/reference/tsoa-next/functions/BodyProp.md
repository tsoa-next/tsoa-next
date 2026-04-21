---
lastUpdated: 2026-04-20T21:59:41.338Z
---
[tsoa-next](../../packages.md) / [tsoa-next](../index.md) / BodyProp

# 函数: bodyProp ()

```ts
function BodyProp(name?): ParameterDecorator;
```

定义如下: [packages/runtime/src/decorators/parameter.ts:15](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/parameter.ts#L15)

将请求体中的单个属性绑入控制器参数。

## 参数

### name?

`string`

从请求体读取的财产名. 默认参数名称。

## 回返

`ParameterDecorator`
