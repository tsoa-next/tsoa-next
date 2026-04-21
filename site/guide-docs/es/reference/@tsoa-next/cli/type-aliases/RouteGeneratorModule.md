---
lastUpdated: 2026-04-20T21:59:41.308Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/cli](../index.md) / RouteGeneratorModule

# Tipo Alias: RouteGeneratorModule\<Config\>

```ts
type RouteGeneratorModule<Config> = object;
```

Definido en: [cli/src/api.ts:545](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/api.ts#L545)

Forma del módulo esperada al cargar un generador de ruta personalizada con `routes.routeGenerator`.

## Parámetros tipo

### Config

`Config` *Existe* [`ExtendedRoutesConfig`](../interfaces/ExtendedRoutesConfig.md)

## Propiedades

### default

```ts
default: (metadata, routesConfig) => object;
```

Definido en: [cli/src/api.ts:546](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/api.ts#L546)

#### Parámetros

##### metadata

`Tsoa.Metadata`

##### routesConfig

`Config`

#### Devoluciones

`object`

##### GenerateCustomRoutes

```ts
GenerateCustomRoutes: () => Promise<void>;
```

###### Devoluciones

`Promise`\<`void`\>
