---
lastUpdated: 2026-04-17T20:53:42.039Z
---
# Otentikasi

Otentikasi dilakukan memakai penanganan perangkat menengah bersama dengan `@Security('name', ['scopes'])` dekorator dalam controller Anda.
Nama skema adalah user-defined: `jwt`, `api_key`, `session`, atau `tsoa_auth` semua valid selama anda menggunakan nama yang sama dalam `spec.securityDefinitions`, `@Security(...)`, dan modul otentikasi Anda.
Referensi API Relevant: [`@Security`](./reference/tsoa-next/functions/Security.md), [`@NoSecurity`](./reference/tsoa-next/functions/NoSecurity.md), [`@Request`](./reference/tsoa-next/functions/Request.md), [`@Res`](./reference/tsoa-next/functions/Res.md), [`@Response`](./reference/tsoa-next/functions/Response.md), dan [`TsoaResponse`](./reference/tsoa-next/type-aliases/TsoaResponse.md).

Pertama, definisikan definisi keamanan untuk OpenAPI, dan juga konfigurasi dimana penanganan middleware otentikasi berada. Dalam hal ini, itu di `authentication.ts` file.

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

Dalam perangkat menengah, ekspor fungsi berdasarkan pustaka mana (Express, Koa, Hapi) Anda menggunakan. Anda hanya membuat satu fungsi per waktu dan menangani jenis keamanan di dalamnya. The `securityName` dan `scopes` berasal dari gangguan yang kau pasang di atas fungsi kontrolmu.

\ * The `securityDefinitions` kunci dan `securityName` Anda memeriksa dalam modul otentikasi Anda harus sesuai persis. `tsoa-next` tidak reserve atau special-case nama tertentu.

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

## Keamanan bawaan API-wide

Jika sebagian besar saham API Anda memiliki persyaratan yang sama, Anda dapat menerapkannya sekali pada tingkat spesifikasi dengan `spec.rootSecurity` dan kemudian override pada controller individu atau tindakan dengan `@Security(...)` atau `@NoSecurity()`.

```js
{
  "spec": {
    "rootSecurity": [{ "api_key": [] }]
  }
}
```
