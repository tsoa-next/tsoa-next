---
title: Rechargement réel
lang: fr-FR
lastUpdated: 2026-04-20T00:28:55.919Z
---

# Rechargement réel

::: warning NOTE DE COMPATIBILITÉ
Ce guide cible [express](https://expressjs.com) et suppose `tsoa-next`La politique de soutien actuelle: Node.js 22 ou plus récent.
Nous vérifions le support dans le précédent LTS, le LTS actuel, et Node vSuivant dans CI.
Voici quelques exemples : `npm`, `pnpm`et `yarn` variantes où la commande diffère.
Nous supposons que votre configuration est similaire à celle recommandée pour [getting started](/fr/getting-started)
:::

Référence IPA pertinente: [`@SpecPath`](./reference/tsoa-next/functions/SpecPath.md), [`SpecPathOptions`](./reference/tsoa-next/interfaces/SpecPathOptions.md), [`SpecRequestContext`](./reference/tsoa-next/interfaces/SpecRequestContext.md)et [`SpecCacheHandler`](./reference/tsoa-next/interfaces/SpecCacheHandler.md).

::: tip
Nous utiliserons [nodemon](https://nodemon.io/) et [ts-node](https://github.com/TypeStrong/ts-node) pour le rechargement en direct, mais tout outil qui nous permet de nous connecter au processus de rechargement fera. Les solutions de remplacement peuvent, c'est-à-dire `tsc -w` et déclenchement `tsoa spec-and-routes` utilisant [`onchange`](https://www.npmjs.com/package/onchange).
:::

**De quoi nous parlerons:**

[[toc]]

## Code de rechargement

### Installer nodémon et ts-node

::: code-group

```bash [npm]
npm i -D nodemon ts-node concurrently
```

```bash [pnpm]
pnpm add -D nodemon ts-node concurrently
```

```bash [yarn]
yarn add -D nodemon ts-node concurrently
```

:::

### Création d'une configuration nodémon

Maintenant, créons un `nodemon.json` dans le dossier racine de notre projet qui ressemble à ceci:

```json
{
  "exec": "ts-node src/server.ts",
  "watch": ["src"],
  "ext": "ts"
}
```

### Ajout d'un script dev

Commençons automatiquement cette configuration avec votre gestionnaire de paquets `dev` script (`npm run dev`, `pnpm dev`ou `yarn dev`) et, pendant que nous y sommes, ajouter `build` et `start` commandes dans notre `package.json`:

```diff
{
  "name": "starter",
  "version": "0.0.1",
+ "scripts": {
+   "dev": "concurrently \"nodemon\" \"nodemon -x tsoa spec-and-routes\"",
+   "build": "tsoa spec-and-routes && tsc",
+   "start": "node build/src/server.js"
+ },
  "dependencies": {
  // ...
}
```

## Supercharger notre expérience de développeur avec `@SpecPath`

[`@SpecPath(...)`](./reference/tsoa-next/functions/SpecPath.md) permet à un contrôleur d'exposer un paramètre spec ou docs en direct sans lecture `swagger.json` ou `openapi.yaml` à partir du disque à la demande.
Cela le rend un bon ajustement pour les workflows de développement où vous voulez que la documentation générée reste en synchronisation avec les mêmes métadonnées de contrôleur que vos itinéraires utilisent déjà.

### Installer un pair d'interface utilisateur docs

Choisissez la cible d'interface utilisateur docs que vous souhaitez utiliser:

- Express: `npm i swagger-ui-express` / `pnpm add swagger-ui-express` / `yarn add swagger-ui-express`- Koa: `npm i swagger-ui-koa` / `pnpm add swagger-ui-koa` / `yarn add swagger-ui-koa`- Hapi: `npm i hapi-swagger` / `pnpm add hapi-swagger` / `yarn add hapi-swagger`- Redoc: `npm i redoc` / `pnpm add redoc` / `yarn add redoc`- RapiDoc: `npm i rapidoc` / `pnpm add rapidoc` / `yarn add rapidoc`

### Exposer un point d'arrêt de docs de controller-scoped

Joindre un ou plusieurs `@SpecPath(...)` décorateurs à un contrôleur existant:

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

Cela vous donne :

- `GET /users/spec` pour JSON
- `GET /users/openapi.yaml` pour YAML
- `GET /users/docs` pour Swagger UE

Puisque le paramètre docs est généré à partir des mêmes métadonnées d'exécution que vos routes, il reste à jour lorsque vous modifiez les contrôleurs et ré-exécutez `tsoa spec-and-routes`.

### Inspection de la documentation

Maintenant, quand nous allons <a href="http://localhost:3000/users/docs" target="_blank" rel="noreferrer">localhost:3000/utilisateurs/docs</a>, nous devrions voir un reflet actuel de notre API.

![SwaggerUI](/docs-images/SwaggerUI.png)

### Envoi des demandes Swagger UE

Nous pouvons sélectionner les paramètres, cliquer sur le bouton "Essayez" et soumettre certaines données en remplissant le formulaire.
Lorsque nous appuyez sur "Exécuter", cette requête sera envoyée à notre serveur et la réponse sera affichée sous le formulaire.

![SwaggerUI Response](/docs-images/SwUi-Response.png)

### Autres cibles intégrées

Si vous préférez un régime d'assurance-chômage différent, changez le `target` option:

- `@SpecPath('docs', { target: 'redoc' })`- `@SpecPath('docs', { target: 'rapidoc' })`

Si vous avez besoin d'une réponse entièrement personnalisée, passez un gestionnaire dans `target` à la place. Vous pouvez également ajouter `cache` et `gate` dans le même objet options.
