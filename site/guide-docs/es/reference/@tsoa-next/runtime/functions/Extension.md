---
lastUpdated: 2026-04-20T21:59:41.309Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/runtime](../index.md) / Extension

# Función: Extensión()

```ts
function Extension(name, value): PropertyDecorator;
```

Definido en: [packages/runtime/src/decorators/extension.ts:7](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/extension.ts#L7)

Añade un OpenAPI extensión de especificación a una propiedad modelo.

## Parámetros

### name

`string`

La llave de extensión, normalmente comenzando con `x-`.

### value

  \| [`ExtensionType`](../type-aliases/ExtensionType.md)
  \| [`ExtensionType`](../type-aliases/ExtensionType.md)[]

El valor de extensión.

## Devoluciones

`PropertyDecorator`
