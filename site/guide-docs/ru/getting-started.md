---
title: Быстрый старт
lang: ru-RU
lastUpdated: 2026-04-17T20:53:42.041Z
---

# Начало работы

** О чем мы поговорим: **

[[toc]]

Соответствующая ссылка API: [`Controller`](./reference/tsoa-next/classes/Controller.md), [`@Route`](./reference/tsoa-next/functions/Route.md), [`@Get`](./reference/tsoa-next/functions/Get.md), [`@Path`](./reference/tsoa-next/functions/Path.md), [`@Query`](./reference/tsoa-next/functions/Query.md), [`@Post`](./reference/tsoa-next/functions/Post.md), [`@Body`](./reference/tsoa-next/functions/Body.md)и [`@SuccessResponse`](./reference/tsoa-next/functions/SuccessResponse.md).

::: warning Примечание о совместимости
Эти руководящие цели [express](https://expressjs.com) и предполагает `tsoa-next`Текущая политика поддержки: Node.js 22 или более.
Мы проверяем поддержку по предыдущим LTS, текущим LTS и Node Далее в CI.
Примеры ниже включают `npm`, `pnpm`и `yarn` Варианты, в которых команда отличается.
:::

## Инициировать наш проект

```shell
# Create a new folder for our project
mkdir tsoa-project
cd tsoa-project

# Initialize git
git init
```

Создать `package.json` и `tsconfig.json` С вашим менеджером пакетов по выбору:

::: code-group

```shell [npm]
npm init -y
npm exec tsc -- --init
```

```shell [pnpm]
pnpm init
pnpm exec tsc --init
```

```shell [yarn]
yarn init -y
yarn exec tsc --init
```

:::

Установите приложение и TypeScript Зависимости от выбранного менеджера пакетов:

::: code-group

```shell [npm]
npm i tsoa-next express
npm i -D typescript @types/node @types/express
```

```shell [pnpm]
pnpm add tsoa-next express
pnpm add -D typescript @types/node @types/express
```

```shell [yarn]
yarn add tsoa-next express
yarn add -D typescript @types/node @types/express
```

:::

Сгенерированные маршруты импорта `tsoa-next`Таким образом, пакет, который устанавливает ваше приложение, также является пакетом, используемым контроллерами и генерируемым. `RegisterRoutes` Файлы.
Вы также можете найти опубликованный пакет [npm](https://www.npmjs.com/package/tsoa-next).

## конфигурирование tsoa и типографский

```js
// tsoa.json
{
  "entryFile": "src/app.ts",
  "noImplicitAdditionalProperties": "throw-on-extras",
  "controllerPathGlobs": ["src/**/*Controller.ts"],
  "spec": {
    "outputDirectory": "build",
    "specVersion": 3
  },
  "routes": {
    "routesDir": "build"
  }
}
```

Давайте посмотрим, что мы говорим tsoa здесь:
Во-первых, мы указываем, где будет находиться точка входа в нашу заявку.
Скорее всего, этот файл будет называться `index.ts` или `app.ts`. Мы создадим этот файл через секунду.

После этого верхний уровень `controllerPathGlobs` Настройка говорит tsoa где он может искать контроллеры, чтобы нам не приходилось импортировать их вручную.

Далее мы расскажем tsoa насколько строгая проверка имущества (для использования TypeScript Термин или дополнительный Проверка имущества (для использования) OpenAPI Терминология должна быть.
Мы можем выбрать «игнорировать» дополнительные свойства. OpenAPI по умолчанию), удалить их во время проверки («молчаливо-удалить-экстрас»), или бросить Ошибку обратно Клиенту («бросать-на-экстрас»).
Далее мы устанавливаем выходной каталог для OpenAPI Спецификация (OAS) и наша `routes.ts` Файл, о котором мы поговорим позже.

Мы установили `specVersion` то `3` так tsoa будет генерировать OpenAPI Спецификация v3.
Вы также можете использовать `3.1` Когда ты хочешь OpenAPI 3.1 выход.

Для полного списка всех возможных конфигураций, взгляните на [Справочник API](./reference/tsoa-next/interfaces/Config.md)

::: tip
В то время как конфигурация по умолчанию ts будет работать для этого руководства, улучшенный tsconfig. Джейсон выглядел бы примерно так:
::: details

```jsonc
{
  "compilerOptions": {
    /* Basic Options */
    "incremental": true,
    "target": "es6",
    "module": "commonjs",
    "outDir": "build",

    /* Strict Type-Checking Options */
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    "noImplicitThis": true,
    "alwaysStrict": true,

    /* Additional Checks */
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,

    /* Module Resolution Options */
    "moduleResolution": "node",
    "baseUrl": ".",
    "esModuleInterop": true,

    /* Experimental Options */
    "experimentalDecorators": true,
    // emitDecoratorMetadata is not needed by tsoa-next itself

    /* Advanced Options */
    "forceConsistentCasingInFileNames": true,
  },
}
```

:::

## Определение нашей первой модели

Если у вас уже есть OpenAPI Спецификация, вы можете использовать существующие OpenAPI Инструменты для создания ваших моделей или интерфейсов.
В противном случае, давайте определим `User` Интерфейс в `src/users/user.ts`.

```typescript
export interface User {
  id: number
  email: string
  name: string
  status?: 'Happy' | 'Sad'
  phoneNumbers: string[]
}
```

Прежде чем мы начнем определять нашего контроллера, обычно рекомендуется создать сервис, который обрабатывает взаимодействие с нашими моделями, а не засовывать всю эту логику в слой контроллера.

```ts
// src/users/usersService.ts
import { User } from './user'

// A post request should not contain an id.
export type UserCreationParams = Pick<User, 'email' | 'name' | 'phoneNumbers'>

export class UsersService {
  public get(id: number, name?: string): User {
    return {
      id,
      email: 'jane@doe.com',
      name: name ?? 'Jane Doe',
      status: 'Happy',
      phoneNumbers: [],
    }
  }

  public create(userCreationParams: UserCreationParams): User {
    return {
      id: Math.floor(Math.random() * 10000), // Random
      status: 'Happy',
      ...userCreationParams,
    }
  }
}
```

## Определить простой контроллер

```typescript {15,17,19,20,25,26,28}
// src/users/usersController.ts
import { Body, Controller, Get, Path, Post, Query, Route, SuccessResponse } from 'tsoa-next'
import { User } from './user'
import { UsersService, UserCreationParams } from './usersService'

@Route('users')
export class UsersController extends Controller {
  @Get('{userId}')
  public async getUser(@Path() userId: number, @Query() name?: string): Promise<User> {
    return new UsersService().get(userId, name)
  }

  @SuccessResponse('201', 'Created') // Custom success response
  @Post()
  public async createUser(@Body() requestBody: UserCreationParams): Promise<void> {
    this.setStatus(201) // set return status 201
    new UsersService().create(requestBody)
    return
  }
}
```

Давайте сделаем шаг назад и поговорим о том, что здесь происходит.
Как вы уже можете сказать, мы определяем `/users/` маршрут с использованием [`@Route()`](./reference/tsoa-next/functions/Route.md) Декоратор выше нашего класса контроллеров.

Кроме того, мы определяем 2 метода: `getUser` и `createUser`.
The [`@Get()`](./reference/tsoa-next/functions/Get.md) Декоратор в сочетании с нашим базовым маршрутом `/users/` расскажет tsoa использовать этот метод для каждого запроса _GET_ `/users/{{userId}}`где _{пользователь} Id_ - это шаблон.

::: tip Шаблон OpenAPI Path
Маршрутизация tsoa Близко зеркально OpenAPIТемплирование пути по причинам совместимости.
Темплирование пути относится к использованию выражений шаблона, ограниченных вьющимися брекетами ({}), чтобы отметить раздел пути URL как заменяемый с использованием параметров пути.
:::

Под капотом это было бы как определение `app.get('users/:userId')`.
В то время как Express позволяет использовать определения маршрутов, мы предпочитаем более четко разделить маршрутизацию и валидацию.
Потому что вы просите _id_ быть _number_, используя [`@Path()`](./reference/tsoa-next/functions/Path.md) Декоратор с ан `userId` Типовой номер, tsoa Отклонить прохождение т.е. _string_ здесь.
Аналогично, если вы хотите принять _string_ с определенным шаблоном, вы можете сделать это, используя аннотации JSON Schema. Вы можете узнать больше об этом [here](#what-s-next).

tsoa-next поддерживает обычный путь, запрос, заголовок и декораторы тела, а также поддерживает многочастные декораторы форм-данных, такие как: [`@FormField()`](./reference/tsoa-next/functions/FormField.md), [`@UploadedFile()`](./reference/tsoa-next/functions/UploadedFile.md)и [`@UploadedFiles()`](./reference/tsoa-next/functions/UploadedFiles.md)плюс введенные только во время выполнения параметры, такие как [`@Request()`](./reference/tsoa-next/functions/Request.md) и [`@Res()`](./reference/tsoa-next/functions/Res.md).

::: tip
Если имя параметра равно параметру сообщения http, вы можете опустить аргумент для декораторов, в противном случае вы можете привести аргумент:

```ts
@Query('my-query') myQuery: string;
```

:::

Полный список всех декораторов можно найти [here](./decorators).

::: warning пещера
Всегда используйте названный экспорт.`export class C`) класс контроллера для tsoa Чтобы правильно подобрать его.
Дефолтный экспорт (`export default class C`) в настоящее время не поддерживаются.
:::

## Создание экспресс-сервера

Теперь давайте создадим `app.ts` и `server.ts` файл в нашем каталоге источников, как это:

```ts
// src/app.ts
import express, { json, urlencoded } from 'express'
import { RegisterRoutes } from '../build/routes'

export const app = express()

// Use body parser to read sent json payloads
app.use(
  urlencoded({
    extended: true,
  }),
)
app.use(json())

RegisterRoutes(app)
```

```ts
// src/server.ts
import { app } from './app'

const port = process.env.PORT || 3000

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
```

## Создание сгенерированных файлов

В этот момент вы можете заметить, что TypeScript Не найдешь ты `RegisterRoutes` импорт из `build/routes`.
Это потому, что мы не просили tsoa Для создания файла маршрутов и OpenAPI Пока нет.
Давайте сделаем это сейчас:

```shell
mkdir -p build # Create the build directory if it doesn't exist
```

::: code-group

```shell [npm]
npm exec tsoa -- spec-and-routes
```

```shell [pnpm]
pnpm exec tsoa spec-and-routes
```

```shell [yarn]
yarn exec tsoa spec-and-routes
```

:::

Теперь ваши сгенерированные файлы должны быть созданы, и вы можете скомпилировать их. TypeScript Запустите свой сервер:

::: code-group

```shell [npm]
npm exec tsc -- --outDir build --experimentalDecorators
```

```shell [pnpm]
pnpm exec tsc --outDir build --experimentalDecorators
```

```shell [yarn]
yarn exec tsc --outDir build --experimentalDecorators
```

:::

```shell
node build/src/server.js
```

::: tip

Вы можете добавить эти скрипты в свой `package.json` В этот момент:

```js
"main": "build/src/server.js",
"scripts": {
  "build": "tsoa spec-and-routes && tsc",
  "start": "node build/src/server.js"
},
```

:::

## Что дальше?

- Ручно ссылаясь `tsc` и `tsoa routes` В разработке не очень удобно.
- Осмотр нашего первого OpenAPI спецификация и перезарядка нашего цикла обратной связи, обслуживая обновленную версию SwaggerUI во время развития.

Мы можем улучшить это с помощью [live reloading](./live-reloading).

- Улучшение нашего ответа на ошибки проверки с использованием надлежащих [error handling](./error-handling)- использовать [Descriptions](./descriptions), [Примеры](./examples) и [Annotations](./annotations) для расширенной проверки и лучшей документации
