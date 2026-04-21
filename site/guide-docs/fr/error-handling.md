---
title: Gestion des erreurs
lang: fr-FR
lastUpdated: 2026-04-20T00:28:55.924Z
---

# Gestion des erreurs

::: warning NOTE DE COMPATIBILITÉ
Ce guide cible [express](https://expressjs.com) et suppose `tsoa-next`La politique de soutien actuelle: Node.js 22 ou plus récent.
Nous vérifions le support dans le précédent LTS, le LTS actuel, et Node vSuivant dans CI.
Exemples dans les guides de configuration liés `npm`, `pnpm`et `yarn` variantes où la commande diffère.
Ce guide suppose que vous avez suivi [getting started guide](./getting-started) ou avoir une configuration similaire.
:::

Référence IPA pertinente: [`ValidateError`](./reference/tsoa-next/classes/ValidateError.md), [`@Response`](./reference/tsoa-next/functions/Response.md), [`@Res`](./reference/tsoa-next/functions/Res.md), [`TsoaResponse`](./reference/tsoa-next/type-aliases/TsoaResponse.md)et [`Controller`](./reference/tsoa-next/classes/Controller.md).

Comme vous avez peut-être remarqué après avoir suivi toutes les étapes de la [getting started guide](./getting-started), notre serveur ne permet pas les paramètres invalides, mais la réponse n'est pas encore très idéale.

![Current Error Response](/docs-images/errors-server.png)

Pour le Client, ça ressemble à ça :

![Client Error Response](/docs-images/errors-client.png)

## Configuration du traitement des erreurs

### Gestion des erreurs de validation

Assure-toi d'abord que, chaque fois que le Client déclenche une Erreur de validation, au lieu d'imprimer la trace de la pile, nous montrons plutôt une réponse json correctement formatée.

A la fin de notre `app.ts`Après l'appel à `RegisterRoutes(app)`, nous ajouterons un gestionnaire d'erreur express global:

```ts
import express, { Response as ExResponse, Request as ExRequest, NextFunction } from 'express'
import { ValidateError } from 'tsoa-next'
// ...

app.use(function errorHandler(err: unknown, req: ExRequest, res: ExResponse, next: NextFunction): ExResponse | void {
  if (err instanceof ValidateError) {
    console.warn(`Caught Validation Error for ${req.path}:`, err.fields)
    return res.status(422).json({
      message: 'Validation Failed',
      details: err?.fields,
    })
  }
  if (err instanceof Error) {
    return res.status(500).json({
      message: 'Internal Server Error',
    })
  }

  next()
})
```

Maintenant, la même demande répondra comme ceci:

![Client Error with handler](/docs-images/errors-json-client.png)

De plus, notre console affichera :

![Server Error with handler](/docs-images/errors-json-server.png)

### Traitement des itinéraires manquants

Afin de gérer plus gracieusement les urnes manquantes, nous pouvons ajouter un gestionnaire de route « catch-all » :

```ts
// app.ts
import express, { Response as ExResponse, Request as ExRequest, NextFunction } from 'express'

// ...

RegisterRoutes(app)

app.use(function notFoundHandler(_req, res: ExResponse) {
  res.status(404).send({
    message: 'Not Found',
  })
})

app.use(function errorHandler(
// ...
```

## Spécifier les types de réponse d'erreur pour OpenAPI

Si vous consultez le paramètre Documentation, vous remarquerez que nous n'avons pas encore de documentation pour nos erreurs.
Depuis TypeScript ne vérifie pas les erreurs de lancement, tsoa ne peut pas déduire le type de réponse que nous envoyons dans ces cas.

::: warning
Utilisez la `@Response` décorateur exporté par `tsoa-next`Pas Express's `Response` Type.
En dehors des tsoa-next l'importation est bonne, mais il doit encore résoudre tsoa-next décorateur.
:::

Cependant, nous avons un moyen pour vous de spécifier manuellement ces retours:

```ts
import { Body, Controller, Post, Route, Response, SuccessResponse } from 'tsoa-next'
import { User } from './user'
import { UsersService, UserCreationParams } from './usersService'

interface ValidateErrorJSON {
  message: string
  details: { [name: string]: unknown }
}

@Route('users')
export class UsersController extends Controller {
  // more code here

  @Response<ValidateErrorJSON>(422, 'Validation Failed')
  @SuccessResponse('201', 'Created') // Custom success response
  @Post()
  public async createUser(@Body() requestBody: UserCreationParams): Promise<void> {
    this.setStatus(201) // set return status 201
    new UsersService().create(requestBody)
    return
  }
}
```

Cela devrait faire montrer à nos docs quelque chose comme ça :

![SwaggerUI showing our 422 Response](/docs-images/err-422-swui.png)

::: tip
OpenAPI permet de comparer des codes de statut tels que '2xx' ou tous les codes utilisant 'default'. tsoa soutiendra ceci:

```ts
@Response<ErrorResponse>('default', 'Unexpected error')
@Get('Response')
public async getResponse(): Promise<TestModel> {
  return new ModelService().getModel()
}
```

:::

## Autres réponses vérifiées par type

Dans les versions récentes tsoa, nous avons la possibilité d'injecter une fonction de répondeur framework-agnostique dans notre fonction que nous pouvons appeler pour formuler une réponse qui ne respecte pas le type de retour de notre méthode de contrôleur/code de statut et en-têtes (qui est utilisé pour la réponse de succès).
Ceci est particulièrement utile pour répondre avec une réponse d'erreur sans risque d'erreur de type associée à des erreurs de lancer.
Pour injecter un/plus de répondeurs, nous pouvons utiliser `@Res()` décorateur:

```ts
import { Route, Controller, Get, Query, Res, TsoaResponse } from 'tsoa-next'

@Route('/greeting')
export class GreetingsController extends Controller {
  /**
   * @param notFoundResponse The responder function for a not found response
   */
  @Get('/')
  public async greet(@Query() name?: string, @Res() notFoundResponse: TsoaResponse<404, { reason: string }>): Promise<string> {
    if (!name) {
      return notFoundResponse(404, { reason: 'We don\'t know you yet. Please provide a name' })
    }

    return `Hello, ${name}`
  }
}
```
