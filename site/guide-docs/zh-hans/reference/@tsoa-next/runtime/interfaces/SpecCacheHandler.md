---
lastUpdated: 2026-04-20T21:59:41.313Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/runtime](../index.md) / SpecCacheHandler

# 接口: SpecCacheHandler

定义如下: [packages/runtime/src/decorators/specPath.ts:54](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/specPath.ts#L54)

使用的缓存适配器 [SpecPath](../functions/SpecPath.md) 以记忆生成的响应。

## 方法

### get()

```ts
get(context): 
  | SpecResponseValue
  | Promise<SpecResponseValue | undefined>
  | undefined;
```

定义如下: [packages/runtime/src/decorators/specPath.ts:55](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/specPath.ts#L55)

#### 参数

##### context

[`SpecCacheContext`](SpecCacheContext.md)

#### 回返

  \| [`SpecResponseValue`](../type-aliases/SpecResponseValue.md)
  \| `Promise`\<SpecResponseValue \| undefined\>
  \| `undefined`

***

### set()

```ts
set(context, value): void | Promise<void>;
```

定义如下: [packages/runtime/src/decorators/specPath.ts:56](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/specPath.ts#L56)

#### 参数

##### context

[`SpecCacheContext`](SpecCacheContext.md)

##### value

`string`

#### 回返

`void` \| `Promise`\<`void`\>
