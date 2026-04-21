---
lastUpdated: 2026-04-17T20:53:42.039Z
---
# Пользовательская валидация с классом-валидатором

Иногда встроенный tsoa-next Валидатора недостаточно для конкретного рабочего процесса приложения. В этом случае вы можете прикрепить свое собственное промежуточное ПО для проверки, например, `class-validator`.
Соответствующая ссылка API: [`@Middlewares`](./reference/tsoa-next/functions/Middlewares.md), [`ValidateError`](./reference/tsoa-next/classes/ValidateError.md), [`@Body`](./reference/tsoa-next/functions/Body.md), [`@Post`](./reference/tsoa-next/functions/Post.md)и [`@SuccessResponse`](./reference/tsoa-next/functions/SuccessResponse.md).

Эта глава показывает промежуточное программное обеспечение на основе `class-validator` подход к Express.

The `@Middlewares` Декоратор принимает функции промежуточного ПО в качестве позиционных аргументов:

```ts
@Middlewares(validateBody(RequestClass))
```

## Установить пакет Class Validator

устанавливать `class-validator` и `class-transformer` Как описано в их резюме:

[https://github.com/typestack/class-transformer](https://github.com/typestack/class-transformer)

[https://github.com/typestack/class-validator](https://github.com/typestack/class-validator)

## Write custom middleware

Пример промежуточного программного обеспечения проверки с использованием `class-validator`:

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

## Аннотировать класс запросов с классом-валидатором

```ts
import { Length } from 'class-validator'

class RequestClass {
  @Length(1, 2000)
  public text!: string
}
```

## Использование в контроллере

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

`class-validator` и `class-transformer` может понадобиться `emitDecoratorMetadata` В зависимости от декораторов и особенностей трансформации, которые вы используете. Это требование исходит от библиотек, а не от `@Middlewares(...)` себя.
