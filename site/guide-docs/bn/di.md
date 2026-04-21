---
lastUpdated: 2026-04-17T20:53:42.040Z
---
# নির্ভরতা ইঞ্জেকশন অথবা IOC

ডিফল্টরূপে, অটো-রান রুট ব্যবহার করে স্বয়ংক্রিয়ভাবে সংযোগ স্থাপন করা হয় ।
যদি আপনি নির্ভরতার ই-ফ্রেম ব্যবহার করতে চান এবং ডি-ফ্রেমওয়ার্ক হ্যান্ডেল করতে চান, তাহলে একটি আইওসি মডিউল স্থাপন করতে হবে tsoa কল করতে পারেন.
রিলেভেন্ট API উল্লেখ করেছে: [`Config`](./reference/tsoa-next/interfaces/Config.md)'%s' [`RoutesConfig`](./reference/tsoa-next/interfaces/RoutesConfig.md)'%s' [`IocContainer`](./reference/tsoa-next/interfaces/IocContainer.md)'%s' [`IocContainerFactory`](./reference/tsoa-next/type-aliases/IocContainerFactory.md)এবং [`Controller`](./reference/tsoa-next/classes/Controller.md). .

বলতে `tsoa-next` ডি- আই- ডি- আইকন ব্যবহার করতে আপনাকে আপনার মডিউল রপ্তানি করতে হবে [`Config`](./reference/tsoa-next/interfaces/Config.md) (যেমন ফাইল) `tsoa.json`[ পাদটীকা]

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

## আইওসি মডিউল

এখন আপনি একটি মডিউল তৈরি করতে পারেন যা হয় কনটেইনারে ধারণ করতে পারে `iocContainer`. .

কন্টেইনারকে নিম্নলিখিত ইন্টারফেস অনুসরণ করতে হবে।

```ts
interface IocContainer {
  get<T>(controller: { prototype: T }): T
}
```

ফাংশন নিম্নলিখিত স্বাক্ষর মেনে চলতে হবে, যেখানে `request` আপনার ওয়েব কাঠামোর অনুরোধ অবজেক্ট।

```ts
type IocContainerFactory = (request: unknown) => IocContainer
```

### উদাহরণ

ধারণকারী:

```ts
// src/ioc.ts
import { Container } from 'di-package'

// Assign a container to `iocContainer`.
const iocContainer = new Container()

// export according to convention
export { iocContainer }
```

ফ্যাক্টরির ফাংশান:

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
নীচের উদাহরণ ছাড়াও আপনি একটি ডিআই কাঠামো ব্যবহার করতে চান।
যদি আপনি একটি Ioocle স্থাপন, tsoa চিহ্নিত মডিউল দ্বারা কল করা হবে ( প্রাপ্ত করার উদ্দেশ্যে) `FooController`এর সাথে:

```ts
import { iocContainer } from './the/path/to/the/module/from/tsoa.json'

iocContainer.get<FooController>(FooController)
```

যদি আপনি আপনার DI's API অথবা একটি কন্ট্রোলার ফ্র্যাক্টরি এই কল গ্রহণ এবং Fo controlলারের সঙ্গে সাড়া গ্রহণ করেন, তাহলে এটি কাজ করবে।
:::

## উন্নতি

কন্টেইনার এবং আপনার কন্ট্রোলার এর কিছু উদাহরণ এখানে দেয়া হলো। জেস।
সাধারণত, তোমার কন্ট্রোলার বানাতে হবে, কিন্তু যেহেতু এটা গোপন রাখার কথা না,
আমরা শুধু তাদের নির্দেশ করব [docs](http://inversify.io/). .
সুবিধাদির জন্য, আমরা এখানে সার-সংক্ষেপকারী হিসেবে ব্যবহার করব, যা খুব সহজে বলা যায় কিভাবে তৈরি করা যায়। tsoa নিয়ন্ত্রণ।
অতিরিক্ত তথ্য পাওয়া যাবে [here](https://github.com/inversify/inversify-binding-decorators). .

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

আমরা সাধারণত প্রতিটি কলের জন্য নতুন কন্ট্রোলার তৈরি করতে চাই না, তাই আসুন আমরা এর জন্য একটি সুবিধা তৈরি করি [`@fluentProvide()`](https://github.com/inversify/inversify-binding-decorators#fluent-binding-decorator)

::: danger

আপনার উপর যদি ভরসা করে (যেমন: %s) `this.setHeaders` উত্তর __BAR_ [Controller](./reference/tsoa-next/classes/Controller.md)তোমার প্রত্যেক অনুরোধের জন্য নতুন কন্ট্রোলার লাগবে।
পরিবর্তে `@provideSingleton`দয়া করে ব্যবহারের চেষ্টা করুন `@fluentProvide` সরাসরি `fluentProvide(identifier).inTransientScope()`- হ্যা.

:::

```ts
// src/util/provideSingleton.ts
import { fluentProvide } from 'inversify-binding-decorators'
import { interfaces } from 'inversify'

export const provideSingleton = function <T>(identifier: interfaces.ServiceIdentifier<T>) {
  return fluentProvide(identifier).inSingletonScope().done()
}
```

এখন, আমাদের নিয়ন্ত্রকে, আমরা ব্যবহার করতে পারি `@provideSingleton()`

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

## Tyner

এখানে একটি উদাহরণ দেয়া হলো: [TSyringe](https://github.com/microsoft/tsyringe). .

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

## scripti-ioc

নিয়ন্ত্রণ ব্যবস্থা স্থাপন করার উদ্দেশ্যে কিছু উদাহরণ হলো [typescript-ioc](https://github.com/thiagobustamante/typescript-ioc). .

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

( ১ করি.

`index.ts`

```ts
import "./controllers/fooController.ts"
...

```
