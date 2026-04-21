---
lastUpdated: 2026-04-20T21:59:41.328Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/runtime](../index.md) / TsoaResponse

# Tipo Alias: TsoaResponse\<T, BodyType, HeaderType, ReturnType\>

```ts
type TsoaResponse<T, BodyType, HeaderType, ReturnType> = (status, data, headers?) => ReturnType;
```

Definido en: [packages/runtime/src/interfaces/response.ts:77](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/interfaces/response.ts#L77)

Forma de función de respuesta inyectada por [Res](../functions/Res.md).

Llame a la función con un código de estado, carga útil y encabezados opcionales para hacer cortocircuito de la acción y enviar una respuesta tipo.

## Parámetros tipo

### T

`T` *Existe* [`HttpStatusCodeLiteral`](HttpStatusCodeLiteral.md)

### BodyType

`BodyType`

### HeaderType

`HeaderType` *Existe* `IsValidHeader`\<`HeaderType`\> = `object`

### ReturnType

`ReturnType` = `never`

## Parámetros

### status

`T`

### data

`BodyType`

### headers?

`HeaderType`

## Devoluciones

`ReturnType`
