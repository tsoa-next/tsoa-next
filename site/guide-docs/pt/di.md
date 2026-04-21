---
lastUpdated: 2026-04-17T20:53:42.040Z
---
# Injeção de dependência ou COI

Por padrão, todos os controladores são criados pelo modelo de rotas geradas automaticamente usando um construtor padrão vazio.
Se você quiser usar injeção de dependência e deixar o DI-framework lidar com a criação de seus controladores, precisamos configurar um Módulo IoC tsoa Posso ligar.
Referência da API relevante: [`Config`](./reference/tsoa-next/interfaces/Config.md), [`RoutesConfig`](./reference/tsoa-next/interfaces/RoutesConfig.md), [`IocContainer`](./reference/tsoa-next/interfaces/IocContainer.md), [`IocContainerFactory`](./reference/tsoa-next/type-aliases/IocContainerFactory.md), e [`Controller`](./reference/tsoa-next/classes/Controller.md).

Para dizer `tsoa-next` para usar seu conteúdo DI você tem que referenciar seu módulo exportando o conteúdo DI no [`Config`](./reference/tsoa-next/interfaces/Config.md) ficheiro (por exemplo `tsoa.json`):

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

Agora você pode criar um módulo que exporta um recipiente ou uma função como `iocContainer`.

Os recipientes devem estar em conformidade com a seguinte interface:

```ts
interface IocContainer {
  get<T>(controller: { prototype: T }): T
}
```

As funções devem estar em conformidade com a seguinte assinatura: `request` é o objeto de solicitação do seu framework web.

```ts
type IocContainerFactory = (request: unknown) => IocContainer
```

### Exemplo

Exemplo do recipiente:

```ts
// src/ioc.ts
import { Container } from 'di-package'

// Assign a container to `iocContainer`.
const iocContainer = new Container()

// export according to convention
export { iocContainer }
```

Função de fábrica:

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
Se você quiser usar um framework DI diferente dos exemplos abaixo, adicionar não é difícil.
Se você definir um iocModule, tsoa irá chamar este módulo (para obter uma `FooController`) com:

```ts
import { iocContainer } from './the/path/to/the/module/from/tsoa.json'

iocContainer.get<FooController>(FooController)
```

Se você embrulhar a API do seu DI ou até mesmo uma ControllerFactory para aceitar esta chamada e responder com um FooController, ela funcionará.
:::

## Inversificar o JS

Aqui está algum código de exemplo para configurar o contêiner e seu controlador com inversificar. Js.
Normalmente, você vai ter que dizer inversify como criar o seu controlador, mas como isso não é suposto cobrir inversify,
Vamos apenas referir-nos ao seu [docs](http://inversify.io/).
Por conveniência, vamos usar inversify-binding-controllers aqui, o que torna muito simples dizer inversify como criar tsoa Controladores.
Mais informações podem ser encontradas [here](https://github.com/inversify/inversify-binding-decorators).

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

Normalmente não queremos criar uma nova instância de controle para cada chamada, então vamos criar uma embalagem de conveniência [`@fluentProvide()`](https://github.com/inversify/inversify-binding-decorators#fluent-binding-decorator)

::: danger

Se você confia no estado do controlador (por exemplo, porque você está usando `this.setHeaders` herdado por [Controller](./reference/tsoa-next/classes/Controller.md)), necessita de injectar um novo Controller para cada pedido.
Em vez de `@provideSingleton`, certifique-se de usar `@fluentProvide` diretamente (que é a forma padrão de `fluentProvide(identifier).inTransientScope()`).

:::

```ts
// src/util/provideSingleton.ts
import { fluentProvide } from 'inversify-binding-decorators'
import { interfaces } from 'inversify'

export const provideSingleton = function <T>(identifier: interfaces.ServiceIdentifier<T>) {
  return fluentProvide(identifier).inSingletonScope().done()
}
```

Agora, em nossos controladores, podemos usar `@provideSingleton()`

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

Aqui está um exemplo usando [TSyringe](https://github.com/microsoft/tsyringe).

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

## typescript- ioc

Aqui está algum código de exemplo para configurar o controlador com [typescript-ioc](https://github.com/thiagobustamante/typescript-ioc).

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

Os controladores precisam ser incluídos na aplicação para serem vinculados.

`index.ts`

```ts
import "./controllers/fooController.ts"
...

```
