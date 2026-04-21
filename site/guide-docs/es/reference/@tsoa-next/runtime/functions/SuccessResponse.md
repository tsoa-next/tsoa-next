---
lastUpdated: 2026-04-20T21:59:41.311Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/runtime](../index.md) / SuccessResponse

# Función: SuccessResponse()

```ts
function SuccessResponse<HeaderType>(
   name, 
   description?, 
   produces?): MethodDecorator;
```

Definido en: [packages/runtime/src/decorators/response.ts:12](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/response.ts#L12)

Declara el exitoso estado de respuesta, descripción y tipos de medios para una operación.

## Parámetros tipo

### HeaderType

`HeaderType` *Existe* 
  \| `object`
  \| `"Header names must be of type string"`
  \| `"Header values must be string or string[]"` = `object`

## Parámetros

### name

`string` \| `number`

El código de estado HTTP regresó cuando la operación tiene éxito.

### description?

`string`

La descripción de la respuesta mostrada en el OpenAPI documento.

### produces?

`string` \| `string`[]

Tipos de medios de respuesta o medios de comunicación.

## Devoluciones

`MethodDecorator`
