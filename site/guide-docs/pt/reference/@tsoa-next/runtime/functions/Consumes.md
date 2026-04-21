---
lastUpdated: 2026-04-20T21:59:41.309Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/runtime](../index.md) / Consumes

# Função: Consume ()

```ts
function Consumes(value): MethodDecorator;
```

Definido em: [packages/runtime/src/decorators/parameter.ts:109](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/parameter.ts#L109)

Sobrepõe o tipo de mídia usado para documentar um corpo de solicitação para uma única ação.

## Parâmetros

### value

`string`

O tipo de mídia do corpo da solicitação, por exemplo `application/json`.
Veja [Swagger request-body documentation](https://swagger.io/docs/specification/describing-request-body/).

## Retorna

`MethodDecorator`
