---
lastUpdated: 2026-04-20T21:59:41.367Z
---
[tsoa-next](../../packages.md) / [tsoa-next](../index.md) / TsoaResponse

# Tipo Alias: TsoaResponse\<T, BodyType, HeaderType, ReturnType\>

```ts
type TsoaResponse<T, BodyType, HeaderType, ReturnType> = (status, data, headers?) => ReturnType;
```

Definido em: [packages/runtime/src/interfaces/response.ts:77](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/response.ts#L77)

Forma da função do respondedor injetada por [Res](../functions/Res.md).

Chame a função com um código de status, carga útil e cabeçalhos opcionais para curto-circuitar a ação e enviar uma resposta digitada.

## Parâmetros do tipo

### T

`T` *extensões* [`HttpStatusCodeLiteral`](HttpStatusCodeLiteral.md)

### BodyType

`BodyType`

### HeaderType

`HeaderType` *extensões* `IsValidHeader`\<`HeaderType`\> = `object`

### ReturnType

`ReturnType` = `never`

## Parâmetros

### status

`T`

### data

`BodyType`

### headers?

`HeaderType`

## Retorna

`ReturnType`
