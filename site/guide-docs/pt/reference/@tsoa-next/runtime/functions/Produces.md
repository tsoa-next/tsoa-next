---
lastUpdated: 2026-04-20T21:59:41.310Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/runtime](../index.md) / Produces

# Função: Produces ()

```ts
function Produces(value): MethodDecorator & ClassDecorator;
```

Definido em: [packages/runtime/src/decorators/response.ts:48](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/response.ts#L48)

Sobrepõe o tipo de mídia de resposta em um controlador ou uma única ação.

## Parâmetros

### value

`string`

O tipo de mídia de resposta, por exemplo `application/json`.
Veja [Swagger media-type documentation](https://swagger.io/docs/specification/media-types/).

## Retorna

`MethodDecorator` & `ClassDecorator`
