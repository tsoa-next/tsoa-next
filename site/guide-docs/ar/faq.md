---
title: FAQ
lang: ar
lastUpdated: 2026-04-17T20:53:42.040Z
---

# FAQ

## يمكن أستخدم OpenAPI 3 أو 3-1 بدلا من OpenAPI 2 (سابقا) Swagger؟

نعم المجموعة `spec.specVersion` إلى `3` أو `3.1` في `tsoa.json` ملف See more config options in the [`Config`](./reference/tsoa-next/interfaces/Config.md) المرجع.

## كيف أستخدم tsoa مع (كوا)، (هابي)، أو أُطر أخرى؟

جهزوا ممتلكات المنتصف tsoa config. من خارج الصندوق، يُدعم (إيبي) و(كوا)
يمكنك أيضاً تقديم نموذج تقليدي، لمزيد من المعلومات، يرجى التحقق [the guide](./templates.md)

## كيفية ضمان عدم وجود أي ممتلكات إضافية في وقت غير مناسب

بالخطأ OpenAPI يسمح للنماذج [`additionalProperties`](https://swagger.io/docs/specification/data-models/dictionaries/). إذا أردت أن تتأكد في الوقت الحاضر أن البيانات لديها فقط العقارات المحددة في نماذجك `noImplicitAdditionalProperties` الخيار في [`Config`](./reference/tsoa-next/interfaces/Config.md) إلى أي منهما `"silently-remove-extras"` أو `"throw-on-extras"`.
المقهى:

- وستسمح الأنواع التالية دائماً بممتلكات إضافية بسبب طبيعة طريقة عملها:
  - The `any` النوع
  - نوع مفهرس (يسمح صراحة بخواص إضافية) `export interface IStringToStringDictionary { [key: string] : string }`- إذا كنت تستخدم tsoa لخدمة قائمة لديها مستهلكين
  - عليك أن تُخبر مستهلكيك قبل أن تضع `noImplicitAdditionalProperties` إلى `"throw-on-extras"` وبما أنه سيكون تغييراً مقتضباً (نظراً إلى أن طلب الهيئات التي كانت تعمل سابقاً سيقع الآن على خطأ).
- بغض النظر `"noImplicitAdditionalProperties" : "silently-remove-extras"` وهو خيار عظيم لكل من الميراث والآداب الجديدة (بما أن هذا يعكس سلوك المتسلسلين من طراز C#) وغيره من المتسلسلين الشعبيين من طراز JSON).

## التعامل مع الأسماء النموذجية المزدوجة

إذا كان لديك نماذج متعددة بنفس الاسم، قد تحصل على أخطاء تشير إلى أن هناك نماذج متطابقة متعددة. إذا كنت ترغب في تسمية صنف/وجه كنسخة 'كانونية' من نموذج، إضافة عنصر جيسكو علامة على ذلك:

```ts
/**
 * @tsoaModel
 */
export interface MyModel {
  ...
}
```

## كيف يمكنني الحصول على أكثر من بلدي منظمة الدول الأمريكية؟

الآن أن لديك OpenAPI المواصفات (OAS) [here](http://openapi.tools).

## كيفية تجاوز الحد الأقصى للتحقق من الصفوف الكبيرة (مع أكثر من 20 عنصرا)

بالخطأ [Express](https://github.com/expressjs/express) الاستخدامات [qs](https://github.com/ljharb/qs) كبائع داخلي، ولديه قيود غير مباشرة على التحقق من صحة 20 عنصرا في الصفوف
للتغلب على هذا يجب أن تضيفه بعد تشكيلة لثقتك الصريحة

```ts
const app = express()

app.set('query parser', function (str) {
  return qs.parse(str, { arrayLimit: Infinity })
})

app.use(bodyParser.json())
app.use(Router())
```

رجاءً لاحظْ بأنّك يَجِبُ أَنْ تَضِعَه فوق الإطارِ الأوسطِ الآخرِ.
