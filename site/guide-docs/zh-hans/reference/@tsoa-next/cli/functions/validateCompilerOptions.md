---
lastUpdated: 2026-04-20T21:59:41.307Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/cli](../index.md) / validateCompilerOptions

# 函数: 校验编译器选项( )

决定编译器选项 tsoa 从完整配置对象或原始对象生成 `compilerOptions` 地图。

## 调用签名

```ts
function validateCompilerOptions(config, configBaseDir?): CompilerOptions;
```

定义如下: [cli/src/api.ts:364](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/api.ts#L364)

### 参数

#### config

[`Config`](../interfaces/Config.md)

#### configBaseDir?

`string`

### 回返

`CompilerOptions`

## 调用签名

```ts
function validateCompilerOptions(compilerOptions?, configBaseDir?): CompilerOptions;
```

定义如下: [cli/src/api.ts:365](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/api.ts#L365)

### 参数

#### compilerOptions?

`Record`\<`string`, `unknown`\>

#### configBaseDir?

`string`

### 回返

`CompilerOptions`
