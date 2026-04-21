---
lastUpdated: 2026-04-20T21:59:41.313Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/runtime](../index.md) / RoutesConfig

# Interfaz: RutasConfig

Definido en: [packages/runtime/src/config.ts:235](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L235)

## Propiedades

### authenticationModule?

```ts
optional authenticationModule?: string;
```

Definido en: [packages/runtime/src/config.ts:274](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L274)

Camino del módulo de autenticación utilizado por rutas generadas.

***

### basePath?

```ts
optional basePath?: string;
```

Definido en: [packages/runtime/src/config.ts:254](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L254)

Base API path; por ejemplo, el '/v1' en https://myapi.com/v1

***

### bodyCoercion?

```ts
optional bodyCoercion?: boolean;
```

Definido en: [packages/runtime/src/config.ts:288](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L288)

Ya sea para coaccionar implícitamente los parámetros del cuerpo en un tipo aceptado.

#### Default

```ts
true
```

***

### esm?

```ts
optional esm?: boolean;
```

Definido en: [packages/runtime/src/config.ts:281](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L281)

Cuando se activa, las importaciones generadas de rutas utilizan `.js` extensions for ESM output.

#### Default

```ts
false
```

***

### iocModule?

```ts
optional iocModule?: string;
```

Definido en: [packages/runtime/src/config.ts:269](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L269)

Carril del módulo IoC, por ejemplo `./inversify/ioc`.

***

### middleware?

```ts
optional middleware?: "express" | "hapi" | "koa";
```

Definido en: [packages/runtime/src/config.ts:259](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L259)

Proveedor de Middleware.

***

### middlewareTemplate?

```ts
optional middlewareTemplate?: string;
```

Definido en: [packages/runtime/src/config.ts:264](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L264)

Aduanas Handlebars Patrón de plantilla utilizado en lugar de la plantilla de middleware incorporado.

***

### noWriteIfUnchanged?

```ts
optional noWriteIfUnchanged?: boolean;
```

Definido en: [packages/runtime/src/config.ts:249](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L249)

Saltar escribiendo el archivo de ruta cuando el contenido generado coincide con el archivo existente.

***

### rewriteRelativeImportExtensions?

```ts
optional rewriteRelativeImportExtensions?: boolean;
```

Definido en: [packages/runtime/src/config.ts:295](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L295)

Cuando se activa, las importaciones de rutas generadas se mantienen `.ts` prórrogas para apoyar TypeScript 5.7 `rewriteRelativeImportExtensions`.

#### Default

```ts
false
```

***

### routesDir

```ts
routesDir: string;
```

Definido en: [packages/runtime/src/config.ts:239](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L239)

Directorio donde se escriben los archivos de ruta generados.

***

### routesFileName?

```ts
optional routesFileName?: string;
```

Definido en: [packages/runtime/src/config.ts:244](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L244)

Nombre de archivo para el módulo de ruta generado.
