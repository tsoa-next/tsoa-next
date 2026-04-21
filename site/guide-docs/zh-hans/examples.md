---
lastUpdated: 2026-04-17T20:53:42.040Z
---
# 实例

相关API参考: [`@Example`](./reference/tsoa-next/functions/Example.md), (中文(简体) ). [`@Response`](./reference/tsoa-next/functions/Response.md), (中文(简体) ). [`@SuccessResponse`](./reference/tsoa-next/functions/SuccessResponse.md),以及 [`Controller`](./reference/tsoa-next/classes/Controller.md)。 。 。 。

## 可运行示例应用程序

对于端到端的样本应用和框架特定设置,请使用伴奏 [tsoa-next/playground](https://github.com/tsoa-next/playground) 仓库。
那套套房是专供奔跑的 `tsoa-next` 将多个服务器集成的情景作为实例添加到那里。

本指南的重点是: OpenAPI 实例 JSDoc 代码库内的例子元数据。
想要完整的应用程序时,可以到达游乐场重播,可以克隆、安装和运行。

研究之后的研究表明,实例是学习新的API的关键部分([1](https://www.cs.mcgill.ca/~martin/papers/software2009a.pdf), (中文(简体) ). [2](https://sigdoc.acm.org/cdq/how-developers-use-api-documentation-an-observation-study/), (中文(简体) ). [3](https://ase.cpsc.ucalgary.ca/wp-content/uploads/2018/05/A-Study-of-the-Effectiveness-of-Usage-Examples-in-REST-API-Documentation.pdf)) (中文(简体) ).
虽然某些问题,比如类型不匹配,可以通过从JSON Schema中推断出实例来避免(比如实例) SwaggerUI 如果我们自己提供某些例子,

\* 这也是有限的,即图案会被忽略,只要每次发送字符串"字符串",如果该字符串真的带有意义,就会有些不尽人意.

::: tip
tsoa 不检查您 JSDoc 实例。
错误的示例不会破坏您的汇编, 因为 OpenAPI [explicitly allows anything](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.3.md#fixed-fields-20)。 。 。 。
你也许也只是想展示一下 tsoa'验证 : smirk :

我们建议用电线
(我们爱) [Spectral](https://stoplight.io/open-source/spectral)为了保证您的规格不只是正确,
但不包含 [descriptions](./descriptions) 和正确的例子。
:::

::: warning
OpenAPI 2 只允许每个模型/财产/参数有一个实例。
如果您定义了多个示例 OpenAPI 2,二. tsoa 将只应用第一个作为值。
OpenAPI 现在支持三个例子!
:::

## 反应实例

为了提供一个例子, tsoa 提议 [`@Example()`](./reference/tsoa-next/functions/Example.md) 装饰师.

::: tip
提供您正在将示例写成类型参数的类型 `T` 改为

```ts
@Example<T>(example: T)
```

不需要,但可能会帮助你捕捉到虫子。
:::

此装饰用于指定默认响应的响应,
但您可以添加其他响应的示例([`@Response()`](./reference/tsoa-next/functions/Response.md),用于补充反应,往往是由下列因素引起的: [errors](./error-handling#specifying-error-response-types-for-openapi) 也提供了第三个论点。

### 默认响应

```ts {3-9}
@Route("users")
export class UsersController extends Controller {
  @Example<User>({
    id: "52907745-7672-470e-a803-a2f8feb52944",
    name: "tsoa user",
    email: "hello@tsoa.com",
    phoneNumbers: [],
    status: "Happy",
  })
  @Get("{userId}")
  public async getUser(
    @Path() userId: UUID,
    @Query() name: string
  ): Promise<User> {
    return new UsersService().get(userId, name);
  }
}
```

### 其他答复

```ts {9-17}
@Route("users")
export class UsersController extends Controller {
  /**
   * Add a new user. Remember that the demo API will not persist this data.
   *
   */
  @Post()
  @SuccessResponse("201", "Created") // Custom success response
  @Response<ValidateErrorJSON>(422, "Validation Failed", {
    message: "Validation failed",
    details: {
      requestBody: {
        message: "id is an excess property and therefore not allowed",
        value: "52907745-7672-470e-a803-a2f8feb52944",
      },
    },
  })
  public async createUser(
    @Body() requestBody: UserCreationParams
  ): Promise<void> {
    this.setStatus(201); // set return status 201
    new UsersService().create(requestBody);
    return;
  }
}
```

## 参数示例

::: warning
如果您设置了类型参考(类型别名、界面或类),您可能会看到一个实例。
然而,由于它会变成一个参考(_\$ref_) 的"计划",这个例子必须被忽略,
因为任何属性都放置在 \\ $ref_ 旁边 (单位:千美元)OpenAPI必须忽略链接到 UserCreationPrams schema 的机制 。

更多信息请查看 [OpenAPI Specification](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.3.md#schemaObject) 和 [JSON Schema Core](https://tools.ietf.org/html/draft-wright-json-schema-00#section-7)

:::

```ts {4-5}
@Route("users")
export class UsersController extends Controller {
  /**
   * @example userId "52907745-7672-470e-a803-a2f8feb52944"
   * @example userId "e77ef155-bd12-46f0-8559-bf55f6dd4c63"
   */
  @Get("{userId}")
  public async getUser(
    @Path() userId: UUID,
    @Query() name: string
  ): Promise<User> {
    return new UsersService().get(userId, name);
  }
}
```

## 范例

::: warning
两者 OpenAPI 2和3只支持模型中的单例.
如果使用一个以上的例子,它只会应用第一个例子.
:::

```ts {5}
/**
 * Stringified UUIDv4.
 * See [RFC 4112](https://tools.ietf.org/html/rfc4122)
 * @pattern [0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}
 * @example "52907745-7672-470e-a803-a2f8feb52944"
 */
export type UUID = string;
```

::: warning
任何涉及对象或阵列的示例都应该是正确的JSON格式.
否则 tsoa 将会在生成 OAS 时丢出错误 。
:::

```ts {6-10}
/**
 * User objects allow you to associate actions performed in the system with the user that performed them.
 * The User object contains common information across every user in the system regardless of status and role.
 *
 *
 * @example {
 *  "id": "52907745-7672-470e-a803-a2f8feb52944",
 *  "name": "John Doe",
 *  "phoneNumbers": []
 * }
 */
export interface User {
  id: UUID;

  /**
   * The email the user used to register his account
   */
  email?: string;

  name: string;
  status?: "Happy" | "Sad";
  phoneNumbers: string[];
}
```

## 属性示例

::: warning
你可能会看到一个例子 `id` 如果你设置了一个。
然而,由于它会变成一个参考 UUID 计划,必须忽略这个例子,
因为任何属性都放置在 \\ $ref_ 旁边 (单位:千美元)OpenAPI链接到 UUID 计划)必须被忽略.

更多信息请查看 [OpenAPI Specification](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.3.md#schemaObject) 和 [JSON Schema Core](https://tools.ietf.org/html/draft-wright-json-schema-00#section-7)

:::

```ts {11-13}
export interface User {
  id: UUID;

  /**
   * The email the user used to register his account
   */
  email?: string;

  name: string;

  /**
   * @example "Happy"
   */
  status?: "Happy" | "Sad";

  phoneNumbers: string[];
}
```
