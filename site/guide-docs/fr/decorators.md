---
lastUpdated: 2026-04-17T20:53:42.039Z
---
# Décors

Veuillez noter que cette section ne couvre que les décorateurs qui ne sont pas décrits séparément, comme [`@Response`](./error-handling) ou les décorateurs de paramètres principaux introduits dans [Prise en main](./getting-started).
Pour un aperçu complet, veuillez consulter la page [Référence d’API](./reference/).
Référence IPA pertinente: [`@Security`](./reference/tsoa-next/functions/Security.md), [`@NoSecurity`](./reference/tsoa-next/functions/NoSecurity.md), [`@Tags`](./reference/tsoa-next/functions/Tags.md), [`@OperationId`](./reference/tsoa-next/functions/OperationId.md), [`@Deprecated`](./reference/tsoa-next/functions/Deprecated.md), [`@Validate`](./reference/tsoa-next/functions/Validate.md), [`@SpecPath`](./reference/tsoa-next/functions/SpecPath.md), [`@Hidden`](./reference/tsoa-next/functions/Hidden.md), [`@Request`](./reference/tsoa-next/functions/Request.md), [`@RequestProp`](./reference/tsoa-next/functions/RequestProp.md), [`@Inject`](./reference/tsoa-next/functions/Inject.md), [`@Produces`](./reference/tsoa-next/functions/Produces.md)et [`@Consumes`](./reference/tsoa-next/functions/Consumes.md).

## Sécurité

Les [`@Security`](./reference/tsoa-next/functions/Security.md) Le décorateur peut être utilisé au-dessus des méthodes de contrôleur pour indiquer qu'il devrait y avoir authentification avant d'exécuter ces méthodes. Comme décrit ci-dessus, l'authentification se fait dans un fichier qui est référencé dans tsoaLa configuration. Les noms de schéma sont définis par l'utilisateur et doivent correspondre aux noms dans votre OpenAPI configuration de sécurité et module d'authentification. Lorsque vous utilisez `@Security` décorateur, vous pouvez choisir entre avoir une ou plusieurs méthodes d'authentification. Si vous choisissez d'avoir plusieurs méthodes d'authentification, vous pouvez choisir entre passer l'une des méthodes (OU):

```ts
@Security('jwt', ['write:pets', 'read:pets'])
@Security('api_key')
@Get('OauthOrAPIkey')
public async GetWithOrSecurity(@Request() request: express.Request): Promise<any> {
}
```

ou d'avoir à passer tous (et):

```ts
@Security({
  jwt: ['write:pets', 'read:pets'],
  api_key: [],
})
@Get('OauthAndAPIkey')
public async GetWithAndSecurity(@Request() request: express.Request): Promise<any> {
}
```

## Pas de sécurité

Utilisation [`@NoSecurity()`](./reference/tsoa-next/functions/NoSecurity.md) lorsqu'un contrôleur ou une action doit clarifier les exigences de sécurité héritées ou à l'échelle de l'API.

```ts
import { Controller, Get, NoSecurity, Route, Security } from 'tsoa-next'

@Route('users')
@Security('api_key')
export class UsersController extends Controller {
  @Get('private')
  public async privateEndpoint(): Promise<string> {
    return 'private'
  }

  @Get('public')
  @NoSecurity()
  public async publicEndpoint(): Promise<string> {
    return 'public'
  }
}
```

## Étiquettes

Les étiquettes sont définies avec la [`@Tags('tag1', 'tag2', ...)`](./reference/tsoa-next/functions/Tags.md) décorateur dans les contrôleurs et/ou dans les méthodes comme dans les exemples suivants.

```ts
import { Controller, Get, Request, Response, Route, Tags } from 'tsoa-next'

@Route('users')
@Tags('User')
export class UsersController extends Controller {
  @Get('UserInfo')
  @Tags('Info', 'Get')
  @Response<{ message: string }>('default', 'Unexpected error')
  public async userInfo(@Request() request: { user: { id: number; name: string } }): Promise<{ id: number; name: string }> {
    return Promise.resolve(request.user)
  }

  @Get('EditUser')
  @Tags('Edit')
  public async editUser(): Promise<string> {
    return 'ok'
  }
}
```

Si vous avez un projet qui nécessite une description et/ou des documents externes pour les balises, vous pouvez configurer les générateurs internes pour utiliser les définitions correctes des balises et des documents externes en fournissant une propriété tags à la propriété spec dans tsoa- Oui.

```js
{
  "spec": {
    "tags":  [
      {
        "name": "User",
        "description": "Operations about users",
        "externalDocs": {
          "description": "Find out more about users",
          "url": "http://swagger.io"
        }
      }
    ],
    ...
  },
  "routes": {
    ...
  }
}
```

## Fonctionnement Id

Jeu [`operationId`](./reference/tsoa-next/functions/OperationId.md) sous le chemin d'une opération.
Utile pour une utilisation avec OpenAPI outil de génération de code puisque ce paramètre est utilisé pour nommer la fonction générée dans le SDK client.

```ts
@Get()
@OperationId('findDomain')
public async find(): Promise<any> {

}
```

## Déprécié

OpenAPI vous permet de déprécier [operations](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.2.md#user-content-operationdeprecated), [parameters](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.2.md#user-content-parameterdeprecated)et [schemas](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.2.md#user-content-schemadeprecated). Cela vous permet d'indiquer que certains endpoint/formats/etc. ne devraient plus être utilisés, tout en permettant aux clients de migrer vers la nouvelle approche.

Pour déprécier des parties de votre API, vous pouvez [`@Deprecated`](./reference/tsoa-next/functions/Deprecated.md) décorateur pour classer les propriétés, les méthodes et les paramètres. Pour les constructions qui ne prennent pas en charge les décorateurs (par exemple interfaces et alias de type), vous pouvez utiliser un `@deprecated` JSDoc Annotation. Quelques exemples:

### Opérations

```ts
@Get()
@Deprecated()
public async find(): Promise<any> {

}
```

### Paramètres (OpenAPI 3+ seulement)

```ts
@Get("v2")
public async findV2(
  @Query() text: string,
  @Deprecated() @Query() dontUse?: string
): Promise<any> {

}
```

```ts
interface QueryParams {
  text: string;
  sort?: string;
  page?: number;
}

@Get("v2")
public async findV2(
  @Queries() queryParams: QueryParams
): Promise<any> {

}
```

### Schémas (OpenAPI 3+ seulement)

```ts
class CreateUserRequest {
  name: string;
  @Deprecated() firstName?: string;

  constructor(
    public emailAddress: string,
    @Deprecated() public icqHandle?: string
  ) {}
}

interface CreateUserResponse {
  /** @deprecated */ durationMs?: number;
  details: UserDetails;
}

type UserDetails = {
  name: string;
  /** @deprecated */ firstName?: string;
};
```

## Valider

Le décorateur de schéma externe est nommé [`@Validate(...)`](./reference/tsoa-next/functions/Validate.md).
Utilisez-le sur les paramètres de la méthode du contrôleur lorsque vous voulez une bibliothèque de schéma externe supportée pour remplacer la validation d'exécution intégrée pour ce sous-arbre de paramètre.

- Formulaires soutenus: `@Validate(schema)`, `@Validate('zod', schema)`, `@Validate({ kind: 'zod', schema })`- Bibliothèques supportées : `zod`, `joi`, `yup`, `superstruct`, `io-ts`- Décors de paramètres supportés: `@Body`, `@BodyProp`, `@Query`, `@Queries`, `@Path`, `@Header`, `@FormField`, `@UploadedFile`, `@UploadedFiles`- OpenAPI génération vient encore de votre TypeScript les types; `@Validate(...)` ne change que la validation de l'exécution

```ts
import { Body, Controller, Post, Route, Validate } from 'tsoa-next'
import { z } from 'zod'

type CreateUser = {
  name: string
  tags: string[]
}

const CreateUserSchema = z.object({
  name: z.string().min(3),
  tags: z.array(z.string()).min(1),
})

@Route('users')
export class UsersController extends Controller {
  @Post()
  public create(@Body() @Validate(CreateUserSchema) payload: CreateUser): CreateUser {
    return payload
  }
}
```

Pour des notes de configuration complètes et des exemples pour chaque bibliothèque de validation supportée, voir [External Validators](./external-validators).

## SpecPath

Utilisation [`@SpecPath(...)`](./reference/tsoa-next/functions/SpecPath.md) sur un contrôleur lorsque vous voulez que ce contrôleur expose un paramètre spec ou documentation à l'exécution sans lire un fichier spec généré à partir du disque local.

- `@SpecPath()` par défaut vers un paramètre JSON à `/<controller-path>/spec`- Objectifs intégrés: `json`, `yaml`, `swagger`, `redoc`, `rapidoc`- Les cibles intégrées nécessitent une génération de route pour avoir accès à la configuration spécifique, comme la norme `tsoa spec-and-routes` workflow ou une configuration d'itinéraires qui intègre `runtimeSpecConfig`- Un contrôleur peut déclarer plusieurs `@SpecPath(...)` décorateurs tant que les chemins résolus ne se heurtent pas
- La documentation intégrée cible les dépendances paresseuses optionnelles :
  - `swagger-ui-express` pour Express  - `swagger-ui-koa` pour Koa  - `hapi-swagger` pour Hapi  - `redoc` pour Redoc  - `rapidoc` pour RapiDoc- Les gestionnaires personnalisés peuvent retourner `string` ou une `Readable`- Utilisation `@SpecPath(path, options?)` pour configurer [`SpecPathOptions`](./reference/tsoa-next/interfaces/SpecPathOptions.md) comme `target`, `cache`, et une option `gate`- `gate` peut être un booléen ou une fonction qui reçoit le [`SpecRequestContext`](./reference/tsoa-next/interfaces/SpecRequestContext.md) et indique si la spécification doit être signifiée pour cette demande
- Cache peut être désactivé avec `'none'`, en cours de traitement avec `'memory'`, ou délégué à une coutume [`SpecCacheHandler`](./reference/tsoa-next/interfaces/SpecCacheHandler.md)- `@SpecPath(...)` les itinéraires sont auxiliaires et ne sont pas ajoutés au produit OpenAPI document

```ts
import { Controller, Get, Route, SpecPath } from 'tsoa-next'

@Route('users')
@SpecPath()
@SpecPath('openapi.yaml', { target: 'yaml' })
@SpecPath('docs', { target: 'swagger' })
export class UsersController extends Controller {
  @Get()
  public list(): string[] {
    return []
  }
}
```

Dans cet exemple:

- `GET /users/spec` sert la OpenAPI document en tant que JSON
- `GET /users/openapi.yaml` sert le même document que YAML
- `GET /users/docs` sert Swagger UI si la dépendance par les pairs spécifique à l'exécution est installée

Vous pouvez également fournir un gestionnaire personnalisé et l'implémentation de cache externe:

```ts
import { Readable } from 'node:stream'
import { Controller, Get, Route, SpecCacheHandler, SpecPath, SpecRequestContext } from 'tsoa-next'

const cacheStore = new Map<string, string>()

const cache: SpecCacheHandler = {
  async get(context) {
    return cacheStore.get(context.cacheKey)
  },
  async set(context, value) {
    cacheStore.set(context.cacheKey, value)
  },
}

async function customDocs(context: SpecRequestContext) {
  return Readable.from([await context.getSpecString('json')])
}

@Route('internal')
@SpecPath('spec.json', { target: customDocs, cache })
export class InternalController extends Controller {
  @Get('status')
  public status() {
    return { ok: true }
  }
}
```

Vous pouvez également accéder à un itinéraire spécifique:

```ts
@SpecPath('docs', {
  gate: context => {
    const headers = (context.request as { headers?: Record<string, string | string[] | undefined> } | undefined)?.headers
    return headers?.['x-allow-spec'] === 'true'
  },
  target: 'swagger',
})
```

Lorsque la mise en cache est activée et qu'un gestionnaire personnalisé retourne un flux, `tsoa-next` tamponne le flux vers une chaîne de caractères avant de le stocker dans le gestionnaire de cache.


## Caché

Utilisation [`@Hidden`](./reference/tsoa-next/functions/Hidden.md) sur les méthodes d'exclusion d'un paramètre OpenAPI Document de spécification.

```ts
@Get()
@Hidden()
public async find(): Promise<any> {
}
```

Utilisation [`@Hidden`](./reference/tsoa-next/functions/Hidden.md) sur les contrôleurs pour exclure tous leurs paramètres OpenAPI Document de spécification.

```ts
import { Controller, Get, Hidden, Post, Route } from 'tsoa-next'

@Route('hidden')
@Hidden()
export class HiddenController extends Controller {
  @Get()
  public async find(): Promise<any> {}

  @Post()
  public async create(): Promise<any> {}
}
```

Utilisation `@Query` paramètres pour exclure les paramètres de requête du produit OpenAPI Document de spécification. Le paramètre doit soit permettre que la valeur non définie soit cachée.

```ts
  @Get()
  public async find(
    @Query() normalParam: string,
    @Query() @Hidden() defaultSecret = true,
    @Query() @Hidden() optionalSecret?: string
  ): Promise<any> {

  }
```

## Demande

Pour accéder à l'objet de requête d'express dans une méthode de controller utiliser la [`@Request`](./reference/tsoa-next/functions/Request.md) décorateur:

```typescript
// src/users/usersController.ts

import * as express from 'express'
import { Controller, Get, Path, Request, Route } from 'tsoa-next'

@Route('users')
export class UsersController extends Controller {
  @Get('{userId}')
  public async getUser(
    @Path() userId: number,
    @Request() request: express.Request
  ): Promise<{ id: number; requestedBy?: string }> {
    // TODO: implement some code that uses the request as well
    return {
      id: userId,
      requestedBy: request.header('x-requested-by'),
    }
  }
}
```
Pour accéder Koa's request object (qui a l'objet ctx) dans une méthode de contrôleur utiliser [`@Request`](./reference/tsoa-next/functions/Request.md) décorateur:

```typescript
// src/users/usersController.ts

import * as koa from 'koa'
import { Controller, Get, Path, Request, Route } from 'tsoa-next'

@Route('users')
export class UsersController extends Controller {
  @Get('{userId}')
  public async getUser(
    @Path() userId: number,
    @Request() request: koa.Request
  ): Promise<{ id: number; path: string }> {
    const ctx = request.ctx;
    return {
      id: userId,
      path: ctx.path,
    }
  }
}
```

::: danger
Notez que le paramètre `request` ne figure pas dans votre dossier de l'OEA.
Utilisation [`@RequestProp(...)`](./reference/tsoa-next/functions/RequestProp.md) lorsque la valeur vit déjà sur l'objet de requête d'exécution sous-jacent.
Utilisation [`@Inject()`](./reference/tsoa-next/functions/Inject.md) lorsqu'un paramètre est entièrement fourni par votre propre modèle de route ou code d'emballage et doit être omis de la génération de spécifications.
:::

## RequestProp

[`@RequestProp(...)`](./reference/tsoa-next/functions/RequestProp.md) lie une propriété à partir de l'objet de requête d'exécution sous-jacent.

```ts
import { Controller, Post, RequestProp, Route } from 'tsoa-next'

@Route('request-props')
export class RequestPropsController extends Controller {
  @Post('body')
  public async getBody(@RequestProp('body') body: { name: string }): Promise<{ name: string }> {
    return body
  }
}
```

## Produits

Les [`@Produces`](./reference/tsoa-next/functions/Produces.md) décorateur est utilisé pour définir des types de médias personnalisés pour les réponses des méthodes de contrôleur dans le OpenAPI générateur. Il vous permet de spécifier un type de média spécifique pour chaque méthode, sans écraser la réponse par défaut Content-Type.

Voici un exemple d'utilisation de `@Produces` décorateur:

```typescript
@Route('MediaTypeTest')
@Produces('application/vnd.mycompany.myapp+json')
export class MediaTypeTestController extends Controller {
  @Get('users/{userId}')
  public async getDefaultProduces(@Path() userId: number): Promise<{ id: number; name: string }> {
    this.setHeader('Content-Type', 'application/vnd.mycompany.myapp+json')
    return Promise.resolve({
      id: userId,
      name: 'foo',
    })
  }
  @Get('custom/security.txt')
  @Produces('text/plain')
  public async getCustomProduces(): Promise<string> {
    const securityTxt = 'Contact: mailto: security@example.com\nExpires: 2012-12-12T12:37:00.000Z'
    this.setHeader('Content-Type', 'text/plain')
    return securityTxt
  }
}
```

::: danger
Veuillez noter qu'en utilisant [`@Produces`](./reference/tsoa-next/functions/Produces.md) n'affecte que le produit OpenAPI Spécification. Vous devez également vous assurer d'envoyer le bon en-tête en utilisant `this.setHeader('Content-Type', 'MEDIA_TYPE')` dans vos méthodes de contrôle.
:::

## Consommations

Utilisation [`@Consumes(...)`](./reference/tsoa-next/functions/Consumes.md) lorsqu'une action accepte un type de support de requête non par défaut.

```ts
import { Body, Consumes, Controller, Post, Response, Route, SuccessResponse } from 'tsoa-next'

@Route('MediaTypeTest')
export class MediaTypeTestController extends Controller {
  @Post('custom')
  @Consumes('application/vnd.mycompany.myapp.v2+json')
  @SuccessResponse('202', 'Accepted', 'application/vnd.mycompany.myapp.v2+json')
  @Response<{ message: string }>('400', 'Bad Request', undefined, 'application/problem+json')
  public async postCustomConsumes(@Body() body: { name: string }): Promise<{ id: number; name: string }> {
    this.setStatus(202)
    return {
      id: body.name.length,
      name: body.name,
    }
  }
}
```
