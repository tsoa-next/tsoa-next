---
lastUpdated: 2026-04-20T21:59:41.313Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/runtime](../index.md) / SpecConfig

# Interface: SpecConfig

محددة في: [packages/runtime/src/config.ts:79](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L79)

OpenAPI أجيال

## الممتلكات

### basePath?

```ts
optional basePath?: string;
```

محددة في: [packages/runtime/src/config.ts:163](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L163)

طريق الـ "بي آي" في القاعدة، مثل "إف 1" https://myapi.com/v1

***

### contact?

```ts
optional contact?: object;
```

محددة في: [packages/runtime/src/config.ts:135](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L135)

Contact information for the published API.

#### email?

```ts
optional email?: string;
```

عنوان البريد الإلكتروني لشخص/تنظيم الاتصال.

##### Default

```ts
npm package author email
```

#### name?

```ts
optional name?: string;
```

The identifying name of the contact person/organization.

##### Default

```ts
npm package author
```

#### url?

```ts
optional url?: string;
```

URL pointing to the contact information.

##### Default

```ts
npm package author url
```

***

### description?

```ts
optional description?: string;
```

محددة في: [packages/runtime/src/config.ts:124](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L124)

وصف طلب الموافقة المسبقة عن علم؛ npm وصف

***

### disableBasePathPrefixSlash?

```ts
optional disableBasePathPrefixSlash?: boolean;
```

محددة في: [packages/runtime/src/config.ts:170](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L170)

الضوابط على ما إذا كانت `basePath` تم تحديدها مسبقاً `/` عند تكوينها OpenAPI 3 خوادم

فقط متاحة بنسخة 3 أو 3-1.

***

### host?

```ts
optional host?: string;
```

محددة في: [packages/runtime/src/config.ts:88](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L88)

اسم البلد المضيف Swagger ناتجان على سبيل المثال `localhost:3000`.

***

### license?

```ts
optional license?: string;
```

محددة في: [packages/runtime/src/config.ts:158](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L158)

رخصـة الرخصـة المرفـقـة؛ npm حزمة ترخيص عند وجودها

***

### name?

```ts
optional name?: string;
```

محددة في: [packages/runtime/src/config.ts:119](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L119)

اسم API؛ التقصير إلى npm الاسم

***

### operationIdTemplate?

```ts
optional operationIdTemplate?: string;
```

محددة في: [packages/runtime/src/config.ts:197](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L197)

سلسلة نموذجية لتوليد العمليات
This should be a valid handlebars template and is provided
مع السياق التالي:
  - راكب اسم "سترينج" لفصل المتحكمين
  - تسو هدف مُحدّد.

#### Default

```ts
'{{titleCase method.name}}'
```

***

### outputDirectory

```ts
outputDirectory: string;
```

محددة في: [packages/runtime/src/config.ts:83](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L83)

دليل أين يجب أن يكتب ملف المواصفات

***

### rootSecurity?

```ts
optional rootSecurity?: Security[];
```

محددة في: [packages/runtime/src/config.ts:232](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L232)

يُطبّقُ أمناً خاطئاً إلى كامل مكتب التحقيقات الفدرالي.
يمكن أن تكون مغمورة `@Security(...)` أو `@NoSecurity()` مصممون على أجهزة التحكم أو الأساليب

***

### schemes?

```ts
optional schemes?: Protocol[];
```

محددة في: [packages/runtime/src/config.ts:215](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L215)

البروتوكولات الداعمة Swagger ناتجان.

***

### securityDefinitions?

```ts
optional securityDefinitions?: object;
```

محددة في: [packages/runtime/src/config.ts:202](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L202)

مخططات الأمن المعلنة للمواصفات.

#### مؤشر التوقيع

```ts
[name: string]: SecuritySchemes
```

***

### servers?

```ts
optional servers?: string[];
```

محددة في: [packages/runtime/src/config.ts:95](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L95)

خادم OpenAPI 3 ناتج

فقط متاحة بنسخة 3 أو 3-1.

***

### spec?

```ts
optional spec?: unknown;
```

محددة في: [packages/runtime/src/config.ts:176](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L176)

اخترقت المواصفات المتولدة
وتتمتع الممتلكات المولدة دائما بالأسبقية على القيم المقدمة هنا.

***

### specFileBaseName?

```ts
optional specFileBaseName?: string;
```

محددة في: [packages/runtime/src/config.ts:102](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L102)

لقب (سواغر) (جيسون) أو (سواغر) يامل

@default: "سواغر"

***

### specMerging?

```ts
optional specMerging?: "recursive" | "immediate" | "deepmerge";
```

محددة في: [packages/runtime/src/config.ts:186](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L186)

التحكم كيف `spec` يتم دمجه في الوثيقة المتولدة
القيم المحتملة:
 - 'مسرعة تجاوزات فقط العناصر العليا.
 - "التكرار يؤدي دوراً عميقاً" `merge`.
 - (ديبميرج) يقوم بدمج عميق `ts-deepmerge`بما في ذلك الصفوف

#### Default

```ts
'immediate'
```

***

### specVersion?

```ts
optional specVersion?: SupportedSpecMajorVersion;
```

محددة في: [packages/runtime/src/config.ts:114](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L114)

الرائد OpenAPI إصدارات لتوليدها؛ تقصير في الصيغة 2 عندما لا يحدد
القيم المحتملة:
 - 2 - المولدات OpenAPI نسخة 2.
 - 3 - المولدات OpenAPI نسخة 3
 - 3-1: المولدات OpenAPI الصيغة 3-1.

***

### tags?

```ts
optional tags?: Tag[];
```

محددة في: [packages/runtime/src/config.ts:209](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L209)

البيانات الوصفية على المستوى الرفيع للمواصفات المتولدة.

***

### termsOfService?

```ts
optional termsOfService?: string;
```

محددة في: [packages/runtime/src/config.ts:130](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L130)

ربط الصفحة التي تصف شروط الخدمة.
يجب أن يكون في شكل URL.

***

### useTitleTagsForInlineObjects?

```ts
optional useTitleTagsForInlineObjects?: boolean;
```

محددة في: [packages/runtime/src/config.ts:226](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L226)

يضاف عناوين للرد الخطي وخصائص الجسم الطلبي لتحسين توليد العملاء.

***

### version?

```ts
optional version?: string;
```

محددة في: [packages/runtime/src/config.ts:105](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L105)

نسخة من نظام المعلومات الإدارية المتكامل؛ التقصير في صيغة الطرد.

***

### xEnumVarnames?

```ts
optional xEnumVarnames?: boolean;
```

محددة في: [packages/runtime/src/config.ts:221](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L221)

الدعم الممكّن من استخدام الأسماء من الفئة &quot; X-enum &quot;

#### Default

```ts
false
```

***

### yaml?

```ts
optional yaml?: boolean;
```

محددة في: [packages/runtime/src/config.ts:212](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L212)

يكتب المواصفات المتولدة كـ(يام إل) بدلاً من (جيون)
