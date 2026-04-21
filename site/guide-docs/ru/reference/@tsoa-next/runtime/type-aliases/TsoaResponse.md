---
lastUpdated: 2026-04-20T21:59:41.328Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/runtime](../index.md) / TsoaResponse

# Тип Alias: TsoaResponse\<T, BodyType, HeaderType, ReturnType\>

```ts
type TsoaResponse<T, BodyType, HeaderType, ReturnType> = (status, data, headers?) => ReturnType;
```

Определено в: [packages/runtime/src/interfaces/response.ts:77](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/response.ts#L77)

Форма функции ответчика, введенная [Res](../functions/Res.md).

Позвоните функции с кодом состояния, полезной нагрузкой и дополнительными заголовками, чтобы коротко зафиксировать действие и отправить типизированный ответ.

## Параметры типа

### T

`T` *расширяется* [`HttpStatusCodeLiteral`](HttpStatusCodeLiteral.md)

### BodyType

`BodyType`

### HeaderType

`HeaderType` *расширяется* `IsValidHeader`\<`HeaderType`\> = `object`

### ReturnType

`ReturnType` = `never`

## Параметры

### status

`T`

### data

`BodyType`

### headers?

`HeaderType`

## Возвращение

`ReturnType`
