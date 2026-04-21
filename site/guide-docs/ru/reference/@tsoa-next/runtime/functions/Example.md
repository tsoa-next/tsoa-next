---
lastUpdated: 2026-04-20T21:59:41.309Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/runtime](../index.md) / Example

# Функция: Пример()

```ts
function Example<T>(exampleModel, exampleLabel?): PropertyDecorator;
```

Определено в: [packages/runtime/src/decorators/example.ts:7](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/example.ts#L7)

Привязывает значение примера к свойству модели.

## Параметры типа

### T

`T`

## Параметры

### exampleModel

`T`

Примерное значение для включения в сгенерированные метаданные схемы.

### exampleLabel?

`string`

Факультативная этикетка, используемая при наличии нескольких примеров.

## Возвращение

`PropertyDecorator`
