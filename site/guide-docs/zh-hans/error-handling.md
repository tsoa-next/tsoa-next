---
title: 处理错误
lang: zh-CN
lastUpdated: 2026-04-20T00:28:55.924Z
---

# 处理错误

::: warning 注
本指南的目标 [express](https://expressjs.com) 假设 `tsoa-next`当前支持策略 : Node.js 22岁或更新。
我们核实以往的LTS、目前的LTS和 Node vNext in CI. 页面存档备份,存于互联网档案馆.
链接设置指南中的实例包括: `npm`, (中文(简体) ). `pnpm`,以及 `yarn` 命令不同的变体。
这个指南假设你跟随 [getting started guide](./getting-started) 或者有一个类似的设置。
:::

相关API参考: [`ValidateError`](./reference/tsoa-next/classes/ValidateError.md), (中文(简体) ). [`@Response`](./reference/tsoa-next/functions/Response.md), (中文(简体) ). [`@Res`](./reference/tsoa-next/functions/Res.md), (中文(简体) ). [`TsoaResponse`](./reference/tsoa-next/type-aliases/TsoaResponse.md),以及 [`Controller`](./reference/tsoa-next/classes/Controller.md)。 。 。 。

正如你可能注意到的,在遵循 从所有步骤从 [getting started guide](./getting-started),我们的服务器不允许 无效的参数, 但反应不是非常理想的。

![Current Error Response](/docs-images/errors-server.png)

对于客户来说,看起来是这样的:

![Client Error Response](/docs-images/errors-client.png)

## 设置错误处理

### 处理校验错误

让我们首先确定,每当客户端触发验证错误,而不是打印堆栈跟踪,我们就会显示一个适当的格式化的json响应.

在我们最后 `app.ts`在呼叫之后 `RegisterRoutes(app)`,我们将添加一个全局快取错误处理器:

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

现在,同样的要求会这样回应:

![Client Error with handler](/docs-images/errors-json-client.png)

此外,我们的控制台将显示:

![Server Error with handler](/docs-images/errors-json-server.png)

### 处理缺失路线

为了更优雅地处理缺失的urls,我们可以增加一个"catch-all"的路由处理器:

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

## 指定错误响应类型 OpenAPI

如果你检查文档的终点,你会注意到我们还没有任何文件来证明我们的错误.
自兹 TypeScript 不检查抛出错误, tsoa 无法推断出我们发出的反应类型

::: warning
使用 `@Response` 导出为 `tsoa-next`没有 Express是因为 `Response` 类型。
迁出 tsoa-next 导入是好的,但它仍然需要解决 tsoa-next 装饰师.
:::

然而,我们有办法让您手动指定这些返回 :

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

这应该能让我们的医生看到这样的东西:

![SwaggerUI showing our 422 Response](/docs-images/err-422-swui.png)

::: tip
OpenAPI 允许匹配状态代码, 如“ 2xx ” 或使用“ 默认” 匹配所有代码 。 tsoa 将支持这一点:

```ts
@Response<ErrorResponse>('default', 'Unexpected error')
@Get('Response')
public async getResponse(): Promise<TestModel> {
  return new ModelService().getModel()
}
```

:::

## 已检查的替代回复

最新版本 tsoa,我们可选择将一个框架不可知响应器功能注入到我们的功能中,我们可以要求它制定一个不符合我们控制器方法/状态代码和头的返回类型的响应(用于成功响应).
这样做特别有用,在回答错误时不会出现与抛出错误相关的类型不匹配的风险。
为了注入一个/更多响应器,我们可以使用 `@Res()` 装饰 :

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
