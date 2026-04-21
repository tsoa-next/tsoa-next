---
lastUpdated: 2026-03-22T05:01:23.357Z
---
# JSON 司马/ tsoa 关键词说明

在引擎盖下 OpenAPI 所有数据模型规格都严重依赖JSON Schema Draft 00。
贾森 Schema Draft 00 定义了未执行的数据类型 TypeScript。 。 。 。
一个伟大的例子是整数。
如果我们想传达一个数字必须是整数,
tsoa 将在美洲国家组织内对此作出具体规定,并据此核准收到的请求。

::: warning
与往常一样,
:::

总的来说, JSDoc 每次标记都非常相似:

```
@<keyword> <argument>* <rejectionMessage>?
```

实例:

```typescript {3,4,8,12}
interface CustomerDto {
    /**
     * @isInt we would kindly ask you to provide a number here
     * @minimum 18 minimum age is 18
     */
    age: number;
    /**
     * @minItems 1 at least 1 category is required
     */
    tags: string[];
    /**
     * @pattern ^(.+)@(.+)$ please provide correct email
     */
    email: string;
}
```

::: tip
对于参数,使用 `@<keyword> <paramName> <argument>* <rejectionMessage>?` 语法 JSDoc (类似于 [descriptions](#parameter-descriptions) 或者说 [examples](#parameter-examples)(中文(简体) ).
:::

## 支持的关键词列表( 有参数)

[Click here for the list of keywords supported by OpenAPI 3](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.3.md#properties)

### 常规

- `@default`- `@format`

::: danger
格式一般不验证,但 `format: date(time)`,将自动生成 TS 类型 `Date`。 。 。 。
:::

### 日期

- `@isDateTime <errMsg>` 用于设置自定义错误消息
- `@isDate <errMsg>` 用于设置自定义错误消息
- `@minDate <errMsg>`- `@maxDate <errMsg>`

### 数字

- `@isInt <errMsg>` 页:1tsoa 特殊** 因为TS不知道整数是一种类型
- `@isFloat <errMsg>` 页:1tsoa 特殊** 因为TS不知道漂浮是一种类型
- `@isLong <errMsg>`- `@isDouble <errMsg>`- `@minimum <number> <errMsg>`- `@maximum <number> <errMsg>`- `@exclusiveMinimum <number> <errMsg>`- `@exclusiveMaximum <number> <errMsg>`

对于生成的光谱, Swagger 2.0和 2. OpenAPI 3.0 弹出布尔 `exclusiveMinimum` 编号 : `exclusiveMaximum` 随同修改 `minimum` 编号 : `maximum`时 OpenAPI 3.1 输出数字 `exclusiveMinimum` 编号 : `exclusiveMaximum` 直接值。

### 字符串

- `@isString <errMsg>` 用于设置自定义错误消息
- `@minLength <number> <errMsg>`- `@maxLength <number> <errMsg>`- `@pattern <regex> <errMsg>`

### 阵列

- `@isArray <errMsg>` 用于设置自定义错误消息
- `@minItems <number> <errMsg>`- `@maxItems <number> <errMsg>`- `@uniqueItems <errMsg>`

### 布尔

- `@isBoolean <errMsg>` 用于设置自定义错误消息
