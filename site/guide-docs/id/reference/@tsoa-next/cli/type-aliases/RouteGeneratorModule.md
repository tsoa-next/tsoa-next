---
lastUpdated: 2026-04-20T21:59:41.308Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/cli](../index.md) / RouteGeneratorModule

# Tipe Alias: RouteGeneratorModule\<Config\>

```ts
type RouteGeneratorModule<Config> = object;
```

Didefinisikan dalam: [cli/src/api.ts:545](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/api.ts#L545)

Bentuk modul diduga ketika memuat suatu generator rute gubahan dengan `routes.routeGenerator`.

## Parameter Tipe

### Config

`Config` ♪ extend ♪ [`ExtendedRoutesConfig`](../interfaces/ExtendedRoutesConfig.md)

## Properti

### default

```ts
default: (metadata, routesConfig) => object;
```

Didefinisikan dalam: [cli/src/api.ts:546](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/api.ts#L546)

#### Parameter

##### metadata

`Tsoa.Metadata`

##### routesConfig

`Config`

#### Kembali

`object`

##### GenerateCustomRoutes

```ts
GenerateCustomRoutes: () => Promise<void>;
```

###### Kembali

`Promise`\<`void`\>
