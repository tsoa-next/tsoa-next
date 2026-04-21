---
sidebarDepth: 1
lastUpdated: 2026-04-17T20:53:42.041Z
---

# 升级从 tsoa 2.5 国家

[Jump to the breaking changes](#breaking-changes)

> 历史注释:本指南中的牵引请求链接有意指向 [`lukeautry/tsoa`](https://github.com/lukeautry/tsoa),这些变化最初落地。

## 新特性

### 对类型别名的支持

这一发布伴随着对类型别名定义的恰当支持.

它们可以从简单的假想中找到

```ts
/**
 * A Word shall be a non-empty string
 * @minLength 1
 */
type Word = string
```

到更复杂的情景,如结合和别名的交叉

```ts
type IntersectionAlias = { value1: string; value2: string } & TypeAliasModel1

// or
type OneOrTwo = TypeAliasModel1 | TypeAliasModel2
```

或甚至通用型别名:

```ts
type GenericAlias<T> = T | string
type ForwardGenericAlias<T, U> = GenericAlias<U> | T
```

请注意,这意味着: tsoa 不仅生成规格(OpenAPI v3和Swagger2\*),但也会对照包括jsDoc注释在内的类型验证输入.

\* 我们可能无法生成某些情况 Swagger 2从你的 TypeScript, (中文(简体) ). tsoa 将记录警告,以便通知你们我们所知道的任何问题。

### 对映射类型的支持

> TypeScript 2.1 引入了绘图类型,这是对类型系统的有力补充。 本质上,映射类型允许您通过对属性类型的映射从已有类型中创建出新的类型. 现有类型中的每个属性都按照您指定的规则进行转换。 被转换的属性再构成新类型.
> 马略·舒尔茨 https://mariusschulz.com/blog/mapped-types-in-typescript

tsoa 现在与 ts 类型检查器合作解决映射类型 。 我们将积极尝试支持所有案例,但现在的测试套装只涵盖通用图型打字船,例如:

```ts
/**
 * Make all properties in T optional
 */
type Partial<T> = {
  [P in keyof T]?: T[P]
}

/**
 * Make all properties in T required
 */
type Required<T> = {
  [P in keyof T]-?: T[P]
}

/**
 * Make all properties in T readonly
 */
type Readonly<T> = {
  readonly [P in keyof T]: T[P]
}

/**
 * From T, pick a set of properties whose keys are in the union K
 */
type Pick<T, K extends keyof T> = {
  [P in K]: T[P]
}
```

### 对有条件类型的支持

截止2.8版, TypeScript 支持有条件的类型。 语法与ternary运算符非常相近,并且可以根据条件表达出2个(或更多)不同类型. 请参看 [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/advanced-types.html#conditional-types) 详细情况。

```ts
type Diff<T, U> = T extends U ? never : T // Remove types from T that are assignable to U
```

tsoa 现在与 ts 类型检查器合作解决条件类型。 我们将积极争取支持大多数案例,但是现在的测试套件只涵盖公用事业类型的打字船,例如:

```ts
/**
 * Exclude from T those types that are assignable to U
 */
type Exclude<T, U> = T extends U ? never : T

/**
 * Extract from T those types that are assignable to U
 */
type Extract<T, U> = T extends U ? T : never

/**
 * Exclude null and undefined from T
 */
type NonNullable<T> = T extends null | undefined ? never : T
```

### 组合和工具类型的支持

将绘图类型和有条件类型结合起来,就可产生强大的公用类型,如 `Omit` 类型。

```
/**
 * Construct a type with the properties of T except for those in type K.
 */
type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
```

### 支助 `Record<>` [\#662](https://github.com/lukeautry/tsoa/pull/662) (单位:千美元)[Eywek](https://github.com/Eywek)(中文(简体) ).

### 元素: 见 [\#594](https://github.com/lukeautry/tsoa/pull/594) 用于光谱和 [\#599](https://github.com/lukeautry/tsoa/pull/599) 和 [\#593](https://github.com/lukeautry/tsoa/pull/593)

### 无效关键词 : 见 [\#601](https://github.com/lukeautry/tsoa/pull/601)

### 在路径中使用结号分隔符而不是手镯的能力 [\#602](https://github.com/lukeautry/tsoa/pull/602)(单位:千美元)[itamarco](https://github.com/itamarco)(中文(简体) ).

### 添加参数/ 属性的示例支持 [\#616](https://github.com/lukeautry/tsoa/pull/616) (单位:千美元)[jfrconley](https://github.com/jfrconley)(中文(简体) ).

### 成就: 忽略类方法 [\#643](https://github.com/lukeautry/tsoa/pull/643) (单位:千美元)[Eywek](https://github.com/Eywek)(中文(简体) ).

### 成就:处理enum成员 [\#656](https://github.com/lukeautry/tsoa/pull/656) (单位:千美元)[Eywek](https://github.com/Eywek)(中文(简体) ).

### 处理索引类型 [\#636](https://github.com/lukeautry/tsoa/pull/636) (单位:千美元)[Eywek](https://github.com/Eywek)(中文(简体) ).

### 控件 `typeof` [\#635](https://github.com/lukeautry/tsoa/pull/635) (单位:千美元)[Eywek](https://github.com/Eywek)(中文(简体) ).

### `@format` 类型别名的支持 [\#620](https://github.com/lukeautry/tsoa/pull/620) (单位:千美元)[jfrconley](https://github.com/jfrconley)(中文(简体) ).

## 错误修正

- 在验证中正确传播字段名称 型号 [@fantapop](https://github.com/fantapop)

- 空白 Api 回复类型为文档 200 而非 204 [\#629](https://github.com/lukeautry/tsoa/pull/629) (单位:千美元)[WoH](https://github.com/WoH)(中文(简体) ).

- 校验 错误应当延伸 [\#661](https://github.com/lukeautry/tsoa/pull/661) (单位:千美元)[aldenquimby](https://github.com/aldenquimby)(中文(简体) ).

- 将koa路由器升级为 @koa/路由器, 修正类型错误 [\#646](https://github.com/lukeautry/tsoa/pull/646) (单位:千美元)[michaelbeaumont](https://github.com/michaelbeaumont)(中文(简体) ).
- 删除对象类型 [\#642](https://github.com/lukeautry/tsoa/pull/642) (单位:千美元)[dimitor115](https://github.com/dimitor115)(中文(简体) ).
- 修复在模型定义中添加静态属性 [\#639](https://github.com/lukeautry/tsoa/pull/639) (单位:千美元)[dimitor115](https://github.com/dimitor115)(中文(简体) ).

## 中断更改

### 无效对未定义

除非你声明要接受某种类型 `null`我们不再将您的可选属性标为 `nullable: true` 或者说 `x-nullable: true`。 。 。 。
这适用于验证,所以在发送时 `null` 而不是发送 `undefined` / 物体上没有属性是好的, 现在不再是了.
发送 `undefined` 而不是,也就是说。 `string | null` 亦被审定驳回.

### 命名

为了支持类型别名并避免名称冲突,生成的组件 schemas / 定义的名称可能已经改变(基因界面大多受到影响).
如果您依赖于从 tsoa这是一个突破性的变化。

因为 tsoa 支持过去某些类型的别名, 现在生成不同的定义, 这可能会打破您的代码 。
如果你依赖 tsoa 不正确支持类型别名以避免问题, 这可能会打破您的代码 。
谨慎行事,报告问题。

### 改进嵌入对象验证

见 [\#574](https://github.com/lukeautry/tsoa/pull/574) 和 [\#575](https://github.com/lukeautry/tsoa/pull/575)。 。 。 。
这些不应该是突破变化, 但因为它影响验证, 最好安全 而不是抱歉。

### 在未定义主机时更改默认行为 :

明确设置您的主机, 以防您想要绝对 urls 。 这对当时使用 OpenAPI 3,但它实际上带来了 tsoa 与我们如何处理 `host` 属性在 Swagger 2. 此前 OpenAPI 3个用户不得不通过 `null` 我们都觉得很奇怪 现在略去 `host` 会导致 tsoa 假设url应该是相对的。

### 删除字段错误中...

检测非法的额外属性时( 如果您正在使用) tsoa 设置 `additionalProperties: 'throw-on-extras'`),错误上的密钥将包含一个额外的点.

```js
{
  "TestModel..additionalProp: : {
    ...
  }
}
```

这已经固定了 关键是 `TestModel.additionalProp`。 。 。 。

### 使用 Spec 代替 Swagger (单位:千美元)`tsoa swagger` 暂时还可用,但最终将删除). [\#664](https://github.com/lukeautry/tsoa/pull/664) (单位:千美元)[WoH](https://github.com/WoH)(中文(简体) ).

```diff
Calling the tsoa command
- tsoa swagger
+ tsoa spec

- tsoa swagger-and-routes
+ tsoa spec-and-routes

Manually calling spec generation
- await generateSwaggerSpec(swaggerConfig, routesConfig, compilerOptions, config.ignore);
+ await generateSpec(openapiConfig, compilerOptions, config.ignore);
```

tsoa. 贾森:

```js
{
  "swagger": {}
}
```

变成

```js
{
  "spec": {}
}
```

- 将共享配置移动到顶层 [\#628](https://github.com/lukeautry/tsoa/pull/628) (单位:千美元)[WoH](https://github.com/WoH)(中文(简体) ).

与其重复配置并处理多起边缘案件,新的配置则简单得多.
配置设置,既会影响路线,也会影响 spec 现在位于配置对象的顶级.

```json
{
  "entryFile": "./tests/fixtures/express/server.ts",
  "noImplicitAdditionalProperties": "silently-remove-extras",
  "routes": {},
  "spec": {}
}
```

这意味着,如果您的设置不同(例如条目文件),您必须调用 `generateRoutes()` 和 `generateSpec()` 你自己来
请注意,这些方法现在有一个更简单的配置:

```diff
-    await generateSwaggerSpec(swaggerConfig, routesConfig, compilerOptions, config.ignore);
+    await generateSpec(openapiConfig, compilerOptions, config.ignore);
```

```diff
-    await generateRoutes(routesConfig, swaggerConfig, compilerOptions, config.ignore);
+    await generateRoutes(routesConfig, compilerOptions, config.ignore);
```

输入文件 属性现在可以设置在 swagger/ 路由上 结.

此外, 无非法附加品的布尔设置已被删除: # 503
有效的设置现在是: `'throw-on-extras' | 'silently-remove-extras' | 'ignore'`,其他一切归来 `'ignore'`。 。 。 。

** 关于参考,参见整个配置的TS接口 [here](./reference/tsoa-next/interfaces/Config.md)页:1

### TypeScript 工会现在作为 `anyOf` 内 OpenAPI [\#671](https://github.com/tsoa-next/tsoa-next/issues/671)
