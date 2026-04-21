---
lastUpdated: 2026-04-20T21:59:41.311Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/runtime](../index.md) / ValidateParam

# 函数: 验证Param ()

## 调用签名

```ts
function ValidateParam<TValue>(options): TValue;
```

定义如下: [packages/runtime/src/routeGeneration/templateHelpers.ts:90](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templateHelpers.ts#L90)

对照生成的运行时间值验证 tsoa 路由计划元数据。

### 类型参数

#### TValue

`TValue`

### 参数

#### options

`ValidateParamOptions`\<`TValue`\>

### 回返

`TValue`

## 调用签名

```ts
function ValidateParam<TValue>(...args): TValue;
```

定义如下: [packages/runtime/src/routeGeneration/templateHelpers.ts:94](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/templateHelpers.ts#L94)

### 类型参数

#### TValue

`TValue`

### 参数

#### args

...`ValidateParamTupleArgs`\<`TValue`\>

### 回返

`TValue`

### Deprecated

取而代之使用对象超载.
