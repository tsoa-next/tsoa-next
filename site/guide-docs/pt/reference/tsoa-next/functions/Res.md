---
lastUpdated: 2026-04-20T21:59:41.340Z
---
[tsoa-next](../../packages.md) / [tsoa-next](../index.md) / Res

# Função: Res ()

```ts
function Res(): ParameterDecorator;
```

Definido em: [packages/runtime/src/decorators/response.ts:38](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/response.ts#L38)

Injete uma função de resposta do diagnóstico de biblioteca que pode ser usada para construir respostas verificadas por tipo (geralmente erro-).

Anotar o parâmetro como `TsoaResponse<Status, Data, Headers>` assim tsoa pode inferir a resposta documentada.

## Retorna

`ParameterDecorator`
