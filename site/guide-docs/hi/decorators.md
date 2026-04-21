---
lastUpdated: 2026-04-17T20:53:42.039Z
---
# सजावट

कृपया ध्यान दें कि यह अनुभाग केवल उन सजावट को कवर करता है जिन्हें अलग से वर्णित नहीं किया गया है, जैसे कि [`@Response`](./error-handling) या कोर पैरामीटर Decorator में पेश किया [शुरुआत करें](./getting-started)।
पूर्ण अवलोकन के लिए कृपया चेक आउट करें [API संदर्भ](./reference/)।
प्रासंगिक एपीआई संदर्भ: [`@Security`](./reference/tsoa-next/functions/Security.md), [`@NoSecurity`](./reference/tsoa-next/functions/NoSecurity.md), [`@Tags`](./reference/tsoa-next/functions/Tags.md), [`@OperationId`](./reference/tsoa-next/functions/OperationId.md), [`@Deprecated`](./reference/tsoa-next/functions/Deprecated.md), [`@Validate`](./reference/tsoa-next/functions/Validate.md), [`@SpecPath`](./reference/tsoa-next/functions/SpecPath.md), [`@Hidden`](./reference/tsoa-next/functions/Hidden.md), [`@Request`](./reference/tsoa-next/functions/Request.md), [`@RequestProp`](./reference/tsoa-next/functions/RequestProp.md), [`@Inject`](./reference/tsoa-next/functions/Inject.md), [`@Produces`](./reference/tsoa-next/functions/Produces.md), और [`@Consumes`](./reference/tsoa-next/functions/Consumes.md)।

## सुरक्षा

The [`@Security`](./reference/tsoa-next/functions/Security.md) सजावट करने वाले का उपयोग नियंत्रक विधियों के ऊपर किया जा सकता है ताकि यह इंगित किया जा सके कि उन तरीकों को चलाने से पहले प्रमाणीकरण होना चाहिए। जैसा कि ऊपर वर्णित है, प्रमाणीकरण एक फ़ाइल में किया जाता है जिसे संदर्भित किया जाता है tsoaविन्यास योजना के नाम उपयोगकर्ता-परिभाषित हैं और अपने नामों से मेल खाते हैं। OpenAPI सुरक्षा विन्यास और प्रमाणीकरण मॉड्यूल। उपयोग करते समय `@Security` सजावटकर्ता, आप एक या एकाधिक प्रमाणीकरण विधियों के बीच चुन सकते हैं। यदि आप एकाधिक प्रमाणीकरण विधियों का चयन करते हैं, तो आप विधियों में से एक (OR) पास करने के बीच चुन सकते हैं:

```ts
@Security('jwt', ['write:pets', 'read:pets'])
@Security('api_key')
@Get('OauthOrAPIkey')
public async GetWithOrSecurity(@Request() request: express.Request): Promise<any> {
}
```

या उनमें से सभी को पास करना

```ts
@Security({
  jwt: ['write:pets', 'read:pets'],
  api_key: [],
})
@Get('OauthAndAPIkey')
public async GetWithAndSecurity(@Request() request: express.Request): Promise<any> {
}
```

## सुरक्षा

उपयोग [`@NoSecurity()`](./reference/tsoa-next/functions/NoSecurity.md) जब एक नियंत्रक या कार्रवाई को विरासत में मिली या API-wide सुरक्षा आवश्यकताओं को स्पष्ट करना चाहिए।

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

## टैग

टैग के साथ परिभाषित कर रहे हैं [`@Tags('tag1', 'tag2', ...)`](./reference/tsoa-next/functions/Tags.md) नियंत्रकों में सजावटकर्ता और/या निम्नलिखित उदाहरणों में जैसे तरीकों में।

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

यदि आपके पास एक ऐसी परियोजना है जिसे टैग के लिए विवरण और/या बाहरी डॉक्स की आवश्यकता होती है, तो आप सही टैग परिभाषाओं और बाहरी डॉक्स का उपयोग करने के लिए आंतरिक जनरेटर को कॉन्फ़िगर कर सकते हैं ताकि टैग संपत्ति को निर्दिष्ट करने के लिए टैग संपत्ति प्रदान की जा सके। tsoaजेसन।

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

## संचालन आईडी

सेट [`operationId`](./reference/tsoa-next/functions/OperationId.md) संचालन के रास्ते में।
उपयोग के लिए उपयोगी OpenAPI चूंकि इस पैरामीटर का उपयोग क्लाइंट SDK में उत्पन्न कार्य को नाम देने के लिए किया जाता है।

```ts
@Get()
@OperationId('findDomain')
public async find(): Promise<any> {

}
```

## Deprecated

OpenAPI आपको डिप्रीकेट करने की अनुमति देता है [operations](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.2.md#user-content-operationdeprecated), [parameters](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.2.md#user-content-parameterdeprecated), और [schemas](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.2.md#user-content-schemadeprecated)। यह आपको इंगित करने देता है कि कुछ समापन बिंदु / प्रारूपों / आदि का उपयोग अब नहीं किया जाना चाहिए, जबकि ग्राहकों को नए दृष्टिकोण में स्थानांतरित करने की अनुमति देता है।

अपने एपीआई के कुछ हिस्सों को अलग करने के लिए, आप संलग्न कर सकते हैं [`@Deprecated`](./reference/tsoa-next/functions/Deprecated.md) वर्ग के गुणों, विधियों और मापदंडों के लिए सजावटकर्ता। उन निर्माणों के लिए जो सजावटकर्ता (जैसे इंटरफेस और प्रकार के उपनाम) का समर्थन नहीं करते हैं, आप एक उपयोग कर सकते हैं `@deprecated` JSDoc घोषणा। कुछ उदाहरण:

### संचालन

```ts
@Get()
@Deprecated()
public async find(): Promise<any> {

}
```

### पैरामीटर (a)OpenAPI केवल 3+)

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

### स्कीमाOpenAPI केवल 3+)

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

## मान्य

बाहरी स्कीमा सजावटकर्ता को नामित किया गया है [`@Validate(...)`](./reference/tsoa-next/functions/Validate.md)।
जब आप उस पैरामीटर सबट्री के लिए अंतर्निहित रनटाइम सत्यापन को प्रतिस्थापित करने के लिए एक समर्थित बाहरी स्कीमा लाइब्रेरी चाहते हैं तो नियंत्रक विधि मापदंडों पर इसका उपयोग करें।

- समर्थित स्वरूप: `@Validate(schema)`, `@Validate('zod', schema)`, `@Validate({ kind: 'zod', schema })`- समर्थित पुस्तकालय: `zod`, `joi`, `yup`, `superstruct`, `io-ts`- समर्थित पैरामीटर सजावट: `@Body`, `@BodyProp`, `@Query`, `@Queries`, `@Path`, `@Header`, `@FormField`, `@UploadedFile`, `@UploadedFiles`- OpenAPI पीढ़ी अभी भी आपकी से आती है TypeScript प्रकार; `@Validate(...)` केवल परिवर्तन समय सत्यापन

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

प्रत्येक समर्थित सत्यापनकर्ता पुस्तकालय के लिए पूर्ण सेटअप नोट्स और उदाहरणों के लिए, देखें [External Validators](./external-validators)।

## स्पीच

उपयोग [`@SpecPath(...)`](./reference/tsoa-next/functions/SpecPath.md) एक नियंत्रक पर जब आप चाहते हैं कि नियंत्रक स्थानीय डिस्क से उत्पन्न स्पेक फ़ाइल पढ़ने के बिना रनटाइम पर एक स्पेक या प्रलेखन समापन बिंदु को उजागर करने के लिए।

- `@SpecPath()` एक JSON समापन बिंदु पर डिफ़ॉल्ट `/<controller-path>/spec`- अंतर्निहित लक्ष्य: `json`, `yaml`, `swagger`, `redoc`, `rapidoc`- अंतर्निहित लक्ष्य को निर्दिष्ट करने के लिए मार्ग पीढ़ी की आवश्यकता होती है, जैसे कि मानक `tsoa spec-and-routes` वर्कफ़्लो या एक रूट कॉन्फ़िगरेशन जो एम्बेड करता है `runtimeSpecConfig`- एक नियंत्रक एकाधिक घोषित कर सकता है `@SpecPath(...)` जब तक हल किए गए पथ को नहीं मिलाते तब तक सजावटदार
- अंतर्निहित प्रलेखन लक्ष्य आलसी लोड वैकल्पिक सहकर्मी निर्भरता:
  - `swagger-ui-express` के लिए Express  - `swagger-ui-koa` के लिए Koa  - `hapi-swagger` के लिए Hapi  - `redoc` के लिए Redoc  - `rapidoc` के लिए RapiDoc- कस्टम हैंडलर या तो वापस कर सकते हैं `string` या `Readable`- उपयोग `@SpecPath(path, options?)` कॉन्फ़िगर करने के लिए [`SpecPathOptions`](./reference/tsoa-next/interfaces/SpecPathOptions.md) जैसे `target`, `cache`वैकल्पिक `gate`- `gate` एक boolean या एक समारोह है कि प्राप्त कर सकते हैं [`SpecRequestContext`](./reference/tsoa-next/interfaces/SpecRequestContext.md) और रिटर्न कि क्या उस अनुरोध के लिए विचार किया जाना चाहिए
- कैश को अक्षम किया जा सकता है `'none'`, साथ में रखा `'memory'`, या एक कस्टम के लिए प्रतिनिधि [`SpecCacheHandler`](./reference/tsoa-next/interfaces/SpecCacheHandler.md)- `@SpecPath(...)` मार्ग सहायक होते हैं और उत्पन्न में जोड़ा नहीं जाता है OpenAPI दस्तावेज़

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

उस उदाहरण में:

- `GET /users/spec` कार्य करता है OpenAPI JSON के रूप में दस्तावेज़
- `GET /users/openapi.yaml` YAML के समान दस्तावेज़ प्रदान करता है
- `GET /users/docs` सेवा Swagger यूआई अगर रनटाइम-विशिष्ट सहकर्मी निर्भरता स्थापित की गई है

आप एक कस्टम हैंडलर और बाहरी कैश कार्यान्वयन भी प्रदान कर सकते हैं:

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

आप एक कल्पना मार्ग भी पा सकते हैं:

```ts
@SpecPath('docs', {
  gate: context => {
    const headers = (context.request as { headers?: Record<string, string | string[] | undefined> } | undefined)?.headers
    return headers?.['x-allow-spec'] === 'true'
  },
  target: 'swagger',
})
```

जब कैशिंग सक्षम होता है और एक कस्टम हैंडलर एक स्ट्रीम लौटाता है, `tsoa-next` कैश हैंडलर के माध्यम से इसे स्टोर करने से पहले स्ट्रीम को स्ट्रिंग में बफर करता है।


## छुपा

उपयोग [`@Hidden`](./reference/tsoa-next/functions/Hidden.md) तरीकों पर उत्पन्न से एक समापन बिंदु को बाहर करने के लिए OpenAPI विनिर्देश दस्तावेज

```ts
@Get()
@Hidden()
public async find(): Promise<any> {
}
```

उपयोग [`@Hidden`](./reference/tsoa-next/functions/Hidden.md) नियंत्रकों पर उत्पन्न से अपने सभी समापन बिंदुओं को बाहर करने के लिए OpenAPI विनिर्देश दस्तावेज

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

पर प्रयोग करें `@Query` उत्पन्न से क्वेरी पैराम को बाहर करने के लिए पैरामीटर OpenAPI विनिर्देश दस्तावेज पैरामीटर को या तो अपरिभाषित होने की अनुमति देना चाहिए या उसके पास डिफ़ॉल्ट मान छिपाने की अनुमति देना चाहिए।

```ts
  @Get()
  public async find(
    @Query() normalParam: string,
    @Query() @Hidden() defaultSecret = true,
    @Query() @Hidden() optionalSecret?: string
  ): Promise<any> {

  }
```

## अनुरोध

एक नियंत्रक विधि में एक्सप्रेस के अनुरोध ऑब्जेक्ट तक पहुंचने के लिए उपयोग करें [`@Request`](./reference/tsoa-next/functions/Request.md) सजावट:

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
पहुँच Koaएक नियंत्रक विधि में 's अनुरोध वस्तु (जो ctx ऑब्जेक्ट है) का उपयोग करते हैं [`@Request`](./reference/tsoa-next/functions/Request.md) सजावट:

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
ध्यान दें कि पैरामीटर `request` अपने ओएएस फ़ाइल में प्रकट नहीं होता है।
उपयोग [`@RequestProp(...)`](./reference/tsoa-next/functions/RequestProp.md) जब मूल्य पहले से ही अंतर्निहित रनटाइम अनुरोध ऑब्जेक्ट पर रहता है।
उपयोग [`@Inject()`](./reference/tsoa-next/functions/Inject.md) जब एक पैरामीटर पूरी तरह से अपने स्वयं के मार्ग टेम्पलेट या रैपर कोड द्वारा आपूर्ति की जाती है और इसे कल्पना पीढ़ी से छोड़ दिया जाना चाहिए।
:::

## अनुरोध

[`@RequestProp(...)`](./reference/tsoa-next/functions/RequestProp.md) अंतर्निहित रनटाइम अनुरोध ऑब्जेक्ट से एकल संपत्ति को बांधता है।

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

## उत्पादन

The [`@Produces`](./reference/tsoa-next/functions/Produces.md) सजावट का उपयोग नियंत्रक विधियों की प्रतिक्रियाओं के लिए कस्टम मीडिया प्रकारों को परिभाषित करने के लिए किया जाता है OpenAPI जनरेटर। यह आपको प्रत्येक विधि के लिए एक विशिष्ट मीडिया प्रकार निर्दिष्ट करने की अनुमति देता है, डिफ़ॉल्ट सामग्री-प्रकार प्रतिक्रिया को ओवरराइट किए बिना।

यहाँ एक उदाहरण है कि कैसे उपयोग करने के लिए `@Produces` सजावट:

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
कृपया ध्यान दें कि उपयोग [`@Produces`](./reference/tsoa-next/functions/Produces.md) केवल उत्पन्न को प्रभावित करता है OpenAPI विशिष्टता। आपको यह भी सुनिश्चित करना चाहिए कि आप सही हेडर का उपयोग करके भेजें `this.setHeader('Content-Type', 'MEDIA_TYPE')` अपने नियंत्रक तरीकों में।
:::

## उपभोग

उपयोग [`@Consumes(...)`](./reference/tsoa-next/functions/Consumes.md) जब कोई कार्रवाई एक गैर-डिफ़ॉल्ट अनुरोध बॉडी मीडिया प्रकार को स्वीकार करती है।

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
