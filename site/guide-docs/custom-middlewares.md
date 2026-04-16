# Custom Middlewares

The `@Middlewares` decorator is used to apply custom middleware to an endpoint in your TypeScript code. This middleware intercepts incoming HTTP requests before they reach the endpoint and allows you to perform additional operations or modifications. It provides support for Express, Koa, and Hapi middlewares.

## Example

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

## Execution Flow

When an HTTP request is made to the endpoint decorated with `@Middlewares`, the execution flow is as follows:

The request first goes through the custom middleware function specified in the `@Middlewares` decorator.
Inside the middleware function, you can perform any necessary operations or modifications on the request or response objects.

After completing the middleware logic, you must call the `next()` function to pass the request to the next middleware or the endpoint itself.

Finally, the request reaches the exampleGetEndpoint method, where you can handle the request and provide the appropriate response.

If multiple middlewares are specified, they are executed in the order they are passed to `@Middlewares(...)`.

## TypeScript Requirements

Using custom middleware requires decorators to be enabled in TypeScript:

```jsonc
{
  "compilerOptions": {
    // ...
    "experimentalDecorators": true,
    // ...
  }
}
```

`emitDecoratorMetadata` is not required by `tsoa-next` for `@Middlewares(...)`.
Only enable it when your own middleware, DI container, or validation stack depends on design-time metadata.
