---
title: 快速开始
lang: zh-CN
lastUpdated: 2026-04-17T20:53:42.041Z
---

# 开始

我们将要谈论的:**

[[toc]]

相关API参考: [`Controller`](./reference/tsoa-next/classes/Controller.md), (中文(简体) ). [`@Route`](./reference/tsoa-next/functions/Route.md), (中文(简体) ). [`@Get`](./reference/tsoa-next/functions/Get.md), (中文(简体) ). [`@Path`](./reference/tsoa-next/functions/Path.md), (中文(简体) ). [`@Query`](./reference/tsoa-next/functions/Query.md), (中文(简体) ). [`@Post`](./reference/tsoa-next/functions/Post.md), (中文(简体) ). [`@Body`](./reference/tsoa-next/functions/Body.md),以及 [`@SuccessResponse`](./reference/tsoa-next/functions/SuccessResponse.md)。 。 。 。

::: warning 注
本指南的目标 [express](https://expressjs.com) 假设 `tsoa-next`当前支持策略 : Node.js 22岁或更新。
我们核实以往的LTS、目前的LTS和 Node vNext in CI. 页面存档备份,存于互联网档案馆.
以下例子包括: `npm`, (中文(简体) ). `pnpm`,以及 `yarn` 命令不同的变体。
:::

## 启动我们的项目

```shell
# Create a new folder for our project
mkdir tsoa-project
cd tsoa-project

# Initialize git
git init
```

创建一个 `package.json` 和 `tsconfig.json` 使用您选择的软件包管理器 :

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

安装应用程序 TypeScript 选择的软件包管理器的依赖性 :

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

生成路径导入自 `tsoa-next`因此,您的应用程序安装的软件包也是控制器使用并生成的软件包 `RegisterRoutes` 文档。
您也可以在 [npm](https://www.npmjs.com/package/tsoa-next)。 。 。 。

## 配置 tsoa 和打字符

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

让我们看看我们所说的话 tsoa 这里:
首先,我们确定申请的入口在哪里。
很可能, 此文件将被调用 `index.ts` 或者说 `app.ts`。 。 。 。 我们马上创建这个文件。

之后,顶级 `controllerPathGlobs` 设置告诉 tsoa 我们不需要手动导入控制器

接下来,我们告诉 tsoa 如何严格检查多余的财产(使用 TypeScript 或额外条款) 财产检查( 使用) OpenAPI 术语应当如此。
我们可以选择“ 忽略” 附加属性( 包含 OpenAPI 默认),在验证过程中将其删除("silently-remove-extras"),或者将错误丢回客户端("throw-on-extras").
下一步, 我们设置输出目录 OpenAPI (美洲组织)和我们 `routes.ts` 我们稍后再谈

我们设定 `specVersion` 改为 `3` 这么说 tsoa 将生成 OpenAPI v3 规格。
您还可以使用 `3.1` 当你想要的时候 OpenAPI 3.1 产出。

关于所有可能配置的完整列表,请查看 [API 参考](./reference/tsoa-next/interfaces/Config.md)

::: tip
虽然默认的 ts 配置会为此向导工作,但改进后 tsconfig. Json会看起来像这样:
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

## 确定我们的第一个模式

如果你已经有一个 OpenAPI 规格, 您可以使用已有的 OpenAPI 工具生成您的模型或界面。
否则,让我们定义一个 `User` 接口 `src/users/user.ts`。 。 。 。

```typescript
export interface User {
  id: number
  email: string
  name: string
  status?: 'Happy' | 'Sad'
  phoneNumbers: string[]
}
```

在我们开始定义控制器之前,通常一个好主意是创建一个处理与我们的模型交互的服务器,而不是将所有的逻辑推入控制器层.

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

## 定义简单的控制器

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

先退一步再谈此等事.
正如你所希望的那样,我们正在定义 `/users/` 路径使用 [`@Route()`](./reference/tsoa-next/functions/Route.md) 我们控制舱上面的装饰器

此外,我们界定了两种方法: `getUser` 和 `createUser`。 。 。 。
这个 [`@Get()`](./reference/tsoa-next/functions/Get.md) 装饰与我们的基地路线相结合 `/users/` 会告诉 tsoa 以引用此方法进行每次 _GET_ 请求 `/users/{{userId}}`时,在 QXuser 中 IdQQ是一个模板.

::: tip OpenAPI 路径调制
运行在 tsoa 正在密切反射 OpenAPI'路径因相容性而诱导.
路径turlating 是指使用模板表达式,由卷曲括号 (QQ) 来分解,以使用路径参数来标记一个URL路径的一部份可被替换.
:::

在引擎盖下 这就像定义 `app.get('users/:userId')`。 。 。 。
虽然Express允许您使用regex-ish路由定义,但我们更倾向于将路由和验证更清晰地划分.
因为你要求通过使用_d_成为_数字_ [`@Path()`](./reference/tsoa-next/functions/Path.md) 带有 `userId` 类型编号, tsoa 将拒绝通过, 即此处为_ string_ 。
同样地,如果想要接受带有一定图案的_string_,可以使用JSON Schema注释来完成. 你可以多学点 [here](#what-s-next)。 。 。 。

tsoa-next 支持通常的路径、查询、标题和身体装饰器,也支持多部分形式数据装饰器,例如 [`@FormField()`](./reference/tsoa-next/functions/FormField.md), (中文(简体) ). [`@UploadedFile()`](./reference/tsoa-next/functions/UploadedFile.md),以及 [`@UploadedFiles()`](./reference/tsoa-next/functions/UploadedFiles.md),加上仅运行时注入参数,例如 [`@Request()`](./reference/tsoa-next/functions/Request.md) 和 [`@Res()`](./reference/tsoa-next/functions/Res.md)。 。 。 。

::: tip
如果参数名称与 http 消息参数相等,您可以省略给装饰者的参数,否则您可以提供一个参数:

```ts
@Query('my-query') myQuery: string;
```

:::

可以找到所有装饰器的完整列表 [here](./decorators)。 。 。 。

::: warning 卡维特
总是使用命名导出( N)`export class C`)在控制器类上,以便 tsoa 正确捡起它。
默认导出( E)`export default class C`)目前不支持。
:::

## 创建我们的快递服务器

让我们现在创造一个 `app.ts` (单位:千美元) `server.ts` 这样的源目录中的文件 :

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

## 构建生成的文件

这时候你可能已经注意到 TypeScript 将找不到 `RegisterRoutes` 从 `build/routes`。 。 。 。
那是因为我们没有要求 tsoa 生成路径文件并 OpenAPI 请看
让我们现在做:

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

现在您生成的文件应该已经创建并可以编译 TypeScript 启动您的服务器 :

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

您可能想要将这些脚本添加到您的 `package.json` 在这一点上:

```js
"main": "build/src/server.js",
"scripts": {
  "build": "tsoa spec-and-routes && tsc",
  "start": "node build/src/server.js"
},
```

:::

## 接下来呢?

- 手动引用 `tsc` 和 `tsoa routes` 在开发中并不十分方便。
- 检查我们的第一个 OpenAPI 通过提供最新版本的 SwaggerUI 在开发期间。

我们可以利用 [live reloading](./live-reloading)。 。 。 。

- 使用适当的方法改进我们对验证错误的反应 [error handling](./error-handling)- 使用 [Descriptions](./descriptions), (中文(简体) ). [示例](./examples) 和 [Annotations](./annotations) 高级审定和更好的文件编制
