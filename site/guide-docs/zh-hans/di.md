---
lastUpdated: 2026-04-17T20:53:42.040Z
---
# 依赖性注射或国际奥委会

默认情况下,所有控制器都由自动生成的路由模板使用空的默认构建器来创建.
如果你想使用依赖性注射,让DI框架处理控制器的创建,我们需要建立一个IOC模块 tsoa 可以打电话
相关API参考: [`Config`](./reference/tsoa-next/interfaces/Config.md), (中文(简体) ). [`RoutesConfig`](./reference/tsoa-next/interfaces/RoutesConfig.md), (中文(简体) ). [`IocContainer`](./reference/tsoa-next/interfaces/IocContainer.md), (中文(简体) ). [`IocContainerFactory`](./reference/tsoa-next/type-aliases/IocContainerFactory.md),以及 [`Controller`](./reference/tsoa-next/classes/Controller.md)。 。 。 。

告诉 `tsoa-next` 要使用您的 DI 容器, 您需要引用您的模块导出 DI 容器 [`Config`](./reference/tsoa-next/interfaces/Config.md) 文件( 例如 `tsoa.json` :

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

## IoC 模块

现在可以创建一个模块,导出一个容器或函数为 `iocContainer`。 。 。 。

集装箱必须符合下列接口。

```ts
interface IocContainer {
  get<T>(controller: { prototype: T }): T
}
```

功能必须符合下列签字: `request` 是您的 Web 框架的请求对象。

```ts
type IocContainerFactory = (request: unknown) => IocContainer
```

### 示例

集装箱实例 :

```ts
// src/ioc.ts
import { Container } from 'di-package'

// Assign a container to `iocContainer`.
const iocContainer = new Container()

// export according to convention
export { iocContainer }
```

工厂功能 :

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
如果您想要使用下面示例以外的一个 DI 框架, 加起来并不难.
如果你设置了iocModule, tsoa 将调用此模块( 要获得 `FooController`使用:

```ts
import { iocContainer } from './the/path/to/the/module/from/tsoa.json'

iocContainer.get<FooController>(FooController)
```

如果你包装你的 DI的API 或甚至一个控制器 Factory 接受这个电话 并回答一个Foo Captain, 它会工作。
:::

## 废除JS

这里有一些实例代码来设置容器和您的控制器, 以反向设置 。 js. (英语).
通常,你必须告诉 如何创建控制器反向, 但既然这不应该覆盖反向,
我们只是提到他们 [docs](http://inversify.io/)。 。 。 。
为方便起见,我们将在此使用反向约束控制器,这使得告诉反向如何创建非常简单. tsoa 控制器。 控制器。
更多信息可以找到 [here](https://github.com/inversify/inversify-binding-decorators)。 。 。 。

```ts
// src/ioc.ts
import { Container, decorate, injectable } from 'inversify'
import { buildProviderModule } from 'inversify-binding-decorators'
import { Controller } from 'tsoa-next'

// Create a new container tsoa can use
const iocContainer = new Container()

decorate(injectable(), Controller) // Makes tsoa's Controller injectable

// make inversify aware of inversify-binding-decorators
iocContainer.load(buildProviderModule())

// export according to convention
export { iocContainer }
```

我们通常不想为每个电话创建新的控制器实例,所以我们来做一个方便包装 [`@fluentProvide()`](https://github.com/inversify/inversify-binding-decorators#fluent-binding-decorator)

::: danger

如果依赖控制器状态(例如,因为您正在使用) `this.setHeaders` 由 [Controller](./reference/tsoa-next/classes/Controller.md)),您需要为每个请求注入新的控制器。
代替 `@provideSingleton`请确保使用 `@fluentProvide` 直接( 这是默认的方式) `fluentProvide(identifier).inTransientScope()`) (中文(简体) ).

:::

```ts
// src/util/provideSingleton.ts
import { fluentProvide } from 'inversify-binding-decorators'
import { interfaces } from 'inversify'

export const provideSingleton = function <T>(identifier: interfaces.ServiceIdentifier<T>) {
  return fluentProvide(identifier).inSingletonScope().done()
}
```

现在,在我们的控制器, 我们可以使用 `@provideSingleton()`

```ts
// src/users/usersController.ts
import { Route } from 'tsoa-next';
import { provideSingleton, inject } from '../inversify/ioc';

@Route('foo')
@provideSingleton(FooController)
export class UsersController {
  constructor(
    @inject(FooService) private fooService: FooService
  ) { }
  ...
}

@provideSingleton(FooService) // or @provide(FooService)
export class FooService {
  constructor(
    // maybe even more dependencies to be injected...
  )
}
```

## 锡林格

举个例子 [TSyringe](https://github.com/microsoft/tsyringe)。 。 。 。

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

## 类型标记-ioc

这里有一些实例代码来设置控制器 [typescript-ioc](https://github.com/thiagobustamante/typescript-ioc)。 。 。 。

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

控制器需要包含在应用程序中才能链接.

`index.ts`

```ts
import "./controllers/fooController.ts"
...

```
