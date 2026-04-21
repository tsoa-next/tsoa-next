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
ऐसा प्रतीत होता है

OpenAPIREST एपीआई TypeScript और Node

[![build status](https://github.com/tsoa-next/tsoa-next/actions/workflows/runTestsOnPush.yml/badge.svg)](https://github.com/tsoa-next/tsoa-next/actions/workflows/runTestsOnPush.yml)
[![npm version](https://img.shields.io/npm/v/tsoa-next/latest)](https://www.npmjs.com/package/tsoa-next)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=tsoa-next_tsoa-next&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=tsoa-next_tsoa-next)

</div>

## परियोजना की पृष्ठभूमि

`tsoa-next` मूल जारी [`tsoa`](https://github.com/lukeautry/tsoa) परियोजना
मूल भंडार और इसके योगदानकर्ताओं ने स्थिर स्थापित किया TypeScriptसबसे पहले और OpenAPI-पहली नींव इस काम पर बना हुआ है।
जहां ऐतिहासिक रिलीज नोट्स या माइग्रेशन संदर्भ अभी भी अपस्ट्रीम इंगित करते हैं, उन्हें जानबूझकर साबित होने के लिए रखा जाता है।

## लक्ष्य

- TypeScript अपने एपीआई के लिए सत्य के एकल स्रोत के रूप में नियंत्रक और मॉडल
- मान्य OpenAPI (formerly) Swagger2.0, 3.0, या 3.1 spec आपके नियंत्रकों और मॉडलों से उत्पन्न होता है, जिनमें शामिल हैं:
  - पथ (उदाहरण के लिए गेट / उपयोगकर्ता)
  - परिभाषाओं पर आधारित TypeScript इंटरफेस (मॉडल)
  - पैरामीटर / मॉडल गुण आवश्यकतानुसार या वैकल्पिक के आधार पर चिह्नित TypeScript (जैसे myProperty) स्ट्रिंग में वैकल्पिक है OpenAPI कल्पना)
  - ऑब्जेक्ट विवरण के लिए समर्थित jsDoc (अधिकांश अन्य मेटाडाटा से प्रभावित किया जा सकता है) TypeScript प्रकार)
- विकल्प के मध्यवेयर के लिए रूट उत्पन्न होते हैं
  - Express, Hapi, और Koa वर्तमान में समर्थित, अन्य मिडलवेयर को एक सरल हैंडलबार टेम्पलेट का उपयोग करके समर्थित किया जा सकता है
  - मान्य अनुरोध पेलोड

## दर्शन

- पर भरोसा TypeScript यदि संभव हो तो एपीआई मेटाडाटा उत्पन्न करने के लिए टाइप एनोटेशन
- यदि नियमित प्रकार के एनोटेशन मेटाडाटा को व्यक्त करने का उचित तरीका नहीं है, तो डेकोरेटर का उपयोग करें
- शुद्ध पाठ मेटाडाटा (उदाहरण के लिए समापन बिंदु विवरण) के लिए jsdoc का उपयोग करें
- बॉयलरप्लेट को छोटा करें
- मॉडल इंटरफेस (शुद्ध डेटा संरचनाओं) द्वारा सबसे अच्छा प्रतिनिधित्व किया जाता है, लेकिन यह भी वर्गों द्वारा प्रतिनिधित्व किया जा सकता है
- रनटाइम वैधता tsoa-next जितना संभव हो सके उतना ही व्यवहार करना चाहिए OpenAPI स्कीमा वर्णन करता है। सत्यापन तर्क में किसी भी अंतर को लॉगिंग चेतावनी द्वारा स्पष्ट किया जाता है, जिसके दौरान OpenAPI विशिष्टता (ओएएस) और/या मार्ग।
  - कृपया ध्यान दें कि सक्षम करके OpenAPI 3.0 या 3.1 आप विचलन सत्यापन तर्क की संभावनाओं को कम करते हैं क्योंकि नए स्कीमा आकार अधिक स्पष्ट हैं OpenAPI 2.0।

## सुविधाओं की सूची

- उत्पन्न करना OpenAPI सीधे अपने से 2.0, 3.0 या 3.1 दस्तावेज़ TypeScript नियंत्रक, मॉडल और JSDoc टिप्पणी।
- इलाज TypeScript पथ, पैरामीटर, स्कीमा, उदाहरण, टैग और सुरक्षा मेटाडाटा के लिए सत्य के स्रोत के रूप में नियंत्रक और मॉडल।
- फ्रेमवर्क-विशिष्ट मार्ग हैंडलर उत्पन्न करने के लिए Express, Koa, और Hapi, या अपने आप की आपूर्ति Handlebars कस्टम रनटाइम्स के लिए टेम्पलेट।
- कॉन्फ़िगर करने योग्य coercion और अतिरिक्त-property हैंडलिंग के साथ रनटाइम पर अनुरोध इनपुट को मान्य करें जो उत्पन्न स्कीमा के साथ संरेखित रहता है।
- एक्सपोजर कंट्रोलर-लोकल स्पेक एंडपॉइंट्स के साथ `@SpecPath(...)` अनुरोध समय पर स्थानीय डिस्क से उत्पन्न स्पेक फ़ाइल को पढ़ने के बिना।
- सेवा में निर्मित `json`, `yaml`, `swagger`, `redoc`, और `rapidoc` कल्पना लक्ष्य, डॉक्स यूआई पैकेज के साथ उपलब्ध होने पर लाज़ीली को वैकल्पिक साथियों के रूप में लोड किया गया।
- एकाधिक संलग्न करें `@SpecPath(...)` जब तक उनके हल पथ अद्वितीय हैं तब तक एक ही नियंत्रक के लिए सजावटकर्ता।
- कैश में निर्मित या कस्टम स्पेक प्रतिक्रियाओं के साथ `'none'`, इन-प्रोसेस `'memory'`, या एक कस्टम कैश हैंडलर जो स्ट्रिंग्स या स्ट्रीम्स से पढ़ सकते हैं।
- वापसी `string` या `Readable` कस्टम से जवाब `@SpecPath(...)` बेस्पोक प्रलेखन या डाउनस्ट्रीम एकीकरण के लिए हैंडलर।
- उपयोग `@Validate(...)` बाहरी स्कीमा पुस्तकालयों जैसे समर्थित रनटाइम सत्यापन को प्रतिनिधि करने के लिए `zod`, `joi`, `yup`, `superstruct`या `io-ts`।
- उत्पन्न द्वारा स्वीकार किए गए वैकल्पिक सत्यापन संदर्भ के माध्यम से सत्यापन अनुवाद और विफलता स्वरूपण को अनुकूलित करें `RegisterRoutes(...)` कार्य।
- समर्थन प्रमाणीकरण हुक, निर्भरता इंजेक्शन, टाइपिंग वैकल्पिक उत्तरदाताओं, फ़ाइल अपलोड, कस्टम मिडलवेयर, और कस्टम सत्यापन कार्यप्रवाह।
- उपयोग `tsoa` CLI कल्पना और मार्ग पीढ़ी के लिए, या प्रोग्रामेटिक एपीआई को प्रोग्रामेटिक एपीआई से कॉल करें `tsoa-next/cli`।
- लक्ष्य आधुनिक Node.js पिछले एलटीएस, वर्तमान एलटीएस में सीआई में सत्यापित समर्थन नीति के साथ जारी Node v next.

## शुरुआत करें

- आवश्यकता:
  - Node.js 22 या नया
  - npm 10 या नया
  - हम पिछले LTS, वर्तमान LTS, और Node CI में आगे
- [दस्तावेज़](https://tsoa-next.dev/)
- [API संदर्भ](https://tsoa-next.dev/reference/)
- [शुरुआत करने की मार्गदर्शिका](https://tsoa-next.dev/getting-started)

## पैकेज API

- आयात सजावटकर्ता, रनटाइम सहायक, और उत्पन्न मार्ग समर्थन से `tsoa-next`
- से प्रोग्रामेटिक पीढ़ी एपीआई आयात करें `tsoa-next/cli`
- उपयोग `tsoa` के लिए द्विआधारी CLI पीढ़ी के आदेश

## उदाहरण

[मार्गदर्शिकाएँ](https://tsoa-next.dev/) देखें

चलाने योग्य उदाहरण ऐप्स और सर्वर-केंद्रित परिदृश्यों के लिए सहायक [playground रिपॉज़िटरी](https://github.com/tsoa-next/playground) का उपयोग करें।

उदाहरण नियंत्रक [परीक्षण](https://github.com/tsoa-next/tsoa-next/tree/main/tests/fixtures/controllers) में देखें

उदाहरण मॉडल [परीक्षण](https://github.com/tsoa-next/tsoa-next/blob/main/tests/fixtures/testModel.ts) में देखें

## मदद चाहिए

### कोड में योगदान

योगदान करने के लिए (PR के माध्यम से), पहले [योगदान मार्गदर्शिका](https://github.com/tsoa-next/tsoa-next/blob/main/docs/CONTRIBUTING.md) देखें

## Namespace

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

## इंटरफेस

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

## प्रकार उपनाम

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

## कार्य

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
