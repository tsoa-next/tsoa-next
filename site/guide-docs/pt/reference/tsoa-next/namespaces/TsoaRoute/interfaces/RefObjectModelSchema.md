---
lastUpdated: 2026-04-20T21:59:41.364Z
---
[tsoa-next](../../../../packages.md) / [tsoa-next](../../../index.md) / [TsoaRoute](../index.md) / RefObjectModelSchema

# Interface: RefObjectModelSchema

Definido em: [packages/runtime/src/routeGeneration/tsoa-route.ts:36](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/tsoa-route.ts#L36)

Esquema de tempo de execução para modelos de objetos referenciados por rotas geradas.

## Propriedades

### additionalProperties?

```ts
optional additionalProperties?: boolean | PropertySchema;
```

Definido em: [packages/runtime/src/routeGeneration/tsoa-route.ts:39](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/tsoa-route.ts#L39)

***

### dataType

```ts
dataType: "refObject";
```

Definido em: [packages/runtime/src/routeGeneration/tsoa-route.ts:37](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/tsoa-route.ts#L37)

***

### properties

```ts
properties: object;
```

Definido em: [packages/runtime/src/routeGeneration/tsoa-route.ts:38](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/tsoa-route.ts#L38)

#### Assinatura do índice

```ts
[name: string]: PropertySchema
```
