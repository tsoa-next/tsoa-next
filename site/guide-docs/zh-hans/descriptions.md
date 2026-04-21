---
lastUpdated: 2026-04-20T00:28:55.920Z
---
# 说明

虽然 tsoa 可以从你那里提取很多信息 TypeScript 类型说明,这只能让我们 迄今记录我们的代码。
为了忠实于我们避免代码重复的努力, tsoa 用途 JSDoc 当我们想要描述不属于类型系统的信息时,则有基于说明。

::: tip
tsoa 不检查是否提供了描述。

我们建议用电线
(我们爱) [Spectral](https://stoplight.io/open-source/spectral)为了保证您的规格不只是正确,
但也包含描述和正确 [examples](./examples)。 。 。 。
:::

一个很好的例子是描述。 你可能同意, 端点描述 无论是在文本或马克下 非常有用 消费者得到更好的 API 端点感 通过一个简短的描述 作为提供的文件的一部分。
但像你这样的开发者也从中获益 JSDoc,在您可能不熟悉的方法上徘徊时,经常直接显示在您的编辑器上。
搅拌器 : tsoa 这两件事都是可能的

## 终点说明

最有用的一种描述是方法描述,或者在HTTP术语中,端点描述.

```ts {3-6}
@Route("users")
export class UsersController extends Controller {
  /**
   * Retrieves the details of an existing user.
   * Supply the unique user ID from either and receive corresponding user details.
   */
  @Get("{userId}")
  public async getUser(
    @Path() userId: number,
    @Query() name?: string
  ): Promise<User> {
    return new UsersService().get(userId, name);
  }
}
```

通过在方法名称上徘徊,我们已经可以看到我们的编辑的结果:

![Method description](/docs-images/jsdoc-method.png)

但这只是一半的好处:

![SwaggerUI endpoint descriptions](/docs-images/swui-endpoint-description.png)

美洲国家组织也反映了这种变化,从这一方面提供的文件也反映了这种变化。

## 参数描述

但为什么停下来? [JSDoc also offers parameter descriptions](https://jsdoc.app/tags-param.html),让我们看看在行动中:

```ts {6,7}
@Route("users")
export class UsersController extends Controller {
  /**
   * Retrieves the details of an existing user.
   * Supply the unique user ID from either and receive corresponding user details.
   * @param userId The user's identifier
   * @param name Provide a username to display
   */
  @Get("{userId}")
  public async getUser(
    @Path() userId: number,
    @Query() name?: string
  ): Promise<User> {
    return new UsersService().get(userId, name);
  }
}
```

## 示范说明

我们还可以在模型层面(模型是界面或类或类型别名)提供描述:

```ts {1-6}
/**
 * User objects allow you to associate actions performed
 * in the system with the user that performed them.
 * The User object contains common information across
 * every user in the system regardless of status and role.
 */
export interface User {
  id: number;
  email: string;
  name: string;
  status?: "Happy" | "Sad";
  phoneNumbers: string[];
}
```

::: tip
随着类型异名的引入 tsoa 3,你可以使用这个作为非常强大的图案.
让我们假设一下我们的API处理 a 确定的用户 UUID。 。 。 。
通常,uuids是作为字符串发送的,然而,理想的是,我们希望确保当我们想要uuids时,我们说uuid.
说到这里,重复整个代码的描述是很多努力,让我们看看怎样才能做得更好:

```ts {1,2,3,4,5}
/**
 * Stringified UUIDv4.
 * See [RFC 4112](https://tools.ietf.org/html/rfc4122)
 * @pattern [0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}
 * @format uuid
 */
export type UUID = string;
```

<details><summary>我们可以在用户中重复使用</summary>

```ts
/**
 * User objects allow you to associate actions performed in the system with the user that performed them.
 * The User object contains common information across every user in the system regardless of status and role.
 */
export interface User {
  id: UUID;
  email: string;
  name: string;
  status?: "Happy" | "Sad";
  phoneNumbers: string[];
}
```

</details>

现在,我们定义 `UUID` 作为可重复使用的别名类型。
现代编辑器会在参考文献上徘徊时 很好地显示信息文本

![JSDoc Type Alias](/docs-images/jsdoc-alias.png)

tsoa 将它翻译为可重复使用的组件,每次使用该类型别名时都可以引用:

<details><summary>OpenAPI 光谱</summary>

```yaml
components:
  schemas:
    UUID:
      type: string
      description: "Stringified UUIDv4.\nSee [RFC 4112](https://tools.ietf.org/html/rfc4122)"
      pattern: "[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}"
    User:
      description: "User objects allow you to associate actions performed in the system with the user that performed them.\nThe User object contains common information across every user in the system regardless of status and role."
      properties:
        id:
          $ref: "#/components/schemas/UUID"
```

</details>

当它变成这样时:

<details>

![Rendered](/docs-images/swui-alias.png)

</details>

<br>
:::

## 财产说明

::: warning
你可能会看到一个描述 `id` 如果你设置了一个。
然而,由于它会变成一个参考 UUID 计划,必须忽略描述,
因为任何属性都放置在 \\ $ref_ 旁边 (单位:千美元)OpenAPI链接到 UUID 计划)必须被忽略.

更多信息请查看 [OpenAPI Specification](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.3.md#schemaObject) 和 [JSON Schema Core](https://tools.ietf.org/html/draft-wright-json-schema-00#section-7)

:::

```ts {8,9,10}
/**
 * User objects allow you to associate actions performed in the system with the user that performed them.
 * The User object contains common information across every user in the system regardless of status and role.
 */
export interface User {
  id: UUID;

  /**
   * The email the user used to register his account
   */
  email: string;

  name: string;
  status?: "Happy" | "Sad";
  phoneNumbers: string[];
}
```

## 摘要

tsoa 使用通过 JSDoc ![`@summary`](https://jsdoc.app/tags-summary.html) 注释并将作为摘要使用 OpenAPI 医生 :

```ts {5}
  /**
   * A very long, verbose, wordy, long-winded, tedious, verbacious, tautological,
   * profuse, expansive, enthusiastic, redundant, flowery, eloquent, articulate,
   * loquacious, garrulous, chatty, extended, babbling description.
   * @summary A concise summary.
   */
  @Get('SummaryMethod')
  public async summaryMethod(): Promise<TestModel> {
    return new ModelService().getModel();
  }
```
