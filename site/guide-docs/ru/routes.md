---
lastUpdated: 2026-04-17T20:53:42.041Z
---
# Потребление генерируемых маршрутов

Соответствующая ссылка API: [`Config`](./reference/tsoa-next/interfaces/Config.md) и [`@Route`](./reference/tsoa-next/functions/Route.md).

У вас есть два варианта, как сказать tsoa где он может найти контроллеры, которые он будет использовать для создания автоматически генерируемых `routes.ts` Файл.

## Использование автоматического обнаружения контроллеров

Вы можете сказать `tsoa-next` Использование автоматического обнаружения контроллера путем предоставления одного или нескольких [minimatch globs](http://www.globtester.com/) на высшем уровне `controllerPathGlobs` Поле вашего [`Config`](./reference/tsoa-next/interfaces/Config.md) файл (например, `tsoa.json`).

Плюсы:

- Новые разработчики могут добавить контроллер, не зная, как tsoa "ползает" для контроллеров. До тех пор, пока их контроллер пойман шаром, который вы предоставляете, контроллер будет добавлен к контроллеру. OpenAPI Документация и автогенерируемая `routes.ts` Файл.

Минусы:

- Это может быть немного медленнее, чем альтернативный подход с прямым импортом. tsoa Нужно расширять и загружать настроенные шарики.

Как вы можете видеть из шаблонов контроллеров ниже, вы можете предоставить несколько шаров различных шаблонов:

```js
{
  "entryFile": "...",
  "controllerPathGlobs": [
    "./dir-with-controllers/*",
    "./recursive-dir/**/*",
    "./custom-filerecursive-dir/**/*.controller.ts"
  ],
  "routes": {
    "routesDir": "...",
    "middleware": "..."
  }
}
```

## Ручной рассказ tsoa какие контроллеры использовать в файле ввода приложения

Если вы пропустите `controllerPathGlobs`, tsoa может сканировать файл ввода приложения и следить за импортом контроллера, который имеет `@Route` Декоратор.

Плюсы:

- Как правило, это происходит быстрее, потому что tsoa Следуйте своему явному импорту вместо того, чтобы расширяться.

Минусы:

- Новые разработчики в вашей команде могут добавить контроллер и не понять, почему новый контроллер не был подвержен воздействию маршрутизатора или маршрутизатора. OpenAPI поколения. Если это проблема для вас, предпочтите `controllerPathGlobs`.

```typescript
import * as methodOverride from 'method-override'
import * as express from 'express'
import * as bodyParser from 'body-parser'
import { RegisterRoutes } from './routes'

// ########################################################################
// controllers need to be referenced in order to get crawled by the generator
import './users/usersController'
// ########################################################################

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(methodOverride())

RegisterRoutes(app)

app.listen(3000)
```
