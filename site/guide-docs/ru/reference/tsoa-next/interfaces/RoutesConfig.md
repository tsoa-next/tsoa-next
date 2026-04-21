---
lastUpdated: 2026-04-20T21:59:41.344Z
---
[tsoa-next](../../packages.md) / [tsoa-next](../index.md) / RoutesConfig

# Интерфейс: RoutesConfig

Определено в: [packages/runtime/src/config.ts:235](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L235)

## Свойства

### authenticationModule?

```ts
optional authenticationModule?: string;
```

Определено в: [packages/runtime/src/config.ts:274](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L274)

Путь модуля аутентификации, используемый генерируемыми маршрутами.

***

### basePath?

```ts
optional basePath?: string;
```

Определено в: [packages/runtime/src/config.ts:254](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L254)

Базовый путь API; например, '/v1' в https://myapi.com/v1

***

### bodyCoercion?

```ts
optional bodyCoercion?: boolean;
```

Определено в: [packages/runtime/src/config.ts:288](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L288)

Неявно принуждать параметры тела к принятому типу.

#### Default

```ts
true
```

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

***

### iocModule?

```ts
optional iocModule?: string;
```

Определено в: [packages/runtime/src/config.ts:269](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L269)

Путь модуля IoC, например `./inversify/ioc`.

***

### middleware?

```ts
optional middleware?: "express" | "hapi" | "koa";
```

Определено в: [packages/runtime/src/config.ts:259](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L259)

Поставщик промежуточного ПО.

***

### middlewareTemplate?

```ts
optional middlewareTemplate?: string;
```

Определено в: [packages/runtime/src/config.ts:264](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L264)

обычай Handlebars Шаблон пути используется вместо встроенного промежуточного шаблона.

***

### noWriteIfUnchanged?

```ts
optional noWriteIfUnchanged?: boolean;
```

Определено в: [packages/runtime/src/config.ts:249](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L249)

Пропускает запись файла маршрута, когда сгенерированный контент соответствует существующему файлу.

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

***

### routesDir

```ts
routesDir: string;
```

Определено в: [packages/runtime/src/config.ts:239](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L239)

Каталог, в котором записываются сгенерированные маршрутные файлы.

***

### routesFileName?

```ts
optional routesFileName?: string;
```

Определено в: [packages/runtime/src/config.ts:244](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L244)

Имя файла для генерируемого модуля маршрута.
