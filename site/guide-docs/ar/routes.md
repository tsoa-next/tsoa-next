---
lastUpdated: 2026-04-17T20:53:42.041Z
---
# مسارات مستهلكة متولدة

المرجع ذو الصلة بالطلب: [`Config`](./reference/tsoa-next/interfaces/Config.md) و [`@Route`](./reference/tsoa-next/functions/Route.md).

لديك خيارين للتعرف tsoa حيث يُمكنها إيجاد المُراقبين الذين ستستخدمهم لخلق الطاقات الآلية `routes.ts` ملف

## استخدام أجهزة التحكم الآلي

يمكنك أن تقول `tsoa-next` استخدام الاكتشاف التلقائي عن طريق توفير واحد أو أكثر [minimatch globs](http://www.globtester.com/) في أعلى المستويات `controllerPathGlobs` ميدانك [`Config`](./reference/tsoa-next/interfaces/Config.md) ملف (على سبيل المثال) `tsoa.json`)

Pros:

- يمكن لمطورين جدد أن يضيفوا متحكمين بدون أن يعرفوا كيف tsoa "الحشرات" للمتحكمين. طالما أن متحكمهم مُمسك من قِبل المجد الذي تُقدّمُه، المتحكم سيُضاف إلى OpenAPI التوثيق والتوثيق الآلي `routes.ts` ملف

Cons:

- يمكن أن يكون أبطأ قليلاً من النهج البديل الصريح للواردات لأنه tsoa يجب أن تتوسع وتحمّل المجد المزوّد

كما ترى من المتحكمين أنماط تحتها يمكنك أن تقدم العديد من المجد من مختلف الأنماط

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

## دليلي tsoa الذي يتحكم في استخدامه في ملف التأليف

إذا غفلت `controllerPathGlobs`.. tsoa يمكن أن يزحف ملف دخول الطلب ويتبع واردات المتحكم التي لديها `@Route` مصمم

Pros:

- جيل الطريق سيكون أسرع tsoa تتبع وارداتك الواضحة بدلاً من توسيع المجد

Cons:

- المطورون الجدد في فريقك قد يضيفون متحكماً ولا يفهمون سبب عدم تعرض المتحكم الجديد للجهاز أو OpenAPI جيل إذا كانت هذه مشكلة بالنسبة لك، تفضل `controllerPathGlobs`.

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
