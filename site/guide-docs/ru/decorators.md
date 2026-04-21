---
lastUpdated: 2026-04-17T20:53:42.039Z
---
# Декораторы

Обратите внимание, что этот раздел охватывает только декораторы, которые не описаны отдельно. [`@Response`](./error-handling) или основных параметров декораторов, введенных в [Быстрый старт](./getting-started).
Для полного обзора, пожалуйста, проверьте [Справочник API](./reference/).
Соответствующая ссылка API: [`@Security`](./reference/tsoa-next/functions/Security.md), [`@NoSecurity`](./reference/tsoa-next/functions/NoSecurity.md), [`@Tags`](./reference/tsoa-next/functions/Tags.md), [`@OperationId`](./reference/tsoa-next/functions/OperationId.md), [`@Deprecated`](./reference/tsoa-next/functions/Deprecated.md), [`@Validate`](./reference/tsoa-next/functions/Validate.md), [`@SpecPath`](./reference/tsoa-next/functions/SpecPath.md), [`@Hidden`](./reference/tsoa-next/functions/Hidden.md), [`@Request`](./reference/tsoa-next/functions/Request.md), [`@RequestProp`](./reference/tsoa-next/functions/RequestProp.md), [`@Inject`](./reference/tsoa-next/functions/Inject.md), [`@Produces`](./reference/tsoa-next/functions/Produces.md)и [`@Consumes`](./reference/tsoa-next/functions/Consumes.md).

## Безопасность

The [`@Security`](./reference/tsoa-next/functions/Security.md) Декоратор может быть использован выше методов контроллера, чтобы указать, что должна быть аутентификация перед запуском этих методов. Как описано выше, аутентификация выполняется в файле, который ссылается на tsoaКонфигурация. Имена схем определяются пользователем и должны соответствовать именам в вашем OpenAPI Модуль безопасности и аутентификации. При использовании `@Security` Декоратор, вы можете выбрать один или несколько методов аутентификации. Если вы решите использовать несколько методов аутентификации, вы можете выбрать один из методов (ИЛИ):

```ts
@Security('jwt', ['write:pets', 'read:pets'])
@Security('api_key')
@Get('OauthOrAPIkey')
public async GetWithOrSecurity(@Request() request: express.Request): Promise<any> {
}
```

Или все они (и все они) должны быть

```ts
@Security({
  jwt: ['write:pets', 'read:pets'],
  api_key: [],
})
@Get('OauthAndAPIkey')
public async GetWithAndSecurity(@Request() request: express.Request): Promise<any> {
}
```

## Безопасность

Использовать [`@NoSecurity()`](./reference/tsoa-next/functions/NoSecurity.md) когда контроллер или действие должны очистить унаследованные или общие требования безопасности API.

```ts
import { Controller, Get, NoSecurity, Route, Security } from 'tsoa-next'

@Route('users')
@Security('api_key')
export class UsersController extends Controller {
  @Get('private')
  public async privateEndpoint(): Promise<string> {
    return 'private'
  }

  @Get('public')
  @NoSecurity()
  public async publicEndpoint(): Promise<string> {
    return 'public'
  }
}
```

## Тэги

Теги определяются с помощью [`@Tags('tag1', 'tag2', ...)`](./reference/tsoa-next/functions/Tags.md) декоратор в контроллерах и/или в способах, как в следующих примерах.

```ts
import { Controller, Get, Request, Response, Route, Tags } from 'tsoa-next'

@Route('users')
@Tags('User')
export class UsersController extends Controller {
  @Get('UserInfo')
  @Tags('Info', 'Get')
  @Response<{ message: string }>('default', 'Unexpected error')
  public async userInfo(@Request() request: { user: { id: number; name: string } }): Promise<{ id: number; name: string }> {
    return Promise.resolve(request.user)
  }

  @Get('EditUser')
  @Tags('Edit')
  public async editUser(): Promise<string> {
    return 'ok'
  }
}
```

Если у вас есть проект, который нуждается в описании и / или внешних документах для тегов, вы можете настроить внутренние генераторы для использования правильных определений тегов и внешних документов, предоставив свойство тегов для спецификации свойств. tsoa.json.

```js
{
  "spec": {
    "tags":  [
      {
        "name": "User",
        "description": "Operations about users",
        "externalDocs": {
          "description": "Find out more about users",
          "url": "http://swagger.io"
        }
      }
    ],
    ...
  },
  "routes": {
    ...
  }
}
```

## Операция Ид

Настройка [`operationId`](./reference/tsoa-next/functions/OperationId.md) На пути операции.
Полезно для использования с OpenAPI Инструмент генерации кода, поскольку этот параметр используется для названия функции, генерируемой в клиенте SDK.

```ts
@Get()
@OperationId('findDomain')
public async find(): Promise<any> {

}
```

## обесцененный

OpenAPI Позволяет обесценивать [operations](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.2.md#user-content-operationdeprecated), [parameters](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.2.md#user-content-parameterdeprecated)и [schemas](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.2.md#user-content-schemadeprecated). Это позволяет вам указать, что определенные конечные точки / форматы / и т. Д. Больше не должны использоваться, позволяя клиентам переходить на новый подход.

Чтобы обесценить части вашего API, вы можете прикрепить [`@Deprecated`](./reference/tsoa-next/functions/Deprecated.md) Декоратор класса свойств, методов и параметров. Для конструкций, которые не поддерживают декораторы (например, интерфейсы и псевдонимы типа), вы можете использовать `@deprecated` JSDoc Аннотация. Некоторые примеры:

### Операции

```ts
@Get()
@Deprecated()
public async find(): Promise<any> {

}
```

### Параметры ()OpenAPI Только 3+

```ts
@Get("v2")
public async findV2(
  @Query() text: string,
  @Deprecated() @Query() dontUse?: string
): Promise<any> {

}
```

```ts
interface QueryParams {
  text: string;
  sort?: string;
  page?: number;
}

@Get("v2")
public async findV2(
  @Queries() queryParams: QueryParams
): Promise<any> {

}
```

### СхемыOpenAPI Только 3+

```ts
class CreateUserRequest {
  name: string;
  @Deprecated() firstName?: string;

  constructor(
    public emailAddress: string,
    @Deprecated() public icqHandle?: string
  ) {}
}

interface CreateUserResponse {
  /** @deprecated */ durationMs?: number;
  details: UserDetails;
}

type UserDetails = {
  name: string;
  /** @deprecated */ firstName?: string;
};
```

## подтверждать

Внешний декоратор схемы называется [`@Validate(...)`](./reference/tsoa-next/functions/Validate.md).
Используйте его на параметрах метода контроллера, когда вам нужна поддерживаемая внешняя библиотека схем, чтобы заменить встроенную проверку времени выполнения для этого поддеревья параметров.

- Поддерживаемые формы: `@Validate(schema)`, `@Validate('zod', schema)`, `@Validate({ kind: 'zod', schema })`- Поддерживаемые библиотеки: `zod`, `joi`, `yup`, `superstruct`, `io-ts`- Поддерживаемые декораторы параметров: `@Body`, `@BodyProp`, `@Query`, `@Queries`, `@Path`, `@Header`, `@FormField`, `@UploadedFile`, `@UploadedFiles`- OpenAPI Поколение приходит из вашего TypeScript типы; `@Validate(...)` Изменяется только время выполнения

```ts
import { Body, Controller, Post, Route, Validate } from 'tsoa-next'
import { z } from 'zod'

type CreateUser = {
  name: string
  tags: string[]
}

const CreateUserSchema = z.object({
  name: z.string().min(3),
  tags: z.array(z.string()).min(1),
})

@Route('users')
export class UsersController extends Controller {
  @Post()
  public create(@Body() @Validate(CreateUserSchema) payload: CreateUser): CreateUser {
    return payload
  }
}
```

Для полной настройки заметок и примеров для каждой поддерживаемой библиотеки валидаторов см. [External Validators](./external-validators).

## Спектакль

Использовать [`@SpecPath(...)`](./reference/tsoa-next/functions/SpecPath.md) на контроллере, когда вы хотите, чтобы этот контроллер выставлял конечную точку спецификации или документации во время выполнения без чтения сгенерированного файла спецификации с локального диска.

- `@SpecPath()` По умолчанию для конечной точки JSON `/<controller-path>/spec`- Встроенные цели: `json`, `yaml`, `swagger`, `redoc`, `rapidoc`- Встроенные цели требуют генерации маршрута для доступа к спецификации, такой как стандарт. `tsoa spec-and-routes` рабочий процесс или конфигурация маршрутов, которая встраивает `runtimeSpecConfig`- Контроллер может объявить несколько `@SpecPath(...)` декораторы до тех пор, пока решенные пути не сталкиваются
- Встроенная документация нацелена на опциональные одноранговые зависимости с ленивой нагрузкой:
  - `swagger-ui-express` для Express  - `swagger-ui-koa` для Koa  - `hapi-swagger` для Hapi  - `redoc` для Redoc  - `rapidoc` для RapiDoc- Обработчики могут вернуть любой `string` или `Readable`- Использовать `@SpecPath(path, options?)` для настройки [`SpecPathOptions`](./reference/tsoa-next/interfaces/SpecPathOptions.md) такие как `target`, `cache`и факультативный `gate`- `gate` может быть булевой или функцией, которая получает [`SpecRequestContext`](./reference/tsoa-next/interfaces/SpecRequestContext.md) и возвращает ли спецификация должна быть предоставлена для этой просьбы
- Кэш может быть отключен с `'none'`Сохраняется в процессе с `'memory'`или делегированы на обычай [`SpecCacheHandler`](./reference/tsoa-next/interfaces/SpecCacheHandler.md)- `@SpecPath(...)` маршруты являются вспомогательными и не добавляются к генерируемым OpenAPI документ

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

В этом примере:

- `GET /users/spec` служить OpenAPI Оригинальное название: JSON
- `GET /users/openapi.yaml` служит тому же документу, что и ЯМЛ
- `GET /users/docs` служить Swagger UI, если установлена специфичная для среды выполнения одноранговая зависимость

Вы также можете предоставить пользовательский обработчик и внешнюю реализацию кэша:

```ts
import { Readable } from 'node:stream'
import { Controller, Get, Route, SpecCacheHandler, SpecPath, SpecRequestContext } from 'tsoa-next'

const cacheStore = new Map<string, string>()

const cache: SpecCacheHandler = {
  async get(context) {
    return cacheStore.get(context.cacheKey)
  },
  async set(context, value) {
    cacheStore.set(context.cacheKey, value)
  },
}

async function customDocs(context: SpecRequestContext) {
  return Readable.from([await context.getSpecString('json')])
}

@Route('internal')
@SpecPath('spec.json', { target: customDocs, cache })
export class InternalController extends Controller {
  @Get('status')
  public status() {
    return { ok: true }
  }
}
```

Вы также можете выбрать специальный маршрут:

```ts
@SpecPath('docs', {
  gate: context => {
    const headers = (context.request as { headers?: Record<string, string | string[] | undefined> } | undefined)?.headers
    return headers?.['x-allow-spec'] === 'true'
  },
  target: 'swagger',
})
```

Когда кэширование включено и пользовательский обработчик возвращает поток, `tsoa-next` буферизирует поток к строке, прежде чем хранить его через обработчик кэша.


## скрытый

Использовать [`@Hidden`](./reference/tsoa-next/functions/Hidden.md) Способы исключения конечной точки из генерируемой OpenAPI Специфический документ.

```ts
@Get()
@Hidden()
public async find(): Promise<any> {
}
```

Использовать [`@Hidden`](./reference/tsoa-next/functions/Hidden.md) на контроллерах, чтобы исключить все их конечные точки из сгенерированного OpenAPI Специфический документ.

```ts
import { Controller, Get, Hidden, Post, Route } from 'tsoa-next'

@Route('hidden')
@Hidden()
export class HiddenController extends Controller {
  @Get()
  public async find(): Promise<any> {}

  @Post()
  public async create(): Promise<any> {}
}
```

Используйте `@Query` параметры для исключения парам запросов из генерируемых OpenAPI Специфический документ. Параметр должен либо позволить скрыть неопределенное значение, либо иметь значение по умолчанию.

```ts
  @Get()
  public async find(
    @Query() normalParam: string,
    @Query() @Hidden() defaultSecret = true,
    @Query() @Hidden() optionalSecret?: string
  ): Promise<any> {

  }
```

## Просьба

Для доступа к объекту запроса Express в способе контроллера используйте [`@Request`](./reference/tsoa-next/functions/Request.md) декоратор:

```typescript
// src/users/usersController.ts

import * as express from 'express'
import { Controller, Get, Path, Request, Route } from 'tsoa-next'

@Route('users')
export class UsersController extends Controller {
  @Get('{userId}')
  public async getUser(
    @Path() userId: number,
    @Request() request: express.Request
  ): Promise<{ id: number; requestedBy?: string }> {
    // TODO: implement some code that uses the request as well
    return {
      id: userId,
      requestedBy: request.header('x-requested-by'),
    }
  }
}
```
для доступа Koaобъект запроса (который имеет объект ctx) в способе контроллера [`@Request`](./reference/tsoa-next/functions/Request.md) декоратор:

```typescript
// src/users/usersController.ts

import * as koa from 'koa'
import { Controller, Get, Path, Request, Route } from 'tsoa-next'

@Route('users')
export class UsersController extends Controller {
  @Get('{userId}')
  public async getUser(
    @Path() userId: number,
    @Request() request: koa.Request
  ): Promise<{ id: number; path: string }> {
    const ctx = request.ctx;
    return {
      id: userId,
      path: ctx.path,
    }
  }
}
```

::: danger
Обратите внимание, что параметр `request` Не отображается в файле OAS.
Использовать [`@RequestProp(...)`](./reference/tsoa-next/functions/RequestProp.md) когда значение уже живет на базовом объекте запроса времени выполнения.
Использовать [`@Inject()`](./reference/tsoa-next/functions/Inject.md) когда параметр поставляется полностью вашим собственным шаблоном маршрута или кодом обертки и должен быть исключен из генерации спецификаций.
:::

## ЗапроситьProp

[`@RequestProp(...)`](./reference/tsoa-next/functions/RequestProp.md) связывает одно свойство с базовым объектом запроса времени выполнения.

```ts
import { Controller, Post, RequestProp, Route } from 'tsoa-next'

@Route('request-props')
export class RequestPropsController extends Controller {
  @Post('body')
  public async getBody(@RequestProp('body') body: { name: string }): Promise<{ name: string }> {
    return body
  }
}
```

## производить

The [`@Produces`](./reference/tsoa-next/functions/Produces.md) декоратор используется для определения пользовательских типов носителей для ответов методов контроллера в OpenAPI генератор. Он позволяет указать конкретный тип среды для каждого метода, без перезаписи ответа типа контента по умолчанию.

Вот пример того, как использовать `@Produces` декоратор:

```typescript
@Route('MediaTypeTest')
@Produces('application/vnd.mycompany.myapp+json')
export class MediaTypeTestController extends Controller {
  @Get('users/{userId}')
  public async getDefaultProduces(@Path() userId: number): Promise<{ id: number; name: string }> {
    this.setHeader('Content-Type', 'application/vnd.mycompany.myapp+json')
    return Promise.resolve({
      id: userId,
      name: 'foo',
    })
  }
  @Get('custom/security.txt')
  @Produces('text/plain')
  public async getCustomProduces(): Promise<string> {
    const securityTxt = 'Contact: mailto: security@example.com\nExpires: 2012-12-12T12:37:00.000Z'
    this.setHeader('Content-Type', 'text/plain')
    return securityTxt
  }
}
```

::: danger
Обратите внимание, что используя [`@Produces`](./reference/tsoa-next/functions/Produces.md) влияет только на генерируемые OpenAPI Спецификация. Вы также должны убедиться, что вы отправляете правильный заголовок, используя `this.setHeader('Content-Type', 'MEDIA_TYPE')` в ваших методах управления.
:::

## потребление

Использовать [`@Consumes(...)`](./reference/tsoa-next/functions/Consumes.md) когда действие принимает недефолтный запрос типа body media.

```ts
import { Body, Consumes, Controller, Post, Response, Route, SuccessResponse } from 'tsoa-next'

@Route('MediaTypeTest')
export class MediaTypeTestController extends Controller {
  @Post('custom')
  @Consumes('application/vnd.mycompany.myapp.v2+json')
  @SuccessResponse('202', 'Accepted', 'application/vnd.mycompany.myapp.v2+json')
  @Response<{ message: string }>('400', 'Bad Request', undefined, 'application/problem+json')
  public async postCustomConsumes(@Body() body: { name: string }): Promise<{ id: number; name: string }> {
    this.setStatus(202)
    return {
      id: body.name.length,
      name: body.name,
    }
  }
}
```
