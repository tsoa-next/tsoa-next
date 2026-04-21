---
lastUpdated: 2026-04-17T20:53:42.039Z
---
# аутентификация

Аутентификация выполняется с помощью обработчика промежуточного программного обеспечения вместе с `@Security('name', ['scopes'])` Декоратор в вашем контроллере.
Название схемы определяется пользователем: `jwt`, `api_key`, `session`или `tsoa_auth` Все они действительны до тех пор, пока вы используете одно и то же имя. `spec.securityDefinitions`, `@Security(...)`И ваш модуль аутентификации.
Соответствующая ссылка API: [`@Security`](./reference/tsoa-next/functions/Security.md), [`@NoSecurity`](./reference/tsoa-next/functions/NoSecurity.md), [`@Request`](./reference/tsoa-next/functions/Request.md), [`@Res`](./reference/tsoa-next/functions/Res.md), [`@Response`](./reference/tsoa-next/functions/Response.md)и [`TsoaResponse`](./reference/tsoa-next/type-aliases/TsoaResponse.md).

Во-первых, определить определения безопасности для OpenAPIа также настроить, где находится обработчик промежуточного программного обеспечения аутентификации. В этом случае он находится в `authentication.ts` Файл.

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

В промежуточном программном обеспечении экспортируйте функцию, основанную на библиотеке.Express, Koa, HapiВы используете. Вы создаете только одну функцию во время выполнения и обрабатываете типы безопасности внутри нее. The `securityName` и `scopes` аннотация, которую вы ставите выше функции контроллера.

* The `securityDefinitions` Ключ и `securityName` Вы должны проверить, что ваш модуль аутентификации должен точно совпадать. `tsoa-next` не зарезервирует и не присваивает специальному случаю какого-либо конкретного имени.

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

## Безопасность по умолчанию API

Если большинство ваших API разделяет одно и то же требование, вы можете применить его один раз на уровне спецификаций. `spec.rootSecurity` а затем отменить его на отдельных контроллерах или действиях с `@Security(...)` или `@NoSecurity()`.

```js
{
  "spec": {
    "rootSecurity": [{ "api_key": [] }]
  }
}
```
