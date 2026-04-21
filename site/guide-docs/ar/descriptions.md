---
lastUpdated: 2026-04-20T00:28:55.920Z
---
# الوصف

بينما tsoa يمكن أن تستخرج الكثير من المعلومات من TypeScript شروح من النوع الذي لا يمكن إلا أن يحصل لنا حتى الآن من حيث توثيق رمزنا.
لكي نبقى متوافقين مع جهودنا لتجنب الازدواج الرمزي tsoa الاستخدامات JSDoc شروح قائمة كلما أردنا أن نصف المعلومات التي ليست جزءاً من النظام

::: tip
tsoa لا تفقد إذا كنت تقدم الأوصاف.

نوصي باستخدام مقبض
نحن نحب [Spectral](https://stoplight.io/open-source/spectral)لضمان أن مواصفاتك ليست صحيحة
ولكنه يتضمن أيضا وصفا وصحيحا [examples](./examples).
:::

ومن الأمثلة العظيمة على ذلك الوصف. من المحتمل أن توافق على أن الأوصاف النهائية إما في النص أو الإنهيار مفيدة جداً للمستهلكين
لكن المطورين مثلك يستفيدون أيضاً JSDocوالذي غالباً ما يظهر مباشرة في محررك عندما يخترق طريقة قد لا تكون على دراية بها
Spoiler: tsoa يجعل كل من هذه الأشياء ممكنة.

## وصف نقطة النهاية

One of the most useful kind of descriptions are method descriptions, or, in HTTP terminology, endpoint descriptions.

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

عن طريق التصفيق على اسم الطريقة، يمكننا أن نرى بالفعل النتيجة في محررنا:

![Method description](/docs-images/jsdoc-method.png)

ولكن هذا هو نصف الفائدة فقط:

![SwaggerUI endpoint descriptions](/docs-images/swui-endpoint-description.png)

وتعكس منظمة الدول الأمريكية هذا التغيير أيضا، وكذلك الوثائق المقدمة من تلك العينة!

## أوصاف البارامترات

لكن لماذا توقف هناك؟ [JSDoc also offers parameter descriptions](https://jsdoc.app/tags-param.html)دعونا نرى ذلك في العمل:

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

## الأوصاف النموذجية

ويمكننا أيضا أن نقدم أوصافا على مستوى النموذج (النموذج هو واجهات أو فصول أو أسماء من النوع):

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
مع إدخال نوع &quot; أليسا &quot; في tsoa 3، يمكنك استخدام هذا على أنه نمط قوي جدا.
دعنا نفترض لثانية أن مساعدنا يعمل مستخدمون تحددهم UUID.
عادة، يتم إرسال الأوويد كسلاسل، على أي حال، مثاليا، نريد أن نتأكّد من أن نقول شؤم عندما نريد شوايد.
هذا ما قاله، تكرار الوصف في جميع أنحاء الرمز هو الكثير من الجهد، دعونا نرى كيف يمكننا أن نفعل أفضل:

```ts {1,2,3,4,5}
/**
 * Stringified UUIDv4.
 * See [RFC 4112](https://tools.ietf.org/html/rfc4122)
 * @pattern [0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}
 * @format uuid
 */
export type UUID = string;
```

<details><summary>يمكننا إعادة استخدام ذلك في مستعملنا</summary>

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

الآن، نحن نحدد `UUID` كنوع قابل للإستعمال
المحررون الحديثون سيعرضون بشكل لطيف نص المعلومات عندما نقفز على المراجع

![JSDoc Type Alias](/docs-images/jsdoc-alias.png)

tsoa سيترجم هذا إلى عنصر قابل لإعادة الاستخدام يمكن الرجوع إليه في كل مرة تستخدم فيها هذا النوع من الأسماء المستعارة:

<details><summary>OpenAPI Spec</summary>

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

الذي سيبدو مثل هذا عندما يصبح

<details>

![Rendered](/docs-images/swui-alias.png)

</details>

<br>
:::

## وصف الممتلكات

::: warning
قد تتوقع أن ترى وصفاً `id` إذا وضعت واحدة.
مع ذلك، بما أنه سيتحول إلى إشارة إلى UUID يجب تجاهل الوصف
Since any properties that are placed next to _/$ref )أ(OpenAPIآلية للربط مع UUID يجب تجاهله

لمزيد من المعلومات، تحقق من الأجزاء ذات الصلة من [OpenAPI Specification](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.3.md#schemaObject) و [JSON Schema Core](https://tools.ietf.org/html/draft-wright-json-schema-00#section-7)

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

## موجز

tsoa استخدام الأوصاف القصيرة المقدمة عن طريق JSDoc ![`@summary`](https://jsdoc.app/tags-summary.html) الشروح وستستخدمها كملخص في OpenAPI الطبيب:

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
