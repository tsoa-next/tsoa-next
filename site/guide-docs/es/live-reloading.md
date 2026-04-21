---
title: Recarga en vivo
lang: es-ES
lastUpdated: 2026-04-20T00:28:55.919Z
---

# Recarga en vivo

::: warning NOTA COMPATIVA
Esta guía tiene como objetivo [express](https://expressjs.com) y asume `tsoa-next`'s actual política de apoyo: Node.js 22 o más nuevo.
Verificamos el soporte en los LTS anteriores, LTS actual y Node vSiguiente en CI.
Los ejemplos que figuran a continuación son los siguientes: `npm`, `pnpm`, y `yarn` variantes donde el comando difiere.
Suponemos que su configuración es similar a la recomendada para [getting started](/es/getting-started)
:::

Referencia pertinente de API: [`@SpecPath`](./reference/tsoa-next/functions/SpecPath.md), [`SpecPathOptions`](./reference/tsoa-next/interfaces/SpecPathOptions.md), [`SpecRequestContext`](./reference/tsoa-next/interfaces/SpecRequestContext.md), y [`SpecCacheHandler`](./reference/tsoa-next/interfaces/SpecCacheHandler.md).

::: tip
Usaremos [nodemon](https://nodemon.io/) y [ts-node](https://github.com/TypeStrong/ts-node) para la recarga en vivo, pero cualquier herramienta que nos permita conectarse al proceso de recarga hará. Las alternativas pueden, es decir, ser una combinación de `tsc -w` y disparando `tsoa spec-and-routes` utilizando [`onchange`](https://www.npmjs.com/package/onchange).
:::

*De lo que hablaremos*

[[toc]]

## Código de recarga

### Instalar nodemon y ts-node

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

### Crear un config de nodemonio

Vamos a crear un `nodemon.json` dentro de la carpeta raíz de nuestro proyecto que se ve así:

```json
{
  "exec": "ts-node src/server.ts",
  "watch": ["src"],
  "ext": "ts"
}
```

### Agregar un script dev

Empecemos automáticamente esta configuración con el administrador de paquetes `dev` script`npm run dev`, `pnpm dev`o `yarn dev`), y, mientras estamos en él, añadir `build` y `start` comandos en nuestros `package.json`:

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

## Superar nuestra experiencia de desarrollador con `@SpecPath`

[`@SpecPath(...)`](./reference/tsoa-next/functions/SpecPath.md) permite que un controlador exponga una especificaciones en vivo o docs endpoint sin leer `swagger.json` o `openapi.yaml` desde el disco a la hora de solicitud.
Eso hace que sea un buen ajuste para los flujos de trabajo de desarrollo donde desea que la documentación generada permanezca en sincronía con los mismos metadatos controladores que sus rutas ya utilizan.

### Instalar un par de UI docs

Elija el objetivo de UI de los doctores que desea utilizar:

- Express: `npm i swagger-ui-express` / `pnpm add swagger-ui-express` / `yarn add swagger-ui-express`- Koa: `npm i swagger-ui-koa` / `pnpm add swagger-ui-koa` / `yarn add swagger-ui-koa`- Hapi: `npm i hapi-swagger` / `pnpm add hapi-swagger` / `yarn add hapi-swagger`- Redoc: `npm i redoc` / `pnpm add redoc` / `yarn add redoc`- RapiDoc: `npm i rapidoc` / `pnpm add rapidoc` / `yarn add rapidoc`

### Exposing a controlador-scoped docs endpoint

Adjuntar uno o más `@SpecPath(...)` decoradores a un controlador existente:

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

Esto te da:

- `GET /users/spec` para JSON
- `GET /users/openapi.yaml` para YAML
- `GET /users/docs` para Swagger UI

Debido a que el punto final de docs se genera a partir de los mismos metadatos de tiempo de ejecución que sus rutas, se mantiene actual como usted edita controladores y re-run `tsoa spec-and-routes`.

### Inspección de la documentación

Ahora, cuando navegamos a <a href="http://localhost:3000/users/docs" target="_blank" rel="noreferrer">localhost:3000/users/docs</a>, debemos ver un reflejo actual de nuestra API.

![SwaggerUI](/docs-images/SwaggerUI.png)

### Envío de solicitudes a través Swagger UI

Podemos seleccionar puntos finales, haga clic en el botón "Pruébalo" y enviar algunos datos rellenando el formulario.
Cuando golpeamos "Ejecutar", esa solicitud será enviada a nuestro servidor y la respuesta se mostrará debajo del formulario.

![SwaggerUI Response](/docs-images/SwUi-Response.png)

### Otros objetivos incorporados

Si prefieres una UI diferente, cambia el `target` opción:

- `@SpecPath('docs', { target: 'redoc' })`- `@SpecPath('docs', { target: 'rapidoc' })`

Si necesita una respuesta completamente personalizada, pase un manejador en `target` en lugar de eso. También puede añadir `cache` y `gate` en el mismo objeto de opciones.
