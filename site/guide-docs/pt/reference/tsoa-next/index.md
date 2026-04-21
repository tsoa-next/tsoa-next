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
Pronunciado

OpenAPI- APIs REST compatíveis usando TypeScript e Node

[![build status](https://github.com/tsoa-next/tsoa-next/actions/workflows/runTestsOnPush.yml/badge.svg)](https://github.com/tsoa-next/tsoa-next/actions/workflows/runTestsOnPush.yml)
[![npm version](https://img.shields.io/npm/v/tsoa-next/latest)](https://www.npmjs.com/package/tsoa-next)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=tsoa-next_tsoa-next&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=tsoa-next_tsoa-next)

</div>

## Histórico do projeto

`tsoa-next` continua o original [`tsoa`](https://github.com/lukeautry/tsoa) projecto.
O repositório original e seus contribuidores estabeleceram o stable TypeScript- Primeiro e OpenAPI- a primeira fundação que este trabalho baseia.
Quando as notas de lançamento histórico ou as referências de migração ainda apontam para a montante, são mantidas intencionalmente para proveniência.

## Objetivo

- TypeScript controladores e modelos como a única fonte de verdade para sua API
- Uma validade OpenAPI (anteriormente Swagger) 2.0, 3.0, ou 3.1 especificações são geradas a partir de seus controladores e modelos, incluindo:
  - Caminhos (por exemplo, GET/usuários)
  - Definições baseadas em TypeScript interfaces (modelos)
  - Parâmetros/propriedades do modelo marcadas como necessárias ou opcionais com base em TypeScript (por exemplo, a minha propriedade? string é opcional na OpenAPI espec)
  - jsDoc suportada para descrições de objetos (a maioria dos outros metadados pode ser inferida a partir de TypeScript tipos)
- Rotas são geradas para middleware de escolha
  - Express, Hapi, e Koa atualmente suportado, outro middleware pode ser suportado usando um modelo de guidão simples
  - Validar as cargas de pedido

## Filosofia

- Confiar TypeScript digitar anotações para gerar metadados da API, se possível
- Se as anotações de tipo regular não são uma maneira apropriada de expressar metadados, use decoradores
- Usar o jsdoc para metadados de texto puro (por exemplo, descrições de endpoint)
- Minimizar placa de caldeira
- Os modelos são melhor representados por interfaces (estruturas de dados puras), mas também podem ser representados por classes
- Validação em tempo de execução tsoa-next deve comportar-se o mais próximo possível das especificações geradas OpenAPI esquema descreve. Quaisquer diferenças na lógica de validação são clarificadas por avisos de registo durante a geração do OpenAPI Especificações (OAS) e/ou rotas.
  - Por favor, note que habilitando OpenAPI 3.0 ou 3.1 você minimiza as chances de lógica de validação divergente, uma vez que as formas de esquema mais recentes são mais expressivas do que OpenAPI 2.0.

## Lista de recursos

- Gerar OpenAPI 2.0, 3.0, ou 3.1 documentos diretamente de seu TypeScript controladores, modelos e JSDoc comentários.
- Tratamento TypeScript controladores e modelos como fonte de verdade para caminhos, parâmetros, esquemas, exemplos, tags e metadados de segurança.
- Gerar manipuladores de rota específicos de framework para Express, Koa, e Hapi, ou fornecer o seu próprio Handlebars modelos para tempos de execução personalizados.
- Validar entrada de solicitação em tempo de execução com coerção configurável e manipulação de propriedade adicional que permanece alinhada com o esquema gerado.
- Expor endpoints de especificações locais do controlador com `@SpecPath(...)` sem ler um arquivo específico gerado a partir do disco local no momento da solicitação.
- Servir incorporado `json`, `yaml`, `swagger`, `redoc`, e `rapidoc` spec targets, com os pacotes docs UI carregados vagamente como pares opcionais quando disponíveis.
- Anexar múltiplos `@SpecPath(...)` Decoradores do mesmo controlador, desde que seus caminhos resolvidos sejam únicos.
- Respostas de cache integradas ou personalizadas com `'none'`, em processo `'memory'`, ou um manipulador de cache personalizado que pode ler a partir de strings ou streams.
- Devolver `string` ou `Readable` respostas personalizadas `@SpecPath(...)` manipuladores para documentação sob medida ou integrações a jusante.
- Utilização `@Validate(...)` para delegar validação em tempo de execução em bibliotecas de esquema externas suportadas, como `zod`, `joi`, `yup`, `superstruct`, ou `io-ts`.
- Personalizar tradução de validação e formatação de falhas através do contexto opcional de validação aceito pelo gerado `RegisterRoutes(...)` funções.
- Suporte ganchos de autenticação, injeção de dependência, respondedores alternativos digitados, uploads de arquivos, middleware personalizado e fluxos de trabalho de validação personalizados.
- Utilizar o `tsoa` CLI para geração de especificações e rotas, ou chamar as APIs programáticas de `tsoa-next/cli`.
- Alvo moderno Node.js releases com a política de suporte verificada em CI através do LTS anterior, LTS atual, e Node VNext.

## Primeiros passos

- Requisitos:
  - Node.js 22 ou mais recente
  - npm 10 ou mais recente
  - Verificamos o suporte através do LTS anterior, LTS atual, e Node vPróximo em IC
- [Documentação](https://tsoa-next.dev/)
- [Referência da API](https://tsoa-next.dev/reference/)
- [Guia de primeiros passos](https://tsoa-next.dev/getting-started)

## API do pacote

- Importar decoradores, ajudantes em tempo de execução e gerar suporte a rotas `tsoa-next`
- Importar APIs de geração programática de `tsoa-next/cli`
- Utilizar o `tsoa` binário para CLI comandos de geração

## Exemplos

Confira os [guias](https://tsoa-next.dev/)

Use o [repositório playground](https://github.com/tsoa-next/playground) complementar para aplicações de exemplo executáveis e cenários voltados ao servidor.

Veja controladores de exemplo nos [testes](https://github.com/tsoa-next/tsoa-next/tree/main/tests/fixtures/controllers)

Veja modelos de exemplo nos [testes](https://github.com/tsoa-next/tsoa-next/blob/main/tests/fixtures/testModel.ts)

## Ajuda necessária

### Contribuindo com código

Para contribuir (por meio de um PR), consulte primeiro o [Guia de contribuição](https://github.com/tsoa-next/tsoa-next/blob/main/docs/CONTRIBUTING.md)

## Espaços de nomes

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

## Interfaces

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

## Apelidos de tipo

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

## Funções

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
