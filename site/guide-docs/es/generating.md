---
lastUpdated: 2026-04-17T20:53:42.041Z
---
# Generando Rutas y OEA

Referencia pertinente de API: [`Config`](./reference/tsoa-next/interfaces/Config.md), [`generateRoutes`](./reference/@tsoa-next/cli/functions/generateRoutes.md), [`generateSpec`](./reference/@tsoa-next/cli/functions/generateSpec.md), [`generateSpecAndRoutes`](./reference/@tsoa-next/cli/functions/generateSpecAndRoutes.md), [`ExtendedRoutesConfig`](./reference/@tsoa-next/cli/interfaces/ExtendedRoutesConfig.md), y [`ExtendedSpecConfig`](./reference/@tsoa-next/cli/interfaces/ExtendedSpecConfig.md).

## Uso CLI

### Comandos básicos

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

### Opciones

#### OpenAPI Generación de especificación (OEA)

```
Usage: tsoa spec [options]

Options:
   --configuration, -c  tsoa configuration file; default is tsoa.json in the working directory  [string]
   --discover  discover tsoa config files using a path or glob before running the command       [string]
   --host  API host                                                                             [string]
   --basePath  Base API path                                                                    [string]
```

#### Generación de rutas

```
Usage: tsoa routes [options]

Options:
  --configuration, -c  tsoa configuration file; default is tsoa.json in the working directory   [string]
  --discover  discover tsoa config files using a path or glob before running the command        [string]
  --basePath  Base API path                                                                     [string]
```

#### Descubrimiento de Config

```
Usage: tsoa discover [pathOrGlob]
```

- `discover` búsquedas por debajo de la ruta proporcionada, o bajo el directorio de trabajo actual cuando no se proporciona ningún argumento.
- Las entradas de brillo son compatibles, así que comandos como `tsoa discover "packages/*"` o `tsoa spec --discover "services/*"` expandirá las raíces coincidentes primero.
- Discovery reconoce estos nombres de archivo de configuración convencionales:
  - `tsoa.json`  - `tsoa.yaml`  - `tsoa.yml`  - `tsoa.config.js`  - `tsoa.config.cjs`- `spec`, `routes`, y `spec-and-routes` puede admirar todos los configs descubiertos:

```bash
tsoa spec --discover "packages/*"
tsoa routes --discover "./services"
tsoa spec-and-routes --discover .
```

Usted puede encontrar la referencia para la tsoa configuración archivo [here](./reference/tsoa-next/interfaces/Config.md)

Para información sobre el objeto de configuración (`tsoa.json`), también puede estar interesado en:

[`Config` interface reference](./reference/tsoa-next/interfaces/Config.md)

[Configuration sample](https://github.com/tsoa-next/tsoa-next/blob/main/tests/tsoa.json)

## Programmatic

Importar API de generación programática de `tsoa-next/cli`. La raíz `tsoa-next` el punto de entrada es sólo de tiempo de ejecución y debe ser utilizado para los decoradores y ayudantes de tiempo de ejecución.

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

**Nota:** Si usas tsoa programáticamente, por favor tenga en cuenta que tsoa's métodos pueden (bajo circunstancias raras) cambiar en versiones menores y de parche. Pero si estás usando tsoa en un archivo .ts, entonces TypeScript te ayudará a migrar a cualquier cambio. Nos reservamos este derecho a cambiar lo que son esencialmente nuestros métodos internos para que podamos seguir proporcionando valor incremental al usuario mayoritario (nuestro CLI usuarios). El CLI sin embargo sólo recibirá cambios de ruptura durante una liberación mayor.
