---
lastUpdated: 2026-04-20T21:59:41.340Z
---
[tsoa-next](../../packages.md) / [tsoa-next](../index.md) / Produces

# Función: Producto()

```ts
function Produces(value): MethodDecorator & ClassDecorator;
```

Definido en: [packages/runtime/src/decorators/response.ts:48](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/response.ts#L48)

Supera el tipo de medio de respuesta en un controlador o una sola acción.

## Parámetros

### value

`string`

El tipo de medios de respuesta, por ejemplo `application/json`.
See [Swagger media-type documentation](https://swagger.io/docs/specification/media-types/).

## Devoluciones

`MethodDecorator` & `ClassDecorator`
