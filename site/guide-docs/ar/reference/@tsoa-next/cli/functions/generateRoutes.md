---
lastUpdated: 2026-04-20T21:59:41.307Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/cli](../index.md) / generateRoutes

# المهمة: توليد الروتينات

```ts
function generateRoutes<Config>(
   routesConfig, 
   compilerOptions?, 
   ignorePaths?, 
   metadata?, 
defaultNumberType?): Promise<Metadata>;
```

محددة في: [cli/src/module/generate-routes.ts:13](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/module/generate-routes.ts#L13)

الجينات ترسل ملفات على القرص وتعيد البيانات الوصفية المستخدمة لبناءها

## البارامترات النوعية

### Config

`Config` * النفقات* [`ExtendedRoutesConfig`](../interfaces/ExtendedRoutesConfig.md)

## البارامترات

### routesConfig

`Config`

### compilerOptions?

`CompilerOptions`

### ignorePaths?

`string`[]

### metadata?

`Metadata`

تمرير في البيانات الفوقية المتحركة عادت في خطوة سابقة لتسريع الأمور

### defaultNumberType?

`"double"` \| `"float"` \| `"integer"` \| `"long"`

## العودة

`Promise`\<`Metadata`\>
