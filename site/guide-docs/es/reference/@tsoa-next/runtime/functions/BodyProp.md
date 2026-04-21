---
lastUpdated: 2026-04-20T21:59:41.308Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/runtime](../index.md) / BodyProp

# Función: BodyProp()

```ts
function BodyProp(name?): ParameterDecorator;
```

Definido en: [packages/runtime/src/decorators/parameter.ts:15](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/parameter.ts#L15)

Coloca una sola propiedad del cuerpo de solicitud a un parámetro controlador.

## Parámetros

### name?

`string`

El nombre de la propiedad para leer del cuerpo de solicitud. Defaults al nombre del parámetro.

## Devoluciones

`ParameterDecorator`
