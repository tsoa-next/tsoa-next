---
title: Обработка ошибок
lang: ru-RU
lastUpdated: 2026-04-20T00:28:55.924Z
---

# Обработка ошибок

::: warning Примечание о совместимости
Эти руководящие цели [express](https://expressjs.com) и предполагает `tsoa-next`Текущая политика поддержки: Node.js 22 или более.
Мы проверяем поддержку по предыдущим LTS, текущим LTS и Node Далее в CI.
Примеры в связанных руководствах по установке включают `npm`, `pnpm`и `yarn` Варианты, в которых команда отличается.
Это руководство предполагает, что вы следовали [getting started guide](./getting-started) или иметь аналогичную структуру.
:::

Соответствующая ссылка API: [`ValidateError`](./reference/tsoa-next/classes/ValidateError.md), [`@Response`](./reference/tsoa-next/functions/Response.md), [`@Res`](./reference/tsoa-next/functions/Res.md), [`TsoaResponse`](./reference/tsoa-next/type-aliases/TsoaResponse.md)и [`Controller`](./reference/tsoa-next/classes/Controller.md).

Как вы, возможно, заметили, после всех шагов от [getting started guide](./getting-started)Наш сервер не допускает недействительных параметров, но ответ пока не очень идеален.

![Current Error Response](/docs-images/errors-server.png)

Для клиента это выглядит примерно так:

![Client Error Response](/docs-images/errors-client.png)

## Настройка обработки ошибок

### Обработка ошибок проверки

Давайте сначала убедимся, что каждый раз, когда клиент запускает ошибку проверки, вместо того, чтобы распечатать след стека, вместо этого мы показываем правильно отформатированный ответ json.

В конце нашей `app.ts`После призыва к `RegisterRoutes(app)`Мы добавим глобальный экспресс-обработчик ошибок:

```ts
import express, { Response as ExResponse, Request as ExRequest, NextFunction } from 'express'
import { ValidateError } from 'tsoa-next'
// ...

app.use(function errorHandler(err: unknown, req: ExRequest, res: ExResponse, next: NextFunction): ExResponse | void {
  if (err instanceof ValidateError) {
    console.warn(`Caught Validation Error for ${req.path}:`, err.fields)
    return res.status(422).json({
      message: 'Validation Failed',
      details: err?.fields,
    })
  }
  if (err instanceof Error) {
    return res.status(500).json({
      message: 'Internal Server Error',
    })
  }

  next()
})
```

Теперь тот же запрос будет отвечать следующим образом:

![Client Error with handler](/docs-images/errors-json-client.png)

Кроме того, наша консоль покажет:

![Server Error with handler](/docs-images/errors-json-server.png)

### Обработка недостающих маршрутов

Чтобы более изящно обрабатывать отсутствующие URL-адреса, мы можем добавить обработчик маршрута «catch-all»:

```ts
// app.ts
import express, { Response as ExResponse, Request as ExRequest, NextFunction } from 'express'

// ...

RegisterRoutes(app)

app.use(function notFoundHandler(_req, res: ExResponse) {
  res.status(404).send({
    message: 'Not Found',
  })
})

app.use(function errorHandler(
// ...
```

## Определение типов ответов на ошибки для OpenAPI

Если вы проверите конечную точку Документации, вы заметите, что у нас пока нет документации на наши Ошибки.
С тех пор TypeScript Не проверяйте ошибки, tsoa Мы не можем определить тип ответа, который мы посылаем в этих случаях.

::: warning
Используйте `@Response` Декоратор экспортируется `tsoa-next`Нет. Express? `Response` Тип.
Избавление от tsoa-next Импорт - это хорошо, но он все еще должен решить проблему. tsoa-next Декоратор.
:::

Тем не менее, у нас есть способ для вас вручную указать эти возвраты:

```ts
import { Body, Controller, Post, Route, Response, SuccessResponse } from 'tsoa-next'
import { User } from './user'
import { UsersService, UserCreationParams } from './usersService'

interface ValidateErrorJSON {
  message: string
  details: { [name: string]: unknown }
}

@Route('users')
export class UsersController extends Controller {
  // more code here

  @Response<ValidateErrorJSON>(422, 'Validation Failed')
  @SuccessResponse('201', 'Created') // Custom success response
  @Post()
  public async createUser(@Body() requestBody: UserCreationParams): Promise<void> {
    this.setStatus(201) // set return status 201
    new UsersService().create(requestBody)
    return
  }
}
```

Это должно заставить наших врачей показать что-то вроде этого:

![SwaggerUI showing our 422 Response](/docs-images/err-422-swui.png)

::: tip
OpenAPI позволяет сопоставлять коды состояния, такие как «2xx» или сопоставлять все коды, используя «по умолчанию». tsoa Это поддержит:

```ts
@Response<ErrorResponse>('default', 'Unexpected error')
@Get('Response')
public async getResponse(): Promise<TestModel> {
  return new ModelService().getModel()
}
```

:::

## Проверенные по типу альтернативные ответы

В последних версиях tsoaУ нас есть возможность ввести в нашу функцию фреймворк-агностический ответчик, который мы можем вызвать, чтобы сформулировать ответ, который не соответствует типу возврата нашего метода контроллера / кода состояния и заголовков (который используется для ответа на успех).
Это особенно полезно для ответа с ответом на ошибку без риска несоответствий типа, связанных с ошибками броска.
Для того, чтобы ввести один / более ответчиков, мы можем использовать `@Res()` декоратор:

```ts
import { Route, Controller, Get, Query, Res, TsoaResponse } from 'tsoa-next'

@Route('/greeting')
export class GreetingsController extends Controller {
  /**
   * @param notFoundResponse The responder function for a not found response
   */
  @Get('/')
  public async greet(@Query() name?: string, @Res() notFoundResponse: TsoaResponse<404, { reason: string }>): Promise<string> {
    if (!name) {
      return notFoundResponse(404, { reason: 'We don\'t know you yet. Please provide a name' })
    }

    return `Hello, ${name}`
  }
}
```
