---
lastUpdated: 2026-04-20T21:59:41.344Z
---
[tsoa-next](../../packages.md) / [tsoa-next](../index.md) / IocContainer

# 接口:摄入器

定义如下: [packages/runtime/src/interfaces/iocModule.ts:8](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/iocModule.ts#L8)

用于解决控制器实例的最小运行时间容器合同 。

## 方法

### get()

#### 调用签名

```ts
get<T>(controller): T;
```

定义如下: [packages/runtime/src/interfaces/iocModule.ts:9](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/iocModule.ts#L9)

##### 类型参数

###### T

`T`

##### 参数

###### controller

[`ServiceIdentifier`](../type-aliases/ServiceIdentifier.md)\<`T`\>

##### 回返

`T`

#### 调用签名

```ts
get<T>(controller): Promise<T>;
```

定义如下: [packages/runtime/src/interfaces/iocModule.ts:10](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/iocModule.ts#L10)

##### 类型参数

###### T

`T`

##### 参数

###### controller

[`ServiceIdentifier`](../type-aliases/ServiceIdentifier.md)\<`T`\>

##### 回返

`Promise`\<`T`\>
