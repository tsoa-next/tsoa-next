---
lastUpdated: 2026-04-20T21:59:41.312Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/runtime](../index.md) / Config

# Интерфейс: Config

Определено в: [packages/runtime/src/config.ts:5](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L5)

корень tsoa-next Конфигурация, потребляемая CLI Программные генераторы.

## Свойства

### compilerOptions?

```ts
optional compilerOptions?: Record<string, unknown>;
```

Определено в: [packages/runtime/src/config.ts:47](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L47)

TypeScript Компиляторы, используемые в процессе генерации.
Они объединены по параметрам компилятора, разрешенным из tsconfig.

***

### controllerPathGlobs?

```ts
optional controllerPathGlobs?: string[];
```

Определено в: [packages/runtime/src/config.ts:29](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L29)

Множество шаров пути, которые указывают на ваши контроллеры маршрута, которые вы хотели бы иметь. tsoa включая.

***

### defaultNumberType?

```ts
optional defaultNumberType?: "long" | "integer" | "float" | "double";
```

Определено в: [packages/runtime/src/config.ts:68](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L68)

OpenAPI Тип номера для использования TypeScript `number` Когда нет более узкой аннотации.

#### Default

```ts
double
```

***

### entryFile

```ts
entryFile: string;
```

Определено в: [packages/runtime/src/config.ts:24](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L24)

Точка входа в ваш API

***

### ignore?

```ts
optional ignore?: string[];
```

Определено в: [packages/runtime/src/config.ts:19](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L19)

Каталоги, которые следует игнорировать во время TypeScript сканирование метаданных

***

### *МультерОпты*

```ts
optional multerOpts?: Options;
```

Определено в: [packages/runtime/src/config.ts:62](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L62)

Опции Legacy multer пересылаются в генерируемое промежуточное ПО.
The `storage` Вариант не поддерживается.

#### Example

```ts
{
   *   "dest": "/tmp"
   * } Allows multer to write files to disk instead of keeping them in memory.
```

#### Deprecated

После v6.4.0, `RegisterRoutes` может принимать `multerOptions` напрямую.
 Эта опция уровня конфигураций будет удалена в будущем выпуске.
 (https://github.com/tsoa-next/tsoa-next/issues/1587#issuecomment-2391291433)
 (https://github.com/tsoa-next/tsoa-next/pull/1638)

***

### noImplicitAdditionalProperties?

```ts
optional noImplicitAdditionalProperties?: "ignore" | "throw-on-extras" | "silently-remove-extras";
```

Определено в: [packages/runtime/src/config.ts:34](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L34)

Режимы, которые позволяют вам предотвратить вход данных в ваш API. Это задокументирует ваше решение в сваггере. yaml и он будет включать проверку избыточной собственности (во время выполнения) на ваших маршрутах.

***

### routes

```ts
routes: RoutesConfig;
```

Определено в: [packages/runtime/src/config.ts:14](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L14)

Конфигурация генерации маршрута.

***

### spec

```ts
spec: SpecConfig;
```

Определено в: [packages/runtime/src/config.ts:9](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L9)

OpenAPI Конфигурация поколений.

***

### tsconfig?

```ts
optional tsconfig?: string;
```

Определено в: [packages/runtime/src/config.ts:41](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L41)

Путь к файлу tsconfig, используемому в качестве источника ввода для опций компилятора во время генерации.
Если опустить, tsoa-next будет искать tsconfig.json начиная с загруженного tsoa каталог конфигураций.
Явные компиляторы в tsoa-next Конфигурация по-прежнему имеет приоритет над значениями tsconfig.
