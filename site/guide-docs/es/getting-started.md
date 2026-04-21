---
title: Primeros pasos
lang: es-ES
lastUpdated: 2026-04-17T20:53:42.041Z
---

# Comienzo

*De lo que hablaremos*

[[toc]]

Referencia pertinente de API: [`Controller`](./reference/tsoa-next/classes/Controller.md), [`@Route`](./reference/tsoa-next/functions/Route.md), [`@Get`](./reference/tsoa-next/functions/Get.md), [`@Path`](./reference/tsoa-next/functions/Path.md), [`@Query`](./reference/tsoa-next/functions/Query.md), [`@Post`](./reference/tsoa-next/functions/Post.md), [`@Body`](./reference/tsoa-next/functions/Body.md), y [`@SuccessResponse`](./reference/tsoa-next/functions/SuccessResponse.md).

::: warning NOTA COMPATIVA
Esta guía tiene como objetivo [express](https://expressjs.com) y asume `tsoa-next`'s actual política de apoyo: Node.js 22 o más nuevo.
Verificamos el soporte en los LTS anteriores, LTS actual y Node vSiguiente en CI.
Los ejemplos que figuran a continuación son los siguientes: `npm`, `pnpm`, y `yarn` variantes donde el comando difiere.
:::

## Iniciando nuestro proyecto

```shell
# Create a new folder for our project
mkdir tsoa-project
cd tsoa-project

# Initialize git
git init
```

Crear un `package.json` y `tsconfig.json` con su administrador de paquetes de elección:

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

Instala la aplicación y TypeScript dependencias con su administrador de paquetes de elección:

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

Importaciones de las rutas generadas `tsoa-next`, por lo que el paquete que instala su aplicación es también el paquete utilizado por los controladores y generado `RegisterRoutes` archivos.
También puede encontrar el paquete publicado en [npm](https://www.npmjs.com/package/tsoa-next).

## Configuración tsoa y tipografía

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

Echemos un vistazo a lo que estamos diciendo tsoa Aquí:
Primero, especificamos dónde estará el punto de entrada de nuestra aplicación.
Lo más probable es que este archivo se llame `index.ts` o `app.ts`. Crearemos este archivo en un segundo.

Después, el nivel superior `controllerPathGlobs` El ajuste dice tsoa donde puede buscar controladores para que no tengamos que importarlos manualmente.

Siguiente, diremos tsoa qué tan estricto exceso de propiedad control (para utilizar el TypeScript término) o adicional Verificación de propiedades (para utilizar OpenAPI La terminología debe ser.
Podemos elegir "ignorar" propiedades adicionales (las OpenAPI por defecto), eliminarlos durante la validación ("extras silenciosamente-remove"), o lanzar un Error de vuelta al Cliente ("throw-on-extras").
A continuación, establecemos el directorio de salida para fuera OpenAPI (OEA) y nuestra `routes.ts` archivo, del que hablaremos más tarde.

Hemos establecido el `specVersion` a `3` Así que... tsoa generará un OpenAPI v3 especificación.
También puede utilizar `3.1` cuando quieras OpenAPI 3.1.

Para una lista completa de todos los posibles config, echa un vistazo a la [Referencia de API](./reference/tsoa-next/interfaces/Config.md)

::: tip
Mientras que el configuración ts predeterminado funcionará para esta guía, un tsconfig mejorado. Json parecería algo así:
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

## Definir nuestro primer modelo

Si ya tienes un OpenAPI Especificación, puede utilizar ya existente OpenAPI herramienta para generar sus modelos o interfaces.
De lo contrario, definamos un `User` Interfaz en `src/users/user.ts`.

```typescript
export interface User {
  id: number
  email: string
  name: string
  status?: 'Happy' | 'Sad'
  phoneNumbers: string[]
}
```

Antes de comenzar a definir a nuestro Contralor, es generalmente una buena idea crear un Servicio que maneja la interacción con nuestros Modelos en lugar de empuje toda esa lógica en la capa controladora.

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

## Definir un simple controlador

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

Vamos a dar un paso atrás y hablar de lo que está pasando aquí.
Como usted puede esperar que ya lo digamos, estamos definiendo un `/users/` ruta utilizando el [`@Route()`](./reference/tsoa-next/functions/Route.md) decorador sobre nuestra clase de controlador.

Adicionalmente, definimos 2 métodos: `getUser` y `createUser`.
El [`@Get()`](./reference/tsoa-next/functions/Get.md) decorador en combinación con nuestra ruta base `/users/` lo dirá tsoa para invocar este método para cada solicitud _GET_ `/users/{{userId}}`, donde _{user Es una plantilla.

::: tip Templatura OpenAPI Path
Rotación en tsoa está muy reflejado OpenAPIEs tentador por razones de compatibilidad.
La tentación del camino se refiere al uso de expresiones de plantilla, delimitadas por frenos rizados ({}), para marcar una sección de una ruta URL como reemplazable utilizando parámetros de ruta.
:::

Bajo la capucha, esto sería como definir `app.get('users/:userId')`.
Mientras que express le permite utilizar las definiciones de ruta regex-ish, preferimos dividir el enrutamiento y la validación más claramente.
Porque estás pidiendo que el _id_ sea un _number_ usando el [`@Path()`](./reference/tsoa-next/functions/Path.md) decorador con `userId` de tipo número, tsoa rechazará pasar aquí un _string_.
De manera similar, si quieres aceptar un _string_ con un determinado patrón, puedes hacerlo usando anotaciones JSON Schema. Usted puede aprender más sobre eso [here](#what-s-next).

tsoa-next soporta el camino habitual, la consulta, la cabecera y los decoradores del cuerpo, y también admite decoradores multiparte de forma-datos como [`@FormField()`](./reference/tsoa-next/functions/FormField.md), [`@UploadedFile()`](./reference/tsoa-next/functions/UploadedFile.md), y [`@UploadedFiles()`](./reference/tsoa-next/functions/UploadedFiles.md), además de parámetros inyectados solo por tiempo de ejecución, como [`@Request()`](./reference/tsoa-next/functions/Request.md) y [`@Res()`](./reference/tsoa-next/functions/Res.md).

::: tip
Si el nombre del parámetro es igual al parámetro del mensaje http, puede omitir el argumento a los decoradores, de lo contrario puede proporcionar un argumento:

```ts
@Query('my-query') myQuery: string;
```

:::

Una lista completa de todos los decoradores se puede encontrar [here](./decorators).

::: warning Caveat
Utilice siempre una exportación llamada (`export class C`) en la clase de controlador para tsoa para recogerlo correctamente.
Exportaciones por defecto (`export default class C`) actualmente no son compatibles.
:::

## Creando nuestro servidor expreso

Vamos a crear un `app.ts` y a `server.ts` archivo en nuestro directorio fuente como este:

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

## Construir los archivos generados

En este punto puede haber notado que TypeScript no encontrará `RegisterRoutes` de la importación `build/routes`.
Eso es porque no hemos preguntado tsoa para generar el archivo de rutas y OpenAPI espectro todavía.
Hagámoslo ahora:

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

Ahora sus archivos generados deberían haber sido creados y usted puede compilar TypeScript y comenzar su servidor:

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

Usted puede querer añadir estos scripts a sus `package.json` en este punto:

```js
"main": "build/src/server.js",
"scripts": {
  "build": "tsoa spec-and-routes && tsc",
  "start": "node build/src/server.js"
},
```

:::

## ¿Qué sigue?

- Invocación manual `tsc` y `tsoa routes` en el desarrollo no es muy conveniente.
- Inspección nuestra primera OpenAPI especificación y superponiendo nuestro bucle de retroalimentación al servir una versión actualizada de SwaggerUI durante el desarrollo.

Podemos mejorarlo usando [live reloading](./live-reloading).

- Mejorar nuestra respuesta para errores de validación utilizando correctamente [error handling](./error-handling)- Uso [Descriptions](./descriptions), [Ejemplos](./examples) y [Annotations](./annotations) para validación avanzada y mejor documentación
