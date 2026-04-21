---
lastUpdated: 2026-04-20T23:51:24.334Z
---
[tsoa-next](../packages.md) / tsoa-next

<!-- This file is generated from README.template.MD by `npm run sync:readmes`. Do not edit directly. -->

<div align="center">
  <a href="https://tsoa-next.dev/" target="_blank" rel="noreferrer">
    <h1>
      <span style="display: inline-flex; align-items: center; gap: 0.35em; white-space: nowrap;">
        <img src="../_media/tsoa-next-logo-590-1.png" alt="tsoa-next logo" height="40" style="height: 1em; width: auto;" />
        <span>tsoa-next</span>
      </span>
    </h1>
  </a>
Pronounced so

OpenAPI- تطبيقات تطبيقية متوافقة مع المعايير TypeScript و Node

[![build status](https://github.com/tsoa-next/tsoa-next/actions/workflows/runTestsOnPush.yml/badge.svg)](https://github.com/tsoa-next/tsoa-next/actions/workflows/runTestsOnPush.yml)
[![npm version](https://img.shields.io/npm/v/tsoa-next/latest)](https://www.npmjs.com/package/tsoa-next)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=tsoa-next_tsoa-next&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=tsoa-next_tsoa-next)

</div>

## نشأة المشروع

`tsoa-next` استمر [`tsoa`](https://github.com/lukeautry/tsoa) مشروع
The original repository and its contributors established the stable TypeScriptأولاً OpenAPI-الأساس الأول لهذا العمل يعتمد عليه
Where historical release notes or migration references still point upstream, they are kept intentionally for provenance.

## الهدف

- TypeScript المتحكمون والنماذج كمصدر واحد للحقيقة
- A valid OpenAPI (سابقا) Swagger20, 3.0, or 3.1 spec is generated from your controllers and models, including:
  - الرياضيات (مثل GET /users)
  - التعاريف القائمة على أساس TypeScript الوصلات البينية (العارضات)
  - البارامترات/الممتلكات النموذجية المميزة حسب الاقتضاء أو الاختيارية على أساس TypeScript (على سبيل المثال، بلدي Property)؟ الخيط اختياري في OpenAPI العينة
  - jsDoc supported for object descriptions (most other metadata can be inferred from TypeScript الأنواع
- تولد الدروب للخيارات المتوسطة
  - Express.. Hapiو Koa ويمكن حالياً دعم الإطارات الوسيطة الأخرى باستخدام نموذج معالج بسيط
  - الحمولات المقيدة

## الفلسفة

- إعادة تشغيل TypeScript نوع الشروح لتوليد البيانات الفوقية للبروتوكول الاختياري إذا أمكن
- إذا كانت الشروح من النوع العادي ليست طريقة مناسبة للتعبير عن البيانات الفوقية، استخدام المصممين
- Use jsdoc for pure text metadata (e.g. endpoint descriptions)
- الحد الأدنى من الغليان
- النماذج هي أفضل طريقة لتمثيلها بالوصلات البينية (هيكل البيانات المشروطة)، ولكن يمكن أيضاً تمثيلها بالصفوف
- التحقق من وقت العمل tsoa-next ينبغي أن تتصرف بأكبر قدر ممكن من الدقة في المواصفات التي تولدت OpenAPI الكيماوي يصف وتوضح أي اختلافات في منطق التصديق بتحذيرات قطع الأشجار أثناء توليد OpenAPI المواصفات و/أو الطرق.
  - يرجى ملاحظة ذلك بتمكينها من ذلك OpenAPI 3-0 أو 3-1 تُقلّل إلى أدنى حدّ من فرص المنطق المتباين في التحقّق بما أنّ الأشكال الكيميائيّة الجديدة أكثر تعبيراً من OpenAPI 2.0

## قائمة الميزات

- الجيل OpenAPI 2.0, 3.0, أو 3.1 وثائق مباشرة من TypeScript المتحكمون، النماذج، JSDoc تعليقات.
- Treat TypeScript المتحكمون والنماذج كمصدر للحقيقة للمسارات والبارامترات والكساءات والأمثلة والعلامات والبيانات الوصفية الأمنية.
- ناقلات طرق محددة لإطار عمل Express.. Koaو Hapiأو إمدادك بنفسك Handlebars نماذج للزمن المعتاد
- (ب) تقديم مدخلات قيمة في الوقت الحاضر مع إكراه قابل للتشكيل ومناولة إضافية للأفضلية تظل متوافقة مع الكيميائي المولد.
- المواصفات النهائية للمراقبين المحليين `@SpecPath(...)` بدون قراءة ملف مطوّر من قرص محلي عند الطلب
- الخدم المبنية `json`.. `yaml`.. `swagger`.. `redoc`و `rapidoc` المواصفات، مع دقّات docs UI محملة بشكل سلس كقران اختياريين عند توافرها.
- Attach multiple `@SpecPath(...)` المصممون لنفس المتحكم طالما أن طرقهم المصممة فريدة
- Cache built in or custom spec responses with `'none'`داخل العملية `'memory'`أو مُعالج مُحتال يُمكن أن يقرأ من الخيوط أو المجرى
- العودة إما `string` أو `Readable` الردود الواردة من العرف `@SpecPath(...)` من يتعاملون مع الوثائق الجاهزة أو عمليات التكامل في المراحل النهائية.
- الاستخدام `@Validate(...)` :: تفويض المصادقة على الوقت المحدد لمكتبات الكيماويات الخارجية المدعومة مثل `zod`.. `joi`.. `yup`.. `superstruct`أو `io-ts`.
- إضفاء الطابع العرفي على ترجمة المصادقة وشكل الفشل من خلال سياق التصديق الاختياري الذي تم قبوله من خلال توليد `RegisterRoutes(...)` الوظائف
- دعم التوثيق، حقنة التبعية، المستجيبين المناوبين المطبوعين، حمولات الملفات، البرمجيات المتوسطة العرفية، تدفقات عمل التثبيت
- استخدام `tsoa` CLI للمواصفات وتوليد الطرق، أو تسمية مؤشرات الأداء البرنامجية من `tsoa-next/cli`.
- الهدف الحديث Node.js الإطلاقات المصحوبة بسياسة الدعم التي تم التحقق منها في مركز التحقيقات الجنائية عبر النظام التجاري الدولي السابق، وهو النظام الحالي للمواصلات السلكية واللاسلكية، Node vNext.

## البدء

- الاحتياجات:
  - Node.js 22 أو جديد
  - npm 10 أو أكثر
  - نحن نتحقق من الدعم في جميع أنحاء LTS السابقة، و LTS الحالية، و Node vNext in CI
- [الوثائق](https://tsoa-next.dev/)
- [مرجع API](https://tsoa-next.dev/reference/)
- [دليل البدء](https://tsoa-next.dev/getting-started)

## واجهة الحزمة

- مدخرات للواردات، ومساعدات لمدد زمنية محددة، وولدت الدعم من الطرق `tsoa-next`
- برامجيات الاستيراد `tsoa-next/cli`
- استخدام `tsoa` ثنائية CLI أوامر الجيل

## أمثلة

اطّلع على [الأدلة](https://tsoa-next.dev/)

استخدم [مستودع playground](https://github.com/tsoa-next/playground) المرافق للحصول على تطبيقات أمثلة قابلة للتشغيل وسيناريوهات تركّز على الخادم.

اطّلع على أمثلة المتحكمات في [الاختبارات](https://github.com/tsoa-next/tsoa-next/tree/main/tests/fixtures/controllers)

اطّلع على أمثلة النماذج في [الاختبارات](https://github.com/tsoa-next/tsoa-next/blob/main/tests/fixtures/testModel.ts)

## نحتاج إلى المساعدة

### المساهمة في الكود

للمساهمة (عبر طلب سحب PR)، يرجى الاطلاع أولاً على [دليل المساهمة](https://github.com/tsoa-next/tsoa-next/blob/main/docs/CONTRIBUTING.md)

## أماكن الاسم

- [Swagger](namespaces/Swagger/index.md)
- [Tsoa](namespaces/Tsoa/index.md)
- [TsoaRoute](namespaces/TsoaRoute/index.md)

## Classes

- [Controller](classes/Controller.md)
- [ExpressTemplateService](classes/ExpressTemplateService.md)
- [HapiTemplateService](classes/HapiTemplateService.md)
- [KoaTemplateService](classes/KoaTemplateService.md)
- [TemplateService](classes/TemplateService.md)
- [ValidateError](classes/ValidateError.md)
- [ValidationService](classes/ValidationService.md)

## الجوانب

- [AdditionalProps](interfaces/AdditionalProps.md)
- [ArrayValidator](interfaces/ArrayValidator.md)
- [BooleanValidator](interfaces/BooleanValidator.md)
- [Config](interfaces/Config.md)
- [DateTimeValidator](interfaces/DateTimeValidator.md)
- [DateValidator](interfaces/DateValidator.md)
- [EmbeddedSpecGeneratorArtifacts](interfaces/EmbeddedSpecGeneratorArtifacts.md)
- [Exception](interfaces/Exception.md)
- [FieldErrors](interfaces/FieldErrors.md)
- [File](interfaces/File.md)
- [FloatValidator](interfaces/FloatValidator.md)
- [IntegerValidator](interfaces/IntegerValidator.md)
- [IocContainer](interfaces/IocContainer.md)
- [ParameterValidationMetadata](interfaces/ParameterValidationMetadata.md)
- [ResolvedSpecResponse](interfaces/ResolvedSpecResponse.md)
- [RoutesConfig](interfaces/RoutesConfig.md)
- [RuntimeSchemaAdapter](interfaces/RuntimeSchemaAdapter.md)
- [RuntimeSpecConfigSnapshot](interfaces/RuntimeSpecConfigSnapshot.md)
- [SpecCacheContext](interfaces/SpecCacheContext.md)
- [SpecCacheHandler](interfaces/SpecCacheHandler.md)
- [SpecConfig](interfaces/SpecConfig.md)
- [SpecGenerator](interfaces/SpecGenerator.md)
- [SpecPathDefinition](interfaces/SpecPathDefinition.md)
- [SpecPathOptions](interfaces/SpecPathOptions.md)
- [SpecRequestContext](interfaces/SpecRequestContext.md)
- [StringValidator](interfaces/StringValidator.md)

## نوع الياز

- [BuiltinSpecPathTarget](type-aliases/BuiltinSpecPathTarget.md)
- [~~DeprecatedOptionForAdditionalPropertiesHandling~~](type-aliases/DeprecatedOptionForAdditionalPropertiesHandling.md)
- [ExtensionType](type-aliases/ExtensionType.md)
- [HttpStatusCodeLiteral](type-aliases/HttpStatusCodeLiteral.md)
- [HttpStatusCodeStringLiteral](type-aliases/HttpStatusCodeStringLiteral.md)
- [IocContainerFactory](type-aliases/IocContainerFactory.md)
- [Newable](type-aliases/Newable.md)
- [OtherValidOpenApiHttpStatusCode](type-aliases/OtherValidOpenApiHttpStatusCode.md)
- [RuntimeSchemaAdapterResult](type-aliases/RuntimeSchemaAdapterResult.md)
- [ServedSpec](type-aliases/ServedSpec.md)
- [ServiceIdentifier](type-aliases/ServiceIdentifier.md)
- [SpecDocumentFormat](type-aliases/SpecDocumentFormat.md)
- [SpecPathCache](type-aliases/SpecPathCache.md)
- [SpecPathGate](type-aliases/SpecPathGate.md)
- [SpecPathGateHandler](type-aliases/SpecPathGateHandler.md)
- [SpecPathTarget](type-aliases/SpecPathTarget.md)
- [SpecResponseHandler](type-aliases/SpecResponseHandler.md)
- [SpecResponseValue](type-aliases/SpecResponseValue.md)
- [SpecRuntime](type-aliases/SpecRuntime.md)
- [TsoaResponse](type-aliases/TsoaResponse.md)
- [Validator](type-aliases/Validator.md)

## الوظائف

- [assertNever](functions/assertNever.md)
- [Body](functions/Body.md)
- [BodyProp](functions/BodyProp.md)
- [Consumes](functions/Consumes.md)
- [createEmbeddedSpecGenerator](functions/createEmbeddedSpecGenerator.md)
- [createOpenApiSpecGenerator](functions/createOpenApiSpecGenerator.md)
- [Delete](functions/Delete.md)
- [Deprecated](functions/Deprecated.md)
- [describeSpecPath](functions/describeSpecPath.md)
- [Example](functions/Example.md)
- [Extension](functions/Extension.md)
- [fetchMiddlewares](functions/fetchMiddlewares.md)
- [fetchSpecPaths](functions/fetchSpecPaths.md)
- [FormField](functions/FormField.md)
- [Get](functions/Get.md)
- [getParameterExternalValidatorMetadata](functions/getParameterExternalValidatorMetadata.md)
- [Head](functions/Head.md)
- [Header](functions/Header.md)
- [Hidden](functions/Hidden.md)
- [Inject](functions/Inject.md)
- [isDefaultForAdditionalPropertiesAllowed](functions/isDefaultForAdditionalPropertiesAllowed.md)
- [Middlewares](functions/Middlewares.md)
- [normalisePath](functions/normalisePath.md)
- [NoSecurity](functions/NoSecurity.md)
- [OperationId](functions/OperationId.md)
- [Options](functions/Options.md)
- [Patch](functions/Patch.md)
- [Path](functions/Path.md)
- [Post](functions/Post.md)
- [Produces](functions/Produces.md)
- [Put](functions/Put.md)
- [Queries](functions/Queries.md)
- [Query](functions/Query.md)
- [Request](functions/Request.md)
- [RequestProp](functions/RequestProp.md)
- [Res](functions/Res.md)
- [resolveSpecPathResponse](functions/resolveSpecPathResponse.md)
- [Response](functions/Response.md)
- [Route](functions/Route.md)
- [Security](functions/Security.md)
- [SpecPath](functions/SpecPath.md)
- [SuccessResponse](functions/SuccessResponse.md)
- [Tags](functions/Tags.md)
- [UploadedFile](functions/UploadedFile.md)
- [UploadedFiles](functions/UploadedFiles.md)
- [Validate](functions/Validate.md)
- [validateExternalSchema](functions/validateExternalSchema.md)
- [ValidateParam](functions/ValidateParam.md)
