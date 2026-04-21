---
lastUpdated: 2026-04-17T20:53:42.039Z
---
# অনুমোদন ব্যবস্থা

Obergram পরিচালন ব্যবস্থা সহ অনুমোদন করা হয়েছে `@Security('name', ['scopes'])` তোমার কন্ট্রোলার.
স্কিমের নাম হল: `jwt`'%s' `api_key`'%s' `session`অথবা `tsoa_auth` একই নাম ব্যবহার করা হলে সব বৈধ `spec.securityDefinitions`'%s' `@Security(...)`আপনার এবং আপনার অনুমোদন মডিউল।
রিলেভেন্ট API উল্লেখ করেছে: [`@Security`](./reference/tsoa-next/functions/Security.md)'%s' [`@NoSecurity`](./reference/tsoa-next/functions/NoSecurity.md)'%s' [`@Request`](./reference/tsoa-next/functions/Request.md)'%s' [`@Res`](./reference/tsoa-next/functions/Res.md)'%s' [`@Response`](./reference/tsoa-next/functions/Response.md)এবং [`TsoaResponse`](./reference/tsoa-next/type-aliases/TsoaResponse.md). .

প্রথমে, নিরাপত্তা বিষয়ক সংজ্ঞা নির্ধারণ করুন OpenAPIএবং একই সাথে আপ্রনিংওয়্যার হল দাতা। এই ক্ষেত্রে, এটা আছে `authentication.ts` ফাইল.

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

অপারেটিং সিস্টেমের মধ্যে উপস্থিত ফাংশনগুলির উপর ভিত্তি করে ফাংশন এক্সপোর্ট করা হবে (g)Express'%s' Koa'%s' Hapi- আপনি ব্যবহার করছেন। আপনি শুধু একটি ফাংশন তৈরি করবেন এবং এতে নিরাপত্তা ব্যবস্থা করবেন। এটা `securityName` এবং `scopes` তুমি তোমার কন্ট্রোলার ফাংশনের উপরে থেকে এসেছ.

বঙ্গানুবাদে এটা `securityDefinitions` কী এবং কী `securityName` আপনার অনুমোদন মডিউলের সঙ্গে ঠিক মিল অবস্থায় থাকা আবশ্যক । `tsoa-next` নির্দিষ্ট কোনো নাম সংরক্ষণ করা হবে না।

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

## ডিফল্ট API নিরাপত্তা

যদি আপনার অধিকাংশ API একই চাহিদা শেয়ার করে, তাহলে একবার সংশ্লিষ্ট সংখ্যায় এটি প্রয়োগ করুন `spec.rootSecurity` তারপর তাতে কার ্ পণ ্ য করবে , আর কার ্ পণ ্ য করবে তাতে , `@Security(...)` অথবা `@NoSecurity()`. .

```js
{
  "spec": {
    "rootSecurity": [{ "api_key": [] }]
  }
}
```
