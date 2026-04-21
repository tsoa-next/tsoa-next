---
lastUpdated: 2026-04-20T21:59:41.312Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/runtime](../index.md) / Config

# Interfaz: Config

Definido en: [packages/runtime/src/config.ts:5](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L5)

Root tsoa-next configuración consumida por CLI y generadores programáticos.

## Propiedades

### compilerOptions?

```ts
optional compilerOptions?: Record<string, unknown>;
```

Definido en: [packages/runtime/src/config.ts:47](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L47)

TypeScript CompilerOpciones a utilizar durante la generación.
Estas se fusionan con las opciones de compilador resueltas de tsconfig.

***

### controllerPathGlobs?

```ts
optional controllerPathGlobs?: string[];
```

Definido en: [packages/runtime/src/config.ts:29](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L29)

Una variedad de globs de ruta que apuntan a sus controladores de ruta que le gustaría tener tsoa incluir.

***

### defaultNumberType?

```ts
optional defaultNumberType?: "long" | "integer" | "float" | "double";
```

Definido en: [packages/runtime/src/config.ts:68](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L68)

OpenAPI tipo de número a utilizar para TypeScript `number` cuando no hay una anotación más estrecha presente.

#### Default

```ts
double
```

***

### entryFile

```ts
entryFile: string;
```

Definido en: [packages/runtime/src/config.ts:24](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L24)

El punto de entrada a su API

***

### ignore?

```ts
optional ignore?: string[];
```

Definido en: [packages/runtime/src/config.ts:19](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L19)

Directorios a ignorar durante TypeScript metadatos

***

### - ¿Opts?

```ts
optional multerOpts?: Options;
```

Definido en: [packages/runtime/src/config.ts:62](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L62)

Legacy multer options forwarded into generated middleware.
El `storage` la opción no es compatible.

#### Example

```ts
{
   *   "dest": "/tmp"
   * } Allows multer to write files to disk instead of keeping them in memory.
```

#### Deprecated

Desde v6.4.0, `RegisterRoutes` puede recibir `multerOptions` directamente.
 Esta opción de nivel de configuración se eliminará en una futura versión.
 (https://github.com/tsoa-next/tsoa-next/issues/1587#issuecomment-2391291433)
 (https://github.com/tsoa-next/tsoa-next/pull/1638)

***

### noImplicitAdditionalProperties?

```ts
optional noImplicitAdditionalProperties?: "ignore" | "throw-on-extras" | "silently-remove-extras";
```

Definido en: [packages/runtime/src/config.ts:34](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L34)

Modos que le permiten evitar que los datos de entrada entren en su API. Esto documentará su decisión en el swagger. yaml y se encenderá la validación de exceso de propiedad (a tiempo de ejecución) en sus rutas.

***

### routes

```ts
routes: RoutesConfig;
```

Definido en: [packages/runtime/src/config.ts:14](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L14)

Configuración de generación de ruta.

***

### spec

```ts
spec: SpecConfig;
```

Definido en: [packages/runtime/src/config.ts:9](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L9)

OpenAPI configuración de generación.

***

### tsconfig?

```ts
optional tsconfig?: string;
```

Definido en: [packages/runtime/src/config.ts:41](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L41)

Path to a tsconfig file used as an input source for compiler options during generation.
Si se omite, tsoa-next buscará tsconfig.json a partir de la carga tsoa directorio de config.
Explicit compilerOptions in tsoa-next config todavía tiene precedencia sobre los valores tsconfig.
