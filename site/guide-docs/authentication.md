# Authentication

Authentication is done using a middleware handler along with `@Security('name', ['scopes'])` decorator in your controller.
The scheme name is user-defined: `jwt`, `api_key`, `session`, or `tsoa_auth` are all valid as long as you use the same name in `spec.securityDefinitions`, `@Security(...)`, and your authentication module.

First, define the security definitions for OpenAPI, and also configure where the authentication middleware handler is. In this case, it is in the `authentication.ts` file.

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

In the middleware, export the function based on which library (Express, Koa, Hapi) you are using. You only create one function per runtime and handle the security types inside it. The `securityName` and `scopes` come from the annotation you put above your controller function.

\* The `securityDefinitions` key and the `securityName` you check in your authentication module must match exactly. `tsoa-next` does not reserve or special-case any particular name.

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

## Default API-wide security

If most of your API shares the same requirement, you can apply it once at the spec level with `spec.rootSecurity` and then override it on individual controllers or actions with `@Security(...)` or `@NoSecurity()`.

```js
{
  "spec": {
    "rootSecurity": [{ "api_key": [] }]
  }
}
```
