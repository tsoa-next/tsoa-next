---
lastUpdated: 2026-04-20T21:59:41.327Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/runtime](../index.md) / ExtensionType

# Type Alias: Extension Type

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

Définie dans : [packages/runtime/src/decorators/extension.ts:14](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/extension.ts#L14)

Types de valeur pris en charge par OpenAPI les extensions de spécifications.
