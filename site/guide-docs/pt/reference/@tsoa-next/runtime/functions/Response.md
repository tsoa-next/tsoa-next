---
lastUpdated: 2026-04-20T21:59:41.310Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/runtime](../index.md) / Response

# Função: Response ()

```ts
function Response<ExampleType, HeaderType>(
   name, 
   description?, 
   example?, 
   produces?): MethodDecorator & ClassDecorator;
```

Definido em: [packages/runtime/src/decorators/response.ts:24](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/response.ts#L24)

Adiciona uma resposta documentada que pode ser anexada a um método ou a um controlador.

## Parâmetros do tipo

### ExampleType

`ExampleType`

### HeaderType

`HeaderType` *extensões* 
  \| `object`
  \| `"Header names must be of type string"`
  \| `"Header values must be string or string[]"` = `object`

## Parâmetros

### name

  \| `"400"`
  \| `"401"`
  \| `"402"`
  \| `"403"`
  \| `"404"`
  \| `"405"`
  \| `"406"`
  \| `"407"`
  \| `"408"`
  \| `"409"`
  \| `"410"`
  \| `"411"`
  \| `"412"`
  \| `"413"`
  \| `"414"`
  \| `"415"`
  \| `"416"`
  \| `"417"`
  \| `"418"`
  \| `"422"`
  \| `"423"`
  \| `"424"`
  \| `"425"`
  \| `"426"`
  \| `"428"`
  \| `"429"`
  \| `"431"`
  \| `"451"`
  \| `"500"`
  \| `"501"`
  \| `"502"`
  \| `"503"`
  \| `"504"`
  \| `"505"`
  \| `"506"`
  \| `"507"`
  \| `"508"`
  \| `"510"`
  \| `"511"`
  \| [`HttpStatusCodeLiteral`](../type-aliases/HttpStatusCodeLiteral.md)
  \| `"100"`
  \| `"200"`
  \| `"301"`
  \| `"302"`
  \| `"303"`
  \| `"307"`
  \| `"308"`
  \| `"101"`
  \| `"102"`
  \| `"201"`
  \| `"202"`
  \| `"203"`
  \| `"204"`
  \| `"205"`
  \| `"206"`
  \| `"207"`
  \| `"208"`
  \| `"226"`
  \| `"300"`
  \| `"304"`
  \| `"305"`
  \| [`OtherValidOpenApiHttpStatusCode`](../type-aliases/OtherValidOpenApiHttpStatusCode.md)

O código de estado HTTP, OpenAPI intervalo de resposta, ou `default`.

### description?

`string`

A descrição da resposta mostrada no gerado OpenAPI Documento.

### example?

`ExampleType`

Um exemplo de carga útil para o esquema de resposta.

### produces?

`string` \| `string`[]

O tipo de mídia de resposta ou tipos de mídia.

## Retorna

`MethodDecorator` & `ClassDecorator`
