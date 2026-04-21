---
title: معالجة الأخطاء
lang: ar
lastUpdated: 2026-04-20T00:28:55.924Z
---

# معالجة الأخطاء

::: warning مذكرة الامتثال
أهداف هذا الدليل [express](https://expressjs.com) ويفترض `tsoa-next`سياسة الدعم الحالية: Node.js 22 أو أكثر.
نحن نتحقق من الدعم في جميع أنحاء LTS السابقة، و LTS الحالية، و Node (في سي آي)
ومن الأمثلة على ذلك في أدلة التأسيس ذات الصلة `npm`.. `pnpm`و `yarn` متغيرات حيث تختلف القيادة
هذا الدليل يفترض أنك تتبعت [getting started guide](./getting-started) أو لديها تركيبة مماثلة
:::

المرجع ذو الصلة بالطلب: [`ValidateError`](./reference/tsoa-next/classes/ValidateError.md).. [`@Response`](./reference/tsoa-next/functions/Response.md).. [`@Res`](./reference/tsoa-next/functions/Res.md).. [`TsoaResponse`](./reference/tsoa-next/type-aliases/TsoaResponse.md)و [`Controller`](./reference/tsoa-next/classes/Controller.md).

كما لاحظت بعد كل الخطوات من [getting started guide](./getting-started)خادمنا لا يسمح بالبرامترات الغير صحيحة لكن الرد ليس مثالياً بعد

![Current Error Response](/docs-images/errors-server.png)

بالنسبة للموكل، يبدو شيئاً كهذا:

![Client Error Response](/docs-images/errors-client.png)

## وضع خطأ في التعامل

### معالجة الأخطاء

لنتأكد أولاً من أنه عندما يقوم العميل بإشعال خطأ في التقييم بدلاً من طباعة أثر الحزمة

في نهاية `app.ts`بعد النداء `RegisterRoutes(app)`سوف نضيف معالج خطأ عالمي

```ts
import express, { Response as ExResponse, Request as ExRequest, NextFunction } from 'express'
import { ValidateError } from 'tsoa-next'
// ...

app.use(function errorHandler(err: unknown, req: ExRequest, res: ExResponse, next: NextFunction): ExResponse | void {
  if (err instanceof ValidateError) {
    console.warn(`Caught Validation Error for ${req.path}:`, err.fields)
    return res.status(422).json({
      message: 'Validation Failed',
      details: err?.fields,
    })
  }
  if (err instanceof Error) {
    return res.status(500).json({
      message: 'Internal Server Error',
    })
  }

  next()
})
```

الآن، نفس الطلب سيستجيب هكذا:

![Client Error with handler](/docs-images/errors-json-client.png)

وبالإضافة إلى ذلك، سيظهر اتحادنا ما يلي:

![Server Error with handler](/docs-images/errors-json-server.png)

### معالجة الطرق المفقودة

من أجل التعامل مع الثور المفقودة بشرف أكبر، يمكننا أن نضيف معالج "القبض على الجميع"

```ts
// app.ts
import express, { Response as ExResponse, Request as ExRequest, NextFunction } from 'express'

// ...

RegisterRoutes(app)

app.use(function notFoundHandler(_req, res: ExResponse) {
  res.status(404).send({
    message: 'Not Found',
  })
})

app.use(function errorHandler(
// ...
```

## تحديد أنواع الاستجابة للأخطاء OpenAPI

إذا تفقدت نقطة التوثيق ستلاحظين أنه ليس لدينا أي وثائق لأخطائنا بعد
منذ TypeScript لا يدقق في رمي الرعب tsoa لا يُمكنُ أَنْ يَستنتجَ نوعَ الاستجابةِ نحن نُرسلُ خارج في هذه الحالاتِ.

::: warning
استخدام `@Response` مصممة حسب المادة `tsoa-next`ليس Express' `Response` نوع.
الحد من tsoa-next الاستيراد جيد، لكنه لا يزال بحاجة إلى تصميم tsoa-next مصمم
:::

ومع ذلك، لدينا وسيلة لك لتحديد هذه العودة يدويا:

```ts
import { Body, Controller, Post, Route, Response, SuccessResponse } from 'tsoa-next'
import { User } from './user'
import { UsersService, UserCreationParams } from './usersService'

interface ValidateErrorJSON {
  message: string
  details: { [name: string]: unknown }
}

@Route('users')
export class UsersController extends Controller {
  // more code here

  @Response<ValidateErrorJSON>(422, 'Validation Failed')
  @SuccessResponse('201', 'Created') // Custom success response
  @Post()
  public async createUser(@Body() requestBody: UserCreationParams): Promise<void> {
    this.setStatus(201) // set return status 201
    new UsersService().create(requestBody)
    return
  }
}
```

هذا سيجعل أطباءنا يظهرون شيئاً كهذا

![SwaggerUI showing our 422 Response](/docs-images/err-422-swui.png)

::: tip
OpenAPI يسمح بمطابقة رموز الحالة مثل "2x" أو مطابقة جميع الرموز باستخدام "التعريف". tsoa وسيدعم ذلك:

```ts
@Response<ErrorResponse>('default', 'Unexpected error')
@Get('Response')
public async getResponse(): Promise<TestModel> {
  return new ModelService().getModel()
}
```

:::

## الردود البديلة المشبوهة

في النسخ الأخيرة tsoaولدينا الخيار في إدخال وظيفة مستجيب إطاري - تشخيصي في مهمتنا التي يمكن أن ندعوها إلى صياغة رد لا يمتثل لنوع العودة من أسلوبنا/رمز مركز المراقبة والراسخ (الذي يستخدم في الاستجابة للنجاح).
This is especially useful to reply with an mistake response without the risk of type mismatches associated with throw errors.
من أجل حقن مستجيبين أكثر، يمكننا استخدام `@Res()` الديكور:

```ts
import { Route, Controller, Get, Query, Res, TsoaResponse } from 'tsoa-next'

@Route('/greeting')
export class GreetingsController extends Controller {
  /**
   * @param notFoundResponse The responder function for a not found response
   */
  @Get('/')
  public async greet(@Query() name?: string, @Res() notFoundResponse: TsoaResponse<404, { reason: string }>): Promise<string> {
    if (!name) {
      return notFoundResponse(404, { reason: 'We don\'t know you yet. Please provide a name' })
    }

    return `Hello, ${name}`
  }
}
```
