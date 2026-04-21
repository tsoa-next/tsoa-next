---
title: البدء
lang: ar
lastUpdated: 2026-04-17T20:53:42.041Z
---

# بدأت

** ما سنتحدث عنه:**

[[toc]]

المرجع ذو الصلة بالطلب: [`Controller`](./reference/tsoa-next/classes/Controller.md).. [`@Route`](./reference/tsoa-next/functions/Route.md).. [`@Get`](./reference/tsoa-next/functions/Get.md).. [`@Path`](./reference/tsoa-next/functions/Path.md).. [`@Query`](./reference/tsoa-next/functions/Query.md).. [`@Post`](./reference/tsoa-next/functions/Post.md).. [`@Body`](./reference/tsoa-next/functions/Body.md)و [`@SuccessResponse`](./reference/tsoa-next/functions/SuccessResponse.md).

::: warning مذكرة الامتثال
أهداف هذا الدليل [express](https://expressjs.com) ويفترض `tsoa-next`سياسة الدعم الحالية: Node.js 22 أو أكثر.
نحن نتحقق من الدعم في جميع أنحاء LTS السابقة، و LTS الحالية، و Node (في سي آي)
الأمثلة الواردة أدناه: `npm`.. `pnpm`و `yarn` متغيرات حيث تختلف القيادة
:::

## بدء مشروعنا

```shell
# Create a new folder for our project
mkdir tsoa-project
cd tsoa-project

# Initialize git
git init
```

إنشاء `package.json` و `tsconfig.json` مع مدير الطرد الخاص بك،

::: code-group

```shell [npm]
npm init -y
npm exec tsc -- --init
```

```shell [pnpm]
pnpm init
pnpm exec tsc --init
```

```shell [yarn]
yarn init -y
yarn exec tsc --init
```

:::

وضع التطبيق TypeScript تعول مع مدير الطرد الذي تختاره

::: code-group

```shell [npm]
npm i tsoa-next express
npm i -D typescript @types/node @types/express
```

```shell [pnpm]
pnpm add tsoa-next express
pnpm add -D typescript @types/node @types/express
```

```shell [yarn]
yarn add tsoa-next express
yarn add -D typescript @types/node @types/express
```

:::

استيراد الطرق المولدة من `tsoa-next`إذاً الطرد الذي وضعته هو أيضاً الرزمة التي يستخدمها المتحكمون `RegisterRoutes` الملفات
يمكنك أيضا أن تجد الطرد المنشور على [npm](https://www.npmjs.com/package/tsoa-next).

## الثقة tsoa والآلات

```js
// tsoa.json
{
  "entryFile": "src/app.ts",
  "noImplicitAdditionalProperties": "throw-on-extras",
  "controllerPathGlobs": ["src/**/*Controller.ts"],
  "spec": {
    "outputDirectory": "build",
    "specVersion": 3
  },
  "routes": {
    "routesDir": "build"
  }
}
```

لنلقي نظرة على ما نقوله tsoa هنا:
أولا، نحدد المكان الذي سيدخل فيه تطبيقنا.
على الأرجح، هذا الملف سيسمى `index.ts` أو `app.ts`. سنصنع هذا الملف في ثانية

بعد ذلك، أعلى مستوى `controllerPathGlobs` إعداد الأخبار tsoa حيث يمكن أن تبحث عن المتحكمين حتى لا يكون لدينا يدويا لاستيرادهم.

التالي، نقول tsoa مدى صرامة فحص الممتلكات (لأستخدام) TypeScript مدة العضوية أو فترة إضافية التحقق من الممتلكات (للاستعمال) OpenAPI () ينبغي أن تكون.
نحن يُمْكِنُ أَنْ نَختارَ "مَنْ يَكُونُ" الإختبار الإضافي OpenAPI default), remove them during validation (silently-remove-extras) or throw an Error back to the Client (throw-on-extras)).
بعد ذلك، وضعنا دليل النواتج OpenAPI المواصفات (منظمة الدول الأمريكية) `routes.ts` الملف الذي سنتحدث عنه لاحقاً

لقد وضعنا `specVersion` إلى `3` هكذا tsoa سوف يولد OpenAPI مواصفات ضد 3
يمكنك أيضا استخدام `3.1` عندما تريد OpenAPI 3-1 الناتج

لقائمة كاملة من كل الوصية الممكنة، إلقاء نظرة على [مرجع API](./reference/tsoa-next/interfaces/Config.md)

::: tip
في حين أن الوصية الخاطفة سوف تعمل من أجل هذا الدليل سيبدو (جيسون) شيئاً كهذا
::: details

```jsonc
{
  "compilerOptions": {
    /* Basic Options */
    "incremental": true,
    "target": "es6",
    "module": "commonjs",
    "outDir": "build",

    /* Strict Type-Checking Options */
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    "noImplicitThis": true,
    "alwaysStrict": true,

    /* Additional Checks */
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,

    /* Module Resolution Options */
    "moduleResolution": "node",
    "baseUrl": ".",
    "esModuleInterop": true,

    /* Experimental Options */
    "experimentalDecorators": true,
    // emitDecoratorMetadata is not needed by tsoa-next itself

    /* Advanced Options */
    "forceConsistentCasingInFileNames": true,
  },
}
```

:::

## تحديد نموذجنا الأول

إذا كان لديك بالفعل OpenAPI المواصفات، يمكنك استخدام القائمة OpenAPI أداة لتوليد نماذجك أو الأوجه
وإلا لنحدد `User` Interface in `src/users/user.ts`.

```typescript
export interface User {
  id: number
  email: string
  name: string
  status?: 'Happy' | 'Sad'
  phoneNumbers: string[]
}
```

قبل أن نبدأ بتعريف المراقب المالي، عادة ما تكون فكرة جيدة أن ننشئ دائرة تتعامل مع نماذجنا بدلا من أن ننقل كل هذا المنطق إلى طبقة التحكم.

```ts
// src/users/usersService.ts
import { User } from './user'

// A post request should not contain an id.
export type UserCreationParams = Pick<User, 'email' | 'name' | 'phoneNumbers'>

export class UsersService {
  public get(id: number, name?: string): User {
    return {
      id,
      email: 'jane@doe.com',
      name: name ?? 'Jane Doe',
      status: 'Happy',
      phoneNumbers: [],
    }
  }

  public create(userCreationParams: UserCreationParams): User {
    return {
      id: Math.floor(Math.random() * 10000), // Random
      status: 'Happy',
      ...userCreationParams,
    }
  }
}
```

## تحديد متحكم بسيط

```typescript {15,17,19,20,25,26,28}
// src/users/usersController.ts
import { Body, Controller, Get, Path, Post, Query, Route, SuccessResponse } from 'tsoa-next'
import { User } from './user'
import { UsersService, UserCreationParams } from './usersService'

@Route('users')
export class UsersController extends Controller {
  @Get('{userId}')
  public async getUser(@Path() userId: number, @Query() name?: string): Promise<User> {
    return new UsersService().get(userId, name)
  }

  @SuccessResponse('201', 'Created') // Custom success response
  @Post()
  public async createUser(@Body() requestBody: UserCreationParams): Promise<void> {
    this.setStatus(201) // set return status 201
    new UsersService().create(requestBody)
    return
  }
}
```

لنتراجع ونتحدث عما يجري هنا
كما يُمكنُك أن تُخبرَ، نحن نَعْرفُ `/users/` استخدام الطريق [`@Route()`](./reference/tsoa-next/functions/Route.md) مصممة على درجة المتحكمين

وبالإضافة إلى ذلك، نحدد طريقتين: `getUser` و `createUser`.
The [`@Get()`](./reference/tsoa-next/functions/Get.md) مصممة مع ممر القاعدة `/users/` سيخبرنا tsoa للتذرع بهذه الطريقة لكل طلب `/users/{{userId}}`حيث إنه نموذج

::: tip المعبد
اركب tsoa مرآة عن قرب OpenAPIطريق مغري لأسباب التوافق
ويشير إغراء المسار إلى استخدام تعبيرات نموذجية، محددة بواسطة حمالات العجلات ({})، لتحديد جزء من مسار URL على أنه يمكن استبداله باستخدام معايير المسار.
:::

تحت القلنسوة، هذا سيكون مثل تحديد `app.get('users/:userId')`.
في حين أن التعبير يسمح لك باستخدام تعاريف المسارات المتكررة، نفضّل تقسيم المسارات والتحقق بشكل أوضح.
لأنّك تطلبين أن يكون الـ... رقماً بإستخدامه [`@Path()`](./reference/tsoa-next/functions/Path.md) مصمم مع `userId` من النوع tsoa سيرفض المرور هنا
وبالمثل، إذا كنت ترغب في قبول الـ... ... مع نمط معين، يمكنك أن تفعل ذلك باستخدام الشروح المشتركة Schema. يمكنك تعلم المزيد عن ذلك [here](#what-s-next).

tsoa-next :: دعم المسارات المعتادة، والاستفسارات، والرائدين، وأجهزة تشفير الجسم، كما أنها تدعم أيضاً مصممي البيانات المتعددة الجوانب مثل [`@FormField()`](./reference/tsoa-next/functions/FormField.md).. [`@UploadedFile()`](./reference/tsoa-next/functions/UploadedFile.md)و [`@UploadedFiles()`](./reference/tsoa-next/functions/UploadedFiles.md)زائداً بارامترات الحقن غير المتكررة مثل [`@Request()`](./reference/tsoa-next/functions/Request.md) و [`@Res()`](./reference/tsoa-next/functions/Res.md).

::: tip
إذا كان اسم البارامترات مساوياً لمباراة الرسالة على الموقع، يمكنك حذف الحجة إلى مصممي الديكور، وإلا جاز لك أن تقدم حجة:

```ts
@Query('my-query') myQuery: string;
```

:::

يمكن العثور على قائمة كاملة بجميع المصممين [here](./decorators).

::: warning مقهى
دائماً ما تستخدم تصديراً مسمّى`export class C`في صف المراقب tsoa لتلتقطها بشكل صحيح
الصادرات غير المباشرة`export default class C`() غير مدعوم حاليا.
:::

## إنشاء خادمنا السريع

لنخلق الآن `app.ts` )أ( `server.ts` ملف في دليل المصدر مثل هذا:

```ts
// src/app.ts
import express, { json, urlencoded } from 'express'
import { RegisterRoutes } from '../build/routes'

export const app = express()

// Use body parser to read sent json payloads
app.use(
  urlencoded({
    extended: true,
  }),
)
app.use(json())

RegisterRoutes(app)
```

```ts
// src/server.ts
import { app } from './app'

const port = process.env.PORT || 3000

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
```

## بناء الملفات المتولدة

في هذه المرحلة ربما لاحظت TypeScript لن يجدوا `RegisterRoutes` الواردات `build/routes`.
هذا لأننا لم نطلب tsoa لتوليد الملف والطرق OpenAPI بالتأكيد
دعونا نفعل ذلك الآن:

```shell
mkdir -p build # Create the build directory if it doesn't exist
```

::: code-group

```shell [npm]
npm exec tsoa -- spec-and-routes
```

```shell [pnpm]
pnpm exec tsoa spec-and-routes
```

```shell [yarn]
yarn exec tsoa spec-and-routes
```

:::

الآن ملفاتك المُولّدة كان يجب أن تُخلق ويمكنك تجميعها TypeScript وأبدأ خادمك

::: code-group

```shell [npm]
npm exec tsc -- --outDir build --experimentalDecorators
```

```shell [pnpm]
pnpm exec tsc --outDir build --experimentalDecorators
```

```shell [yarn]
yarn exec tsc --outDir build --experimentalDecorators
```

:::

```shell
node build/src/server.js
```

::: tip

قد ترغب في إضافة هذه النصوص إلى `package.json` في هذه المرحلة:

```js
"main": "build/src/server.js",
"scripts": {
  "build": "tsoa spec-and-routes && tsc",
  "start": "node build/src/server.js"
},
```

:::

## ما التالي؟

- الاستشهاد اليدوي `tsc` و `tsoa routes` إن التنمية غير ملائمة جدا.
- فحص أول OpenAPI مواصفات ونسخة محدثة SwaggerUI أثناء التنمية.

يمكننا تحسين استخدام [live reloading](./live-reloading).

- تحسين ردنا على أخطاء المصادقة باستخدام الحق [error handling](./error-handling)- استخدام [Descriptions](./descriptions).. [أمثلة](./examples) و [Annotations](./annotations) المصادقة المسبقة والتوثيق الأفضل
