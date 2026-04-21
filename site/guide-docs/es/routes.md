---
lastUpdated: 2026-04-17T20:53:42.041Z
---
# Consumir rutas generadas

Referencia pertinente de API: [`Config`](./reference/tsoa-next/interfaces/Config.md) y [`@Route`](./reference/tsoa-next/functions/Route.md).

Tienes dos opciones para saber tsoa donde puede encontrar los controladores que utilizará para crear el auto-generado `routes.ts` archivo.

## Utilizando el descubrimiento de controladores automáticos

Puedes decir `tsoa-next` para utilizar el descubrimiento del controlador automático proporcionando uno o más [minimatch globs](http://www.globtester.com/) en el nivel superior `controllerPathGlobs` campo de su [`Config`](./reference/tsoa-next/interfaces/Config.md) archivo (por ejemplo `tsoa.json`).

Pros:

- Los nuevos desarrolladores pueden agregar un controlador sin tener que saber cómo tsoa "grietas" para los controladores. Mientras su controlador sea atrapado por el glob que usted proporciona, el controlador se añadirá al OpenAPI documentación y al autogenerado `routes.ts` archivo.

Cons:

- Puede ser ligeramente más lento que el enfoque de importación explícito alternativo porque tsoa necesita expandir y cargar los globs configurados.

Como puede ver desde los patrones de globs de los controladores a continuación, puede proporcionar múltiples globs de varios patrones:

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

## Manualmente diciéndole tsoa qué controladores utilizar en el archivo de entrada de la aplicación

Si omites `controllerPathGlobs`, tsoa puede arrastrar el archivo de entrada de aplicación y seguir las importaciones de controlador que tienen el `@Route` decorador.

Pros:

- La generación de la ruta generalmente será más rápida porque tsoa sigue sus importaciones explícitas en lugar de expandir los globs.

Cons:

- Los nuevos desarrolladores en su equipo podrían agregar un controlador y no entender por qué el nuevo controlador no estaba expuesto al router o al OpenAPI generación. Si eso es un problema para usted, prefiera `controllerPathGlobs`.

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
