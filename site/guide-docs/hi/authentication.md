---
lastUpdated: 2026-04-17T20:53:42.039Z
---
# प्रमाणीकरण

प्रमाणीकरण के साथ एक मिडलवेयर हैंडलर का उपयोग करके किया जाता है `@Security('name', ['scopes'])` अपने नियंत्रक में सजावट।
योजना का नाम उपयोगकर्ता परिभाषित है: `jwt`, `api_key`, `session`या `tsoa_auth` जब तक आप उसी नाम का उपयोग करते हैं तब तक सभी मान्य हैं `spec.securityDefinitions`, `@Security(...)`, और अपने प्रमाणीकरण मॉड्यूल।
प्रासंगिक एपीआई संदर्भ: [`@Security`](./reference/tsoa-next/functions/Security.md), [`@NoSecurity`](./reference/tsoa-next/functions/NoSecurity.md), [`@Request`](./reference/tsoa-next/functions/Request.md), [`@Res`](./reference/tsoa-next/functions/Res.md), [`@Response`](./reference/tsoa-next/functions/Response.md), और [`TsoaResponse`](./reference/tsoa-next/type-aliases/TsoaResponse.md)।

प्रथम, के लिए सुरक्षा परिभाषाओं को परिभाषित OpenAPI, और यह भी कॉन्फ़िगर करें कि प्रमाणीकरण मिडलवेयर हैंडलर कहाँ है। इस मामले में, यह में है `authentication.ts` फ़ाइल

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

मिडलवेयर में, उस पर आधारित कार्य का निर्यात करें जिस पर पुस्तकालय ()Express, Koa, Hapiआप उपयोग कर रहे हैं। आप केवल प्रति रनटाइम एक फ़ंक्शन बनाते हैं और इसके अंदर सुरक्षा प्रकारों को संभालते हैं। The `securityName` और `scopes` आप अपने नियंत्रक समारोह के ऊपर डाल annotation से आते हैं।

* The `securityDefinitions` कुंजी और कुंजी `securityName` आप अपने प्रमाणीकरण मॉड्यूल में जांच करने के लिए बिल्कुल मिलान करना चाहिए। `tsoa-next` किसी भी विशेष नाम को आरक्षित या विशेष मामले नहीं है।

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

## डिफ़ॉल्ट एपीआई-वाइड सुरक्षा

यदि आपके API एक ही आवश्यकता को साझा करता है, तो आप इसे एक बार कल्पना स्तर पर लागू कर सकते हैं। `spec.rootSecurity` और फिर इसे व्यक्तिगत नियंत्रकों या कार्यों पर ओवरराइड करें `@Security(...)` या `@NoSecurity()`।

```js
{
  "spec": {
    "rootSecurity": [{ "api_key": [] }]
  }
}
```
