---
lastUpdated: 2026-04-17T20:53:42.039Z
---
# Decoradores

Tenga en cuenta que esta sección sólo abarca decoradores que no se describen por separado, como [`@Response`](./error-handling) o los decoradores del parámetro central introducidos en [Primeros pasos](./getting-started).
Para una visión general completa, por favor revise la [Referencia de API](./reference/).
Referencia pertinente de API: [`@Security`](./reference/tsoa-next/functions/Security.md), [`@NoSecurity`](./reference/tsoa-next/functions/NoSecurity.md), [`@Tags`](./reference/tsoa-next/functions/Tags.md), [`@OperationId`](./reference/tsoa-next/functions/OperationId.md), [`@Deprecated`](./reference/tsoa-next/functions/Deprecated.md), [`@Validate`](./reference/tsoa-next/functions/Validate.md), [`@SpecPath`](./reference/tsoa-next/functions/SpecPath.md), [`@Hidden`](./reference/tsoa-next/functions/Hidden.md), [`@Request`](./reference/tsoa-next/functions/Request.md), [`@RequestProp`](./reference/tsoa-next/functions/RequestProp.md), [`@Inject`](./reference/tsoa-next/functions/Inject.md), [`@Produces`](./reference/tsoa-next/functions/Produces.md), y [`@Consumes`](./reference/tsoa-next/functions/Consumes.md).

## Seguridad

El [`@Security`](./reference/tsoa-next/functions/Security.md) El decorador se puede utilizar por encima de los métodos del controlador para indicar que debe haber autenticación antes de ejecutar esos métodos. Como se describe anteriormente, la autenticación se hace en un archivo que se hace referencia en tsoaEs configuración. Los nombres de los esquemas son definidos por el usuario y deben coincidir con los nombres en sus OpenAPI configuración de seguridad y módulo de autenticación. Al utilizar el `@Security` decorador, puede elegir entre tener uno o varios métodos de autenticación. Si elige tener múltiples métodos de autenticación, puede elegir entre tener que pasar uno de los métodos (OR):

```ts
@Security('jwt', ['write:pets', 'read:pets'])
@Security('api_key')
@Get('OauthOrAPIkey')
public async GetWithOrSecurity(@Request() request: express.Request): Promise<any> {
}
```

o tener que pasar todos ellos (AND):

```ts
@Security({
  jwt: ['write:pets', 'read:pets'],
  api_key: [],
})
@Get('OauthAndAPIkey')
public async GetWithAndSecurity(@Request() request: express.Request): Promise<any> {
}
```

## NoSecurity

Uso [`@NoSecurity()`](./reference/tsoa-next/functions/NoSecurity.md) cuando un controlador o acción debe aclarar las necesidades de seguridad heredadas o de toda la API.

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

## Etiquetas

Las etiquetas se definen con [`@Tags('tag1', 'tag2', ...)`](./reference/tsoa-next/functions/Tags.md) decorador en los controladores y/o en los métodos como en los siguientes ejemplos.

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

Si tiene un proyecto que necesita una descripción y/o docs externos para etiquetas, puede configurar los generadores internos para utilizar las definiciones de etiquetas correctas y los docs externos proporcionando una propiedad de etiquetas para especificar la propiedad en tsoa.json.

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

## Operación Id

Set [`operationId`](./reference/tsoa-next/functions/OperationId.md) bajo el camino de una operación.
Útil para usar con OpenAPI herramienta de generación de código ya que este parámetro se utiliza para nombrar la función generada en el SDK cliente.

```ts
@Get()
@OperationId('findDomain')
public async find(): Promise<any> {

}
```

## Deprecated

OpenAPI le permite depredecir [operations](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.2.md#user-content-operationdeprecated), [parameters](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.2.md#user-content-parameterdeprecated), y [schemas](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.2.md#user-content-schemadeprecated). Esto le permite indicar que ciertos endpoint/formats/etc. ya no deben ser utilizados, permitiendo a los clientes tiempo para migrar al nuevo enfoque.

Para depreparar partes de su API, puede adjuntar el [`@Deprecated`](./reference/tsoa-next/functions/Deprecated.md) decorador a propiedades de clase, métodos y parámetros. Para construcciones que no soportan decoradores (por ejemplo, interfaces y alias de tipo), puede utilizar un `@deprecated` JSDoc anotación. Algunos ejemplos:

### Operaciones

```ts
@Get()
@Deprecated()
public async find(): Promise<any> {

}
```

### Parámetros (Asuntos)OpenAPI Solo 3+)

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

### EsquemasOpenAPI Solo 3+)

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

## Validación

El decorador de esquema externo se llama [`@Validate(...)`](./reference/tsoa-next/functions/Validate.md).
Úsalo en los parámetros del método del controlador cuando quieras una biblioteca externa de esquemas compatible para reemplazar la validación de tiempo de ejecución integrada para ese subárbol del parámetro.

- Formularios de apoyo: `@Validate(schema)`, `@Validate('zod', schema)`, `@Validate({ kind: 'zod', schema })`- Bibliotecas apoyadas: `zod`, `joi`, `yup`, `superstruct`, `io-ts`- Decoradores de parámetro compatibles: `@Body`, `@BodyProp`, `@Query`, `@Queries`, `@Path`, `@Header`, `@FormField`, `@UploadedFile`, `@UploadedFiles`- OpenAPI generación todavía viene de su TypeScript tipos; `@Validate(...)` sólo cambios de validación de tiempo de ejecución

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

Para notas de configuración completas y ejemplos para cada biblioteca de validadores compatibles, vea [External Validators](./external-validators).

## SpecPath

Uso [`@SpecPath(...)`](./reference/tsoa-next/functions/SpecPath.md) en un controlador cuando desea que ese controlador exponga un punto final de espectro o documentación a tiempo de ejecución sin leer un archivo de espectro generado del disco local.

- `@SpecPath()` defaults to a JSON endpoint at `/<controller-path>/spec`- Objetivos incorporados: `json`, `yaml`, `swagger`, `redoc`, `rapidoc`- Los objetivos incorporados requieren la generación de rutas para tener acceso al config de la especie, como el estándar `tsoa spec-and-routes` flujo de trabajo o un config que incrusta `runtimeSpecConfig`- Un controlador puede declarar múltiples `@SpecPath(...)` decoradores mientras los caminos resueltos no colliden
- La documentación incorporada está dirigida a las dependencias de pares de carga perezosa:
  - `swagger-ui-express` para Express  - `swagger-ui-koa` para Koa  - `hapi-swagger` para Hapi  - `redoc` para Redoc  - `rapidoc` para RapiDoc- Los manipuladores personalizados pueden devolver un `string` o a `Readable`- Uso `@SpecPath(path, options?)` para configurar [`SpecPathOptions`](./reference/tsoa-next/interfaces/SpecPathOptions.md) tales como `target`, `cache`, y un opcional `gate`- `gate` puede ser un booleano o una función que recibe el [`SpecRequestContext`](./reference/tsoa-next/interfaces/SpecRequestContext.md) y devuelve si la especificaciones deben ser servidos para esa solicitud
- Cache se puede desactivar con `'none'`, mantenido en el proceso con `'memory'`, o delegado en una costumbre [`SpecCacheHandler`](./reference/tsoa-next/interfaces/SpecCacheHandler.md)- `@SpecPath(...)` las rutas son auxiliares y no se agregan al generado OpenAPI documento

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

En ese ejemplo:

- `GET /users/spec` sirve OpenAPI documento como JSON
- `GET /users/openapi.yaml` sirve el mismo documento que YAML
- `GET /users/docs` sirve Swagger UI si se instala la dependencia específica de los pares

También puede proporcionar un manejador personalizado y la implementación de caché externa:

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

También puede cerrar una ruta de espectro:

```ts
@SpecPath('docs', {
  gate: context => {
    const headers = (context.request as { headers?: Record<string, string | string[] | undefined> } | undefined)?.headers
    return headers?.['x-allow-spec'] === 'true'
  },
  target: 'swagger',
})
```

Cuando el caché está habilitado y un manejador personalizado devuelve un flujo, `tsoa-next` búfera el flujo a una cadena antes de almacenarlo a través del controlador de caché.


## Oculto

Uso [`@Hidden`](./reference/tsoa-next/functions/Hidden.md) sobre los métodos para excluir un punto final del OpenAPI Documento de especificación.

```ts
@Get()
@Hidden()
public async find(): Promise<any> {
}
```

Uso [`@Hidden`](./reference/tsoa-next/functions/Hidden.md) sobre los controladores para excluir todos sus puntos finales de los generados OpenAPI Documento de especificación.

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

Uso `@Query` parámetros para excluir los parámetros de consulta de los parámetros generados OpenAPI Documento de especificación. El parámetro debe permitirse o tener un valor predeterminado que se oculte.

```ts
  @Get()
  public async find(
    @Query() normalParam: string,
    @Query() @Hidden() defaultSecret = true,
    @Query() @Hidden() optionalSecret?: string
  ): Promise<any> {

  }
```

## Solicitud

Para acceder al objeto de solicitud de expreso en un método controlador utilice el [`@Request`](./reference/tsoa-next/functions/Request.md) decorador:

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
Acceso Koa's objeto de solicitud (que tiene el objeto ctx) en un método de controlador utiliza el [`@Request`](./reference/tsoa-next/functions/Request.md) decorador:

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
Tenga en cuenta que el parámetro `request` no aparece en su archivo de la OEA.
Uso [`@RequestProp(...)`](./reference/tsoa-next/functions/RequestProp.md) cuando el valor ya vive en el objeto de solicitud de tiempo de ejecución subyacente.
Uso [`@Inject()`](./reference/tsoa-next/functions/Inject.md) cuando un parámetro es suministrado por completo por su propia plantilla de ruta o código de envoltura y debe ser omitido de la generación de espectro.
:::

## RequestProp

[`@RequestProp(...)`](./reference/tsoa-next/functions/RequestProp.md) une una sola propiedad del objeto de solicitud de tiempo de ejecución subyacente.

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

## Productos

El [`@Produces`](./reference/tsoa-next/functions/Produces.md) decorador se utiliza para definir tipos de medios personalizados para las respuestas de métodos de controlador en los OpenAPI generador. Permite especificar un tipo de medio específico para cada método, sin sobreescribir la respuesta predeterminada del tipo de contenido.

Aquí hay un ejemplo de cómo utilizar el `@Produces` decorador:

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
Tenga en cuenta que usando [`@Produces`](./reference/tsoa-next/functions/Produces.md) sólo afecta al generado OpenAPI Especificación. También debe asegurarse de que envía el encabezado correcto utilizando `this.setHeader('Content-Type', 'MEDIA_TYPE')` en sus métodos de controlador.
:::

## Consumos

Uso [`@Consumes(...)`](./reference/tsoa-next/functions/Consumes.md) cuando una acción acepta un tipo de medio corporal de solicitud no predeterminado.

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
