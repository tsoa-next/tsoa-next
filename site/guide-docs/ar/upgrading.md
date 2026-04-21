---
sidebarDepth: 1
lastUpdated: 2026-04-17T20:53:42.041Z
---

# الترقية من tsoa 2.5

[Jump to the breaking changes](#breaking-changes)

> ملاحظة تاريخية: يشير طلب السحب في هذا الدليل عن قصد إلى [`lukeautry/tsoa`](https://github.com/lukeautry/tsoa)حيث هبطت هذه التغييرات أصلاً

## الترشيحات الجديدة

### دعم الأسماء المستعارة من النوع

ويأتي هذا الإصدار بدعم مناسب لتعاريف الأسماء المستعارة.

يمكن أن تتراوح من سيناريوهات بسيطة

```ts
/**
 * A Word shall be a non-empty string
 * @minLength 1
 */
type Word = string
```

إلى سيناريوهات أكثر تعقيداً مثل الاتحادات والتقاطعات

```ts
type IntersectionAlias = { value1: string; value2: string } & TypeAliasModel1

// or
type OneOrTwo = TypeAliasModel1 | TypeAliasModel2
```

أو حتى من النوع العام

```ts
type GenericAlias<T> = T | string
type ForwardGenericAlias<T, U> = GenericAlias<U> | T
```

يرجى ملاحظة أن هذا يعني أن tsoa لا يولد المواصفات فقط (OpenAPI v3 and Swagger2/*), but will also validate the input against the types including the jsDoc annotations.

* قد يكون هناك سيناريوهات معينة قد لا نتمكن من توليدها Swagger 2 من TypeScript.. tsoa سوف يسجل تحذيرات لإبلاغك عن أي مسائل نحن على علم بها

### دعم الأنواع المصنَّفة

> TypeScript 2.1 introduced mapped types, a powerful addition to the type system. في الجوهر، الأنواع المصنّفة تسمح لك بخلق أنواع جديدة من الأنواع الموجودة عن طريق رسم الخرائط على أنواع الممتلكات. كل ممتلكات من النوع الحالي يتم تحويلها وفقا لقاعدة تحددها الممتلكات المحوّلة تكوّن من النوع الجديد
> (ماريوس شولز) https://mariusschulz.com/blog/mapped-types-in-typescript

tsoa الآن يعمل مع صانعة الشيكات لحل الأنواع المصنّفة. سنحاول بنشاط دعم جميع الحالات، مهما كانت مجموعة الاختبارات في الوقت الراهن تغطي فقط أنواع المخطوطات المصنّفة مع، مثل:

```ts
/**
 * Make all properties in T optional
 */
type Partial<T> = {
  [P in keyof T]?: T[P]
}

/**
 * Make all properties in T required
 */
type Required<T> = {
  [P in keyof T]-?: T[P]
}

/**
 * Make all properties in T readonly
 */
type Readonly<T> = {
  readonly [P in keyof T]: T[P]
}

/**
 * From T, pick a set of properties whose keys are in the union K
 */
type Pick<T, K extends keyof T> = {
  [P in K]: T[P]
}
```

### دعم الأنواع المشروطة

As of version 2.8, TypeScript يدعم الأنواع المشروطة. ويقترب النسيج كثيراً من المشغل البديل ويمكِّن من التعبير عن نوعين (أو أكثر) مختلفين على أساس شرط. يرجى الرجوع إلى [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/advanced-types.html#conditional-types) للتفاصيل

```ts
type Diff<T, U> = T extends U ? never : T // Remove types from T that are assignable to U
```

tsoa الآن يعمل مع صانع الـ(تي إس) لحل الأنواع المشروطة سنحاول بنشاط دعم معظم الحالات، مهما كانت مجموعة الاختبارات في الوقت الراهن تغطي فقط أنواع السفن من نوع المرافق مع، مثل:

```ts
/**
 * Exclude from T those types that are assignable to U
 */
type Exclude<T, U> = T extends U ? never : T

/**
 * Extract from T those types that are assignable to U
 */
type Extract<T, U> = T extends U ? T : never

/**
 * Exclude null and undefined from T
 */
type NonNullable<T> = T extends null | undefined ? never : T
```

### دعم التركيبات وأنواع المرافق

The combination of mapped and conditional types allow for powerful utility types like the `Omit` نوع.

```
/**
 * Construct a type with the properties of T except for those in type K.
 */
type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
```

### دعم `Record<>` [\#662](https://github.com/lukeautry/tsoa/pull/662) )أ([Eywek](https://github.com/Eywek))

### Enums: See [\#594](https://github.com/lukeautry/tsoa/pull/594) لـ (سبيك) [\#599](https://github.com/lukeautry/tsoa/pull/599) و [\#593](https://github.com/lukeautry/tsoa/pull/593)

### كلمة المفتاح: انظر [\#601](https://github.com/lukeautry/tsoa/pull/601)

### القدرة على استخدام تعيين حدود العقيد بدلا من السوار في المسار [\#602](https://github.com/lukeautry/tsoa/pull/602))أ([itamarco](https://github.com/itamarco))

### مضافا إليه @example support for parameters / properties [\#616](https://github.com/lukeautry/tsoa/pull/616) )أ([jfrconley](https://github.com/jfrconley))

### المزيج: تجاهل أساليب الفصل [\#643](https://github.com/lukeautry/tsoa/pull/643) )أ([Eywek](https://github.com/Eywek))

### أعضاء المقبض [\#656](https://github.com/lukeautry/tsoa/pull/656) )أ([Eywek](https://github.com/Eywek))

### الأنواع المفهرسة [\#636](https://github.com/lukeautry/tsoa/pull/636) )أ([Eywek](https://github.com/Eywek))

### المقبض `typeof` [\#635](https://github.com/lukeautry/tsoa/pull/635) )أ([Eywek](https://github.com/Eywek))

### `@format` دعم الأسماء المستعارة من النوع [\#620](https://github.com/lukeautry/tsoa/pull/620) )أ([jfrconley](https://github.com/jfrconley))

## Bug Fixes

- نشر الاسم الميداني بشكل صحيح في نظام المصادقة النموذج [@fantapop](https://github.com/fantapop)

- &apos; 2` إبطال مفعول أنواع الاستجابة السريعة [\#629](https://github.com/lukeautry/tsoa/pull/629) )أ([WoH](https://github.com/WoH))

- Validate ينبغي للخطأ أن يمدد الرعب [\#661](https://github.com/lukeautry/tsoa/pull/661) )أ([aldenquimby](https://github.com/aldenquimby))

- Upgrade koa-router to @koa/router, fix type errors [\#646](https://github.com/lukeautry/tsoa/pull/646) )أ([michaelbeaumont](https://github.com/michaelbeaumont))
- النوع الذي يزيل الجسم [\#642](https://github.com/lukeautry/tsoa/pull/642) )أ([dimitor115](https://github.com/dimitor115))
- `6` إضافة خصائص ثابتة إلى تعريف نموذجي [\#639](https://github.com/lukeautry/tsoa/pull/639) )أ([dimitor115](https://github.com/dimitor115))

## التغييرات التفصيلية

### Null vs. undefined

إلا إذا أعلنت نوع قبول `null`نحن لَنْ نَعْرفَ خواصَكَ الاختياريةَ ك `nullable: true` أو `x-nullable: true`.
وينطبق هذا على المصادقة على ذلك في حين إرسالها `null` بدلا من إرسال `undefined` لا توجد ممتلكات على جسم ما على ما يرام الآن لم يعد الأمر كذلك
إرسال `undefined` بدلاً من ذلك، أي. `string | null` كما أن التصديق يرفضه.

### الاسم

ولدعم الأسماء المستعارة من النوع وتفادي اشتباكات الاسم، ربما تغيرت أسماء الكيميائيات/التعاريف المولدة (تتأثر الوصلات البينية العامة في معظمها).
إذا كنت تعتمد على الأسماء المكوّنة المتولدة من tsoaهذا تغيير مفاجئ

لأنه tsoa دعمت بعض الأسماء المستعارة في الماضي والآن وضعت تعاريف مختلفة، هذا قد يكسر رمزك.
إذا كنت تعتمد على tsoa لا يدعم اسماً مستعاراً من النوع المناسب لتجنب القضايا هذا قد يكسر شفرتك
تقدموا بحذر وإبلاغ عن المسائل.

### Improve nested object validation

انظر [\#574](https://github.com/lukeautry/tsoa/pull/574) و [\#575](https://github.com/lukeautry/tsoa/pull/575).
ولا ينبغي أن تكون هذه البرمجيات خرقاً للتغييرات، ولكن بما أنها تؤثر على المصادقة، فهي أكثر أماناً من الأسف.

### تغيير السلوك الافتراضي عندما لا يُعرّف المُضيف:

جهزوا مضيفكم بشكل واضح في حال أردتم الحصول على الثور المطلق هذا تغيير مفاجئ لأولئك الذين كانوا يستخدمون OpenAPI ثلاثة، لكن في الحقيقة tsoa إلى المساواة مع كيفية التعامل مع `host` الممتلكات Swagger في الحلقات السابقة OpenAPI 3 مستعملين كان عليهم أن يؤدوا إلى مرورهم `null` التي شعرنا بها جميعاً كانت غريبة الان اغرب عن وجهي `host` سيسبب tsoa لافتراض أن الـ(يورل) يجب أن تكون نسبية

### ارحلوا في الميدان

عند اكتشاف الممتلكات الإضافية غير القانونية (إذا كنت تستخدم) tsoa وضع `additionalProperties: 'throw-on-extras'`مفتاح الخطأ يحتوي على نقطة إضافية

```js
{
  "TestModel..additionalProp: : {
    ...
  }
}
```

هذا الآن ثابت والمفتاح `TestModel.additionalProp`.

### استخدام سبيك بدلا من Swagger )أ(`tsoa swagger` لا يزال متاحا في الوقت الراهن، ولكن سيتم إزالتها في نهاية المطاف) [\#664](https://github.com/lukeautry/tsoa/pull/664) )أ([WoH](https://github.com/WoH))

```diff
Calling the tsoa command
- tsoa swagger
+ tsoa spec

- tsoa swagger-and-routes
+ tsoa spec-and-routes

Manually calling spec generation
- await generateSwaggerSpec(swaggerConfig, routesConfig, compilerOptions, config.ignore);
+ await generateSpec(openapiConfig, compilerOptions, config.ignore);
```

tsoaجيسون:

```js
{
  "swagger": {}
}
```

يصبح

```js
{
  "spec": {}
}
```

- نقل الثقة المشتركة إلى أعلى مستوى [\#628](https://github.com/lukeautry/tsoa/pull/628) )أ([WoH](https://github.com/WoH))

وبدلاً من الازدواج والتعامل مع الكثير من قضايا الحافة، فإن الحكم الجديد أبسط بكثير.
في بيئات الكونج، هذا يؤثر على كلا المسارين والمواصفات يقع الآن على أعلى مستوى من الجسم المثقب.

```json
{
  "entryFile": "./tests/fixtures/express/server.ts",
  "noImplicitAdditionalProperties": "silently-remove-extras",
  "routes": {},
  "spec": {}
}
```

هذا يعني إذا كانت أماكنك مختلفة (على سبيل المثال ملف الدخول) `generateRoutes()` و `generateSpec()` نفسك
ملاحظة أن هذه الأساليب أصبحت الآن أكثر بساطة:

```diff
-    await generateSwaggerSpec(swaggerConfig, routesConfig, compilerOptions, config.ignore);
+    await generateSpec(openapiConfig, compilerOptions, config.ignore);
```

```diff
-    await generateRoutes(routesConfig, swaggerConfig, compilerOptions, config.ignore);
+    await generateRoutes(routesConfig, compilerOptions, config.ignore);
```

EntryFile and noImplicitAdditional يمكن الآن تحديد الممتلكات على المحار/المفتاح (كونج)

Also, boolean settings for noImplicitAdditionalProperties have been removed: #503
-الأوراق المالية الآن `'throw-on-extras' | 'silently-remove-extras' | 'ignore'`كل شيء آخر يعود `'ignore'`.

** للاطلاع على الإشارة، انظر واجهة TS للثقة بأكملها [here](./reference/tsoa-next/interfaces/Config.md)♪

### TypeScript يجري الآن تنفيذ الاتحادات على نحو ما `anyOf` في OpenAPI [\#671](https://github.com/tsoa-next/tsoa-next/issues/671)
