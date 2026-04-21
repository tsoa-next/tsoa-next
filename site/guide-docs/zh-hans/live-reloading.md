---
title: 实时重装
lang: zh-CN
lastUpdated: 2026-04-20T00:28:55.919Z
---

# 实时重装

::: warning 注
本指南的目标 [express](https://expressjs.com) 假设 `tsoa-next`当前支持策略 : Node.js 22岁或更新。
我们核实以往的LTS、目前的LTS和 Node vNext in CI. 页面存档备份,存于互联网档案馆.
以下例子包括: `npm`, (中文(简体) ). `pnpm`,以及 `yarn` 命令不同的变体。
我们假设你的设置和推荐的类似 [getting started](/zh-hans/getting-started)
:::

相关API参考: [`@SpecPath`](./reference/tsoa-next/functions/SpecPath.md), (中文(简体) ). [`SpecPathOptions`](./reference/tsoa-next/interfaces/SpecPathOptions.md), (中文(简体) ). [`SpecRequestContext`](./reference/tsoa-next/interfaces/SpecRequestContext.md),以及 [`SpecCacheHandler`](./reference/tsoa-next/interfaces/SpecCacheHandler.md)。 。 。 。

::: tip
我们会用 [nodemon](https://nodemon.io/) 和 [ts-node](https://github.com/TypeStrong/ts-node) 用于活式再装入,但任何允许我们连接到再装入进程的工具都会成功. 替代物可以是: `tsc -w` 并触发 `tsoa spec-and-routes` 使用 [`onchange`](https://www.npmjs.com/package/onchange)。 。 。 。
:::

我们将要谈论的:**

[[toc]]

## 重新装入代码

### 安装节点和 ts-node

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

### 创建 nodemon 配置

现在,让我们创造一个 `nodemon.json` 在我们工程的根文件夹中, 看起来像这样 :

```json
{
  "exec": "ts-node src/server.ts",
  "watch": ["src"],
  "ext": "ts"
}
```

### 添加 dev 脚本

让我们用您的软件包管理器自动启动此设置 `dev` 脚本( E)`npm run dev`, (中文(简体) ). `pnpm dev`,或 `yarn dev`)),并且,当我们到了它,添加 `build` 和 `start` 我们的指令 `package.json`数字 :

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

## 我们的开发者经验 `@SpecPath`

[`@SpecPath(...)`](./reference/tsoa-next/functions/SpecPath.md) 让控制器不读而显示活的光谱或 Docs 端点 `swagger.json` 或者说 `openapi.yaml` 根据请求时间从磁盘中删除。
这使得它非常适合开发工作流程,在那里,您希望生成的文档与您已经使用的同一控制器元数据保持同步。

### 安装 docs 用户界面

选择您想要使用的文档 UI 目标 :

- Express数字 : `npm i swagger-ui-express` 编号 : `pnpm add swagger-ui-express` 编号 : `yarn add swagger-ui-express`- Koa数字 : `npm i swagger-ui-koa` 编号 : `pnpm add swagger-ui-koa` 编号 : `yarn add swagger-ui-koa`- Hapi数字 : `npm i hapi-swagger` 编号 : `pnpm add hapi-swagger` 编号 : `yarn add hapi-swagger`- Redoc数字 : `npm i redoc` 编号 : `pnpm add redoc` 编号 : `yarn add redoc`- RapiDoc数字 : `npm i rapidoc` 编号 : `pnpm add rapidoc` 编号 : `yarn add rapidoc`

### 显示一个控制范围的文件端点

附加一个或多个 `@SpecPath(...)` 现有控制器的装饰 :

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

这给你:

- `GET /users/spec` 给 JSON 的
- `GET /users/openapi.yaml` 用于 YAML
- `GET /users/docs` 页:1 Swagger 用户

由于 Docs 端点来自与您路径相同的运行时元数据, 它在您编辑控制器和重运行时会保持当前状态 `tsoa spec-and-routes`。 。 。 。

### 检查文档

现在,当我们航行到 <a href="http://localhost:3000/users/docs" target="_blank" rel="noreferrer">当地托管人: 1:00/用户/文件</a>我们应该看到我们的API的当前反映。

![SwaggerUI](/docs-images/SwaggerUI.png)

### 通过 Swagger 用户

我们可以选择终点,点击"Try it out"按钮,通过填表提交一些数据.
当我们点击"Execute"时,这个请求会被发送到我们的服务器上,并将响应显示在表单下方.

![SwaggerUI Response](/docs-images/SwUi-Response.png)

### 其他内在目标

如果您喜欢不同的UI,请更改 `target` 选项 :

- `@SpecPath('docs', { target: 'redoc' })`- `@SpecPath('docs', { target: 'rapidoc' })`

如果您需要完全自定义的响应,请通过一个处理器进入 `target` 换句话说 您还可以添加 `cache` 和 `gate` 在同一选项对象中。
