---
lastUpdated: 2026-04-17T20:53:42.039Z
---
# Validación personalizada con validador de clase

A veces la incorporada tsoa-next validador no es suficiente para un flujo de trabajo específico de aplicación. En ese caso puede adjuntar su propio middleware de validación, por ejemplo con `class-validator`.
Referencia pertinente de API: [`@Middlewares`](./reference/tsoa-next/functions/Middlewares.md), [`ValidateError`](./reference/tsoa-next/classes/ValidateError.md), [`@Body`](./reference/tsoa-next/functions/Body.md), [`@Post`](./reference/tsoa-next/functions/Post.md), y [`@SuccessResponse`](./reference/tsoa-next/functions/SuccessResponse.md).

Este capítulo muestra una base de middleware `class-validator` acerca del enfoque Express.

El `@Middlewares` decorator acepta funciones de middleware como argumentos posicionales:

```ts
@Middlewares(validateBody(RequestClass))
```

## Instalar paquete de validación de clase

Instala `class-validator` y `class-transformer` como se describe en sus repos:

[https://github.com/typestack/class-transformer](https://github.com/typestack/class-transformer)

[https://github.com/typestack/class-validator](https://github.com/typestack/class-validator)

## Escribe middleware personalizado

El middleware de validación de ejemplo utilizando `class-validator`:

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

## Anota una clase de solicitud con validador de clase

```ts
import { Length } from 'class-validator'

class RequestClass {
  @Length(1, 2000)
  public text!: string
}
```

## Uso en un controlador

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

`class-validator` y `class-transformer` puede necesitar `emitDecoratorMetadata` dependiendo de los decoradores y las características de transformación que utilice. Ese requisito proviene de esas bibliotecas, no de `@Middlewares(...)` en sí mismo.
