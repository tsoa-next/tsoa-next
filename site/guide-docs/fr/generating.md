---
lastUpdated: 2026-04-17T20:53:42.041Z
---
# Routes de production et OEA

Référence IPA pertinente: [`Config`](./reference/tsoa-next/interfaces/Config.md), [`generateRoutes`](./reference/@tsoa-next/cli/functions/generateRoutes.md), [`generateSpec`](./reference/@tsoa-next/cli/functions/generateSpec.md), [`generateSpecAndRoutes`](./reference/@tsoa-next/cli/functions/generateSpecAndRoutes.md), [`ExtendedRoutesConfig`](./reference/@tsoa-next/cli/interfaces/ExtendedRoutesConfig.md)et [`ExtendedSpecConfig`](./reference/@tsoa-next/cli/interfaces/ExtendedSpecConfig.md).

## Utilisation CLI

### Commandes de base

```bash
# generate OAS
tsoa spec

# generate routes
tsoa routes

# discover config files beneath the current directory
tsoa discover

# discover config files beneath a path or glob
tsoa discover "packages/*"
```

### Options

#### OpenAPI Production de spécifications (OEA)

```
Usage: tsoa spec [options]

Options:
   --configuration, -c  tsoa configuration file; default is tsoa.json in the working directory  [string]
   --discover  discover tsoa config files using a path or glob before running the command       [string]
   --host  API host                                                                             [string]
   --basePath  Base API path                                                                    [string]
```

#### Génération de parcours

```
Usage: tsoa routes [options]

Options:
  --configuration, -c  tsoa configuration file; default is tsoa.json in the working directory   [string]
  --discover  discover tsoa config files using a path or glob before running the command        [string]
  --basePath  Base API path                                                                     [string]
```

#### Config découverte

```
Usage: tsoa discover [pathOrGlob]
```

- `discover` recherche sous le chemin fourni, ou sous le répertoire de travail actuel quand aucun argument n'est fourni.
- Les entrées Glob sont prises en charge, donc des commandes comme `tsoa discover "packages/*"` ou `tsoa spec --discover "services/*"` élargira d'abord les racines correspondantes.
- Discovery reconnaît ces noms de fichiers de configuration classiques :
  - `tsoa.json`  - `tsoa.yaml`  - `tsoa.yml`  - `tsoa.config.js`  - `tsoa.config.cjs`- `spec`, `routes`et `spec-and-routes` peut se diluer sur toutes les configs découvertes:

```bash
tsoa spec --discover "packages/*"
tsoa routes --discover "./services"
tsoa spec-and-routes --discover .
```

Vous pouvez trouver la référence pour le tsoa fichier de configuration [here](./reference/tsoa-next/interfaces/Config.md)

Pour plus d'informations sur l'objet de configuration (`tsoa.json`), vous pourriez également être intéressé par:

[`Config` interface reference](./reference/tsoa-next/interfaces/Config.md)

[Configuration sample](https://github.com/tsoa-next/tsoa-next/blob/main/tests/tsoa.json)

## Programme

Importer des API de génération programmatique à partir `tsoa-next/cli`. La racine `tsoa-next` le point d'entrée est uniquement d'exécution et devrait être utilisé pour les décorateurs et les aides à l'exécution.

```typescript
import { generateRoutes, generateSpec, generateSpecAndRoutes, ExtendedRoutesConfig, ExtendedSpecConfig } from 'tsoa-next/cli'

;(async () => {
  const specOptions: ExtendedSpecConfig = {
    basePath: '/api',
    entryFile: './api/server.ts',
    specVersion: 3,
    outputDirectory: './api/dist',
    controllerPathGlobs: ['./routeControllers/**/*Controller.ts'],
  }

  const routeOptions: ExtendedRoutesConfig = {
    basePath: '/api',
    entryFile: './api/server.ts',
    routesDir: './api',
  }

  await generateSpec(specOptions)

  await generateRoutes(routeOptions)

  // Or generate both outputs from one shared metadata pass:
  await generateSpecAndRoutes({
    configuration: {
      entryFile: './api/server.ts',
      controllerPathGlobs: ['./routeControllers/**/*Controller.ts'],
      spec: {
        outputDirectory: './api/dist',
        specVersion: 3.1,
      },
      routes: {
        routesDir: './api',
      },
    },
  })
})()
```

**Note:** Si vous utilisez tsoa programme, s'il vous plaît être conscient que tsoa's méthodes peuvent (dans de rares circonstances) changer dans les libérations mineures et patch. Mais si vous utilisez tsoa dans un fichier .ts, alors TypeScript vous aidera à migrer vers tout changement. Nous nous réservons ce droit de changer ce qui est essentiellement nos méthodes internes afin de continuer à fournir une valeur ajoutée à la majorité des utilisateurs (notre CLI les utilisateurs). Les CLI cependant ne recevra que des changements de rupture lors d'une libération majeure.
