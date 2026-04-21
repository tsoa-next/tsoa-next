---
lastUpdated: 2026-04-20T21:59:41.308Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/cli](../index.md) / RouteGeneratorModule

# 类型别名: RouteGenerator 模块\<Config\>

```ts
type RouteGeneratorModule<Config> = object;
```

定义如下: [cli/src/api.ts:545](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/api.ts#L545)

装入自定义路由生成器时需要模块形状 `routes.routeGenerator`。 。 。 。

## 类型参数

### Config

`Config` *增编* [`ExtendedRoutesConfig`](../interfaces/ExtendedRoutesConfig.md)

## 属性

### default

```ts
default: (metadata, routesConfig) => object;
```

定义如下: [cli/src/api.ts:546](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/api.ts#L546)

#### 参数

##### metadata

`Tsoa.Metadata`

##### routesConfig

`Config`

#### 回返

`object`

##### GenerateCustomRoutes

```ts
GenerateCustomRoutes: () => Promise<void>;
```

###### 回返

`Promise`\<`void`\>
