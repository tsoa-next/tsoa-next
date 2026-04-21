---
lastUpdated: 2026-04-17T20:53:42.040Z
---
# निर्भरता इंजेक्शन या आईओसी

डिफ़ॉल्ट रूप से सभी नियंत्रकों को एक खाली डिफ़ॉल्ट निर्माता का उपयोग करके ऑटो उत्पन्न मार्ग टेम्पलेट द्वारा बनाया जाता है।
यदि आप निर्भरता इंजेक्शन का उपयोग करना चाहते हैं और डीआई-फ्रेमवर्क को अपने नियंत्रकों के निर्माण को संभालने की अनुमति देते हैं, तो हमें एक IoC मॉड्यूल स्थापित करने की आवश्यकता है। tsoa कॉल कर सकते हैं।
प्रासंगिक एपीआई संदर्भ: [`Config`](./reference/tsoa-next/interfaces/Config.md), [`RoutesConfig`](./reference/tsoa-next/interfaces/RoutesConfig.md), [`IocContainer`](./reference/tsoa-next/interfaces/IocContainer.md), [`IocContainerFactory`](./reference/tsoa-next/type-aliases/IocContainerFactory.md), और [`Controller`](./reference/tsoa-next/classes/Controller.md)।

बताने के लिए `tsoa-next` अपने डी-कंटेनर का उपयोग करने के लिए आपको अपने मॉड्यूल को डी-कंटेनर में निर्यात करने का संदर्भ देना होगा। [`Config`](./reference/tsoa-next/interfaces/Config.md) फ़ाइल (उदाहरण के लिए) `tsoa.json`):

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

## IoC मॉड्यूल

अब आप एक मॉड्यूल बना सकते हैं जो एक कंटेनर या एक फ़ंक्शन को निर्यात करता है `iocContainer`।

कंटेनर को निम्नलिखित इंटरफ़ेस के अनुरूप होना चाहिए।

```ts
interface IocContainer {
  get<T>(controller: { prototype: T }): T
}
```

कार्यों को निम्नलिखित हस्ताक्षर के अनुरूप होना चाहिए, जहां `request` आपकी वेब फ्रेमवर्क की अनुरोध वस्तु है।

```ts
type IocContainerFactory = (request: unknown) => IocContainer
```

### उदाहरण

कंटेनर उदाहरण:

```ts
// src/ioc.ts
import { Container } from 'di-package'

// Assign a container to `iocContainer`.
const iocContainer = new Container()

// export according to convention
export { iocContainer }
```

फैक्टरी समारोह:

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
यदि आप नीचे दिए गए उदाहरणों के अलावा अन्य DI फ्रेमवर्क का उपयोग करना चाहते हैं, तो इसे जोड़ना कठिन नहीं है।
यदि आप एक iocModule सेट करते हैं, तो, tsoa इस मॉड्यूल को कॉल करेगा (एक प्राप्त करने के लिए) `FooController`साथ में:

```ts
import { iocContainer } from './the/path/to/the/module/from/tsoa.json'

iocContainer.get<FooController>(FooController)
```

यदि आप अपने डीआई के एपीआई या यहां तक कि एक नियंत्रक को लपेटते हैं तो इस कॉल को स्वीकार करने और एक FooController के साथ जवाब देने के लिएफैक्टरी, यह काम करेगा।
:::

## InversifyJS

यहां कुछ उदाहरण कोड है जो कंटेनर और आपके नियंत्रक को उलट देने के लिए है। js.
आमतौर पर, आपको यह बताने की आवश्यकता होगी कि कैसे आपके नियंत्रक को बनाने के लिए, लेकिन चूंकि ऐसा नहीं है कि इसे उलट देना चाहिए, इसलिए आपको यह बताने की जरूरत नहीं है।
हम सिर्फ उनके बारे में बात करेंगे [docs](http://inversify.io/)।
सुविधा के लिए, हम यहां अंतर्निहित-बाइंडिंग-कंट्रोलर्स का उपयोग करेंगे, जो यह बताने के लिए बहुत सरल बनाता है कि कैसे बनाया जाए tsoa नियंत्रक
अधिक जानकारी पाई जा सकती है [here](https://github.com/inversify/inversify-binding-decorators)।

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

हम आमतौर पर हर कॉल के लिए एक नया नियंत्रक उदाहरण नहीं बनाना चाहते हैं, इसलिए चलो एक सुविधा रैपर बनाते हैं [`@fluentProvide()`](https://github.com/inversify/inversify-binding-decorators#fluent-binding-decorator)

::: danger

यदि आप नियंत्रक राज्य पर भरोसा करते हैं (उदाहरण के लिए, क्योंकि आप उपयोग कर रहे हैं) `this.setHeaders` विरासत में मिली [Controller](./reference/tsoa-next/classes/Controller.md)आपको हर अनुरोध के लिए एक नया नियंत्रक लगाने की आवश्यकता है।
इसके बजाय `@provideSingleton`, कृपया उपयोग करना सुनिश्चित करें `@fluentProvide` सीधे (जो डिफ़ॉल्ट तरीका है) `fluentProvide(identifier).inTransientScope()`).

:::

```ts
// src/util/provideSingleton.ts
import { fluentProvide } from 'inversify-binding-decorators'
import { interfaces } from 'inversify'

export const provideSingleton = function <T>(identifier: interfaces.ServiceIdentifier<T>) {
  return fluentProvide(identifier).inSingletonScope().done()
}
```

अब, हमारे नियंत्रकों में, हम उपयोग कर सकते हैं `@provideSingleton()`

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

यहाँ एक उदाहरण है [TSyringe](https://github.com/microsoft/tsyringe)।

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

## टाइपस्क्रिप्ट-ioc

यहां नियंत्रक को सेटअप करने के लिए कुछ उदाहरण कोड है [typescript-ioc](https://github.com/thiagobustamante/typescript-ioc)।

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

नियंत्रकों को जोड़ने के लिए आवेदन में शामिल होने की आवश्यकता होती है।

`index.ts`

```ts
import "./controllers/fooController.ts"
...

```
