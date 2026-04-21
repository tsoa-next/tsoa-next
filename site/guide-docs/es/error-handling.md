---
title: Manejo de errores
lang: es-ES
lastUpdated: 2026-04-20T00:28:55.924Z
---

# Manejo de errores

::: warning NOTA COMPATIVA
Esta guía tiene como objetivo [express](https://expressjs.com) y asume `tsoa-next`'s actual política de apoyo: Node.js 22 o más nuevo.
Verificamos el soporte en los LTS anteriores, LTS actual y Node vSiguiente en CI.
Ejemplos en las guías de configuración vinculadas incluyen `npm`, `pnpm`, y `yarn` variantes donde el comando difiere.
Esta guía supone que has seguido el [getting started guide](./getting-started) o tener una configuración similar.
:::

Referencia pertinente de API: [`ValidateError`](./reference/tsoa-next/classes/ValidateError.md), [`@Response`](./reference/tsoa-next/functions/Response.md), [`@Res`](./reference/tsoa-next/functions/Res.md), [`TsoaResponse`](./reference/tsoa-next/type-aliases/TsoaResponse.md), y [`Controller`](./reference/tsoa-next/classes/Controller.md).

Como usted puede haber notado después de seguir todos los pasos de [getting started guide](./getting-started), nuestro servidor no permite parámetros inválidos, pero la respuesta todavía no es muy ideal.

![Current Error Response](/docs-images/errors-server.png)

Para el Cliente, parece algo así:

![Client Error Response](/docs-images/errors-client.png)

## Configuración del manejo de errores

### Errores de validación de manejo

Primero asegúrese de que, cuando el Cliente activa un Error de validación, en lugar de imprimir el rastro de la pila, en lugar de mostrar una respuesta json correctamente formateado.

Al final de nuestro `app.ts`Después de la llamada `RegisterRoutes(app)`, vamos a añadir un controlador de error expreso global:

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

Ahora, la misma solicitud responderá así:

![Client Error with handler](/docs-images/errors-json-client.png)

Además, nuestra consola mostrará:

![Server Error with handler](/docs-images/errors-json-server.png)

### Manejo de rutas perdidas

Con el fin de manejar urls perdidos más agraciadamente, podemos añadir un manejador de ruta "todas":

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

## Especificación de tipos de respuesta de errores OpenAPI

Si revisa el punto final de la documentación, notará que todavía no tenemos documentación para nuestros Errores.
Desde entonces TypeScript no verifica el lanzamiento de Errores, tsoa No podemos inferir el tipo de respuesta que estamos enviando en estos casos.

::: warning
Usar el `@Response` decorador exportado por `tsoa-next`, no Express's `Response` tipo.
Aliasing the tsoa-next la importación está bien, pero todavía tiene que resolverse tsoa-next decorador.
:::

Sin embargo, tenemos una manera para que usted especifique manualmente estas devoluciones:

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

Esto debería hacer que nuestros doctores muestren algo así:

![SwaggerUI showing our 422 Response](/docs-images/err-422-swui.png)

::: tip
OpenAPI permite combinar códigos de estado como '2xx' o combinar todos los códigos usando 'default'. tsoa apoyará esto:

```ts
@Response<ErrorResponse>('default', 'Unexpected error')
@Get('Response')
public async getResponse(): Promise<TestModel> {
  return new ModelService().getModel()
}
```

:::

## Respuestas alternadas tipocheck

En versiones recientes de tsoa, tenemos la opción de inyectar una función de respuesta marco-agnóstico en nuestra función que podemos llamar para formular una respuesta que no cumple con el tipo de retorno de nuestro método de controlador / código de estado y encabezados (que se utiliza para la respuesta de éxito).
Esto es especialmente útil para responder con una respuesta de error sin el riesgo de desajustes tipo asociados con errores de lanzamiento.
Con el fin de inyectar a uno/más respuesta, podemos utilizar el `@Res()` decorador:

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
