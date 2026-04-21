---
lastUpdated: 2026-04-20T21:59:41.369Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/cli](../index.md) / ExtendedRoutesConfig

# 接口: 扩展路由配置

定义如下: [cli/src/api.ts:416](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/api.ts#L416)

正常路由生成配置返回 [validateRoutesConfig](../functions/validateRoutesConfig.md)。 。 。 。

## 扩展

- `RoutesConfig`

## 属性

### authenticationModule?

```ts
optional authenticationModule?: string;
```

定义如下: [packages/runtime/src/config.ts:274](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L274)

生成路由所使用的认证模块路径 。

#### 继承自

```ts
RoutesConfig.authenticationModule
```

***

### basePath?

```ts
optional basePath?: string;
```

定义如下: [packages/runtime/src/config.ts:254](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L254)

基础 API 路径; 例如“ /v1” 在 https://myapi.com/v1

#### 继承自

```ts
RoutesConfig.basePath
```

***

### bodyCoercion

```ts
bodyCoercion: boolean;
```

定义如下: [cli/src/api.ts:419](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/api.ts#L419)

是否隐含地强制身体参数为被接受的类型.

#### Default

```ts
true
```

#### 覆盖

```ts
RoutesConfig.bodyCoercion
```

***

### controllerPathGlobs?

```ts
optional controllerPathGlobs?: string[];
```

定义如下: [cli/src/api.ts:420](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/api.ts#L420)

***

### entryFile

```ts
entryFile: string;
```

定义如下: [cli/src/api.ts:417](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/api.ts#L417)

***

### esm?

```ts
optional esm?: boolean;
```

定义如下: [packages/runtime/src/config.ts:281](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L281)

启用时, 生成的路由导入使用 `.js` 无害环境管理产出的扩展。

#### Default

```ts
false
```

#### 继承自

```ts
RoutesConfig.esm
```

***

### iocModule?

```ts
optional iocModule?: string;
```

定义如下: [packages/runtime/src/config.ts:269](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L269)

例如 IoC 模块路径 `./inversify/ioc`。 。 。 。

#### 继承自

```ts
RoutesConfig.iocModule
```

***

### middleware?

```ts
optional middleware?: "express" | "hapi" | "koa";
```

定义如下: [packages/runtime/src/config.ts:259](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L259)

中相软件提供商.

#### 继承自

```ts
RoutesConfig.middleware
```

***

### middlewareTemplate?

```ts
optional middlewareTemplate?: string;
```

定义如下: [packages/runtime/src/config.ts:264](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L264)

自定义 Handlebars 使用了模板路径,而不是内置的中间软件模板。

#### 继承自

```ts
RoutesConfig.middlewareTemplate
```

***

### multerOpts?

```ts
optional multerOpts?: Options;
```

定义如下: [cli/src/api.ts:421](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/api.ts#L421)

***

### noImplicitAdditionalProperties

```ts
noImplicitAdditionalProperties: "ignore" | "throw-on-extras" | "silently-remove-extras";
```

定义如下: [cli/src/api.ts:418](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/api.ts#L418)

***

### noWriteIfUnchanged?

```ts
optional noWriteIfUnchanged?: boolean;
```

定义如下: [packages/runtime/src/config.ts:249](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L249)

当生成的内容与已有文件相匹配时跳过写入路由文件 。

#### 继承自

```ts
RoutesConfig.noWriteIfUnchanged
```

***

### rewriteRelativeImportExtensions?

```ts
optional rewriteRelativeImportExtensions?: boolean;
```

定义如下: [packages/runtime/src/config.ts:295](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L295)

启用时, 生成的路由导入保留 `.ts` 扩展到支持 TypeScript 5.7 (中文(简体) ). `rewriteRelativeImportExtensions`。 。 。 。

#### Default

```ts
false
```

#### 继承自

```ts
RoutesConfig.rewriteRelativeImportExtensions
```

***

### rootSecurity?

```ts
optional rootSecurity?: Security[];
```

定义如下: [cli/src/api.ts:422](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/api.ts#L422)

***

### routeGenerator?

```ts
optional routeGenerator?: 
  | string
  | ((metadata, options) => AbstractRouteGenerator<ExtendedRoutesConfig>);
```

定义如下: [cli/src/api.ts:424](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/api.ts#L424)

***

### routesDir

```ts
routesDir: string;
```

定义如下: [packages/runtime/src/config.ts:239](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L239)

生成的路由文件被写入目录 。

#### 继承自

```ts
RoutesConfig.routesDir
```

***

### routesFileName?

```ts
optional routesFileName?: string;
```

定义如下: [packages/runtime/src/config.ts:244](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L244)

生成的路由模块的文件名 。

#### 继承自

```ts
RoutesConfig.routesFileName
```

***

### runtimeSpecConfig?

```ts
optional runtimeSpecConfig?: RuntimeSpecConfigSnapshot;
```

定义如下: [cli/src/api.ts:423](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/api.ts#L423)
