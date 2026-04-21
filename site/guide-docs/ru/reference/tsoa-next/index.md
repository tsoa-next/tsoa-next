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
Произносится так:

OpenAPI- совместимые REST API с использованием TypeScript и Node

[![build status](https://github.com/tsoa-next/tsoa-next/actions/workflows/runTestsOnPush.yml/badge.svg)](https://github.com/tsoa-next/tsoa-next/actions/workflows/runTestsOnPush.yml)
[![npm version](https://img.shields.io/npm/v/tsoa-next/latest)](https://www.npmjs.com/package/tsoa-next)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=tsoa-next_tsoa-next&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=tsoa-next_tsoa-next)

</div>

## История проекта

`tsoa-next` Продолжение оригинала [`tsoa`](https://github.com/lukeautry/tsoa) Проект.
Оригинальный репозиторий и его вкладчики установили стабильную TypeScript- во-первых, OpenAPIПервый фундамент, на котором строится эта работа.
Там, где исторические заметки или ссылки на миграцию все еще указывают вверх по течению, они намеренно хранятся для происхождения.

## Цель

- TypeScript Контроллеры и модели как единственный источник истины для вашего API
- действительный OpenAPI (ранее) Swagger) спецификации 2.0, 3.0 или 3.1 генерируются из ваших контроллеров и моделей, включая:
  - Пути (например, GET/users)
  - Определения, основанные на TypeScript Интерфейсы (модели)
  - Параметры / свойства модели, помеченные как необходимые или необязательные на основе TypeScript (например, моя собственность?): Струна необязательна в OpenAPI спецификация
  - jsDoc поддерживается для описания объектов (большинство других метаданных могут быть выведены из описания объектов). TypeScript типов)
- Маршруты генерируются для промежуточного программного обеспечения выбора
  - Express, Hapiи Koa в настоящее время поддерживается, другие промежуточное программное обеспечение может поддерживаться с помощью простого шаблона ручки
  - Проверка полезной нагрузки

## Философия

- Довериться TypeScript вводить аннотации для создания метаданных API, если это возможно
- Если регулярные аннотации типа не являются подходящим способом выражения метаданных, используйте декораторы.
- Используйте jsdoc для чистых текстовых метаданных (например, описания конечных точек).
- Минимизируйте бульвар
- Модели лучше всего представлены интерфейсами (чистыми структурами данных), но также могут быть представлены классами.
- Проверка времени выполнения tsoa-next должны вести себя как можно ближе к спецификациям, которые OpenAPI Схема описывает. Любые различия в логике валидации проясняются предупреждениями о регистрации во время генерации OpenAPI Спецификация (OAS) и/или маршруты.
  - Обратите внимание, что, позволяя OpenAPI 3,0 или 3,1 вы сводите к минимуму вероятность расхождения валидационной логики, поскольку новые формы схем более выразительны, чем другие. OpenAPI 2.0.

## Список возможностей

- генерировать OpenAPI 2,0, 3,0 или 3,1 документы непосредственно с вашего сайта TypeScript контроллеры, модели и JSDoc комментарии.
- лечить TypeScript контроллеры и модели как источник истины для путей, параметров, схем, примеров, тегов и метаданных безопасности.
- Создание фреймворк-специфических обработчиков маршрутов для Express, Koaи Hapiили поставлять свои собственные Handlebars Шаблоны для пользовательского времени выполнения.
- Проверка ввода запроса во время выполнения с настраиваемым принуждением и обработкой дополнительной собственности, которая остается согласованной с сгенерированной схемой.
- Экспозиция контроллер-локальная спецификация конечных точек с `@SpecPath(...)` без чтения сгенерированного файла спецификации с локального диска во время запроса.
- Обслуживать встроенный `json`, `yaml`, `swagger`, `redoc`и `rapidoc` Специфические цели, с пакетами Docs UI, загружаемыми лениво в качестве дополнительных сверстников, когда они доступны.
- Прикрепить несколько `@SpecPath(...)` Декораторы для того же контроллера, если их пути уникальны.
- Cache-встроенные или пользовательские ответы спецификаций `'none'`, в процессе `'memory'`, или пользовательский обработчик кэша, который может читать из строк или потоков.
- либо вернуть `string` или `Readable` Ответы на заказ `@SpecPath(...)` обработчики для индивидуальной документации или интеграции вниз по течению.
- Использовать `@Validate(...)` делегировать проверку времени выполнения поддерживаемым внешним библиотекам схем, таким как `zod`, `joi`, `yup`, `superstruct`или `io-ts`.
- Настройка перевода валидации и форматирование отказов через дополнительный контекст валидации, принятый сгенерированным `RegisterRoutes(...)` функций.
- Поддержка крючков аутентификации, впрыск зависимости, типизированные альтернативные ответчики, загрузки файлов, пользовательское промежуточное ПО и пользовательские рабочие процессы проверки.
- Используйте `tsoa` CLI для генерации спецификаций и маршрутов или вызова программных API `tsoa-next/cli`.
- Цели современного Node.js релизы с политикой поддержки, проверенной в CI на предыдущих LTS, текущих LTS и Node Далее.

## Быстрый старт

- Требования:
  - Node.js 22 или более
  - npm 10 или более
  - Мы проверяем поддержку по предыдущим LTS, текущим LTS и Node Далее в CI
- [Документация](https://tsoa-next.dev/)
- [Справочник API](https://tsoa-next.dev/reference/)
- [Руководство по быстрому старту](https://tsoa-next.dev/getting-started)

## Состав пакета

- Импортные декораторы, помощники во время выполнения и генерируемая поддержка маршрута `tsoa-next`
- Импорт программных генерирующих API из `tsoa-next/cli`
- Используйте `tsoa` двоичный для CLI Команды поколения

## Примеры

Ознакомьтесь с [руководствами](https://tsoa-next.dev/)

Используйте вспомогательный [репозиторий playground](https://github.com/tsoa-next/playground) для запускаемых примеров приложений и серверных сценариев.

Смотрите примеры контроллеров в [тестах](https://github.com/tsoa-next/tsoa-next/tree/main/tests/fixtures/controllers)

Смотрите примеры моделей в [тестах](https://github.com/tsoa-next/tsoa-next/blob/main/tests/fixtures/testModel.ts)

## Нужна помощь

### Вклад в код

Чтобы внести вклад (через PR), сначала прочитайте [Руководство по участию](https://github.com/tsoa-next/tsoa-next/blob/main/docs/CONTRIBUTING.md)

## Пространства имен

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

## Интерфейсы

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

## Типовые алиазы

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

## Функции

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
