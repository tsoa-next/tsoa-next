---
lastUpdated: 2026-04-20T21:59:41.368Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/cli](../index.md) / ExtendedSpecConfig

# Interface: ExtendedSpecConfig

محددة في: [cli/src/api.ts:387](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/api.ts#L387)

الثقوب المطبعية عادت [validateSpecConfig](../functions/validateSpecConfig.md).

## التذييلات

- `SpecConfig`

## الممتلكات

### basePath?

```ts
optional basePath?: string;
```

محددة في: [packages/runtime/src/config.ts:163](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L163)

طريق الـ "بي آي" في القاعدة، مثل "إف 1" https://myapi.com/v1

#### Inherited from

```ts
SpecConfig.basePath
```

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

#### Inherited from

```ts
SpecConfig.contact
```

***

### controllerPathGlobs?

```ts
optional controllerPathGlobs?: string[];
```

محددة في: [cli/src/api.ts:390](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/api.ts#L390)

***

### description?

```ts
optional description?: string;
```

محددة في: [packages/runtime/src/config.ts:124](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L124)

وصف طلب الموافقة المسبقة عن علم؛ npm وصف

#### Inherited from

```ts
SpecConfig.description
```

***

### disableBasePathPrefixSlash?

```ts
optional disableBasePathPrefixSlash?: boolean;
```

محددة في: [packages/runtime/src/config.ts:170](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L170)

الضوابط على ما إذا كانت `basePath` تم تحديدها مسبقاً `/` عند تكوينها OpenAPI 3 خوادم

فقط متاحة بنسخة 3 أو 3-1.

#### Inherited from

```ts
SpecConfig.disableBasePathPrefixSlash
```

***

### entryFile

```ts
entryFile: string;
```

محددة في: [cli/src/api.ts:388](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/api.ts#L388)

***

### host?

```ts
optional host?: string;
```

محددة في: [packages/runtime/src/config.ts:88](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L88)

اسم البلد المضيف Swagger ناتجان على سبيل المثال `localhost:3000`.

#### Inherited from

```ts
SpecConfig.host
```

***

### license?

```ts
optional license?: string;
```

محددة في: [packages/runtime/src/config.ts:158](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L158)

رخصـة الرخصـة المرفـقـة؛ npm حزمة ترخيص عند وجودها

#### Inherited from

```ts
SpecConfig.license
```

***

### name?

```ts
optional name?: string;
```

محددة في: [packages/runtime/src/config.ts:119](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L119)

اسم API؛ التقصير إلى npm الاسم

#### Inherited from

```ts
SpecConfig.name
```

***

### noImplicitAdditionalProperties

```ts
noImplicitAdditionalProperties: "ignore" | "throw-on-extras" | "silently-remove-extras";
```

محددة في: [cli/src/api.ts:389](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/api.ts#L389)

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

#### Inherited from

```ts
SpecConfig.operationIdTemplate
```

***

### outputDirectory

```ts
outputDirectory: string;
```

محددة في: [packages/runtime/src/config.ts:83](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L83)

دليل أين يجب أن يكتب ملف المواصفات

#### Inherited from

```ts
SpecConfig.outputDirectory
```

***

### rootSecurity?

```ts
optional rootSecurity?: Security[];
```

محددة في: [packages/runtime/src/config.ts:232](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L232)

يُطبّقُ أمناً خاطئاً إلى كامل مكتب التحقيقات الفدرالي.
يمكن أن تكون مغمورة `@Security(...)` أو `@NoSecurity()` مصممون على أجهزة التحكم أو الأساليب

#### Inherited from

```ts
SpecConfig.rootSecurity
```

***

### schemes?

```ts
optional schemes?: Protocol[];
```

محددة في: [packages/runtime/src/config.ts:215](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L215)

البروتوكولات الداعمة Swagger ناتجان.

#### Inherited from

```ts
SpecConfig.schemes
```

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

#### Inherited from

```ts
SpecConfig.securityDefinitions
```

***

### servers?

```ts
optional servers?: string[];
```

محددة في: [packages/runtime/src/config.ts:95](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L95)

خادم OpenAPI 3 ناتج

فقط متاحة بنسخة 3 أو 3-1.

#### Inherited from

```ts
SpecConfig.servers
```

***

### spec?

```ts
optional spec?: unknown;
```

محددة في: [packages/runtime/src/config.ts:176](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L176)

اخترقت المواصفات المتولدة
وتتمتع الممتلكات المولدة دائما بالأسبقية على القيم المقدمة هنا.

#### Inherited from

```ts
SpecConfig.spec
```

***

### specFileBaseName?

```ts
optional specFileBaseName?: string;
```

محددة في: [packages/runtime/src/config.ts:102](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L102)

لقب (سواغر) (جيسون) أو (سواغر) يامل

@default: "سواغر"

#### Inherited from

```ts
SpecConfig.specFileBaseName
```

***

### specMerging?

```ts
optional specMerging?: "immediate" | "recursive" | "deepmerge";
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

#### Inherited from

```ts
SpecConfig.specMerging
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

#### Inherited from

```ts
SpecConfig.specVersion
```

***

### tags?

```ts
optional tags?: Tag[];
```

محددة في: [packages/runtime/src/config.ts:209](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L209)

البيانات الوصفية على المستوى الرفيع للمواصفات المتولدة.

#### Inherited from

```ts
SpecConfig.tags
```

***

### termsOfService?

```ts
optional termsOfService?: string;
```

محددة في: [packages/runtime/src/config.ts:130](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L130)

ربط الصفحة التي تصف شروط الخدمة.
يجب أن يكون في شكل URL.

#### Inherited from

```ts
SpecConfig.termsOfService
```

***

### useTitleTagsForInlineObjects?

```ts
optional useTitleTagsForInlineObjects?: boolean;
```

محددة في: [packages/runtime/src/config.ts:226](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L226)

يضاف عناوين للرد الخطي وخصائص الجسم الطلبي لتحسين توليد العملاء.

#### Inherited from

```ts
SpecConfig.useTitleTagsForInlineObjects
```

***

### version?

```ts
optional version?: string;
```

محددة في: [packages/runtime/src/config.ts:105](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L105)

نسخة من نظام المعلومات الإدارية المتكامل؛ التقصير في صيغة الطرد.

#### Inherited from

```ts
SpecConfig.version
```

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

#### Inherited from

```ts
SpecConfig.xEnumVarnames
```

***

### yaml?

```ts
optional yaml?: boolean;
```

محددة في: [packages/runtime/src/config.ts:212](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L212)

يكتب المواصفات المتولدة كـ(يام إل) بدلاً من (جيون)

#### Inherited from

```ts
SpecConfig.yaml
```
