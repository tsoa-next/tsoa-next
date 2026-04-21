---
lastUpdated: 2026-04-20T21:59:41.311Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/runtime](../index.md) / SpecPath

# Função: SpecPath ()

```ts
function SpecPath(
   path?, 
   optionsOrTarget?, 
   cache?): ClassDecorator;
```

Definido em: [packages/runtime/src/decorators/specPath.ts:157](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/specPath.ts#L157)

Registra uma rota local do controlador que serve o gerado OpenAPI documento ou uma resposta personalizada derivada.

## Parâmetros

### path?

`string` = `'spec'`

A rota relativa. Predefinições `spec`.

### optionsOrTarget?

  \| [`SpecPathTarget`](../type-aliases/SpecPathTarget.md)
  \| [`SpecPathOptions`](../interfaces/SpecPathOptions.md)

Qualquer um `SpecPathOptions` objeto ou o argumento de alvo legado.

### cache?

[`SpecPathCache`](../type-aliases/SpecPathCache.md) = `'memory'`

Um argumento de estratégia de cache. O padrão é cache na memória.

## Retorna

`ClassDecorator`
