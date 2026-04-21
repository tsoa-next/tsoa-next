---
lastUpdated: 2026-04-20T21:59:41.342Z
---
[tsoa-next](../../packages.md) / [tsoa-next](../index.md) / fetchMiddlewares

# Función: buscarMiddlewares()

```ts
function fetchMiddlewares<T>(target): T[];
```

Definido en: [packages/runtime/src/decorators/middlewares.ts:55](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/middlewares.ts#L55)

Devuelve metadatos de middleware previamente apegados con [Middlewares](Middlewares.md).

## Parámetros tipo

### T

`T` *Existe* `object` \ duración `CallableFunction`

## Parámetros

### target

`MiddlewareTarget`

La función de clase o método del controlador para inspeccionar.

## Devoluciones

`T`[]
