---
lastUpdated: 2026-04-17T20:53:42.039Z
---
# المعلنون

يُرجى ملاحظة أن هذا الفرع لا يغطي سوى مصممي الديكور الذين لا يوصفون بصورة منفصلة، مثلهم، [`@Response`](./error-handling) أو مصممي البارامترات الأساسية [البدء](./getting-started).
لنظرة عامة كاملة، يرجى التحقق من [مرجع API](./reference/).
المرجع ذو الصلة بالطلب: [`@Security`](./reference/tsoa-next/functions/Security.md).. [`@NoSecurity`](./reference/tsoa-next/functions/NoSecurity.md).. [`@Tags`](./reference/tsoa-next/functions/Tags.md).. [`@OperationId`](./reference/tsoa-next/functions/OperationId.md).. [`@Deprecated`](./reference/tsoa-next/functions/Deprecated.md).. [`@Validate`](./reference/tsoa-next/functions/Validate.md).. [`@SpecPath`](./reference/tsoa-next/functions/SpecPath.md).. [`@Hidden`](./reference/tsoa-next/functions/Hidden.md).. [`@Request`](./reference/tsoa-next/functions/Request.md).. [`@RequestProp`](./reference/tsoa-next/functions/RequestProp.md).. [`@Inject`](./reference/tsoa-next/functions/Inject.md).. [`@Produces`](./reference/tsoa-next/functions/Produces.md)و [`@Consumes`](./reference/tsoa-next/functions/Consumes.md).

## الأمن

The [`@Security`](./reference/tsoa-next/functions/Security.md) ويمكن استخدام مصمم الديكور فوق أساليب المتحكمين للإشارة إلى أنه ينبغي التوثيق قبل تطبيق تلك الأساليب. كما هو موصوف أعلاه، يتم التوثيق في ملف مرجعي في tsoaتشكيلة أسماء المخططات محددة للمستخدمين ويجب أن تتطابق مع الأسماء في اسمك OpenAPI وحدة الثقة الأمنية والتوثيق. عند استخدام `@Security` الديكور، يمكنك الاختيار بين وجود واحد أو متعدد طرق التوثيق. إذا اخترت أن يكون لديك طرق توثيق متعددة، يمكنك أن تختار بين الإضطرار إلى تمرير أحد الأساليب (أو):

```ts
@Security('jwt', ['write:pets', 'read:pets'])
@Security('api_key')
@Get('OauthOrAPIkey')
public async GetWithOrSecurity(@Request() request: express.Request): Promise<any> {
}
```

أو اضطرارهم جميعاً

```ts
@Security({
  jwt: ['write:pets', 'read:pets'],
  api_key: [],
})
@Get('OauthAndAPIkey')
public async GetWithAndSecurity(@Request() request: express.Request): Promise<any> {
}
```

## عدم الأمان

الاستخدام [`@NoSecurity()`](./reference/tsoa-next/functions/NoSecurity.md) وعندما يتعين على المتحكم أو العمل أن يبيّن الشروط الأمنية الموروثة أو على نطاق المبادرة.

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

## Tags

تاغز معرّف مع [`@Tags('tag1', 'tag2', ...)`](./reference/tsoa-next/functions/Tags.md) مصممة في أجهزة التحكم و/أو في الأساليب مثل الأمثلة التالية.

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

إذا كان لديك مشروع يحتاج إلى وصف و/أو أطباء خارجيين للعلامات، يمكنك مصادرة المولدات الداخلية لاستخدام تعاريف البطاقات الصحيحة والأوراق الخارجية عن طريق توفير ممتلكات للعلامات tsoa(جيسون)

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

## العملية Id

المجموعة [`operationId`](./reference/tsoa-next/functions/OperationId.md) تحت مسار العملية
مفيدة للاستخدام OpenAPI تستخدم أداة لتوليد الرموز منذ استخدام هذا البارامترات لتسمية الوظيفة المولدة في شركة SDK العميلة.

```ts
@Get()
@OperationId('findDomain')
public async find(): Promise<any> {

}
```

## الاستهلاك

OpenAPI يسمح لك بإستهلاك [operations](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.2.md#user-content-operationdeprecated).. [parameters](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.2.md#user-content-parameterdeprecated)و [schemas](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.2.md#user-content-schemadeprecated). This lets you indicate that certain endpoint/formats/etc. should no longer be used, while allowing clients time to migrate to the new approach.

لإستهلاك أجزاء من مكتبك، يمكنك ربط [`@Deprecated`](./reference/tsoa-next/functions/Deprecated.md) مصمم للخصائص والأساليب والبارامترات من أجل البناءات التي لا تدعم مصممي الديكور `@deprecated` JSDoc شروح بعض الأمثلة:

### العمليات

```ts
@Get()
@Deprecated()
public async find(): Promise<any> {

}
```

### البارامترات )أ(OpenAPI 3+فقط)

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

### الوجبات الخفيفةOpenAPI 3+فقط)

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

## Validate

مصمم ديكور شيما الخارجي [`@Validate(...)`](./reference/tsoa-next/functions/Validate.md).
استخدمها على بارامترات طريقة التحكم عندما تريد مكتبة للكيماويات الخارجية المدعومة لتحل محل المصادقة في وقت التشغيل

- الأشكال الداعمة: `@Validate(schema)`.. `@Validate('zod', schema)`.. `@Validate({ kind: 'zod', schema })`- المكتبات المدعومة: `zod`.. `joi`.. `yup`.. `superstruct`.. `io-ts`- مدخرات البارامترات المدعومة: `@Body`.. `@BodyProp`.. `@Query`.. `@Queries`.. `@Path`.. `@Header`.. `@FormField`.. `@UploadedFile`.. `@UploadedFiles`- OpenAPI الجيل لا يزال يأتي من TypeScript الأنواع؛ `@Validate(...)` التغييرات فقط في المصادقة على الوقت المحدد

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

وللاطلاع على ملاحظات وأمثلة كاملة بشأن كل مكتبة مصادقة مدعومة، انظر [External Validators](./external-validators).

## SpecPath

الاستخدام [`@SpecPath(...)`](./reference/tsoa-next/functions/SpecPath.md) على متحكم عندما تريد ذلك المتحكم أن يكشف نقطة النهاية للمواصفات أو التوثيق في وقت التشغيل بدون قراءة ملف مطوّر من قرص محلي

- `@SpecPath()` defaults to a JSON endpoint at `/<controller-path>/spec`- أهداف البناء: `json`.. `yaml`.. `swagger`.. `redoc`.. `rapidoc`- وتحتاج أهداف البناء إلى إيجاد طرق للوصول إلى مجموعة المواصفات، مثل المعيار `tsoa spec-and-routes` سير العمل أو مسارات يثقل بها `runtimeSpecConfig`- المتحكم يمكنه أن يعلن عدة `@SpecPath(...)` مدخرات ما دامت الطرق المصممة لا تتصادم
- تُستهدف وثائق البناء في التأشيرات بالتكسير من جانب الأقران
  - `swagger-ui-express` for Express  - `swagger-ui-koa` for Koa  - `hapi-swagger` for Hapi  - `redoc` for Redoc  - `rapidoc` for RapiDoc- يمكن للمعالجين العرفيين العودة إما `string` أو `Readable`- الاستخدام `@SpecPath(path, options?)` للتحدي [`SpecPathOptions`](./reference/tsoa-next/interfaces/SpecPathOptions.md) مثل `target`.. `cache`و اختياري `gate`- `gate` يمكن أن يكون البوليان أو وظيفة تتلقى [`SpecRequestContext`](./reference/tsoa-next/interfaces/SpecRequestContext.md) وعودة ما إذا كان ينبغي تقديم المواصفات لذلك الطلب
- (كاش) يمكن أن يُعاق `'none'`محتفظ به `'memory'`أو مفوّض إلى العرف [`SpecCacheHandler`](./reference/tsoa-next/interfaces/SpecCacheHandler.md)- `@SpecPath(...)` الطرق مساعدة ولا تضاف إلى المولدات OpenAPI الوثيقة

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

وفي هذا المثال:

- `GET /users/spec` خدمة OpenAPI الوثيقة المعنونة: JSON
- `GET /users/openapi.yaml` يخدم نفس الوثيقة التي تقدم بها YAML
- `GET /users/docs` خدمة Swagger UI if the runtime-specific peer dependency is installed

ويمكنك أيضاً أن تقدم معالجاً متخصصاً وتنفيذاً خارجياً للمخبأ:

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

يمكنك أيضاً أن ت بوابة مسار المواصفات

```ts
@SpecPath('docs', {
  gate: context => {
    const headers = (context.request as { headers?: Record<string, string | string[] | undefined> } | undefined)?.headers
    return headers?.['x-allow-spec'] === 'true'
  },
  target: 'swagger',
})
```

عندما يُمكّن المُسَاعِد من المُسَاعِد و يُعيدُ مُسَاعِدَة التَرَب `tsoa-next` يربط المجرى إلى خيط قبل تخزينه من خلال معالج الخياطة.


## Hidden

الاستخدام [`@Hidden`](./reference/tsoa-next/functions/Hidden.md) فيما يتعلق بأساليب استبعاد نقطة نهاية من النقاط المتولدة OpenAPI وثيقة المواصفات.

```ts
@Get()
@Hidden()
public async find(): Promise<any> {
}
```

الاستخدام [`@Hidden`](./reference/tsoa-next/functions/Hidden.md) على المتحكمين لاستبعاد جميع نقاطهم النهائية من OpenAPI وثيقة المواصفات.

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

الاستخدام `@Query` البارامترات اللازمة لاستبعاد طوابق الاستفسار من OpenAPI وثيقة المواصفات. ويجب أن تتيح البارامترات إما عدم تحديدها أو أن تكون لها قيمة غير مقصودة تخفيها.

```ts
  @Get()
  public async find(
    @Query() normalParam: string,
    @Query() @Hidden() defaultSecret = true,
    @Query() @Hidden() optionalSecret?: string
  ): Promise<any> {

  }
```

## الطلب

(ب) أن يُستخدم الجسم المُعرب عنه في طريقة المتحكم [`@Request`](./reference/tsoa-next/functions/Request.md) الديكور:

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
الوصول Koa"الشيء المطلوب (الذي يحتوي على مادة (سيتكس)" "في طريقة التحكم" [`@Request`](./reference/tsoa-next/functions/Request.md) الديكور:

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
Note that the parameter `request` لا يظهر في ملفك
الاستخدام [`@RequestProp(...)`](./reference/tsoa-next/functions/RequestProp.md) عندما تَعِيشُ القيمةُ بالفعل على الجسمِ الجاهزِ لطلبِ.
الاستخدام [`@Inject()`](./reference/tsoa-next/functions/Inject.md) عندما يتم توفير البارامترات بالكامل من خلال نموذج الطريق الخاص بك أو رمز ملفوف وينبغي حذفها من توليد العينات.
:::

## الطلب

[`@RequestProp(...)`](./reference/tsoa-next/functions/RequestProp.md) يربط ممتلكات واحدة من الغرض الأساسي لطلب التسليم.

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

## النواتج

The [`@Produces`](./reference/tsoa-next/functions/Produces.md) يُستخدم مصمم الديكور لتعريف أنواع وسائط الإعلام التقليدية من أجل استجابات أساليب المكافحة في OpenAPI المولد إنه يسمح لك بتحديد نوع محدد من وسائل الإعلام لكل طريقة، دون الإفراط في كتابة رد الفعل الافتراضي.

هنا مثال على كيفية استخدام `@Produces` الديكور:

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
يرجى ملاحظة أن استخدامه [`@Produces`](./reference/tsoa-next/functions/Produces.md) فقط يؤثر على المولد OpenAPI المواصفات يجب أن تحرص أيضاً على أن تُرسل الرأس الصحيح باستخدام `this.setHeader('Content-Type', 'MEDIA_TYPE')` في طرق التحكم الخاصة بك.
:::

## الاستهلاك

الاستخدام [`@Consumes(...)`](./reference/tsoa-next/functions/Consumes.md) عندما يقبل أي إجراء نوع من أنواع وسائل الإعلام التي لا يمكن التقصير فيها.

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
