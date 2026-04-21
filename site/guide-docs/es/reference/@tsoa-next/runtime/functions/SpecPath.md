---
lastUpdated: 2026-04-20T21:59:41.311Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/runtime](../index.md) / SpecPath

# Función: SpecPath()

```ts
function SpecPath(
   path?, 
   optionsOrTarget?, 
   cache?): ClassDecorator;
```

Definido en: [packages/runtime/src/decorators/specPath.ts:157](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/specPath.ts#L157)

Registra una ruta controlador-local que sirve al generado OpenAPI documento o respuesta derivada personalizada.

## Parámetros

### path?

`string` = `'spec'`

La ruta relativa. Defaults to `spec`.

### optionsOrTarget?

  \| [`SpecPathTarget`](../type-aliases/SpecPathTarget.md)
  \| [`SpecPathOptions`](../interfaces/SpecPathOptions.md)

O una `SpecPathOptions` o el argumento objetivo heredado.

### cache?

[`SpecPathCache`](../type-aliases/SpecPathCache.md) = `'memory'`

Legacy cache strategy argument. Defaults to in-memory caching.

## Devoluciones

`ClassDecorator`
