---
lastUpdated: 2026-04-20T21:59:41.307Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/cli](../index.md) / generateSpec

# 函数: 生成Spec ()

```ts
function generateSpec(
   swaggerConfig, 
   compilerOptions?, 
   ignorePaths?, 
   metadata?, 
defaultNumberType?): Promise<Metadata>;
```

定义如下: [cli/src/module/generate-spec.ts:22](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/module/generate-spec.ts#L22)

生成一个 OpenAPI 文档并返回用于构建的元数据。

## 参数

### swaggerConfig

[`ExtendedSpecConfig`](../interfaces/ExtendedSpecConfig.md)

### compilerOptions?

`CompilerOptions`

### ignorePaths?

`string`[]

### metadata?

`Metadata`

在前一个步骤中返回缓存元数据以加快进度

### defaultNumberType?

`"double"` \| `"float"` \| `"integer"` \| `"long"`

## 回返

`Promise`\<`Metadata`\>
