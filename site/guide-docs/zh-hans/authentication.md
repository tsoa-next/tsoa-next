---
lastUpdated: 2026-04-17T20:53:42.039Z
---
# 认证

使用中间软件处理器进行认证 `@Security('name', ['scopes'])` 控制器中的装饰器 。
方案名称由用户定义 : `jwt`, (中文(简体) ). `api_key`, (中文(简体) ). `session`,或 `tsoa_auth` 只要您在 `spec.securityDefinitions`, (中文(简体) ). `@Security(...)`,以及您的认证模块。
相关API参考: [`@Security`](./reference/tsoa-next/functions/Security.md), (中文(简体) ). [`@NoSecurity`](./reference/tsoa-next/functions/NoSecurity.md), (中文(简体) ). [`@Request`](./reference/tsoa-next/functions/Request.md), (中文(简体) ). [`@Res`](./reference/tsoa-next/functions/Res.md), (中文(简体) ). [`@Response`](./reference/tsoa-next/functions/Response.md),以及 [`TsoaResponse`](./reference/tsoa-next/type-aliases/TsoaResponse.md)。 。 。 。

首先,界定安全定义。 OpenAPI,并配置认证中间软件处理器的位置。 在这种情况下,它是在 `authentication.ts` 文档。

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

在中间软件中,导出基于库的函数(Express, (中文(简体) ). Koa, (中文(简体) ). Hapi你在用这个 您每次运行时只创建一个函数并处理其中的安全类型 。 这个 `securityName` 和 `scopes` 来自您在控制器功能之上的注释。

\* 这个 `securityDefinitions` 键和 `securityName` 您检查您的认证模块时必须精确匹配。 `tsoa-next` 不保留任何特定名称或特殊名称。

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

## 默认的 API 安全

如果您的 API 大部分 API 都使用相同的要求, 您可以在 spec 级别上应用一次 。 `spec.rootSecurity` 然后在单个控制器或动作上覆盖 `@Security(...)` 或者说 `@NoSecurity()`。 。 。 。

```js
{
  "spec": {
    "rootSecurity": [{ "api_key": [] }]
  }
}
```
