---
lastUpdated: 2026-04-17T20:53:42.039Z
---
# Medios aduaneros

El `@Middlewares` decorador se utiliza para aplicar el middleware personalizado a un punto final en su TypeScript código. Este middleware intercepta las solicitudes de HTTP entrantes antes de llegar al punto final y le permite realizar operaciones o modificaciones adicionales. Proporciona apoyo Express, Koa, y Hapi Midwares.
Referencia pertinente de API: [`@Middlewares`](./reference/tsoa-next/functions/Middlewares.md), [`@Request`](./reference/tsoa-next/functions/Request.md), [`Controller`](./reference/tsoa-next/classes/Controller.md), [`@Route`](./reference/tsoa-next/functions/Route.md), y [`@Get`](./reference/tsoa-next/functions/Get.md).

## Ejemplo

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

## Flujo de ejecución

Cuando se hace una solicitud HTTP al punto final decorado con `@Middlewares`, el flujo de ejecución es el siguiente:

La solicitud pasa primero por la función de middleware personalizada especificada en la `@Middlewares` decorador.
Dentro de la función middleware, puede realizar cualquier operación o modificación necesaria en los objetos de solicitud o respuesta.

Después de completar la lógica de middleware, debe llamar a la `next()` función para pasar la solicitud al siguiente middleware o el punto final en sí mismo.

Finalmente, la solicitud llega al método ejemploGetEndpoint, donde puede manejar la solicitud y proporcionar la respuesta adecuada.

Si se especifican varios middlewares, se ejecutan en el orden a que se pasan `@Middlewares(...)`.

## TypeScript Necesidades

Utilizar middleware personalizado requiere que los decoradores estén habilitados TypeScript:

```jsonc
{
  "compilerOptions": {
    // ...
    "experimentalDecorators": true,
    // ...
  }
}
```

`emitDecoratorMetadata` no es necesario `tsoa-next` para `@Middlewares(...)`.
Sólo hazlo cuando tu propio middleware, contenedor DI o pila de validación depende de metadatos de tiempo de diseño.
