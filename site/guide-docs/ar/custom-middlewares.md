---
lastUpdated: 2026-04-17T20:53:42.039Z
---
# العقد الأوسط

The `@Middlewares` مصممة على تطبيق البرمجيات المتوسطة على نقطة نهاية TypeScript رمز. ويعترض هذا الإطار الأوسط على الطلبات الواردة من شركة HTTP قبل أن تصل إلى نقطة النهاية، ويتيح لك القيام بعمليات أو تعديلات إضافية. It provides support for Express.. Koaو Hapi أوتار
المرجع ذو الصلة بالطلب: [`@Middlewares`](./reference/tsoa-next/functions/Middlewares.md).. [`@Request`](./reference/tsoa-next/functions/Request.md).. [`Controller`](./reference/tsoa-next/classes/Controller.md).. [`@Route`](./reference/tsoa-next/functions/Route.md)و [`@Get`](./reference/tsoa-next/functions/Get.md).

## مثال

```ts
import type { NextFunction, Request, Response } from 'express'
import { Controller, Get, Middlewares, Request as TsoaRequest, Route } from 'tsoa-next'

async function customMiddleware(req: Request, _res: Response, next: NextFunction) {
  req.headers['x-middleware-hit'] = 'true'
  next()
}

@Route('examples')
export class ExampleController extends Controller {
  @Get('custom-middleware')
  @Middlewares(customMiddleware)
  public async exampleGetEndpoint(@TsoaRequest() req: Request): Promise<{ middlewareHit: boolean }> {
    return {
      middlewareHit: req.header('x-middleware-hit') === 'true',
    }
  }
}
```

## تدفق التنفيذ

عندما يُقدَّم طلب من حزب نمور تحرير تاميل إيلام للتحرير إلى نقطة النهاية `@Middlewares`وتدفق الإعدام كما يلي:

ويمر الطلب أولاً بوظيفة البرمجيات المتوسطة المحددة في `@Middlewares` مصمم
داخل وظيفة الإطارات المتوسطة، يمكنك القيام بأي عمليات أو تعديلات ضرورية على أجسام الطلب أو الاستجابة.

بعد الانتهاء من منطق منتصف الطريق، يجب أن ندعو `next()` وظيفة تمرير الطلب إلى المنتصف المقبل أو نقطة النهاية نفسها.

وأخيراً، يصل الطلب إلى طريقة &quot; غيت إند بوينت &quot; ، حيث يمكنك معالجة الطلب وتقديم الرد المناسب.

إذا حُدِّدَت عدة أوتار، يُعدمون حسب ترتيب مرورهم `@Middlewares(...)`.

## TypeScript الاحتياجات

يتطلب استخدام البرمجيات المتوسطة العادمة تمكين المصممين من العمل TypeScript:

```jsonc
{
  "compilerOptions": {
    // ...
    "experimentalDecorators": true,
    // ...
  }
}
```

`emitDecoratorMetadata` غير مطلوب `tsoa-next` for `@Middlewares(...)`.
فقط قم بتمكينها عندما تكون مبرمجتك المتوسطة أو حاوية دي أو كومة المصادقة تعتمد على البيانات الوصفية
