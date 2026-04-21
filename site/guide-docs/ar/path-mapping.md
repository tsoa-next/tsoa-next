---
lastUpdated: 2026-03-22T05:01:23.358Z
---
### رسم خرائط الطريق

Per the [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/basic-types.html) تحت بند [module resolution](https://www.typescriptlang.org/docs/handbook/module-resolution.html):

> وفي بعض الأحيان لا توجد الوحدات مباشرة تحت بند استخدام القاعدة. على سبيل المثال، سيُترجم استيراد إلى وحدة "جيكيري" في الوقت الحاضر إلى "نود / / عقيدات/جيكيري/جليم. ويستخدم المقرون تشكيلة لرسم الخرائط لرسم خرائط أسماء الوحدات للملفات في وقت التشغيل، انظر وثائق نظام &quot; RequireJs &quot; ووثائق نظامJS.
>> The TypeScript المُجمّع يدعم إعلان تلك الخرائط باستخدام "ممتلكات المُختلّفين" في ملفات (إسبيج جونسون). هنا مثال على كيفية تحديد "ممتلكات المتعاطفين"

```js
{
  "compilerOptions": {
    "baseUrl": ".", // This must be specified if "paths" is.
    "paths": {
      "jquery": ["node_modules/jquery/dist/jquery"] // This mapping is relative to "baseUrl"
    }
  }
}
```

إذا كان لديك مشروع يستخدم هذه الوظيفة، يمكنك مصادرة المولدات الداخلية إما من خلال:

- السماح `tsoa-next` خيارات التجميع من `tsconfig.json`- تغلب على قيم محددة مع `compilerOptions` في `tsoa` config

`tsconfig.json` هو مصدر مدخلات، وليس السلطة النهائية. والأولوية هي:

1. TypeScript العجز الداخلي
2. تم حلها `tsconfig.json`3. صريح `compilerOptions` في `tsoa` config

إذا `tsconfig` تم إغفاله `tsoa-next` البحث `tsconfig.json` بدءاً من الحمولة `tsoa` دليل الثقة. إذا `tsconfig` ويُقدَّم، ويُسوَّى فيما يتعلق بهذا الملف.

```js
{
  "tsconfig": "./tsconfig.json",
  "spec": {
    ...
  },
  "routes": {
    ...
  },
  "compilerOptions": {
    "baseUrl": "./path/to/base/url",
    "paths": {
      "exampleLib": ["./path/to/example/lib"]
    }
  }
}
```

يمكنك أيضا الاستمرار في تقديم خيارات التجميع مباشرة عندما لا تريد الاعتماد على `tsconfig.json`.

```js
{
  "spec": {
    ...
  },
  "routes": {
    ...
  },
   "compilerOptions": {
        "baseUrl": "./path/to/base/url",
        "paths": {
            "exampleLib": "./path/to/example/lib"
        }
    }
}
```
