---
sidebarDepth: 1
lastUpdated: 2026-04-17T20:53:42.041Z
---

# Actualización tsoa 2.5

[Jump to the breaking changes](#breaking-changes)

> Nota histórica: los enlaces de solicitud de tirada en esta guía apuntan intencionalmente a [`lukeautry/tsoa`](https://github.com/lukeautry/tsoa), donde estos cambios aterrizaron originalmente.

## Nuevas características

### Apoyo a alias de tipo

Esta liberación viene con el apoyo adecuado para las definiciones de alias de tipo.

Pueden variar desde escenarios simples

```ts
/**
 * A Word shall be a non-empty string
 * @minLength 1
 */
type Word = string
```

a escenarios más complejos como sindicatos e intersecciones de alias

```ts
type IntersectionAlias = { value1: string; value2: string } & TypeAliasModel1

// or
type OneOrTwo = TypeAliasModel1 | TypeAliasModel2
```

o incluso alias de tipo genérico:

```ts
type GenericAlias<T> = T | string
type ForwardGenericAlias<T, U> = GenericAlias<U> | T
```

Tenga en cuenta que esto significa que tsoa no sólo genera la especificación (OpenAPI v3 y Swagger2\*), pero también validará la entrada contra los tipos incluyendo las anotaciones jsDoc.

\* Puede haber ciertos escenarios donde no podemos generar Swagger 2 de tu TypeScript, tsoa registrará advertencias para informarle sobre cualquier problema que conozcamos.

### Soporte para tipos mapeados

> TypeScript 2.1 introdujo tipos mapeados, una poderosa adición al sistema de tipo. En esencia, los tipos mapeados le permiten crear nuevos tipos de los existentes mediante el mapeo sobre los tipos de propiedad. Cada propiedad del tipo existente se transforma según una regla que especifique. Las propiedades transformadas componen el nuevo tipo.
> Marius Schulz, https://mariusschulz.com/blog/mapped-types-in-typescript

tsoa ahora trabaja con el tipo de ts para resolver tipos mapeados. Trataremos activamente de apoyar todos los casos, sin embargo la suite de prueba por ahora sólo cubre las naves tiposcript de tipos de utilidad mapeados con, como:

```ts
/**
 * Make all properties in T optional
 */
type Partial<T> = {
  [P in keyof T]?: T[P]
}

/**
 * Make all properties in T required
 */
type Required<T> = {
  [P in keyof T]-?: T[P]
}

/**
 * Make all properties in T readonly
 */
type Readonly<T> = {
  readonly [P in keyof T]: T[P]
}

/**
 * From T, pick a set of properties whose keys are in the union K
 */
type Pick<T, K extends keyof T> = {
  [P in K]: T[P]
}
```

### Soporte para tipos condicionales

A partir de la versión 2.8, TypeScript soporta tipos condicionales. La sintaxis está muy cerca del operador ternario y permite la expresión de 2 (o más) tipos diferentes basados en una condición. Por favor consulte el [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/advanced-types.html#conditional-types) para detalles.

```ts
type Diff<T, U> = T extends U ? never : T // Remove types from T that are assignable to U
```

tsoa Ahora funciona con el tipo de comprobación de ts para resolver tipos condicionales. Trataremos activamente de apoyar la mayoría de los casos, sin embargo la suite de prueba por ahora sólo cubre los tipos de utilidad de las naves tiposcript con, como:

```ts
/**
 * Exclude from T those types that are assignable to U
 */
type Exclude<T, U> = T extends U ? never : T

/**
 * Extract from T those types that are assignable to U
 */
type Extract<T, U> = T extends U ? T : never

/**
 * Exclude null and undefined from T
 */
type NonNullable<T> = T extends null | undefined ? never : T
```

### Soporte para combinaciones y tipos de utilidad

La combinación de tipos mapeados y condicionales permite tipos de utilidad potentes como los `Omit` tipo.

```
/**
 * Construct a type with the properties of T except for those in type K.
 */
type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
```

### Apoyo `Record<>` [\#662](https://github.com/lukeautry/tsoa/pull/662) (Asuntos)[Eywek](https://github.com/Eywek))

### Enums: See [\#594](https://github.com/lukeautry/tsoa/pull/594) para el Espectro y [\#599](https://github.com/lukeautry/tsoa/pull/599) y [\#593](https://github.com/lukeautry/tsoa/pull/593)

### Null Keyword: See [\#601](https://github.com/lukeautry/tsoa/pull/601)

### Capacidad para utilizar un delimitador de colon en lugar de pulseras en camino [\#602](https://github.com/lukeautry/tsoa/pull/602)(Asuntos)[itamarco](https://github.com/itamarco))

### añadido soporte @example para parámetros / propiedades [\#616](https://github.com/lukeautry/tsoa/pull/616) (Asuntos)[jfrconley](https://github.com/jfrconley))

### hazaña: ignorar los métodos de clase [\#643](https://github.com/lukeautry/tsoa/pull/643) (Asuntos)[Eywek](https://github.com/Eywek))

### feat: manija miembros enum [\#656](https://github.com/lukeautry/tsoa/pull/656) (Asuntos)[Eywek](https://github.com/Eywek))

### Tipos de índice de manijas [\#636](https://github.com/lukeautry/tsoa/pull/636) (Asuntos)[Eywek](https://github.com/Eywek))

### Mango `typeof` [\#635](https://github.com/lukeautry/tsoa/pull/635) (Asuntos)[Eywek](https://github.com/Eywek))

### `@format` apoyo a los alias de tipo [\#620](https://github.com/lukeautry/tsoa/pull/620) (Asuntos)[jfrconley](https://github.com/jfrconley))

## Corrección de errores

- propagar correctamente el nombre de campo en validar Modelo [@fantapop](https://github.com/fantapop)

- Vacío alienígena Api Respuesta tipos documento 200 respuesta en lugar de 204 [\#629](https://github.com/lukeautry/tsoa/pull/629) (Asuntos)[WoH](https://github.com/WoH))

- Validación Error debe extender el Error [\#661](https://github.com/lukeautry/tsoa/pull/661) (Asuntos)[aldenquimby](https://github.com/aldenquimby))

- Actualizar koa-router a @koa/router, corregir errores de tipo [\#646](https://github.com/lukeautry/tsoa/pull/646) (Asuntos)[michaelbeaumont](https://github.com/michaelbeaumont))
- Quitar el tipo de objeto [\#642](https://github.com/lukeautry/tsoa/pull/642) (Asuntos)[dimitor115](https://github.com/dimitor115))
- Fijar la adición de propiedades estáticas a la definición modelo [\#639](https://github.com/lukeautry/tsoa/pull/639) (Asuntos)[dimitor115](https://github.com/dimitor115))

## Cambios de ruptura

### Null vs. undefinidos

A menos que declare un tipo de aceptación `null`, ya no marcaremos sus propiedades opcionales como `nullable: true` o `x-nullable: true`.
Esto se aplica también a la validación, así que mientras se envía `null` en lugar de enviar `undefined` / ninguna propiedad en un objeto estaba bien, ahora ya no es más.
Enviar `undefined` en lugar de, es decir. `string | null` también es rechazado por la validación.

### Naming

Para apoyar alias de tipo y evitar choques de nombre, los nombres de los esquemas/definiciones de componentes generados pueden haber cambiado (las interfaces genéticas se ven afectadas principalmente).
Si confía en los nombres de componentes generados a partir de tsoaEsto es un cambio de ruptura.

Porque... tsoa apoyó algunos alias de tipo en el pasado y ahora genera definiciones de manera diferente, esto puede romper su código.
Si confías en tsoa no apoyar el tipo de alias correctamente para evitar problemas, esto puede romper su código.
Proceder con precaución e informar sobre cuestiones.

### Mejorar la validación de objetos anidados

See [\#574](https://github.com/lukeautry/tsoa/pull/574) y [\#575](https://github.com/lukeautry/tsoa/pull/575).
Estos no deberían estar rompiendo cambios, pero ya que afecta la validación, mejor seguro que la pena.

### Cambiar el comportamiento predeterminado cuando no se define ningún host:

Ponga explícitamente su anfitrión en caso de que desee tener urls absolutos. Este es un cambio de ruptura para aquellos que estaban usando OpenAPI 3, pero realmente trae tsoa en la paridad con cómo estábamos manejando `host` propiedad en Swagger 2. Anteriormente OpenAPI 3 usuarios tuvieron que resultar en pasar `null` lo que todos sentimos fue extraño. Ahora omitiendo `host` causará tsoa para asumir que la url debe ser relativa.

### Quitar .. en el campoErrores

Al detectar propiedades adicionales ilegales (si utiliza tsoa configuración `additionalProperties: 'throw-on-extras'`), la clave del error contendría un punto adicional.

```js
{
  "TestModel..additionalProp: : {
    ...
  }
}
```

Esto es ahora fijo y la llave es `TestModel.additionalProp`.

### Use Spec en lugar de Swagger (Asuntos)`tsoa swagger` todavía está disponible por ahora, pero será eliminado eventualmente) [\#664](https://github.com/lukeautry/tsoa/pull/664) (Asuntos)[WoH](https://github.com/WoH))

```diff
Calling the tsoa command
- tsoa swagger
+ tsoa spec

- tsoa swagger-and-routes
+ tsoa spec-and-routes

Manually calling spec generation
- await generateSwaggerSpec(swaggerConfig, routesConfig, compilerOptions, config.ignore);
+ await generateSpec(openapiConfig, compilerOptions, config.ignore);
```

tsoaJson:

```js
{
  "swagger": {}
}
```

se convierte en

```js
{
  "spec": {}
}
```

- Mover configuración compartida a nivel superior [\#628](https://github.com/lukeautry/tsoa/pull/628) (Asuntos)[WoH](https://github.com/WoH))

En lugar de duplicar config y manejar muchos casos de borde, el nuevo configuración es mucho más simple.
Ajustes de configuración, que impactan tanto las rutas como las especificaciones ahora se encuentran en el nivel superior del objeto de config.

```json
{
  "entryFile": "./tests/fixtures/express/server.ts",
  "noImplicitAdditionalProperties": "silently-remove-extras",
  "routes": {},
  "spec": {}
}
```

Esto significa que si tu configuración es diferente (por ejemplo, el archivo de entrada), tendrás que llamar al `generateRoutes()` y `generateSpec()` tú mismo.
Tenga en cuenta que estos métodos ahora tienen un config más simple:

```diff
-    await generateSwaggerSpec(swaggerConfig, routesConfig, compilerOptions, config.ignore);
+    await generateSpec(openapiConfig, compilerOptions, config.ignore);
```

```diff
-    await generateRoutes(routesConfig, swaggerConfig, compilerOptions, config.ignore);
+    await generateRoutes(routesConfig, compilerOptions, config.ignore);
```

IntryFile and noImplicitAdditional Ahora se pueden establecer propiedades en el swagger/routes Config.

También, ajustes booleanos para noImplicitAdicionalLas ventajas se han eliminado: #503
Los ajustes válidos son ahora: `'throw-on-extras' | 'silently-remove-extras' | 'ignore'`, todo lo demás vuelve a `'ignore'`.

**Para referencia, vea la interfaz TS de todo el configuración [here](./reference/tsoa-next/interfaces/Config.md)#

### TypeScript Los sindicatos se aplican ahora `anyOf` dentro OpenAPI [\#671](https://github.com/tsoa-next/tsoa-next/issues/671)
