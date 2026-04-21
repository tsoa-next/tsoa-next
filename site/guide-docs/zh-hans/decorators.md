---
lastUpdated: 2026-04-17T20:53:42.039Z
---
# 装饰者

请注意,本节仅涵盖未单独描述的装饰品,例如: [`@Response`](./error-handling) 或引入的核心参数装饰器 [快速开始](./getting-started)。 。 。 。
全面情况请查看 [API 参考](./reference/)。 。 。 。
相关API参考: [`@Security`](./reference/tsoa-next/functions/Security.md), (中文(简体) ). [`@NoSecurity`](./reference/tsoa-next/functions/NoSecurity.md), (中文(简体) ). [`@Tags`](./reference/tsoa-next/functions/Tags.md), (中文(简体) ). [`@OperationId`](./reference/tsoa-next/functions/OperationId.md), (中文(简体) ). [`@Deprecated`](./reference/tsoa-next/functions/Deprecated.md), (中文(简体) ). [`@Validate`](./reference/tsoa-next/functions/Validate.md), (中文(简体) ). [`@SpecPath`](./reference/tsoa-next/functions/SpecPath.md), (中文(简体) ). [`@Hidden`](./reference/tsoa-next/functions/Hidden.md), (中文(简体) ). [`@Request`](./reference/tsoa-next/functions/Request.md), (中文(简体) ). [`@RequestProp`](./reference/tsoa-next/functions/RequestProp.md), (中文(简体) ). [`@Inject`](./reference/tsoa-next/functions/Inject.md), (中文(简体) ). [`@Produces`](./reference/tsoa-next/functions/Produces.md),以及 [`@Consumes`](./reference/tsoa-next/functions/Consumes.md)。 。 。 。

## 警卫

这个 [`@Security`](./reference/tsoa-next/functions/Security.md) 可以在控制器方法之上使用装饰器来表示在运行这些方法之前应该有认证. 如上所述,认证是在一个引用于 tsoa'' 配置 。 方案名称由用户定义,必须匹配您中的名称 OpenAPI 安全配置和认证模块。 使用时 `@Security` 装饰者,可以选择使用一种或多种认证方法. 如果选择有多种认证方法,可以在必须通过其中一种方法(OR)之间做出选择:

```ts
@Security('jwt', ['write:pets', 'read:pets'])
@Security('api_key')
@Get('OauthOrAPIkey')
public async GetWithOrSecurity(@Request() request: express.Request): Promise<any> {
}
```

或必须经过所有(AND):

```ts
@Security({
  jwt: ['write:pets', 'read:pets'],
  api_key: [],
})
@Get('OauthAndAPIkey')
public async GetWithAndSecurity(@Request() request: express.Request): Promise<any> {
}
```

## 无安全

使用 [`@NoSecurity()`](./reference/tsoa-next/functions/NoSecurity.md) 控制器或动作何时应明确继承或整个API的安全要求。

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

## 标记

标记以 [`@Tags('tag1', 'tag2', ...)`](./reference/tsoa-next/functions/Tags.md) 控制器和/或方法中的装饰器,例如以下例子。

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

如果您的工程需要描述和/或外部文件来标记, 您可以配置内部生成器使用正确的标记定义和外部文件, 为 Special 属性提供标记属性 。 tsoa贾生

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

## 运行 编号

设定 [`operationId`](./reference/tsoa-next/functions/OperationId.md) 在行动路径下。
用于与 OpenAPI 代码生成工具,因为此参数用于命名客户端SDK生成的函数.

```ts
@Get()
@OperationId('findDomain')
public async find(): Promise<any> {

}
```

## 折旧

OpenAPI 允许您贬值 [operations](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.2.md#user-content-operationdeprecated), (中文(简体) ). [parameters](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.2.md#user-content-parameterdeprecated),以及 [schemas](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.2.md#user-content-schemadeprecated)。 。 。 。 这使得您可以表明,某些终点/格式/etc. 不再使用,同时允许客户有时间迁移到新的方法.

为了对部分API进行折旧,您可以附加 [`@Deprecated`](./reference/tsoa-next/functions/Deprecated.md) 用于类属性、方法和参数的装饰器。 对于不支持装饰器的构造(例如界面和类型别名),您可以使用一个 `@deprecated` JSDoc 注释。 一些例子:

### 业务

```ts
@Get()
@Deprecated()
public async find(): Promise<any> {

}
```

### 参数 (单位:千美元)OpenAPI (仅限3+)

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

### 司马斯( S)OpenAPI (仅限3+)

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

## 校验

外部设计师的名字 [`@Validate(...)`](./reference/tsoa-next/functions/Validate.md)。 。 。 。
在控制器方法参数上使用它, 当你想要一个支持的外部 schema 库来取代该参数子树的内置运行时验证时.

- 支持的表格 : `@Validate(schema)`, (中文(简体) ). `@Validate('zod', schema)`, (中文(简体) ). `@Validate({ kind: 'zod', schema })`- 支持的图书馆: `zod`, (中文(简体) ). `joi`, (中文(简体) ). `yup`, (中文(简体) ). `superstruct`, (中文(简体) ). `io-ts`- 支持的参数装饰符 : `@Body`, (中文(简体) ). `@BodyProp`, (中文(简体) ). `@Query`, (中文(简体) ). `@Queries`, (中文(简体) ). `@Path`, (中文(简体) ). `@Header`, (中文(简体) ). `@FormField`, (中文(简体) ). `@UploadedFile`, (中文(简体) ). `@UploadedFiles`- OpenAPI 一代仍然来自你 TypeScript 类型; `@Validate(...)` 只更改运行时间验证

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

关于每个支持的验证器库的完整设置注释和示例,参见 [External Validators](./external-validators)。 。 。 。

## 光谱

使用 [`@SpecPath(...)`](./reference/tsoa-next/functions/SpecPath.md) 在控制器上,您希望控制器在运行时不从本地磁盘读取生成的光谱文件而显示光谱或文档端点。

- `@SpecPath()` 默认为 JSON 结束点 `/<controller-path>/spec`- 内设目标: `json`, (中文(简体) ). `yaml`, (中文(简体) ). `swagger`, (中文(简体) ). `redoc`, (中文(简体) ). `rapidoc`- 内建目标需要路由生成才能访问 spec config, 如标准 `tsoa spec-and-routes` 工作流程或嵌入的路由配置 `runtimeSpecConfig`- 控制器可以声明多个 `@SpecPath(...)` 只要解开的路径不碰撞
- 内建文档针对懒惰的可选对等依赖性 :
  - `swagger-ui-express` 页:1 Express  - `swagger-ui-koa` 页:1 Koa  - `hapi-swagger` 页:1 Hapi  - `redoc` 页:1 Redoc  - `rapidoc` 页:1 RapiDoc- 自定义处理器可以返回一个 `string` 或一个 `Readable`- 使用 `@SpecPath(path, options?)` 要配置 [`SpecPathOptions`](./reference/tsoa-next/interfaces/SpecPathOptions.md) 例如, `target`, (中文(简体) ). `cache`,可选 `gate`- `gate` 可以是布尔函数,也可以是接收 [`SpecRequestContext`](./reference/tsoa-next/interfaces/SpecRequestContext.md) 并返回是否为该请求提供规格
- 可禁用缓存 `'none'`中,与 `'memory'`,或委托给习惯 [`SpecCacheHandler`](./reference/tsoa-next/interfaces/SpecCacheHandler.md)- `@SpecPath(...)` 路径是辅助的, 不添加到生成中 OpenAPI 文档

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

在这方面:

- `GET /users/spec` 服务 OpenAPI 作为 JSON 文档
- `GET /users/openapi.yaml` 服务于 YAML 的同一文档
- `GET /users/docs` 服务 Swagger 如果安装了运行时间特定对等依赖, 则 UI

您也可以提供自定义处理器和外部缓存执行 :

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

您也可以打开一个光谱路径 :

```ts
@SpecPath('docs', {
  gate: context => {
    const headers = (context.request as { headers?: Record<string, string | string[] | undefined> } | undefined)?.headers
    return headers?.['x-allow-spec'] === 'true'
  },
  target: 'swagger',
})
```

当缓存启用后, 自定义处理器返回一流时, `tsoa-next` 在通过缓存处理器存储之前将流缓冲为字符串。


## 隐藏

使用 [`@Hidden`](./reference/tsoa-next/functions/Hidden.md) 将一个终点从产生的 OpenAPI 规格文件.

```ts
@Get()
@Hidden()
public async find(): Promise<any> {
}
```

使用 [`@Hidden`](./reference/tsoa-next/functions/Hidden.md) 在控制器上将其所有端点从生成的 OpenAPI 规格文件.

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

继续使用 `@Query` 参数以排除生成的查询参数 OpenAPI 规格文件. 参数必须允许未定义或有默认值被隐藏.

```ts
  @Get()
  public async find(
    @Query() normalParam: string,
    @Query() @Hidden() defaultSecret = true,
    @Query() @Hidden() optionalSecret?: string
  ): Promise<any> {

  }
```

## 请求

使用 [`@Request`](./reference/tsoa-next/functions/Request.md) 装饰 :

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
进入 Koa控制器方法中的请求对象(有 ctx 对象)使用 [`@Request`](./reference/tsoa-next/functions/Request.md) 装饰 :

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
注意参数 `request` 没有出现在您的 OAS 文件中。
使用 [`@RequestProp(...)`](./reference/tsoa-next/functions/RequestProp.md) 当值已经存在于运行时间请求对象上时。
使用 [`@Inject()`](./reference/tsoa-next/functions/Inject.md) 当一个参数完全由您自己的路由模板或包装码提供时,应当从光谱生成中省略。
:::

## 请求选项

[`@RequestProp(...)`](./reference/tsoa-next/functions/RequestProp.md) 从基本的运行时请求对象绑定单个属性。

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

## 生产

这个 [`@Produces`](./reference/tsoa-next/functions/Produces.md) 装饰器用于定义自定义介质类型,用于在 OpenAPI 发电机 它允许您为每种方法指定特定的介质类型,而不覆盖默认的内容-Type响应.

这是如何使用 `@Produces` 装饰 :

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
请注意: [`@Produces`](./reference/tsoa-next/functions/Produces.md) 只影响生成 OpenAPI 规格. 您还必须确保您使用 `this.setHeader('Content-Type', 'MEDIA_TYPE')` 在您的控制器方法。
:::

## 消费

使用 [`@Consumes(...)`](./reference/tsoa-next/functions/Consumes.md) 当一个动作接受非默认请求正文介质类型时。

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
