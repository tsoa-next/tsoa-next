---
lastUpdated: 2026-04-17T20:53:42.039Z
---
# Validação personalizada com validador de classe

Às vezes, o embutido tsoa-next o validador não é suficiente para um fluxo de trabalho específico para aplicações. Nesse caso, você pode anexar seu próprio middleware de validação, por exemplo com `class-validator`.
Referência da API relevante: [`@Middlewares`](./reference/tsoa-next/functions/Middlewares.md), [`ValidateError`](./reference/tsoa-next/classes/ValidateError.md), [`@Body`](./reference/tsoa-next/functions/Body.md), [`@Post`](./reference/tsoa-next/functions/Post.md), e [`@SuccessResponse`](./reference/tsoa-next/functions/SuccessResponse.md).

Este capítulo mostra um middleware baseado `class-validator` abordagem para Express.

A `@Middlewares` O decorador aceita funções de middleware como argumentos posicionais:

```ts
@Middlewares(validateBody(RequestClass))
```

## Instalar pacote de validação de classe

Instalar `class-validator` e `class-transformer` Conforme descrito nos respetivos acordos de recompra:

[https://github.com/typestack/class-transformer](https://github.com/typestack/class-transformer)

[https://github.com/typestack/class-validator](https://github.com/typestack/class-validator)

## Gravar o middleware personalizado

O middleware de validação de exemplo usando `class-validator`:

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

## Anotar uma classe de requisição com validador de classe

```ts
import { Length } from 'class-validator'

class RequestClass {
  @Length(1, 2000)
  public text!: string
}
```

## Uso em um controlador

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

`class-validator` e `class-transformer` pode ser necessário `emitDecoratorMetadata` dependendo dos decoradores e características de transformação que você usa. Esse requisito vem dessas bibliotecas, não de `@Middlewares(...)` Ele próprio.
