---
lastUpdated: 2026-04-20T21:59:41.338Z
---
[tsoa-next](../../packages.md) / [tsoa-next](../index.md) / Extension

# Функция: Расширение()

```ts
function Extension(name, value): PropertyDecorator;
```

Определено в: [packages/runtime/src/decorators/extension.ts:7](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/extension.ts#L7)

Добавить An OpenAPI Расширение спецификации на свойство модели.

## Параметры

### name

`string`

Ключ расширения, обычно начинающийся с `x-`.

### value

  \| [`ExtensionType`](../type-aliases/ExtensionType.md)
  \| [`ExtensionType`](../type-aliases/ExtensionType.md)[]

Значение расширения.

## Возвращение

`PropertyDecorator`
