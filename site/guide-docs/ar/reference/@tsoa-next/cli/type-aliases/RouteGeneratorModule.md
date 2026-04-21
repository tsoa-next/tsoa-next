---
lastUpdated: 2026-04-20T21:59:41.308Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/cli](../index.md) / RouteGeneratorModule

# نوع &quot; ألياس &quot; :\<Config\>

```ts
type RouteGeneratorModule<Config> = object;
```

محددة في: [cli/src/api.ts:545](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/api.ts#L545)

الشكل المتوقع عند تحميل المولد العادى `routes.routeGenerator`.

## البارامترات النوعية

### Config

`Config` * النفقات* [`ExtendedRoutesConfig`](../interfaces/ExtendedRoutesConfig.md)

## الممتلكات

### default

```ts
default: (metadata, routesConfig) => object;
```

محددة في: [cli/src/api.ts:546](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/api.ts#L546)

#### البارامترات

##### metadata

`Tsoa.Metadata`

##### routesConfig

`Config`

#### العودة

`object`

##### GenerateCustomRoutes

```ts
GenerateCustomRoutes: () => Promise<void>;
```

###### العودة

`Promise`\<`void`\>
