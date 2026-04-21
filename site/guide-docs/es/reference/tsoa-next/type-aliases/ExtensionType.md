---
lastUpdated: 2026-04-20T21:59:41.365Z
---
[tsoa-next](../../packages.md) / [tsoa-next](../index.md) / ExtensionType

# Tipo Alias: Extensión Tipo

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

Definido en: [packages/runtime/src/decorators/extension.ts:14](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/extension.ts#L14)

Tipos de valor apoyados por OpenAPI extensiones de especificación.
