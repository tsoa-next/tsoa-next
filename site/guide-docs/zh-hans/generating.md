---
lastUpdated: 2026-04-17T20:53:42.041Z
---
# 生成路线和美洲组织

相关API参考: [`Config`](./reference/tsoa-next/interfaces/Config.md), (中文(简体) ). [`generateRoutes`](./reference/@tsoa-next/cli/functions/generateRoutes.md), (中文(简体) ). [`generateSpec`](./reference/@tsoa-next/cli/functions/generateSpec.md), (中文(简体) ). [`generateSpecAndRoutes`](./reference/@tsoa-next/cli/functions/generateSpecAndRoutes.md), (中文(简体) ). [`ExtendedRoutesConfig`](./reference/@tsoa-next/cli/interfaces/ExtendedRoutesConfig.md),以及 [`ExtendedSpecConfig`](./reference/@tsoa-next/cli/interfaces/ExtendedSpecConfig.md)。 。 。 。

## 使用 CLI

### 基本命令

```bash
# generate OAS
tsoa spec

# generate routes
tsoa routes

# discover config files beneath the current directory
tsoa discover

# discover config files beneath a path or glob
tsoa discover "packages/*"
```

### 选项

#### OpenAPI 规格(OAS)生成

```
Usage: tsoa spec [options]

Options:
   --configuration, -c  tsoa configuration file; default is tsoa.json in the working directory  [string]
   --discover  discover tsoa config files using a path or glob before running the command       [string]
   --host  API host                                                                             [string]
   --basePath  Base API path                                                                    [string]
```

#### 路由生成

```
Usage: tsoa routes [options]

Options:
  --configuration, -c  tsoa configuration file; default is tsoa.json in the working directory   [string]
  --discover  discover tsoa config files using a path or glob before running the command        [string]
  --basePath  Base API path                                                                     [string]
```

#### 配置发现

```
Usage: tsoa discover [pathOrGlob]
```

- `discover` 在提供的路径下搜索,或者在没有提供参数的情况下在当前的工作目录下搜索。
- Glob 输入被支持, 因此命令像 `tsoa discover "packages/*"` 或者说 `tsoa spec --discover "services/*"` 将首先扩展匹配根。
- 发现识别这些常规配置文件名:
  - `tsoa.json`  - `tsoa.yaml`  - `tsoa.yml`  - `tsoa.config.js`  - `tsoa.config.cjs`- `spec`, (中文(简体) ). `routes`,以及 `spec-and-routes` 可以在所有发现的配置中扇出 :

```bash
tsoa spec --discover "packages/*"
tsoa routes --discover "./services"
tsoa spec-and-routes --discover .
```

您可以找到 tsoa 配置文件 [here](./reference/tsoa-next/interfaces/Config.md)

用于配置对象的信息 (`tsoa.json`),您也可能有兴趣:

[`Config` interface reference](./reference/tsoa-next/interfaces/Config.md)

[Configuration sample](https://github.com/tsoa-next/tsoa-next/blob/main/tests/tsoa.json)

## 程序化

导入程序生成 API 从 `tsoa-next/cli`。 。 。 。 词根 `tsoa-next` 入站点只使用运行时间,应当用于装饰和运行时间帮助.

```typescript
import { generateRoutes, generateSpec, generateSpecAndRoutes, ExtendedRoutesConfig, ExtendedSpecConfig } from 'tsoa-next/cli'

;(async () => {
  const specOptions: ExtendedSpecConfig = {
    basePath: '/api',
    entryFile: './api/server.ts',
    specVersion: 3,
    outputDirectory: './api/dist',
    controllerPathGlobs: ['./routeControllers/**/*Controller.ts'],
  }

  const routeOptions: ExtendedRoutesConfig = {
    basePath: '/api',
    entryFile: './api/server.ts',
    routesDir: './api',
  }

  await generateSpec(specOptions)

  await generateRoutes(routeOptions)

  // Or generate both outputs from one shared metadata pass:
  await generateSpecAndRoutes({
    configuration: {
      entryFile: './api/server.ts',
      controllerPathGlobs: ['./routeControllers/**/*Controller.ts'],
      spec: {
        outputDirectory: './api/dist',
        specVersion: 3.1,
      },
      routes: {
        routesDir: './api',
      },
    },
  })
})()
```

** 注:**如果使用 tsoa 在方案方面,请注意: tsoa其方法(在罕见的情况下)可以改变小的和补丁释放. 不过如果你在用 tsoa 在.ts文件中,然后 TypeScript 将帮助您迁移到任何变化中。 我们保留这一权利,改变本质上属于我们内部的方法,以便我们能够继续为大多数用户提供增量价值(我们 CLI 用户)。 这个 CLI 然而,在一次主要发布期间,只能收到中断的更改。
