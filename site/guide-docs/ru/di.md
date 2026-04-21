---
lastUpdated: 2026-04-17T20:53:42.040Z
---
# Инъекция зависимости или МОК

По умолчанию все контроллеры создаются шаблоном автоматически генерируемых маршрутов с использованием пустого конструктора по умолчанию.
Если вы хотите использовать инъекцию зависимости и позволить DI-фреймворку обрабатывать создание ваших контроллеров, нам нужно настроить модуль IoC. tsoa Можно позвонить.
Соответствующая ссылка API: [`Config`](./reference/tsoa-next/interfaces/Config.md), [`RoutesConfig`](./reference/tsoa-next/interfaces/RoutesConfig.md), [`IocContainer`](./reference/tsoa-next/interfaces/IocContainer.md), [`IocContainerFactory`](./reference/tsoa-next/type-aliases/IocContainerFactory.md)и [`Controller`](./reference/tsoa-next/classes/Controller.md).

Сказать `tsoa-next` Чтобы использовать свой DI-контейнер, вы должны ссылаться на свой модуль, экспортирующий DI-контейнер. [`Config`](./reference/tsoa-next/interfaces/Config.md) файл (например, `tsoa.json`):

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

## Модуль IoC

Теперь можно создать модуль, который экспортирует либо контейнер, либо функцию `iocContainer`.

Контейнеры должны соответствовать следующему интерфейсу.

```ts
interface IocContainer {
  get<T>(controller: { prototype: T }): T
}
```

Функции должны соответствовать следующей подписи, где: `request` Это объект запроса вашего веб-фреймворка.

```ts
type IocContainerFactory = (request: unknown) => IocContainer
```

### Пример

Пример контейнера:

```ts
// src/ioc.ts
import { Container } from 'di-package'

// Assign a container to `iocContainer`.
const iocContainer = new Container()

// export according to convention
export { iocContainer }
```

Функция завода:

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
Если вы хотите использовать DI-фреймворк, отличный от приведенных ниже примеров, добавить его несложно.
Если установить iocModule, tsoa Назовем этот модуль (чтобы получить `FooController`) с:

```ts
import { iocContainer } from './the/path/to/the/module/from/tsoa.json'

iocContainer.get<FooController>(FooController)
```

Если вы заверните API своего DI или даже фабрику контроллера, чтобы принять этот вызов и ответить FooController, он будет работать.
:::

## Инверсификация JS

Вот несколько примеров кода для настройки контейнера и контроллера с помощью инверсии. Джейс.
Как правило, вам придется рассказать инверсифицировать, как создать свой контроллер, но поскольку это не должно охватывать инверсификацию,
Мы просто ссылаемся на их [docs](http://inversify.io/).
Для удобства мы будем использовать здесь инверсификационно-связывающие контроллеры, что позволяет очень просто сказать инверсифицировать, как создавать. tsoa Контроллеры.
Больше информации можно найти [here](https://github.com/inversify/inversify-binding-decorators).

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

Обычно мы не хотим создавать новый экземпляр контроллера для каждого вызова, поэтому давайте создадим удобную обертку. [`@fluentProvide()`](https://github.com/inversify/inversify-binding-decorators#fluent-binding-decorator)

::: danger

Если вы полагаетесь на состояние контроллера (например, потому что вы используете `this.setHeaders` наследуемый [Controller](./reference/tsoa-next/classes/Controller.md)), вам нужно ввести новый контроллер для каждого запроса.
Вместо того чтобы `@provideSingleton`Пожалуйста, убедитесь, что вы используете `@fluentProvide` Прямой (который является способом по умолчанию) `fluentProvide(identifier).inTransientScope()`).

:::

```ts
// src/util/provideSingleton.ts
import { fluentProvide } from 'inversify-binding-decorators'
import { interfaces } from 'inversify'

export const provideSingleton = function <T>(identifier: interfaces.ServiceIdentifier<T>) {
  return fluentProvide(identifier).inSingletonScope().done()
}
```

В наших контроллерах мы можем использовать `@provideSingleton()`

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

## шприц

Вот пример использования [TSyringe](https://github.com/microsoft/tsyringe).

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

## шрифтовый ioc

Вот несколько примеров кода для настройки контроллера [typescript-ioc](https://github.com/thiagobustamante/typescript-ioc).

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

Контроллеры должны быть включены в приложение, чтобы быть связанными.

`index.ts`

```ts
import "./controllers/fooController.ts"
...

```
