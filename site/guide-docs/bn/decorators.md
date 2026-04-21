---
lastUpdated: 2026-04-17T20:53:42.039Z
---
# অপারেটর

দয়া করে লক্ষ করুন যে, এই বিভাগটি কেবল আলাদা ভাবে বর্ণনা করা হয়নি। [`@Response`](./error-handling) আরম্ভ করার সময় মূল পরামিতির ব্যবস্থা আরম্ভ করা হয়েছে [শুরু করা](./getting-started). .
পুরো ধারণাটার জন্য, অনুগ্রহ করে চেক করুন [API রেফারেন্স](./reference/). .
রিলেভেন্ট API উল্লেখ করেছে: [`@Security`](./reference/tsoa-next/functions/Security.md)'%s' [`@NoSecurity`](./reference/tsoa-next/functions/NoSecurity.md)'%s' [`@Tags`](./reference/tsoa-next/functions/Tags.md)'%s' [`@OperationId`](./reference/tsoa-next/functions/OperationId.md)'%s' [`@Deprecated`](./reference/tsoa-next/functions/Deprecated.md)'%s' [`@Validate`](./reference/tsoa-next/functions/Validate.md)'%s' [`@SpecPath`](./reference/tsoa-next/functions/SpecPath.md)'%s' [`@Hidden`](./reference/tsoa-next/functions/Hidden.md)'%s' [`@Request`](./reference/tsoa-next/functions/Request.md)'%s' [`@RequestProp`](./reference/tsoa-next/functions/RequestProp.md)'%s' [`@Inject`](./reference/tsoa-next/functions/Inject.md)'%s' [`@Produces`](./reference/tsoa-next/functions/Produces.md)এবং [`@Consumes`](./reference/tsoa-next/functions/Consumes.md). .

## সুরক্ষা

এটা [`@Security`](./reference/tsoa-next/functions/Security.md) এই পদ্ধতিগুলো পরিচালনা করার আগে সেগুলো ব্যবহার করা উচিত । উপরের বর্ণনা অনুযায়ী, প্রমাণীকরণ পদ্ধতি প্রয়োগ করা হয় এমন একটি ফাইলে যা রেফারেন্সকৃত tsoa- কনফিগারেশন। স্কীমের নাম ব্যবহারকারী করা হয়েছে এবং আপনার নাম অনুযায়ী মেলানো হবে OpenAPI নিরাপত্তা কনফিগারেশন ও অনুমোদন মডিউল আরম্ভ করতে ব্যর্থ। ব্যবহার করে `@Security` ক্লিক করে আপনি একটি বা একাধিক অনুমোদন পদ্ধতির মধ্যে বেছে নিতে পারেন । একাধিক অনুমোদন প্রক্রিয়া থাকলে, আপনি যে কোনো একটি পদ্ধতির মধ্য দিয়ে একটি পদ্ধতি বেছে নিতে পারেন (অথবা স্বয়ংক্রিয়ভাবে):

```ts
@Security('jwt', ['write:pets', 'read:pets'])
@Security('api_key')
@Get('OauthOrAPIkey')
public async GetWithOrSecurity(@Request() request: express.Request): Promise<any> {
}
```

নাকি তাদের সবাইকে পার করে দিতে হবে (এই ব্যাপারে:

```ts
@Security({
  jwt: ['write:pets', 'read:pets'],
  api_key: [],
})
@Get('OauthAndAPIkey')
public async GetWithAndSecurity(@Request() request: express.Request): Promise<any> {
}
```

## সুরক্ষা বিহীন

ব্যবহার [`@NoSecurity()`](./reference/tsoa-next/functions/NoSecurity.md) যখন কোন নিয়ন্ত্রণ বা কার্যকর পদক্ষেপ আমাদের পরিষ্কার করা উচিত, তখন প্রয়োজনীয় উত্তর- API প্রয়োজন।

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

## ট্যাগ

ট্যাগ সহ নির্ধারিত ট্যাগ [`@Tags('tag1', 'tag2', ...)`](./reference/tsoa-next/functions/Tags.md) নীচের উদাহরণের মতো পদ্ধতির মাধ্যমে কন্ট্রোলার এবং/অথবা/অথবা/বা।

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

কোনো প্রজেক্ট উপস্থিত না থাকলে, ট্যাগের জন্য আবশ্যক বর্ণনা ও/অথবা বহিস্থিত সামগ্রীর মধ্যে উপস্থিত সকল সামগ্রী সংশোধন ও থিম ব্যবহারের জন্য চিহ্নিত করা যাবে tsoa..jons.

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

## কাজ আই. ডি.

সংকলন [`operationId`](./reference/tsoa-next/functions/OperationId.md) অপারেশনের পথ.
ব্যবহারের জন্য সহায়তা OpenAPI ক্লায়েন্ট SDK-র মধ্যে উপস্থিত ফাংশানটি ব্যবহারের জন্য এই পরামিতিটি ব্যবহার করা হয়েছে।

```ts
@Get()
@OperationId('findDomain')
public async find(): Promise<any> {

}
```

## অবচিত

OpenAPI যে কোনো ক্ষেত্রে আপনি ব্যর্থ [operations](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.2.md#user-content-operationdeprecated)'%s' [parameters](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.2.md#user-content-parameterdeprecated)এবং [schemas](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.2.md#user-content-schemadeprecated). . এটা আপনাকে নির্দেশ করে যে, নির্দিষ্ট টার্মিনাল/etc/format.format ব্যবহার করা উচিত নয়। নতুন পদ্ধতিতে পরিবর্তিত হওয়ার সময় ব্যবহার করা উচিত নয়।

আপনার API-র কিছু অংশ সংরক্ষণ করে, আপনি একে সংযুক্ত করতে পারেন [`@Deprecated`](./reference/tsoa-next/functions/Deprecated.md) ক্লাস সংক্রান্ত বৈশিষ্ট্য, পদ্ধতি এবং পরামিতির প্রতি সংস্কার । যে সমস্ত চ্যাম্পেটর (যেমন, ইন্টারফেস ও টাইপ) সমর্থন করে না, তাদের জন্য একটি আদর্শ ব্যবহার করা যেতে পারে । `@deprecated` JSDoc বার্সা. কিছু উদাহরণ:

### কাজ

```ts
@Get()
@Deprecated()
public async find(): Promise<any> {

}
```

### পরামিতি ( চিহ্ন)OpenAPI ৩+ (কেবল)

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

### স্কীমা (স)OpenAPI ৩+ (কেবল)

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

## বৈধতা যাচাই

বহিস্থিত স্কীমার নাম [`@Validate(...)`](./reference/tsoa-next/functions/Validate.md). .
সিস্টেমের মধ্যে উপস্থিত একটি অভ্যন্তরীণ D-Bus লাইব্রেরি পরিবর্তনের ফলে এটি ব্যবহার করা হবে। পরামিতির মাধ্যমে সাব- সিস্টেমের বৈধ ব্যবস্থার সাহায্যে সাব-ট্রির মধ্যে এই বৈশিষ্ট্য প্রয়োগ করা যাবে।

- সমর্থিত ধরন: `@Validate(schema)`'%s' `@Validate('zod', schema)`'%s' `@Validate({ kind: 'zod', schema })`- সমর্থিত লাইব্রেরি: `zod`'%s' `joi`'%s' `yup`'%s' `superstruct`'%s' `io-ts`- সমর্থিত পরামিতি স্কীম: `@Body`'%s' `@BodyProp`'%s' `@Query`'%s' `@Queries`'%s' `@Path`'%s' `@Header`'%s' `@FormField`'%s' `@UploadedFile`'%s' `@UploadedFiles`- OpenAPI এখনও প্রজন্ম আপনার কাছ থেকে আসে TypeScript ধরন `@Validate(...)` শুধুমাত্র স্বয়ংক্রিয় পরিবর্তন বৈধ

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

সম্পূর্ণ বৈশিষ্ট্য বিশিষ্ট সকল বৈধ কনফিগারেশন লাইব্রেরিগুলির জন্য নোট এবং উদাহরণ নির্ধারণ করুন [External Validators](./external-validators). .

## Spec পাথ

ব্যবহার [`@SpecPath(...)`](./reference/tsoa-next/functions/SpecPath.md) একটি কন্ট্রোলার যখন আপনি চান যে কন্ট্রোলে কন্ট্রোল করা হোক বা কনফিগারেশন করুন যেখানে স্থানীয় ডিস্ক থেকে একটি নমুনা ফাইল না পড়ে।

- `@SpecPath()` JSON শেষে পৌঁছে গেছি `/<controller-path>/spec`- বিল্ট-ইন টার্গেট: `json`'%s' `yaml`'%s' `swagger`'%s' `redoc`'%s' `rapidoc`- বিল্ট-ইন টার্গেট পাথের জন্য, কনফিগ- এর কনফিগারেশনের সাথে সুসংগত হওয়া আবশ্যক `tsoa spec-and-routes` detdyropd এমন একটি রুট বা রুট যা ঐটার দ্বারা চালিত `runtimeSpecConfig`- বার্তা নিয়ন্ত্রণ করা সম্ভব `@SpecPath(...)` মেরামতকারীরা যতক্ষণ পর্যন্ত উন্নতি করে চলতে পারে না
- বিল্ট-ইন ডকুমেন্টেশন অলস-লোড করার নির্ভরতা নিশ্চিত করুন:
  - `swagger-ui-express` উল্লিখিত সময় অবধি Express  - `swagger-ui-koa` উল্লিখিত সময় অবধি Koa  - `hapi-swagger` উল্লিখিত সময় অবধি Hapi  - `redoc` উল্লিখিত সময় অবধি Redoc  - `rapidoc` উল্লিখিত সময় অবধি RapiDoc- স্বনির্ধারিত হ্যান্ডলার দ্বারা ফেরত আসতে পারে `string` অথবা `Readable`- ব্যবহার `@SpecPath(path, options?)` কনফিগার করার জন্য কনফিগার করুন [`SpecPathOptions`](./reference/tsoa-next/interfaces/SpecPathOptions.md) যেমন `target`'%s' `cache`কঠোর স ্ বভাব , তদুপরি কুখ ্ যাত ; `gate`- `gate` প্রদর্শন সংক্রান্ত বৈশিষ্ট্য [`SpecRequestContext`](./reference/tsoa-next/interfaces/SpecRequestContext.md) এবং তার কাছে ফিরে আসবে কি না , তা ধার্য করা হবে কি না
- ক্যাশে নিষ্ক্রিয় করা যাবে `'none'`যারা চলে থাকে , অদৃশ ্ য হয়ে যায় , `'memory'`অথবা খোদাভীতি শিক ্ ষা দেয় । [`SpecCacheHandler`](./reference/tsoa-next/interfaces/SpecCacheHandler.md)- `@SpecPath(...)` রুট হচ্ছে সহায়ক এবং এর নির্মাতার সাথে যোগ করা যাবে না। OpenAPI ডকুমেন্ট

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

উদাহরণ স্বরূপ:

- `GET /users/spec` যারা সেবা করে OpenAPI ডকুমেন্টের ফ্রেম
- `GET /users/openapi.yaml` YAMAL ডকুমেন্টের অনুরূপ
- `GET /users/docs` সেবা Swagger UI-র কর্ম সঞ্চালনার যোগ্য নির্ভরতা ইনস্টল করা হলে UI

স্বনির্বাচিত হ্যান্ডলার ও বহিস্থিত ক্যাশে প্রয়োগ করা যাবে :

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

আপনি একটি নমুনা পথও পেতে পারেন:

```ts
@SpecPath('docs', {
  gate: context => {
    const headers = (context.request as { headers?: Record<string, string | string[] | undefined> } | undefined)?.headers
    return headers?.['x-allow-spec'] === 'true'
  },
  target: 'swagger',
})
```

স্বনির্ধারিত বৈশিষ্ট্য সক্রিয় করা হলে ও একটি স্বনির্ধারিত হ্যান্ডলার একটি স্ট্রিম ফেরত পাঠায় `tsoa-next` ক্যাশে হ্যান্ডলারের মধ্যে সংরক্ষণের পূর্বে একটি পংক্তি চিহ্নিত করার পূর্বে স্ট্রিম বাফার করা হয়।


## আড়ালে

ব্যবহার [`@Hidden`](./reference/tsoa-next/functions/Hidden.md) প্রাপ্ত ফলাফল থেকে সমাপ্তির জন্য ব্যবহৃত পদ্ধতি OpenAPI নথিবদ্ধকরণ।

```ts
@Get()
@Hidden()
public async find(): Promise<any> {
}
```

ব্যবহার [`@Hidden`](./reference/tsoa-next/functions/Hidden.md) কন্ট্রোলার থেকে বাতিল OpenAPI নথিবদ্ধকরণ।

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

ব্যবহার করা হবে `@Query` উত্‍পাদনের জন্য চিহ্নিত পরামিতি OpenAPI নথিবদ্ধকরণ। বুলিয়ানের ক্ষেত্রে ডিফল্ট মান নির্ধারণ অথবা বাতিল করা আবশ্যক।

```ts
  @Get()
  public async find(
    @Query() normalParam: string,
    @Query() @Hidden() defaultSecret = true,
    @Query() @Hidden() optionalSecret?: string
  ): Promise<any> {

  }
```

## অনুরোধ

নিয়ন্ত্রণ ব্যবস্থা দ্বারা যে অবজেক্ট প্রকাশ করা হবে [`@Request`](./reference/tsoa-next/functions/Request.md) ক্লীব:

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
ব্যবহারের উদ্দেশ্যে Koa'কেনিয়া অবজেক্ট' অনুরোধ করে যা নিয়ন্ত্রণ পদ্ধতি ব্যবহার করে [`@Request`](./reference/tsoa-next/functions/Request.md) ক্লীব:

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
নোটের পরামিতি `request` আপনার OAS ফাইলের মধ্যে উপস্থিত নেই।
ব্যবহার [`@RequestProp(...)`](./reference/tsoa-next/functions/RequestProp.md) বস্তুর উপর সর্বোচ্চ মান ধার্য করা হলে, বস্তুর উজ্জ্বলতা হ্রাস পাবে ।
ব্যবহার [`@Inject()`](./reference/tsoa-next/functions/Inject.md) একটি পরামিতি যখন আপনার নিজের রুট টেমপ্লেট অথবা geterper কোড দ্বারা সরবরাহ করা হয় এবং নমুনা উত্‍পন্ন হতে পারে.
:::

## অনুরোধ

[`@RequestProp(...)`](./reference/tsoa-next/functions/RequestProp.md) একটি সম্পত্তির সাথে ঢালতে অনুরোধ করে।

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

## বৃত্ত

এটা [`@Produces`](./reference/tsoa-next/functions/Produces.md) কন্ট্রোলারগুলোর প্রতিক্রিয়া জানানোর জন্য ঐতিহ্যবাহী মিডিয়ার ধরন নির্ধারণের জন্য ব্যবহার করা হয় OpenAPI জেনারেটর. এর সাহায্যে প্রতিটি পদ্ধতির জন্য সুনির্দিষ্ট মিডিয়ার ধরন নির্ধারণ করা যাবে, ডিফল্টরূপে ডিফল্ট বিষয়বস্তুর প্রতিক্রিয়া লেখা বিনা এটি প্রয়োগ করা যাবে।

কিভাবে ব্যবহার করা যায় তার একটি উদাহরণ এখানে দেয়া হলো। `@Produces` ক্লীব:

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
অনুগ্রহ করে নিশ্চিত করুন [`@Produces`](./reference/tsoa-next/functions/Produces.md) শুধুমাত্র তারিখে নির্মিত OpenAPI বিদায়। আপনাকে সঠিক হেডারগুলি অবশ্যই উল্লেখ করতে হবে `this.setHeader('Content-Type', 'MEDIA_TYPE')` তোমার কন্ট্রোল কন্ট্রোলে।
:::

## কর্ম

ব্যবহার [`@Consumes(...)`](./reference/tsoa-next/functions/Consumes.md) কোনো কর্ম সঞ্চালনের সময় ডিফল্টরূপে একটি ডিফল্ট কর্ম সঞ্চালিত হবে।

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
