---
lastUpdated: 2026-04-20T21:59:41.311Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/runtime](../index.md) / Tags

# Функция: Tags()

```ts
function Tags(...values): ClassDecorator & MethodDecorator;
```

Определено в: [packages/runtime/src/decorators/tags.ts:6](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/tags.ts#L6)

Добавить OpenAPI Тэги для контроллера или действия.

## Параметры

### values

...`string`[]

Одно или несколько имен тегов для прикрепления.

## Возвращение

`ClassDecorator` & `MethodDecorator`
