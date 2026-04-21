---
lastUpdated: 2026-04-17T20:53:42.039Z
---
# Middlewares personnalisés

Les `@Middlewares` décorateur est utilisé pour appliquer des intergiciels personnalisés à un paramètre dans votre TypeScript Code. Ce middleware intercepte les requêtes HTTP entrantes avant qu'elles n'atteignent le paramètre et vous permet d'effectuer des opérations ou des modifications supplémentaires. Il fournit un appui Express, Koaet Hapi Les intermédiaires.
Référence IPA pertinente: [`@Middlewares`](./reference/tsoa-next/functions/Middlewares.md), [`@Request`](./reference/tsoa-next/functions/Request.md), [`Controller`](./reference/tsoa-next/classes/Controller.md), [`@Route`](./reference/tsoa-next/functions/Route.md)et [`@Get`](./reference/tsoa-next/functions/Get.md).

## Exemple

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

## Flux d'exécution

Quand une requête HTTP est faite au point d'arrivée décoré avec `@Middlewares`, le flux d'exécution est le suivant:

La requête passe d'abord par la fonction de middleware personnalisée spécifiée dans le `@Middlewares` décorateur.
Dans la fonction intergiciel, vous pouvez effectuer toutes les opérations ou modifications nécessaires sur les objets de requête ou de réponse.

Après avoir complété la logique du middleware, vous devez appeler le `next()` fonction pour passer la requête au prochain middleware ou au point final lui-même.

Enfin, la requête atteint la méthode exempleGetEndpoint, où vous pouvez gérer la requête et fournir la réponse appropriée.

Si plusieurs intergiciels sont spécifiés, ils sont exécutés dans l'ordre où ils sont passés à `@Middlewares(...)`.

## TypeScript Exigences

L'utilisation d'intergiciels personnalisés exige que les décorateurs soient activés dans TypeScript:

```jsonc
{
  "compilerOptions": {
    // ...
    "experimentalDecorators": true,
    // ...
  }
}
```

`emitDecoratorMetadata` n'est pas requis par `tsoa-next` pour `@Middlewares(...)`.
Ne l'activer que lorsque votre propre intergiciel, conteneur DI ou pile de validation dépend des métadonnées de conception-temps.
