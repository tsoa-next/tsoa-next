---
lastUpdated: 2026-04-20T21:59:41.307Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/cli](../index.md) / generateRoutes

# 函数: 生成Routes ()

```ts
function generateRoutes<Config>(
   routesConfig, 
   compilerOptions?, 
   ignorePaths?, 
   metadata?, 
defaultNumberType?): Promise<Metadata>;
```

定义如下: [cli/src/module/generate-routes.ts:13](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/module/generate-routes.ts#L13)

生成磁盘上的路由文件并返回用于构建它们的元数据.

## 类型参数

### Config

`Config` *增编* [`ExtendedRoutesConfig`](../interfaces/ExtendedRoutesConfig.md)

## 参数

### routesConfig

`Config`

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
