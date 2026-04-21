---
lastUpdated: 2026-04-20T21:59:41.369Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/cli](../index.md) / ExtendedRoutesConfig

# Интерфейс: ExtendedRoutesConfig

Определено в: [cli/src/api.ts:416](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/api.ts#L416)

Нормализованная конфигурация генерации маршрутов, возвращаемая [validateRoutesConfig](../functions/validateRoutesConfig.md).

## расширять

- `RoutesConfig`

## Свойства

### authenticationModule?

```ts
optional authenticationModule?: string;
```

Определено в: [packages/runtime/src/config.ts:274](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L274)

Путь модуля аутентификации, используемый генерируемыми маршрутами.

#### Унаследованный от

```ts
RoutesConfig.authenticationModule
```

***

### basePath?

```ts
optional basePath?: string;
```

Определено в: [packages/runtime/src/config.ts:254](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L254)

Базовый путь API; например, '/v1' в https://myapi.com/v1

#### Унаследованный от

```ts
RoutesConfig.basePath
```

***

### bodyCoercion

```ts
bodyCoercion: boolean;
```

Определено в: [cli/src/api.ts:419](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/api.ts#L419)

Неявно принуждать параметры тела к принятому типу.

#### Default

```ts
true
```

#### переопределение

```ts
RoutesConfig.bodyCoercion
```

***

### controllerPathGlobs?

```ts
optional controllerPathGlobs?: string[];
```

Определено в: [cli/src/api.ts:420](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/api.ts#L420)

***

### entryFile

```ts
entryFile: string;
```

Определено в: [cli/src/api.ts:417](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/api.ts#L417)

***

### esm?

```ts
optional esm?: boolean;
```

Определено в: [packages/runtime/src/config.ts:281](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L281)

Когда включено, генерируемый маршрут импорта `.js` Расширения для выхода ESM.

#### Default

```ts
false
```

#### Унаследованный от

```ts
RoutesConfig.esm
```

***

### iocModule?

```ts
optional iocModule?: string;
```

Определено в: [packages/runtime/src/config.ts:269](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L269)

Путь модуля IoC, например `./inversify/ioc`.

#### Унаследованный от

```ts
RoutesConfig.iocModule
```

***

### middleware?

```ts
optional middleware?: "express" | "hapi" | "koa";
```

Определено в: [packages/runtime/src/config.ts:259](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L259)

Поставщик промежуточного ПО.

#### Унаследованный от

```ts
RoutesConfig.middleware
```

***

### middlewareTemplate?

```ts
optional middlewareTemplate?: string;
```

Определено в: [packages/runtime/src/config.ts:264](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L264)

обычай Handlebars Шаблон пути используется вместо встроенного промежуточного шаблона.

#### Унаследованный от

```ts
RoutesConfig.middlewareTemplate
```

***

### multerOpts?

```ts
optional multerOpts?: Options;
```

Определено в: [cli/src/api.ts:421](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/api.ts#L421)

***

### noImplicitAdditionalProperties

```ts
noImplicitAdditionalProperties: "ignore" | "throw-on-extras" | "silently-remove-extras";
```

Определено в: [cli/src/api.ts:418](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/api.ts#L418)

***

### noWriteIfUnchanged?

```ts
optional noWriteIfUnchanged?: boolean;
```

Определено в: [packages/runtime/src/config.ts:249](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L249)

Пропускает запись файла маршрута, когда сгенерированный контент соответствует существующему файлу.

#### Унаследованный от

```ts
RoutesConfig.noWriteIfUnchanged
```

***

### rewriteRelativeImportExtensions?

```ts
optional rewriteRelativeImportExtensions?: boolean;
```

Определено в: [packages/runtime/src/config.ts:295](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L295)

При включении генерируемый импорт маршрута сохраняется `.ts` Расширения для поддержки TypeScript 5.7.7 `rewriteRelativeImportExtensions`.

#### Default

```ts
false
```

#### Унаследованный от

```ts
RoutesConfig.rewriteRelativeImportExtensions
```

***

### rootSecurity?

```ts
optional rootSecurity?: Security[];
```

Определено в: [cli/src/api.ts:422](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/api.ts#L422)

***

### routeGenerator?

```ts
optional routeGenerator?: 
  | string
  | ((metadata, options) => AbstractRouteGenerator<ExtendedRoutesConfig>);
```

Определено в: [cli/src/api.ts:424](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/api.ts#L424)

***

### routesDir

```ts
routesDir: string;
```

Определено в: [packages/runtime/src/config.ts:239](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L239)

Каталог, в котором записываются сгенерированные маршрутные файлы.

#### Унаследованный от

```ts
RoutesConfig.routesDir
```

***

### routesFileName?

```ts
optional routesFileName?: string;
```

Определено в: [packages/runtime/src/config.ts:244](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L244)

Имя файла для генерируемого модуля маршрута.

#### Унаследованный от

```ts
RoutesConfig.routesFileName
```

***

### runtimeSpecConfig?

```ts
optional runtimeSpecConfig?: RuntimeSpecConfigSnapshot;
```

Определено в: [cli/src/api.ts:423](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/api.ts#L423)
