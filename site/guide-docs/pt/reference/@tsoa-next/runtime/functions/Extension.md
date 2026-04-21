---
lastUpdated: 2026-04-20T21:59:41.309Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/runtime](../index.md) / Extension

# Função: Extension ()

```ts
function Extension(name, value): PropertyDecorator;
```

Definido em: [packages/runtime/src/decorators/extension.ts:7](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/extension.ts#L7)

Adiciona um OpenAPI extensão da especificação para uma propriedade do modelo.

## Parâmetros

### name

`string`

A chave de extensão, tipicamente começando com `x-`.

### value

  \| [`ExtensionType`](../type-aliases/ExtensionType.md)
  \| [`ExtensionType`](../type-aliases/ExtensionType.md)[]

O valor da extensão.

## Retorna

`PropertyDecorator`
