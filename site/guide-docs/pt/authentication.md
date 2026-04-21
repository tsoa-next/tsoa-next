---
lastUpdated: 2026-04-17T20:53:42.039Z
---
# autenticação

A autenticação é feita usando um manipulador de middleware junto com `@Security('name', ['scopes'])` Decorador em seu controlador.
O nome do esquema é definido pelo usuário: `jwt`, `api_key`, `session`, ou `tsoa_auth` são todos válidos desde que use o mesmo nome `spec.securityDefinitions`, `@Security(...)`, e seu módulo de autenticação.
Referência da API relevante: [`@Security`](./reference/tsoa-next/functions/Security.md), [`@NoSecurity`](./reference/tsoa-next/functions/NoSecurity.md), [`@Request`](./reference/tsoa-next/functions/Request.md), [`@Res`](./reference/tsoa-next/functions/Res.md), [`@Response`](./reference/tsoa-next/functions/Response.md), e [`TsoaResponse`](./reference/tsoa-next/type-aliases/TsoaResponse.md).

Em primeiro lugar, definir as definições de segurança para OpenAPI, e também configure onde está o manipulador de middleware de autenticação. Neste caso, está no `authentication.ts` Arquivo.

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

No middleware, exporte a função baseada em que biblioteca (Express, Koa, Hapi) você está usando. Você só cria uma função por execução e lida com os tipos de segurança dentro dela. A `securityName` e `scopes` vem da anotação que você colocou acima de sua função de controlador.

\* A `securityDefinitions` a chave e a `securityName` você verifica em seu módulo de autenticação deve corresponder exatamente. `tsoa-next` não reserva nem nome especial.

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

## Segurança padrão da API

Se a maioria de sua API compartilha o mesmo requisito, você pode aplicá-lo uma vez no nível de especificação com `spec.rootSecurity` e, em seguida, substituí-lo em controladores individuais ou ações com `@Security(...)` ou `@NoSecurity()`.

```js
{
  "spec": {
    "rootSecurity": [{ "api_key": [] }]
  }
}
```
