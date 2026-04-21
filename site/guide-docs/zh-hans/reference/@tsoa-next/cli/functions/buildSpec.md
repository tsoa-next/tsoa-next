---
lastUpdated: 2026-04-20T21:59:41.307Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/cli](../index.md) / buildSpec

# 函数: 构建Spec ()

```ts
function buildSpec(
   swaggerConfig, 
   compilerOptions?, 
   ignorePaths?, 
   metadata?, 
   defaultNumberType?): Spec;
```

定义如下: [cli/src/module/generate-spec.ts:47](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/module/generate-spec.ts#L47)

构建一个 OpenAPI 以内存记录,而不将其写入磁盘。

## 参数

### swaggerConfig

[`ExtendedSpecConfig`](../interfaces/ExtendedSpecConfig.md)

### compilerOptions?

`CompilerOptions`

### ignorePaths?

`string`[]

### metadata?

`Metadata`

### defaultNumberType?

`"double"` \| `"float"` \| `"integer"` \| `"long"`

## 回返

`Spec`
