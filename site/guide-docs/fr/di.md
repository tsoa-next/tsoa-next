---
lastUpdated: 2026-04-17T20:53:42.040Z
---
# Injection de dépendance ou CIO

Par défaut, tous les contrôleurs sont créés par le modèle d'itinéraires généré automatiquement en utilisant un constructeur par défaut vide.
Si vous souhaitez utiliser l'injection de dépendance et laisser le cadre DI gérer la création de vos contrôleurs, nous avons besoin de configurer un module IoC tsoa peut appeler.
Référence IPA pertinente: [`Config`](./reference/tsoa-next/interfaces/Config.md), [`RoutesConfig`](./reference/tsoa-next/interfaces/RoutesConfig.md), [`IocContainer`](./reference/tsoa-next/interfaces/IocContainer.md), [`IocContainerFactory`](./reference/tsoa-next/type-aliases/IocContainerFactory.md)et [`Controller`](./reference/tsoa-next/classes/Controller.md).

Pour dire `tsoa-next` pour utiliser votre conteneur DI vous devez référencer votre module exportant le conteneur DI dans le [`Config`](./reference/tsoa-next/interfaces/Config.md) fichier (par exemple `tsoa.json`) :

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

## Module IoC

Maintenant, vous pouvez créer un module qui exporte un conteneur ou une fonction comme `iocContainer`.

Les conteneurs doivent être conformes à l'interface suivante.

```ts
interface IocContainer {
  get<T>(controller: { prototype: T }): T
}
```

Les fonctions doivent être conformes à la signature suivante: `request` est l'objet de requête de votre cadre web.

```ts
type IocContainerFactory = (request: unknown) => IocContainer
```

### Exemple

Exemple de conteneur :

```ts
// src/ioc.ts
import { Container } from 'di-package'

// Assign a container to `iocContainer`.
const iocContainer = new Container()

// export according to convention
export { iocContainer }
```

Fonction en usine:

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
Si vous voulez utiliser un cadre DI autre que les exemples ci-dessous, ajouter ce n'est pas difficile.
Si vous définissez un iocModule, tsoa va appeler ce module (pour obtenir un `FooController`) avec:

```ts
import { iocContainer } from './the/path/to/the/module/from/tsoa.json'

iocContainer.get<FooController>(FooController)
```

Si vous enveloppez l'API de votre DI ou même un ControllerFactory pour accepter cet appel et répondre avec un FooController, cela fonctionnera.
:::

## InverserJS

Voici quelques exemples de code pour configurer le conteneur et votre contrôleur avec inversif. Js.
D'habitude, vous devrez dire à Inversifier comment créer votre contrôleur, mais comme cela n'est pas censé couvrir Inversifier,
Nous allons juste nous référer à leur [docs](http://inversify.io/).
Pour plus de commodité, nous utiliserons des contrôleurs inversif, ce qui rend très simple de dire inversif comment créer tsoa les contrôleurs.
Plus d'informations peuvent être trouvées [here](https://github.com/inversify/inversify-binding-decorators).

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

Nous ne voulons généralement pas créer une nouvelle instance de contrôleur pour chaque appel, alors créons un wrapper de commodité autour [`@fluentProvide()`](https://github.com/inversify/inversify-binding-decorators#fluent-binding-decorator)

::: danger

Si vous comptez sur l'état du contrôleur (par exemple, parce que vous utilisez `this.setHeaders` hérités [Controller](./reference/tsoa-next/classes/Controller.md)), vous devez injecter un nouveau contrôleur pour chaque demande.
Au lieu de `@provideSingleton`, s'il vous plaît assurez-vous d'utiliser `@fluentProvide` directement (qui est la manière par défaut de `fluentProvide(identifier).inTransientScope()`).

:::

```ts
// src/util/provideSingleton.ts
import { fluentProvide } from 'inversify-binding-decorators'
import { interfaces } from 'inversify'

export const provideSingleton = function <T>(identifier: interfaces.ServiceIdentifier<T>) {
  return fluentProvide(identifier).inSingletonScope().done()
}
```

Maintenant, dans nos contrôleurs, nous pouvons utiliser `@provideSingleton()`

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

Voici un exemple utilisant [TSyringe](https://github.com/microsoft/tsyringe).

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

## dactylographie

Voici un exemple de code pour configurer le contrôleur avec [typescript-ioc](https://github.com/thiagobustamante/typescript-ioc).

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

Les contrôleurs doivent être inclus dans l'application afin d'être liés.

`index.ts`

```ts
import "./controllers/fooController.ts"
...

```
