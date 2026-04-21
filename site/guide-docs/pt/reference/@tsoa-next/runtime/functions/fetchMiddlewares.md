---
lastUpdated: 2026-04-20T21:59:41.311Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/runtime](../index.md) / fetchMiddlewares

# Função: fetchMiddlewares ()

```ts
function fetchMiddlewares<T>(target): T[];
```

Definido em: [packages/runtime/src/decorators/middlewares.ts:55](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/middlewares.ts#L55)

Devolve meta- dados do middleware anteriormente anexados com [Middlewares](Middlewares.md).

## Parâmetros do tipo

### T

`T` *extensões* `object` \ o `CallableFunction`

## Parâmetros

### target

`MiddlewareTarget`

A classe do controlador ou a função do método a inspecionar.

## Retorna

`T`[]
