---
lastUpdated: 2026-04-20T21:59:41.308Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/cli](../index.md) / RouteGeneratorModule

# Type Alias: RouteGeneratorModule\<Config\>

```ts
type RouteGeneratorModule<Config> = object;
```

Définie dans : [cli/src/api.ts:545](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/api.ts#L545)

Forme du module attendue lors du chargement d'un générateur de route personnalisé avec `routes.routeGenerator`.

## Paramètres de type

### Config

`Config` *Extends* [`ExtendedRoutesConfig`](../interfaces/ExtendedRoutesConfig.md)

## Propriétés

### default

```ts
default: (metadata, routesConfig) => object;
```

Définie dans : [cli/src/api.ts:546](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/api.ts#L546)

#### Paramètres

##### metadata

`Tsoa.Metadata`

##### routesConfig

`Config`

#### Retourne

`object`

##### GenerateCustomRoutes

```ts
GenerateCustomRoutes: () => Promise<void>;
```

###### Retourne

`Promise`\<`void`\>
