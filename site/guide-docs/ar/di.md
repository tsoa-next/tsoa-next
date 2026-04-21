---
lastUpdated: 2026-04-17T20:53:42.040Z
---
# حقن الإعالة أو حقن الإعالة

عن طريق التقصير كل المتحكمين خلقوا من خلال نموذج الدروب المولدة آلياً
إذا كنت تريد استخدام الحقنة التبعية والسماح لإطار دي دي يتعامل مع إنشاء متحكميك، نحن بحاجة إلى إنشاء وحدة IoC tsoa يمكن الاتصال.
المرجع ذو الصلة بالطلب: [`Config`](./reference/tsoa-next/interfaces/Config.md).. [`RoutesConfig`](./reference/tsoa-next/interfaces/RoutesConfig.md).. [`IocContainer`](./reference/tsoa-next/interfaces/IocContainer.md).. [`IocContainerFactory`](./reference/tsoa-next/type-aliases/IocContainerFactory.md)و [`Controller`](./reference/tsoa-next/classes/Controller.md).

ليقول `tsoa-next` لاستعمال جهاز التحكم الخاص بك يجب أن تُشير إلى نموذجك الذي يُصدّر حاوية دي في [`Config`](./reference/tsoa-next/interfaces/Config.md) ملف (على سبيل المثال) `tsoa.json`)

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

الآن يمكنك أن تخلق وحدة تصادر إما حاوية أو وظيفة `iocContainer`.

يجب أن تتوافق الحاويات مع الوصلة البينية التالية.

```ts
interface IocContainer {
  get<T>(controller: { prototype: T }): T
}
```

ويجب أن تكون المهام متوافقة مع التوقيع التالي: `request` هو موضوع طلب إطارك

```ts
type IocContainerFactory = (request: unknown) => IocContainer
```

### مثال

الحاويات:

```ts
// src/ioc.ts
import { Container } from 'di-package'

// Assign a container to `iocContainer`.
const iocContainer = new Container()

// export according to convention
export { iocContainer }
```

وظيفة العوامل:

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
إذا كنت ترغب في استخدام إطار تبادل البيانات غير الأمثلة أدناه، إضافة أنه ليس من الصعب.
إذا كنت وضعت أيوك موديل، tsoa سأتصل بهذه الوحدة `FooController`مع:

```ts
import { iocContainer } from './the/path/to/the/module/from/tsoa.json'

iocContainer.get<FooController>(FooController)
```

إذا لفّتَ مخبرَكَ المُشغّلَ أو حتى a مُراقبِ إفكتوري للقَبْل هذه المكالمةِ والردّ مَع a مُراقبِ فوكو، هو سَيَعْملُ.
:::

## InversifyJS

هنا بعض الشفرة لتشكيل الحاوية و متحكمك بالتنويع جي.
عادةً، عليكِ أن تُخبري بتنويع كيفية إنشاء مُراقبكِ، لكن بما أنّ هذا ليس من المفترض أن يغطي التنويع،
سوف نشير لهم [docs](http://inversify.io/).
من أجل المواساة، سنستخدم المتمردين الملزمين هنا مما يجعل من البساط جداً معرفة كيفية خلق tsoa متحكمون
يمكن العثور على المزيد من المعلومات [here](https://github.com/inversify/inversify-binding-decorators).

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

نحن عادة لا نُريدُ أَنْ نَجْعلَ a مراقبة جديدة لكلّ نداءِ، لذا دعنا نَجْعلُ a ملفوف مريح حول [`@fluentProvide()`](https://github.com/inversify/inversify-binding-decorators#fluent-binding-decorator)

::: danger

إذا كنت تعتمد على دولة التحكم (على سبيل المثال، لأنك تستخدم `this.setHeaders` ورثتها [Controller](./reference/tsoa-next/classes/Controller.md)عليك حقن مراقب جديد لكل طلب
بدلاً من `@provideSingleton`من فضلك تأكد من استخدام `@fluentProvide` مباشرة (وهذا هو الطريق الافتراضي إلى `fluentProvide(identifier).inTransientScope()`)

:::

```ts
// src/util/provideSingleton.ts
import { fluentProvide } from 'inversify-binding-decorators'
import { interfaces } from 'inversify'

export const provideSingleton = function <T>(identifier: interfaces.ServiceIdentifier<T>) {
  return fluentProvide(identifier).inSingletonScope().done()
}
```

الآن، في متحكمينا، يمكننا استخدام `@provideSingleton()`

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

هنا مثال يستعمل [TSyringe](https://github.com/microsoft/tsyringe).

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

## الكاتب

هنا بعض الشفرة لضبط المتحكم [typescript-ioc](https://github.com/thiagobustamante/typescript-ioc).

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

ويتعين إدراج المتحكمين في الطلب من أجل الربط بينهما.

`index.ts`

```ts
import "./controllers/fooController.ts"
...

```
