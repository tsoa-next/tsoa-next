---
lastUpdated: 2026-04-17T20:53:42.039Z
---
# Middlewares Personalizados

A `@Middlewares` decorador é usado para aplicar middleware personalizado para um ponto final em seu TypeScript Código. Este middleware intercepta solicitações HTTP recebidas antes de atingir o endpoint e permite que você realize operações ou modificações adicionais. Presta apoio a: Express, Koa, e Hapi middlewares.
Referência da API relevante: [`@Middlewares`](./reference/tsoa-next/functions/Middlewares.md), [`@Request`](./reference/tsoa-next/functions/Request.md), [`Controller`](./reference/tsoa-next/classes/Controller.md), [`@Route`](./reference/tsoa-next/functions/Route.md), e [`@Get`](./reference/tsoa-next/functions/Get.md).

## Exemplo

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

## Fluxo de Execução

Quando uma solicitação HTTP é feita para o ponto final decorado com `@Middlewares`, o fluxo de execução é o seguinte:

A solicitação primeiro passa pela função de middleware personalizada especificada no `@Middlewares` Decorador.
Dentro da função middleware, você pode realizar quaisquer operações ou modificações necessárias sobre os objetos de solicitação ou resposta.

Depois de completar a lógica middleware, você deve chamar o `next()` função para passar a solicitação para o próximo middleware ou o próprio endpoint.

Finalmente, a solicitação chega ao método exemploGetEndpoint, onde você pode lidar com a solicitação e fornecer a resposta adequada.

Se vários middlewares são especificados, eles são executados na ordem em que são passados para `@Middlewares(...)`.

## TypeScript Requisitos

Usar middleware personalizado requer que os decoradores estejam habilitados TypeScript:

```jsonc
{
  "compilerOptions": {
    // ...
    "experimentalDecorators": true,
    // ...
  }
}
```

`emitDecoratorMetadata` não é exigido por `tsoa-next` em vez `@Middlewares(...)`.
Só habilite-o quando seu próprio middleware, container DI ou pilha de validação depende de metadados em tempo de projeto.
