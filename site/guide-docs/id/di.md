---
lastUpdated: 2026-04-17T20:53:42.040Z
---
# Dependensi injeksi atau IOC

Secara baku semua pengontrol dibuat oleh template rute auto- dihasilkan menggunakan konstruktor baku kosong.
Jika Anda ingin menggunakan dependensi injeksi dan biarkan kerangka DI- menangani pembuatan controller Anda, kita perlu mengatur sebuah modul IOC tsoa bisa menelepon.
Referensi API Relevant: [`Config`](./reference/tsoa-next/interfaces/Config.md), [`RoutesConfig`](./reference/tsoa-next/interfaces/RoutesConfig.md), [`IocContainer`](./reference/tsoa-next/interfaces/IocContainer.md), [`IocContainerFactory`](./reference/tsoa-next/type-aliases/IocContainerFactory.md), dan [`Controller`](./reference/tsoa-next/classes/Controller.md).

Untuk memberitahu `tsoa-next` untuk menggunakan DI- container anda harus mereferensikan modul anda mengekspor DI- kontainer dalam [`Config`](./reference/tsoa-next/interfaces/Config.md) berkas (misalnya `tsoa.json`):

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

## Modul IoC

Sekarang Anda dapat membuat modul yang mengekspor baik wadah atau fungsi sebagai `iocContainer`.

Kontainer harus menyesuaikan ke antarmuka berikut.

```ts
interface IocContainer {
  get<T>(controller: { prototype: T }): T
}
```

Fungsi harus sesuai dengan tanda tangan berikut, dimana `request` adalah permintaan dari web Anda.

```ts
type IocContainerFactory = (request: unknown) => IocContainer
```

### Contoh

Instansi isi:

```ts
// src/ioc.ts
import { Container } from 'di-package'

// Assign a container to `iocContainer`.
const iocContainer = new Container()

// export according to convention
export { iocContainer }
```

Fungsi pabrik:

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
Bila Anda ingin memakai kerangka DI selain contoh di bawah, menambahkan tidaklah sulit.
Jika Anda mengatur sebuah iocModule, tsoa akan memanggil modul ini (untuk mendapatkan `FooController`) dengan:

```ts
import { iocContainer } from './the/path/to/the/module/from/tsoa.json'

iocContainer.get<FooController>(FooController)
```

Jika Anda membungkus API DI Anda atau bahkan ControllerFactory untuk menerima panggilan ini dan menanggapi dengan FooController, itu akan bekerja.
:::

## InversifyJS

Berikut adalah beberapa contoh kode untuk mengatur wadah dan controller Anda dengan inversify. js.
Biasanya, kau harus memberitahu infversify bagaimana membuat kontrolmu, tapi karena ini tidak seharusnya menutupi infversify,
kita hanya akan merujuk kepada mereka [docs](http://inversify.io/).
Untuk kenyamanan, kita akan menggunakan inversify- binding- controller di sini, yang membuatnya sangat sederhana untuk memberitahu inversify bagaimana membuat tsoa Pengontrol.
Informasi lebih lanjut dapat ditemukan [here](https://github.com/inversify/inversify-binding-decorators).

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

Kami biasanya tidak ingin membuat instansi pengendali baru untuk setiap panggilan, jadi mari kita membuat pembungkus kenyamanan sekitar [`@fluentProvide()`](https://github.com/inversify/inversify-binding-decorators#fluent-binding-decorator)

::: danger

Jika Anda mengandalkan kondisi pengontrol (misalnya, karena Anda menggunakan `this.setHeaders` diwariskan oleh [Controller](./reference/tsoa-next/classes/Controller.md)), Anda perlu menyuntikkan Controller baru untuk setiap permintaan.
Daripada `@provideSingleton`, silakan pastikan untuk menggunakan `@fluentProvide` secara langsung (yang merupakan cara baku untuk `fluentProvide(identifier).inTransientScope()`).

:::

```ts
// src/util/provideSingleton.ts
import { fluentProvide } from 'inversify-binding-decorators'
import { interfaces } from 'inversify'

export const provideSingleton = function <T>(identifier: interfaces.ServiceIdentifier<T>) {
  return fluentProvide(identifier).inSingletonScope().done()
}
```

Sekarang, dalam kontrol kami, kita dapat menggunakan `@provideSingleton()`

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

## TSyringch

Ini adalah contoh penggunaan [TSyringe](https://github.com/microsoft/tsyringe).

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

## typeshint- ioc

Berikut ini beberapa contoh kode untuk mengatur pengontrol dengan [typescript-ioc](https://github.com/thiagobustamante/typescript-ioc).

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

Pengontrol perlu dimasukkan ke dalam aplikasi agar dapat dihubungkan.

`index.ts`

```ts
import "./controllers/fooController.ts"
...

```
