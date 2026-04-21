---
lastUpdated: 2026-04-20T21:59:41.327Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/runtime](../index.md) / ExtensionType

# 类型别名: 扩展 类型

```ts
type ExtensionType = 
  | string
  | number
  | boolean
  | null
  | ExtensionType[]
  | {
[name: string]: ExtensionType | ExtensionType[];
};
```

定义如下: [packages/runtime/src/decorators/extension.ts:14](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/extension.ts#L14)

支持的数值类型 OpenAPI 规格扩展。
