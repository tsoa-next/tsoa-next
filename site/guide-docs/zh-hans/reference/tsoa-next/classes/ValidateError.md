---
lastUpdated: 2026-04-20T21:59:41.337Z
---
[tsoa-next](../../packages.md) / [tsoa-next](../index.md) / ValidateError

# 类: 校验错误

定义如下: [packages/runtime/src/routeGeneration/templateHelpers.ts:1369](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templateHelpers.ts#L1369)

当请求验证失败时发生错误 。

## 扩展

- `Error`

## Implements

- [`Exception`](../interfaces/Exception.md)

## 构造器

### 构造器

```ts
new ValidateError(fields, message): ValidateError;
```

定义如下: [packages/runtime/src/routeGeneration/templateHelpers.ts:1373](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templateHelpers.ts#L1373)

#### 参数

##### fields

[`FieldErrors`](../interfaces/FieldErrors.md)

##### message

`string`

#### 回返

`ValidateError`

#### 覆盖

```ts
Error.constructor
```

## 属性

### cause?

```ts
optional cause?: unknown;
```

定义于:节点/类型标注/lib/lib.es2022.error.d.ts:26

#### 执行

[`Exception`](../interfaces/Exception.md).[`cause`](../interfaces/Exception.md#cause)

#### 继承自

```ts
Error.cause
```

***

### fields

```ts
fields: FieldErrors;
```

定义如下: [packages/runtime/src/routeGeneration/templateHelpers.ts:1374](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templateHelpers.ts#L1374)

***

### message

```ts
message: string;
```

定义如下: [packages/runtime/src/routeGeneration/templateHelpers.ts:1375](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templateHelpers.ts#L1375)

#### 执行

[`Exception`](../interfaces/Exception.md).[`message`](../interfaces/Exception.md#message)

#### 覆盖

```ts
Error.message
```

***

### name

```ts
name: string;
```

定义如下: [packages/runtime/src/routeGeneration/templateHelpers.ts:1371](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templateHelpers.ts#L1371)

#### 执行

[`Exception`](../interfaces/Exception.md).[`name`](../interfaces/Exception.md#name)

#### 覆盖

```ts
Error.name
```

***

### stack?

```ts
optional stack?: string;
```

定义如下:节点/分型/lib/lib.es5.d.ts:1078

#### 执行

[`Exception`](../interfaces/Exception.md).[`stack`](../interfaces/Exception.md#stack)

#### 继承自

```ts
Error.stack
```

***

### status

```ts
status: number;
```

定义如下: [packages/runtime/src/routeGeneration/templateHelpers.ts:1370](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templateHelpers.ts#L1370)

#### 执行

[`Exception`](../interfaces/Exception.md).[`status`](../interfaces/Exception.md#status)

***

### stackTraceLimit

```ts
static stackTraceLimit: number;
```

定义在: 节点-模块/@类型/节点/globals.d.ts:68

这个 `Error.stackTraceLimit` 属性指定堆栈框架的数目
通过堆栈跟踪( 是否由 `new Error().stack` 或者说
`Error.captureStackTrace(obj)`).

默认值为 `10` 但可能设置为任何有效的JavaScript编号。 变动
将影响所捕获的堆栈跟踪 _after _该值已更改。

如果设置为非数字值, 或设置为负数, 堆栈跟踪会
不抓取任何帧 。

#### 继承自

```ts
Error.stackTraceLimit
```

## 方法

### captureStackTrace()

```ts
static captureStackTrace(targetObject, constructorOpt?): void;
```

定义如下: 节点/模块/@类型/节点/globals.d.ts:52

创建一个 `.stack` 属性在 `targetObject`,当访问时返回
表示代码中位置的字符串
`Error.captureStackTrace()` 被调用。

```js
const myObject = {};
Error.captureStackTrace(myObject);
myObject.stack;  // Similar to `new Error().stack`
```

追踪的第一行将使用
`${myObject.name}: ${myObject.message}`.

可选 `constructorOpt` 参数接受一个函数。 如果给出, 所有框架
上文 `constructorOpt`,包括: `constructorOpt`中,将省略
生成了堆栈跟踪 。

这个 `constructorOpt` 参数对隐藏执行有用
用户错误生成的细节。 例如:

```js
function a() {
  b();
}

function b() {
  c();
}

function c() {
  // Create an error without stack trace to avoid calculating the stack trace twice.
  const { stackTraceLimit } = Error;
  Error.stackTraceLimit = 0;
  const error = new Error();
  Error.stackTraceLimit = stackTraceLimit;

  // Capture the stack trace above function b
  Error.captureStackTrace(error, b); // Neither function c, nor b is included in the stack trace
  throw error;
}

a();
```

#### 参数

##### targetObject

`object`

##### constructorOpt?

`Function`

#### 回返

`void`

#### 继承自

```ts
Error.captureStackTrace
```

***

### isError()

```ts
static isError(error): error is Error;
```

定义为:节点/类型标注/lib/lib.esnext.error.d.ts:23

指出所提供的参数是否为内置错误实例 。

#### 参数

##### error

`unknown`

#### 回返

`error is Error`

#### 继承自

```ts
Error.isError
```

***

### prepareStackTrace()

```ts
static prepareStackTrace(err, stackTraces): any;
```

定义如下: 节点/模块/@类型/节点/全球.d.ts:56

#### 参数

##### err

`Error`

##### stackTraces

`CallSite`[]

#### 回返

`any`

#### See

https://v8.dev/docs/stack-trace-api#customizing-stack-traces

#### 继承自

```ts
Error.prepareStackTrace
```
