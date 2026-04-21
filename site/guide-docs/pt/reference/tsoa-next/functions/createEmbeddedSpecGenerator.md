---
lastUpdated: 2026-04-20T21:59:41.330Z
---
[tsoa-next](../../packages.md) / [tsoa-next](../index.md) / createEmbeddedSpecGenerator

# Função: createEmbeddedSpecGenerator ()

```ts
function createEmbeddedSpecGenerator(artifacts): SpecGenerator;
```

Definido em: [packages/tsoa/src/spec.ts:21](https://github.com/tsoa-next/tsoa-next/blob/main/packages/tsoa/src/spec.ts#L21)

Cria um gerador de especificações de execução a partir de um pré- construído OpenAPI artefato incorporado no código de rota gerado.
Isto mantém-se embutido `SpecPath` alvos independentes de ficheiros de código e TypeScript análise no momento do pedido.

## Parâmetros

### artifacts

[`EmbeddedSpecGeneratorArtifacts`](../interfaces/EmbeddedSpecGeneratorArtifacts.md)

## Retorna

[`SpecGenerator`](../interfaces/SpecGenerator.md)
