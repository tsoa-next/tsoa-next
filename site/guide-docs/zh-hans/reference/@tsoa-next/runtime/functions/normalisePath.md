---
lastUpdated: 2026-04-20T21:59:41.312Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/runtime](../index.md) / normalisePath

# 函数: 正态Path ()

```ts
function normalisePath(
   path, 
   withPrefix?, 
   withSuffix?, 
   skipPrefixAndSuffixIfEmpty?): string;
```

定义如下: [packages/runtime/src/utils/pathUtils.ts:43](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/utils/pathUtils.ts#L43)

将路由路径中的斜线用法规范化,并可选择应用前缀和后缀.

## 参数

### path

`string`

### withPrefix?

`string`

### withSuffix?

`string`

### skipPrefixAndSuffixIfEmpty?

`boolean` = `true`

## 回返

`string`
