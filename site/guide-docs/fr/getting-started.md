---
title: Prise en main
lang: fr-FR
lastUpdated: 2026-04-17T20:53:42.041Z
---

# Début

**De quoi nous parlerons:**

[[toc]]

Référence IPA pertinente: [`Controller`](./reference/tsoa-next/classes/Controller.md), [`@Route`](./reference/tsoa-next/functions/Route.md), [`@Get`](./reference/tsoa-next/functions/Get.md), [`@Path`](./reference/tsoa-next/functions/Path.md), [`@Query`](./reference/tsoa-next/functions/Query.md), [`@Post`](./reference/tsoa-next/functions/Post.md), [`@Body`](./reference/tsoa-next/functions/Body.md)et [`@SuccessResponse`](./reference/tsoa-next/functions/SuccessResponse.md).

::: warning NOTE DE COMPATIBILITÉ
Ce guide cible [express](https://expressjs.com) et suppose `tsoa-next`La politique de soutien actuelle: Node.js 22 ou plus récent.
Nous vérifions le support dans le précédent LTS, le LTS actuel, et Node vSuivant dans CI.
Voici quelques exemples : `npm`, `pnpm`et `yarn` variantes où la commande diffère.
:::

## Initialisation de notre projet

```shell
# Create a new folder for our project
mkdir tsoa-project
cd tsoa-project

# Initialize git
git init
```

Créer un `package.json` et `tsconfig.json` avec votre gestionnaire de paquets de choix:

::: code-group

```shell [npm]
npm init -y
npm exec tsc -- --init
```

```shell [pnpm]
pnpm init
pnpm exec tsc --init
```

```shell [yarn]
yarn init -y
yarn exec tsc --init
```

:::

Installer l'application et TypeScript dépendances avec votre gestionnaire de paquets de choix:

::: code-group

```shell [npm]
npm i tsoa-next express
npm i -D typescript @types/node @types/express
```

```shell [pnpm]
pnpm add tsoa-next express
pnpm add -D typescript @types/node @types/express
```

```shell [yarn]
yarn add tsoa-next express
yarn add -D typescript @types/node @types/express
```

:::

Routes générées `tsoa-next`, donc le paquet que votre application installe est également le paquet utilisé par les contrôleurs et généré `RegisterRoutes` fichiers.
Vous pouvez également trouver le paquet publié sur [npm](https://www.npmjs.com/package/tsoa-next).

## Configuration tsoa et dactylographie

```js
// tsoa.json
{
  "entryFile": "src/app.ts",
  "noImplicitAdditionalProperties": "throw-on-extras",
  "controllerPathGlobs": ["src/**/*Controller.ts"],
  "spec": {
    "outputDirectory": "build",
    "specVersion": 3
  },
  "routes": {
    "routesDir": "build"
  }
}
```

Voyons ce qu'on dit. tsoa Ici:
Premièrement, nous précisons où sera le point d'entrée de notre demande.
Très probablement, ce fichier sera appelé `index.ts` ou `app.ts`. Nous allons créer ce fichier dans une seconde.

Ensuite, le haut niveau `controllerPathGlobs` le réglage indique tsoa où il peut chercher des contrôleurs afin que nous n'avons pas à les importer manuellement.

Ensuite, on dit tsoa la vérification stricte des biens excédentaires (pour utiliser TypeScript ou supplémentaire Vérification des biens (à utiliser) OpenAPI terminologie) devrait l'être.
Nous pouvons choisir de "ignorer" des propriétés supplémentaires (le OpenAPI par défaut), supprimez-les lors de la validation ("silently-supprimer-extras") ou relancez une erreur sur le Client ("jetez-sur-extras").
Ensuite, nous définissons le répertoire de sortie OpenAPI spécification (OEA) et notre `routes.ts` fichier, dont nous parlerons plus tard.

Nous avons mis le `specVersion` à `3` donc tsoa générera une OpenAPI v3 spécification.
Vous pouvez également utiliser `3.1` quand tu veux OpenAPI 3.1 sortie.

Pour une liste complète de toutes les configurations possibles, consultez la [Référence d’API](./reference/tsoa-next/interfaces/Config.md)

::: tip
Alors que la configuration par défaut de ts fonctionnera pour ce guide, un tsconfig amélioré. Json ressemblerait à ça :
::: details

```jsonc
{
  "compilerOptions": {
    /* Basic Options */
    "incremental": true,
    "target": "es6",
    "module": "commonjs",
    "outDir": "build",

    /* Strict Type-Checking Options */
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    "noImplicitThis": true,
    "alwaysStrict": true,

    /* Additional Checks */
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,

    /* Module Resolution Options */
    "moduleResolution": "node",
    "baseUrl": ".",
    "esModuleInterop": true,

    /* Experimental Options */
    "experimentalDecorators": true,
    // emitDecoratorMetadata is not needed by tsoa-next itself

    /* Advanced Options */
    "forceConsistentCasingInFileNames": true,
  },
}
```

:::

## Définition de notre premier modèle

Si vous avez déjà OpenAPI Spécification, vous pouvez utiliser OpenAPI outillage pour générer vos modèles ou interfaces.
Autrement, définissons un `User` Interface dans `src/users/user.ts`.

```typescript
export interface User {
  id: number
  email: string
  name: string
  status?: 'Happy' | 'Sad'
  phoneNumbers: string[]
}
```

Avant de commencer à définir notre contrôleur, c'est généralement une bonne idée de créer un service qui gère l'interaction avec nos modèles au lieu de pousser toute cette logique dans la couche de contrôleur.

```ts
// src/users/usersService.ts
import { User } from './user'

// A post request should not contain an id.
export type UserCreationParams = Pick<User, 'email' | 'name' | 'phoneNumbers'>

export class UsersService {
  public get(id: number, name?: string): User {
    return {
      id,
      email: 'jane@doe.com',
      name: name ?? 'Jane Doe',
      status: 'Happy',
      phoneNumbers: [],
    }
  }

  public create(userCreationParams: UserCreationParams): User {
    return {
      id: Math.floor(Math.random() * 10000), // Random
      status: 'Happy',
      ...userCreationParams,
    }
  }
}
```

## Définition d'un simple contrôleur

```typescript {15,17,19,20,25,26,28}
// src/users/usersController.ts
import { Body, Controller, Get, Path, Post, Query, Route, SuccessResponse } from 'tsoa-next'
import { User } from './user'
import { UsersService, UserCreationParams } from './usersService'

@Route('users')
export class UsersController extends Controller {
  @Get('{userId}')
  public async getUser(@Path() userId: number, @Query() name?: string): Promise<User> {
    return new UsersService().get(userId, name)
  }

  @SuccessResponse('201', 'Created') // Custom success response
  @Post()
  public async createUser(@Body() requestBody: UserCreationParams): Promise<void> {
    this.setStatus(201) // set return status 201
    new UsersService().create(requestBody)
    return
  }
}
```

Faisons un pas en arrière et parlons de ce qui se passe ici.
Comme vous pouvez l'espérer déjà, nous définissons `/users/` route en utilisant la [`@Route()`](./reference/tsoa-next/functions/Route.md) décorateur au-dessus de notre classe de contrôleur.

En outre, nous définissons 2 méthodes: `getUser` et `createUser`.
Les [`@Get()`](./reference/tsoa-next/functions/Get.md) décorateur en combinaison avec notre route de base `/users/` dira tsoa pour invoquer cette méthode pour chaque requête _GET_ `/users/{{userId}}`, où _{utilisateur Id}_ est un modèle.

::: tip OpenAPI Path Templating
Routage tsoa est proche de miroir OpenAPILe chemin de templatation pour des raisons de compatibilité.
La templatation de chemin fait référence à l'utilisation d'expressions de gabarit, délimitées par des brides bouclées ({}), pour marquer une section d'un chemin d'URL comme remplaçables en utilisant des paramètres de chemin.
:::

Sous le capot, ce serait comme définir `app.get('users/:userId')`.
Alors que express vous permet d'utiliser des définitions de route régex-ish, nous préférons diviser le routage et la validation plus clairement.
Parce que vous demandez que le _id_ soit un _numéro_ en utilisant le [`@Path()`](./reference/tsoa-next/functions/Path.md) décorateur avec un `userId` du numéro de type, tsoa refusera de passer i.e. une _chaîne_ ici.
De même, si vous voulez accepter un _string_ avec un certain motif, vous pouvez le faire en utilisant JSON Schema annotations. Vous pouvez en savoir plus à ce sujet [here](#what-s-next).

tsoa-next prend en charge le chemin habituel, la requête, l'en-tête et les décorateurs de corps, et prend également en charge les décorateurs de formes et de données multiparties tels que [`@FormField()`](./reference/tsoa-next/functions/FormField.md), [`@UploadedFile()`](./reference/tsoa-next/functions/UploadedFile.md)et [`@UploadedFiles()`](./reference/tsoa-next/functions/UploadedFiles.md), plus les paramètres d'exécution injectés uniquement comme [`@Request()`](./reference/tsoa-next/functions/Request.md) et [`@Res()`](./reference/tsoa-next/functions/Res.md).

::: tip
Si le nom du paramètre est égal au paramètre http message, vous pouvez omettre l'argument aux décorateurs, sinon vous pouvez fournir un argument:

```ts
@Query('my-query') myQuery: string;
```

:::

Une liste complète de tous les décorateurs peut être trouvée [here](./decorators).

::: warning Caveat
Utilisez toujours une exportation nommée (`export class C`) sur la classe du contrôleur tsoa pour le récupérer correctement.
Exportations par défaut (`export default class C`) ne sont actuellement pas pris en charge.
:::

## Création de notre serveur express

Nous allons maintenant créer un `app.ts` et a `server.ts` fichier dans notre répertoire source comme ceci:

```ts
// src/app.ts
import express, { json, urlencoded } from 'express'
import { RegisterRoutes } from '../build/routes'

export const app = express()

// Use body parser to read sent json payloads
app.use(
  urlencoded({
    extended: true,
  }),
)
app.use(json())

RegisterRoutes(app)
```

```ts
// src/server.ts
import { app } from './app'

const port = process.env.PORT || 3000

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
```

## Construire les fichiers générés

À ce stade, vous avez peut-être remarqué que TypeScript ne trouvera pas le `RegisterRoutes` importations en provenance `build/routes`.
C'est parce que nous n'avons pas demandé tsoa pour générer le fichier des routes et OpenAPI Spec pour l'instant.
Allons-y.

```shell
mkdir -p build # Create the build directory if it doesn't exist
```

::: code-group

```shell [npm]
npm exec tsoa -- spec-and-routes
```

```shell [pnpm]
pnpm exec tsoa spec-and-routes
```

```shell [yarn]
yarn exec tsoa spec-and-routes
```

:::

Maintenant vos fichiers générés auraient dû être créés et vous pouvez compiler TypeScript et démarrez votre serveur & #160;:

::: code-group

```shell [npm]
npm exec tsc -- --outDir build --experimentalDecorators
```

```shell [pnpm]
pnpm exec tsc --outDir build --experimentalDecorators
```

```shell [yarn]
yarn exec tsc --outDir build --experimentalDecorators
```

:::

```shell
node build/src/server.js
```

::: tip

Vous pouvez ajouter ces scripts à votre `package.json` à ce stade:

```js
"main": "build/src/server.js",
"scripts": {
  "build": "tsoa spec-and-routes && tsc",
  "start": "node build/src/server.js"
},
```

:::

## Et ensuite ?

- Invoquer manuellement `tsc` et `tsoa routes` en développement n'est pas très pratique.
- Inspecter notre premier OpenAPI spécification et supercharger notre boucle de rétroaction en servant une version à jour de SwaggerUI en cours de développement.

Nous pouvons améliorer cela en utilisant [live reloading](./live-reloading).

- Améliorer notre réponse pour les erreurs de validation en utilisant correctement [error handling](./error-handling)- Utilisation [Descriptions](./descriptions), [Exemples](./examples) et [Annotations](./annotations) pour une validation avancée et une meilleure documentation
