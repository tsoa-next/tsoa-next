---
lastUpdated: 2026-04-17T20:53:42.039Z
---
# تقييم الذكاء مع المحافظ

أحياناً tsoa-next والمصادقة ليست كافية لتدفق العمل المحدد التطبيق. في هذه الحالة يمكنك أن ترفق مع برنامج المصادقة `class-validator`.
المرجع ذو الصلة بالطلب: [`@Middlewares`](./reference/tsoa-next/functions/Middlewares.md).. [`ValidateError`](./reference/tsoa-next/classes/ValidateError.md).. [`@Body`](./reference/tsoa-next/functions/Body.md).. [`@Post`](./reference/tsoa-next/functions/Post.md)و [`@SuccessResponse`](./reference/tsoa-next/functions/SuccessResponse.md).

يُظهر هذا الفصل قاعدة متوسطة `class-validator` النهج المتبع Express.

The `@Middlewares` ويقبل المصمم مهام الإطار الأوسط باعتبارها حجج موقفية:

```ts
@Middlewares(validateBody(RequestClass))
```

## تركيب حزمة من الرواسب

Install `class-validator` و `class-transformer` على النحو المبين في عرضها:

[https://github.com/typestack/class-transformer](https://github.com/typestack/class-transformer)

[https://github.com/typestack/class-validator](https://github.com/typestack/class-validator)

## كتابة البرمجيات المتوسطة

نموذج المصادقة `class-validator`:

```ts
import { ClassConstructor, plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import { ValidateError } from 'tsoa-next';

export function validateBody<T extends object>(targetClass: ClassConstructor<T>) {
   return async (req: Request, _res: Response, next: NextFunction) => {
      const instance = plainToInstance(targetClass, req.body);
      const errors = validateSync(instance, {
         forbidUnknownValues: true,
         validationError: {
            target: false
         }
      });
      const fieldsErrors: { [name: string]: { message: string; value: string } } = {};

      if (errors.length > 0) {
         errors.forEach(error => {
            if (error.constraints) {
               fieldsErrors[error.property] = {
                  message: Object.values(error.constraints).join(', '),
                  value: error.value
               };
            }
            if (error.children) {
               error.children.forEach(errorNested => {
                  if (errorNested.constraints) {
                     fieldsErrors[errorNested.property] = {
                        message: Object.values(errorNested.constraints!).join(', '),
                        value: errorNested.value
                     };
                  }
               })
            }
         });
         next(new ValidateError(fieldsErrors, 'Validation failed'));
         return;
      }
      next();
   };
}
```

## شطب صنف الطلب مع المتفوق

```ts
import { Length } from 'class-validator'

class RequestClass {
  @Length(1, 2000)
  public text!: string
}
```

## نحن في متحكم

```ts
import {
  Body,
  Controller,
  Middlewares,
  Post,
  Route,
  SuccessResponse,
} from 'tsoa-next'
import { validateBody } from '../middleware/ValidationMiddleware'

@Route('post')
export class PostController extends Controller {
  @SuccessResponse('200', 'Post created')
  @Post()
  @Middlewares(validateBody(RequestClass))
  public async create(@Body() request: RequestClass): Promise<void> {
    console.log(`validated request: ${request.text}`)
  }
}
```

`class-validator` و `class-transformer` قد تحتاج `emitDecoratorMetadata` اعتماداً على المصممين والمميزات التحويلية التي تستخدمها وهذا الشرط يأتي من تلك المكتبات وليس من `@Middlewares(...)` نفسه
