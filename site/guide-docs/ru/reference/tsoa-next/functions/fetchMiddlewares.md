---
lastUpdated: 2026-04-20T21:59:41.342Z
---
[tsoa-next](../../packages.md) / [tsoa-next](../index.md) / fetchMiddlewares

# Функция: fetchMiddlewares()

```ts
function fetchMiddlewares<T>(target): T[];
```

Определено в: [packages/runtime/src/decorators/middlewares.ts:55](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/middlewares.ts#L55)

Возвращает метаданные промежуточного программного обеспечения, ранее прикрепленные к [Middlewares](Middlewares.md).

## Параметры типа

### T

`T` *расширяется* `object` | `CallableFunction`

## Параметры

### target

`MiddlewareTarget`

Класс контроллера или функция метода для проверки.

## Возвращение

`T`[]
