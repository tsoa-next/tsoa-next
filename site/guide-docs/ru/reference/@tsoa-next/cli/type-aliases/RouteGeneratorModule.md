---
lastUpdated: 2026-04-20T21:59:41.308Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/cli](../index.md) / RouteGeneratorModule

# Тип Alias: модуль RouteGenerator\<Config\>

```ts
type RouteGeneratorModule<Config> = object;
```

Определено в: [cli/src/api.ts:545](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/api.ts#L545)

Форма модуля, ожидаемая при загрузке генератора маршрута `routes.routeGenerator`.

## Параметры типа

### Config

`Config` *расширяется* [`ExtendedRoutesConfig`](../interfaces/ExtendedRoutesConfig.md)

## Свойства

### default

```ts
default: (metadata, routesConfig) => object;
```

Определено в: [cli/src/api.ts:546](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/api.ts#L546)

#### Параметры

##### metadata

`Tsoa.Metadata`

##### routesConfig

`Config`

#### Возвращение

`object`

##### GenerateCustomRoutes

```ts
GenerateCustomRoutes: () => Promise<void>;
```

###### Возвращение

`Promise`\<`void`\>
