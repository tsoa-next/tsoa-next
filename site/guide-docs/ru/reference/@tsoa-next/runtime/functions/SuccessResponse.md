---
lastUpdated: 2026-04-20T21:59:41.311Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/runtime](../index.md) / SuccessResponse

# Функция: SuccessResponse()

```ts
function SuccessResponse<HeaderType>(
   name, 
   description?, 
   produces?): MethodDecorator;
```

Определено в: [packages/runtime/src/decorators/response.ts:12](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/response.ts#L12)

Объявляет статус успешного ответа, описание и типы носителей для операции.

## Параметры типа

### HeaderType

`HeaderType` *расширяется* 
  \| `object`
  \| `"Header names must be of type string"`
  \| `"Header values must be string or string[]"` = `object`

## Параметры

### name

`string` \| `number`

Код состояния HTTP возвращается, когда операция проходит успешно.

### description?

`string`

Описание ответа, представленное в генерируемом OpenAPI Документ.

### produces?

`string` \| `string`[]

Тип СМИ или типы СМИ.

## Возвращение

`MethodDecorator`
