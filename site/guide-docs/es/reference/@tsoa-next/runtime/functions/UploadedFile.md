---
lastUpdated: 2026-04-20T21:59:41.311Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/runtime](../index.md) / UploadedFile

# Función: UploadedFile()

```ts
function UploadedFile(name?): ParameterDecorator;
```

Definido en: [packages/runtime/src/decorators/parameter.ts:81](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/parameter.ts#L81)

Enlaza un solo archivo cargado de una solicitud multipart/form-data.

## Parámetros

### name?

`string`

El nombre de campo multiparte. Defaults al nombre del parámetro.

## Devoluciones

`ParameterDecorator`
