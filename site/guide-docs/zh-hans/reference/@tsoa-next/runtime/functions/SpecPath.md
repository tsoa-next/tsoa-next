---
lastUpdated: 2026-04-20T21:59:41.311Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/runtime](../index.md) / SpecPath

# 函数: SpecPath ()

```ts
function SpecPath(
   path?, 
   optionsOrTarget?, 
   cache?): ClassDecorator;
```

定义如下: [packages/runtime/src/decorators/specPath.ts:157](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/specPath.ts#L157)

注册为生成的控件本地路由 OpenAPI 文档或自定义生成的响应。

## 参数

### path?

`string` = `'spec'`

相对道道. 默认为 `spec`。 。 。 。

### optionsOrTarget?

  \| [`SpecPathTarget`](../type-aliases/SpecPathTarget.md)
  \| [`SpecPathOptions`](../interfaces/SpecPathOptions.md)

无论是a `SpecPathOptions` 对象或遗留目标参数。

### cache?

[`SpecPathCache`](../type-aliases/SpecPathCache.md) = `'memory'`

遗产缓存策略论证. 默认为内存缓存 。

## 回返

`ClassDecorator`
