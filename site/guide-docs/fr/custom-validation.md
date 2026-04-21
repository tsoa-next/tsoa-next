---
lastUpdated: 2026-04-17T20:53:42.039Z
---
# Validation personnalisée avec classe-validateur

Parfois, les tsoa-next validator n'est pas suffisant pour un workflow spécifique à une application. Dans ce cas, vous pouvez joindre votre propre intergiciel de validation, par exemple avec `class-validator`.
Référence IPA pertinente: [`@Middlewares`](./reference/tsoa-next/functions/Middlewares.md), [`ValidateError`](./reference/tsoa-next/classes/ValidateError.md), [`@Body`](./reference/tsoa-next/functions/Body.md), [`@Post`](./reference/tsoa-next/functions/Post.md)et [`@SuccessResponse`](./reference/tsoa-next/functions/SuccessResponse.md).

Ce chapitre montre un intergiciel `class-validator` pour Express.

Les `@Middlewares` décorateur accepte les fonctions d'intergiciel comme arguments positionnels:

```ts
@Middlewares(validateBody(RequestClass))
```

## Installer le paquet de classe-validateur

Installer `class-validator` et `class-transformer` comme décrit dans leur mémoire:

[https://github.com/typestack/class-transformer](https://github.com/typestack/class-transformer)

[https://github.com/typestack/class-validator](https://github.com/typestack/class-validator)

## Écrire le middleware personnalisé

L'exemple d'intergiciel de validation utilisant `class-validator`:

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

## Annoter une classe de requête avec un validateur de classe

```ts
import { Length } from 'class-validator'

class RequestClass {
  @Length(1, 2000)
  public text!: string
}
```

## Utilisation dans un contrôleur

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

`class-validator` et `class-transformer` peut être nécessaire `emitDecoratorMetadata` selon les décorateurs et les fonctions de transformation que vous utilisez. Cette exigence vient de ces bibliothèques, pas de `@Middlewares(...)` lui-même.
