---
lastUpdated: 2026-04-20T21:59:41.340Z
---
[tsoa-next](../../packages.md) / [tsoa-next](../index.md) / Res

# Функция: Res()

```ts
function Res(): ParameterDecorator;
```

Определено в: [packages/runtime/src/decorators/response.ts:38](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/response.ts#L38)

Введите библиотечно-агностическую функцию ответа, которая может быть использована для построения проверяемых по типу (обычно по ошибке) ответов.

Укажите параметр как `TsoaResponse<Status, Data, Headers>` так tsoa Можно получить документированный ответ.

## Возвращение

`ParameterDecorator`
