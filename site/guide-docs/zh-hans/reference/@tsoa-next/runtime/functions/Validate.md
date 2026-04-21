---
lastUpdated: 2026-04-20T21:59:41.311Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/runtime](../index.md) / Validate

# 函数: 验证 ()

```ts
function Validate(...args): ParameterDecorator;
```

定义如下: [packages/runtime/src/decorators/validate.ts:141](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/validate.ts#L141)

将外部-schema验证元数据附加到控制器参数上。

支持的表格为 `@Validate(schema)`, (中文(简体) ). `@Validate(kind, schema)`,以及 `@Validate({ kind, schema })`。 。 。 。

## 参数

### args

...`unknown`[]

## 回返

`ParameterDecorator`
