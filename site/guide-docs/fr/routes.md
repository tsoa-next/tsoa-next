---
lastUpdated: 2026-04-17T20:53:42.041Z
---
# Consommer les routes générées

Référence IPA pertinente: [`Config`](./reference/tsoa-next/interfaces/Config.md) et [`@Route`](./reference/tsoa-next/functions/Route.md).

Vous avez deux options pour dire tsoa où il peut trouver les contrôleurs qu'il utilisera pour créer l'auto-généré `routes.ts` fichier.

## Utilisation de contrôleurs automatiques découverte

Vous pouvez le dire `tsoa-next` d'utiliser la découverte automatique du contrôleur en fournissant un ou plusieurs [minimatch globs](http://www.globtester.com/) dans le haut niveau `controllerPathGlobs` champ de votre [`Config`](./reference/tsoa-next/interfaces/Config.md) fichier (par exemple `tsoa.json`).

Pour :

- Les nouveaux développeurs peuvent ajouter un contrôleur sans avoir à savoir comment tsoa "crawls" pour les contrôleurs. Tant que leur contrôleur est pris par le glob que vous fournissez, le contrôleur sera ajouté au OpenAPI documentation et à l'auto-générée `routes.ts` fichier.

Points négatifs:

- Il peut être un peu plus lent que l'autre approche d'importation explicite parce que tsoa doit étendre et charger les globs configurés.

Comme vous pouvez le voir à partir des modèles de globs des contrôleurs ci-dessous, vous pouvez fournir plusieurs globs de différents modèles:

```js
{
  "entryFile": "...",
  "controllerPathGlobs": [
    "./dir-with-controllers/*",
    "./recursive-dir/**/*",
    "./custom-filerecursive-dir/**/*.controller.ts"
  ],
  "routes": {
    "routesDir": "...",
    "middleware": "..."
  }
}
```

## Signalement manuel tsoa les contrôleurs à utiliser dans le fichier d'entrée de l'application

Si vous omettez `controllerPathGlobs`, tsoa peut ramper le fichier d'entrée d'application et suivre les importations de contrôleur qui ont le `@Route` décorateur.

Pour :

- La génération de routes sera généralement plus rapide parce que tsoa suit vos importations explicites au lieu d'étendre les globules.

Points négatifs:

- Les nouveaux développeurs de votre équipe peuvent ajouter un contrôleur et ne pas comprendre pourquoi le nouveau contrôleur n'a pas été exposé au routeur ou au OpenAPI la génération. Si c'est un problème pour vous, préférez `controllerPathGlobs`.

```typescript
import * as methodOverride from 'method-override'
import * as express from 'express'
import * as bodyParser from 'body-parser'
import { RegisterRoutes } from './routes'

// ########################################################################
// controllers need to be referenced in order to get crawled by the generator
import './users/usersController'
// ########################################################################

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(methodOverride())

RegisterRoutes(app)

app.listen(3000)
```
