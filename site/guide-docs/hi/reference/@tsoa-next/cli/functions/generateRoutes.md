---
lastUpdated: 2026-04-20T21:59:41.307Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/cli](../index.md) / generateRoutes

# समारोह: उत्पन्न रूट्स ()

```ts
function generateRoutes<Config>(
   routesConfig, 
   compilerOptions?, 
   ignorePaths?, 
   metadata?, 
defaultNumberType?): Promise<Metadata>;
```

में परिभाषित: [cli/src/module/generate-routes.ts:13](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/module/generate-routes.ts#L13)

डिस्क पर रूट फ़ाइलों को उत्पन्न करता है और उन्हें बनाने के लिए उपयोग किए जाने वाले मेटाडाटा को वापस करता है।

## प्रकार पैरामीटर

### Config

`Config` * [`ExtendedRoutesConfig`](../interfaces/ExtendedRoutesConfig.md)

## पैरामीटर

### routesConfig

`Config`

### compilerOptions?

`CompilerOptions`

### ignorePaths?

`string`[]

### metadata?

`Metadata`

कैश्ड मेटाडाटा में पास करने के लिए चीजों को गति देने के लिए पिछले कदम में लौटे

### defaultNumberType?

`"double"` \| `"float"` \| `"integer"` \| `"long"`

## रिटर्न

`Promise`\<`Metadata`\>
