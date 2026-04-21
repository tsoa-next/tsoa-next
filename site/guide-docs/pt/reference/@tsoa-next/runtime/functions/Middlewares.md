---
lastUpdated: 2026-04-20T21:59:41.309Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/runtime](../index.md) / Middlewares

# Função: Middlewares ()

```ts
function Middlewares<T>(...mws): ClassDecorator & MethodDecorator;
```

Definido em: [packages/runtime/src/decorators/middlewares.ts:41](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/middlewares.ts#L41)

Anexa um ou mais manipuladores de middleware em tempo de execução a um controlador ou ação.

## Parâmetros do tipo

### T

`T` *extensões* `object` \ o `CallableFunction`

## Parâmetros

### mws

...`T`[]

As funções middleware ou objetos middleware para instalar.

## Retorna

`ClassDecorator` & `MethodDecorator`
