---
lastUpdated: 2026-04-20T21:59:41.311Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/runtime](../index.md) / Security

# 职能:安保()

```ts
function Security(name, scopes?): ClassDecorator & MethodDecorator;
```

定义如下: [packages/runtime/src/decorators/security.ts:16](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/security.ts#L16)

宣布控制器或动作的安全要求。

## 参数

### name

  \| `string`
  \| \{
\[`name`: `string`\]: `string`[];
\}

安全方案名称,或一个完整的安全要求对象。

### scopes?

`string`[]

方案所要求的授权范围 `name` 是一个字符串。

## 回返

`ClassDecorator` & `MethodDecorator`
