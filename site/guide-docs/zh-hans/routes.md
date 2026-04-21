---
lastUpdated: 2026-04-17T20:53:42.041Z
---
# 正在使用生成的路线

相关API参考: [`Config`](./reference/tsoa-next/interfaces/Config.md) 和 [`@Route`](./reference/tsoa-next/functions/Route.md)。 。 。 。

你有两个选择 tsoa 用于创建自动生成的控制器 `routes.ts` 文档。

## 使用自动控制器发现

看得出来 `tsoa-next` 通过提供一个或多个选项来使用自动控制器发现 [minimatch globs](http://www.globtester.com/) 在顶层 `controllerPathGlobs` 区域 [`Config`](./reference/tsoa-next/interfaces/Config.md) 文件( 例如 `tsoa.json`) (中文(简体) ).

职业:

- 新开发者可以添加一个控制器而无需知道如何 tsoa 控制器的"爬行". 只要他们的控制器被你提供的光彩所抓住,控制器就会被添加到 OpenAPI 自动生成的文档 `routes.ts` 文档。

计数 :

- 它可能比其他明确进口办法略慢,因为 tsoa 需要扩展并加载所配置的软体。

从下面控制器的光滑图案可以看出,您可以提供多种光滑图案:

```js
{
  "entryFile": "...",
  "controllerPathGlobs": [
    "./dir-with-controllers/*",
    "./recursive-dir/**/*",
    "./custom-filerecursive-dir/**/*.controller.ts"
  ],
  "routes": {
    "routesDir": "...",
    "middleware": "..."
  }
}
```

## 手动告诉 tsoa 用于应用程序条目文件的控制器

如果你遗漏 `controllerPathGlobs`, (中文(简体) ). tsoa 能够爬行应用程序条目文件,并跟踪具有此功能的控制器导入 `@Route` 装饰师.

职业:

- 路由生成通常会更快 因为 tsoa 遵循您的明确进口, 而不是扩展阴影 。

计数 :

- 您团队中的新开发者可能会添加一个控制器, 而不理解为什么新控制器没有接触到路由器或路由器 OpenAPI 生成。 如果你觉得有问题,你最好 `controllerPathGlobs`。 。 。 。

```typescript
import * as methodOverride from 'method-override'
import * as express from 'express'
import * as bodyParser from 'body-parser'
import { RegisterRoutes } from './routes'

// ########################################################################
// controllers need to be referenced in order to get crawled by the generator
import './users/usersController'
// ########################################################################

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(methodOverride())

RegisterRoutes(app)

app.listen(3000)
```
