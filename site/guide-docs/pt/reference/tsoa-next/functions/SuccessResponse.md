---
lastUpdated: 2026-04-20T21:59:41.341Z
---
[tsoa-next](../../packages.md) / [tsoa-next](../index.md) / SuccessResponse

# Função: SuccessResponse()

```ts
function SuccessResponse<HeaderType>(
   name, 
   description?, 
   produces?): MethodDecorator;
```

Definido em: [packages/runtime/src/decorators/response.ts:12](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/response.ts#L12)

Declara o status de resposta bem-sucedido, descrição e tipos de mídia para uma operação.

## Parâmetros do tipo

### HeaderType

`HeaderType` *extensões* 
  \| `object`
  \| `"Header names must be of type string"`
  \| `"Header values must be string or string[]"` = `object`

## Parâmetros

### name

`string` \| `number`

O código de estado HTTP retornou quando a operação tiver sucesso.

### description?

`string`

A descrição da resposta mostrada no gerado OpenAPI Documento.

### produces?

`string` \| `string`[]

O tipo de mídia de resposta ou tipos de mídia.

## Retorna

`MethodDecorator`
