---
lastUpdated: 2026-04-20T21:59:41.368Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/cli](../index.md) / Config

# Interface: Config

محددة في: [packages/runtime/src/config.ts:5](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L5)

Root tsoa-next التشكيلة التي استهلكها CLI ومولدات برنامجية.

## الممتلكات

### compilerOptions?

```ts
optional compilerOptions?: Record<string, unknown>;
```

محددة في: [packages/runtime/src/config.ts:47](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L47)

TypeScript CompilerOptions to be used during generation.
هذه مدمجة على خيارات المجمّع التي تم حلّها من (تيسكريغ).

***

### controllerPathGlobs?

```ts
optional controllerPathGlobs?: string[];
```

محددة في: [packages/runtime/src/config.ts:29](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L29)

مجموعة من مجادلات الطريق التي تشير إلى متحكمي طرقك tsoa تشمل.

***

### defaultNumberType?

```ts
optional defaultNumberType?: "double" | "float" | "integer" | "long";
```

محددة في: [packages/runtime/src/config.ts:68](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L68)

OpenAPI عدد أنواع الاستخدام TypeScript `number` عندما لا يكون هناك شروح أضيق

#### Default

```ts
double
```

***

### entryFile

```ts
entryFile: string;
```

محددة في: [packages/runtime/src/config.ts:24](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L24)

نقطة الدخول إلى مكتبك

***

### ignore?

```ts
optional ignore?: string[];
```

محددة في: [packages/runtime/src/config.ts:19](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L19)

أدلة لتجاهلها TypeScript مسح البيانات الوصفية

***

### ~~مطلقات؟

```ts
optional multerOpts?: Options;
```

محددة في: [packages/runtime/src/config.ts:62](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L62)

وخيارات الملاجئ الجامدة المتجهة إلى المنتصف المولد
The `storage` والخيار غير مدعم.

#### Example

```ts
{
     *   "dest": "/tmp"
     * } Allows multer to write files to disk instead of keeping them in memory.
```

#### Deprecated

Since v6.4.0, `RegisterRoutes` يمكن الحصول عليها `multerOptions` مباشرة
 وسيُحذف هذا الخيار على مستوى المؤتمرات في إطلاق سراحه في المستقبل.
 (https://github.com/tsoa-next/tsoa-next/issues/1587#issuecomment-2391291433)
 (https://github.com/tsoa-next/tsoa-next/pull/1638)

***

### noImplicitAdditionalProperties?

```ts
optional noImplicitAdditionalProperties?: "ignore" | "throw-on-extras" | "silently-remove-extras";
```

محددة في: [packages/runtime/src/config.ts:34](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L34)

طرق تسمح لكِ بمنع بيانات المدخلات من الدخول في سجلك هذا سيوثق قرارك في المسبح و سوف يتحول إلى التثبت من قيمة زائدة في طريقك

***

### routes

```ts
routes: RoutesConfig;
```

محددة في: [packages/runtime/src/config.ts:14](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L14)

تشكيلة توليد الطريق.

***

### spec

```ts
spec: SpecConfig;
```

محددة في: [packages/runtime/src/config.ts:9](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L9)

OpenAPI تشكيلة الجيل

***

### tsconfig?

```ts
optional tsconfig?: string;
```

محددة في: [packages/runtime/src/config.ts:41](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L41)

واستخدم الطريق إلى ملف تسويقي كمصدر مدخلات لخيارات تجميع البيانات خلال الجيل.
إذا أُغفل tsoa-next سيبحث عن (إسبيج جونسون) بدءاً من الحمولة tsoa دليل الثقة.
Explicit compilationrOptions in tsoa-next لا يزال الثقب له الأسبقية على القيم الغامضة
