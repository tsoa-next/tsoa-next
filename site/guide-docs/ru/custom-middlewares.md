---
lastUpdated: 2026-04-17T20:53:42.039Z
---
# Custom Middlewares

The `@Middlewares` Декоратор используется для применения пользовательского промежуточного программного обеспечения к конечной точке в вашем TypeScript Код. Это промежуточное программное обеспечение перехватывает входящие HTTP-запросы до того, как они достигают конечной точки, и позволяет выполнять дополнительные операции или изменения. обеспечивает поддержку для Express, Koaи Hapi Промежуточное ПО.
Соответствующая ссылка API: [`@Middlewares`](./reference/tsoa-next/functions/Middlewares.md), [`@Request`](./reference/tsoa-next/functions/Request.md), [`Controller`](./reference/tsoa-next/classes/Controller.md), [`@Route`](./reference/tsoa-next/functions/Route.md)и [`@Get`](./reference/tsoa-next/functions/Get.md).

## Пример

```ts
import type { NextFunction, Request, Response } from 'express'
import { Controller, Get, Middlewares, Request as TsoaRequest, Route } from 'tsoa-next'

async function customMiddleware(req: Request, _res: Response, next: NextFunction) {
  req.headers['x-middleware-hit'] = 'true'
  next()
}

@Route('examples')
export class ExampleController extends Controller {
  @Get('custom-middleware')
  @Middlewares(customMiddleware)
  public async exampleGetEndpoint(@TsoaRequest() req: Request): Promise<{ middlewareHit: boolean }> {
    return {
      middlewareHit: req.header('x-middleware-hit') === 'true',
    }
  }
}
```

## Поток исполнения

Когда HTTP-запрос сделан в конечную точку, украшенную `@Middlewares`Поток исполнения выглядит следующим образом:

Запрос сначала проходит через пользовательскую функцию промежуточного программного обеспечения, указанную в `@Middlewares` Декоратор.
Внутри функции промежуточного программного обеспечения вы можете выполнять любые необходимые операции или модификации на объектах запроса или ответа.

После завершения логики промежуточного программного обеспечения вы должны вызвать `next()` Функция передачи запроса к следующему промежуточному программному обеспечению или самой конечной точке.

Наконец, запрос достигает способа getendpoint, где вы можете обработать запрос и предоставить соответствующий ответ.

Если указано несколько промежуточного программного обеспечения, они выполняются в том порядке, в котором они передаются. `@Middlewares(...)`.

## TypeScript Требования

Использование пользовательского промежуточного программного обеспечения требует, чтобы декораторы были включены в TypeScript:

```jsonc
{
  "compilerOptions": {
    // ...
    "experimentalDecorators": true,
    // ...
  }
}
```

`emitDecoratorMetadata` не требуется для `tsoa-next` для `@Middlewares(...)`.
Включайте его только тогда, когда ваше собственное промежуточное ПО, контейнер DI или стек проверки зависят от метаданных времени проектирования.
