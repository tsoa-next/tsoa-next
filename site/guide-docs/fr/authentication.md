---
lastUpdated: 2026-04-17T20:53:42.039Z
---
# Authentification

L'authentification est faite à l'aide d'un gestionnaire d'intergiciel avec `@Security('name', ['scopes'])` décorateur dans votre contrôleur.
Le nom du schéma est défini par l'utilisateur: `jwt`, `api_key`, `session`ou `tsoa_auth` sont tous valides tant que vous utilisez le même nom dans `spec.securityDefinitions`, `@Security(...)`, et votre module d'authentification.
Référence IPA pertinente: [`@Security`](./reference/tsoa-next/functions/Security.md), [`@NoSecurity`](./reference/tsoa-next/functions/NoSecurity.md), [`@Request`](./reference/tsoa-next/functions/Request.md), [`@Res`](./reference/tsoa-next/functions/Res.md), [`@Response`](./reference/tsoa-next/functions/Response.md)et [`TsoaResponse`](./reference/tsoa-next/type-aliases/TsoaResponse.md).

Premièrement, définir les définitions de sécurité pour OpenAPI, et aussi configurer où est le gestionnaire d'intergiciel d'authentification. Dans ce cas, il est `authentication.ts` fichier.

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

Dans le middleware, exportez la fonction basée sur quelle bibliothèque (Express, Koa, Hapi) vous utilisez. Vous ne créez qu'une fonction par runtime et ne manipulez que les types de sécurité à l'intérieur. Les `securityName` et `scopes` proviennent de l'annotation que vous mettez au-dessus de votre fonction de contrôleur.

\* Les `securityDefinitions` clé et le `securityName` vous vérifiez que votre module d'authentification doit correspondre exactement. `tsoa-next` ne réserve pas de nom particulier.

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

## Sécurité par défaut dans toute l'API

Si la plupart de votre API partage la même exigence, vous pouvez l'appliquer une fois au niveau des spécifications avec `spec.rootSecurity` et la remplacer sur les contrôleurs individuels ou les actions avec `@Security(...)` ou `@NoSecurity()`.

```js
{
  "spec": {
    "rootSecurity": [{ "api_key": [] }]
  }
}
```
