---
lastUpdated: 2026-04-20T21:59:41.339Z
---
[tsoa-next](../../packages.md) / [tsoa-next](../index.md) / Middlewares

# Función: Middlewares()

```ts
function Middlewares<T>(...mws): ClassDecorator & MethodDecorator;
```

Definido en: [packages/runtime/src/decorators/middlewares.ts:41](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/middlewares.ts#L41)

Adjunta uno o más controladores de middleware de tiempo de ejecución a un controlador o acción.

## Parámetros tipo

### T

`T` *Existe* `object` \ duración `CallableFunction`

## Parámetros

### mws

...`T`[]

Las funciones de middleware o objetos de middleware para instalar.

## Devoluciones

`ClassDecorator` & `MethodDecorator`
