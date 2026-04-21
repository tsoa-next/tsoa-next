---
lastUpdated: 2026-04-17T20:53:42.039Z
---
# 自定义使用类验证符验证

有时内置 tsoa-next 校验器不足以用于应用程序特定的工作流程。 在这种情况下,您可以附加自己的验证中间软件,例如与 `class-validator`。 。 。 。
相关API参考: [`@Middlewares`](./reference/tsoa-next/functions/Middlewares.md), (中文(简体) ). [`ValidateError`](./reference/tsoa-next/classes/ValidateError.md), (中文(简体) ). [`@Body`](./reference/tsoa-next/functions/Body.md), (中文(简体) ). [`@Post`](./reference/tsoa-next/functions/Post.md),以及 [`@SuccessResponse`](./reference/tsoa-next/functions/SuccessResponse.md)。 。 。 。

本章显示基于中间软件的 `class-validator` 方法 Express。 。 。 。

这个 `@Middlewares` 装饰者接受中间软件函数作为位置参数 :

```ts
@Middlewares(validateBody(RequestClass))
```

## 安装类验证软件包

安装 `class-validator` 和 `class-transformer` 其背书中描述的:

[https://github.com/typestack/class-transformer](https://github.com/typestack/class-transformer)

[https://github.com/typestack/class-validator](https://github.com/typestack/class-validator)

## 写入自定义中间软件

使用示例验证中间软件 `class-validator`数字 :

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

## 用类验证符标记请求类

```ts
import { Length } from 'class-validator'

class RequestClass {
  @Length(1, 2000)
  public text!: string
}
```

## 控制器中的使用

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

`class-validator` 和 `class-transformer` 可能需要 `emitDecoratorMetadata` 取决于您使用的装饰和转换特性。 这一要求来自这些图书馆,而不是来自 `@Middlewares(...)` 它本身。
