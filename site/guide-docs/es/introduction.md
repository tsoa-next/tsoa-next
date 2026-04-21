---
lastUpdated: 2026-03-29T16:47:44.960Z
---
# Introducción

`tsoa-next` es la continuación del original [`tsoa`](https://github.com/lukeautry/tsoa) proyecto, basado en la fundación estable establecida allí por Luke Autry y colaboradores.
Es un marco integrado OpenAPI compilador para construir Node.js aplicaciones basadas en servidor TypeScript.
Puede dirigirse a marcos expresos, hapi, koa y más a tiempo de ejecución.
`tsoa-next` Las aplicaciones son seguras de tipo por defecto y manejan la validación de tiempo de ejecución sin problemas.

En las guías siguientes, `tsoa` generalmente se refiere a CLI comando y arquitectura subyacente que `tsoa-next` Continúa.

## Objetivo

- TypeScript controladores y modelos como la única fuente de verdad para su API
- Una válida OpenAPI (antes Swagger) spec (2.0 o 3.0) se genera a partir de sus controladores y modelos, incluyendo:
  - Caminos (por ejemplo, Obtener /Usuarios)
  - Definiciones basadas en TypeScript interfaces (modelos)
  - Parámetros y propiedades modelo marcadas según sea requerido o opcionalmente TypeScript (e.g. myProperty?: la cadena es opcional en OpenAPI e)
  - jsDoc compatible con descripciones de objetos (la mayoría de otros metadatos pueden ser inferidos de TypeScript tipos)
- Las rutas se generan para el middleware de elección
  - Express, Hapi, y Koa actualmente compatible, otro middleware puede ser soportado usando una plantilla de manillar simple
  - Validación de tiempo de ejecución sin límites

## Filosofía

- Rely on TypeScript anotaciones de tipo para generar metadatos API si es posible
- Si las anotaciones de tipo regular no son una forma adecuada de expresar metadatos, use decoradores
- Utilice jsdoc para metadatos de texto puro (por ejemplo, descripciones de puntos finales)
- Minimizar la caldera
- Los modelos están mejor representados por interfaces (estructuras de datos puras), pero también pueden ser representados por clases
- Validación del tiempo de ejecución `tsoa-next` debe comportarse lo más cerca posible a las especificaciones que el generado OpenAPI 2/3 esquema describe. Cualquier diferencia en la lógica de validación se aclara mediante advertencias de registro durante la generación de la OpenAPI Especificación (OEA) y/o rutas.
  - Tenga en cuenta que ha permitido OpenAPI 3 minimizas las posibilidades de lógica de validación divergente desde OpenAPI 3 tiene una sintaxis de esquema más expresiva.
