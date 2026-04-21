---
lastUpdated: 2026-04-17T20:53:42.040Z
---
# أمثلة

المرجع ذو الصلة بالطلب: [`@Example`](./reference/tsoa-next/functions/Example.md).. [`@Response`](./reference/tsoa-next/functions/Response.md).. [`@SuccessResponse`](./reference/tsoa-next/functions/SuccessResponse.md)و [`Controller`](./reference/tsoa-next/classes/Controller.md).

## تطبيقات قابلة للتنفيذ

فيما يتعلق بتطبيقات العينات النهائية والتجهيزات الخاصة بالإطار، استخدام الرفيق [tsoa-next/playground](https://github.com/tsoa-next/playground) مستودع
هذا الاسترداد هو المنزل المكرس للهرب `tsoa-next` ويضاف إلى ذلك سيناريوهات عبر عمليات التكامل المتعددة للخواديم كمثال على ذلك.

يركز هذا الدليل على OpenAPI أمثلة وأمثلة JSDoc على سبيل المثال البيانات الفوقية داخل قاعدة بيانات
تصل إلى ساحة اللعب عندما تريد تطبيق كامل يمكنك إستنساخه، تركيبه، والهرب

وتبين الدراسة التي أجريت بعد الدراسة أن الأمثلة تشكل جزءاً حاسماً من تعلم مؤشرات الأداء الجديدة (المنهج الدراسي الجديد)[1](https://www.cs.mcgill.ca/~martin/papers/software2009a.pdf).. [2](https://sigdoc.acm.org/cdq/how-developers-use-api-documentation-an-observation-study/).. [3](https://ase.cpsc.ucalgary.ca/wp-content/uploads/2018/05/A-Study-of-the-Effectiveness-of-Usage-Examples-in-REST-API-Documentation.pdf))
While certain issues, like type mismatches can be avoided by inferring examples from the JSON Schema (like the examples SwaggerUI يولد تلقائياً، غالباً ما يكون أكثر ملاءمة لو قدمنا بعض الأمثلة بأنفسنا

* والذي هو محدود أيضاً، أي الأنماط سوف يتم تجاهلها، وفقط إرسال سلسلة "تدريب" في كل مرة هو غير مثالي إلى حد ما إذا كان هذا الخيط يحمل معنى.

::: tip
tsoa لا تدقق JSDoc أمثلة.
الأمثلة الخاطئة لن تكسر تجميعك OpenAPI [explicitly allows anything](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.3.md#fixed-fields-20).
قد ترغب أيضاً في إظهار tsoaالمصادقة:

نوصي باستخدام مقبض
نحن نحب [Spectral](https://stoplight.io/open-source/spectral)لضمان أن مواصفاتك ليست صحيحة
ولكنها تحتوي أيضا [descriptions](./descriptions) وأمثلة صحيحة
:::

::: warning
OpenAPI )٢( لا يسمح إلا بمثال واحد لكل نموذج/منتج/مكافئ.
إذا عرفت أكثر من مثال واحد OpenAPI 2 tsoa سيطبق الأول فقط كقيمة
OpenAPI 3 أمثلة مدعومة الآن!
:::

## أمثلة على الردود

وبغية تقديم مثال على ذلك، tsoa عروض [`@Example()`](./reference/tsoa-next/functions/Example.md) ديكور

::: tip
تقديم النوع الذي تكتبه كحجة من النوع `T` إلى

```ts
@Example<T>(example: T)
```

ليس ضرورياً، لكن قد يساعدك في القبض على الحشرات
:::

ويستخدم هذا المصمم لتحديد الرد على التقصير،
ولكن يمكنك أن تضيف أمثلة على ردود أخرى.[`@Response()`](./reference/tsoa-next/functions/Response.md)مستعملة في استجابات إضافية، كثيرا ما يكون سببها [errors](./error-handling#specifying-error-response-types-for-openapi) عن طريق تقديم هذه الحجج الثالثة أيضا.

### الرد الافتراضي

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

### الردود الإضافية

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

## نماذج البارامترات

::: warning
قد تتوقّع أن ترى مثالاً على إشارة من نوع ما (إلى نوع من الأسماء المستعارة أو الواجهة أو الصف) إذا وضعت واحداً
على أي حال، بما أنه سيتحول إلى إشارة إلى الشيمة يجب تجاهل المثال
Since any properties that are placed next to _/$ref )أ(OpenAPIلا بدّ من تجاهل آلية الربط مع خدّاس المُستخدمين.

لمزيد من المعلومات، تحقق من الأجزاء ذات الصلة من [OpenAPI Specification](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.3.md#schemaObject) و [JSON Schema Core](https://tools.ietf.org/html/draft-wright-json-schema-00#section-7)

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

## أمثلة نموذجية

::: warning
كلاهما OpenAPI 2 و 3 يدعمان مثال واحد فقط في النموذج.
إذا كنت تستخدم أكثر من مثال واحد، انها سوف تطبق فقط أول واحد.
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
وينبغي أن يكون أي مثال ذي موضوع أو صفيفة في صورة صحيحة من الورقة المشتركة (JON-format).
وإلا tsoa سيلقي بالخطأ في الوقت الذي يولد فيه منظمة الدول الأمريكية
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

## أمثلة على الممتلكات

::: warning
قد تتوقعين رؤية مثال `id` إذا وضعت واحدة.
مع ذلك، بما أنه سيتحول إلى إشارة إلى UUID (شيما)، يجب تجاهل المثال
Since any properties that are placed next to _/$ref )أ(OpenAPIآلية للربط مع UUID يجب تجاهله

لمزيد من المعلومات، تحقق من الأجزاء ذات الصلة من [OpenAPI Specification](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.3.md#schemaObject) و [JSON Schema Core](https://tools.ietf.org/html/draft-wright-json-schema-00#section-7)

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
