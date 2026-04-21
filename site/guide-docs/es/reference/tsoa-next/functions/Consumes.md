---
lastUpdated: 2026-04-20T21:59:41.338Z
---
[tsoa-next](../../packages.md) / [tsoa-next](../index.md) / Consumes

# Función: Consumos()

```ts
function Consumes(value): MethodDecorator;
```

Definido en: [packages/runtime/src/decorators/parameter.ts:109](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/parameter.ts#L109)

Supera el tipo de medio utilizado para documentar un cuerpo de solicitud para una sola acción.

## Parámetros

### value

`string`

El tipo de medios del cuerpo de solicitud, por ejemplo `application/json`.
See [Swagger request-body documentation](https://swagger.io/docs/specification/describing-request-body/).

## Devoluciones

`MethodDecorator`
