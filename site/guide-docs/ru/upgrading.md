---
sidebarDepth: 1
lastUpdated: 2026-04-17T20:53:42.041Z
---

# Модернизация от tsoa 2,5

[Jump to the breaking changes](#breaking-changes)

> Историческое примечание: ссылки запроса на тягу в этом руководстве намеренно указывают на [`lukeautry/tsoa`](https://github.com/lukeautry/tsoa)где эти изменения первоначально произошли.

## Новые особенности

### Поддержка типовых псевдонимов

Этот выпуск поставляется с надлежащей поддержкой определений псевдонимов типа.

Они могут варьироваться от простых сценариев.

```ts
/**
 * A Word shall be a non-empty string
 * @minLength 1
 */
type Word = string
```

к более сложным сценариям, таким как союзы и пересечения псевдонимов

```ts
type IntersectionAlias = { value1: string; value2: string } & TypeAliasModel1

// or
type OneOrTwo = TypeAliasModel1 | TypeAliasModel2
```

или даже родовые псевдонимы:

```ts
type GenericAlias<T> = T | string
type ForwardGenericAlias<T, U> = GenericAlias<U> | T
```

Обратите внимание, что это означает, что tsoa не только генерирует спецификацию (OpenAPI v3 и Swagger2\*), но также будет проверять входные данные по типам, включая аннотации jsDoc.

* Могут быть определенные сценарии, в которых мы не сможем генерировать. Swagger 2 Из вашего TypeScript, tsoa Мы будем регистрировать предупреждения, чтобы информировать вас о любых проблемах, о которых мы знаем.

### Поддержка картографических типов

> TypeScript 2.1 введены картографированные типы, мощное дополнение к системе типов. По сути, отображенные типы позволяют создавать новые типы из существующих путем отображения типов свойств. Каждое свойство существующего типа преобразуется по правилу, которое вы указываете. Преобразованные свойства образуют новый тип.
> Мариус Шульц, https://mariusschulz.com/blog/mapped-types-in-typescript

tsoa Теперь работает с проверкой типа ts для решения картографических типов. Мы будем активно стараться поддерживать все случаи, но на данный момент тестовый набор охватывает только те типы судов, которые нанесены на карту.

```ts
/**
 * Make all properties in T optional
 */
type Partial<T> = {
  [P in keyof T]?: T[P]
}

/**
 * Make all properties in T required
 */
type Required<T> = {
  [P in keyof T]-?: T[P]
}

/**
 * Make all properties in T readonly
 */
type Readonly<T> = {
  readonly [P in keyof T]: T[P]
}

/**
 * From T, pick a set of properties whose keys are in the union K
 */
type Pick<T, K extends keyof T> = {
  [P in K]: T[P]
}
```

### Поддержка условных типов

По версии 2.8, TypeScript Поддерживает условные типы. Синтаксис очень близок к троичному оператору и позволяет выражать 2 (или более) различных типа в зависимости от состояния. Пожалуйста, обратитесь к [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/advanced-types.html#conditional-types) Для деталей.

```ts
type Diff<T, U> = T extends U ? never : T // Remove types from T that are assignable to U
```

tsoa Теперь работает с проверкой типа ts для решения условных типов. Мы будем активно стараться поддерживать большинство случаев, но на данный момент тестовый набор охватывает только типы судов типа .

```ts
/**
 * Exclude from T those types that are assignable to U
 */
type Exclude<T, U> = T extends U ? never : T

/**
 * Extract from T those types that are assignable to U
 */
type Extract<T, U> = T extends U ? T : never

/**
 * Exclude null and undefined from T
 */
type NonNullable<T> = T extends null | undefined ? never : T
```

### Поддержка комбинаций и типов полезности

Сочетание отображенных и условных типов позволяет использовать мощные типы полезности, такие как: `Omit` Тип.

```
/**
 * Construct a type with the properties of T except for those in type K.
 */
type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
```

### Поддержка `Record<>` [\#662](https://github.com/lukeautry/tsoa/pull/662) ()[Eywek](https://github.com/Eywek))

### Enums: Смотри [\#594](https://github.com/lukeautry/tsoa/pull/594) Для Spec и [\#599](https://github.com/lukeautry/tsoa/pull/599) и [\#593](https://github.com/lukeautry/tsoa/pull/593)

### Нулевое ключевое слово: Видишь? [\#601](https://github.com/lukeautry/tsoa/pull/601)

### Умение использовать колонный делимитер вместо браслетов в пути [\#602](https://github.com/lukeautry/tsoa/pull/602)()[itamarco](https://github.com/itamarco))

### Добавлена поддержка @example параметров/свойств [\#616](https://github.com/lukeautry/tsoa/pull/616) ()[jfrconley](https://github.com/jfrconley))

### Название: Игнорирование классовых методов [\#643](https://github.com/lukeautry/tsoa/pull/643) ()[Eywek](https://github.com/Eywek))

### Исполнитель: Handle Enum Members [\#656](https://github.com/lukeautry/tsoa/pull/656) ()[Eywek](https://github.com/Eywek))

### Handle индексированные типы [\#636](https://github.com/lukeautry/tsoa/pull/636) ()[Eywek](https://github.com/Eywek))

### ручка `typeof` [\#635](https://github.com/lukeautry/tsoa/pull/635) ()[Eywek](https://github.com/Eywek))

### `@format` Поддержка типовых псевдонимов [\#620](https://github.com/lukeautry/tsoa/pull/620) ()[jfrconley](https://github.com/jfrconley))

## Bug Fixes

- правильно распространять имя поля в валидации Модель [@fantapop](https://github.com/fantapop)

- Отклоненный от нормы документ типа Api Response 200 вместо 204 [\#629](https://github.com/lukeautry/tsoa/pull/629) ()[WoH](https://github.com/WoH))

- подтверждать Ошибка должна расширяться [\#661](https://github.com/lukeautry/tsoa/pull/661) ()[aldenquimby](https://github.com/aldenquimby))

- Обновить koa-router до @koa/router, исправить ошибки типа [\#646](https://github.com/lukeautry/tsoa/pull/646) ()[michaelbeaumont](https://github.com/michaelbeaumont))
- Удалить тип объекта [\#642](https://github.com/lukeautry/tsoa/pull/642) ()[dimitor115](https://github.com/dimitor115))
- Фиксация добавления статических свойств к определению модели [\#639](https://github.com/lukeautry/tsoa/pull/639) ()[dimitor115](https://github.com/dimitor115))

## Прорывные изменения

### Null vs. неопределенный

Если вы не заявляете тип принять `null`Мы больше не будем маркировать ваши дополнительные свойства как `nullable: true` или `x-nullable: true`.
Это относится и к валидации, поэтому при отправке `null` вместо отправки `undefined` Никаких свойств на объекте не было, теперь уже нет.
отправка `undefined` Вместо, т.е. `string | null` Также отклоняется валидацией.

### именование

Чтобы поддерживать псевдонимы типов и избегать столкновений имен, имена для генерируемых схем / определений компонентов могут быть изменены (в основном затрагиваются общие интерфейсы).
Если вы полагаетесь на названия компонентов, генерируемые tsoaЭто переломное изменение.

Потому что tsoa Поддерживал некоторые типы псевдонимов в прошлом и теперь генерировал определения по-разному, это может нарушить ваш код.
Если вы полагались на tsoa Если вы не поддерживаете псевдонимы, чтобы избежать проблем, это может нарушить ваш код.
Будьте осторожны и сообщайте о проблемах.

### Улучшение проверки вложенных объектов

Видишь? [\#574](https://github.com/lukeautry/tsoa/pull/574) и [\#575](https://github.com/lukeautry/tsoa/pull/575).
Эти изменения не должны нарушаться, но поскольку они влияют на проверку, лучше быть в безопасности, чем сожалеть.

### Измените поведение по умолчанию, когда хост не определен:

Просто установите хозяина на случай, если вы хотите иметь абсолютные URL. Это переломный момент для тех, кто использовал OpenAPI 3, но на самом деле tsoa Сравнение с тем, как мы справлялись с `host` собственность в Swagger 2 Ранее OpenAPI 3 пользователя должны были пройти `null` Все мы чувствовали себя странно. Теперь опускаю `host` вызвать tsoa Допустим, URL должен быть относительным.

### Удалить... в поле Ошибки

При обнаружении нелегальных дополнительных свойств (если вы используете tsoa устанавливать `additionalProperties: 'throw-on-extras'`), ключ на ошибке будет содержать дополнительную точку.

```js
{
  "TestModel..additionalProp: : {
    ...
  }
}
```

Теперь все решено, и ключ `TestModel.additionalProp`.

### Используйте Spec вместо Swagger ()`tsoa swagger` На данный момент он доступен, но в конечном итоге будет удален. [\#664](https://github.com/lukeautry/tsoa/pull/664) ()[WoH](https://github.com/WoH))

```diff
Calling the tsoa command
- tsoa swagger
+ tsoa spec

- tsoa swagger-and-routes
+ tsoa spec-and-routes

Manually calling spec generation
- await generateSwaggerSpec(swaggerConfig, routesConfig, compilerOptions, config.ignore);
+ await generateSpec(openapiConfig, compilerOptions, config.ignore);
```

tsoa.json:

```js
{
  "swagger": {}
}
```

становится

```js
{
  "spec": {}
}
```

- Переместить общий конфигуратор на верхний уровень [\#628](https://github.com/lukeautry/tsoa/pull/628) ()[WoH](https://github.com/WoH))

Вместо того, чтобы дублировать конфигурацию и обрабатывать множество краевых корпусов, новая конфигурация намного проще.
Настройки конфигурации, которые влияют как на маршруты, так и на спецификацию, теперь расположены на верхнем уровне объекта конфигурации.

```json
{
  "entryFile": "./tests/fixtures/express/server.ts",
  "noImplicitAdditionalProperties": "silently-remove-extras",
  "routes": {},
  "spec": {}
}
```

Это означает, что если ваши настройки отличаются (например, файл ввода), вам нужно будет позвонить по телефону. `generateRoutes()` и `generateSpec()` себя.
Обратите внимание, что эти методы теперь имеют более простую конфигурацию:

```diff
-    await generateSwaggerSpec(swaggerConfig, routesConfig, compilerOptions, config.ignore);
+    await generateSpec(openapiConfig, compilerOptions, config.ignore);
```

```diff
-    await generateRoutes(routesConfig, swaggerConfig, compilerOptions, config.ignore);
+    await generateRoutes(routesConfig, compilerOptions, config.ignore);
```

EntryFile и noImplicitAdditional Свойства теперь можно установить на swagger/Routes Конфиг.

Также были удалены булевы настройки для неявных дополнительных свойств: #503
Действительные настройки сейчас: `'throw-on-extras' | 'silently-remove-extras' | 'ignore'`Все остальное возвращается к `'ignore'`.

** Для справки см. TS интерфейс всей конфигурации [here](./reference/tsoa-next/interfaces/Config.md)**

### TypeScript В настоящее время профсоюзы функционируют как `anyOf` в OpenAPI [\#671](https://github.com/tsoa-next/tsoa-next/issues/671)
