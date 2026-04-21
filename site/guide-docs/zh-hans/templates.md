---
lastUpdated: 2026-03-29T19:17:04.856Z
---
# 覆盖路由模板

如果你想要这个功能 tsoa 不提供,那么一个强大的(但可能代价高昂的)方法是提供 tsoa 带有自定义处理栏模板,用于生成路由.ts文件。

::: danger
使用自定义模板意味着您将有一个更困难的时间迁移到新版本的 tsoa 由于您的模板与 tsoa 内出. 因此,获得最新和最好的特征 tsoa中,请通过选择选中的模板使用其中的模板 `"middleware"` (即"koa","express",或"hapi")和省略 `"middlewareTemplate"`。 。 。 。
:::

好,但你为什么想要推翻路由模板? _ 编号

- 你在使用我们尚不支持的服务器框架吗? 如果是,则 [please open an issue first](https://github.com/tsoa-next/tsoa-next/issues)。 。 。 。 很可能我们会尝试接受您的自定义模板作为新的标准选项之一. 如果我们不能支持新的框架,那么我们将推荐一个自定义的路由模板.
- 你有特别的要求吗? 你是否已经打开了问题 并拥有 tsoa 维护者选择不支持此特性吗 ? 然后一个自定义模板可以解决你的需要。

路由模板由预定义的手柄条模板生成. 您可以更改和定义要使用的模板
通过定义它 在您的 tsoa.json配置图. 路由路径基于您定义的中间软件类型生成.

```js
{
  "entryFile": "...",
  "spec": {
    ...
  },
  "routes": {
    "routesDir": "...",
    "middleware": "express",
    "middlewareTemplate": "custom-template.ts",
    ...
  }
}
```
