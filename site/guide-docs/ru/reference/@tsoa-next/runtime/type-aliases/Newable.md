---
lastUpdated: 2026-04-20T21:59:41.327Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/runtime](../index.md) / Newable

# Тип Alias: Newable\<T, TArgs\>

```ts
type Newable<T, TArgs> = (...args) => T;
```

Определено в: [packages/runtime/src/interfaces/iocModule.ts:2](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/iocModule.ts#L2)

Конструктор, используемый для поиска контейнеров IoC.

## Параметры типа

### T

`T` = `unknown`

### TArgs

`TArgs` *расширяется* `unknown`[] = `unknown`[]

## Параметры

### args

...`TArgs`

## Возвращение

`T`
