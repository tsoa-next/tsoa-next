---
lastUpdated: 2026-04-20T21:59:41.308Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/runtime](../index.md) / BodyProp

# Função: BodyProp ()

```ts
function BodyProp(name?): ParameterDecorator;
```

Definido em: [packages/runtime/src/decorators/parameter.ts:15](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/parameter.ts#L15)

Liga uma única propriedade do corpo da solicitação a um parâmetro do controlador.

## Parâmetros

### name?

`string`

O nome da propriedade para ler do corpo do pedido. O padrão é o nome do parâmetro.

## Retorna

`ParameterDecorator`
