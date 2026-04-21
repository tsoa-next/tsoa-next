---
title: إعادة تحميل مباشرة
lang: ar
lastUpdated: 2026-04-20T00:28:55.919Z
---

# إعادة تحميل مباشرة

::: warning مذكرة الامتثال
أهداف هذا الدليل [express](https://expressjs.com) ويفترض `tsoa-next`سياسة الدعم الحالية: Node.js 22 أو أكثر.
نحن نتحقق من الدعم في جميع أنحاء LTS السابقة، و LTS الحالية، و Node (في سي آي)
الأمثلة الواردة أدناه: `npm`.. `pnpm`و `yarn` متغيرات حيث تختلف القيادة
نحن نفترض أن تركيبك يشبه الوصية [getting started](/ar/getting-started)
:::

المرجع ذو الصلة بالطلب: [`@SpecPath`](./reference/tsoa-next/functions/SpecPath.md).. [`SpecPathOptions`](./reference/tsoa-next/interfaces/SpecPathOptions.md).. [`SpecRequestContext`](./reference/tsoa-next/interfaces/SpecRequestContext.md)و [`SpecCacheHandler`](./reference/tsoa-next/interfaces/SpecCacheHandler.md).

::: tip
سنستخدم [nodemon](https://nodemon.io/) و [ts-node](https://github.com/TypeStrong/ts-node) لإعادة التحميل، لكن أيّ أداة تسمح لنا بالدخول في عملية إعادة التحميل ستفي بالغرض. البدائل يمكن أن تكون مزيجاً من `tsc -w` and triggering `tsoa spec-and-routes` استخدام [`onchange`](https://www.npmjs.com/package/onchange).
:::

** ما سنتحدث عنه:**

[[toc]]

## Reloading Code

### Installing nodemon and ts-node

::: code-group

```bash [npm]
npm i -D nodemon ts-node concurrently
```

```bash [pnpm]
pnpm add -D nodemon ts-node concurrently
```

```bash [yarn]
yarn add -D nodemon ts-node concurrently
```

:::

### خلق عقيدة رمزية

الآن، دعونا نخلق `nodemon.json` داخل الملف الجذري لمشروعنا الذي يبدو هكذا:

```json
{
  "exec": "ts-node src/server.ts",
  "watch": ["src"],
  "ext": "ts"
}
```

### أضف السيناريو

لنبدأ هذه المجموعة تلقائياً بمدير الطرد `dev` النص )النص(`npm run dev`.. `pnpm dev`أو `yarn dev`و، بينما نحن فيه، إضافة `build` و `start` أوامرنا `package.json`:

```diff
{
  "name": "starter",
  "version": "0.0.1",
+ "scripts": {
+   "dev": "concurrently \"nodemon\" \"nodemon -x tsoa spec-and-routes\"",
+   "build": "tsoa spec-and-routes && tsc",
+   "start": "node build/src/server.js"
+ },
  "dependencies": {
  // ...
}
```

## تشرف على تجربتنا مع المطور `@SpecPath`

[`@SpecPath(...)`](./reference/tsoa-next/functions/SpecPath.md) يَتْركُ a متحكم يَفْضحُ a عينة حية أَو أطباء نقطة نهاية بدون قراءة `swagger.json` أو `openapi.yaml` من القرص في وقت الطلب
وهذا يجعل من المناسب لتدفقات العمل الإنمائي حيث تريد الوثائق المتولدة أن تبقى متزامنة مع نفس البيانات الفوقية التي تستخدمها طرقك بالفعل.

### Installing adocs UI peer

إخترْ هدفَ docs UI تُريدُ أَنْ تَستعملَ:

- Express: `npm i swagger-ui-express` / `pnpm add swagger-ui-express` / `yarn add swagger-ui-express`- Koa: `npm i swagger-ui-koa` / `pnpm add swagger-ui-koa` / `yarn add swagger-ui-koa`- Hapi: `npm i hapi-swagger` / `pnpm add hapi-swagger` / `yarn add hapi-swagger`- Redoc: `npm i redoc` / `pnpm add redoc` / `yarn add redoc`- RapiDoc: `npm i rapidoc` / `pnpm add rapidoc` / `yarn add rapidoc`

### معرضاً لنقطة نهاية مُصفّاة مُراقبة

ملحق واحد أو أكثر `@SpecPath(...)` مصممون لجهاز التحكم الحالي:

```ts
import { Controller, Get, Route, SpecPath } from 'tsoa-next'

@Route('users')
@SpecPath()
@SpecPath('openapi.yaml', { target: 'yaml' })
@SpecPath('docs', { target: 'swagger' })
export class UsersController extends Controller {
  @Get()
  public list(): string[] {
    return []
  }
}
```

هذا يعطيك:

- `GET /users/spec` JSON
- `GET /users/openapi.yaml` لليام
- `GET /users/docs` for Swagger UI

لأن نقطة النهاية للأطباء متولدة من نفس البيانات الفوقية التي تدور في مساراتك، إنها تبقى في حالها كما تحرر المتحكمين وتعيد الركض `tsoa spec-and-routes`.

### فحص الوثائق

الآن، عندما نبحر <a href="http://localhost:3000/users/docs" target="_blank" rel="noreferrer">الموقع: 3000/users/docs</a>يجب أن نرى انعكاساً حالياً لمعهدنا

![SwaggerUI](/docs-images/SwaggerUI.png)

### طلبات التوريد Swagger UI

يمكننا أن نختار نقاط النهاية، ونضغط على زر "حاول" ونقدم بعض البيانات عن طريق ملء الاستمارة.
عندما نضرب "الطبيعية" هذا الطلب سيرسل إلى خادمنا وسيظهر الرد تحت الشكل

![SwaggerUI Response](/docs-images/SwUi-Response.png)

### أهداف أخرى مدمجة

إذا كنت تُفضّلُ a UI مختلف، يُغيّرُ `target` الخيار:

- `@SpecPath('docs', { target: 'redoc' })`- `@SpecPath('docs', { target: 'rapidoc' })`

إذا كنت في حاجة إلى استجابة كاملة، تمرير معالج في `target` بدلاً من ذلك يمكنك أن تضيف `cache` و `gate` في نفس الخيارات
