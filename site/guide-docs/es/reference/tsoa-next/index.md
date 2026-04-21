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
Pronunciado así·uh

OpenAPI- compatible con REST APIs TypeScript y Node

[![build status](https://github.com/tsoa-next/tsoa-next/actions/workflows/runTestsOnPush.yml/badge.svg)](https://github.com/tsoa-next/tsoa-next/actions/workflows/runTestsOnPush.yml)
[![npm version](https://img.shields.io/npm/v/tsoa-next/latest)](https://www.npmjs.com/package/tsoa-next)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=tsoa-next_tsoa-next&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=tsoa-next_tsoa-next)

</div>

## Origen del proyecto

`tsoa-next` continúa el original [`tsoa`](https://github.com/lukeautry/tsoa) proyecto.
El repositorio original y sus colaboradores establecieron el establo TypeScript- primero y OpenAPI- la primera base en la que se basa este trabajo.
Cuando las notas de liberación histórica o referencias migratorias todavía apuntan hacia arriba, se mantienen intencionalmente para la procedencia.

## Objetivo

- TypeScript controladores y modelos como la única fuente de verdad para su API
- Una válida OpenAPI (antes Swagger) 2.0, 3.0 o 3.1 espectro se genera de sus controladores y modelos, incluyendo:
  - Caminos (por ejemplo: Obtener /usuarios)
  - Definiciones basadas en TypeScript interfaces (modelos)
  - Parámetros y propiedades modelo marcadas según sea requerido o opcionalmente TypeScript (e.g. myProperty?: la cadena es opcional en OpenAPI e)
  - jsDoc compatible con descripciones de objetos (la mayoría de otros metadatos pueden ser inferidos de TypeScript tipos)
- Las rutas se generan para el middleware de elección
  - Express, Hapi, y Koa actualmente compatible, otro middleware puede ser soportado usando una plantilla de manillar simple
  - Pagos de solicitud de validación

## Filosofía

- Rely on TypeScript anotaciones de tipo para generar metadatos API si es posible
- Si las anotaciones de tipo regular no son una forma adecuada de expresar metadatos, use decoradores
- Utilice jsdoc para metadatos de texto puro (por ejemplo, descripciones de puntos finales)
- Minimizar la caldera
- Los modelos están mejor representados por interfaces (estructuras de datos puras), pero también pueden ser representados por clases
- Validación del tiempo de ejecución tsoa-next debe comportarse lo más cerca posible a las especificaciones que el generado OpenAPI schema describe. Cualquier diferencia en la lógica de validación se aclara mediante advertencias de registro durante la generación de la OpenAPI Especificación (OEA) y/o rutas.
  - Tenga en cuenta que ha permitido OpenAPI 3.0 o 3.1 minimizas las posibilidades de la lógica de validación divergente ya que las formas de esquema más nuevas son más expresivas que OpenAPI 2.0.

## Lista de características

- Generar OpenAPI 2.0, 3.0 o 3.1 documentos directamente desde su TypeScript controladores, modelos y JSDoc comentarios.
- Treat TypeScript controladores y modelos como fuente de verdad para caminos, parámetros, esquemas, ejemplos, etiquetas y metadatos de seguridad.
- Generar controladores de ruta específicos para marco Express, Koa, y Hapi, o suministrar su propio Handlebars plantillas para tiempos de ejecución personalizados.
- Validar la entrada de solicitud en tiempo de ejecución con coacción configurable y manejo adicional-propiedad que permanece alineado con el esquema generado.
- Expose controlador-local spec endpoints with `@SpecPath(...)` sin leer un archivo de espectro generado del disco local a la hora de solicitud.
- Servir incorporado `json`, `yaml`, `swagger`, `redoc`, y `rapidoc` objetivos de especificaciones, con los paquetes de IU de docs cargados perezosamente como pares opcionales cuando está disponible.
- Adjuntar múltiples `@SpecPath(...)` decoradores al mismo controlador siempre y cuando sus caminos resueltos sean únicos.
- Cache respuestas de espectro incorporadas o personalizadas con `'none'`, en proceso `'memory'`, o un manejador de caché personalizado que puede leer de cadenas o arroyos.
- Vuelva o `string` o `Readable` respuestas de las `@SpecPath(...)` manipuladores para la documentación a medida o integraciones aguas abajo.
- Uso `@Validate(...)` para delegar la validación de plazos de ejecución para apoyar bibliotecas de esquemas externos tales como `zod`, `joi`, `yup`, `superstruct`o `io-ts`.
- Personalizar la traducción de validación y el formato de fallo mediante el contexto de validación opcional aceptado por generado `RegisterRoutes(...)` funciones.
- Soporta ganchos de autenticación, inyección de dependencia, equipos de respuesta alternativos, cargas de archivos, middleware personalizado y flujos de trabajo de validación personalizada.
- Usar el `tsoa` CLI para la generación de espectros y rutas, o llame a las APIs programáticas de `tsoa-next/cli`.
- Objetivo moderno Node.js liberaciones con la política de apoyo verificada en CI en los LTS anteriores, LTS actual y Node VNext.

## Primeros pasos

- Requisitos:
  - Node.js 22 o más
  - npm 10 o más
  - Verificamos el soporte en los LTS anteriores, LTS actual y Node vSiguiente en CI
- [Documentación](https://tsoa-next.dev/)
- [Referencia de API](https://tsoa-next.dev/reference/)
- [Guía de inicio](https://tsoa-next.dev/getting-started)

## API del paquete

- Decoradores de importación, ayudantes de ejecución y soporte de ruta generados por `tsoa-next`
- Importar API de generación programática de `tsoa-next/cli`
- Usar el `tsoa` binario para CLI comandos de generación

## Ejemplos

Echa un vistazo a las [guías](https://tsoa-next.dev/)

Usa el [repositorio de playground](https://github.com/tsoa-next/playground) complementario para aplicaciones de ejemplo ejecutables y escenarios centrados en el servidor.

Consulta controladores de ejemplo en [las pruebas](https://github.com/tsoa-next/tsoa-next/tree/main/tests/fixtures/controllers)

Consulta modelos de ejemplo en [las pruebas](https://github.com/tsoa-next/tsoa-next/blob/main/tests/fixtures/testModel.ts)

## Se busca ayuda

### Contribuir código

Para contribuir (mediante un PR), consulta primero la [Guía de contribución](https://github.com/tsoa-next/tsoa-next/blob/main/docs/CONTRIBUTING.md)

## Espacios de nombre

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

## Tipo Aliases

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

## Funciones

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
