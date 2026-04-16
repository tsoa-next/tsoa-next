# Decorators

Please note that this section only covers decorators that are not described separately, such as [`@Response`](./error-handling) or the core parameter decorators introduced in [Getting started](./getting-started).
For a full overview, please check out the [API Reference](../reference/).

## Security

The `@Security` decorator can be used above controller methods to indicate that there should be authentication before running those methods. As described above, the authentication is done in a file that's referenced in tsoa's configuration. When using the `@Security` decorator, you can choose between having one or multiple authentication methods. If you choose to have multiple authentication methods, you can choose between having to pass one of the methods (OR):

```ts
@Security('tsoa_auth', ['write:pets', 'read:pets'])
@Security('api_key')
@Get('OauthOrAPIkey')
public async GetWithOrSecurity(@Request() request: express.Request): Promise<any> {
}
```

or having to pass all of them (AND):

```ts
@Security({
  tsoa_auth: ['write:pets', 'read:pets'],
  api_key: [],
})
@Get('OauthAndAPIkey')
public async GetWithAndSecurity(@Request() request: express.Request): Promise<any> {
}
```

## NoSecurity

Use `@NoSecurity()` when a controller or action should clear inherited or API-wide security requirements.

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

Tags are defined with the `@Tags('tag1', 'tag2', ...)` decorator in the controllers and/or in the methods like in the following examples.

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

If you have a project that needs a description and/or external docs for tags, you can configure the internal generators to use the correct tags definitions and external docs by providing a tags property to spec property in tsoa.json.

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

## OperationId

Set operationId parameter under operation's path.
Useful for use with OpenAPI code generation tool since this parameter is used to name the function generated in the client SDK.

```ts
@Get()
@OperationId('findDomain')
public async find(): Promise<any> {

}
```

## Deprecated

OpenAPI allows you to deprecate [operations](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.2.md#user-content-operationdeprecated), [parameters](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.2.md#user-content-parameterdeprecated), and [schemas](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.2.md#user-content-schemadeprecated). This lets you indicate that certain endpoint/formats/etc. should no longer be used, while allowing clients time to migrate to the new approach.

To deprecate parts of your API, you can attach the `@Deprecated` decorator to class properties, methods, and parameters. For constructs that don't support decorators (e.g. interfaces and type aliases), you can use a `@deprecated` JSDoc annotation. Some examples:

### Operations

```ts
@Get()
@Deprecated()
public async find(): Promise<any> {

}
```

### Parameters (OpenAPI 3+ only)

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

### Schemas (OpenAPI 3+ only)

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

The external schema decorator is named `@Validate(...)`.
Use it on controller method parameters when you want a supported external schema library to replace built-in runtime validation for that parameter subtree.

- Supported forms: `@Validate(schema)`, `@Validate('zod', schema)`, `@Validate({ kind: 'zod', schema })`
- Supported libraries: `zod`, `joi`, `yup`, `superstruct`, `io-ts`
- Supported parameter decorators: `@Body`, `@BodyProp`, `@Query`, `@Queries`, `@Path`, `@Header`, `@FormField`, `@UploadedFile`, `@UploadedFiles`
- OpenAPI generation still comes from your TypeScript types; `@Validate(...)` only changes runtime validation

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

For complete setup notes and examples for every supported validator library, see [External Validators](./external-validators).

## SpecPath

Use `@SpecPath(...)` on a controller when you want that controller to expose a spec or documentation endpoint at runtime without reading a generated spec file from local disk.

- `@SpecPath()` defaults to a JSON endpoint at `/<controller-path>/spec`
- Built-in targets: `json`, `yaml`, `swagger`, `redoc`, `rapidoc`
- Built-in targets require route generation to have access to the spec config, such as the standard `tsoa spec-and-routes` workflow or a routes config that embeds `runtimeSpecConfig`
- A controller can declare multiple `@SpecPath(...)` decorators as long as the resolved paths do not collide
- Built-in documentation targets lazy-load optional peer dependencies:
  - `swagger-ui-express` for Express
  - `swagger-ui-koa` for Koa
  - `hapi-swagger` for Hapi
  - `redoc` for Redoc
  - `rapidoc` for RapiDoc
- Custom handlers can return either a `string` or a `Readable`
- Use `@SpecPath(path, options?)` to configure `target`, `cache`, and an optional `gate`
- `gate` can be a boolean or a function that receives the `SpecRequestContext` and returns whether the spec should be served for that request
- Cache can be disabled with `'none'`, kept in-process with `'memory'`, or delegated to a custom cache handler
- `@SpecPath(...)` routes are auxiliary and are not added to the generated OpenAPI document

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

In that example:

- `GET /users/spec` serves the OpenAPI document as JSON
- `GET /users/openapi.yaml` serves the same document as YAML
- `GET /users/docs` serves Swagger UI if the runtime-specific peer dependency is installed

You can also provide a custom handler and external cache implementation:

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

You can also gate a spec route:

```ts
@SpecPath('docs', {
  gate: context => {
    const headers = (context.request as { headers?: Record<string, string | string[] | undefined> } | undefined)?.headers
    return headers?.['x-allow-spec'] === 'true'
  },
  target: 'swagger',
})
```

When caching is enabled and a custom handler returns a stream, `tsoa-next` buffers the stream to a string before storing it through the cache handler.


## Hidden

Use on methods to exclude an endpoint from the generated OpenAPI Specification document.

```ts
@Get()
@Hidden()
public async find(): Promise<any> {
}
```

Use on controllers to exclude all of its endpoints from the generated OpenAPI Specification document.

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

Use on `@Query` parameters to exclude query params from the generated OpenAPI Specification document. The parameter must either allow undefined or have a default value to be hidden.

```ts
  @Get()
  public async find(
    @Query() normalParam: string,
    @Query() @Hidden() defaultSecret = true,
    @Query() @Hidden() optionalSecret?: string
  ): Promise<any> {

  }
```

## Request

To access the request object of express in a controller method use the `@Request`-decorator:

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
To access Koa's request object (which has the ctx object) in a controller method use the `@Request`-decorator:

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
Note that the parameter `request` does not appear in your OAS file.
Use `@RequestProp(...)` when the value already lives on the underlying runtime request object.
Use `@Inject()` when a parameter is supplied entirely by your own route template or wrapper code and should be omitted from spec generation.
:::

## RequestProp

`@RequestProp(...)` binds a single property from the underlying runtime request object.

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

## Produces

The `@Produces` decorator is used to define custom media types for the responses of controller methods in the OpenAPI generator. It allows you to specify a specific media type for each method, without overwriting the default Content-Type response.

Here's an example of how to use the `@Produces` decorator:

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
Please note that using the `@Produces` decorator only affects the generated OpenAPI Specification. You must also ensure that you send the correct header using `this.setHeader('Content-Type', 'MEDIA_TYPE')` in your controller methods.
:::

## Consumes

Use `@Consumes(...)` when an action accepts a non-default request body media type.

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
