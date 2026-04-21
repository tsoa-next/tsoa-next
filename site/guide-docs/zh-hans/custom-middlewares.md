---
lastUpdated: 2026-04-17T20:53:42.039Z
---
# 自定义中间软件

这个 `@Middlewares` 装饰器用于将自定义的中间软件应用到您的端点 TypeScript 代码。 此中件在 HTTP 请求到达端点之前会拦截请求, 并允许您执行额外的操作或修改 。 它为 Express, (中文(简体) ). Koa,以及 Hapi 中间软件。
相关API参考: [`@Middlewares`](./reference/tsoa-next/functions/Middlewares.md), (中文(简体) ). [`@Request`](./reference/tsoa-next/functions/Request.md), (中文(简体) ). [`Controller`](./reference/tsoa-next/classes/Controller.md), (中文(简体) ). [`@Route`](./reference/tsoa-next/functions/Route.md),以及 [`@Get`](./reference/tsoa-next/functions/Get.md)。 。 。 。

## 示例

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

## 执行流程

当一个 HTTP 请求被提交到端点时, `@Middlewares`,执行流程如下:

请求首先要通过定义中指定的自定义中间软件函数 `@Middlewares` 装饰师.
在中间软件功能内,您可以在请求或响应对象上执行任何必要的操作或修改.

在完成中间软件逻辑后,您必须拨打 `next()` 函数将请求传递到下一个中间软件或端点本身。

最后,请求达到了例GetEndpoint方法,在此可以处理请求并给出适当的响应.

如果指定了多个中间软件,则按传递顺序执行 `@Middlewares(...)`。 。 。 。

## TypeScript 所需资源

使用自定义中间软件需要启用 TypeScript数字 :

```jsonc
{
  "compilerOptions": {
    // ...
    "experimentalDecorators": true,
    // ...
  }
}
```

`emitDecoratorMetadata` 无需 `tsoa-next` 页:1 `@Middlewares(...)`。 。 。 。
只有在您自己的中间件, DI 容器, 或验证堆栈依赖于设计时的元数据时才启用它 。
