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
Prononcé

OpenAPI- API REST conformes utilisant TypeScript et Node

[![build status](https://github.com/tsoa-next/tsoa-next/actions/workflows/runTestsOnPush.yml/badge.svg)](https://github.com/tsoa-next/tsoa-next/actions/workflows/runTestsOnPush.yml)
[![npm version](https://img.shields.io/npm/v/tsoa-next/latest)](https://www.npmjs.com/package/tsoa-next)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=tsoa-next_tsoa-next&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=tsoa-next_tsoa-next)

</div>

## Origines du projet

`tsoa-next` poursuit l'original [`tsoa`](https://github.com/lukeautry/tsoa) projets.
Le dépôt original et ses contributeurs ont établi la stabilité TypeScript- première et OpenAPI- Première base sur laquelle s'appuie ce travail.
Lorsque les notes de libération historiques ou les références de migration pointent toujours en amont, elles sont conservées intentionnellement pour la provenance.

## Objectif

- TypeScript contrôleurs et modèles comme source unique de vérité pour votre API
- A valable OpenAPI (anciennement Swagger) 2.0, 3.0 ou 3.1 spec est généré à partir de vos contrôleurs et modèles, y compris:
  - Voies (p. ex. GET/users)
  - Définitions fondées sur TypeScript interfaces (modèles)
  - Paramètres/propriétés du modèle marqués comme requis ou facultatifs sur la base TypeScript (par exemple, ma propriété?) chaîne est optionnelle dans la OpenAPI spec)
  - jsDoc supporté pour les descriptions d'objets (la plupart des autres métadonnées peuvent être déduites de TypeScript types)
- Les itinéraires sont générés pour les intergiciels de choix
  - Express, Hapiet Koa actuellement pris en charge, d'autres middleware peuvent être pris en charge en utilisant un modèle de guidon simple
  - Valider les charges utiles

## Philosophie

- Répondez TypeScript saisir des annotations pour générer des métadonnées API si possible
- Si les annotations de type régulier ne sont pas un moyen approprié d'exprimer les métadonnées, utilisez des décorateurs
- Utilisez jsdoc pour les métadonnées en texte pur (par exemple, descriptions des paramètres)
- Minimiser la plaque de chaudière
- Les modèles sont mieux représentés par des interfaces (structures de données pures), mais peuvent aussi être représentés par des classes
- Validation du temps d'exécution tsoa-next devrait se comporter aussi étroitement que possible avec les spécifications que les produits OpenAPI schéma décrit. Toute différence dans la logique de validation est clarifiée par des avertissements de journalisation pendant la génération de la OpenAPI Spécification (OEA) et/ou itinéraires.
  - Veuillez noter qu'en permettant OpenAPI 3.0 ou 3.1 vous minimisez les chances d'une logique de validation divergente puisque les nouvelles formes de schéma sont plus expressives que OpenAPI 2.0.

## Liste des fonctionnalités

- Générer OpenAPI 2.0, 3.0, ou 3.1 documents directement de votre TypeScript contrôleurs, modèles et JSDoc commentaires.
- Traitement TypeScript les contrôleurs et les modèles comme source de vérité pour les chemins, les paramètres, les schémas, les exemples, les balises et les métadonnées de sécurité.
- Générer des gestionnaires de route spécifiques au cadre pour Express, Koaet Hapi, ou de fournir votre propre Handlebars modèles pour les runtimes personnalisés.
- Valider l'entrée de requête au moment de l'exécution avec la contrainte configurable et la manipulation de la propriété supplémentaire qui reste alignée sur le schéma généré.
- Expose les paramètres de contrôle local avec `@SpecPath(...)` sans lire un fichier spec généré à partir du disque local au moment de la demande.
- Servir intégré `json`, `yaml`, `swagger`, `redoc`et `rapidoc` spec cibles, avec des paquets d'interface utilisateur docs chargés paresseusement en tant que pairs optionnels lorsque disponibles.
- Joindre plusieurs `@SpecPath(...)` décorateurs au même contrôleur tant que leurs chemins résolus sont uniques.
- Réponses de spécifications intégrées ou personnalisées avec `'none'`, en cours de fabrication `'memory'`, ou un gestionnaire de cache personnalisé qui peut lire à partir de chaînes ou de flux.
- Retourner soit `string` ou `Readable` réponses personnalisées `@SpecPath(...)` les gestionnaires pour la documentation sur mesure ou les intégrations en aval.
- Utilisation `@Validate(...)` de déléguer la validation de l'exécution aux bibliothèques de schémas externes `zod`, `joi`, `yup`, `superstruct`ou `io-ts`.
- Personnaliser la traduction de validation et le formatage d'échec à travers le contexte de validation optionnel accepté par généré `RegisterRoutes(...)` fonctions.
- Supporter les crochets d'authentification, l'injection de dépendance, les répondeurs alternatifs tapés, les téléchargements de fichiers, les intergiciels personnalisés et les flux de travail de validation personnalisés.
- Utilisez la `tsoa` CLI pour la génération de spec et route, ou appeler les API programmatiques de `tsoa-next/cli`.
- Cible moderne Node.js diffusions avec la politique de soutien vérifiée dans IC dans le précédent SLT, le SLT actuel, et Node Suivant.

## Prise en main

- Exigences:
  - Node.js 22 ou plus récent
  - npm 10 ou plus récent
  - Nous vérifions le support dans le précédent LTS, le LTS actuel, et Node vSuivant dans CI
- [Documentation](https://tsoa-next.dev/)
- [Référence d’API](https://tsoa-next.dev/reference/)
- [Guide de démarrage](https://tsoa-next.dev/getting-started)

## API du package

- Importer des décorateurs, des aides à l'exécution et générer un support de route `tsoa-next`
- Importer des API de génération programmatique à partir `tsoa-next/cli`
- Utilisez la `tsoa` binaire pour CLI commandes de génération

## Exemples

Consultez les [guides](https://tsoa-next.dev/)

Utilisez le [dépôt playground](https://github.com/tsoa-next/playground) compagnon pour des applications d'exemple exécutables et des scénarios orientés serveur.

Consultez des contrôleurs d'exemple dans [les tests](https://github.com/tsoa-next/tsoa-next/tree/main/tests/fixtures/controllers)

Consultez des modèles d'exemple dans [les tests](https://github.com/tsoa-next/tsoa-next/blob/main/tests/fixtures/testModel.ts)

## Aide recherchée

### Contribuer au code

Pour contribuer (via une PR), consultez d'abord le [Guide de contribution](https://github.com/tsoa-next/tsoa-next/blob/main/docs/CONTRIBUTING.md)

## Espaces de noms

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

## Type d'alias

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

## Fonctions

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
