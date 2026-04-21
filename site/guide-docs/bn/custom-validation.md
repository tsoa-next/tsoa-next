---
lastUpdated: 2026-04-17T20:53:42.039Z
---
# Cod-sobileer সহ স্বনির্ধারিত বৈধতা

মাঝে মাঝে নির্মিত tsoa-next একটি অ্যাপ্লিকেশন সুনির্দিষ্ট কর্মপ্রবাহের জন্য পর্যাপ্ত নয় । যে ক্ষেত্রে আপনি আপনার যৌথরূপে ব্যবহার করতে পারেন যেমন, উদাহরণস্বরূপ `class-validator`. .
রিলেভেন্ট API উল্লেখ করেছে: [`@Middlewares`](./reference/tsoa-next/functions/Middlewares.md)'%s' [`ValidateError`](./reference/tsoa-next/classes/ValidateError.md)'%s' [`@Body`](./reference/tsoa-next/functions/Body.md)'%s' [`@Post`](./reference/tsoa-next/functions/Post.md)এবং [`@SuccessResponse`](./reference/tsoa-next/functions/SuccessResponse.md). .

এই অধ্যায়ে একটি মধ্য-ভারানী ভিত্তিক প্রদর্শন করা হয়। `class-validator` অনুসন্ধানের স্থান Express. .

এটা `@Middlewares` ক্লীবেটর স্থানগত যুক্তি হিসাবে মধ্য ফাংশন গ্রহণ করেন:

```ts
@Middlewares(validateBody(RequestClass))
```

## ক্লাস-অভিজ্ঞ প্যাকেজ ইনস্টল করুন

ইনস্টল করুন `class-validator` এবং `class-transformer` তাদের অস্পৃশ্য বর্ণনা অনুযায়ী:

[https://github.com/typestack/class-transformer](https://github.com/typestack/class-transformer)

[https://github.com/typestack/class-validator](https://github.com/typestack/class-validator)

## স্বনির্ধারিত নোট লিখুন

ব্যবহারবিধির উদাহরণ `class-validator`:

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

## শ্রেণীর সাথে মিল পাওয়া যায়নি

```ts
import { Length } from 'class-validator'

class RequestClass {
  @Length(1, 2000)
  public text!: string
}
```

## বার্তা নিয়ন্ত্রণ

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

`class-validator` এবং `class-transformer` হতে পারে `emitDecoratorMetadata` ক্লিক করে বৈশিষ্ট্য পরিবর্তন করুন ও ব্যবহার করুন । যা ঐ লাইব্রেরি থেকে আসে, না `@Middlewares(...)` স্বয়ং।
