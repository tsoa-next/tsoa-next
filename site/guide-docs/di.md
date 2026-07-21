# Dependency injection or IOC

By default all the controllers are created by the auto-generated routes template using an empty default constructor.
If you want to use dependency injection and let the DI-framework handle the creation of your controllers, we need set up an IoC Module tsoa can call.
Relevant API reference: [`Config`](../reference/tsoa-next/interfaces/Config.md), [`RoutesConfig`](../reference/tsoa-next/interfaces/RoutesConfig.md), [`IocContainer`](../reference/tsoa-next/interfaces/IocContainer.md), [`IocContainerFactory`](../reference/tsoa-next/type-aliases/IocContainerFactory.md), and [`Controller`](../reference/tsoa-next/classes/Controller.md).

To tell `tsoa-next` to use your DI-container you have to reference your module exporting the DI-container in the [`Config`](../reference/tsoa-next/interfaces/Config.md) file (for example `tsoa.json`):

```js
{
  "entryFile": "...",
  "spec": {
    ...
  },
  "routes": {
    "routesDir": "...",
    "middleware": "...",
    "iocModule": "src/ioc",
    ...
  }
}
```

## IoC Module

Now you can create a module that exports either a container or a function as `iocContainer`.

Containers must conform to the following interface.

```ts
interface IocContainer {
  get<T>(controller: { prototype: T }): T
}
```

Functions must conform to the following signature, where `request` is your web framework's request object.

```ts
type IocContainerFactory = (request: unknown) => IocContainer
```

### Example

Container instance:

```ts
// src/ioc.ts
import { Container } from 'di-package'

// Assign a container to `iocContainer`.
const iocContainer = new Container()

// export according to convention
export { iocContainer }
```

Factory function:

```ts
// src/ioc.ts
import { IocContainer, IocContainerFactory } from 'tsoa-next'
import { Container } from 'di-package'

// Or assign a factory function to `iocContainer`.
const iocContainer: IocContainerFactory = function (request: Request): IocContainer {
  const container = new Container()
  container.bind(request)
  return container
}

// export according to convention
export { iocContainer }
```

::: tip
If you want to use a DI framework other than the examples below, adding it isn't hard.
If you set an iocModule, tsoa will call this module (to get a `FooController`) with:

```ts
import { iocContainer } from './the/path/to/the/module/from/tsoa.json'

iocContainer.get<FooController>(FooController)
```

If you wrap your DI's API or even a ControllerFactory to accept this call and respond with a FooController, it'll work.
:::

## InversifyJS

Configure controller and service bindings explicitly with the native [InversifyJS container API](https://inversify.io/docs/fundamentals/binding/). Controllers must use transient scope because `Controller` stores response-specific status and headers. Services may use a longer scope when they do not hold request state.

```ts
// src/ioc.ts
import { Container } from 'inversify'
import { UsersController } from './users/usersController'
import { FooService } from './users/fooService'

const iocContainer = new Container()

// Keep controllers transient so response state cannot leak between requests.
iocContainer.bind(UsersController).toSelf().inTransientScope()
iocContainer.bind(FooService).toSelf().inSingletonScope()

export { iocContainer }
```

Use Inversify's `@injectable()` and `@inject()` decorators for constructor injection:

```ts
// src/users/usersController.ts
import { inject, injectable } from 'inversify'
import { Controller, Route } from 'tsoa-next'
import { FooService } from './fooService'

@injectable()
@Route('foo')
export class UsersController extends Controller {
  public constructor(@inject(FooService) private readonly fooService: FooService) {
    super()
  }
}
```

```ts
// src/users/fooService.ts
import { injectable } from 'inversify'

@injectable()
export class FooService {
  // ...
}
```

The repository's legacy binding-decorator fixture remains pinned to `inversify@6.2.2` with `inversify-binding-decorators@4.0.0`; that decorator package does not declare compatibility with Inversify 7 or 8. New integrations should prefer the native bindings above. If you migrate an existing application to Inversify 8, follow Inversify's [v6-to-v8 migration guide](https://inversify.io/docs/guides/migrating-from-v6/) rather than forcing the legacy decorator package through an override.

## TSyringe

Here's an example using [TSyringe](https://github.com/microsoft/tsyringe).

```ts
// src/lib/tsyringeTsoaIocContainer.ts
// Target this file in your tsoa.json's "iocModule" property

import { IocContainer } from 'tsoa-next'
import { container } from 'tsyringe'

export const iocContainer: IocContainer = {
  get: <T>(controller: { prototype: T }): T => {
    return container.resolve<T>(controller as never)
  },
}
```

```ts
// src/services/FooService.ts

import { singleton } from 'tsyringe'
// ...

@singleton()
export class FooService {
  // ...
}
```

```ts
// src/controllers/FooController.ts

import { Controller, Route } from 'tsoa-next'
import { injectable } from 'tsyringe'
import { FooService } from '../services/FooService'
// ...

@injectable()
@Route('foo')
export class FooController extends Controller {
  constructor(private fooService: FooService) {
    super()
  }

  // ...
}
```

## typescript-ioc

Here is some example code to setup the controller with [typescript-ioc](https://github.com/thiagobustamante/typescript-ioc).

`./controllers/fooController.ts`

```ts
import { Route } from 'tsoa-next';
import { Inject, Singleton } from "typescript-ioc";

@Route('foo')
export class FooController {

  @Inject
  private fooService: FooService
  ...

}

@Singleton
export class FooService {

}
```

The controllers need to be included in the application in order to be linked.

`index.ts`

```ts
import "./controllers/fooController.ts"
...

```
