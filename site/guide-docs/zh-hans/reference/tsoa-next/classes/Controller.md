---
lastUpdated: 2026-04-20T21:59:41.337Z
---
[tsoa-next](../../packages.md) / [tsoa-next](../index.md) / Controller

# 类: 控制器

定义如下: [packages/runtime/src/interfaces/controller.ts:9](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/controller.ts#L9)

允许动作凌驾于最终状态代码和标题的 Base Control 类 。

## 构造器

### 构造器

```ts
new Controller(): Controller;
```

#### 回返

`Controller`

## 方法

### getHeader()

```ts
getHeader(name): string | string[] | undefined;
```

定义如下: [packages/runtime/src/interfaces/controller.ts:32](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/controller.ts#L32)

返回先前指定的响应头值。

#### 参数

##### name

`string`

#### 回返

`string` \| `string`[] \| `undefined`

***

### getHeaders()

```ts
getHeaders(): object;
```

定义如下: [packages/runtime/src/interfaces/controller.ts:37](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/controller.ts#L37)

返回控制器实例上指定的所有响应头 。

#### 回返

`object`

***

### getStatus()

```ts
getStatus(): number | undefined;
```

定义如下: [packages/runtime/src/interfaces/controller.ts:19](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/controller.ts#L19)

返回 HTTP 状态代码 [setStatus](#setstatus)如果有的话。

#### 回返

`number` \| `undefined`

***

### setHeader()

#### 调用签名

```ts
setHeader<H>(name, value?): void;
```

定义如下: [packages/runtime/src/interfaces/controller.ts:23](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/controller.ts#L23)

##### 类型参数

###### H

`H` * 扩展 * 键 `OutgoingHttpHeaders`

##### 参数

###### name

`H`

###### value?

`HeaderValue`\<`H`\>

##### 回返

`void`

#### 调用签名

```ts
setHeader(name, value?): void;
```

定义如下: [packages/runtime/src/interfaces/controller.ts:24](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/controller.ts#L24)

##### 参数

###### name

`string`

###### value?

`string` \| `string`[]

##### 回返

`void`

***

### setStatus()

```ts
setStatus(statusCode): void;
```

定义如下: [packages/runtime/src/interfaces/controller.ts:14](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/controller.ts#L14)

设定生成的路由处理器应返回的 HTTP 状态代码 。

#### 参数

##### statusCode

`number`

#### 回返

`void`
