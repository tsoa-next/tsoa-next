---
lastUpdated: 2026-04-20T21:59:41.308Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/cli](../index.md) / RouteGeneratorModule

# Tipo Alias: RouteGeneratorModule\<Config\>

```ts
type RouteGeneratorModule<Config> = object;
```

Definido em: [cli/src/api.ts:545](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/api.ts#L545)

Forma do módulo esperada ao carregar um gerador de rota personalizado com `routes.routeGenerator`.

## Parâmetros do tipo

### Config

`Config` *extensões* [`ExtendedRoutesConfig`](../interfaces/ExtendedRoutesConfig.md)

## Propriedades

### default

```ts
default: (metadata, routesConfig) => object;
```

Definido em: [cli/src/api.ts:546](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/api.ts#L546)

#### Parâmetros

##### metadata

`Tsoa.Metadata`

##### routesConfig

`Config`

#### Retorna

`object`

##### GenerateCustomRoutes

```ts
GenerateCustomRoutes: () => Promise<void>;
```

###### Retorna

`Promise`\<`void`\>
