---
lastUpdated: 2026-04-20T21:59:41.310Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/runtime](../index.md) / Res

# Función: Res()

```ts
function Res(): ParameterDecorator;
```

Definido en: [packages/runtime/src/decorators/response.ts:38](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/response.ts#L38)

Inyecte una función de respuesta de la biblioteca-agnóstica que se puede utilizar para construir respuestas de tipo (normalmente error-).

Anota el parámetro como `TsoaResponse<Status, Data, Headers>` Así que... tsoa puede inferir la respuesta documentada.

## Devoluciones

`ParameterDecorator`
