---
lastUpdated: 2026-04-20T21:59:41.311Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/runtime](../index.md) / SpecPath

# Функция: SpecPath()

```ts
function SpecPath(
   path?, 
   optionsOrTarget?, 
   cache?): ClassDecorator;
```

Определено в: [packages/runtime/src/decorators/specPath.ts:157](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/specPath.ts#L157)

Регистрирует локальный маршрут контроллера, который обслуживает сгенерированный OpenAPI документ или полученный на заказ ответ.

## Параметры

### path?

`string` = `'spec'`

Относительный маршрут. Дефолты для `spec`.

### optionsOrTarget?

  \| [`SpecPathTarget`](../type-aliases/SpecPathTarget.md)
  \| [`SpecPathOptions`](../interfaces/SpecPathOptions.md)

Либо `SpecPathOptions` Объект или наследственный целевой аргумент.

### cache?

[`SpecPathCache`](../type-aliases/SpecPathCache.md) = `'memory'`

Обсуждение Legacy Cache Strategy Недостатки кэширования в памяти.

## Возвращение

`ClassDecorator`
