---
lastUpdated: 2026-04-20T21:59:41.308Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/cli](../index.md) / RouteGeneratorModule

# प्रकार उपनाम: रूटजेनरेटर मॉड्यूल\<Config\>

```ts
type RouteGeneratorModule<Config> = object;
```

में परिभाषित: [cli/src/api.ts:545](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/api.ts#L545)

मॉड्यूल आकार की उम्मीद जब एक कस्टम रूट जनरेटर लोड हो रहा है `routes.routeGenerator`।

## प्रकार पैरामीटर

### Config

`Config` * [`ExtendedRoutesConfig`](../interfaces/ExtendedRoutesConfig.md)

## गुण

### default

```ts
default: (metadata, routesConfig) => object;
```

में परिभाषित: [cli/src/api.ts:546](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/api.ts#L546)

#### पैरामीटर

##### metadata

`Tsoa.Metadata`

##### routesConfig

`Config`

#### रिटर्न

`object`

##### GenerateCustomRoutes

```ts
GenerateCustomRoutes: () => Promise<void>;
```

###### रिटर्न

`Promise`\<`void`\>
