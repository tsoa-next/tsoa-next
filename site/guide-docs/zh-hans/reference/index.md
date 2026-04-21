---
lastUpdated: 2026-04-20T23:51:24.440Z
---
<!-- This file is generated from README.template.MD by `npm run sync:readmes`. Do not edit directly. -->

<div align="center">
  <a href="https://tsoa-next.dev/" target="_blank" rel="noreferrer">
    <h1>
      <span style="display: inline-flex; align-items: center; gap: 0.35em; white-space: nowrap;">
        <img src="./_media/tsoa-next-logo-590.png" alt="tsoa-next logo" height="40" style="height: 1em; width: auto;" />
        <span>tsoa-next</span>
      </span>
    </h1>
  </a>
如此发声

OpenAPI- 使用 TypeScript 和 Node

[![build status](https://github.com/tsoa-next/tsoa-next/actions/workflows/runTestsOnPush.yml/badge.svg)](https://github.com/tsoa-next/tsoa-next/actions/workflows/runTestsOnPush.yml)
[![npm version](https://img.shields.io/npm/v/tsoa-next/latest)](https://www.npmjs.com/package/tsoa-next)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=tsoa-next_tsoa-next&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=tsoa-next_tsoa-next)

</div>

## 项目沿革

`tsoa-next` 继续原版 [`tsoa`](https://github.com/lukeautry/tsoa) 项目。
原储存库及其贡献者建立了 TypeScript-第一个和 OpenAPI- 这项工作的第一个基础。
如果历史释放说明或移徙参考文献仍然指向上游,则有意将其保存在原地。

## 目标

- TypeScript 作为您 API 唯一的真伪源的控制器和模型
- 一个有效的 OpenAPI (原为 Swagger) 2.0, 3.0,或 3.1 spec由您的控制器和模型生成,包括:
  - 路径(例如获取/用户)
  - 基于 TypeScript 接口(模型)
  - 参数/模型属性按要求标出或 TypeScript (例如我的财产? ) 字符串是可选的 OpenAPI 光谱)
  - jsDoc 支持对象描述( 多数其他元数据可以从 TypeScript 类型)
- 路由为中选择软件生成
  - Express, (中文(简体) ). Hapi,以及 Koa 目前支持的,其他中间软件可以使用简单的手提栏模板支持
  - 验证请求的有效载荷

## 理念

- 继续 TypeScript 可能时键入注释生成 API 元数据
- 如果常规类型说明不是表达元数据的适当方式,则使用装饰器
- 纯文本元数据使用jsdoc( 如端点描述)
- 尽量减少锅炉板
- 模型最好由接口(纯数据结构)来代表,但也可以由类别来代表
- 运行时间验证 tsoa-next 应尽量遵守生成的规格 OpenAPI 计划描述。 验证逻辑上的任何差异在生成时通过日志警告得到澄清 OpenAPI 规格(OAS)和/或路线.
  - 请注意,通过授权 OpenAPI 3.0或 3.1 您将不同验证逻辑的可能性最小化,因为较新的方案形状比 OpenAPI 2.0 (英语).

## 功能列表

- 生成 OpenAPI 直接取自您的 2. 0、 3.0 或 3.1 文件 TypeScript 控制器、模型和 JSDoc 评论。
- 处理 TypeScript 控制器和模型是路径、参数、计划、实例、标记和安全元数据的真实来源。
- 生成框架特定路由处理器 Express, (中文(简体) ). Koa,以及 Hapi,或自行提供 Handlebars 自定义运行时间的模板 。
- 验证运行时的输入请求,同时进行可配置的强制和额外财产处理,使其与生成的图案保持一致。
- 显示控制器- 本地光谱端点 `@SpecPath(...)` 不在请求时间读取本地磁盘生成的光谱文件。
- 服务内置 `json`, (中文(简体) ). `yaml`, (中文(简体) ). `swagger`, (中文(简体) ). `redoc`,以及 `rapidoc` spec 目标, 可用时将 docs UI 软件包作为可选的同位素装入懒惰 。
- 附加多个 `@SpecPath(...)` 只要解开的路径是独一无二的,就给同一个控制器装饰.
- 缓存内置或自定义光谱响应 `'none'`,正在处理中 `'memory'`,或可读取字符串或流的自定义缓存处理器。
- 也回来 `string` 或者说 `Readable` 来自自定义的回复 `@SpecPath(...)` 处理备案文件或下游整合。
- 使用 `@Validate(...)` 以授权运行时间验证支持外部计划库, 如 `zod`, (中文(简体) ). `joi`, (中文(简体) ). `yup`, (中文(简体) ). `superstruct`,或 `io-ts`。 。 。 。
- 通过生成对象接受的可选验证背景自定义验证翻译和失败格式 `RegisterRoutes(...)` 函数。
- 支持认证钩,依赖注入,打出替代响应器,文件上传,自定义中间软件,以及自定义验证工作流程.
- 使用 `tsoa` CLI ,或调用程序 API `tsoa-next/cli`。 。 。 。
- 现代目标 Node.js 在CI中核实了以往长期服务、当前长期服务、以及 Node 接下来

## 快速开始

- 所需经费:
  - Node.js 22个或较新
  - npm 10个或较新
  - 我们核实以往的LTS、目前的LTS和 Node 在 CI 中的 vNext
- [文档](https://tsoa-next.dev/)
- [API 参考](https://tsoa-next.dev/reference/)
- [入门指南](https://tsoa-next.dev/getting-started)

## 包导出

- 导入装饰器、运行时帮助器和生成路由支持 `tsoa-next`
- 导入程序生成 API 从 `tsoa-next/cli`
- 使用 `tsoa` 二进制 CLI 生成命令

## 示例

查看[指南](https://tsoa-next.dev/)

使用配套的 [playground 仓库](https://github.com/tsoa-next/playground) 获取可运行的示例应用和面向服务器的场景。

在[测试](https://github.com/tsoa-next/tsoa-next/tree/main/tests/fixtures/controllers)中查看示例控制器

在[测试](https://github.com/tsoa-next/tsoa-next/blob/main/tests/fixtures/testModel.ts)中查看示例模型

## 需要帮助

### 贡献代码

如需贡献代码（通过 PR），请先阅读[贡献指南](https://github.com/tsoa-next/tsoa-next/blob/main/docs/CONTRIBUTING.md)
