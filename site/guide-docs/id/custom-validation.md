---
lastUpdated: 2026-04-17T20:53:42.039Z
---
# Validasi gubahan dengan kelas-validator

Sometimes the built- in tsoa-next validator tidak cukup untuk sebuah aplikasi-spesifik alur kerja. Dalam hal ini Anda dapat melampirkan validasi Anda sendiri middleware, misalnya dengan `class-validator`.
Referensi API Relevant: [`@Middlewares`](./reference/tsoa-next/functions/Middlewares.md), [`ValidateError`](./reference/tsoa-next/classes/ValidateError.md), [`@Body`](./reference/tsoa-next/functions/Body.md), [`@Post`](./reference/tsoa-next/functions/Post.md), dan [`@SuccessResponse`](./reference/tsoa-next/functions/SuccessResponse.md).

Bab ini menunjukkan perantara berbasis `class-validator` pendekatan untuk Express.

The `@Middlewares` dekorator menerima fungsi middleware sebagai argumen posisi:

```ts
@Middlewares(validateBody(RequestClass))
```

## Pasang paket validator kelas

Pasang `class-validator` dan `class-transformer` seperti dijelaskan dalam repos mereka:

[https://github.com/typestack/class-transformer](https://github.com/typestack/class-transformer)

[https://github.com/typestack/class-validator](https://github.com/typestack/class-validator)

## Tulis middleware gubahan

Contoh validasi middleware menggunakan `class-validator`:

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

## Anotasikan sebuah kelas permintaan dengan kelas-validator

```ts
import { Length } from 'class-validator'

class RequestClass {
  @Length(1, 2000)
  public text!: string
}
```

## Penggunaan dalam suatu pengontrol

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

`class-validator` dan `class-transformer` mungkin perlu `emitDecoratorMetadata` tergantung pada dekorator dan fitur transformasi yang Anda gunakan. Persyaratan itu berasal dari perpustakaan, bukan dari `@Middlewares(...)` itu sendiri.
