---
lastUpdated: 2026-04-17T20:53:42.039Z
---
# Autenticación

La autenticación se hace usando un manipulador de middleware junto con `@Security('name', ['scopes'])` decorador en su controlador.
El nombre del esquema está definido por el usuario: `jwt`, `api_key`, `session`o `tsoa_auth` son todos válidos mientras usted utiliza el mismo nombre en `spec.securityDefinitions`, `@Security(...)`, y su módulo de autenticación.
Referencia pertinente de API: [`@Security`](./reference/tsoa-next/functions/Security.md), [`@NoSecurity`](./reference/tsoa-next/functions/NoSecurity.md), [`@Request`](./reference/tsoa-next/functions/Request.md), [`@Res`](./reference/tsoa-next/functions/Res.md), [`@Response`](./reference/tsoa-next/functions/Response.md), y [`TsoaResponse`](./reference/tsoa-next/type-aliases/TsoaResponse.md).

En primer lugar, definir las definiciones de seguridad para OpenAPI, y también configura dónde está el manipulador de middleware de autentificación. En este caso, está en el `authentication.ts` archivo.

```js
{
  "spec": {
    "securityDefinitions": {
        "api_key": {
            "type": "apiKey",
            "name": "access_token",
            "in": "query"
        },
        "jwt": {
            "type": "oauth2",
            "authorizationUrl": "http://swagger.io/api/oauth/dialog",
            "flow": "implicit",
            "scopes": {
                "write:pets": "modify things",
                "read:pets": "read things"
            }
        }
    },
    ...
  },
  "routes": {
    "authenticationModule": "./authentication.ts",
    ...
  }
}
```

En el middleware, exportar la función basada en qué biblioteca (Express, Koa, HapiEstás usando. Sólo crea una función por tiempo de ejecución y maneja los tipos de seguridad dentro de ella. El `securityName` y `scopes` viene de la anotación que puso por encima de su función controlador.

\* El `securityDefinitions` llave y la `securityName` Usted revisa su módulo de autenticación debe coincidir exactamente. `tsoa-next` no se reserva ni se especial ningún nombre en particular.

`./authentication.ts`

```ts
import * as express from "express";
import * as jwt from "jsonwebtoken";

export function expressAuthentication(
  request: express.Request,
  securityName: string,
  scopes?: string[]
): Promise<any> {
  if (securityName === "api_key") {
    let token;
    if (request.query && request.query.access_token) {
      token = request.query.access_token;
    }

    if (token === "abc123456") {
      return Promise.resolve({
        id: 1,
        name: "Ironman",
      });
    } else {
      return Promise.reject({});
    }
  }

  if (securityName === "jwt") {
    const token =
      request.body.token ||
      request.query.token ||
      request.headers["x-access-token"];

    return new Promise((resolve, reject) => {
      if (!token) {
        reject(new Error("No token provided"));
      }
      jwt.verify(token, "[secret]", function (err: any, decoded: any) {
        if (err) {
          reject(err);
        } else {
          // Check if JWT contains all required scopes
          for (const scope of scopes ?? []) {
            if (!decoded.scopes.includes(scope)) {
              reject(new Error("JWT does not contain required scope."));
            }
          }
          resolve(decoded);
        }
      });
    });
  }
}

import * as hapi from "@hapi/hapi";
export function hapiAuthentication(
  request: hapi.Request,
  securityName: string,
  scopes?: string[]
): Promise<any> {
  // See above
}

import { Request } from "koa";
export function koaAuthentication(
  request: Request,
  securityName: string,
  scopes?: string[]
): Promise<any> {
  // See above
}
```

`./controllers/securityController.ts`

```ts
import { Get, Request, Res, Response, Route, Security, TsoaResponse } from "tsoa-next";

@Route("secure")
export class SecureController {
  @Response<{ message: string }>("default", "Unexpected error")
  @Security("api_key")
  @Get("UserInfo")
  public async userInfo(@Request() request: { user: { id: number; name: string } }): Promise<{ id: number; name: string }> {
    return Promise.resolve(request.user);
  }

  @Response<{ message: string }>("default", "Unexpected error")
  @Security("jwt", ["admin"])
  @Get("EditUser")
  public async editUser(
    @Request() request: { user?: { id: number; name: string } },
    @Res() notFoundResponse: TsoaResponse<404, { message: string }>
  ): Promise<{ id: number; name: string }> {
    if (!request.user) {
      return notFoundResponse(404, { message: "Not found" });
    }

    return request.user;
  }
}
```

## Seguridad predeterminada en toda la API

Si la mayoría de su API comparte el mismo requisito, puede aplicarlo una vez al nivel de las especificaciones con `spec.rootSecurity` y luego anularlo en controladores individuales o acciones con `@Security(...)` o `@NoSecurity()`.

```js
{
  "spec": {
    "rootSecurity": [{ "api_key": [] }]
  }
}
```
