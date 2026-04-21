---
title: 常见问题
lang: zh-CN
lastUpdated: 2026-04-17T20:53:42.040Z
---

# 常见问题

## 我可以使用 OpenAPI 3 或 3.1，而不是 OpenAPI 2（原称 Swagger）吗？

可以。在你的 `tsoa.json` 文件中将 `spec.specVersion` 设置为 `3` 或 `3.1`。更多配置项请参见 [`Config`](./reference/tsoa-next/interfaces/Config.md) API 参考。

## 如何将 tsoa 用于 Koa、Hapi 或其他框架？

在你的 tsoa 配置中设置 `middleware` 属性。开箱即用支持 express、hapi 和 koa。
你也可以提供自定义模板，更多信息请查看[模板指南](./templates.md)。

## 如何确保运行时不会接收额外属性

默认 OpenAPI 允许模型有 [`additionalProperties`](https://swagger.io/docs/specification/data-models/dictionaries/)。 。 。 。 如果您想在运行时确保数据只有模型中定义的属性,请设置 `noImplicitAdditionalProperties` 选项在 [`Config`](./reference/tsoa-next/interfaces/Config.md) 改为: `"silently-remove-extras"` 或者说 `"throw-on-extras"`。 。 。 。
注意事项：

- 由于工作方式的性质,下列类型总是允许额外属性: 使用或使用
  - 这个 `any` 类型
  - 索引类型( 它明确允许额外的属性) 如 `export interface IStringToStringDictionary { [key: string] : string }`- 使用时 tsoa 对于现有的服务 有消费者...
  - 您必须在设定前通知消费者 `noImplicitAdditionalProperties` 改为 `"throw-on-extras"` 因为它将是一个突破性的改变(因为以前工作过的请求机构现在将出现错误)。
- 无论如何 `"noImplicitAdditionalProperties" : "silently-remove-extras"` 是遗产和新API的伟大选择(因为这反映了C#序列器和其他受欢迎的JSON序列器的行为).

## 处理重复的型号名称

如果有多个同名模型,可能会有错误表明存在多个匹配模型. 如果您希望指定一个类/介面为模型的"canonical"版本,请添加一个jsdoc元素标记为:

```ts
/**
 * @tsoaModel
 */
export interface MyModel {
  ...
}
```

## 我怎样才能从美洲国家组织得到最多?

现在你有了 OpenAPI 规格(OAS)(swagger.json),您可以使用各种惊人的工具生成文档,客户端SDKs,以及更多 [here](http://openapi.tools)。 。 。 。

## 验证大型数组( 超过 20 个元素) 时如何覆盖限制

默认 [Express](https://github.com/expressjs/express) 用途 [qs](https://github.com/ljharb/qs) 作为内部解析器, 且其对校验阵列中的20个元素有默认限制
要覆盖此选项, 您必须在表达式配置中添加以下配置 :

```ts
const app = express()

app.set('query parser', function (str) {
  return qs.parse(str, { arrayLimit: Infinity })
})

app.use(bodyParser.json())
app.use(Router())
```

请注意,你必须把它放在其他中间软件上。
