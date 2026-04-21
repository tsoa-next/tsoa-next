---
lastUpdated: 2026-04-17T20:53:42.040Z
---
# Inyección de dependencia o COI

Por defecto todos los controladores son creados por la plantilla de rutas autogeneradas utilizando un constructor por defecto vacío.
Si desea utilizar la inyección de dependencia y dejar que el DI-framework maneje la creación de sus controladores, necesitamos configurar un módulo IoC tsoa puede llamar.
Referencia pertinente de API: [`Config`](./reference/tsoa-next/interfaces/Config.md), [`RoutesConfig`](./reference/tsoa-next/interfaces/RoutesConfig.md), [`IocContainer`](./reference/tsoa-next/interfaces/IocContainer.md), [`IocContainerFactory`](./reference/tsoa-next/type-aliases/IocContainerFactory.md), y [`Controller`](./reference/tsoa-next/classes/Controller.md).

Para decir `tsoa-next` para utilizar su DI-container tiene que hacer referencia a su módulo exportando el DI-container en el [`Config`](./reference/tsoa-next/interfaces/Config.md) archivo (por ejemplo `tsoa.json`):

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

## Módulo IoC

Ahora puede crear un módulo que exporte un contenedor o una función como `iocContainer`.

Los contenedores deben ajustarse a la siguiente interfaz.

```ts
interface IocContainer {
  get<T>(controller: { prototype: T }): T
}
```

Las funciones deben ajustarse a la firma siguiente, donde `request` es el objeto de solicitud de su marco web.

```ts
type IocContainerFactory = (request: unknown) => IocContainer
```

### Ejemplo

Container instance:

```ts
// src/ioc.ts
import { Container } from 'di-package'

// Assign a container to `iocContainer`.
const iocContainer = new Container()

// export according to convention
export { iocContainer }
```

Función de fábrica:

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
Si quieres usar un marco DI aparte de los ejemplos siguientes, añadiendo que no es difícil.
Si estableces un iocModule, tsoa llamará a este módulo (para conseguir un `FooController`Con:

```ts
import { iocContainer } from './the/path/to/the/module/from/tsoa.json'

iocContainer.get<FooController>(FooController)
```

Si envuelves la API de tu DI o incluso un ControllerFactory para aceptar esta llamada y responder con un FooController, funcionará.
:::

## InversifyJS

Aquí hay un código de ejemplo para configurar el contenedor y su controlador con inversificar. Js.
Por lo general, tendrás que decir inversificar cómo crear tu controlador, pero como se supone que esto no cubre la inversificación,
Nos referiremos a sus [docs](http://inversify.io/).
Para mayor comodidad, usaremos inversificantes controladores aquí, lo que hace que sea muy simple decir inversificar cómo crear tsoa controladores.
Más información se puede encontrar [here](https://github.com/inversify/inversify-binding-decorators).

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

Normalmente no queremos crear una nueva instancia de controlador para cada llamada, así que vamos a crear un envoltorio de conveniencia alrededor [`@fluentProvide()`](https://github.com/inversify/inversify-binding-decorators#fluent-binding-decorator)

::: danger

Si confías en el estado del controlador (por ejemplo, porque usas `this.setHeaders` heredado por [Controller](./reference/tsoa-next/classes/Controller.md)), necesitas inyectar un nuevo controlador para cada solicitud.
En lugar de `@provideSingleton`, por favor asegúrese de utilizar `@fluentProvide` directamente (que es la forma predeterminada de `fluentProvide(identifier).inTransientScope()`).

:::

```ts
// src/util/provideSingleton.ts
import { fluentProvide } from 'inversify-binding-decorators'
import { interfaces } from 'inversify'

export const provideSingleton = function <T>(identifier: interfaces.ServiceIdentifier<T>) {
  return fluentProvide(identifier).inSingletonScope().done()
}
```

Ahora, en nuestros controladores, podemos usar `@provideSingleton()`

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

## TSyringe

Aquí hay un ejemplo usando [TSyringe](https://github.com/microsoft/tsyringe).

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

## tiposcript-ioc

Aquí hay un código de ejemplo para configurar el controlador con [typescript-ioc](https://github.com/thiagobustamante/typescript-ioc).

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

Los controladores deben ser incluidos en la aplicación para estar vinculados.

`index.ts`

```ts
import "./controllers/fooController.ts"
...

```
