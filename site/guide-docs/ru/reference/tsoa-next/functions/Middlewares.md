---
lastUpdated: 2026-04-20T21:59:41.339Z
---
[tsoa-next](../../packages.md) / [tsoa-next](../index.md) / Middlewares

# Функция: Middlewares()

```ts
function Middlewares<T>(...mws): ClassDecorator & MethodDecorator;
```

Определено в: [packages/runtime/src/decorators/middlewares.ts:41](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/middlewares.ts#L41)

Прикрепляет один или несколько обработчиков промежуточного программного обеспечения к контроллеру или действию.

## Параметры типа

### T

`T` *расширяется* `object` | `CallableFunction`

## Параметры

### mws

...`T`[]

Функции промежуточного ПО или объекты промежуточного ПО для установки.

## Возвращение

`ClassDecorator` & `MethodDecorator`
