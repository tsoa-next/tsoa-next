---
lastUpdated: 2026-04-20T21:59:41.330Z
---
[tsoa-next](../../packages.md) / [tsoa-next](../index.md) / createOpenApiSpecGenerator

# Função: createOpenApiSpecGenerator ()

```ts
function createOpenApiSpecGenerator(config?): SpecGenerator;
```

Definido em: [packages/tsoa/src/spec.ts:63](https://github.com/tsoa-next/tsoa-next/blob/main/packages/tsoa/src/spec.ts#L63)

Cria um gerador de especificações em tempo de execução que cria o OpenAPI documentar uma vez por instância do gerador usando `@tsoa-next/cli`,
em seguida, armazena o objeto spec gerado e strings serializadas para leituras subsequentes.

## Parâmetros

### config?

[`RuntimeSpecConfigSnapshot`](../interfaces/RuntimeSpecConfigSnapshot.md)

## Retorna

[`SpecGenerator`](../interfaces/SpecGenerator.md)
