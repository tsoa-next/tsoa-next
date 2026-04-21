---
lastUpdated: 2026-04-17T20:53:42.040Z
---
# 上传文件

相关API参考: [`File`](./reference/tsoa-next/interfaces/File.md), (中文(简体) ). [`@FormField`](./reference/tsoa-next/functions/FormField.md), (中文(简体) ). [`@UploadedFile`](./reference/tsoa-next/functions/UploadedFile.md),以及 [`@UploadedFiles`](./reference/tsoa-next/functions/UploadedFiles.md)。 。 。 。

## 安装运行时间上传中间软件

对于 Express数字 :

::: code-group

```bash [npm]
npm install multer
npm install -D @types/multer
```

```bash [pnpm]
pnpm add multer
pnpm add -D @types/multer
```

```bash [yarn]
yarn add multer
yarn add -D @types/multer
```

:::

对于 Koa数字 :

::: code-group

```bash [npm]
npm install @koa/multer
```

```bash [pnpm]
pnpm add @koa/multer
```

```bash [yarn]
yarn add @koa/multer
```

:::

## 使用 `@UploadedFile` 编号 : `@UploadedFiles` 装饰

内置上传装饰器使用 tsoa-next已导出 [`File`](./reference/tsoa-next/interfaces/File.md) 接口。
使用 [`@FormField()`](./reference/tsoa-next/functions/FormField.md) 用于在上传的同时到达的非文件多段字段。

```ts
import { Controller, File, FormField, Post, Route, UploadedFile, UploadedFiles } from 'tsoa-next'

@Route('files')
export class FilesController extends Controller {
  @Post('single')
  public async uploadSingle(@FormField() title: string, @UploadedFile('asset') asset: File): Promise<{ title: string; originalName: string }> {
    return {
      title,
      originalName: asset.originalname,
    }
  }

  @Post('many')
  public async uploadMany(@UploadedFiles('assets') assets: File[]): Promise<{ count: number }> {
    return {
      count: assets.length,
    }
  }
}
```

## 默认存储行为

已生成 Express 和 Koa 当您使用上传装饰器时, 路由会创建默认的 multer 实例 。
默认情况下, 该实例会将上传的文件保存在内存中 。

如果您想要上传到磁盘或由自定义的 multer 配置处理, 请将自己的 multer 实例传递到 `RegisterRoutes(...)`。 。 。 。

## 自定义 multer 配置

Express 示例:

```ts
import express, { json, urlencoded } from 'express'
import multer from 'multer'
import { RegisterRoutes } from '../build/routes'

const app = express()

app.use(urlencoded({ extended: true }))
app.use(json())

RegisterRoutes(app, {
  multer: multer({ dest: 'uploads/' }),
})
```

Koa 示例:

```ts
import Router from '@koa/router'
import multer from '@koa/multer'
import { RegisterRoutes } from '../build/routes'

const router = new Router()

RegisterRoutes(router, {
  multer: multer({ dest: 'uploads/' }),
})
```

上层也有遗产 `multerOpts` 配置字段为 `tsoa.json`但它已经贬值了
最好把混凝土混凝土切入 `RegisterRoutes(...)`。 。 。 。

## 手动多段处理

如果您选择绕行 `@UploadedFile(...)` 并使用 `@Request()`,您还负责记录请求的形状。
在这种情况下,将多部分请求的细节合并到 `spec.spec` 内 `tsoa.json` 所以产生的 OpenAPI 文档仍然准确地描述端点。
