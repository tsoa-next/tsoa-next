---
title: Живая перезагрузка
lang: ru-RU
lastUpdated: 2026-04-20T00:28:55.919Z
---

# Живая перезагрузка

::: warning Примечание о совместимости
Эти руководящие цели [express](https://expressjs.com) и предполагает `tsoa-next`Текущая политика поддержки: Node.js 22 или более.
Мы проверяем поддержку по предыдущим LTS, текущим LTS и Node Далее в CI.
Примеры ниже включают `npm`, `pnpm`и `yarn` Варианты, в которых команда отличается.
Мы полагаем, что ваша установка аналогична той, которая рекомендуется для [getting started](/ru/getting-started)
:::

Соответствующая ссылка API: [`@SpecPath`](./reference/tsoa-next/functions/SpecPath.md), [`SpecPathOptions`](./reference/tsoa-next/interfaces/SpecPathOptions.md), [`SpecRequestContext`](./reference/tsoa-next/interfaces/SpecRequestContext.md)и [`SpecCacheHandler`](./reference/tsoa-next/interfaces/SpecCacheHandler.md).

::: tip
Мы будем использовать [nodemon](https://nodemon.io/) и [ts-node](https://github.com/TypeStrong/ts-node) для перезагрузки в реальном времени, но любой инструмент, который позволяет нам подключиться к процессу перезагрузки, сделает это. Альтернативы могут быть комбинацией `tsc -w` инициировать `tsoa spec-and-routes` использовать [`onchange`](https://www.npmjs.com/package/onchange).
:::

** О чем мы поговорим: **

[[toc]]

## Перезагрузка кода

### Установка узлов и ts-узел

::: code-group

```bash [npm]
npm i -D nodemon ts-node concurrently
```

```bash [pnpm]
pnpm add -D nodemon ts-node concurrently
```

```bash [yarn]
yarn add -D nodemon ts-node concurrently
```

:::

### Создание конфигураций Nodemon

Теперь давайте создадим `nodemon.json` Внутри корневой папки нашего проекта, которая выглядит так:

```json
{
  "exec": "ts-node src/server.ts",
  "watch": ["src"],
  "ext": "ts"
}
```

### Добавление скрипта dev

Давайте автоматически начнем эту настройку с менеджера пакетов. `dev` сценарий`npm run dev`, `pnpm dev`или `yarn dev`), и, пока мы на нем, добавить `build` и `start` заповеди в нашей `package.json`:

```diff
{
  "name": "starter",
  "version": "0.0.1",
+ "scripts": {
+   "dev": "concurrently \"nodemon\" \"nodemon -x tsoa spec-and-routes\"",
+   "build": "tsoa spec-and-routes && tsc",
+   "start": "node build/src/server.js"
+ },
  "dependencies": {
  // ...
}
```

## Зарядка нашего опыта разработчика `@SpecPath`

[`@SpecPath(...)`](./reference/tsoa-next/functions/SpecPath.md) Позволяет контроллеру выставлять живую спецификацию или конечную точку docs без чтения `swagger.json` или `openapi.yaml` Диск в момент запроса.
Это делает его подходящим для рабочих процессов разработки, где вы хотите, чтобы созданная документация оставалась синхронизированной с теми же метаданными контроллера, которые уже используются в ваших маршрутах.

### Установка docs UI peer

Выберите цель UI Docs, которую вы хотите использовать:

- Express: `npm i swagger-ui-express` / `pnpm add swagger-ui-express` / `yarn add swagger-ui-express`- Koa: `npm i swagger-ui-koa` / `pnpm add swagger-ui-koa` / `yarn add swagger-ui-koa`- Hapi: `npm i hapi-swagger` / `pnpm add hapi-swagger` / `yarn add hapi-swagger`- Redoc: `npm i redoc` / `pnpm add redoc` / `yarn add redoc`- RapiDoc: `npm i rapidoc` / `pnpm add rapidoc` / `yarn add rapidoc`

### Обнаружение конечной точки docs, проверяемой контроллером

Прикрепить один или несколько `@SpecPath(...)` Декораторы для существующего контроллера:

```ts
import { Controller, Get, Route, SpecPath } from 'tsoa-next'

@Route('users')
@SpecPath()
@SpecPath('openapi.yaml', { target: 'yaml' })
@SpecPath('docs', { target: 'swagger' })
export class UsersController extends Controller {
  @Get()
  public list(): string[] {
    return []
  }
}
```

Это дает вам:

- `GET /users/spec` для JSON
- `GET /users/openapi.yaml` для YAML
- `GET /users/docs` для Swagger UI

Поскольку конечная точка docs генерируется из тех же метаданных времени выполнения, что и ваши маршруты, она остается актуальной при редактировании контроллеров и повторном запуске. `tsoa spec-and-routes`.

### Проверка документации

Когда мы переходим к <a href="http://localhost:3000/users/docs" target="_blank" rel="noreferrer">localhost:3000/пользователи/доки</a>Мы должны увидеть текущее отражение нашего API.

![SwaggerUI](/docs-images/SwaggerUI.png)

### Отправка запросов через Swagger UI

Мы можем выбрать конечные точки, нажать кнопку «Попробовать» и отправить некоторые данные, заполнив форму.
Когда мы нажмем «Исполнить», этот запрос будет отправлен на наш сервер, и ответ будет отображаться ниже формы.

![SwaggerUI Response](/docs-images/SwUi-Response.png)

### Другие встроенные цели

Если вы предпочитаете другой UI, измените `target` вариант:

- `@SpecPath('docs', { target: 'redoc' })`- `@SpecPath('docs', { target: 'rapidoc' })`

Если вам нужен полностью пользовательский ответ, передайте обработчик в `target` Вместо этого. Вы также можете добавить `cache` и `gate` В тех же вариантах объект.
